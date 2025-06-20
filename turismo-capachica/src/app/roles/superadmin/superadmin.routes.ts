import { Route } from '@angular/router';
import { ComunidadPanelComponent } from './comunidades/comunidad-panel/comunidad-panel.component';

export const SUPERADMIN_ROUTES: Route[] = [
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./admin-dashboard/admin-dashboard.component').then(
        (m) => m.AdminDashboardComponent
      ),
  },
  
  {
    path: 'usuarios-turistas',
    loadComponent: () =>
      import('./usuarios/usuarios-turistas/usuarios-turistas.component').then(
        (m) => m.UsuariosTuristasComponent
      ),
  },
  {
    path: 'usuarios-emprendedores',
    loadComponent: () =>
      import(
        './usuarios/usuarios-emprendedores/usuarios-emprendedores.component'
      ).then((m) => m.UsuariosEmprendedoresComponent),
  },
  {
    path: 'empresas',
    loadComponent: () =>
      import('./empresas/empresas.component').then((m) => m.EmpresasComponent),
  },
  {
    path: 'experiencias',
    loadComponent: () =>
      import('./experiencias/experiencias/experiencias.component').then(
        (m) => m.ExperienciasComponent
      ),
  },
  {
    path: 'experiencias-pendientes',
    loadComponent: () =>
      import(
        './experiencias/experiencias-pendientes/experiencias-pendientes.component'
      ).then((m) => m.ExperienciasPendientesComponent),
  },
  {
    path: 'categorias',
    loadComponent: () =>
      import('./experiencias/categorias/categorias.component').then(
        (m) => m.CategoriasComponent
      ),
  },
  
  {
    path: 'banners',
    loadComponent: () =>
      import('./contenido/banners/banners.component').then(
        (m) => m.BannersComponent
      ),
  },
  {
    path: 'testimonios',
    loadComponent: () =>
      import('./contenido/testimonios/testimonios.component').then(
        (m) => m.TestimoniosComponent
      ),
  },
  {
    path: 'blog',
    loadComponent: () =>
      import('./contenido/blog/blog.component').then((m) => m.BlogComponent),
  },
  {
    path: 'landing',
    loadComponent: () =>
      import('./landing/landing-admin.component').then(
        (m) => m.LandingAdminComponent
      ),
  },
  {
    path: 'reportes-ventas',
    loadComponent: () =>
      import('./reportes/reportes-ventas/reportes-ventas.component').then(
        (m) => m.ReportesVentasComponent
      ),
  },
  {
    path: 'reportes-usuarios',
    loadComponent: () =>
      import('./reportes/reportes-usuarios/reportes-usuarios.component').then(
        (m) => m.ReportesUsuariosComponent
      ),
  },
  {
    path: 'reportes-trafico',
    loadComponent: () =>
      import('./reportes/reportes-trafico/reportes-trafico.component').then(
        (m) => m.ReportesTraficoComponent
      ),
  },
  {
    path: 'configuracion',
    loadComponent: () =>
      import('./configuracion/configuracion/configuracion.component').then(
        (m) => m.ConfiguracionComponent
      ),
  },
  {
    path: 'configuracion-politicas',
    loadComponent: () =>
      import(
        './configuracion/configuracion-politicas/configuracion-politicas.component'
      ).then((m) => m.ConfiguracionPoliticasComponent),
  },
  {
    path: 'configuracion-visual',
    loadComponent: () =>
      import(
        './configuracion/configuracion-visual/configuracion-visual.component'
      ).then((m) => m.ConfiguracionVisualComponent),
  },
  {
    path: 'logs',
    loadComponent: () =>
      import('./seguridad/logs/logs.component').then((m) => m.LogsComponent),
  },
  {
    path: 'auditoria',
    loadComponent: () =>
      import('./seguridad/auditoria/auditoria.component').then(
        (m) => m.AuditoriaComponent
      ),
  },
  {
    path: 'soporte-tickets',
    loadComponent: () =>
      import('./soporte/soporte-tickets/soporte-tickets.component').then(
        (m) => m.SoporteTicketsComponent
      ),
  },
  {
    path: 'sugerencias',
    loadComponent: () =>
      import('./soporte/sugerencias/sugerencias.component').then(
        (m) => m.SugerenciasComponent
      ),
  },
  {
    path: 'perfil',
    loadComponent: () =>
      import('./cuenta/perfil/perfil.component').then((m) => m.PerfilComponent),
  },
  {
    path: 'password',
    loadComponent: () =>
      import('./cuenta/password/password.component').then(
        (m) => m.PasswordComponent
      ),
  },
  {
    path: 'comunidades',
    component: ComunidadPanelComponent,
  },

  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard',
  },
  

  
];
