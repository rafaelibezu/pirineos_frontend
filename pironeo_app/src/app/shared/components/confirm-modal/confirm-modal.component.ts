import { Component, input, output } from '@angular/core';
import { IonButton, IonButtons, IonContent, IonHeader, IonModal, IonTitle, IonToolbar } from '@ionic/angular';

@Component({
  selector: 'app-confirm-modal',
  standalone: true,
  imports: [IonButton, IonButtons, IonContent, IonHeader, IonModal, IonTitle, IonToolbar],
  templateUrl: './confirm-modal.component.html',
  styleUrl: './confirm-modal.component.scss',
})
export class ConfirmModalComponent {
  readonly isOpen = input(false);
  readonly title = input('Confirmar accion');
  readonly message = input('Esta accion no se puede deshacer.');
  readonly cancelled = output<void>();
  readonly confirmed = output<void>();
}
