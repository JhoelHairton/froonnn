import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class LoginComponent {
  showPassword = false;
  isLoading = false; // 🌀 para animación

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService // 👈 Aquí

  ) { }

  onSubmit() {
    if (this.form.invalid) return;

    this.isLoading = true;

    const credentials = this.form.value as { email: string; password: string };

    this.authService.login(credentials).subscribe({
      next: (response) => {
        this.authService.saveSession(response);
        const { rol, empresa } = response.usuario;

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
                text: 'Tu empresa está pendiente de aprobación por el administrador.',
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
          const carritoPendiente = localStorage.getItem('carritoPendiente');
          if (carritoPendiente) {
            localStorage.removeItem('carritoPendiente');
            this.router.navigate(['/turista/reservas'], {
              state: { carrito: JSON.parse(carritoPendiente) }
            });
            return;
          }

          this.router.navigate(['/turista/inicio']);
          return;
        }


        this.router.navigate(['/unauthorized']);
      },


      error: (err) => {
        console.error('Login error', err);

        this.toastr.error(
          'Verifica tu correo y contraseña e intenta nuevamente.',
          '❌ Credenciales incorrectas',
          {
            timeOut: 4000,
            progressBar: true,
            positionClass: 'toast-top-right',
          }
        );

        this.isLoading = false;
      }


    });
  }
}
