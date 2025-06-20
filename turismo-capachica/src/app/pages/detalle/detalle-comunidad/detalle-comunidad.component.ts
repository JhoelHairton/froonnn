import { Component, OnInit, OnDestroy, CUSTOM_ELEMENTS_SCHEMA, HostListener } from '@angular/core';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { NavbarComponent } from '../../../layout/navbar/navbar.component';
import { FooterComponent } from '../../../layout/footer/footer.component';
import { Location } from '@angular/common';
import { icon, latLng, marker, tileLayer } from 'leaflet';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { ComunidadPublica, ComunidadPublicaService } from '../../services/comunidad-publica.service';



@Component({
  selector: 'app-detalle-comunidad',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NgIf,
    NgFor,
    LeafletModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './detalle-comunidad.component.html',
  styleUrls: ['./detalle-comunidad.component.css']
})
export class DetalleComunidadComponent implements OnInit {

  comunidad: any = null;
  defaultImages = [
    'assets/images/galeria-1.jpg',
    'assets/images/galeria-2.jpg',
    'assets/images/galeria-3.jpg',
    'assets/images/galeria-4.jpg',
    'assets/images/galeria-5.jpg'
  ];
  currentImageIndex = 0;
  lightboxOpen = false;
  lightboxIndex = 0;
  apiBase = 'http://localhost:8000';

  constructor(
    private route: ActivatedRoute,
    private comunidadService: ComunidadPublicaService
  ) {}

 ngOnInit(): void {
  const comunidadId = this.route.snapshot.paramMap.get('id');
  if (comunidadId) {
    this.comunidadService.obtenerPorId(+comunidadId).subscribe((data: any) => {
      this.comunidad = {
        id: data.id,
        nombre: data.name,
        descripcionCorta: data.descripcion_corta,
        descripcionLarga: data.descripcion_larga,
        atractivos: data.atractivos,
        habitantes: data.habitantes,
        estado: data.estado,
        imagen: data.imagen ? this.apiBase + data.imagen : 'assets/images/hero-comunidad.jpg',
        galeria: (data.galeria || []).map((g: string) => this.apiBase + g),
        experiencias: [],

        // 👇 Aquí se mapean los emprendedores
        emprendedores: data.companies.map((emp: any) => ({
          id: emp.id,
          nombre: emp.trade_name || emp.business_name,
          descripcion: emp.description,
          especialidad: emp.service_type,
          logo: emp.logo_url || 'assets/images/avatar1.jpg',
          categoria: emp.status,
          tags: emp.services.map((s: any) => s.title)
        }))
      };
    });
  }

  
}


  previousImage() {
    if (this.comunidad?.galeria) {
      this.currentImageIndex =
        (this.currentImageIndex - 1 + this.comunidad.galeria.length) % this.comunidad.galeria.length;
    }
  }

  nextImage() {
    if (this.comunidad?.galeria) {
      this.currentImageIndex =
        (this.currentImageIndex + 1) % this.comunidad.galeria.length;
    }
  }

  setCurrentImage(index: number) {
    this.currentImageIndex = index;
  }

  openGallery(index: number) {
    this.lightboxOpen = true;
    this.lightboxIndex = index;
  }

  closeLightbox() {
    this.lightboxOpen = false;
  }

  previousLightboxImage() {
    if (this.comunidad?.galeria) {
      this.lightboxIndex =
        (this.lightboxIndex - 1 + this.comunidad.galeria.length) % this.comunidad.galeria.length;
    }
  }

  nextLightboxImage() {
    if (this.comunidad?.galeria) {
      this.lightboxIndex = (this.lightboxIndex + 1) % this.comunidad.galeria.length;
    }
  }

  goBack() {
    window.history.back();
  }

  getDefaultImage(index: number): string {
    return this.defaultImages[index % this.defaultImages.length];
  }

  getExperienciasDemo() {
    return [];
  }

  getEmprendedoresDemo() {
    return [];
  }

  getServiciosIncluidos() {
    return ['Guía local', 'Transporte', 'Alimentación típica', 'Ingreso a zonas turísticas'];
  }

  getNoIncluido() {
    return ['Propinas', 'Souvenirs', 'Bebidas alcohólicas', 'Seguro de viaje'];
  }

  getTestimonios() {
    return [
      {
        nombre: 'Ana Torres',
        comentario: 'Una experiencia mágica en la comunidad.',
        fecha: '2024-07-10',
        origen: 'Lima, Perú',
        avatar: 'assets/images/avatar1.jpg'
      },
      {
        nombre: 'Luis Huanca',
        comentario: 'Los tejidos de los artesanos son impresionantes.',
        fecha: '2024-08-01',
        origen: 'Cusco, Perú',
        avatar: 'assets/images/avatar2.jpg'
      },
      {
        nombre: 'María González',
        comentario: 'Muy recomendable para conocer la cultura local.',
        fecha: '2024-08-15',
        origen: 'Madrid, España',
        avatar: 'assets/images/avatar3.jpg'
      }
    ];
  }

}