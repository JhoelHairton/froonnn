import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { LocationService } from '../../services/location.service';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { CarritoComponent } from '../../carrito/carrito.component';
import { CarritoService } from '../../../core/services/carrito.service';

@Component({
  selector: 'app-detalle-emprendedor',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NgIf,
    NgFor,
    RouterModule,
    LeafletModule,
    CarritoComponent
  ],
  templateUrl: './detalle-emprendedor.component.html',
  styleUrl: './detalle-emprendedor.component.css',
})
export class DetalleEmprendedorComponent implements OnInit {

  loading = true;
  error: string | null = null;
  servicios: any[] = [];
  paquetes: any[] = [];
  emprendedor: any = null;
  mapaUrl: SafeResourceUrl = '';
  detalleSeleccionado: any = null;
  mostrarModal: boolean = false;



  constructor(
    private route: ActivatedRoute,
    private locationService: LocationService,
    private carritoService: CarritoService, // 👈 Agregado
    private router: Router, // 👈 Agregado


  ) { }

  ngOnInit(): void {
    const locationId = Number(this.route.snapshot.paramMap.get('locationId'));
    const companyId = Number(this.route.snapshot.paramMap.get('companyId'));

    console.log('🌍 Location ID:', locationId);
    console.log('🏢 Company ID:', companyId);

    if (!locationId || !companyId) {
      this.error = 'Parámetros inválidos en la ruta';
      this.loading = false;
      return;
    }

    this.locationService.getEmpresaByLocationId(locationId, companyId).subscribe({
      next: ({ empresa, location }) => {
        this.emprendedor = {
          nombre: empresa.trade_name || empresa.business_name,
          descripcion: empresa.description || '',
          email: empresa.contact_email,
          telefono: empresa.phone,
          logo: empresa.logo_url
        };

        this.servicios = (empresa.services || []).map((s: any) => ({
          id: s.id,
          nombre: s.title,
          descripcion: s.description,
          precio: s.price,
          duracion: s.duration,
          cupos: s.capacity,
          categoria: s.type,
          imagen: empresa.logo_url
        }));

        this.paquetes = (empresa.promotions || []).map((p: any) => ({
          id: p.id,
          nombre: p.title,
          descripcion: p.description,
          precio: 0,
          destacado: true,
          incluye: ['Promoción activa']
        }));

        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.error = 'Error cargando el emprendedor';
        this.loading = false;
      }
    });
  }

  verDetalles(servicio: any) {
    this.detalleSeleccionado = servicio;
    this.mostrarModal = true;
  }

  agregarAlCarrito(item: any) {
    const data = {
      id: item.id,
      nombre: item.nombre || item.title,
      descripcion: item.descripcion || '',
      precio: item.precio || item.price,
      imagen: item.imagen || 'assets/images/default.jpg',
      cantidad: 1,
      ref: item
    };

    this.carritoService.agregar(data); // 👈 Tu lógica de añadir
    this.router.navigate(['/carrito']); // 👈 Redirige al carrito
  }

}


