import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css',
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
  
})
export class PerfilComponent {
  empresa = {
    business_name: 'Turismo Capachica',
    trade_name: 'Capachica Tours',
    service_type: 'turismo vivencial',
    contact_email: 'info@capachicatours.com',
    phone: '+51 987654321',
    website: 'https://capachicatours.com',
    description: 'Empresa dedicada a brindar experiencias culturales en la región de Puno.',
    location: 'Capachica, Puno',
    facebook: 'https://facebook.com/capachicatours',
    instagram: 'https://instagram.com/capachicatours'
  };

  editando = false;

  guardarCambios() {
    this.editando = false;
    // Aquí puedes simular guardado o enviar a la API real
    console.log('Perfil actualizado:', this.empresa);
  }
}
