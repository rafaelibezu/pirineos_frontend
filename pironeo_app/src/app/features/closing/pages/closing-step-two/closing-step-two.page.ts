import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonButton, IonContent } from '@ionic/angular';

import { PaymentCardComponent } from '../../components/payment-card/payment-card.component';

@Component({
  selector: 'app-closing-step-two',
  standalone: true,
  imports: [IonButton, IonContent, PaymentCardComponent, RouterLink],
  templateUrl: './closing-step-two.page.html',
  styleUrl: './closing-step-two.page.scss',
})
export class ClosingStepTwoPage {}
