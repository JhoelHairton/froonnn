import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule }    from '@angular/common';
import { FormsModule }     from '@angular/forms';
import Swal from 'sweetalert2';
import { BookingService, Booking, BookingItem } from '../services/booking.service';

interface Estadisticas {
  pendientes: number;
  confirmadas: number;
  completadas: number;
  canceladas: number;
}

@Component({
  selector: 'app-reservas',
  standalone: true,                     // <<--- aquí
  imports: [
    CommonModule,                       // para ngIf, ngFor, ngClass…
    FormsModule                         // para ngModel
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],    // <<--- aquí para iconify-icon
  templateUrl: './reservas.component.html',
  styleUrls: ['./reservas.component.css']
  


})
export class ReservasComponent implements OnInit {
  reservas: Booking[] = [];
  reservasFiltradas: Booking[] = [];
  serviciosDisponibles: { id: number; title: string }[] = [];

  estadisticas: Estadisticas = { pendientes: 0, confirmadas: 0, completadas: 0, canceladas: 0 };

  filtroEstado = '';
  filtroFecha  = '';
  filtroServicio = '';

  loading = false;

  constructor(private bookingSvc: BookingService) {}

  ngOnInit(): void {
    this.cargarDatos();
  }

  private cargarDatos(): void {
    this.loading = true;
    this.bookingSvc.list().subscribe({
      next: data => {
        this.reservas = data;
        this.reservasFiltradas = [...data];
        this.extraerServicios(data);
        this.calcularEstadisticas();
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        Swal.fire('Error', 'No se pudieron cargar las reservas', 'error');
      }
    });
  }

  /** Extrae todos los servicios únicos para el select */
  private extraerServicios(bookings: Booking[]): void {
    const mapa = new Map<number,string>();
    bookings.forEach(b =>
      b.items.forEach(i =>
        mapa.set(i.service.id, i.service.title)
      )
    );
    this.serviciosDisponibles = Array.from(mapa, ([id, title]) => ({ id, title }));
  }

  /** Cuenta cada estado */
  private calcularEstadisticas(): void {
    this.estadisticas = {
      pendientes:  this.reservas.filter(r => r.status === 'pending').length,
      confirmadas: this.reservas.filter(r => r.status === 'confirmed').length,
      completadas: this.reservas.filter(r => r.status === 'completed').length,
      canceladas:  this.reservas.filter(r => r.status === 'cancelled').length,
    };
  }

  aplicarFiltros(): void {
    this.reservasFiltradas = this.reservas.filter(r => {
      const byEstado   = this.filtroEstado   ? r.status === this.filtroEstado   : true;
      const byFecha    = this.filtroFecha
        ? new Date(r.reservation_date).toDateString() === new Date(this.filtroFecha).toDateString()
        : true;
      const byServicio = this.filtroServicio
        ? r.items.some(i => String(i.service.id) === this.filtroServicio)
        : true;
      return byEstado && byFecha && byServicio;
    });
  }

  limpiarFiltros(): void {
    this.filtroEstado = '';
    this.filtroFecha  = '';
    this.filtroServicio = '';
    this.reservasFiltradas = [...this.reservas];
  }

  confirmarReserva(id: number): void {
    this.bookingSvc.updateStatus(id, 'confirmed').subscribe({
      next: updated => this._actualizaLocal(updated, '¡Reserva confirmada!'),
      error: () => Swal.fire('Error', 'No se pudo confirmar', 'error')
    });
  }

  completarReserva(id: number): void {
    this.bookingSvc.updateStatus(id, 'completed').subscribe({
      next: updated => this._actualizaLocal(updated, '¡Reserva completada!'),
      error: () => Swal.fire('Error', 'No se pudo completar', 'error')
    });
  }

  cancelarReserva(id: number): void {
    Swal.fire({
      title: '¿Seguro que deseas cancelar?',
      icon: 'warning',
      showCancelButton: true
    }).then(res => {
      if (res.isConfirmed) {
        this.bookingSvc.updateStatus(id, 'cancelled').subscribe({
          next: updated => this._actualizaLocal(updated, 'Reserva cancelada'),
          error: () => Swal.fire('Error', 'No se pudo cancelar', 'error')
        });
      }
    });
  }

  /** Actualiza el array local y recuenta */
  private _actualizaLocal(updated: Booking, msg: string): void {
    const idx = this.reservas.findIndex(r => r.id === updated.id);
    if (idx > -1) {
      this.reservas[idx] = updated;
      this.reservasFiltradas = [...this.reservas];
      this.calcularEstadisticas();
      Swal.fire('¡Hecho!', msg, 'success');
    }
  }

   /**
   * Abre un SweetAlert2 con el detalle de servicios y promociones
   */
   verDetalles(id: number): void {
    this.bookingSvc.get(id).subscribe({
      next: booking => {
        // Construimos un HTML con Tailwind para SweetAlert2
        const html = `
          <div class="space-y-4 text-left">
            <p class="text-sm text-gray-600 mb-2">
              <strong>Reserva #${booking.id}</strong> — 
              ${new Date(booking.reservation_date).toLocaleDateString()}
            </p>
            ${booking.items.map(item => {
              const title = item.type === 'service'
                ? item.service.title
                : item.promotion?.title ?? '—';
              return `
                <div class="bg-gray-50 p-4 rounded-lg shadow-sm">
                  <div class="flex justify-between items-center mb-2">
                    <span class="uppercase text-xs font-semibold text-gray-500">${item.type}</span>
                    <span class="text-sm font-medium">${title}</span>
                  </div>
                  <div class="grid grid-cols-2 gap-4 text-sm text-gray-700">
                    <div>
                      <p class="text-gray-500">Antes</p>
                      <p class="font-medium">S/. ${item.price_before}</p>
                    </div>
                    <div>
                      <p class="text-gray-500">Después</p>
                      <p class="font-medium">S/. ${item.price_after}</p>
                    </div>
                    <div>
                      <p class="text-gray-500">Cantidad</p>
                      <p class="font-medium">${item.quantity}</p>
                    </div>
                  </div>
                </div>
              `;
            }).join('')}
            <p class="text-right text-sm font-semibold mt-2">
              Total: <span class="text-lg">S/. ${booking.total_amount}</span>
            </p>
          </div>
        `;
  
        Swal.fire({
          title: 'Detalle de Reserva',
          html,
          width: 600,
          confirmButtonText: 'Cerrar',
          customClass: {
            popup: 'p-6'
          }
        });
      },
      error: () => Swal.fire('Error', 'No se pudo cargar el detalle', 'error')
    });
  }
  



  contactarTurista(email: string): void {
    console.log('Contactar a', email);
    // abrir chat o lo que uses
  }

  /** Mapea estado a texto humano */
  getEstadoTexto(estado: Booking['status']): string {
    const map: Record<string,string> = {
      pending:   'Pendiente',
      confirmed: 'Confirmada',
      completed: 'Completada',
      cancelled: 'Cancelada'
    };
    return map[estado] || estado;
  }

  /** Suma todas las cantidades para mostrar “Personas” */
  getNumeroPersonas(r: Booking): number {
    return r.items.reduce((sum, i) => sum + i.quantity, 0);
  }

  /** Devuelve el total formateado */
  getPrecioTotal(r: Booking): string {
    return r.total_amount;
  }
}