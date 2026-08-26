import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { IonButton, IonContent, IonInput, IonItem, IonLabel } from '@ionic/angular';

import { STORAGE_KEYS } from '../../../../core/constants/storage.constants';
import { StorageService } from '../../../../core/services/storage.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [IonButton, IonContent, IonInput, IonItem, IonLabel],
  templateUrl: './login.page.html',
  styleUrl: './login.page.scss',
})
export class LoginPage {
  private readonly router = inject(Router);
  private readonly storage = inject(StorageService);

  login(): void {
    this.storage.set(STORAGE_KEYS.accessToken, 'development-token');
    void this.router.navigateByUrl('/dashboard');
  }
}
