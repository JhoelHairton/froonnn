import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-configuracion-politicas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './configuracion-politicas.component.html',
  styleUrl: './configuracion-politicas.component.css'
})
export class ConfiguracionPoliticasComponent {

  politicas = {
    terminos: `Al usar este sistema, usted acepta nuestras condiciones de uso, incluyendo el respeto a las comunidades turísticas, cumplimiento de las normativas locales y uso adecuado de los servicios contratados.`,
    
    privacidad: `Sus datos serán tratados con confidencialidad. No compartimos información personal con terceros, salvo por requerimiento legal o para prestar los servicios contratados.`,
    
    cancelacion: `Las reservas pueden cancelarse sin penalidad hasta 48 horas antes de la fecha programada. Cancelaciones tardías no serán reembolsadas.`
  };
}
