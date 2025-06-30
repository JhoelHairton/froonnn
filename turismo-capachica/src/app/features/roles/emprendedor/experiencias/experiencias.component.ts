// src/app/roles/emprendedor/experiencias/experiencias.component.ts
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormsModule
} from '@angular/forms';
import { NgFor, NgIf, NgClass } from '@angular/common';
import Swal from 'sweetalert2';
import { HttpClientModule } from '@angular/common/http';

import { ServiceCreationService, Servicio } from '../../../../core/services/emprendedor/service-creation.service'; 
import { CategoriaDTO, CategoriaService } from '../../../../core/services/emprendedor/categoria.service'; 
import { ComunidadDTO, ComunidadService } from '../../../../core/services/emprendedor/comunidad.service'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-experiencias',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    NgFor,
    NgIf,
    NgClass,
    HttpClientModule
  ],
  templateUrl: './experiencias.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ExperienciasComponent implements OnInit {
  servicios: Servicio[] = [];
  filteredServicios: Servicio[] = [];

  categorias: CategoriaDTO[] = [];
  comunidades: ComunidadDTO[] = [];

  form: FormGroup;
  showModal = false;
    filterType   = '';    // ← Agrégala aquí
  isEditing = false;
  showFilterPanel = false;
  editingId: number | null = null;
  selectedFiles: File[] = [];

  showMediaModal = false;
  currentService!: Servicio;
  selectedMediaFiles: File[] = [];

  // filtros
  searchTerm   = '';
  filterStatus = '';

  constructor(
    private svc: ServiceCreationService,
    private fb: FormBuilder,
    private catSvc: CategoriaService,
    private comSvc: ComunidadService,
      private router: Router

  ) {
    this.form = this.fb.group({
      title:               ['', Validators.required],
      description:         ['', Validators.required],
      ubicacion_detallada: ['', Validators.required],
      price:               [null, [Validators.required, Validators.min(0)]],
      capacity:            [1, Validators.required],
      duration:            ['', Validators.required],
      policy_cancellation: [null],
      category_id:         ['', Validators.required],
      location_id:         ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadServicios();

    this.catSvc.getAll().subscribe({
      next: cats => this.categorias = cats,
      error: ()   => Swal.fire('Error', 'No se cargaron categorías', 'error')
    });

    this.comSvc.list().subscribe({
      next: coms => this.comunidades = coms,
      error: ()   => Swal.fire('Error', 'No se cargaron comunidades', 'error')
    });
  }

  private loadServicios() {
    this.svc.getServicios().subscribe(list => {
      this.servicios = list;
      this.applyFilters();
    });
  }

  get totalCount() {
    return this.servicios.length;
  }
  get activeCount() {
    return this.servicios.filter(s => s.status === 'active').length;
  }

  applyFilters() {
    const term = this.searchTerm.toLowerCase();
    this.filteredServicios = this.servicios.filter(s => {
      const okSearch = !term
        || s.title.toLowerCase().includes(term)
        || s.description.toLowerCase().includes(term)
        || s.ubicacion_detallada.toLowerCase().includes(term);
      const okStatus = !this.filterStatus || s.status === this.filterStatus;
      return okSearch && okStatus;
    });
  }

  openCreate() {
    this.isEditing = false;
    this.editingId = null;
    this.form.reset({
      title: '',
      description: '',
      ubicacion_detallada: '',
      price: null,
      capacity: 1,
      duration: '',
      policy_cancellation: null,
      category_id: this.categorias[0]?.id?.toString() || '',
      location_id: this.comunidades[0]?.id?.toString() || ''
    });
    this.selectedFiles = [];
    this.showModal = true;
  }

  openEdit(s: Servicio) {
    this.isEditing = true;
    this.editingId = s.id;
    this.form.patchValue({
      title:               s.title,
      description:         s.description,
      ubicacion_detallada:            s.ubicacion_detallada,
      price:               s.price,
      capacity:            s.capacity,
      duration:            s.duration,
      policy_cancellation: s.policy_cancellation,
      category_id:         s.category_id.toString(),
      location_id:         s.location_id.toString()
    });
    this.selectedFiles = [];
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  onFileSelected(evt: Event) {
    const inp = evt.target as HTMLInputElement;
    if (inp.files?.length) {
      this.selectedFiles = Array.from(inp.files);
    }
  }

  submit() {
    if (this.form.invalid) return;
    const v = this.form.value;

    if (this.isEditing && this.editingId) {
      this.svc.updateServicioFields(this.editingId, {
        title:               v.title,
        description:         v.description,
        ubicacion_detallada: v.ubicacion_detallada,
        price:               v.price,
        capacity:            v.capacity,
        duration:            v.duration,
        policy_cancellation: v.policy_cancellation,
        category_id:         +v.category_id,
        location_id:         +v.location_id
      }).subscribe({
        next: res => {
          if (this.selectedFiles.length) {
            this.svc.uploadMedia(this.editingId!, this.selectedFiles).subscribe({
              next: () => {
                this.loadServicios();
                this.finishSuccess('Servicio actualizado');
              },
              error: () => this.errorToast()
            });
          } else {
            const idx = this.servicios.findIndex(x => x.id === this.editingId);
            if (idx > -1) this.servicios[idx] = res.service;
            this.finishSuccess('Servicio actualizado');
          }
        },
        error: () => this.errorToast()
      });
    } else {
      const fd = new FormData();
      fd.append('title',                v.title);
      fd.append('description',          v.description);
      fd.append('ubicacion_detallada',  v.ubicacion_detallada);
      fd.append('price',                v.price.toString());
      fd.append('capacity',             v.capacity.toString());
      fd.append('duration',             v.duration);
      fd.append('policy_cancellation',  v.policy_cancellation || '');
      fd.append('category_id',          v.category_id);
      fd.append('location_id',          v.location_id);
      this.selectedFiles.forEach(f => fd.append('photos[]', f));

      this.svc.createServicio(fd).subscribe({
        next: res => {
          this.servicios.unshift(res.service);
          this.finishSuccess('Servicio creado');
        },
        error: () => this.errorToast()
      });
    }
  }

  finishSuccess(msg: string) {
    this.showModal = false;
    this.selectedFiles = [];
    Swal.fire({
      icon: 'success',
      title: msg,
      toast: true,
      position: 'top-end',
      timer: 2000
    });
  }

  private errorToast() {
    Swal.fire({
      icon: 'error',
      title: 'Error al guardar',
      toast: true,
      position: 'top-end',
      timer: 2000
    });
  }

  delete(s: Servicio) {
    Swal.fire({
      icon: 'warning',
      title: `Eliminar "${s.title}"?`,
      showCancelButton: true
    }).then(res => {
      if (res.isConfirmed) {
        this.svc.deleteServicio(s.id).subscribe(() => {
          this.servicios = this.servicios.filter(x => x.id !== s.id);
          Swal.fire({
            icon: 'success',
            title: 'Eliminado',
            toast: true,
            position: 'top-end',
            timer: 1500
          });
        });
      }
    });
  }

  toggle(s: Servicio) {
    const prev = s.status;
    s.status = prev === 'active' ? 'inactive' : 'active';
    this.svc.toggleActive(s.id).subscribe({
      next: ({ status }) => {
        s.status = status;
        Swal.fire({
          icon: 'info',
          title: status === 'active' ? 'Activado' : 'Desactivado',
          toast: true,
          position: 'top-end',
          timer: 1500
        });
      },
      error: () => {
        s.status = prev;
        this.errorToast();
      }
    });
  }

  // Media Modal
  openMediaModal(s: Servicio) {
    this.currentService = s;
    this.selectedMediaFiles = [];
    this.showMediaModal = true;
  }
  closeMediaModal() {
    this.showMediaModal = false;
  }
  onMediaSelected(evt: Event) {
    const inp = evt.target as HTMLInputElement;
    if (inp.files) this.selectedMediaFiles = Array.from(inp.files);
  }
  uploadMedia() {
    if (!this.currentService || !this.selectedMediaFiles.length) return;
    this.svc.uploadMedia(this.currentService.id, this.selectedMediaFiles).subscribe({
      next: ({ media }) => {
        this.currentService.media.push(...media);
        this.selectedMediaFiles = [];
      },
      error: () => Swal.fire('Error', 'No se pudo subir imágenes', 'error')
    });
  }
  deleteMedia(id: number) {
    this.svc.deleteMedia(this.currentService.id, id).subscribe({
      next: () => {
        this.currentService.media = this.currentService.media.filter(m => m.id !== id);
      },
      error: () => Swal.fire('Error', 'No se pudo eliminar la imagen', 'error')
    });
  }

  verItinerario(id: number) {
  this.router.navigate(['/empresa/servicio', id, 'itinerarios']);
}
}
