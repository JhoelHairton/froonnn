import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LangService {

  private API = 'http://127.0.0.1:8000/api/proxy/lang'; // Laravel proxy

  constructor(private http: HttpClient) {}

  getLanguages(): Observable<any> {
    return this.http.get<any>(this.API);
  }
}
