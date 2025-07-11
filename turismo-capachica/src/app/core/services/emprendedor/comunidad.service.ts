import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

export interface ComunidadDTO {
  id: number;
  name: string;
  type?: string;
  descripcion_corta?: string;
  descripcion_larga?: string;
  atractivos?: string;
  habitantes?: number;
  estado?: string;
  imagen?: string;
  galeria?: string[];
}

@Injectable({ providedIn: 'root' })
export class ComunidadService {
  // Ahora apunta al endpoint público
   private readonly endpoint = `${environment.apiUrl}/locations`;

  constructor(private http: HttpClient) {}

  /** GET /api/locations */
  list(): Observable<ComunidadDTO[]> {
    return this.http.get<ComunidadDTO[]>(this.endpoint);
  }
}