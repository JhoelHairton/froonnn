import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { HeroService } from '../../services/hero.service';

@Component({
  selector: 'app-banners',
  standalone: true,
  templateUrl: './banners.component.html',
  styleUrls: ['./banners.component.css'],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, DragDropModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class BannersComponent implements OnInit {
  heroForm!: FormGroup;
  portalId = 1;
  selectedFile: File | null = null;

  constructor(private fb: FormBuilder, private heroService: HeroService) {}

  ngOnInit(): void {
    this.heroForm = this.fb.group({
      hero_title: [''],
      hero_subtitle: [''],
      cta_text: [''],
      cta_link: ['']
    });

    this.heroService.getHero(this.portalId).subscribe({
      next: (data: any) => this.heroForm.patchValue(data),
      error: (err) => console.error('Error cargando hero:', err)
    });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  guardar(): void {
    const formData = new FormData();



    formData.append('hero_title', this.heroForm.get('hero_title')?.value || '');
    formData.append('hero_subtitle', this.heroForm.get('hero_subtitle')?.value || '');
    formData.append('cta_text', this.heroForm.get('cta_text')?.value || '');
    formData.append('cta_link', this.heroForm.get('cta_link')?.value || '');

    this.heroService.updateHero(this.portalId, formData).subscribe({
      next: () => alert('Hero actualizado correctamente ✅'),
      error: (err) => alert('Error al actualizar: ' + err.message)
    });
  }
}
