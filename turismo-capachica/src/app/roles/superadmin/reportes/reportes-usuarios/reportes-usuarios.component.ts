import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-reportes-usuarios',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reportes-usuarios.component.html',
  styleUrl: './reportes-usuarios.component.css'
})
export class ReportesUsuariosComponent {

  total = 120;
  turistas = 70;
  emprendedores = 40;
  admins = 10;

  usuariosMensuales = [
    { mes: 'Enero', cantidad: 10 },
    { mes: 'Febrero', cantidad: 15 },
    { mes: 'Marzo', cantidad: 18 },
    { mes: 'Abril', cantidad: 22 },
    { mes: 'Mayo', cantidad: 25 },
    { mes: 'Junio', cantidad: 30 },
  ];
}
