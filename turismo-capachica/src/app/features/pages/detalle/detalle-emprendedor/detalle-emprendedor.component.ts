// src/app/pages/detalle/detalle-emprendedor/detalle-emprendedor.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';

import { LocationService } from '../../../../core/services/pages/location.service';
import { CarritoService } from '../../../../core/services/carrito.service';
import { CarritoComponent } from '../../carrito/carrito.component';

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


  apiUrl = 'http://localhost:8000';

  emprendedor: any = null;
  servicios: any[] = [];
  paquetes: any[] = [];
  mapaUrl!: SafeResourceUrl;

  detalleSeleccionado: any = null;
  mostrarModal = false;

  /** Controla la visibilidad del drawer del carrito */
  showCart = false;

  constructor(
    private route: ActivatedRoute,
    private locationService: LocationService,
    private carritoService: CarritoService,
    private router: Router,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    const locationId = Number(this.route.snapshot.paramMap.get('locationId'));
    const companyId = Number(this.route.snapshot.paramMap.get('companyId'));

    if (!locationId || !companyId) {
      this.error = 'Parámetros inválidos en la ruta';
      this.loading = false;
      return;
    }

    this.locationService
      .getEmpresaByLocationId(locationId, companyId)
      .subscribe({
        next: ({ empresa, location }) => {
          // Datos del emprendedor
          this.emprendedor = {
            nombre: empresa.user?.name || empresa.trade_name,
            descripcion: empresa.description,
            email: empresa.user?.email || empresa.contact_email,
            telefono: empresa.phone,
            logo: empresa.user?.foto
              ? 'http://localhost:8000' + empresa.user.foto
              : empresa.logo_url
          };

          // Mapa embed (ejemplo Google Maps)
          const rawUrl = `https://www.google.com/maps/embed?pb=${location.lat},${location.lng}`;
          this.mapaUrl = this.sanitizer.bypassSecurityTrustResourceUrl(rawUrl);

          // Servicios
          this.servicios = (empresa.services || []).map((s: any) => ({
            id: s.id,
            title: s.title,
            description: s.description,
            price: s.price,
            cupos: s.capacity,
            duracion: s.duration,
            imagen: s.media?.[0]?.url ? `${this.apiUrl}${s.media[0].url}` : this.emprendedor.logo,
            type: 'service',
            quantity: 1
          }));


          // Promociones / paquetes
          this.paquetes = (empresa.promotions || []).map((p: any) => ({
            id: p.id,
            title: p.title,
            description: p.description,
            discount_percentage: p.discount_percentage,
            start_date: p.start_date,
            end_date: p.end_date,
            status: p.status,
            total_price_before: p.total_price_before || 0,
            total_price_after: p.total_price_after || 0,
            services: p.services || [],
            quantity: 1,
            imagen: this.emprendedor.logo,
            type: 'promotion'
          }));



          this.loading = false;
        },
        error: err => {
          console.error(err);
          this.error = 'Error cargando datos del emprendedor';
          this.loading = false;
        }
      });
  }

  verDetalles(item: any) {
    this.detalleSeleccionado = item;
    this.mostrarModal = true;
  }

  cerrarModal() {
    this.mostrarModal = false;
  }


  incrementarCard(servicio: any) {
    servicio.quantity += 1;
    this.carritoService.addService(servicio.id).subscribe();
  }

  decrementarCard(servicio: any) {
    if (servicio.quantity > 1) {
      servicio.quantity -= 1;
      this.carritoService.removeItem('service', servicio.id).subscribe();
    }
  }

  agregarServicio(servicio: any) {
    servicio.quantity += 1;
    this.carritoService.addService(servicio.id).subscribe(() => {
      this.showCart = true;
    });
  }





agregarPromocion(paquete: any) {
  paquete.quantity += 1;
  this.carritoService.addPromotion(paquete.id).subscribe({
    next: () => this.showCart = true,
    error: err => console.error('Error al añadir promoción', err)
  });
}



  /** Navega al carrito tradicional (opcional) */
  irAlCarrito() {
    this.router.navigate(['/carrito']);
  }
}
