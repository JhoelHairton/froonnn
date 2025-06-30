import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

export interface CategoriaDTO {
  id?: number;
  name: string;
  description: string;
  status: 'active' | 'inactive';
}

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  // NEW: endpoint público
  private readonly endpoint = `${environment.apiUrl}/categorias-publicas`;

  constructor(private http: HttpClient) {}

  /** GET /api/categorias-publicas */
  getAll(): Observable<CategoriaDTO[]> {
    return this.http.get<CategoriaDTO[]>(this.endpoint);
  }
}
