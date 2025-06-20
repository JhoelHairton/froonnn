import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CarritoService, CarritoItem } from '../../core/services/carrito.service';
import { AuthService } from '../../core/services/auth.service';
import { v4 as uuidv4 } from 'uuid'; // si no usas crypto.randomUUID()
import { ReservaService } from '../../core/services/reserva.service';


@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.css',
})
export class CarritoComponent implements OnInit {

  @Input() items: CarritoItem[] = [];
  @Output() cerrar = new EventEmitter<void>();
  @Output() confirmar = new EventEmitter<any>();

  mostrarToast = false;

  constructor(
    private carritoService: CarritoService,
    private authService: AuthService,
    private router: Router,
    private reservaService: ReservaService,

  ) {}

  ngOnInit(): void {
    this.items = this.carritoService.obtenerItems();
  }

  get total(): number {
    return this.carritoService.obtenerTotal();
  }

  get totalFinal(): number {
    return this.total - this.carritoService.calcularDescuento();
  }

  get descuento(): number {
    return this.carritoService.calcularDescuento();
  }

  getTotalItems(): number {
    return this.carritoService.obtenerCantidadTotal();
  }

cambiarCantidad(item: CarritoItem, cambio: number) {
  const nuevaCantidad = item.cantidad + cambio;
  const max = item.ref?.cupos ?? Infinity;

  if (nuevaCantidad >= 1 && nuevaCantidad <= max) {
    this.carritoService.actualizarCantidadPorUid(item.uid, nuevaCantidad); // ✅ Usa uid
    this.items = [...this.carritoService.obtenerItems()];
  }
}


eliminar(item: CarritoItem) {
  this.carritoService.eliminarPorUid(item.uid);
  this.items = this.carritoService.obtenerItems();
}


  cerrarCarrito() {
    this.cerrar.emit();
  }

confirmarReserva() {
  if (!this.authService.isLoggedIn()) {
    localStorage.setItem('carritoPendiente', JSON.stringify(this.items));
    this.router.navigate(['/auth/login']);
    return;
  }

  const user = this.authService.getUser();
  if (!user) {
    alert('No se pudo identificar al usuario.');
    return;
  }

  const reserva = {
    id: crypto.randomUUID(),
    usuario: {
      id: user.id,
      nombre: user.nombre,
      email: user.email
    },
    items: this.items,
    total: this.totalFinal,
    descuento: this.descuento,
    fecha: new Date().toISOString(),
    estado: 'pendiente'
  };

  this.guardarReservaEnLocalStorage(reserva); // ✅ Aquí se guarda

  this.mostrarToast = true;
  this.confirmar.emit(reserva);

  setTimeout(() => {
    this.mostrarToast = false;
    this.carritoService.limpiar();
    this.items = [];
  }, 3000);
}

guardarReservaEnLocalStorage(reserva: any) {
  const reservas = JSON.parse(localStorage.getItem('reservas') || '{}');

  if (!reservas[reserva.usuario.id]) {
    reservas[reserva.usuario.id] = [];
  }

  reservas[reserva.usuario.id].push(reserva);
  localStorage.setItem('reservas', JSON.stringify(reservas));
}




private getReservaData() {
  const user = this.authService.getUser(); // ⚠️ Asegúrate de que esto devuelva un objeto real

  return {
    id: crypto.randomUUID(), // o uuidv4()
    usuario: {
      id: user?.id ?? 'anonimo',
      nombre: user?.nombre ?? 'Sin nombre',
      email: user?.email ?? '',
    },
    items: this.items,
    total: this.totalFinal,
    descuento: this.descuento,
    fecha: new Date().toISOString(),
    estado: 'pendiente'
  };
}


  getCuposDisponibles(item: any): number {
    return (item.ref?.cupos ?? 0) - (item.cantidad || 1) + 1;
  }

  getCuposClass(item: any): string {
    const cuposDisponibles = this.getCuposDisponibles(item);
    if (cuposDisponibles > 5) return 'bg-green-100 text-green-800';
    if (cuposDisponibles > 2) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  }
}
