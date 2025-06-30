import { NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './contacto.component.html',
  styleUrl: './contacto.component.css'
})
export class ContactoComponent {

  form: FormGroup;
  experienciaId = '';
  experienciaNombre = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
  ) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      fecha: ['', Validators.required],
      cantidad: [1, [Validators.required, Validators.min(1)]],
      comentarios: [''],
      terminos: [false, Validators.requiredTrue]
    });
  }

  ngOnInit(): void {

    const experienciaId = this.route.snapshot.paramMap.get('experienciaId');
    console.log('Reservando experiencia:', experienciaId);
    this.experienciaId = this.route.snapshot.paramMap.get('experienciaId') ?? '';
    // Mapear experienciaId a nombre visible (puedes hacerlo desde API también)
    const nombres = {
      pesca: 'Pesca tradicional',
      danzas: 'Danzas andinas',
      tejidos: 'Tejidos artesanales'
    };
    this.experienciaNombre = nombres[this.experienciaId as keyof typeof nombres] || 'Experiencia';
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const reserva = {
      experiencia: this.experienciaId,
      ...this.form.value
    };

    this.http.post('/api/reservas', reserva).subscribe({
      next: () => this.router.navigate(['/reserva-confirmada']),
      error: (err) => alert('Error al registrar reserva: ' + err.message)
    });
  }
}
