// inicio.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-inicio',
  imports: [CommonModule],
  templateUrl: './inicio.component.html',
})
export class InicioComponent {
  turista = {
    nombre: 'Luis Pérez',
  };

  sugerencias = [
    {
      titulo: 'Kayak en Llachón',
      comunidad: 'Llachón',
      imagen: 'https://www.kayak-laketiticaca.com/wp-content/uploads/kayak_llachon.jpg',
    },
    {
      titulo: 'Vivencia en Ccotos',
      comunidad: 'Ccotos',
      imagen: 'https://www.example.com/img/ccotos.jpg',
    },
    {
      titulo: 'Ruta mística en Tikonata',
      comunidad: 'Isla Tikonata',
      imagen: 'https://www.example.com/img/tikonata.jpg',
    },
  ];

  paquetes = [
    {
      nombre: 'Full Day en Capachica',
      precio: 120,
      imagen: 'https://www.example.com/img/full-day.jpg',
    },
    {
      nombre: '3D/2N Turismo Vivencial',
      precio: 280,
      imagen: 'https://www.example.com/img/vivencial.jpg',
    },
  ];

  novedades = [
    'Nuevo paquete vivencial disponible desde el 20 de mayo.',
    '¡Capachica fue destacada en un reportaje de TV Perú!',
    'Testimonios actualizados: revisa las experiencias reales de visitantes.',
  ];
}
