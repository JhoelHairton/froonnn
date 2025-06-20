import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntervenirReservaComponent } from './intervenir-reserva.component';

describe('IntervenirReservaComponent', () => {
  let component: IntervenirReservaComponent;
  let fixture: ComponentFixture<IntervenirReservaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IntervenirReservaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IntervenirReservaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
