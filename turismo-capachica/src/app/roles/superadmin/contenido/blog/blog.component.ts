import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, FormsModule, NgFor, NgIf],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class BlogComponent {
  mostrarModal = false;
  editando = false;
  editIndex: number | null = null;

  categorias = ['Cultura', 'Gastronomía', 'Aventura'];

  etiquetasTexto: string = '';
  entradas: any[] = [];

  nuevoPost = this.resetPost();

  resetPost() {
    return {
      tituloES: '',
      tituloEN: '',
      descripcionES: '',
      descripcionEN: '',
      contenido: '',
      imagenDestacada: '',
      galeria: [] as string[],
      etiquetas: [] as string[],
      categoria: '',
      publicado: false,
      fechaCreacion: new Date(),
      autor: 'Admin'
    };
  }

  abrirFormulario(post: any = null) {
    this.mostrarModal = true;
    if (post) {
      this.editando = true;
      this.editIndex = this.entradas.indexOf(post);
      this.nuevoPost = { ...post };
      this.etiquetasTexto = post.etiquetas?.join(', ') || '';
    } else {
      this.editando = false;
      this.editIndex = null;
      this.nuevoPost = this.resetPost();
      this.etiquetasTexto = '';
    }
  }

  cargarImagenDestacada(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.nuevoPost.imagenDestacada = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  cargarGaleria(event: any) {
    const files = event.target.files;
    if (files) {
      Array.from(files).forEach((file: any) => {
        const reader = new FileReader();
        reader.onload = () => {
          this.nuevoPost.galeria.push(reader.result as string);
        };
        reader.readAsDataURL(file);
      });
    }
  }

  guardar() {
    const contenidoLimpio = this.nuevoPost.contenido?.replace(/<(.|\n)*?>/g, '').trim();
    if (
      !this.nuevoPost.tituloES.trim() ||
      !this.nuevoPost.descripcionES.trim() ||
      !contenidoLimpio
    ) {
      Swal.fire({
        icon: 'warning',
        title: 'Faltan datos',
        text: 'Completa los campos obligatorios (título, descripción y contenido)',
      });
      return;
    }

    this.nuevoPost.etiquetas = this.etiquetasTexto
      .split(',')
      .map(e => e.trim())
      .filter(e => e.length > 0);

    if (this.editando && this.editIndex !== null) {
      this.entradas[this.editIndex] = { ...this.nuevoPost };
      Swal.fire({
        icon: 'success',
        title: 'Entrada actualizada',
        toast: true,
        position: 'top-end',
        timer: 2000,
        showConfirmButton: false,
      });
    } else {
      this.entradas.push({ ...this.nuevoPost });
      Swal.fire({
        icon: 'success',
        title: 'Entrada guardada',
        toast: true,
        position: 'top-end',
        timer: 2000,
        showConfirmButton: false,
      });
    }

    this.cancelar();
  }

  cancelar() {
    this.mostrarModal = false;
    this.nuevoPost = this.resetPost();
    this.etiquetasTexto = '';
    this.editando = false;
    this.editIndex = null;
  }

  editar(post: any) {
    this.abrirFormulario(post);
  }

  eliminar(post: any) {
    Swal.fire({
      title: '¿Eliminar entrada?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        const index = this.entradas.indexOf(post);
        if (index > -1) this.entradas.splice(index, 1);
        Swal.fire({
          icon: 'success',
          title: 'Eliminado',
          toast: true,
          position: 'top-end',
          timer: 2000,
          showConfirmButton: false,
        });
      }
    });
  }
}
