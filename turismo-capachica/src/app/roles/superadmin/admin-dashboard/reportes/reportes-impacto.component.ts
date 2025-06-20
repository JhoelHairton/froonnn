import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-reportes-impacto',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reportes-impacto.component.html',
  styleUrl: './reportes-impacto.component.css'
})
export class ReportesImpactoComponent {
comunidades = [
    { nombre: 'Llachón', visitas: 1200, reservas: 340, comentarios: 125 },
    { nombre: 'Ccotos', visitas: 860, reservas: 210, comentarios: 85 },
    { nombre: 'Chifrón', visitas: 540, reservas: 150, comentarios: 60 },
  ];

  exportar(tipo: string) {
    alert(`Exportando reporte como ${tipo.toUpperCase()}...`);
    // Aquí iría FileSaver o lógica real
  }
}
