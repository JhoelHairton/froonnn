import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BannersComponent } from './banners.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('BannersComponent', () => {
  let component: BannersComponent;
  let fixture: ComponentFixture<BannersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BannersComponent],
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        FormsModule
      ],
      providers: [
        // Aquí pones tus servicios si el componente usa alguno
        // { provide: BannerService, useValue: mockBannerService }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA] // evita errores con componentes/etiquetas desconocidas
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BannersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
