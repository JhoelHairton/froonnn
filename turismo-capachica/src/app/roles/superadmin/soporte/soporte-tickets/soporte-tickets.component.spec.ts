import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoporteTicketsComponent } from './soporte-tickets.component';

describe('SoporteTicketsComponent', () => {
  let component: SoporteTicketsComponent;
  let fixture: ComponentFixture<SoporteTicketsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SoporteTicketsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SoporteTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
