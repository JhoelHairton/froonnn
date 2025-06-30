import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './empresa-sidebar/sidebar.component';
import { NavbarComponent } from './empresa-navbar/navbar.component';

@Component({
  selector: 'app-empresa-layout',
  standalone: true,
  imports: [CommonModule,  RouterOutlet,
      SidebarComponent,
      NavbarComponent],
  templateUrl: './empresa-layout.component.html',
  styleUrl: './empresa-layout.component.css'
})
export class EmpresaLayoutComponent {
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
