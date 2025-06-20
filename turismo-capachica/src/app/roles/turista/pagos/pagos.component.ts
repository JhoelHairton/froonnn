// pagos.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-metodos-pago',
  imports: [CommonModule, FormsModule],
  templateUrl: './pagos.component.html',
})
export class PagosComponent {
  tarjetas = [
    {
      ultimos4: '4242',
      tipo: 'Visa',
      vencimiento: '12/26',
    },
    {
      ultimos4: '1111',
      tipo: 'MasterCard',
      vencimiento: '08/25',
    }
  ];

  nueva = {
    numero: '',
    titular: '',
    vencimiento: '',
    cvv: ''
  };

  guardarTarjeta() {
    const ultimos4 = this.nueva.numero.slice(-4);
    const tipo = this.nueva.numero.startsWith('4') ? 'Visa' : 'MasterCard';
    this.tarjetas.push({
      ultimos4,
      tipo,
      vencimiento: this.nueva.vencimiento
    });
    this.nueva = { numero: '', titular: '', vencimiento: '', cvv: '' };
    alert('✅ Tarjeta guardada correctamente');
  }

  eliminarTarjeta(t: any) {
    this.tarjetas = this.tarjetas.filter(item => item !== t);
  }
}
