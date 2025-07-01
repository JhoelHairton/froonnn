import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TuristaLayoutComponent } from './turista-layout.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SidebarComponent } from './turista-sidebar/sidebar.component';
import { NavbarComponent } from './turista-navbar/navbar.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('TuristaLayoutComponent', () => {
  let component: TuristaLayoutComponent;
  let fixture: ComponentFixture<TuristaLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TuristaLayoutComponent,
        SidebarComponent,
        NavbarComponent,
        HttpClientTestingModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA], // ⚠️ importante por si hay tags personalizados
    }).compileComponents();

    fixture = TestBed.createComponent(TuristaLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
