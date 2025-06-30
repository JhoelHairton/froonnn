import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-intervenir-reserva',
  standalone: true,
  imports: [],
  templateUrl: './intervenir-reserva.component.html',
  styleUrl: './intervenir-reserva.component.css'
})
export class IntervenirReservaComponent {
  @Output() onAdvertencia = new EventEmitter<void>();

  cambiarEstado(nuevoEstado: string) {
    alert(`✅ Estado cambiado a: ${nuevoEstado}`);
  }

  enviarAdvertencia() {
    this.onAdvertencia.emit();
  }
}
