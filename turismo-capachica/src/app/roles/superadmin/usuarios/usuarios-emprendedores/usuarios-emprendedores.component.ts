import { CommonModule } from '@angular/common';
import {
  HttpClient,
  HttpClientModule,
  HttpHeaders,
} from '@angular/common/http';
import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  OnInit,
  signal,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { EmprendedoresService } from '../../services/emprendedores.service';

@Component({
  selector: 'app-usuarios-emprendedores',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './usuarios-emprendedores.component.html',
  styleUrl: './usuarios-emprendedores.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class UsuariosEmprendedoresComponent implements OnInit {
   emprendedores: any[] = [];
  kpis = { total: 0, activos: 0, pendientes: 0, suspendidos: 0 };
  form!: FormGroup;
  verPass = false;
  imagenFile: File | null = null;
  imagenUrl: string | null = null;
  mostrandoFormulario = false;

  detalleSeleccionado: any = null; // se mostrará al hacer clic

verDetalle(emprendedorId: number): void {
  const token = localStorage.getItem('token')!;
  this.emprendedorService.getDetalle(emprendedorId, token).subscribe({
    next: res => {
      this.detalleSeleccionado = res;
    },
    error: err => console.error('Error al obtener detalle:', err)
  });
}

cambiarEstado(id: number, nuevoEstado: string): void {
  const token = localStorage.getItem('token')!;
  this.emprendedorService.cambiarEstado(id, nuevoEstado, token).subscribe({
    next: res => {
      this.cargarEmprendedores(); // 🔄 Refresca la tabla
      this.cargarKPIs(); // 🔄 Refresca los KPIs si los usas
    },
    error: err => {
      console.error('Error al cambiar estado', err);
    }
  });
}


  constructor(
    private fb: FormBuilder,
    private emprendedorService: EmprendedoresService
  ) {}

  ngOnInit(): void {
    this.inicializarFormulario();
    this.cargarKPIs();
    this.cargarEmprendedores();
  }

  inicializarFormulario(): void {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  cargarKPIs(): void {
    const token = localStorage.getItem('token')!;
    this.emprendedorService.getKPIs(token).subscribe(res => {
      this.kpis = res;
    });
  }
  

  cargarEmprendedores(): void {
    const token = localStorage.getItem('token')!;
    this.emprendedorService.getEmprendedores(token).subscribe(res => {
      this.emprendedores = res.data;
      console.log('🧾 Emprendedores:', this.emprendedores);

    });
  }

  abrirFormulario(): void {
    this.mostrandoFormulario = true;
  }

  cerrarFormulario(): void {
    this.mostrandoFormulario = false;
    this.form.reset();
    this.imagenFile = null;
    this.imagenUrl = null;
  }

  onImageSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.imagenFile = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.imagenUrl = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  guardar(): void {
    if (this.form.invalid) return;
    if (this.form.value.password !== this.form.value.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    const token = localStorage.getItem('token')!;
    const formData = new FormData();
    formData.append('nombre', this.form.value.nombre);
    formData.append('email', this.form.value.email);
    formData.append('password', this.form.value.password);
    formData.append('password_confirmation', this.form.value.confirmPassword);
    if (this.imagenFile) {
      formData.append('imagen', this.imagenFile);
    }

    this.emprendedorService.crearEmprendedor(formData, token).subscribe({
      next: () => {
        this.cargarEmprendedores();
        this.cargarKPIs();
        this.cerrarFormulario();
      },
      error: err => console.error('Error al crear emprendedor', err)
    });
  }
}
