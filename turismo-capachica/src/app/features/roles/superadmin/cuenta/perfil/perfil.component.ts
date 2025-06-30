// perfil.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-perfil',
  imports: [CommonModule, FormsModule],
  templateUrl: './perfil.component.html',
})
export class PerfilComponent {
  perfil = {
    nombre: 'Admin Capachica',
    correo: 'admin@capachica.gob.pe',
    telefono: '+51 912 345 678',
    avatarUrl: 'https://i.pravatar.cc/100?img=12'
  };
}
