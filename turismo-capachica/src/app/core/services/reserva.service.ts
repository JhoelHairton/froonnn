import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { CarritoItem, CartSummary } from './carrito.service';
import { environment } from '../../../environments/environment';

export interface ReservaPayload {
  items: CarritoItem[];
  summary: CartSummary;
  usuario?: {
    id: number | string;
    nombre: string;
    email: string;
  };
  fecha?: string;
  estado?: string;
}

export interface CheckoutPayload {
  reservation_date: string;
  cart: { id: number; type: string; quantity: number }[];
}


@Injectable({ providedIn: 'root' })
export class ReservaService {
  private readonly RESERVAS_API = `${environment.apiUrl}/reservas`;
  private readonly TURISTA_API = `${environment.apiUrl}/turista`;
  private readonly STORAGE_KEY    = 'reservas_turistas';

  constructor(private http: HttpClient) {}


  crearReserva(payload: ReservaPayload): Observable<any> {
    return this.http.post<any>(this.RESERVAS_API, payload);
  }

  checkout(payload: CheckoutPayload): Observable<any> {
    return this.http.post(
      `${this.TURISTA_API}/checkout`,
      payload,
      { withCredentials: true }
    );
  }

getMisReservas(): Observable<any[]> {
  return this.http.get<any>(
    `${this.TURISTA_API}/bookings`,
    { withCredentials: true }
  ).pipe(
    map(res => res.data)  
  );
}

  guardarReservaLocal(reserva: any): void {
    const data = this.obtenerReservasLocal();
    data.push(reserva);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
  }

  obtenerReservasLocal(): any[] {
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }

  obtenerReservasPorUsuario(usuarioId: string): any[] {
    return this.obtenerReservasLocal().filter(r => r.usuario?.id === usuarioId);
  }

  cancelarReserva(idReserva: string): void {
    const updated = this.obtenerReservasLocal().map(r =>
      r.id === idReserva ? { ...r, estado: 'cancelada' } : r
    );
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(updated));
  }
}
