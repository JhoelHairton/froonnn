import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';
import { FooterComponent } from '../../../shared/components/footer/footer.component';
import { ComunidadPublica,  ComunidadPublicaService } from '../../../core/services/pages/comunidad-publica.service'; 
 
@Component({
  selector: 'app-zonas',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    NgFor,
    RouterModule,
    FormsModule,
    NavbarComponent,
    FooterComponent
  ],
  templateUrl: './zonas.component.html',
  styleUrls: ['./zonas.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ZonasComponent implements OnInit {


 comunidades: ComunidadPublica[] = [];
  comunidadesFiltradas: any[] = [];
  limite = 9;

  constructor(private comunidadSvc: ComunidadPublicaService) {}

  ngOnInit(): void {
    this.comunidadSvc.listar().subscribe(res => {
      this.comunidades = res.map(c => ({
        ...c,
        nombre: c.name,
        resumen: c.descripcion_corta,
        image: c.imagen ? `http://localhost:8000${c.imagen}` : '/assets/default.jpg',
        link: `/comunidad/${c.id}`,
        servicios: [],
        testimonio: c.atractivos,
        destacado: false,
        nuevo: false,
        rating: null,
      }));
      this.comunidadesFiltradas = this.comunidades;
    });
  }



  imagenes: string[] = [
    'assets/images/comunidades.jpg',
    'assets/images/portal.jpg',
  ];

  zonas: string[] = ['Llachón', 'Chifrón', 'Ccotos', 'Tikonata', 'Siale', 'Escallani'];
  comunidadesSeleccionadas: { [key: string]: boolean } = {};
  busquedaTexto: string = '';


  todasLasZonas = [
    {
      nombre: 'Llachón',
      tipo: 'centro_poblado',
      image: 'assets/images/comunidades/llachon.jpg',
      resumen: 'Destino emblemático del turismo vivencial en el altiplano.',
      boton: 'Ver más',
      link: '/comunidad/llachon',
      zona: 'Llachón',
      rating: 4.9,
      servicios: [1, 2, 3],
      destacado: true,
      testimonio: 'Un lugar mágico lleno de cultura viva.',
      nuevo: false
    },
    {
      nombre: 'Capachica',
      tipo: 'comunidad',
      image: 'assets/images/comunidades/capachica.jpg',
      resumen: 'Capital del distrito y punto de partida hacia las demás comunidades.',
      boton: 'Ver más',
      link: '/comunidad/capachica',
      zona: 'Capachica',
      rating: 4.7,
      servicios: [1],
      destacado: false,
      testimonio: 'Una experiencia muy enriquecedora.',
      nuevo: true
    },
    // ➕ Agrega más zonas aquí...
  ];

 

  

  aplicarFiltros() {
    const zonasActivas = Object.keys(this.comunidadesSeleccionadas)
      .filter(z => this.comunidadesSeleccionadas[z]);

    const texto = this.busquedaTexto.trim().toLowerCase();

    const filtrar = (item: any) => {
      const coincideZona = zonasActivas.length === 0 || zonasActivas.includes(item.zona);
      const coincideTexto = !texto || item.nombre.toLowerCase().includes(texto);
      return coincideZona && coincideTexto;
    };

    this.comunidadesFiltradas = this.comunidades.filter(filtrar);
  }

  limpiarFiltros() {
    this.comunidadesSeleccionadas = {};
    this.busquedaTexto = '';
    this.comunidadesFiltradas = [...this.comunidades];
  }

  verMasComunidades() {
    this.limite += 6;
  }
}
