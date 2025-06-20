import { Component } from '@angular/core';
import { ChartData, ChartOptions, ChartType } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';

@Component({
  selector: 'app-estadisticas',
  standalone: true,
  imports: [NgChartsModule],
  templateUrl: './estadisticas.component.html',
  styleUrl: './estadisticas.component.css'
})
export class EstadisticasComponent {
  barChartOptions: ChartOptions = {
    responsive: true
  };

  barChartLabels: string[] = ['Llachón', 'Chifrón', 'Ccotos', 'Tikonata'];
  barChartType: ChartType = 'bar';

  barChartData: ChartData<'bar'> = {
    labels: this.barChartLabels,
    datasets: [
      { data: [45, 28, 32, 12], label: 'Reservas' },
      { data: [20, 15, 22, 10], label: 'Turistas' },
    ]
  };
}
