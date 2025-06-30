// sugerencias.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-sugerencias',
  imports: [CommonModule],
  templateUrl: './sugerencias.component.html',
})
export class SugerenciasComponent {
  sugerencias = [
    {
      usuario: 'luis@correo.com',
      rol: 'Turista',
      categoria: 'Idea',
      texto: 'Sería útil ver fotos panorámicas del lugar antes de reservar.',
      fecha: '2025-05-16 11:15 AM',
    },
    {
      usuario: 'emprendedora@yapura.pe',
      rol: 'Emprendedor',
      categoria: 'Mejora',
      texto: 'Debería poderse editar la información del paquete sin tener que eliminarlo.',
      fecha: '2025-05-15 16:40 PM',
    },
    {
      usuario: 'carla.turista@gmail.com',
      rol: 'Turista',
      categoria: 'Error',
      texto: 'El mapa no carga en el celular cuando hay poca señal.',
      fecha: '2025-05-15 13:20 PM',
    },
    {
      usuario: 'rosa.emp@capachica.pe',
      rol: 'Emprendedor',
      categoria: 'Otro',
      texto: 'Gracias por permitirnos participar en el proyecto.',
      fecha: '2025-05-14 09:50 AM',
    },
  ];
}
