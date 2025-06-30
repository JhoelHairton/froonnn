import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent {
  perfil = {
    nombre: 'Luis Pérez',
    correo: 'luis@gmail.com',
    telefono: '+51 987 654 321',
    nacionalidad: 'Perú',
    preferencia: 'Cultura',
    avatarUrl: 'https://i.pravatar.cc/100?img=5'
  };
}
