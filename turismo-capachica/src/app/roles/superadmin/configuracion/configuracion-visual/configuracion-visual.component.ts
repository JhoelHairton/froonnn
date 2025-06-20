import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-configuracion-visual',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './configuracion-visual.component.html',
  styleUrl: './configuracion-visual.component.css'
})
export class ConfiguracionVisualComponent {
visual = {
    carruselActivo: true,
    numeroSlides: 3,
    fondoEstilo: 'imagen', // opciones: imagen | color | video
    colorFondo: '#e5f5ec',
    estiloBoton: 'redondeado' // opciones: redondeado | cuadrado | sombra
  };
}
