import { Route } from '@angular/router';

export const TURISTA_ROUTES: Route[] = [
  {
    path: 'inicio',
    loadComponent: () =>
      import('./inicio/inicio.component').then(m => m.InicioComponent)
  },
  {
    path: 'experiencias',
    loadComponent: () =>
      import('./experiencias/experiencias.component').then(m => m.ExperienciasComponent)
  },
  {
    path: 'paquetes',
    loadComponent: () =>
      import('./paquetes/paquetes.component').then(m => m.PaquetesComponent)
  },
  {
    path: 'reservas',
    loadComponent: () =>
      import('./reservas/reservas.component').then(m => m.ReservasComponent)
  },
  {
    path: 'favoritos',
    loadComponent: () =>
      import('./favoritos/favoritos.component').then(m => m.FavoritosComponent)
  },
  {
    path: 'reseñas',
    loadComponent: () =>
      import('./resenas/resenas.component').then(m => m.ResenasComponent)
  },
  {
    path: 'perfil',
    loadComponent: () =>
      import('./perfil/perfil.component').then(m => m.PerfilComponent)
  },
  {
    path: 'pagos',
    loadComponent: () =>
      import('./pagos/pagos.component').then(m => m.PagosComponent)
  },
  {
    path: 'configuracion',
    loadComponent: () =>
      import('./configuracion/configuracion.component').then(m => m.ConfiguracionComponent)
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'inicio'
  }
];
