import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment'; 

@Injectable({ providedIn: 'root' })
export class EmpresasService {
   private apiUrl = `${environment.apiUrl}/superadmin`;

  constructor(private http: HttpClient) {}

  
  // 🔍 Todas las empresas (aprobadas, rechazadas, pendientes)
  getTodasEmpresas(): Observable<any[]> {
    return this.http.get<{ empresas: any[] }>(`${this.apiUrl}/empresas/lista`)
      .pipe(map(res => res.empresas));
  }
    
  // 🔎 Solo pendientes
  getEmpresasPendientes(): Observable<any[]> {
    return this.http.get<{ empresas: any[] }>(`${this.apiUrl}/empresas/pendientes`)
      .pipe(map(res => res.empresas));
  }  
  
  // ✅ Aprobar empresa
  aprobarEmpresa(id: number) {
    return this.http.put(`${this.apiUrl}/aprobar-empresa/${id}`, {});
  }

  // ❌ Rechazar empresa
  rechazarEmpresa(id: number) {
    return this.http.put(`${this.apiUrl}/rechazar-empresa/${id}`, {});
  }
}
