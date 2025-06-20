import { Route } from '@angular/router';


export const EMPRENDEDOR_ROUTES: Route[] = [
 
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./dashboard/dashboard.component').then(m => m.DashboardComponent)
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
    path: 'agenda',
    loadComponent: () =>
      import('./agenda/agenda.component').then(m => m.AgendaComponent)
  },
  {
    path: 'mensajes',
    loadComponent: () =>
      import('./mensajes/mensajes.component').then(m => m.MensajesComponent)
  },
  {
    path: 'promociones',
    loadComponent: () =>
      import('./promociones/promociones.component').then(m => m.PromocionesComponent)
  },
  {
    path: 'blog',
    loadComponent: () =>
      import('./blog/blog.component').then(m => m.BlogComponent)
  },
  {
    path: 'perfil',
    loadComponent: () =>
      import('./perfil/perfil.component').then(m => m.PerfilComponent)
  },
  {
    path: 'configuracion',
    loadComponent: () =>
      import('./configuracion/configuracion.component').then(m => m.ConfiguracionComponent)
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard'
  }
];
