import { CommonModule } from '@angular/common';

import {
  Component,
  inject,
  signal
} from '@angular/core';

import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import {
  Router
} from '@angular/router';

import {
  IonContent,
  IonIcon,
  IonSpinner
} from '@ionic/angular';

import { addIcons } from 'ionicons';

import {
  arrowBackOutline,
  eyeOffOutline,
  eyeOutline,
  personOutline,
  shieldCheckmarkOutline
} from 'ionicons/icons';

import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-form',
  standalone: true,
  templateUrl: './user-form.page.html',
  styleUrls: ['./user-form.page.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonContent,
    IonIcon,
    IonSpinner
  ]
})
export class UserFormPage {

  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly userService = inject(UserService);

  readonly loading = signal(false);
  readonly error = signal('');
  readonly showPassword = signal(false);

  readonly form = this.fb.nonNullable.group({

    firstName: [
      '',
      [
        Validators.required,
        Validators.maxLength(100)
      ]
    ],

    lastName: [
      '',
      [
        Validators.required,
        Validators.maxLength(100)
      ]
    ],

    username: [
      '',
      [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100)
      ]
    ],

    password: [
      '',
      [
        Validators.required,
        Validators.minLength(6)
      ]
    ],

    roleId: [
      2,
      [
        Validators.required
      ]
    ]

  });

  constructor() {

    addIcons({
      arrowBackOutline,
      eyeOffOutline,
      eyeOutline,
      personOutline,
      shieldCheckmarkOutline
    });

  }

  selectRole(roleId: number): void {
    this.form.controls.roleId.setValue(roleId);
  }

  togglePassword(): void {
    this.showPassword.update(
      value => !value
    );
  }

  save(): void {

    this.error.set('');

    if (this.form.invalid) {

      this.form.markAllAsTouched();

      return;
    }

    this.loading.set(true);

    this.userService
      .create(this.form.getRawValue())
      .subscribe({

        next: () => {

          this.loading.set(false);

          this.router.navigateByUrl(
            '/administration/users'
          );

        },

        error: error => {

          console.error(
            'Error creando usuario',
            error
          );

          this.error.set(
            error?.error?.message
              ?? 'No se pudo crear el usuario.'
          );

          this.loading.set(false);

        }

      });

  }

  goBack(): void {

    this.router.navigateByUrl(
      '/administration/users'
    );

  }
}