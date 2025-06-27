import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // NECESARIA
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

export interface JwtPayload {
  exp: number; // fecha de expiración como timestamp UNIX (segundos)
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:8000/api/auth';

  constructor(private http: HttpClient, private router: Router) {}

  login(credentials: { email: string; password: string }) {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials);
  }

  saveSession(data: any) {
  // Asegúrate de que `data.usuario` tenga `rol`
  localStorage.setItem('token', data.token);
  localStorage.setItem('user', JSON.stringify({
    id: data.usuario.id,
    nombre: data.usuario.nombre,
    email: data.usuario.email,
    rol: data.usuario.rol // ✅ Asegura incluir el rol
  }));
}


  getToken(): string | null {
    return localStorage.getItem('token');
  }
  // tras login:
  setToken(t: string) {
    localStorage.setItem('token', t);
  }

getUser(): { id: string; nombre: string; email: string; rol: string } | null {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
}


  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('carritoPendiente');  // 👈 Limpieza obligatoria
    localStorage.removeItem('user');
    this.router.navigate(['/']);
  }
  

  registerTurista(data: {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
  }) {
    return this.http.post<any>(`${this.apiUrl}/register-turista`, data);
  }
  
 // ⏱ Verificación de expiración
 isTokenExpired(): boolean {
  const token = this.getToken();
  if (!token) return true;

  try {
    const decoded = jwtDecode<JwtPayload>(token);
    const now = Math.floor(Date.now() / 1000);
    return decoded.exp < now;
  } catch (error) {
    console.error('Error al decodificar el token:', error);
    return true;
  }
 }

 
  
}