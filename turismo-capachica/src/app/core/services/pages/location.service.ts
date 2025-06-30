import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../../../environments/environment';  

@Injectable({ providedIn: 'root' })
export class LocationService {

  private api = `${environment.apiUrl}/locations`; 
  constructor(private http: HttpClient) {}

  getEmpresaByLocationId(locationId: number, companyId: number): Observable<any> {
    return this.http.get<any>(`${this.api}/${locationId}`).pipe(
      map(location => {
        const empresa = location.companies.find((c: any) => c.id === companyId);
        if (!empresa) {
          throw new Error('Empresa no encontrada en la comunidad');
        }
        return { empresa, location };
      })
    );
  }
}
