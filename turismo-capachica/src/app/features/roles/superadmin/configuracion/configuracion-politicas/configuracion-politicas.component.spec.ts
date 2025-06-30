import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfiguracionPoliticasComponent } from './configuracion-politicas.component';

describe('ConfiguracionPoliticasComponent', () => {
  let component: ConfiguracionPoliticasComponent;
  let fixture: ComponentFixture<ConfiguracionPoliticasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfiguracionPoliticasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConfiguracionPoliticasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
