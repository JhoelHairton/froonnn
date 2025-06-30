import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-testimonios',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './testimonios.component.html',
  styleUrl: './testimonios.component.css',
    schemas: [CUSTOM_ELEMENTS_SCHEMA], // ✅ AQUÍ está la clave
  
})
export class TestimoniosComponent {
  testimonios = [
    {
      id: 1,
      nombre: 'Ana Torres',
      imagen: '',
      comunidad: 'Llachón',
      rol: 'turista',
      comentarioES: 'Una experiencia inolvidable.',
      comentarioEN: 'An unforgettable experience.',
      activo: true
    },
    {
      id: 2,
      nombre: 'José Paredes',
      imagen: '',
      comunidad: 'Chifrón',
      rol: 'emprendedor',
      comentarioES: 'Gracias por apoyar nuestro trabajo.',
      comentarioEN: 'Thanks for supporting our work.',
      activo: false
    }
  ];

  comunidades = ['Llachón', 'Chifrón', 'Ccotos', 'Tikonata'];
  filtroNombre = '';
  filtroComunidad = '';
  filtroRol = '';
  filtroEstado = '';

  mostrarModal = false;
  editIndex: number | null = null;

  nuevoTestimonio = this.resetFormulario();

  resetFormulario() {
    return {
      id: 0,
      nombre: '',
      imagen: '',
      comunidad: '',
      rol: '',
      comentarioES: '',
      comentarioEN: '',
      activo: true
    };
  }

  abrirFormulario(index: number | null = null) {
    this.editIndex = index;
    this.mostrarModal = true;
    if (index !== null) {
      this.nuevoTestimonio = { ...this.testimonios[index] };
    } else {
      this.nuevoTestimonio = this.resetFormulario();
    }
  }

  cargarImagen(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.nuevoTestimonio.imagen = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  guardar() {
    if (
      !this.nuevoTestimonio.nombre ||
      !this.nuevoTestimonio.comunidad ||
      !this.nuevoTestimonio.rol ||
      !this.nuevoTestimonio.comentarioES ||
      !this.nuevoTestimonio.comentarioEN
    ) {
      Swal.fire({
        icon: 'warning',
        title: 'Campos incompletos',
        text: 'Completa todos los campos obligatorios',
        confirmButtonColor: '#6366f1'
      });
      return;
    }

    if (this.editIndex !== null) {
      this.testimonios[this.editIndex] = { ...this.nuevoTestimonio };
      Swal.fire({
        icon: 'success',
        title: 'Testimonio actualizado',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000
      });
    } else {
      const nuevo = {
        ...this.nuevoTestimonio,
        id: this.testimonios.length + 1
      };
      this.testimonios.push(nuevo);
      Swal.fire({
        icon: 'success',
        title: 'Testimonio creado',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000
      });
    }

    this.cancelar();
  }

  eliminar(index: number) {
    Swal.fire({
      title: '¿Eliminar este testimonio?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.testimonios.splice(index, 1);
        Swal.fire({
          icon: 'success',
          title: 'Eliminado',
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 2000
        });
      }
    });
  }

  cancelar() {
    this.mostrarModal = false;
    this.editIndex = null;
    this.nuevoTestimonio = this.resetFormulario();
  }

  testimoniosFiltrados() {
    return this.testimonios.filter((t) => {
      const coincideNombre = this.filtroNombre
        ? t.nombre.toLowerCase().includes(this.filtroNombre.toLowerCase())
        : true;
      const coincideComunidad = this.filtroComunidad ? t.comunidad === this.filtroComunidad : true;
      const coincideRol = this.filtroRol ? t.rol === this.filtroRol : true;
      const coincideEstado = this.filtroEstado
        ? (this.filtroEstado === 'activo' && t.activo) ||
          (this.filtroEstado === 'inactivo' && !t.activo)
        : true;

      return coincideNombre && coincideComunidad && coincideRol && coincideEstado;
    });
  }

  editar(index: number) {
    this.abrirFormulario(index);
  }
}
