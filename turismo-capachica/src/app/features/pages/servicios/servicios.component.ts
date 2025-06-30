import { CommonModule } from '@angular/common';
import { Component, computed, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Service {
  id: number;
  title: string;
  description: string;
  entrepreneur: string;
  category: string;
  price: number;
  rating: number;
  image: string;
  location: string;
  contact: string;
  featured: boolean;
}

@Component({
  selector: 'app-servicios',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './servicios.component.html',
  styleUrl: './servicios.component.css'
})
export class ServiciosComponent implements OnInit {

   services: Service[] = [
    {
      id: 1,
      title: 'Desarrollo de Aplicaciones Web',
      description: 'Creación de sitios web modernos y aplicaciones web responsivas con las últimas tecnologías.',
      entrepreneur: 'Carlos Mamani',
      category: 'Tecnología',
      price: 800,
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400',
      location: 'Juliaca',
      contact: '+51 987 654 321',
      featured: true
    },
    {
      id: 2,
      title: 'Catering para Eventos',
      description: 'Servicio de catering especializado en comida tradicional peruana para todo tipo de eventos.',
      entrepreneur: 'María Quispe',
      category: 'Gastronomía',
      price: 25,
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400',
      location: 'Puno',
      contact: '+51 965 432 187',
      featured: true
    },
    {
      id: 3,
      title: 'Textiles Artesanales',
      description: 'Confección de prendas tradicionales andinas con lana de alpaca y diseños únicos.',
      entrepreneur: 'Rosa Condori',
      category: 'Artesanía',
      price: 120,
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400',
      location: 'Ilave',
      contact: '+51 945 678 923',
      featured: false
    },
    {
      id: 4,
      title: 'Consultoría Contable',
      description: 'Asesoría contable y tributaria para pequeñas y medianas empresas.',
      entrepreneur: 'Juan Huanca',
      category: 'Consultoría',
      price: 150,
      rating: 4.6,
      image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400',
      location: 'Juliaca',
      contact: '+51 912 345 678',
      featured: false
    },
    {
      id: 5,
      title: 'Fotografía de Eventos',
      description: 'Servicio profesional de fotografía para bodas, quinceañeros y eventos corporativos.',
      entrepreneur: 'Ana Flores',
      category: 'Fotografía',
      price: 300,
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=400',
      location: 'Puno',
      contact: '+51 987 123 456',
      featured: true
    },
    {
      id: 6,
      title: 'Reparación de Computadoras',
      description: 'Servicio técnico especializado en reparación y mantenimiento de equipos informáticos.',
      entrepreneur: 'Pedro Choque',
      category: 'Tecnología',
      price: 80,
      rating: 4.5,
      image: 'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=400',
      location: 'Juliaca',
      contact: '+51 956 789 012',
      featured: false
    },
    {
      id: 7,
      title: 'Clases de Quechua',
      description: 'Enseñanza del idioma quechua para preservar nuestra cultura ancestral.',
      entrepreneur: 'Elena Apaza',
      category: 'Educación',
      price: 40,
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400',
      location: 'Puno',
      contact: '+51 923 456 789',
      featured: false
    },
    {
      id: 8,
      title: 'Panadería Artesanal',
      description: 'Pan fresco diario y productos de pastelería con ingredientes naturales de la región.',
      entrepreneur: 'Miguel Ccama',
      category: 'Gastronomía',
      price: 15,
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400',
      location: 'Juli',
      contact: '+51 934 567 890',
      featured: false
    },
    {
      id: 9,
      title: 'Cerámica Decorativa',
      description: 'Creación de piezas únicas de cerámica inspiradas en la cultura prehispánica.',
      entrepreneur: 'Luisa Marca',
      category: 'Artesanía',
      price: 65,
      rating: 4.6,
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
      location: 'Pomata',
      contact: '+51 945 678 901',
      featured: false
    },
    {
      id: 10,
      title: 'Marketing Digital',
      description: 'Estrategias de marketing digital para impulsar tu negocio en redes sociales.',
      entrepreneur: 'Roberto Inca',
      category: 'Consultoría',
      price: 200,
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400',
      location: 'Juliaca',
      contact: '+51 967 890 123',
      featured: true
    },
    {
      id: 11,
      title: 'Turismo Vivencial',
      description: 'Experiencias auténticas de turismo rural comunitario en el altiplano.',
      entrepreneur: 'Carmen Yucra',
      category: 'Turismo',
      price: 180,
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
      location: 'Amantaní',
      contact: '+51 978 901 234',
      featured: true
    },
    {
      id: 12,
      title: 'Música Folklórica',
      description: 'Clases de instrumentos andinos y presentaciones de música tradicional.',
      entrepreneur: 'Esteban Cutipa',
      category: 'Música',
      price: 60,
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400',
      location: 'Puno',
      contact: '+51 989 012 345',
      featured: false
    }
  ];

  filteredServices: Service[] = [];
  categories: string[] = [];
  selectedCategory: string = '';
  searchTerm: string = '';

  ngOnInit() {
    this.filteredServices = [...this.services];
    this.categories = [...new Set(this.services.map(service => service.category))];
  }

  filterServices() {
    this.filteredServices = this.services.filter(service => {
      const matchesCategory = !this.selectedCategory || service.category === this.selectedCategory;
      const matchesSearch = !this.searchTerm || 
        service.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        service.description.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        service.entrepreneur.toLowerCase().includes(this.searchTerm.toLowerCase());
      
      return matchesCategory && matchesSearch;
    });
  }

  setCategory(category: string) {
    this.selectedCategory = category;
    this.filterServices();
  }

  getStarArray(rating: number): number[] {
    return Array(Math.floor(rating)).fill(0);
  }

  contactEntrepreneur(service: Service) {
    const message = encodeURIComponent(`Hola ${service.entrepreneur}, me interesa tu servicio: ${service.title}`);
    window.open(`https://wa.me/51${service.contact.replace('+51 ', '').replace(/\s/g, '')}?text=${message}`, '_blank');
  }

  viewDetails(service: Service) {
    // Implementar navegación a página de detalles
    console.log('Ver detalles del servicio:', service);
  }

  onImageError(event: any) {
    event.target.src = 'https://via.placeholder.com/400x300/4F46E5/FFFFFF?text=Imagen+no+disponible';
  }

}
