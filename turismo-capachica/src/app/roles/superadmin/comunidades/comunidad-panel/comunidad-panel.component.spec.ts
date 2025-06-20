import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComunidadPanelComponent } from './comunidad-panel.component';

describe('ComunidadPanelComponent', () => {
  let component: ComunidadPanelComponent;
  let fixture: ComponentFixture<ComunidadPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComunidadPanelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ComunidadPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
