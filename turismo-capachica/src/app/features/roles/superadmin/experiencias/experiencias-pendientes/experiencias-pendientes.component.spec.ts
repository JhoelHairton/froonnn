import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperienciasPendientesComponent } from './experiencias-pendientes.component';

describe('ExperienciasPendientesComponent', () => {
  let component: ExperienciasPendientesComponent;
  let fixture: ComponentFixture<ExperienciasPendientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExperienciasPendientesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExperienciasPendientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
