// src/app/services/categoria.service.ts
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
  private readonly endpoint = `${environment.apiUrl}/superadmin/experiencias/categorias`;  // ✅ URL desde environment

  constructor(private http: HttpClient) {}

  /** GET /categorias */
  getAll(): Observable<CategoriaDTO[]> {
    return this.http.get<CategoriaDTO[]>(this.endpoint);
  }

  /** POST /categorias */
  create(c: CategoriaDTO): Observable<{ message: string; category: CategoriaDTO }> {
    const payload = { name: c.name, description: c.description, status: c.status };
    return this.http.post<{ message: string; category: CategoriaDTO }>(this.endpoint, payload);
  }

  /** PUT /categorias/:id */
  update(c: CategoriaDTO): Observable<{ message: string; category: CategoriaDTO }> {
    if (!c.id) throw new Error('ID requerido');
    const payload = { name: c.name, description: c.description, status: c.status };
    return this.http.put<{ message: string; category: CategoriaDTO }>(
      `${this.endpoint}/${c.id}`,
      payload
    );
  }

  /** DELETE /categorias/:id */
  delete(id: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.endpoint}/${id}`);
  }
}
