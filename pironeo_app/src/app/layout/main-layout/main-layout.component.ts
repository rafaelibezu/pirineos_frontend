import { Component } from '@angular/core';
import { IonRouterOutlet } from '@ionic/angular';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [IonRouterOutlet],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss',
})
export class MainLayoutComponent {}
