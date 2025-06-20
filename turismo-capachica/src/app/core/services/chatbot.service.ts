import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ChatbotService {
  private apiUrl = 'http://localhost:8000/api/chatgpt'; // Ajusta según tu backend

  constructor(private http: HttpClient) {}

  askChatGPT(message: string) {
    return this.http.post<{ text: string }>(this.apiUrl, { message });
  }
}
