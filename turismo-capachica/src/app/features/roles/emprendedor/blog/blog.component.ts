import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Publicacion {
  id: number;
  titulo: string;
  contenido: string;
  fecha: string;
}
@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css'
})
export class BlogComponent {
  publicaciones: Publicacion[] = [
    {
      id: 1,
      titulo: 'Fiesta Patronal de Capachica',
      contenido: 'Descubre cómo se celebra esta importante tradición con danzas y comidas típicas.',
      fecha: '2025-05-10'
    },
    {
      id: 2,
      titulo: 'Guía para disfrutar el Lago Titicaca',
      contenido: 'Explora actividades imperdibles como paseos en bote, caminatas y hospedajes familiares.',
      fecha: '2025-05-12'
    }
  ];

  nuevaPublicacion: Publicacion = {
    id: 0,
    titulo: '',
    contenido: '',
    fecha: new Date().toISOString().split('T')[0]
  };

  guardarPublicacion() {
    if (!this.nuevaPublicacion.titulo.trim() || !this.nuevaPublicacion.contenido.trim()) return;

    this.publicaciones.unshift({
      ...this.nuevaPublicacion,
      id: this.publicaciones.length + 1,
    });

    this.nuevaPublicacion = {
      id: 0,
      titulo: '',
      contenido: '',
      fecha: new Date().toISOString().split('T')[0]
    };
  }

}
