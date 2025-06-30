import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
totalReservas = 120;
  totalEmpresas = 35;
  totalTuristas = 480;
  conflictosAbiertos = 4;
}
