// favoritos.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-favoritos',
  imports: [CommonModule],
  templateUrl: './favoritos.component.html',
})
export class FavoritosComponent {
  favoritos = [
    {
      titulo: 'Vivencia en Ccotos',
      comunidad: 'Ccotos',
      imagen: 'https://www.example.com/img/ccotos.jpg',
      rating: 4.7,
    },
    {
      titulo: 'Isla Tikonata espiritual',
      comunidad: 'Tikonata',
      imagen: 'https://www.example.com/img/tikonata.jpg',
      rating: 4.9,
    },
    {
      titulo: 'Kayak en Llachón',
      comunidad: 'Llachón',
      imagen: 'https://www.kayak-laketiticaca.com/wp-content/uploads/kayak_llachon.jpg',
      rating: 4.8,
    },
  ];

  eliminarFavorito(fav: any) {
    this.favoritos = this.favoritos.filter(item => item !== fav);
  }
}
