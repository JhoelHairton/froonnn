import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface CarritoItem {
  type: 'service' | 'promotion';
  id: number;
  title: string;
  price: number;
  quantity: number;

  cupos?: number;

}

export interface CartSummary {
  cart: CarritoItem[];
    total: number;

  // Si tu API devuelve más campos, agrégalos aquí
}

@Injectable({ providedIn: 'root' })
export class CarritoService {
  private readonly API_BASE = 'http://localhost:8000/api/cart';

  constructor(private http: HttpClient) {}

  /** Obtiene el carrito completo */
  getCart(): Observable<CarritoItem[]> {
    return this.http.get<CarritoItem[]>(
      `${this.API_BASE}`,
      { withCredentials: true }
    );
  }

  /** Agrega un servicio al carrito */
  addService(id: number): Observable<CarritoItem[]> {
    return this.http.post<CarritoItem[]>(
      `${this.API_BASE}/service/${id}`,
      {},
      { withCredentials: true }
    );
  }

  /** Agrega una promoción al carrito */
  addPromotion(id: number): Observable<CarritoItem[]> {
    return this.http.post<CarritoItem[]>(
      `${this.API_BASE}/promotion/${id}`,
      {},
      { withCredentials: true }
    );
  }

  /** Elimina un ítem del carrito */
  removeItem(tipo: 'service' | 'promotion', id: number): Observable<CarritoItem[]> {
    return this.http.delete<CarritoItem[]>(
      `${this.API_BASE}/${tipo}/${id}`,
      { withCredentials: true }
    );
  }

  /** Vacía todo el carrito */
  clearCart(): Observable<void> {
    return this.http.delete<void>(
      `${this.API_BASE}`,
      { withCredentials: true }
    );
  }

  /** Obtiene sólo el resumen (totales, descuentos) 
  getSummary(): Observable<CartSummary> {
    return this.http.get<CartSummary>(
      `${this.API_BASE}/summary`,
      { withCredentials: true }
    );
  } */
}
