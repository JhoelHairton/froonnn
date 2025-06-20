import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TuristaLayoutComponent } from './turista-layout.component';

describe('TuristaLayoutComponent', () => {
  let component: TuristaLayoutComponent;
  let fixture: ComponentFixture<TuristaLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TuristaLayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TuristaLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
