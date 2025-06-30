import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AuthService } from '../../../../core/services/auth.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule,
    RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA], // ✅ AQUÍ está la clave

})
export class NavbarComponent {

  user: any = null;

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    const u = localStorage.getItem('user');
    this.user = u ? JSON.parse(u) : null;
  }

  @Input() isDarkMode: boolean = false;
  @Output() darkModeToggled = new EventEmitter<void>();

  toggleDarkMode(): void {
    this.darkModeToggled.emit(); // 🚫 no toques document.documentElement aquí
  }


  logout(): void {
    Swal.fire({
      title: '¿Deseas cerrar sesión?',
      text: 'Tu sesión actual se cerrará.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, cerrar sesión',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.auth.logout();
      }
    });
  }
}
