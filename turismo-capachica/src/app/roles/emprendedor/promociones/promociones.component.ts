import { CommonModule, NgClass, NgFor, NgIf } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Promotion, PromotionService } from '../services/promotion.service';

import Swal from 'sweetalert2';
import { ServiceCreationService, Servicio } from '../services/service-creation.service';

interface Promocion {
  id: number;
  titulo: string;
  descripcion: string;
  descuento: number;
  inicio: string;
  fin: string;
}
@Component({
  selector: 'app-promociones',
  standalone: true,
  imports: [],
  templateUrl: './promociones.component.html',
  styleUrl: './promociones.component.css',
    schemas: [CUSTOM_ELEMENTS_SCHEMA], // ✅ AQUÍ está la clave
  
})
export class PromocionesComponent {

  
}
