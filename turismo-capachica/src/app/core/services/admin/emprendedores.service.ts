import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment'; 


@Injectable({ providedIn: 'root' })
export class EmprendedoresService {
  private baseUrl = `${environment.apiUrl}/superadmin/emprendedores`;

  constructor(private http: HttpClient) {}

  private getHeaders(token: string) {
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json'
    });
  }

  getEmprendedores(token: string): Observable<any> {
    return this.http.get(this.baseUrl, { headers: this.getHeaders(token) });
  }

  getKPIs(token: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/kpis`, { headers: this.getHeaders(token) });
  }

  crearEmprendedor(formData: FormData, token: string): Observable<any> {
    return this.http.post(this.baseUrl, formData, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    });
  }

  cambiarEstado(id: number, estado: string, token: string): Observable<any> {
  return this.http.put(`${this.baseUrl}/${id}/estado`, { estado }, {
    headers: this.getHeaders(token)
  });
}


  getDetalle(id: number, token: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`, { headers: this.getHeaders(token) });
  }
}
