import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AgendaService {
  private http = inject(HttpClient);
  private api = 'http://localhost:8000/api/emprendedor';

  // Fechas ocupadas por reservas (bloquea en el calendario)
  getOccupiedDates(serviceId: number): Observable<string[]> {
    return this.http.get<string[]>(`${this.api}/service/${serviceId}/occupied-dates`);
  }

  // Eventos personales (del emprendedor)
  listPersonalEvents(): Observable<any[]> {
    return this.http.get<any[]>(`${this.api}/personal-events`);
  }

  // Crear evento personal
  createPersonalEvent(data: {
    title: string;
    description?: string;
    start_time: string;
    end_time: string;
    status?: string;
  }): Observable<any> {
    return this.http.post(`${this.api}/personal-events`, data);
  }

  // Actualizar evento personal
  updatePersonalEvent(id: number, data: Partial<{
    title: string;
    description?: string;
    start_time: string;
    end_time: string;
    status?: string;
  }>): Observable<any> {
    return this.http.put(`${this.api}/personal-events/${id}`, data);
  }

  // Eliminar evento personal
  deletePersonalEvent(id: number): Observable<any> {
    return this.http.delete(`${this.api}/personal-events/${id}`);
  }
}
