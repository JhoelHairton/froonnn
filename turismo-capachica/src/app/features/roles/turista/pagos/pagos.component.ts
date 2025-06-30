// pagos.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PaymentMethod, PaymentService } from '../../../../core/services/turista/payment.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-metodos-pago',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './pagos.component.html',
})
export class PagosComponent {
  paymentMethods: PaymentMethod[] = [];
  paymentForm: FormGroup;
  editingPaymentMethod: PaymentMethod | null = null;
  showPaymentForm = false;
  showPaymentConfirmation = false;
  selectedPaymentMethodId: number | null = null;
  bookingId: number | null = null;
  loading = false;
  message = '';
  messageType: 'success' | 'error' = 'success';

  constructor(
    private paymentService: PaymentService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
        private router: Router
    

  ) {
    this.paymentForm = this.createPaymentForm();
  }

  ngOnInit(): void {
    this.loadPaymentMethods();

    this.route.queryParams.subscribe(params => {
      if (params['reserva']) {
        this.bookingId = parseInt(params['reserva'], 10);
        console.log('Reserva recibida para pagar:', this.bookingId);
      }
    });

  }

  createPaymentForm(): FormGroup {
    return this.formBuilder.group({
      card_number: ['', [Validators.required, Validators.pattern(/^\d{16}$/)]],
      cardholder_name: ['', [Validators.required, Validators.minLength(2)]],
      expiry_month: ['', [Validators.required, Validators.min(1), Validators.max(12)]],
      expiry_year: ['', [Validators.required, Validators.min(new Date().getFullYear())]],
      cvv: ['', [Validators.required, Validators.pattern(/^\d{3,4}$/)]],
      brand: ['', Validators.required]
    });
  }

  loadPaymentMethods(): void {
    this.loading = true;
    this.paymentService.getPaymentMethods().subscribe({
      next: (response) => {
        this.paymentMethods = response.data || response;
        this.loading = false;
      },
      error: (error) => {
        this.showMessage('Error al cargar métodos de pago', 'error');
        this.loading = false;
      }
    });
  }

  openPaymentForm(): void {
    this.showPaymentForm = true;
    this.editingPaymentMethod = null;
    this.paymentForm.reset();
  }

  closePaymentForm(): void {
    this.showPaymentForm = false;
    this.editingPaymentMethod = null;
    this.paymentForm.reset();
  }

  editPaymentMethod(paymentMethod: PaymentMethod): void {
    this.editingPaymentMethod = paymentMethod;
    this.showPaymentForm = true;
    this.paymentForm.patchValue(paymentMethod);
  }

  savePaymentMethod(): void {
    if (this.paymentForm.valid) {
      this.loading = true;
      const paymentData = this.paymentForm.value;

      if (this.editingPaymentMethod) {
        // Actualizar método existente
        this.paymentService.updatePaymentMethod(this.editingPaymentMethod.id!, paymentData).subscribe({
          next: (response) => {
            this.showMessage('Método de pago actualizado exitosamente', 'success');
            this.loadPaymentMethods();
            this.closePaymentForm();
            this.loading = false;
          },
          error: (error) => {
            this.showMessage('Error al actualizar método de pago', 'error');
            this.loading = false;
          }
        });
      } else {
        // Crear nuevo método
        this.paymentService.createPaymentMethod(paymentData).subscribe({
          next: (response) => {
            this.showMessage('Método de pago agregado exitosamente', 'success');
            this.loadPaymentMethods();
            this.closePaymentForm();
            this.loading = false;
          },
          error: (error) => {
            this.showMessage('Error al agregar método de pago', 'error');
            this.loading = false;
          }
        });
      }
    }
  }

  deletePaymentMethod(id: number): void {
    if (confirm('¿Estás seguro de que quieres eliminar este método de pago?')) {
      this.loading = true;
      this.paymentService.deletePaymentMethod(id).subscribe({
        next: (response) => {
          this.showMessage('Método de pago eliminado exitosamente', 'success');
          this.loadPaymentMethods();
          this.loading = false;
        },
        error: (error) => {
          this.showMessage('Error al eliminar método de pago', 'error');
          this.loading = false;
        }
      });
    }
  }

  selectPaymentMethod(paymentMethodId: number): void {
    this.selectedPaymentMethodId = paymentMethodId;
    this.showPaymentConfirmation = true;
  }

 confirmPayment(): void {
  if (this.selectedPaymentMethodId && this.bookingId) {
    this.loading = true;
    const paymentData = {
      payment_method_id: this.selectedPaymentMethodId
    };

    this.paymentService.confirmPayment(this.bookingId, paymentData).subscribe({
      next: (response) => {
        this.showMessage('¡Pago confirmado exitosamente!', 'success');
        this.showPaymentConfirmation = false;
        this.selectedPaymentMethodId = null;
        this.loading = false;
        console.log('Respuesta de pago:', response);

        // Opcional: Redirigir al historial de reservas
        setTimeout(() => {
          this.router.navigate(['/turista/reservas']);
        }, 2000);
      },
      error: (error) => {
        this.showMessage('Error al confirmar el pago', 'error');
        this.loading = false;
      }
    });
  }
}




  cancelPaymentConfirmation(): void {
    this.showPaymentConfirmation = false;
    this.selectedPaymentMethodId = null;
  }

  showMessage(text: string, type: 'success' | 'error'): void {
    this.message = text;
    this.messageType = type;
    setTimeout(() => {
      this.message = '';
    }, 5000);
  }

  maskCardNumber(cardNumber: string): string {
    if (!cardNumber) return '';
    return '**** **** **** ' + cardNumber.slice(-4);
  }

  getCardBrandIcon(brand: string): string {
    switch (brand.toLowerCase()) {
      case 'visa':
        return '💳';
      case 'mastercard':
        return '💳';
      case 'american express':
        return '💳';
      default:
        return '💳';
    }
  }
}
