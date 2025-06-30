import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class LangService {

    private API = `${environment.apiUrl}/proxy/lang`; 

  constructor(private http: HttpClient) {}

  getLanguages(): Observable<any> {
    return this.http.get<any>(this.API);
  }
}
