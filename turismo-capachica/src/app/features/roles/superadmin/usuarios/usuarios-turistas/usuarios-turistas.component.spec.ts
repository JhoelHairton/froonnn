import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariosTuristasComponent } from './usuarios-turistas.component';

describe('UsuariosTuristasComponent', () => {
  let component: UsuariosTuristasComponent;
  let fixture: ComponentFixture<UsuariosTuristasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsuariosTuristasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UsuariosTuristasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
