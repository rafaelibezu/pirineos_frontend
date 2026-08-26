import { Component, computed, input } from '@angular/core';

import { CurrencyEurPipe } from '../../../../shared/pipes/currency-eur.pipe';

@Component({
  selector: 'app-closing-totals',
  standalone: true,
  imports: [CurrencyEurPipe],
  templateUrl: './closing-totals.component.html',
  styleUrl: './closing-totals.component.scss',
})
export class ClosingTotalsComponent {
  readonly expected = input(0);
  readonly counted = input(0);
  readonly difference = computed(() => this.counted() - this.expected());
}
