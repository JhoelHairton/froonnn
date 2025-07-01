import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AgendaService } from '../../../../core/services/emprendedor/agenda.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-agenda',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css']
})
export class AgendaComponent implements OnInit {
  
  servicioId = 1; // Este es el ID del servicio, cámbialo según tu lógica
  occupiedDates: string[] = [];
  personalEvents: any[] = [];

  showModal = false;
  isEditing = false;
  editingId: number | null = null;
  form: FormGroup;

  constructor(
    private agendaSvc: AgendaService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      start_time: ['', Validators.required],
      end_time: ['', Validators.required],
      status: ['pendiente']
    });
  }

  ngOnInit(): void {
    this.loadOccupiedDates();
    this.loadPersonalEvents();
  }

  loadOccupiedDates() {
    this.agendaSvc.getOccupiedDates(this.servicioId).subscribe({
      next: dates => this.occupiedDates = dates,
      error: () => Swal.fire('Error', 'No se pudieron cargar las fechas ocupadas', 'error')
    });
  }

  loadPersonalEvents() {
    this.agendaSvc.listPersonalEvents().subscribe({
      next: events => this.personalEvents = events,
      error: () => Swal.fire('Error', 'No se pudieron cargar los eventos', 'error')
    });
  }

  openCreate() {
    this.isEditing = false;
    this.editingId = null;
    this.form.reset({ status: 'pendiente' });
    this.showModal = true;
  }

  openEdit(event: any) {
    this.isEditing = true;
    this.editingId = event.id;
    this.form.patchValue({
      title: event.title,
      description: event.description,
      start_time: event.start_time,
      end_time: event.end_time,
      status: event.status
    });
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  submit() {
    if (this.form.invalid) return;

    const data = this.form.value;

    if (this.isEditing && this.editingId) {
      this.agendaSvc.updatePersonalEvent(this.editingId, data).subscribe({
        next: () => {
          this.loadPersonalEvents();
          this.showModal = false;
          Swal.fire('Actualizado', 'Evento modificado correctamente', 'success');
        },
        error: () => Swal.fire('Error', 'No se pudo actualizar', 'error')
      });
    } else {
      this.agendaSvc.createPersonalEvent(data).subscribe({
        next: () => {
          this.loadPersonalEvents();
          this.showModal = false;
          Swal.fire('Creado', 'Evento registrado correctamente', 'success');
        },
        error: () => Swal.fire('Error', 'No se pudo crear', 'error')
      });
    }
  }

  deleteEvent(id: number) {
    Swal.fire({
      icon: 'warning',
      title: '¿Eliminar este evento?',
      showCancelButton: true
    }).then(res => {
      if (res.isConfirmed) {
        this.agendaSvc.deletePersonalEvent(id).subscribe({
          next: () => {
            this.personalEvents = this.personalEvents.filter(e => e.id !== id);
            Swal.fire('Eliminado', 'Evento eliminado', 'success');
          },
          error: () => Swal.fire('Error', 'No se pudo eliminar', 'error')
        });
      }
    });
  }
}