import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-logs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './logs.component.html',
  styleUrl: './logs.component.css'
})
export class LogsComponent {
logs = [
    {
      usuario: 'juan.perez@correo.com',
      rol: 'Turista',
      accion: 'Inició sesión',
      ip: '190.42.65.103',
      fecha: '2025-05-16 10:30 AM',
    },
    {
      usuario: 'maria.lopez@capachica.pe',
      rol: 'Emprendedor',
      accion: 'Editó información de empresa',
      ip: '186.23.75.14',
      fecha: '2025-05-16 09:12 AM',
    },
    {
      usuario: 'admin@capachica.gob.pe',
      rol: 'Superadmin',
      accion: 'Aprobó experiencia de turismo vivencial',
      ip: '127.0.0.1',
      fecha: '2025-05-15 18:55 PM',
    },
    {
      usuario: 'jose.garcia@correo.com',
      rol: 'Turista',
      accion: 'Reservó paquete turístico',
      ip: '200.45.80.205',
      fecha: '2025-05-15 17:20 PM',
    },
  ];
}
