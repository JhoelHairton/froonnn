// src/app/pages/carrito/carrito.component.ts

import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { map, switchMap, shareReplay, take } from 'rxjs/operators';

import { CarritoService, CarritoItem } from '../../core/services/carrito.service';
import { AuthService } from '../../core/services/auth.service';
import { ReservaService, CheckoutPayload } from '../../core/services/reserva.service';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
  @Output() cerrar = new EventEmitter<void>();

  /** Stream de ítems, cacheado */
  items$: Observable<CarritoItem[]>;

  /** Total calculado a partir de items$ */
  total$: Observable<number>;

  mostrarToast = false;

  constructor(
    private carritoService: CarritoService,
    private auth:           AuthService,
    private reservaSvc:     ReservaService,
    private router:         Router
  ) {
    // 1) Carga inicial del carrito con replay para no repetir GET
    this.items$ = this.carritoService.getCart().pipe(
      shareReplay({ bufferSize: 1, refCount: true })
    );

    // 2) Total = suma price * quantity
    this.total$ = this.items$.pipe(
      map(items => items.reduce((sum, i) => sum + i.price * i.quantity, 0))
    );
  }

  ngOnInit() {
    // Dispara la primera carga
    this.items$.subscribe();
  }

  cerrarCarrito() {
    this.cerrar.emit();
  }

  /** Refresca el stream items$ tras cada operación */
  private recargar() {
    this.items$ = this.carritoService.getCart().pipe(
      shareReplay({ bufferSize: 1, refCount: true })
    );
    this.items$.subscribe(); // dispara la nueva carga
  }

  incrementar(item: CarritoItem) {
    const call$ = item.type === 'service'
      ? this.carritoService.addService(item.id)
      : this.carritoService.addPromotion(item.id);

    call$
      .pipe(switchMap(() => this.carritoService.getCart()))
      .subscribe(() => this.recargar());
  }

  decrementar(item: CarritoItem) {
    if (item.quantity > 1) {
      this.carritoService.removeItem(item.type, item.id)
        .pipe(switchMap(() => this.carritoService.getCart()))
        .subscribe(() => this.recargar());
    }
  }

  eliminar(item: CarritoItem) {
    this.carritoService.removeItem(item.type, item.id)
      .pipe(switchMap(() => this.carritoService.getCart()))
      .subscribe(() => this.recargar());
  }

  vaciarCart() {
    this.carritoService.clearCart()
      .pipe(switchMap(() => this.carritoService.getCart()))
      .subscribe(() => this.recargar());
  }

  confirmarReserva() {
  this.items$.pipe(take(1)).subscribe(items => {
    const hoy = new Date().toISOString().split('T')[0];
    const payload: CheckoutPayload = {
      reservation_date: hoy,
      cart: items.map(i => ({
        id: i.id,
        type: i.type,    // 👈 El checkout requiere type en cada item
        quantity: i.quantity
      }))
    };

    // Si no logueado, guardamos el carrito y redirigimos
    if (!this.auth.isLoggedIn()) {
      localStorage.setItem('carritoPendiente', JSON.stringify(payload));
      this.router.navigate(['/auth/login'], {
        queryParams: { returnUrl: this.router.url }
      });
      return;
    }

    // Si ya logueado, hacemos checkout directo
    this.reservaSvc.checkout(payload).subscribe({
      next: () => {
        this.mostrarToast = true;
        setTimeout(() => this.mostrarToast = false, 3000);
        this.vaciarCart();
        this.router.navigate(['/turista/reservas']);
      },
      error: err => console.error('Error en checkout', err)
    });
  });
}

  /** Para optimizar ngFor */
  trackByFn(_: number, item: CarritoItem) {
    return item.id;
  }
}
