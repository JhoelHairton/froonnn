import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './admin-sidebar/sidebar.component';
import { NavbarComponent } from './admin-navbar/navbar.component';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [ CommonModule,
    RouterOutlet,
    SidebarComponent,
    NavbarComponent],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.css'
})
export class AdminLayoutComponent {
  isExpanded: boolean = true;
  isDarkMode = false;


toggleSidebar() {
  this.isExpanded = !this.isExpanded;
}


toggleDarkMode(): void {
  this.isDarkMode = !this.isDarkMode;

  const root = document.documentElement;
  root.classList.toggle('dark', this.isDarkMode);
  localStorage.setItem('isDarkMode', String(this.isDarkMode));
}

ngOnInit(): void {
  const savedMode = localStorage.getItem('isDarkMode');
  this.isDarkMode = savedMode === 'true';
  if (this.isDarkMode) {
    document.documentElement.classList.add('dark');
  }
}


}
