import { CommonModule, NgClass, NgFor, NgIf } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { Promotion, PromotionService } from '../../../../core/services/emprendedor/promotion.service'; 
import { ServiceCreationService } from '../../../../core/services/emprendedor/service-creation.service';

@Component({
  selector: 'app-paquetes',
  standalone: true,
  imports: [ReactiveFormsModule, NgFor, NgIf, NgClass],
  templateUrl: './paquetes.component.html',
  styleUrls: ['./paquetes.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PaquetesComponent implements OnInit {
  promociones: Promotion[] = [];
  servicios:   { id: number; title: string }[] = [];

  form: FormGroup;
  showModal   = false;
  isEditing   = false;
  editingId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private promoSvc: PromotionService,
    private servSvc: ServiceCreationService
  ) {
    this.form = this.fb.group({
      title:               ['', Validators.required],
      description:         ['', Validators.required],
      discount_percentage: [0, [Validators.required, Validators.min(1), Validators.max(100)]],
      start_date:          ['', Validators.required],
      end_date:            ['', Validators.required],
      status:              ['active', Validators.required],
      service_ids:         [[], Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadServicios();
    this.loadPromociones();
  }

  private loadServicios() {
    this.servSvc.getServicios().subscribe({
      next: list => this.servicios = list,
      error: ()   => Swal.fire('Error', 'No se cargaron servicios', 'error')
    });
  }

  private loadPromociones() {
    this.promoSvc.list().subscribe({
      next: list => this.promociones = list,
      error: ()   => Swal.fire('Error', 'No se cargaron promociones', 'error')
    });
  }

  /** ● Número de promocio­nes activas */
  get activePromosCount(): number {
    return this.promociones.filter(p => p.status === 'active').length;
  }

  /** ● Número de promocio­nes inactivas */
  get inactivePromosCount(): number {
    return this.promociones.filter(p => p.status === 'inactive').length;
  }

  openCreate() {
    this.isEditing   = false;
    this.editingId   = null;
    this.form.reset({
      title:               '',
      description:         '',
      discount_percentage: 0,
      start_date:          '',
      end_date:            '',
      status:              'active',
      service_ids:         []
    });
    this.showModal = true;
  }

  openEdit(p: Promotion) {
    this.isEditing   = true;
    this.editingId   = p.id!;
    this.form.patchValue({
      title:               p.title,
      description:         p.description,
      discount_percentage: p.discount_percentage,
      start_date:          p.start_date,
      end_date:            p.end_date,
      status:              p.status,
      service_ids:         p.service_ids
    });
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  submit() {
    if (this.form.invalid) return;
    const v: Omit<Promotion, 'id' | 'services'> = this.form.value;

    const action$ = this.isEditing
      ? this.promoSvc.update(this.editingId!, v)
      : this.promoSvc.create(v);

    action$.subscribe({
      next: () => {
        this.loadPromociones();
        this.closeModal();
        Swal.fire('¡Éxito!', this.isEditing ? 'Promoción actualizada' : 'Promoción creada', 'success');
      },
      error: () => Swal.fire('Error', 'No se pudo guardar la promoción', 'error')
    });
  }

  delete(p: Promotion) {
    Swal.fire({
      icon: 'warning',
      title: `¿Eliminar "${p.title}"?`,
      showCancelButton: true
    }).then(res => {
      if (res.isConfirmed) {
        this.promoSvc.delete(p.id!).subscribe(() => {
          this.loadPromociones();
          Swal.fire('Eliminado', '', 'success');
        });
      }
    });
  }

  /** ● Para mostrar títulos de servicios en la plantilla */
  getServiceTitles(p: Promotion): string {
    return p.services?.map(s => s.title).join(', ') ?? '';
  }
   /** Porcentaje de promociones inactivas redondeado */
  get inactivePercentage(): number {
    const total = this.activePromosCount + this.inactivePromosCount;
    return total > 0
      ? Math.round((this.inactivePromosCount / total) * 100)
      : 0;
  }

  

  /** Porcentaje de promociones activas redondeado */
  get activePercentage(): number {
    const total = this.activePromosCount + this.inactivePromosCount;
    return total > 0
      ? Math.round((this.activePromosCount / total) * 100)
      : 0;
  }
}
