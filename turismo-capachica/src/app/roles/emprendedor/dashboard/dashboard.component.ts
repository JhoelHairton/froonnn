import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule,
    HttpClientModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
   schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DashboardComponent implements OnInit {
data: {
    ventas_totales: number;
    reviews_received: number;
    visitas: number;
  } | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any>('http://localhost:8000/api/emprendedor/dashboard').subscribe({
      next: (res) => {
        this.data = {
          ventas_totales: res.ventas_totales,
          reviews_received: res['reseñas_recibidas'],
          visitas: res.visitas
        };
      },
      error: (err) => {
        console.error('Error al cargar datos del dashboard', err);
      }
    });
  }
}