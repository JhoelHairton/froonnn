import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FooterComponent } from '../../../../shared/components/footer/footer.component';
import { NavbarComponent } from '../../../../shared/components/navbar/navbar.component';
import { HeroService } from '../../../../core/services/admin/hero.service';
import { ChatbotComponent } from '../../../pages/chatbot/chatbot.component';


@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule, FooterComponent, NavbarComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA], // ✅ AQUÍ está la clave
})
export class LandingComponent implements OnInit, AfterViewInit {
  


  @ViewChild('myVideo') myVideo!: ElementRef<HTMLVideoElement>;

  heroData: any;

  constructor(private heroService: HeroService) { }

 ngOnInit() {
  this.heroService.getHero(1).subscribe({
    next: (data: any) => {
      this.heroData = data;
      this.typeText(this.heroData.hero_title);

    },
    error: (err) => {
      console.error('Error cargando hero:', err);
    }
  });
}


  autoPlayVideo(): void {
    if (this.myVideo) {
      const video = this.myVideo.nativeElement;
      video.muted = true;
      video.play().catch(err =>
        console.warn('No se pudo reproducir el video automáticamente:', err)
      );
    }
  }
  ngAfterViewInit(): void {
    // Asegura que el video tenga autoplay con muted
    const video = this.myVideo.nativeElement;
    video.muted = true;
    video.play().catch(err => {
      console.warn('No se pudo reproducir el video automáticamente:', err);
    });
  }


  initMap(): void {
    const capachica = { lat: -15.699, lng: -69.637 };

    const mapElement = document.getElementById('map');
    if (!mapElement) {
      console.error('Elemento con ID "map" no encontrado.');
      return;
    }

    const map = new google.maps.Map(mapElement, {
      zoom: 12,
      center: capachica,
      mapId: "MAP_ID_OPCIONAL"
    });


    const lugares = [
      { nombre: 'Llachón', posicion: { lat: -15.719, lng: -69.651 }, descripcion: 'Hospedajes familiares y cultura viva.' },
      { nombre: 'Chillora', posicion: { lat: -15.710, lng: -69.640 }, descripcion: 'Gastronomía andina y pesca tradicional.' },
      { nombre: 'Capano', posicion: { lat: -15.703, lng: -69.625 }, descripcion: 'Talleres de artesanía y música ancestral.' },
      { nombre: 'Collpa', posicion: { lat: -15.692, lng: -69.655 }, descripcion: 'Rutas de trekking y miradores naturales.' }
    ];

    lugares.forEach(lugar => {
      const marker = new google.maps.Marker({ position: lugar.posicion, map, title: lugar.nombre });
      const infowindow = new google.maps.InfoWindow({ content: `<strong>${lugar.nombre}</strong><br>${lugar.descripcion}` });
      marker.addListener('click', () => infowindow.open(map, marker));
    });
  }

  data = [
    {
      image: 'assets/images/1.jpg',
      title: 'MAYON VOLCANO',
      location: 'Albay, Philippines',
      description: 'El volcán Mayon es famoso por su forma perfectamente cónica y su constante actividad volcánica.'
    },
    {
      image: 'assets/images/2.jpg',
      title: 'CHOCOLATE HILLS',
      location: 'Bohol, Philippines',
      description: 'Las Chocolate Hills son colinas únicas cubiertas de vegetación que se vuelven marrones en verano.'
    },
    {
      image: 'assets/images/3.jpg',
      title: 'BORACAY ISLAND',
      location: 'Boracay, Philippines',
      description: 'Boracay es famosa por su arena blanca, aguas turquesa y vibrante vida nocturna.'
    }
  ];

  selectedIndex = 0;

  renderCards(): void {
    const container = document.getElementById('cardContainer');
    if (!container) return;

    container.innerHTML = '';
    this.data.forEach((item, index) => {
      const div = document.createElement('div');
      div.className = `
        group cursor-pointer w-52 h-72 bg-cover bg-center rounded-xl relative shadow-2xl overflow-hidden
        hover:scale-105 fade-move card-enter
        ${index === this.selectedIndex ? 'ring-4 ring-white bg-white/10' : ''}
      `;
      div.style.backgroundImage = `url('${item.image}')`;
      div.onclick = () => this.handleCardClick(index);

      const label = document.createElement('div');
      label.className = 'absolute bottom-0 w-full bg-black/70 text-center py-3 text-lg font-bold text-white';
      label.textContent = item.title.split(' ')[0];

      div.appendChild(label);
      container.appendChild(div);
    });
  }

  handleCardClick(index: number): void {
    this.selectedIndex = -1;
    const selected = this.data.splice(index, 1)[0];
    this.data.push(selected);
    this.updateMainContent(selected);
    this.renderCards();
  }

  updateMainContent(item: any): void {
    const mainImage = document.getElementById('mainImage');
    const title = document.getElementById('title');
    const location = document.getElementById('location');
    const description = document.getElementById('description');

    if (mainImage) mainImage.style.backgroundImage = `url('${item.image}')`;
    if (title) title.textContent = item.title;
    if (location) location.textContent = item.location;
    if (description) description.textContent = item.description;
  }

  // Máquina de escribir dinámica
  typeText(text: string): void {
    const el = document.getElementById('typewriter');
    let index = 0;
    let isDeleting = false;

    const type = () => {
      if (!el) return;

      const speed = isDeleting ? 50 : 100;
      el.textContent = text.substring(0, index);

      if (!isDeleting && index < text.length) {
        index++;
      } else if (isDeleting && index > 0) {
        index--;
      } else {
        isDeleting = !isDeleting;
        setTimeout(type, 1500);
        return;
      }

      setTimeout(type, speed);
    };

    type();
  }


}
