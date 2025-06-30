import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet.heat';
import 'leaflet-routing-machine';

@Component({
  selector: 'app-mapa-heatmap',
  standalone: true,
  imports: [],
  templateUrl: './mapa-heatmap.component.html',
  styleUrl: './mapa-heatmap.component.css'
})
export class MapaHeatmapComponent implements OnInit {

  private map!: L.Map;

  ngOnInit(): void {
    this.initMap();
  }

  private initMap(): void {
    this.map = L.map('map').setView([-15.84, -69.92], 11);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map);

    // 🎯 Íconos base64
    const hospedajeIcon = L.icon({
      iconUrl: 'data:image/jpeg;base64,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',
      iconSize: [30, 30],
      iconAnchor: [15, 30],
      popupAnchor: [0, -30]
    });

    const gastronomiaIcon = L.icon({
      iconUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAeFBMVEUAAAD////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+3hdKAAAAMXRSTlMAAwcRCxtBQEInKzFThYSEhPf4/fTY1cK/rowD+0PbnItEdVuUjmxMzIgyEhYQoJA/IzMh9Njw8AAAABYktHRAnr3UzqAAAAv0lEQVQY053PSxLDMAwDUFugNjCiZvt/U8uFKH8AK4RfHezMUQz9Cbt8CSzqKrAb5VoZmc2LZHUF3C+1T5ZsPVv0V2rXJ9O8RrBuv9xLD8Z5UOZ7ozdXBIojkk9IpXkcmZgvRoI4TLHMCGGVhaRAEmzk8zSk5WxO2x4TSmQykhSaLug9ZClRLzLRVp+9Jky1B9VrAop+3WWpN7G5pgb5ZfO7K3QLJb6SwAAAABJRU5ErkJggg==',
      iconSize: [30, 30],
      iconAnchor: [15, 30],
      popupAnchor: [0, -30]
    });

    const aventuraIcon = L.icon({
      iconUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAbFBMVEUAAAD///////////////////////////////////////////////////+WAw/+///////1//f///P///T//f///v3///3+//n////////+/f//////v/7///T///z////4//T//P////z//f////v///7///n///3///3///3///7///v//v///v8a4zRUAAAALnRSTlMABAgODxITFBUZGiMhIyQlJi0vNDeGp6nCwsTIycrNz9XV1dbZ2tzf4OLk5ebq6+zxWynv0wAAAH9JREFUGNNVzlcSgjAQBuDIBMBRSJiZWZVR933/PxuIQDHJHe7AzIX3A2ngXo+jkqIEJGmm1d8UX1U3r9N7b3Sm+mbc07NBlZ4WyKhOHLvO1QaIKQOQzclZc8h08t2VxZjJueOxLGsp66qjPSkZIV7I5kP9Z2aeCK+BRNwAEUm2r8gAAAAASUVORK5CYII=',
      iconSize: [30, 30],
      iconAnchor: [15, 30],
      popupAnchor: [0, -30]
    });

    const iconos: any = {
      hospedaje: hospedajeIcon,
      gastronomia: gastronomiaIcon,
      aventura: aventuraIcon
    };

    const comunidades = [
      { nombre: 'Llachón', lat: -15.84, lng: -69.93, tipo_servicio: 'hospedaje' },
      { nombre: 'Ccotos', lat: -15.78, lng: -69.88, tipo_servicio: 'aventura' },
      { nombre: 'Chifrón', lat: -15.82, lng: -69.91, tipo_servicio: 'gastronomia' }
    ];

    comunidades.forEach(c => {
      L.marker([c.lat, c.lng], { icon: iconos[c.tipo_servicio] })
        .addTo(this.map)
        .bindTooltip(c.nombre, { permanent: false })
        .bindPopup(`<b>${c.nombre}</b><br>Servicio: ${c.tipo_servicio}<br><em>Haz clic para más info</em>`);
    });

    // 🔥 Heatmap
    const heat = (L as any).heatLayer([
      [-15.84, -69.93, 0.9],
      [-15.82, -69.91, 0.6],
      [-15.85, -69.90, 1.0]
    ], { radius: 25 }).addTo(this.map);

    // 🛣️ Rutas entre comunidades con colores
    const rutas = [
      [[-15.84, -69.93], [-15.78, -69.88]],
      [[-15.78, -69.88], [-15.82, -69.91]]
    ];

    const colores = ['blue', 'green', 'purple'];
    rutas.forEach((par, i) => {
      (L as any).Routing.control({
        waypoints: [
          L.latLng(par[0][0], par[0][1]),
          L.latLng(par[1][0], par[1][1])
        ],
        lineOptions: {
          styles: [{ color: colores[i % colores.length], weight: 4 }]
        },
        show: false,
        addWaypoints: false,
        draggableWaypoints: false,
        createMarker: () => null
      }).addTo(this.map);
    });
  }
}
