import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-configuracion',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './configuracion.component.html',
  styleUrl: './configuracion.component.css',
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
  
})
export class ConfiguracionComponent {

    config = {
    idioma: 'es',
    notificaciones: true,
    metodo_pago: 'transferencia',
    politica_cancelacion: 'Cancelación gratuita hasta 24h antes.',
    mostrar_perfil: true,
  };

  idiomasDisponibles = [
    { value: 'es', label: 'Español' },
    { value: 'en', label: 'English' },
  ];

  metodosPago = [
    { value: 'tarjeta', label: 'Tarjeta de Crédito' },
    { value: 'transferencia', label: 'Transferencia Bancaria' },
    { value: 'efectivo', label: 'Pago en Efectivo' },
  ];

  guardar() {
    console.log('Configuración guardada:', this.config);
    alert('✅ Configuración actualizada.');
  }
}
