import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { map, shareReplay, take } from 'rxjs/operators';

import { CarritoService, CarritoItem } from '../../../core/services/carrito.service';
import { AuthService } from '../../../core/services/auth.service';
import { ReservaService, CheckoutPayload } from '../../../core/services/reserva.service';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
  @Output() cerrar = new EventEmitter<void>();

  /** Stream de ítems cacheado */
  items$: Observable<CarritoItem[]>;

  /** Total calculado */
  total$: Observable<number>;

  mostrarToast = false;
  private items: CarritoItem[] = [];

  constructor(
    private carritoService: CarritoService,
    private auth:           AuthService,
    private reservaSvc:     ReservaService,
    private router:         Router
  ) {
    // Carga inicial y garantiza quantity mínimo 1
    this.items$ = this.carritoService.getCart().pipe(
      map(items => items.map(i => ({ ...i, quantity: i.quantity || 1 }))),
      shareReplay({ bufferSize: 1, refCount: true })
    );

    // Total en base a cantidad
    this.total$ = this.items$.pipe(
      map(items => items.reduce((sum, i) => sum + i.price * i.quantity, 0))
    );
  }

  ngOnInit() {
    this.items$.subscribe(items => this.items = items);
  }

  cerrarCarrito() {
    this.cerrar.emit();
  }

  incrementar(item: CarritoItem) {
    item.quantity += 1;

    const call$ = item.type === 'service'
      ? this.carritoService.addService(item.id)
      : this.carritoService.addPromotion(item.id);

    call$.subscribe(); // No recargar, solo sincronizas
  }

  decrementar(item: CarritoItem) {
    if (item.quantity > 1) {
      item.quantity -= 1;

      this.carritoService.removeItem(item.type, item.id)
        .subscribe();
    }
  }

  eliminar(item: CarritoItem) {
    this.carritoService.removeItem(item.type, item.id)
      .subscribe(() => this.recargar());
  }

  vaciarCart() {
    this.carritoService.clearCart()
      .subscribe(() => this.recargar());
  }

  confirmarReserva() {
    const hoy = new Date().toISOString().split('T')[0];

    const payload: CheckoutPayload = {
      reservation_date: hoy,
      cart: this.items.map(i => ({
        id: i.id,
        type: i.type,
        quantity: i.quantity
      }))
    };

    if (!this.auth.isLoggedIn()) {
      localStorage.setItem('carritoPendiente', JSON.stringify(payload));
      this.router.navigate(['/auth/login'], { queryParams: { returnUrl: this.router.url } });
      return;
    }

    this.reservaSvc.checkout(payload).subscribe({
      next: () => {
        this.mostrarToast = true;
        setTimeout(() => this.mostrarToast = false, 3000);
        this.vaciarCart();
        this.router.navigate(['/turista/reservas']);
      },
      error: err => console.error('Error en checkout', err)
    });
  }

  /** Refresca los items solo en acciones globales */
  private recargar() {
    this.items$ = this.carritoService.getCart().pipe(
      map(items => items.map(i => ({ ...i, quantity: i.quantity || 1 }))),
      shareReplay({ bufferSize: 1, refCount: true })
    );

    this.items$.subscribe(items => this.items = items);
  }

  trackByFn(_: number, item: CarritoItem) {
    return item.id;
  }
}
