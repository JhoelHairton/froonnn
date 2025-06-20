import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
    schemas: [CUSTOM_ELEMENTS_SCHEMA], // ✅ AQUÍ está la clave
  
})


export class RegisterComponent {

  showConfirm = false;
  showPassword = false;

  passwordsMatchValidator(group: FormGroup) {
    const pass = group.get('password')?.value;
    const confirm = group.get('password_confirmation')?.value;
    return pass === confirm ? null : { notMatching: true };
  }
  

  form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],    
    password_confirmation: ['', Validators.required]
    }, {
        validators: this.passwordsMatchValidator
  });

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  onSubmit() {
    if (this.form.invalid) {
      this.toastr.warning('Completa todos los campos correctamente.', 'Formulario inválido');
      return;
    }
  
    const formData = this.form.value;
  
    this.auth.registerTurista(formData).subscribe({
      next: (res) => {
        this.auth.saveSession(res);
        this.toastr.success('Registro exitoso', 'Bienvenido 🎉');
  
        setTimeout(() => this.router.navigate(['/turista/inicio']), 2000);
      },
      error: (err) => {
        if (err.status === 422 && err.error?.errors?.email) {
          this.form.get('email')?.setErrors({ exists: true });
  
          this.toastr.error('El email ingresado ya está en uso.', 'Correo ya registrado');
        } else {
          this.toastr.error(err.error?.message || 'Intenta nuevamente.', 'Error al registrarse');
        }
      }
    });

  }}