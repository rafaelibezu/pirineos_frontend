import { Component, input } from '@angular/core';
import { IonContent } from '@ionic/angular';

@Component({
  selector: 'app-closing-detail',
  standalone: true,
  imports: [IonContent],
  templateUrl: './closing-detail.page.html',
  styleUrl: './closing-detail.page.scss',
})
export class ClosingDetailPage {
  readonly id = input<string>();
}
