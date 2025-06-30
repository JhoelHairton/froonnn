// src/app/pages/login/login.component.ts

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import Swal from 'sweetalert2';

import { AuthService } from '../../../core/services/auth.service';
import { ReservaService, CheckoutPayload } from '../../../core/services/reserva.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class LoginComponent {
  showPassword = false;
  isLoading = false;

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  private returnUrl: string;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private reservaSvc: ReservaService,
    private toastr: ToastrService
  ) {
    // Capturamos el returnUrl (si veníamos redirigidos)
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '';
  }

  onSubmit() {
  if (this.form.invalid) return;
  this.isLoading = true;

  const credentials = this.form.value as { email: string; password: string };

  this.authService.login(credentials).subscribe({
    next: (response) => {
      this.authService.saveSession(response);

      const { rol, empresa } = response.usuario;
      const pending = localStorage.getItem('carritoPendiente');

      // 1) Si hay carrito pendiente y el rol es TURISTA, hacemos checkout
      if (pending && rol === 'turista') {
        const payload = JSON.parse(pending) as CheckoutPayload;
        this.reservaSvc.checkout(payload).subscribe({
          next: () => {
            localStorage.removeItem('carritoPendiente');
            this.router.navigate(['/turista/reservas']);
          },
          error: (e: any) => {
            console.error('Checkout tras login fallido', e);
            localStorage.removeItem('carritoPendiente'); // Limpieza por seguridad
            this.router.navigate(['/turista/inicio']);
          }
        });
        return;
      }

      // 2) Si hay returnUrl, navegamos allí
      if (this.returnUrl) {
        this.router.navigateByUrl(this.returnUrl);
        return;
      }

      // 3) Lógica por rol
      if (rol === 'emprendedor') {
        if (!empresa) {
          this.router.navigate(['/empresa/registrar-empresa']);
          return;
        }
        switch (empresa.status) {
          case 'aprobada':
            this.router.navigate(['/empresa/dashboard']);
            return;
          case 'pendiente':
            Swal.fire({
              icon: 'info',
              title: '⏳ Empresa en revisión',
              text: 'Tu empresa está pendiente de aprobación.',
              confirmButtonText: 'Entendido'
            });
            this.isLoading = false;
            return;
          case 'observada':
            this.router.navigate(['/empresa/registrar-empresa']);
            return;
          default:
            this.router.navigate(['/unauthorized']);
            return;
        }
      }

      if (rol === 'superadmin') {
        this.router.navigate(['/admin/dashboard']);
        return;
      }

      if (rol === 'turista') {
        this.router.navigate(['/turista/inicio']);
        return;
      }

      // Si no coincide ningún rol
      this.router.navigate(['/unauthorized']);
    },

    error: (err: any) => {
      console.error('Login error', err);
      this.toastr.error(
        'Verifica tu correo y contraseña e intenta nuevamente.',
        '❌ Credenciales incorrectas',
        { timeOut: 4000, progressBar: true, positionClass: 'toast-top-right' }
      );
      this.isLoading = false;
    }
  });
}

}
