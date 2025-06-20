// reservas.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservaService } from '../../../core/services/reserva.service';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  standalone: true,
  selector: 'app-reservas',
  imports: [CommonModule],
  templateUrl: './reservas.component.html',
})
export class ReservasComponent {


  reservas: any[] = [];

constructor(private reservaService: ReservaService, private authService: AuthService) {}

ngOnInit(): void {
  const user = this.authService.getUser();
  if (user) {
    this.reservas = this.reservaService.obtenerReservasPorUsuario(user.id);
  }
}

cancelarReserva(reservaId: string) {
  if (confirm('¿Estás seguro de que deseas cancelar esta reserva?')) {
    this.reservaService.cancelarReserva(reservaId);

    // 🔄 Recargar las reservas actualizadas
    const user = this.authService.getUser();
    if (user) {
      this.reservas = this.reservaService.obtenerReservasPorUsuario(user.id);
    }
  }
}



  
}

