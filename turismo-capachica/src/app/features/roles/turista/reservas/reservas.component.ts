// reservas.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { ReservaService } from '../../../../core/services/reserva.service';
import { AuthService } from '../../../../core/services/auth.service';
import { CarritoItem } from '../../../../core/services/carrito.service';
import { Router } from '@angular/router';

export interface Reserva {
  id: string;
  reservation_date: string;
  cart: CarritoItem[];
  total: number;
  estado?: string;
}

@Component({
  standalone: true,
  selector: 'app-reservas',
  imports: [CommonModule, NgFor, NgIf],
  templateUrl: './reservas.component.html',
})
export class ReservasComponent implements OnInit {
  reservas: any[] = [];
  cargando = true;

  constructor(private reservaSvc: ReservaService,
    private router: Router


  ) { }

  ngOnInit(): void {
    this.cargarReservas();
  }

  cargarReservas() {
    this.reservaSvc.getMisReservas().subscribe({
      next: (res) => {
        this.reservas = res;  // res es el array de reservas
        this.cargando = false;
      },
      error: (e) => {
        console.error('Error al cargar reservas', e);
        this.cargando = false;
      }
    });
  }
  irAPago(reserva: any): void {
  this.router.navigate(['/turista/pagos'], { queryParams: { reserva: reserva.id } });
}

  trackByReserva(index: number, reserva: any) {
    return reserva.id;
  }

  trackByItem(index: number, item: any) {
    return item.id;
  }


}
