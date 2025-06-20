import { Routes } from '@angular/router';
import { AUTH_ROUTES } from './auth/auth.routes';
import { authGuard } from './core/guards/auth.guard';
import { AdminLayoutComponent } from './layout/admin/admin-layout.component';
import { EmpresaLayoutComponent } from './layout/empresa/empresa-layout.component';
import { TuristaLayoutComponent } from './layout/turista/turista-layout.component';
import { EMPRENDEDOR_ROUTES } from './roles/emprendedor/emprededor.routes';
import { TURISTA_ROUTES } from './roles/turista/turista.routes';
import { SUPERADMIN_ROUTES } from './roles/superadmin/superadmin.routes';

export const APP_ROUTES: Routes = [

  {
    path: '',
    loadComponent: () =>
      import('./portals/turismo-capachica/landing/landing.component').then(
        (m) => m.LandingComponent
      ),
  },
  {
    path: 'zonas-turisticas',
    loadComponent: () =>
      import('./pages/zonas/zonas.component').then((m) => m.ZonasComponent),
  },
  {
    path: 'paquetes',
    loadComponent: () =>
      import('./pages/paquetes/paquetes.component').then(
        (m) => m.PaquetesComponent
      ),
  },
  {
    path: 'servicios',
    loadComponent: () =>
      import('./pages/servicios/servicios.component').then(
        (m) => m.ServiciosComponent
      ),
  },
  {
    path: 'resenas',
    loadComponent: () =>
      import('./pages/resenas/resenas.component').then(
        (m) => m.ResenasComponent
      ),
  },
  {
    path: 'sobre-capachica',
    loadComponent: () =>
      import('./pages/sobre/sobre.component').then((m) => m.SobreComponent),
  },
  {
    path: 'reservar/:experienciaId',
    loadComponent: () =>
      import('./pages/contacto/contacto.component').then(
        (m) => m.ContactoComponent
      ),
  },
  {
    path: 'comunidad/:id',
    loadComponent: () =>
      import('./pages/detalle/detalle-comunidad/detalle-comunidad.component')
        .then(m => m.DetalleComunidadComponent)
  },
  {
  path: 'emprendedor/:locationId/:companyId',
  loadComponent: () =>
    import('./pages/detalle/detalle-emprendedor/detalle-emprendedor.component')
      .then(m => m.DetalleEmprendedorComponent)
},


 {
    path: 'carrito',
    loadComponent: () =>
      import('./pages/carrito/carrito.component').then((m) => m.CarritoComponent),
  },
  {
    path: 'auth',
    children: AUTH_ROUTES,
  },

   // 🧑‍💼 Rutas para superadmin
   {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [authGuard('superadmin')],
    children: SUPERADMIN_ROUTES,
  },

  // 🏢 Rutas para emprendedor
  {
    path: 'empresa',
    component: EmpresaLayoutComponent,
    canActivate: [authGuard('emprendedor')], //empresaGuard
    children: EMPRENDEDOR_ROUTES,
  },


  {
    path: 'empresa/registrar-empresa',
    canActivate: [authGuard('emprendedor')],
    loadComponent: () =>
      import('./roles/emprendedor/registrar-empresa/registrar-empresa.component').then(m => m.RegistrarEmpresaComponent)
  },
  
  // 🧳 Rutas para turista
  {
    path: 'turista',
    component: TuristaLayoutComponent,
    canActivate: [authGuard('turista')],
    children: TURISTA_ROUTES,
  },

    // Layout con rutas protegidas

  {
    path: 'unauthorized',
    loadComponent: () =>
      import('./shared/unauthorized/unauthorized.component').then(
        (m) => m.UnauthorizedComponent
      ),
  }
  
];
