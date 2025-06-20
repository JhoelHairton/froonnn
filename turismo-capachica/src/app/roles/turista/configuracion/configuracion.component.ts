import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-configuracion',
  standalone: true,
    imports: [CommonModule, FormsModule],
  templateUrl: './configuracion.component.html',
  styleUrl: './configuracion.component.css'
})
export class ConfiguracionComponent {
config = {
    idioma: 'es',
    notificacionEmail: true,
    notificacionApp: true,
    recomendaciones: true,
  };

  guardarConfiguracion() {
    alert('✅ Configuración actualizada correctamente.');
    console.log('Configuración actual:', this.config);
  }

}
