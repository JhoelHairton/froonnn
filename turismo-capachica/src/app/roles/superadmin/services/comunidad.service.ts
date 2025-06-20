import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ComunidadDTO {
  id?: number;
  name: string;
  type: string;
  descripcion_corta: string;
  descripcion_larga: string;
  atractivos: string;
  habitantes: number;
  estado: 'activa' | 'inactiva' | string;
  imagen: string;
  galeria: string[];
  imagenUrl?: string;
  galeriaUrls?: string[];
}

@Injectable({ providedIn: 'root' })
export class ComunidadService {
  private readonly endpoint = 'http://localhost:8000/api/superadmin/comunidades';

  constructor(private http: HttpClient) {}

  list(): Observable<ComunidadDTO[]> {
    return this.http.get<ComunidadDTO[]>(this.endpoint);
  }

  /** Usamos POST siempre; si hay `id`, Laravel lo interpretará como PUT gracias a `_method` */
  save(formData: FormData, id?: number): Observable<HttpEvent<any>> {
    const url = id ? `${this.endpoint}/${id}` : this.endpoint;

    if (id) {
      // override para que Laravel sepa que es PUT
      formData.append('_method', 'PUT');
    }

    return this.http.post(url, formData, {
      reportProgress: true,
      observe: 'events'
    });
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.endpoint}/${id}`);
  }
}
