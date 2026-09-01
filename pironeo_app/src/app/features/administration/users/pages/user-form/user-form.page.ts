import { CommonModule } from '@angular/common';

import {
  Component,
  OnInit,
  computed,
  inject,
  signal
} from '@angular/core';

import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import {
  ActivatedRoute,
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
  checkmarkCircleOutline,
  closeCircleOutline,
  eyeOffOutline,
  eyeOutline,
  personOutline,
  shieldCheckmarkOutline
} from 'ionicons/icons';

import { UserService } from '../../services/user.service';
import {
  User,
  UserRole
} from '../../models/user.model';

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
export class UserFormPage implements OnInit {

  private readonly fb = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly userService = inject(UserService);

  readonly loading = signal(false);
  readonly loadingUser = signal(false);
  readonly error = signal('');
  readonly showPassword = signal(false);
  readonly editUserId = signal<number | null>(null);
  readonly active = signal(true);

  readonly isEditMode = computed(() =>
    this.editUserId() !== null
  );

  readonly title = computed(() =>
    this.isEditMode()
      ? 'Editar usuario'
      : 'Nuevo usuario'
  );

  readonly subtitle = computed(() =>
    this.isEditMode()
      ? 'Actualiza los datos del usuario'
      : 'Crea un acceso para el personal'
  );

  readonly passwordPlaceholder = computed(() =>
    this.isEditMode()
      ? 'Dejar vacia para mantener la actual'
      : 'Contrasena'
  );

  readonly saveLabel = computed(() =>
    this.isEditMode()
      ? 'Actualizar usuario'
      : 'Guardar usuario'
  );

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
      checkmarkCircleOutline,
      closeCircleOutline,
      eyeOffOutline,
      eyeOutline,
      personOutline,
      shieldCheckmarkOutline
    });

  }

  ngOnInit(): void {

    const id = Number(
      this.route.snapshot.paramMap.get('id')
    );

    if (!id) {
      return;
    }

    this.editUserId.set(id);
    this.makePasswordOptional();
    this.loadUser(id);

  }

  selectRole(roleId: number): void {
    this.form.controls.roleId.setValue(roleId);
  }

  togglePassword(): void {
    this.showPassword.update(
      value => !value
    );
  }

  toggleActive(): void {
    this.active.update(
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

    const id =
      this.editUserId();

    const rawValue =
      this.form.getRawValue();

    const request = {
      username: rawValue.username,
      firstName: rawValue.firstName,
      lastName: rawValue.lastName,
      roleId: rawValue.roleId,
      active: this.active()
    };

    const request$ =
      id
        ? this.userService.update(
          id,
          rawValue.password
            ? {
              ...request,
              password: rawValue.password
            }
            : request
        )
        : this.userService.create({
          username: request.username,
          firstName: request.firstName,
          lastName: request.lastName,
          roleId: request.roleId,
          password: rawValue.password
        });

    request$
      .subscribe({

        next: response => {

          this.loading.set(false);

          if (id) {

            this.router.navigateByUrl(
              `/administration/users/${response.data?.id ?? id}`,
              {
                state: {
                  user: response.data
                }
              }
            );

            return;
          }

          this.router.navigateByUrl(
            '/administration/users'
          );

        },

        error: error => {

          console.error(
            id
              ? 'Error actualizando usuario'
              : 'Error creando usuario',
            error
          );

          this.error.set(
            error?.error?.message
              ?? (
                id
                  ? 'No se pudo actualizar el usuario.'
                  : 'No se pudo crear el usuario.'
              )
          );

          this.loading.set(false);

        }

      });

  }

  goBack(): void {

    const id =
      this.editUserId();

    this.router.navigateByUrl(
      id
        ? `/administration/users/${id}`
        : '/administration/users',
      {
        replaceUrl: true
      }
    );

  }

  private loadUser(id: number): void {

    this.loadingUser.set(true);
    this.error.set('');

    this.userService
      .getById(id)
      .subscribe({

        next: response => {

          const user =
            response.data;

          this.form.patchValue({
            firstName: user.firstName,
            lastName: user.lastName ?? '',
            username: user.username,
            password: '',
            roleId: user.roleId
              ?? this.getRoleId(user)
          });

          this.active.set(user.active);

          this.loadingUser.set(false);

        },

        error: error => {

          console.error(
            'Error cargando usuario para editar',
            error
          );

          this.error.set(
            error?.error?.message
              ?? 'No se pudo cargar el usuario.'
          );

          this.loadingUser.set(false);

        }

      });

  }

  private makePasswordOptional(): void {

    this.form.controls.password.clearValidators();

    this.form.controls.password.addValidators(
      Validators.minLength(6)
    );

    this.form.controls.password.updateValueAndValidity();

  }

  private getRoleId(user: User): number {

    return this.getRole(user) === 'ADMIN'
      ? 1
      : 2;

  }

  private getRole(user: User): UserRole {

    return user.roleCode
      ?? user.role
      ?? 'WAITER';

  }

}
