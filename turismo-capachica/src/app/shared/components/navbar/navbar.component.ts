import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA], // ✅ AQUÍ está la clave
  
})
export class NavbarComponent {
  
    isMenuOpen = false;
  menuAbierto = false;
isScrolled = false;

@HostListener('window:scroll', [])
onWindowScroll() {
  this.isScrolled = window.scrollY > 2;
}
  

}
