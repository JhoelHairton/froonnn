import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { EmpresaService } from '../../../../core/services/emprendedor/empresa.service';
import { AuthService } from '../../../../core/services/auth.service';
import { ComunidadDTO, ComunidadService } from '../../../../core/services/emprendedor/comunidad.service'; 

@Component({
  selector: 'app-registrar-empresa',
  standalone: true,
  imports: [CommonModule,         // Para directivas como *ngIf, *ngFor
    ReactiveFormsModule,  // Para usar formularios reactivos
    RouterModule],
  templateUrl: './registrar-empresa.component.html',
  styleUrl: './registrar-empresa.component.css'
})
export class RegistrarEmpresaComponent implements OnInit {

   serviceTypes = [
    'hospedaje',
    'tours',
    'hospedaje y tours',
    'transporte turístico',
    'restauración',
    'agencia de viajes',
    'otros'
  ];

  previewUrl: string | null = null;

  cancelAndLogout() {
    this.authService.logout();
  }
  form: FormGroup;
  comunidades: ComunidadDTO[] = [];
  isLoading = false;
  selectedLogoFile!: File;

  constructor(
    private fb: FormBuilder,
    private empresaService: EmpresaService,
    private router: Router,
    private authService: AuthService,
    private comunidadService: ComunidadService,

  ) 

  
  
  {
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
      location_id:    [null, Validators.required],    // ← nuevo control

    });
  }
  ngOnInit(): void {
    // Llamas al servicio para traer todas las "locations"
    this.comunidadService.list().subscribe({
      next: (lista) => {
        // Filtra sólo las activas, si tu DTO trae 'estado'
        this.comunidades = lista.filter(c => c.estado === 'activa');
      },
      error: () => {
        Swal.fire('Error', 'No se pudieron cargar las comunidades', 'error');
      }
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
    if (this.form.invalid || !this.selectedLogoFile) {
      Swal.fire('Atención', 'Completa todos los campos', 'warning');
      return;
    }

    const formData = new FormData();
    Object.entries(this.form.value).forEach(([k, v]) => {
      if (k !== 'logo') formData.append(k, v as string);
    });
    formData.append('logo', this.selectedLogoFile);

    this.isLoading = true;
    this.empresaService.registrarEmpresa(formData).subscribe({
      next: (res: any) => {
        Swal.fire('¡Listo!', res.mensaje, 'success')
          .then(() => this.router.navigate(['/empresa/espera-aprobacion']));
        this.isLoading = false;
      },
      error: (err) => {
        Swal.fire('Error', err.error?.mensaje || 'No se pudo registrar', 'error');
        this.isLoading = false;
      }
    });
  }

removePreview() {
  this.previewUrl = null;
  // Limpiar el input file si es necesario
}
}
