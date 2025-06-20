import { CommonModule, NgClass, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-reportes-ventas',
  standalone: true,
  imports: [CommonModule,FormsModule,NgFor ],
  templateUrl: './reportes-ventas.component.html',
  styleUrl: './reportes-ventas.component.css'
})
export class ReportesVentasComponent {
  fechaInicio!: string;
  fechaFin!: string;

  totalVentas = 0;
  ingresos = 0;
  cantidadReservas = 0;

  ventas: any[] = [];

  buscarVentas() {
    // Simulación (reemplaza con llamada al backend)
    this.ventas = [
      { cliente: 'Carlos', experiencia: 'Tour Isla Uros', fecha: '2025-05-01', total: 120 },
      { cliente: 'Ana', experiencia: 'Hospedaje Taquile', fecha: '2025-05-02', total: 180 },
    ];

    this.totalVentas = this.ventas.length;
    this.cantidadReservas = this.ventas.length;
    this.ingresos = this.ventas.reduce((acc, v) => acc + v.total, 0);
  }
}
