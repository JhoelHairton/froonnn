// src/app/services/service-creation.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Servicio {
  id: number;
  company_id: number;
  category_id: number;
  location_id: number;

  title: string;
  slug: string;
  type: string;
  description: string;
  location: string;

  price: string;
  capacity: number;
  duration: string;
  policy_cancellation: string | null;

  status: string;
  published_at: string;
  created_at: string;
  updated_at: string;

  media: { id: number; url: string }[];

  // relaciones anidadas
  category: { id: number; name: string; description: string; status: string; };
  zone:     { id: number; name: string; /* …otros campos… */ };
}

@Injectable({ providedIn: 'root' })
export class ServiceCreationService {
  private base = 'http://localhost:8000/api/emprendedor/servicios';

  constructor(private http: HttpClient) {}

  getServicios(): Observable<Servicio[]> {
    return this.http.get<Servicio[]>(this.base);
  }

  getServicio(id: number): Observable<Servicio> {
    return this.http.get<Servicio>(`${this.base}/${id}`);
  }

  createServicio(fd: FormData): Observable<{ message: string; service: Servicio }> {
    return this.http.post<{ message: string; service: Servicio }>(this.base, fd);
  }

  updateServicioFields(
    id: number,
    // <-- quitamos 'location' del Omit, para que data pueda incluirlo
    data: Partial<Omit<Servicio, 'id' | 'media' | 'category' | 'zone'>>
  ): Observable<{ message: string; service: Servicio }> {
    return this.http.patch<{ message: string; service: Servicio }>(
      `${this.base}/${id}`,
      data,
      { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
    );
  }


  uploadMedia(id: number, files: File[]): Observable<{ message: string; media: any[] }> {
    const fd = new FormData();
    files.forEach(f => fd.append('photos[]', f));
    return this.http.post<{ message: string; media: any[] }>(
      `${this.base}/${id}/media`,
      fd
    );
  }

  deleteMedia(serviceId: number, mediaId: number): Observable<void> {
    return this.http.delete<void>(`${this.base}/${serviceId}/media/${mediaId}`);
  }

  deleteServicio(id: number): Observable<void> {
    return this.http.delete<void>(`${this.base}/${id}`);
  }

  toggleActive(id: number): Observable<{ status: string }> {
    return this.http.patch<{ status: string }>(
      `${this.base}/${id}/toggle-active`,
      {}
    );
  }
}
