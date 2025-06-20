// src/app/services/hero.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class HeroService {
  private apiUrl = 'http://localhost:8000/api/superadmin/portal-designs';

  constructor(private http: HttpClient) {}

  /**
   * Obtener contenido del Hero para un portal específico
   */
  getHero(portalId: number) {
  return this.http.get(`http://localhost:8000/api/landing/portal-designs/${portalId}`);
}


  /**
   * Actualizar contenido del Hero para un portal
   */
  updateHero(portalId: number, formData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/${portalId}`, formData, {
      withCredentials: true, // ✅ Importante también en POST protegidos
    });
  }
}
