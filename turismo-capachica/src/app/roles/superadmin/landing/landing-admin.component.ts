import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-landing-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './landing-admin.component.html',
  styleUrl: './landing-admin.component.css',
    schemas: [CUSTOM_ELEMENTS_SCHEMA], // ✅ AQUÍ está la clave
  
})
export class LandingAdminComponent {
   mostrarModoPreview = false;
  bloques = [
    {
      id: 1,
      titulo: 'Bienvenidos a Capachica',
      texto: 'Descubre las maravillas naturales y culturales.',
      imagen: '',
      video: '',
      activo: true
    }
  ];

  nuevoBloque = this.resetBloque();
  editIndex: number | null = null;
  showModal = false;

  resetBloque() {
    return {
      titulo: '',
      texto: '',
      imagen: '',
      video: '',
      activo: true
    };
  }

  abrirFormulario(index: number | null = null) {
    this.showModal = true;
    if (index !== null) {
      this.editIndex = index;
      this.nuevoBloque = { ...this.bloques[index] };
    } else {
      this.editIndex = null;
      this.nuevoBloque = this.resetBloque();
    }
  }

  guardarBloque() {
  if (!this.nuevoBloque.titulo.trim() || !this.nuevoBloque.texto.trim()) {
    Swal.fire('Faltan datos', 'Completa el título y el texto.', 'warning');
    return;
  }

  if (this.editIndex !== null) {
    // ✅ Mantiene el ID original al actualizar
    this.bloques[this.editIndex] = {
      id: this.bloques[this.editIndex].id,
      ...this.nuevoBloque
    };

    Swal.fire({
      icon: 'success',
      title: 'Bloque actualizado',
      toast: true,
      position: 'top-end',
      timer: 1500,
      showConfirmButton: false
    });
  } else {
    // ✅ Genera un nuevo ID de forma segura
    const nuevoId = this.bloques.length > 0
      ? Math.max(...this.bloques.map(b => b.id)) + 1
      : 1;

    this.bloques.push({
      id: nuevoId,
      ...this.nuevoBloque
    });

    Swal.fire({
      icon: 'success',
      title: 'Bloque agregado',
      toast: true,
      position: 'top-end',
      timer: 1500,
      showConfirmButton: false
    });
  }

  this.cancelar();
}


  cancelar() {
    this.showModal = false;
    this.nuevoBloque = this.resetBloque();
    this.editIndex = null;
  }

  eliminarBloque(index: number) {
    Swal.fire({
      title: '¿Eliminar bloque?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then(res => {
      if (res.isConfirmed) {
        this.bloques.splice(index, 1);
        Swal.fire({ icon: 'success', title: 'Eliminado', toast: true, position: 'top-end', timer: 1500, showConfirmButton: false });
      }
    });
  }

  cargarImagen(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.nuevoBloque.imagen = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  cargarVideo(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.nuevoBloque.video = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  cambiarOrden(event: any) {
    const prev = event.previousIndex;
    const curr = event.currentIndex;
    const item = this.bloques.splice(prev, 1)[0];
    this.bloques.splice(curr, 0, item);
  }

  togglePreview() {
    this.mostrarModoPreview = !this.mostrarModoPreview;
  }
  
}