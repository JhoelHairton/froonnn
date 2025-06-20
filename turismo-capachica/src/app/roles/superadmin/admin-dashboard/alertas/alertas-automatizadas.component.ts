import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-alertas-automatizadas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alertas-automatizadas.component.html',
  styleUrl: './alertas-automatizadas.component.css'
})
export class AlertasAutomatizadasComponent {
   alertas = [
    {
      tipo: 'rechazo',
      empresa: 'Aventura Llachón',
      cantidad: 6,
      mensaje: 'Rechazos consecutivos detectados',
    },
    {
      tipo: 'queja',
      turista: 'Juan Pérez',
      cantidad: 3,
      mensaje: 'Múltiples quejas registradas',
    },
    {
      tipo: 'rechazo',
      empresa: 'Hospedaje Escallani',
      cantidad: 5,
      mensaje: 'Alto número de cancelaciones',
    },
  ];
}
