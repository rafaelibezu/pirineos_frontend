import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonButton, IonContent } from '@ionic/angular';

import { MoneyInputComponent } from '../../../../shared/components/money-input/money-input.component';

@Component({
  selector: 'app-closing-step-one',
  standalone: true,
  imports: [IonButton, IonContent, MoneyInputComponent, RouterLink],
  templateUrl: './closing-step-one.page.html',
  styleUrl: './closing-step-one.page.scss',
})
export class ClosingStepOnePage {}
