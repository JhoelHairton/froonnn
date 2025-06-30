import { Injectable } from '@angular/core';
import { HttpClient }      from '@angular/common/http';
import { Observable }      from 'rxjs';
import { environment } from '../../../../environments/environment';

export interface Promotion {
  id?: number;
  title: string;
  description: string;
  discount_percentage: number;
  start_date: string;   // YYYY-MM-DD
  end_date:   string;   // YYYY-MM-DD
  status:     'active' | 'inactive';
  service_ids: number[];
  services?:  { id: number; title: string }[];
}

@Injectable({ providedIn: 'root' })
export class PromotionService {
    private base = `${environment.apiUrl}/emprendedor/promociones`; 

  constructor(private http: HttpClient) {}

  /** Listar todas las promociones */
  list(): Observable<Promotion[]> {
    return this.http.get<Promotion[]>(this.base);
  }

  /** Ver una sola promoción */
  get(id: number): Observable<Promotion> {
    return this.http.get<Promotion>(`${this.base}/${id}`);
  }

  /** Crear nueva promoción */
  create(data: Omit<Promotion, 'id' | 'services'>): Observable<{ message: string; promotion: Promotion }> {
    return this.http.post<{ message: string; promotion: Promotion }>(this.base, data);
  }

  /** Actualizar promoción existente */
  update(id: number, data: Partial<Omit<Promotion, 'id' | 'services'>>): Observable<{ message: string; promotion: Promotion }> {
    return this.http.put<{ message: string; promotion: Promotion }>(`${this.base}/${id}`, data);
  }

  /** Eliminar promoción */
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.base}/${id}`);
  }
}
