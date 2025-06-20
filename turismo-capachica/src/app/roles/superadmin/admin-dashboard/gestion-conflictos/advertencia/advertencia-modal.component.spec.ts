import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertenciaModalComponent } from './advertencia-modal.component';

describe('AdvertenciaModalComponent', () => {
  let component: AdvertenciaModalComponent;
  let fixture: ComponentFixture<AdvertenciaModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdvertenciaModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdvertenciaModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
