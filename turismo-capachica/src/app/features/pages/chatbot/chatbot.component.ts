import { Component, signal } from '@angular/core';
import { ChatbotService } from '../../../core/services/chatbot.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [  CommonModule,
    FormsModule,
    HttpClientModule],
  templateUrl: './chatbot.component.html',
  styleUrl: './chatbot.component.css'
})
export class ChatbotComponent {

 showChat = signal(false);
  messages = signal<{ sender: string, text: string }[]>([]);
  userInput = '';

  constructor(private chatService: ChatbotService) {}

  toggleChat() {
    this.showChat.update(v => !v);
  }

  async sendMessage() {
    const message = this.userInput.trim();
    if (!message) return;

    this.messages.update(msgs => [...msgs, { sender: 'user', text: message }]);
    this.userInput = '';

    try {
  const res = await this.chatService.askChatGPT(message).toPromise();
  const reply = res?.text ?? '🤖 No se obtuvo respuesta válida.';
  this.messages.update(msgs => [...msgs, { sender: 'bot', text: reply }]);
} catch (err) {
      this.messages.update(msgs => [...msgs, { sender: 'bot', text: 'Error al conectar con ChatGPT.' }]);
    }
  }
}
