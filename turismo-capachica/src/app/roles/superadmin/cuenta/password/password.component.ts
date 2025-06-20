// password.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-password',
  imports: [CommonModule, FormsModule],
  templateUrl: './password.component.html',
})
export class PasswordComponent {
  form = {
    actual: '',
    nueva: '',
    confirmacion: '',
  };

  error = '';

  cambiarContrasena() {
    if (this.form.nueva.length < 8) {
      this.error = 'La nueva contraseña debe tener al menos 8 caracteres.';
      return;
    }

    if (this.form.nueva !== this.form.confirmacion) {
      this.error = 'La confirmación no coincide con la nueva contraseña.';
      return;
    }

    this.error = '';
    // Aquí iría la llamada real al backend (POST /api/cambiar-password)
    console.log('✔️ Contraseña enviada para cambio:', this.form);
    alert('Contraseña actualizada correctamente');
  }
}
