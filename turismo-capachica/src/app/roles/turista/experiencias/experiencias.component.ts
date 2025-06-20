// experiencias.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-experiencias',
  imports: [CommonModule, FormsModule],
  templateUrl: './experiencias.component.html',
})
export class ExperienciasComponent {
  categorias = ['Aventura', 'Cultura', 'Naturaleza'];
  comunidades = ['Llachón', 'Ccotos', 'Tikonata', 'Chifrón', 'Escallani'];

  filtro = {
    texto: '',
    categoria: '',
    comunidad: '',
    ratingMinimo: ''
  };

  experiencias = [
    {
      titulo: 'Kayak en Llachón',
      comunidad: 'Llachón',
      categoria: 'Aventura',
      imagen: 'https://www.kayak-laketiticaca.com/wp-content/uploads/kayak_llachon.jpg',
      rating: 4.8
    },
    {
      titulo: 'Taller de tejidos en Ccotos',
      comunidad: 'Ccotos',
      categoria: 'Cultura',
      imagen: 'https://www.example.com/tejidos.jpg',
      rating: 4.2
    },
    {
      titulo: 'Senderismo en Tikonata',
      comunidad: 'Tikonata',
      categoria: 'Naturaleza',
      imagen: 'https://www.example.com/tikonata.jpg',
      rating: 4.9
    },
  ];

  experienciasFiltradas() {
    return this.experiencias.filter(exp => {
      const coincideTexto = this.filtro.texto === '' || exp.titulo.toLowerCase().includes(this.filtro.texto.toLowerCase());
      const coincideCategoria = this.filtro.categoria === '' || exp.categoria === this.filtro.categoria;
      const coincideComunidad = this.filtro.comunidad === '' || exp.comunidad === this.filtro.comunidad;
      const coincideRating = this.filtro.ratingMinimo === '' || exp.rating >= +this.filtro.ratingMinimo;
      return coincideTexto && coincideCategoria && coincideComunidad && coincideRating;
    });
  }
}
