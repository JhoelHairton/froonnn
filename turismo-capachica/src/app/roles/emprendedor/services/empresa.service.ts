import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class EmpresaService {
  private apiUrl = 'http://localhost:8000/api/emprendedor';

  constructor(private http: HttpClient) {}

  registrarEmpresa(data: FormData) {
    return this.http.post(`${this.apiUrl}/crear-empresa`, data);
  }
}
