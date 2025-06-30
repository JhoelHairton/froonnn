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
    logoUrl: 'https://turismo.capachica.pe/assets/logo.png',
    darkMode: false,
    titulo: 'Turismo Capachica',
    descripcion: 'Conecta turistas con experiencias culturales únicas en Capachica.',
    colorPrincipal: '#2d6a4f',
  };
}
