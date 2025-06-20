import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapaHeatmapComponent } from './mapa-heatmap.component';

describe('MapaHeatmapComponent', () => {
  let component: MapaHeatmapComponent;
  let fixture: ComponentFixture<MapaHeatmapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MapaHeatmapComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MapaHeatmapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
