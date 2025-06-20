import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-reportes-trafico',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reportes-trafico.component.html',
  styleUrl: './reportes-trafico.component.css'
})
export class ReportesTraficoComponent {
  visitasHoy = 123;
  visitasMes = 3240;
  usuariosActivos = 18;
  paginaMasVisitada = '/explorar/experiencias';

  visitasPorDia = [
    { fecha: '2025-05-01', cantidad: 210 },
    { fecha: '2025-05-02', cantidad: 180 },
    { fecha: '2025-05-03', cantidad: 240 },
    { fecha: '2025-05-04', cantidad: 150 },
    { fecha: '2025-05-05', cantidad: 300 },
  ];
}
