import { Routes } from '@angular/router';
import { AUTH_ROUTES } from './features/auth/auth.routes';
import { authGuard } from './core/guards/auth.guard';
import { AdminLayoutComponent } from './shared/components/admin/admin-layout.component';
import { EmpresaLayoutComponent } from './shared/components/empresa/empresa-layout.component';
import { TuristaLayoutComponent } from './shared/components/turista/turista-layout.component';
import { EMPRENDEDOR_ROUTES } from './features/roles/emprendedor/emprededor.routes';
import { TURISTA_ROUTES } from './features/roles/turista/turista.routes';
import { SUPERADMIN_ROUTES } from './features/roles/superadmin/superadmin.routes';

export const APP_ROUTES: Routes = [

  {
    path: '',
    loadComponent: () =>
      import('../app/features/portals/turismo-capachica/landing/landing.component').then(
        (m) => m.LandingComponent
      ),
  },
  {
    path: 'zonas-turisticas',
    loadComponent: () =>
      import('./features/pages/zonas/zonas.component').then((m) => m.ZonasComponent),
  },
  {
    path: 'paquetes',
    loadComponent: () =>
      import('./features/pages/paquetes/paquetes.component').then(
        (m) => m.PaquetesComponent
      ),
  },
  {
    path: 'servicios',
    loadComponent: () =>
      import('./features/pages/servicios/servicios.component').then(
        (m) => m.ServiciosComponent
      ),
  },
  {
    path: 'resenas',
    loadComponent: () =>
      import('./features/pages/resenas/resenas.component').then(
        (m) => m.ResenasComponent
      ),
  },
  {
    path: 'sobre-capachica',
    loadComponent: () =>
      import('./features/pages/sobre/sobre.component').then((m) => m.SobreComponent),
  },
  {
    path: 'reservar/:experienciaId',
    loadComponent: () =>
      import('./features/pages/contacto/contacto.component').then(
        (m) => m.ContactoComponent
      ),
  },
  {
    path: 'comunidad/:id',
    loadComponent: () =>
      import('./features/pages/detalle/detalle-comunidad/detalle-comunidad.component')
        .then(m => m.DetalleComunidadComponent)
  },
  {
  path: 'emprendedor/:locationId/:companyId',
  loadComponent: () =>
    import('./features/pages/detalle/detalle-emprendedor/detalle-emprendedor.component')
      .then(m => m.DetalleEmprendedorComponent)
},


 {
    path: 'carrito',
    loadComponent: () =>
      import('./features/pages/carrito/carrito.component').then((m) => m.CarritoComponent),
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
      import('../app/features/roles/emprendedor/registrar-empresa/registrar-empresa.component').then(m => m.RegistrarEmpresaComponent)
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
      import('./shared/components/unauthorized/unauthorized.component').then(
        (m) => m.UnauthorizedComponent
      ),
  }
  
];
