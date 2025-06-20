import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportesTraficoComponent } from './reportes-trafico.component';

describe('ReportesTraficoComponent', () => {
  let component: ReportesTraficoComponent;
  let fixture: ComponentFixture<ReportesTraficoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportesTraficoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReportesTraficoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
