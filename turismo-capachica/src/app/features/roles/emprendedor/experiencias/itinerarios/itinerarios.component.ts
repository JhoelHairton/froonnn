import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ItinerarioService } from '../../../../../core/services/emprendedor/itinerario.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-itinerarios',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './itinerarios.component.html',
  styleUrl: './itinerarios.component.css'
})
export class ItinerariosComponent implements OnInit {

   itinerarios: any[] = [];
  itinerarioForm: FormGroup;
  servicioId!: number;
  cargando = false;

  constructor(
    private fb: FormBuilder,
    private itinerarioSvc: ItinerarioService,
    private route: ActivatedRoute
  ) {
    this.itinerarioForm = this.fb.group({
      day_number: [1, [Validators.required, Validators.min(1)]],
      start_time: ['', Validators.required],
      end_time: ['', Validators.required],
      title: ['', Validators.required],
      description: ['']
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.servicioId = +params['id'];
      this.listarItinerarios();
    });
  }

  listarItinerarios(): void {
    this.cargando = true;
    this.itinerarioSvc.listar().subscribe({
      next: res => {
        this.itinerarios = res.filter((i: any) => i.itineraryable_id === this.servicioId);
        this.cargando = false;
      },
      error: err => {
        console.error('Error cargando itinerarios', err);
        this.cargando = false;
      }
    });
  }

  guardar(): void {
    if (this.itinerarioForm.valid) {
      const data = {
        ...this.itinerarioForm.value,
        itineraryable_type: 'App\\Models\\Service',
        itineraryable_id: this.servicioId
      };
      this.itinerarioSvc.crear(data).subscribe({
        next: () => {
          this.listarItinerarios();
          this.itinerarioForm.reset({ day_number: 1 });
        },
        error: err => console.error('Error creando itinerario', err)
      });
    }
  }

}
