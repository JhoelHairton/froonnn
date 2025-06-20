import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

export interface ComunidadPublica {
  id: number;
  name: string;
  descripcion_corta: string;
  descripcion_larga: string;
  atractivos: string;
  habitantes: number;
  estado: string;
  imagen: string | null;
  galeria: string[] | null;
}

@Injectable({ providedIn: 'root' })
export class ComunidadPublicaService {
  private readonly endpoint = 'http://localhost:8000/api/locations';

  constructor(private http: HttpClient) {}

  listar(): Observable<ComunidadPublica[]> {
    return this.http.get<ComunidadPublica[]>(this.endpoint);
  }

  getById(id: number): Observable<ComunidadPublica | undefined> {
    return this.listar().pipe(
      map(comunidades => comunidades.find(c => c.id === id))
    );
  }

  obtenerPorId(id: number): Observable<any> {
  return this.http.get(`${this.endpoint}/${id}`);
}



}
