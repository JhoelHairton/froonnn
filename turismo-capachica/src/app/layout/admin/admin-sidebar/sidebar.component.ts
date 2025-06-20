import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA], // ✅ AQUÍ está la clave
  animations: [
    trigger('submenuAnimation', [
      transition(':enter', [
        style({ height: 0, opacity: 0 }),
        animate('200ms ease-out', style({ height: '*', opacity: 1 })),
      ]),
      transition(':leave', [
        animate('150ms ease-in', style({ height: 0, opacity: 0 })),
      ]),
    ]),
  ],

})
export class SidebarComponent {


  openedSubmenu: string | null = null;

  toggleSubmenu(menu: string): void {
    this.openedSubmenu = this.openedSubmenu === menu ? null : menu;
  }

  @Input() isExpanded: boolean = true; // 👈 habilita [isExpanded]

  @Output() toggleSidebar = new EventEmitter<void>();

  toggle() {
    this.toggleSidebar.emit();
  }




  @Input() isDarkMode: boolean = false;
  @Output() darkModeToggled = new EventEmitter<void>();

  toggleDarkMode(): void {
    this.darkModeToggled.emit(); // 🚫 no toques document.documentElement aquí
  }

}


