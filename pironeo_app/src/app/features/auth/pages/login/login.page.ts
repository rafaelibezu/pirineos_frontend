import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
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
import { finalize } from 'rxjs';

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

  showPassword = false;

  loading = false;

  errorMessage = '';

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

    this.showPassword =
      !this.showPassword;
  }

  login(): void {

    if (
      this.loginForm.invalid
      || this.loading
    ) {

      this.loginForm
        .markAllAsTouched();

      return;
    }

    this.loading = true;

    this.errorMessage = '';

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
      .pipe(

        finalize(() => {

          this.loading = false;

        })

      )
      .subscribe({

        next: response => {

          const role =
            response.data.role;

          if (role === 'ADMIN') {

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

          this.errorMessage =
            error?.error?.message
            ?? 'Usuario o contraseña incorrectos';

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
