import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';


@Injectable({ providedIn: 'root' })
export class ChatbotService {
    private apiUrl = `${environment.apiUrl}/chatgpt`; // Ajusta según tu backend

  constructor(private http: HttpClient) {}

  askChatGPT(message: string) {
    return this.http.post<{ text: string }>(this.apiUrl, { message });
  }
}
