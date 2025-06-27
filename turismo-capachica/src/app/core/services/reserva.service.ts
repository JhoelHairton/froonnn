// src/app/core/services/reserva.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import { CarritoItem, CartSummary } from './carrito.service';

/** Payload para el endpoint genérico de creación de reserva */
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

/** Payload específico para el checkout de turista */
export interface CheckoutPayload {
  reservation_date: string;
  cart: { id: number; type: string; quantity: number }[];
}


@Injectable({ providedIn: 'root' })
export class ReservaService {
  private readonly RESERVAS_API   = 'http://localhost:8000/api/reservas';
  private readonly TURISTA_API    = 'http://localhost:8000/api';
  private readonly STORAGE_KEY    = 'reservas_turistas';

  constructor(private http: HttpClient) {}

  // ─────────────────────────────────────────────────────────────────────────────
  // 1) Métodos de backend
  // ─────────────────────────────────────────────────────────────────────────────

  /** Crea una reserva genérica en /api/reservas */
  crearReserva(payload: ReservaPayload): Observable<any> {
    return this.http.post<any>(this.RESERVAS_API, payload);
  }

  /** Checkout de turista: POST /api/turista/checkout */
  checkout(payload: CheckoutPayload): Observable<any> {
    return this.http.post(
      `${this.TURISTA_API}/turista/checkout`,
      payload,
      { withCredentials: true }
    );
  }

  /** Obtiene las reservas del turista logueado: GET /api/turista/reservas */
getMisReservas(): Observable<any[]> {
  return this.http.get<any>(
    `${this.TURISTA_API}/turista/bookings`,
    { withCredentials: true }
  ).pipe(
    map(res => res.data)  // 👈 Solo devolvemos el array de reservas
  );
}

  // ─────────────────────────────────────────────────────────────────────────────
  // 2) Fallback/localStorage (si quieres guardar localmente)
  // ─────────────────────────────────────────────────────────────────────────────

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
