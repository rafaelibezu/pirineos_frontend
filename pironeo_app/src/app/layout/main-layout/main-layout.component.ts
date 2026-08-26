import { Component } from '@angular/core';
import { IonRouterOutlet } from '@ionic/angular';

import { AppHeaderComponent } from '../../shared/components/app-header/app-header.component';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [IonRouterOutlet, AppHeaderComponent],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss',
})
export class MainLayoutComponent {}
