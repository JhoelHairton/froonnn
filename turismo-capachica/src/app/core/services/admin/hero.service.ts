// src/app/services/hero.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class HeroService {
    
  private apiUrlSuperadmin = `${environment.apiUrl}/superadmin/portal-designs`;  
  private apiUrlLanding = `${environment.apiUrl}/landing/portal-designs`;         

  constructor(private http: HttpClient) {}


  getHero(portalId: number) {
    return this.http.get(`${this.apiUrlLanding}/${portalId}`);
  }

  updateHero(portalId: number, formData: any): Observable<any> {
    return this.http.post(`${this.apiUrlSuperadmin}/${portalId}`, formData, {
      withCredentials: true  // ✅ Si necesitas cookies o sesión protegida
    });
  }
}
