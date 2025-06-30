import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-unauthorized',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="min-h-screen flex items-center justify-center bg-red-50 p-6 text-center">
      <div>
        <h1 class="text-4xl font-bold text-red-600 mb-4">⛔ Acceso denegado</h1>
        <p class="text-gray-700 mb-6">No tienes permisos para acceder a esta ruta.</p>
        <a routerLink="/" class="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition">
          Volver al inicio
        </a>
      </div>
    </div>
  `,
})
export class UnauthorizedComponent {}
