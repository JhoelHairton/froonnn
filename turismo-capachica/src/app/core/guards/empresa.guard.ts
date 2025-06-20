import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import Swal from 'sweetalert2';

export const empresaGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const user = authService.getUser();

  if (!user || user.rol !== 'emprendedor') {
    return router.createUrlTree(['/unauthorized']);
  }

  const empresa = user.empresa;

  // Permitir solo si NO tiene empresa o fue observada
  if (!empresa || empresa.status === 'observada') {
    return true;
  }

  // ✅ Mostrar alerta si está pendiente y cancelar navegación
  if (empresa.status === 'pendiente') {
    Swal.fire({
      icon: 'info',
      title: 'Empresa en revisión',
      text: 'Tu empresa está pendiente de aprobación por el administrador.',
      confirmButtonText: 'Entendido'
    });
    return false;
  }

  if (empresa.status === 'aprobada') {
    return router.createUrlTree(['/empresa/dashboard']);
  }

  return false;
};
