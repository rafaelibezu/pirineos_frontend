import { Component, input } from '@angular/core';
import { IonBackButton, IonButtons, IonHeader, IonTitle, IonToolbar } from '@ionic/angular';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [IonBackButton, IonButtons, IonHeader, IonTitle, IonToolbar],
  templateUrl: './app-header.component.html',
  styleUrl: './app-header.component.scss',
})
export class AppHeaderComponent {
  readonly title = input('Pirineo');
  readonly showBackButton = input(false);
}
