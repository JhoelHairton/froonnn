import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface BookingItem {
  id: number;
  booking_id: number;
  type: 'service' | 'promotion';
  service_id: number;
  promotion_id: number | null;
  quantity: number;
  price_before: string;
  price_after: string;
  created_at: string;
  updated_at: string;
  service: {
    id: number;
    title: string;
    company: { user_id: number };
  };
  promotion?: { id: number; title: string } | null;
}

export interface Booking {
  id: number;
  user_id: number;
  reservation_date: string;
  total_amount: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  paid_at: string | null;
  created_at: string;
  updated_at: string;
  items: BookingItem[];
  user: { id: number; name: string; email: string; foto: string | null };
}

@Injectable({ providedIn: 'root' })
export class BookingService {
  private readonly base = 'http://localhost:8000/api/emprendedor/bookings';

  constructor(private http: HttpClient) {}

  /** Lista todas las reservas */
  list(): Observable<Booking[]> {
    return this.http.get<Booking[]>(this.base);
  }

  /** Obtiene el detalle de una reserva por ID */
  get(id: number): Observable<Booking> {
    return this.http.get<Booking>(`${this.base}/${id}`);
  }

  /** Actualiza el estado de una reserva */
  updateStatus(id: number, status: Booking['status']): Observable<Booking> {
    return this.http.put<Booking>(
      `${this.base}/${id}/status`,
      { status }
    );
  }
}
