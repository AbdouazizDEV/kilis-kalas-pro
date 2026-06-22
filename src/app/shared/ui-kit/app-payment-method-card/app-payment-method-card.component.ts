import { Component, Input } from '@angular/core';
import { IonCard, IonImg } from '@ionic/angular/standalone';
import { PaymentProvider } from '../../../models/driver-dashboard.model';

@Component({
  selector: 'app-payment-method-card',
  standalone: true,
  imports: [IonCard, IonImg],
  templateUrl: './app-payment-method-card.component.html',
  styleUrls: ['./app-payment-method-card.component.scss'],
})
export class AppPaymentMethodCardComponent {
  @Input() provider: PaymentProvider = 'wave';
  @Input() imageUrl = '';

  get ariaLabel(): string {
    return this.provider === 'wave' ? 'Wave' : 'Orange Money';
  }
}
