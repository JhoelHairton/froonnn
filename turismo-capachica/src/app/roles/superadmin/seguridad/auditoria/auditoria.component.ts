// auditoria.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-auditoria',
  imports: [CommonModule],
  templateUrl: './auditoria.component.html',
})
export class AuditoriaComponent {
  auditoria = [
    {
      usuario: 'admin@capachica.gob.pe',
      rol: 'Superadmin',
      accion: 'Aprobó testimonio',
      entidad: 'Testimonio: José en Chifrón',
      metodo: 'APPROVE',
      fecha: '2025-05-16 08:45 AM',
    },
    {
      usuario: 'emprendedor1@capachica.pe',
      rol: 'Emprendedor',
      accion: 'Actualizó empresa',
      entidad: 'Empresa: Hospedaje Tikonata',
      metodo: 'UPDATE',
      fecha: '2025-05-15 18:33 PM',
    },
    {
      usuario: 'admin@capachica.gob.pe',
      rol: 'Superadmin',
      accion: 'Eliminó contenido del blog',
      entidad: 'Blog: Tradiciones de Ccotos',
      metodo: 'DELETE',
      fecha: '2025-05-14 15:20 PM',
    },
    {
      usuario: 'admin@capachica.gob.pe',
      rol: 'Superadmin',
      accion: 'Editó configuración del sistema',
      entidad: 'Configuración general',
      metodo: 'UPDATE',
      fecha: '2025-05-13 12:00 PM',
    },
  ];
}
