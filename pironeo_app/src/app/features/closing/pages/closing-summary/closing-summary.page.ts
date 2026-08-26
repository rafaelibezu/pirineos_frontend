import { Component } from '@angular/core';
import { IonContent } from '@ionic/angular';

import { ClosingTotalsComponent } from '../../components/closing-totals/closing-totals.component';
import { DiscrepancyCardComponent } from '../../components/discrepancy-card/discrepancy-card.component';

@Component({
  selector: 'app-closing-summary',
  standalone: true,
  imports: [ClosingTotalsComponent, DiscrepancyCardComponent, IonContent],
  templateUrl: './closing-summary.page.html',
  styleUrl: './closing-summary.page.scss',
})
export class ClosingSummaryPage {}
