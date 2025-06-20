import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MapaHeatmapComponent } from './mapa-heatmap/mapa-heatmap.component';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';
import { CommonModule } from '@angular/common';
import { HistorialReservaComponent } from './gestion-conflictos/historial/historial-reserva.component';
import { IntervenirReservaComponent } from './gestion-conflictos/intervenir/intervenir-reserva.component';
import { AdvertenciaModalComponent } from './gestion-conflictos/advertencia/advertencia-modal.component';
import { AlertasAutomatizadasComponent } from './alertas/alertas-automatizadas.component';
import { ReportesImpactoComponent } from './reportes/reportes-impacto.component';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    DashboardComponent,
    MapaHeatmapComponent,
    EstadisticasComponent,
    HistorialReservaComponent,
    IntervenirReservaComponent,
    AdvertenciaModalComponent,
    AlertasAutomatizadasComponent,
    ReportesImpactoComponent 
  ],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA], // ✅ AQUÍ está la clave
})
export class AdminDashboardComponent {
  mostrarModal = false;
}
