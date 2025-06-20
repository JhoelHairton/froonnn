import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportesImpactoComponent } from './reportes-impacto.component';

describe('ReportesImpactoComponent', () => {
  let component: ReportesImpactoComponent;
  let fixture: ComponentFixture<ReportesImpactoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportesImpactoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReportesImpactoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
