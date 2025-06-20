import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, CUSTOM_ELEMENTS_SCHEMA, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-experiencias',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './experiencias.component.html',
  styleUrl: './experiencias.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA], // ✅ AQUÍ está la clave
  
})
export class ExperienciasComponent {
   private http = inject(HttpClient);

  search = '';
  filtroCategoria = '';
  filtroComunidad = '';

  categorias = ['Gastronomía', 'Aventura', 'Cultura'];
  comunidades = ['Llachón', 'Ccotos', 'Chifrón'];

  selectedExperiencia: any = null;

  experiencias = [
    {
      titulo: 'Paseo en bote por el lago',
      empresa: 'Aventura Llachón',
      comunidad: 'Llachón',
      categoria: 'Aventura',
      subcategoria: 'Náutica',
      fecha: '2025-05-01',
      estado: 'Publicado',
      imagen: 'https://portal.andina.pe/EDPfotografia3/Thumbnail/2016/04/21/000352700W.jpg',
      descripcion: 'Navega por el Titicaca con expertos locales.',
      vistas: 145,
      reservas: 25
    }
  ];

  experienciasFiltradas() {
    return this.experiencias.filter(exp => {
      const coincideBusqueda = this.search === '' ||
        exp.titulo.toLowerCase().includes(this.search.toLowerCase()) ||
        exp.empresa.toLowerCase().includes(this.search.toLowerCase());
      const coincideCategoria = this.filtroCategoria === '' || exp.categoria === this.filtroCategoria;
      const coincideComunidad = this.filtroComunidad === '' || exp.comunidad === this.filtroComunidad;
      return coincideBusqueda && coincideCategoria && coincideComunidad;
    });
  }

  verDetalle(exp: any) {
    this.selectedExperiencia = exp;
  }

   pausar(exp: any) {
    Swal.fire({
      title: '¿Pausar experiencia?',
      text: `La experiencia "${exp.titulo}" será pausada y dejará de estar visible temporalmente.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, pausar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        exp.estado = 'Pausado';
        Swal.fire('Pausada', 'La experiencia fue pausada exitosamente.', 'success');
      }
    });
  }

  actualizar(exp: any) {
    Swal.fire({
      icon: 'info',
      title: 'Redirección',
      text: `Redirigiendo a la edición de: ${exp.titulo}`,
      timer: 2000,
      showConfirmButton: false
    });
  }
}
