import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class EmpresaService {
  
  private apiUrl = `${environment.apiUrl}/emprendedor`;

  constructor(private http: HttpClient) {}

  registrarEmpresa(data: FormData) {
    return this.http.post(`${this.apiUrl}/crear-empresa`, data);
  }
}
