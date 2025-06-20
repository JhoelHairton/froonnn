import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { EmpresaService } from '../services/empresa.service';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-registrar-empresa',
  standalone: true,
  imports: [CommonModule,         // Para directivas como *ngIf, *ngFor
    ReactiveFormsModule,  // Para usar formularios reactivos
    RouterModule],
  templateUrl: './registrar-empresa.component.html',
  styleUrl: './registrar-empresa.component.css'
})
export class RegistrarEmpresaComponent {

  previewUrl: string | null = null;

  cancelAndLogout() {
    this.authService.logout();
  }
  form: FormGroup;
  isLoading = false;
  selectedLogoFile!: File;

  constructor(
    private fb: FormBuilder,
    private empresaService: EmpresaService,
    private router: Router,
    private authService: AuthService
  ) {
    this.form = this.fb.group({
      ruc: ['', Validators.required],
      business_name: ['', Validators.required],
      trade_name: ['', Validators.required],
      service_type: ['', Validators.required],
      contact_email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      website: [''],
      description: ['', Validators.required],
      logo: [null, Validators.required],
    });
  }

  onLogoSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedLogoFile = input.files[0];
      this.form.get('logo')?.setValue(this.selectedLogoFile); // ✅ marca como válido


      // Mostrar vista previa del logo
      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result as string;
      };
      reader.readAsDataURL(this.selectedLogoFile);
    }
  }



onSubmit() {
  console.log(this.form.value, this.form.valid);

  if (this.form.invalid || !this.selectedLogoFile) {
    Swal.fire({
      icon: 'warning',
      title: 'Formulario incompleto',
      text: 'Por favor, llena todos los campos correctamente.',
    });
    return;
  }

  const formData = new FormData();
  Object.entries(this.form.value).forEach(([key, value]) => {
    if (key !== 'logo') {
      formData.append(key, value as string);
    }
  });
  formData.append('logo', this.selectedLogoFile);

  this.isLoading = true;

  this.empresaService.registrarEmpresa(formData).subscribe({
    next: (res: any) => {
      Swal.fire({
        icon: 'success',
        title: 'Empresa registrada',
        text: res.mensaje || 'Tu empresa ha sido registrada correctamente.',
        confirmButtonText: 'Entendido',
      }).then(() => {
        this.router.navigate(['/empresa/espera-aprobacion']);
      });
      this.isLoading = false;
    },
    error: (err) => {
      console.error(err);
      Swal.fire({
        icon: 'error',
        title: 'Error al registrar',
        text: err?.error?.mensaje || 'Hubo un problema al registrar la empresa. Intenta nuevamente.',
      });
      this.isLoading = false;
    },
  });

}

removePreview() {
  this.previewUrl = null;
  // Limpiar el input file si es necesario
}
}
