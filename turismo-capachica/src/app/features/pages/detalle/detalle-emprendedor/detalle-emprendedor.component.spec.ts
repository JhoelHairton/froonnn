import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleEmprendedorComponent } from './detalle-emprendedor.component';

describe('DetalleEmprendedorComponent', () => {
  let component: DetalleEmprendedorComponent;
  let fixture: ComponentFixture<DetalleEmprendedorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalleEmprendedorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetalleEmprendedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
