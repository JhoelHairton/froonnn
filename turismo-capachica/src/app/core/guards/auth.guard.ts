import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

/**
 * Auth Guard dinámico que valida sesión y rol
 * @param rolRequerido (opcional) - el rol necesario para acceder (ej: 'superadmin')
 */
export const authGuard = (rolRequerido?: string): CanActivateFn => () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  // 🔐 No logueado → redirigir al login
  if (!auth.isLoggedIn()) {
    router.navigate(['/login'],  { queryParams: { returnUrl: router.url } });
    return false;
  }

  // 🔐 Verificar rol si se especificó
  const user = auth.getUser();
  if (rolRequerido && user?.rol !== rolRequerido) {
    router.navigate(['/unauthorized']); // Puedes crear esta ruta
    return false;
  }

  return true;
};
