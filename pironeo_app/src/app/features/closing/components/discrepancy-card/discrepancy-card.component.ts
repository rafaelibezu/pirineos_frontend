import { Component, computed, input } from '@angular/core';

import { CurrencyEurPipe } from '../../../../shared/pipes/currency-eur.pipe';
import { StatusBadgeComponent } from '../../../../shared/components/status-badge/status-badge.component';

@Component({
  selector: 'app-discrepancy-card',
  standalone: true,
  imports: [CurrencyEurPipe, StatusBadgeComponent],
  templateUrl: './discrepancy-card.component.html',
  styleUrl: './discrepancy-card.component.scss',
})
export class DiscrepancyCardComponent {
  readonly difference = input(0);
  readonly label = computed(() => (this.difference() === 0 ? 'Cuadrado' : 'Con diferencia'));
  readonly tone = computed(() => (this.difference() === 0 ? 'success' : 'warning'));
}
