import { CommonModule } from '@angular/common';
import { Component, computed, CUSTOM_ELEMENTS_SCHEMA, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { TuristasService } from '../../../../../core/services/admin/turistas.service';

@Component({
  selector: 'app-usuarios-turistas',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './usuarios-turistas.component.html',
  styleUrl: './usuarios-turistas.component.css',
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
  
})
export class UsuariosTuristasComponent implements OnInit{
    form: FormGroup;
  listaOriginal = signal<any[]>([]);
  turistaActivo = signal<any | null>(null);

  constructor(private fb: FormBuilder, private turistasService: TuristasService) {
    this.form = this.fb.group({
      search: [''],
      estado: ['']
    });
  }

  ngOnInit(): void {
    this.cargarTuristas();

    this.form.valueChanges.subscribe(() => this.filtrar());
  }

  cargarTuristas(): void {
    const token = localStorage.getItem('token');
    if (!token) return;

    this.turistasService.getTuristas(token).subscribe({
      next: res => this.listaOriginal.set(res.data),
      error: err => console.error('Error al obtener turistas', err)
    });
  }

  turistas = computed(() => {
    const { search, estado } = this.form.value;
    return this.listaOriginal().filter(t => {
      const coincideTexto =
        t.nombre.toLowerCase().includes(search?.toLowerCase() || '') ||
        t.correo.toLowerCase().includes(search?.toLowerCase() || '');
      const coincideEstado = estado ? t.estado === estado : true;
      return coincideTexto && coincideEstado;
    });
  });

  // Modal
  verPerfil(t: any): void {
    const token = localStorage.getItem('token');
    if (!token) return;

    this.turistasService.getDetalleTurista(t.id, token).subscribe({
      next: data => this.turistaActivo.set(data),
      error: err => console.error('Error al obtener detalle del turista', err)
    });
  }

  cerrarPerfil(): void {
    this.turistaActivo.set(null);
  }

  turistaSeleccionado = computed(() => this.turistaActivo());
  mostrandoPerfil = computed(() => this.turistaActivo() !== null);

  // Cambio de estado
  cambiarEstado(turista: any, nuevoEstado: string): void {
    const token = localStorage.getItem('token');
    if (!token) return;

    this.turistasService.cambiarEstado(turista.id, nuevoEstado, token).subscribe({
      next: () => {
        turista.estado = nuevoEstado;
      },
      error: err => console.error('Error al cambiar estado:', err)
    });
  }

  filtrar(): void {
    // ya se maneja con signal + computed
  } 
  }


