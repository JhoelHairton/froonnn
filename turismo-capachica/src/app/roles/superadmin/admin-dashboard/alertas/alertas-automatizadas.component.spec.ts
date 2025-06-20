import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertasAutomatizadasComponent } from './alertas-automatizadas.component';

describe('AlertasAutomatizadasComponent', () => {
  let component: AlertasAutomatizadasComponent;
  let fixture: ComponentFixture<AlertasAutomatizadasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlertasAutomatizadasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AlertasAutomatizadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
