import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class TuristasService {
   private baseUrl = `${environment.apiUrl}/superadmin/turistas`;

  constructor(private http: HttpClient) {}

  getTuristas(token: string): Observable<any> {
    const headers = this.getHeaders(token);
    return this.http.get(this.baseUrl, { headers });
  }

  getDetalleTurista(id: number, token: string): Observable<any> {
    const headers = this.getHeaders(token);
    return this.http.get(`${this.baseUrl}/${id}`, { headers });
  }

  cambiarEstado(id: number, estado: string, token: string): Observable<any> {
    const headers = this.getHeaders(token);
    return this.http.put(`${this.baseUrl}/${id}/status`, { estado }, { headers });
  }

  private getHeaders(token: string) {
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    });
  }
}
