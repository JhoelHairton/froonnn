import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-paquetes',
  standalone: true,
    imports: [CommonModule],
  templateUrl: './paquetes.component.html',
  styleUrl: './paquetes.component.css'
})
export class PaquetesComponent {
  paquetes = [
    {
      nombre: 'Aventura en Llachón 2D/1N',
      comunidad: 'Llachón',
      duracion: '2 días / 1 noche',
      precio: 180,
      imagen: 'https://www.example.com/img/llachon-paquete.jpg',
      servicios: [
        'Paseo en kayak',
        'Cena tradicional',
        'Hospedaje en casa local',
      ],
    },
    {
      nombre: 'Turismo cultural en Ccotos',
      comunidad: 'Ccotos',
      duracion: '3 días / 2 noches',
      precio: 260,
      imagen: 'https://www.example.com/img/ccotos-paquete.jpg',
      servicios: [
        'Taller de tejidos',
        'Alojamiento rural',
        'Tour guiado por miradores',
      ],
    },
    {
      nombre: 'Mística Isla Tikonata',
      comunidad: 'Tikonata',
      duracion: '1 día completo',
      precio: 120,
      imagen: 'https://www.example.com/img/tikonata.jpg',
      servicios: [
        'Paseo en bote',
        'Visita a centro ceremonial',
        'Almuerzo típico',
      ],
    },
  ];
}
