import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-advertencia-modal',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './advertencia-modal.component.html',
  styleUrl: './advertencia-modal.component.css'
})
export class AdvertenciaModalComponent {
  @Input() mostrar = false;
  @Output() cerrar = new EventEmitter<void>();
  advertenciaTexto = '';

  enviar() {
    alert(`🚨 Advertencia enviada: ${this.advertenciaTexto}`);
    this.advertenciaTexto = '';
    this.cerrar.emit();
  }
}
