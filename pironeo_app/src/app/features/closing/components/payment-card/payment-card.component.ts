import { Component, input } from '@angular/core';

import { CurrencyEurPipe } from '../../../../shared/pipes/currency-eur.pipe';
import { StatusBadgeComponent } from '../../../../shared/components/status-badge/status-badge.component';

@Component({
  selector: 'app-payment-card',
  standalone: true,
  imports: [CurrencyEurPipe, StatusBadgeComponent],
  templateUrl: './payment-card.component.html',
  styleUrl: './payment-card.component.scss',
})
export class PaymentCardComponent {
  readonly method = input('Efectivo');
  readonly amount = input(0);
  readonly status = input('Pendiente');
}
