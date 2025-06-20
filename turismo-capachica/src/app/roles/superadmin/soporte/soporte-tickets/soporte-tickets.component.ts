// soporte-tickets.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-soporte-tickets',
  imports: [CommonModule],
  templateUrl: './soporte-tickets.component.html',
})
export class SoporteTicketsComponent {
  tickets = [
    {
      email: 'jose.turista@gmail.com',
      rol: 'Turista',
      asunto: 'Problemas con la reserva',
      estado: 'Pendiente',
      prioridad: 'Alta',
      fecha: '2025-05-16 09:45 AM',
    },
    {
      email: 'maria.emp@capachica.pe',
      rol: 'Emprendedor',
      asunto: 'No puedo subir mi logo',
      estado: 'En proceso',
      prioridad: 'Media',
      fecha: '2025-05-15 16:30 PM',
    },
    {
      email: 'admin@capachica.gob.pe',
      rol: 'Superadmin',
      asunto: 'Consulta interna',
      estado: 'Resuelto',
      prioridad: 'Baja',
      fecha: '2025-05-15 11:12 AM',
    },
  ];
}
