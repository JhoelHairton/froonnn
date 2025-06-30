import { NgClass, NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-historial-reserva',
  standalone: true,
  imports: [NgClass, NgFor],
  templateUrl: './historial-reserva.component.html',
  styleUrl: './historial-reserva.component.css'
})
export class HistorialReservaComponent {
@Input() historial = [
    { fecha: '2025-06-01', evento: 'Reserva creada', tipo: 'creado' },
    { fecha: '2025-06-02', evento: 'Confirmación por la empresa', tipo: 'confirmado' },
    { fecha: '2025-06-03', evento: 'Reporte por turista', tipo: 'reporte' },
  ];
}
