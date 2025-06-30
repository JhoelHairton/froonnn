import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

// Interfaces
interface Company {
  id: number;
  user_id: number;
  business_name: string;
  trade_name: string;
  service_type: string;
  contact_email: string;
  phone: string;
  website: string;
  description: string;
  ruc: string;
  logo_url: string;
  location_id: number;
  status: 'pendiente' | 'aprobada' | 'rechazada';
  verified_at: string | null;
  created_at: string;
  updated_at: string;
}

interface Location {
  id: number;
  name: string;
}

interface CompanyUpdateData {
  business_name: string;
  trade_name: string;
  service_type: string;
  contact_email: string;
  phone: string;
  website: string;
  description: string;
  ruc: string;
  location_id: number;
  logo?: File;
}
@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css',
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
  
})
export class PerfilComponent implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  companyForm!: FormGroup;
  company: Company | null = null;
  locations: Location[] = [];
  currentLogoUrl: string = '';
  selectedLogoFile: File | null = null;
  isLoading = false;

  ngOnInit(): void {
    this.initializeForm();
    this.loadLocations();
    this.loadCompanyData();
  }

  private initializeForm(): void {
    this.companyForm = this.fb.group({
      business_name: ['', [Validators.required, Validators.minLength(2)]],
      trade_name: ['', [Validators.required, Validators.minLength(2)]],
      service_type: ['', Validators.required],
      contact_email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{9}$/)]],
      website: ['', Validators.pattern(/^https?:\/\/.+/)],
      description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(500)]],
      ruc: ['', [Validators.required, Validators.pattern(/^[0-9]{11}$/)]],
      location_id: ['', Validators.required]
    });
  }

  private loadCompanyData(): void {
    // Simulación de datos - reemplazar con llamada al servicio real
    // this.companyService.getCurrentCompany().subscribe({
    //   next: (company) => {
    //     this.company = company;
    //     this.populateForm(company);
    //   },
    //   error: (error) => {
    //     console.error('Error loading company data:', error);
    //   }
    // });

    // Datos de ejemplo basados en tu JSON
    this.company = {
      id: 2,
      user_id: 15,
      business_name: "dsdsdsd",
      trade_name: "sdsdsdsdsd",
      service_type: "hospedaje y tours",
      contact_email: "dsdsds@gmail.com",
      phone: "987654321",
      website: "http://localhost:4200/empresa/registrar-empresa",
      description: "dsdsdsdsdsdsd",
      ruc: "12345678902",
      logo_url: "http://localhost:8000/storage/logos/3fVrYPIDgISqXv9oWotEb6iAd4cMau0aXrWxFX25.jpg",
      location_id: 1,
      status: "aprobada",
      verified_at: "2025-06-30 09:06:11",
      created_at: "2025-06-30T09:04:31.000000Z",
      updated_at: "2025-06-30T09:06:11.000000Z"
    };

    this.populateForm(this.company);
  }

  private populateForm(company: Company): void {
    this.currentLogoUrl = company.logo_url;
    
    this.companyForm.patchValue({
      business_name: company.business_name,
      trade_name: company.trade_name,
      service_type: company.service_type,
      contact_email: company.contact_email,
      phone: company.phone,
      website: company.website,
      description: company.description,
      ruc: company.ruc,
      location_id: company.location_id
    });
  }

  private loadLocations(): void {
    // Simulación de datos - reemplazar con llamada al servicio real
    // this.locationService.getLocations().subscribe({
    //   next: (locations) => {
    //     this.locations = locations;
    //   },
    //   error: (error) => {
    //     console.error('Error loading locations:', error);
    //   }
    // });

    // Datos de ejemplo
    this.locations = [
      { id: 1, name: 'Lima, Lima' },
      { id: 2, name: 'Cusco, Cusco' },
      { id: 3, name: 'Arequipa, Arequipa' },
      { id: 4, name: 'Puno, Puno' },
      { id: 5, name: 'Iquitos, Loreto' }
    ];
  }

  onLogoChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      
      // Validar tipo de archivo
      if (!file.type.startsWith('image/')) {
        alert('Por favor selecciona un archivo de imagen válido');
        return;
      }

      // Validar tamaño (5MB máximo)
      if (file.size > 5 * 1024 * 1024) {
        alert('El archivo debe ser menor a 5MB');
        return;
      }

      this.selectedLogoFile = file;

      // Mostrar preview
      const reader = new FileReader();
      reader.onload = (e) => {
        this.currentLogoUrl = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.src = '/assets/default-logo.png';
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.companyForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

formatDate(dateString: string | null | undefined): string {
  if (!dateString) return 'Sin verificar';
  
  const date = new Date(dateString);
  return date.toLocaleDateString('es-PE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}




  onSubmit(): void {
    if (this.companyForm.valid && this.company) {
      this.isLoading = true;

      const formData = new FormData();
      const formValue = this.companyForm.value;

      // Agregar campos del formulario
      Object.keys(formValue).forEach(key => {
        if (formValue[key] !== null && formValue[key] !== '') {
          formData.append(key, formValue[key]);
        }
      });

      // Agregar logo si se seleccionó uno nuevo
      if (this.selectedLogoFile) {
        formData.append('logo', this.selectedLogoFile);
      }

      // Simulación de llamada al servicio - reemplazar con llamada real
      // this.companyService.updateCompany(this.company.id, formData).subscribe({
      //   next: (response) => {
      //     console.log('Company updated successfully:', response);
      //     this.router.navigate(['/empresa/perfil']);
      //   },
      //   error: (error) => {
      //     console.error('Error updating company:', error);
      //     this.isLoading = false;
      //   },
      //   complete: () => {
      //     this.isLoading = false;
      //   }
      // });

      // Simulación para demo
      setTimeout(() => {
        console.log('Datos a enviar:', formValue);
        console.log('Logo seleccionado:', this.selectedLogoFile);
        
        // Simular éxito
        alert('Perfil de empresa actualizado exitosamente');
        this.isLoading = false;
        // this.router.navigate(['/empresa/perfil']);
      }, 2000);
    } else {
      // Marcar todos los campos como touched para mostrar errores
      Object.keys(this.companyForm.controls).forEach(key => {
        this.companyForm.get(key)?.markAsTouched();
      });
      
      console.log('Formulario inválido');
    }
  }

  onCancel(): void {
    if (this.companyForm.dirty) {
      const confirmed = confirm('¿Estás seguro de que quieres cancelar? Se perderán los cambios no guardados.');
      if (confirmed) {
        this.router.navigate(['/empresa/perfil']);
      }
    } else {
      this.router.navigate(['/empresa/perfil']);
    }
  }
}
