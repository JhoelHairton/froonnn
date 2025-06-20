import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfiguracionVisualComponent } from './configuracion-visual.component';

describe('ConfiguracionVisualComponent', () => {
  let component: ConfiguracionVisualComponent;
  let fixture: ComponentFixture<ConfiguracionVisualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfiguracionVisualComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConfiguracionVisualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
