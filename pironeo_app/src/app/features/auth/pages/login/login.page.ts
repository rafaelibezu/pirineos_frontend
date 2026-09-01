import { CommonModule } from '@angular/common';
import {
  Component,
  signal
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonCheckbox,
  IonContent,
  IonIcon,
  IonSpinner
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import {
  eyeOffOutline,
  eyeOutline,
  lockClosedOutline,
  personOutline
} from 'ionicons/icons';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonContent,
    IonIcon,
    IonCheckbox,
    IonSpinner
  ]
})
export class LoginPage {

  loginForm: FormGroup;

  readonly showPassword = signal(false);

  readonly loading = signal(false);

  readonly errorMessage = signal('');

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly authService: AuthService
  ) {

    addIcons({
      eyeOffOutline,
      eyeOutline,
      lockClosedOutline,
      personOutline
    });

    this.loginForm =
      this.formBuilder.group({

        username: [
          '',
          Validators.required
        ],

        password: [
          '',
          Validators.required
        ],

        rememberMe: [
          false
        ]

      });
  }

  togglePassword(): void {

    this.showPassword.update(
      value => !value
    );
  }

  login(): void {

    if (
      this.loginForm.invalid
      || this.loading()
    ) {

      this.loginForm
        .markAllAsTouched();

      return;
    }

    this.loading.set(true);
    this.errorMessage.set('');

    const {
      username,
      password,
      rememberMe
    } = this.loginForm.getRawValue();

    this.authService
      .login(
        {
          username,
          password
        },
        rememberMe
      )
      .subscribe({

        next: response => {

          this.loading.set(false);

          const role =
            this.authService.getCurrentSession()?.role
            ?? response.data.role;

          if (
            role
              .trim()
              .toUpperCase()
              .replace('ROLE_', '') === 'ADMIN'
          ) {

            this.router.navigateByUrl(
              '/dashboard/admin',
              {
                replaceUrl: true
              }
            );

            return;
          }

          this.router.navigateByUrl(
            '/dashboard/waiter',
            {
              replaceUrl: true
            }
          );
        },

        error: error => {

          this.authService.logout();

          this.errorMessage.set(
            error?.error?.message
            ?? error?.message
            ?? 'Usuario o contrasena incorrectos'
          );

          this.loading.set(false);

        }

      });
  }

  get usernameInvalid(): boolean {

    const control =
      this.loginForm.get(
        'username'
      );

    return !!(
      control?.invalid
      && control?.touched
    );
  }

  get passwordInvalid(): boolean {

    const control =
      this.loginForm.get(
        'password'
      );

    return !!(
      control?.invalid
      && control?.touched
    );
  }
}
