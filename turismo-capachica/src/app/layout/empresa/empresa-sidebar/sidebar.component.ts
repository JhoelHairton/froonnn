import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
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
