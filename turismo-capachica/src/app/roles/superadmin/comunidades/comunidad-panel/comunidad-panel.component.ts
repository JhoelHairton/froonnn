// src/app/roles/superadmin/comunidades/comunidad-panel/comunidad-panel.component.ts
import { CommonModule } from '@angular/common';
import {
  HttpEvent,
  HttpEventType,
  HttpClientModule
} from '@angular/common/http';
import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  OnInit
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  ComunidadDTO,
  ComunidadService
} from '../../services/comunidad.service';

@Component({
  selector: 'app-comunidad-panel',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './comunidad-panel.component.html',
  styleUrls: ['./comunidad-panel.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ComunidadPanelComponent implements OnInit {
  comunidades: ComunidadDTO[] = [];
  filtro = '';

  // Para creación/edición
  modalAbierto = false;
  progreso = 0;
  comunidad: ComunidadDTO = this.resetModel();
  imagenFile: File | null = null;
  galeriaFiles: File[] = [];

  // Para detalle
  detalleModalAbierto = false;
  selectedComunidad: ComunidadDTO | null = null;

  isVisible = false;

  onOverlayClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (target.classList.contains('glass-dark')) {
      this.cerrarDetalle();
    }
  }

  trackByIndex(index: number): number {
    return index;
  }


  // Base URL para imágenes
  private readonly apiBase = 'http://localhost:8000';

  constructor(private svc: ComunidadService) { }

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.svc.list().subscribe(
      data => {
        this.comunidades = data.map(c => ({
          ...c,
          // Anteponemos el host a la ruta que ya incluye “/storage/...”
          imagenUrl: `${this.apiBase}${c.imagen}`,
          galeriaUrls: c.galeria?.map(path => `${this.apiBase}${path}`) || []
        }));
      },
      err => console.error('Error al listar comunidades', err)
    );
  }

  /** Filtrado en tiempo real */
  get comunidadesFiltradas(): ComunidadDTO[] {
    const term = this.filtro.trim().toLowerCase();
    if (!term) return this.comunidades;
    return this.comunidades.filter(c =>
      c.name.toLowerCase().includes(term) ||
      c.type.toLowerCase().includes(term) ||
      c.descripcion_corta.toLowerCase().includes(term)
    );
  }

  /** Abre modal de creación */
  abrirCrear(): void {
    this.resetForm();
    this.modalAbierto = true;
  }

  /** Abre modal de edición */
  editar(c: ComunidadDTO): void {
    this.comunidad = { ...c };
    this.imagenFile = null;
    this.galeriaFiles = [];
    this.modalAbierto = true;
  }

  /** Confirma y elimina */
  eliminar(c: ComunidadDTO): void {
    if (c.id && confirm(`¿Eliminar comunidad "${c.name}"?`)) {
      this.svc.delete(c.id).subscribe(
        () => this.load(),
        err => console.error('Error al eliminar', err)
      );
    }
  }

  /** Manejadores de archivos */
  onImagenChange(evt: Event) {
    const inp = evt.target as HTMLInputElement;
    if (inp.files?.length) this.imagenFile = inp.files[0];
  }
  onGaleriaChange(evt: Event) {
    const inp = evt.target as HTMLInputElement;
    if (inp.files) this.galeriaFiles = Array.from(inp.files);
  }

  /** Guarda (crear o actualizar) */

  guardar(): void {
    const fd = new FormData();
    fd.append('name', this.comunidad.name);
    fd.append('type', this.comunidad.type);
    fd.append('descripcion_corta', this.comunidad.descripcion_corta);
    fd.append('descripcion_larga', this.comunidad.descripcion_larga);
    fd.append('atractivos', this.comunidad.atractivos);
    fd.append('habitantes', String(this.comunidad.habitantes));
    fd.append('estado', this.comunidad.estado);

    if (this.imagenFile) {
      fd.append('imagen', this.imagenFile);
    }
    this.galeriaFiles.forEach(f => fd.append('galeria[]', f));

    // **Aquí**: llamamos siempre a save(), pasando el id si existe
    this.svc.save(fd, this.comunidad.id).subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress && event.total) {
          this.progreso = Math.round(100 * event.loaded / event.total);
        } else if (event.type === HttpEventType.Response) {
          this.load();
          this.cerrarModal();
        }
      },
      err => console.error('Error al guardar comunidad', err)
    );
  }

  cerrarModal(): void {
    this.modalAbierto = false;
    this.progreso = 0;
  }
  private resetForm() {
    this.comunidad = this.resetModel();
    this.imagenFile = null;
    this.galeriaFiles = [];
  }
  private resetModel(): ComunidadDTO {
    return {
      name: '',
      type: '',
      descripcion_corta: '',
      descripcion_larga: '',
      atractivos: '',
      habitantes: 0,
      estado: 'activa',
      imagen: '',
      galeria: []
    };
  }

 verDetalle(c: ComunidadDTO): void {
  this.selectedComunidad = {
    ...c,
    imagenUrl: `${this.apiBase}${c.imagen}`,
    galeriaUrls: c.galeria?.map(path => `${this.apiBase}${path}`) || []
  };
  this.detalleModalAbierto = true;
}


  cerrarDetalle(): void {
    this.selectedComunidad = null;
    this.isVisible = false;
  }

}
