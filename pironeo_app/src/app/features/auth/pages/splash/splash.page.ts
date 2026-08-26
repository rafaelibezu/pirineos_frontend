import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent, IonSpinner } from '@ionic/angular';

import { STORAGE_KEYS } from '../../../../core/constants/storage.constants';
import { StorageService } from '../../../../core/services/storage.service';

@Component({
  selector: 'app-splash',
  standalone: true,
  imports: [IonContent, IonSpinner],
  templateUrl: './splash.page.html',
  styleUrl: './splash.page.scss',
})
export class SplashPage {
  private readonly router = inject(Router);
  private readonly storage = inject(StorageService);

  ionViewDidEnter(): void {
    const hasSession = Boolean(this.storage.get<string>(STORAGE_KEYS.accessToken));
    void this.router.navigateByUrl(hasSession ? '/dashboard' : '/auth/login');
  }
}
