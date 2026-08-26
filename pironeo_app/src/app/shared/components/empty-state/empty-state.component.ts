import { Component, input } from '@angular/core';
import { IonText } from '@ionic/angular';

@Component({
  selector: 'app-empty-state',
  standalone: true,
  imports: [IonText],
  templateUrl: './empty-state.component.html',
  styleUrl: './empty-state.component.scss',
})
export class EmptyStateComponent {
  readonly title = input('Sin resultados');
  readonly message = input('No hay informacion para mostrar.');
}
