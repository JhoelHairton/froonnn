import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';
import { DragDropModule, CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { CategoriaService, CategoriaDTO } from '../../services/categoria.service';

@Component({
  selector: 'app-categorias',
  standalone: true,
  imports: [CommonModule, FormsModule, DragDropModule],
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CategoriasComponent implements OnInit {
  categorias: CategoriaDTO[] = [];
  modalAbierto = false;
  dropdownOpenId: number | null = null;
  categoriaEnEdicion: CategoriaDTO = this.resetDTO();

  constructor(private svc: CategoriaService) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.svc.getAll().subscribe(
      data => this.categorias = data,
      err  => console.error('Error al listar categorías', err)
    );
  }

  abrirModalCrear(): void {
    this.categoriaEnEdicion = this.resetDTO();
    this.modalAbierto = true;
    this.dropdownOpenId = null;
  }

  editarCategoria(c: CategoriaDTO): void {
    this.categoriaEnEdicion = { ...c };
    this.modalAbierto = true;
    this.dropdownOpenId = null;
  }

  guardarCategoria(): void {
    const req$ = this.categoriaEnEdicion.id
      ? this.svc.update(this.categoriaEnEdicion)
      : this.svc.create(this.categoriaEnEdicion);

    req$.subscribe(
      () => { this.load(); this.cerrarModal(); },
      err => console.error('Error al guardar categoría', err)
    );
  }

  confirmarEliminar(c: CategoriaDTO): void {
    if (c.id && confirm(`¿Eliminar "${c.name}"?`)) {
      this.svc.delete(c.id).subscribe(
        () => this.load(),
        err => console.error('Error al eliminar', err)
      );
    }
  }

  cerrarModal(): void {
    this.modalAbierto = false;
    this.dropdownOpenId = null;
  }

  toggleDropdown(id: number): void {
    this.dropdownOpenId = this.dropdownOpenId === id ? null : id;
  }

  reordenar(e: CdkDragDrop<CategoriaDTO[]>): void {
    moveItemInArray(this.categorias, e.previousIndex, e.currentIndex);
    // opcional: persistir orden en backend
  }

  private resetDTO(): CategoriaDTO {
    return { name: '', description: '', status: 'active' };
  }
}
