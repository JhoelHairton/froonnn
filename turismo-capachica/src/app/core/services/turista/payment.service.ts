import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface PaymentMethod {
  id?: number;
  card_number: string;
  cardholder_name: string;
  expiry_month: number;
  expiry_year: number;
  cvv: string;
  brand: string;
  created_at?: string;
  updated_at?: string;
}

export interface PaymentConfirmation {
  payment_method_id: number;
}

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private baseUrl = 'http://localhost:8000/api/turista';
  private token = localStorage.getItem('auth_token') || '';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    });
  }

  // 1️⃣ Listar Métodos de Pago
  getPaymentMethods(): Observable<any> {
    return this.http.get(`${this.baseUrl}/payment-methods`, {
      headers: this.getHeaders()
    });
  }

  // 2️⃣ Registrar un Nuevo Método de Pago
  createPaymentMethod(paymentMethod: PaymentMethod): Observable<any> {
    return this.http.post(`${this.baseUrl}/payment-methods`, paymentMethod, {
      headers: this.getHeaders()
    });
  }

  // 3️⃣ Ver Detalle de un Método de Pago
  getPaymentMethod(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/payment-methods/${id}`, {
      headers: this.getHeaders()
    });
  }

  // 4️⃣ Actualizar Método de Pago
  updatePaymentMethod(id: number, paymentMethod: Partial<PaymentMethod>): Observable<any> {
    return this.http.put(`${this.baseUrl}/payment-methods/${id}`, paymentMethod, {
      headers: this.getHeaders()
    });
  }

  // 5️⃣ Eliminar Método de Pago
  deletePaymentMethod(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/payment-methods/${id}`, {
      headers: this.getHeaders()
    });
  }

  // 6️⃣ Confirmar Pago
  confirmPayment(bookingId: number, paymentData: PaymentConfirmation): Observable<any> {
    return this.http.post(`${this.baseUrl}/bookings/${bookingId}/pay`, paymentData, {
      headers: this.getHeaders()
    });
  }
}