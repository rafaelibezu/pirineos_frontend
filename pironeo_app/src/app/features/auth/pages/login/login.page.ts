import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonContent } from '@ionic/angular';

import { STORAGE_KEYS } from '../../../../core/constants/storage.constants';
import { StorageService } from '../../../../core/services/storage.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    IonContent
  ],
  templateUrl: './login.page.html',
  styleUrl: './login.page.scss',
})
export class LoginPage {

  private readonly router = inject(Router);
  private readonly storage = inject(StorageService);

  username = '';
  password = '';
  rememberMe = false;
  showPassword = false;

  login(): void {
    if (!this.username.trim() || !this.password.trim()) {
      return;
    }

    this.storage.set(
      STORAGE_KEYS.accessToken,
      'development-token'
    );

    if (this.rememberMe) {
      this.storage.set(
        'rememberedUser',
        this.username
      );
    }

    void this.router.navigateByUrl('/dashboard');
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  forgotPassword(): void {
    console.log('Recuperar contraseña');
  }
}