import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-resenas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './resenas.component.html',
  styleUrl: './resenas.component.css'
})
export class ResenasComponent {
resenas = [
    {
      experiencia: 'Taller de tejidos ancestrales',
      comunidad: 'Ccotos',
      fecha: '2025-05-10',
      comentario: 'Una experiencia única, me enseñaron a tejer con técnicas que no conocía.',
      puntaje: 5,
      imagen: 'https://www.example.com/img/tejido.jpg'
    },
    {
      experiencia: 'Kayak en Llachón',
      comunidad: 'Llachón',
      fecha: '2025-04-25',
      comentario: 'Hermoso paisaje, pero el clima estuvo algo frío ese día.',
      puntaje: 4,
      imagen: 'https://www.kayak-laketiticaca.com/wp-content/uploads/kayak_llachon.jpg'
    }
  ];

  editarResena(resena: any) {
    alert(`📝 Simulación: abrir modal para editar reseña de ${resena.experiencia}`);
  }

  eliminarResena(resena: any) {
    if (confirm(`¿Estás seguro de eliminar tu reseña de "${resena.experiencia}"?`)) {
      this.resenas = this.resenas.filter(r => r !== resena);
    }
  }

}
