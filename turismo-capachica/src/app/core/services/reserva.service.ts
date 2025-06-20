import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ReservaService {
  private STORAGE_KEY = 'reservas_turistas';

  constructor() {}

  guardarReserva(reserva: any): void {
    const data = this.obtenerReservas();
    data.push(reserva);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
  }

  obtenerReservas(): any[] {
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }

 obtenerReservasPorUsuario(usuarioId: string): any[] {
  const reservas = JSON.parse(localStorage.getItem('reservas') || '{}');
  return reservas[usuarioId] || [];
}
cancelarReserva(idReserva: string): void {
  const reservas = this.obtenerReservas();
  const nuevasReservas = reservas.map(r => {
    if (r.id === idReserva) {
      return { ...r, estado: 'cancelada' };
    }
    return r;
  });
  localStorage.setItem('reservas', JSON.stringify(nuevasReservas));
}

  
}
