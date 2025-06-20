import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { EmpresasService } from '../services/empresas.service';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-empresas',
  standalone: true,
  imports: [CommonModule,
    HttpClientModule,
    RouterModule,
    NgIf,
    NgFor,
    FormsModule],
  templateUrl: './empresas.component.html',
  styleUrl: './empresas.component.css'
})
export class EmpresasComponent implements OnInit  {

  estadoSeleccionado: string = 'todas'; // 'todas', 'pendiente', 'aprobada', 'rechazada'
  empresas: any[] = [];
  isLoading = false;
  mostrarSoloPendientes = false;
  todasEmpresas: any[] = []; // 🔁 Guardar copia original

  constructor(private empresaService: EmpresasService) {}

  ngOnInit(): void {
    this.filtrarEmpresas();
  }

  filtrarEmpresas() {
    this.isLoading = true;
  
    if (this.estadoSeleccionado === 'pendiente') {
      this.empresaService.getEmpresasPendientes().subscribe({
        next: (data) => {
          this.empresas = data;
          this.isLoading = false;
        },
        error: () => {
          Swal.fire('Error', 'No se pudieron cargar las empresas pendientes.', 'error');
          this.isLoading = false;
        }
      });
    } else {
      this.empresaService.getTodasEmpresas().subscribe({
        next: (data) => {
          if (this.estadoSeleccionado === 'todas') {
            this.empresas = data;
          } else {
            this.empresas = data.filter(e => e.status === this.estadoSeleccionado);
          }
          this.isLoading = false;
        },
        error: () => {
          Swal.fire('Error', 'No se pudieron cargar las empresas.', 'error');
          this.isLoading = false;
        }
      });
    }
  }
  

  aprobar(id: number) {
    Swal.fire({
      title: '¿Aprobar empresa?',
      text: 'Esta acción aprobará permanentemente la empresa.',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, aprobar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.empresaService.aprobarEmpresa(id).subscribe(() => {
          Swal.fire('Aprobada', 'La empresa fue aprobada exitosamente.', 'success');
          this.filtrarEmpresas();        });
      }
    });
  }

  rechazar(id: number) {
    Swal.fire({
      title: '¿Rechazar empresa?',
      text: '¿Estás seguro que deseas rechazar esta empresa?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, rechazar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.empresaService.rechazarEmpresa(id).subscribe(() => {
          Swal.fire('Rechazada', 'La empresa fue marcada como rechazada.', 'info');
          this.filtrarEmpresas();        });
      }
    });
  }

  verDetalle(empresa: any) {
    Swal.fire({
      title: `<div style="font-weight: 700; font-size: 1.5rem; color: #333;">${empresa.business_name}</div>`,
      html: `
        <div style="display:flex; justify-content:center; margin-bottom: 1rem;">
          <img src="${empresa.logo_url}" alt="Logo de empresa" style="width: 100px; height: 100px; object-fit: cover; border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.2);">
        </div>
  
        <div style="text-align:left; font-size: 15px; color: #444; line-height: 1.6">
          <b>RUC:</b> ${empresa.ruc}<br>
          <b>Nombre comercial:</b> ${empresa.trade_name}<br>
          <b>Servicio:</b> ${empresa.service_type}<br>
          <b>Email:</b> ${empresa.contact_email}<br>
          <b>Teléfono:</b> ${empresa.phone}<br>
          <b>Descripción:</b> ${empresa.description}<br>
          <b>Website:</b> <a href="${empresa.website}" target="_blank" style="color:#2563eb; text-decoration:underline;">${empresa.website}</a>
        </div>
      `,
      showCloseButton: true,
      confirmButtonText: 'Cerrar',
      confirmButtonColor: '#6366f1',
      background: '#fff',
      width: '40rem',
      padding: '2rem',
      customClass: {
        popup: 'rounded-xl shadow-2xl',
      },
    });
  }
  
  
}
