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
  keyOutline,
  walletOutline
} from 'ionicons/icons';

import { CashRegisterService } from '../../services/cash-register.service';

@Component({
  selector: 'app-cash-register-form',
  standalone: true,
  templateUrl: './cash-register-form.page.html',
  styleUrls: ['./cash-register-form.page.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonContent,
    IonIcon,
    IonSpinner
  ]
})
export class CashRegisterFormPage implements OnInit {

  private readonly fb = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly cashRegisterService = inject(CashRegisterService);

  readonly loading = signal(false);
  readonly loadingCashRegister = signal(false);
  readonly error = signal('');
  readonly editCashRegisterId = signal<number | null>(null);

  readonly isEditMode = computed(() =>
    this.editCashRegisterId() !== null
  );

  readonly title = computed(() =>
    this.isEditMode()
      ? 'Editar caja'
      : 'Nueva caja'
  );

  readonly subtitle = computed(() =>
    this.isEditMode()
      ? 'Actualiza la informacion de la caja'
      : 'Registra una caja del negocio'
  );

  readonly saveLabel = computed(() =>
    this.isEditMode()
      ? 'Actualizar caja'
      : 'Guardar caja'
  );

  readonly form = this.fb.nonNullable.group({

    name: [
      '',
      [
        Validators.required,
        Validators.maxLength(100)
      ]
    ],

    code: [
      '',
      [
        Validators.required,
        Validators.maxLength(50)
      ]
    ],

    active: [
      true,
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
      keyOutline,
      walletOutline
    });

  }

  ngOnInit(): void {

    const id = Number(
      this.route.snapshot.paramMap.get('id')
    );

    if (!id) {
      return;
    }

    this.editCashRegisterId.set(id);
    this.loadCashRegister(id);

  }

  toggleActive(): void {

    this.form.controls.active.setValue(
      !this.form.controls.active.value
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
      this.editCashRegisterId();

    const request =
      this.form.getRawValue();

    const request$ =
      id
        ? this.cashRegisterService.update(
          id,
          request
        )
        : this.cashRegisterService.create(
          request
        );

    request$
      .subscribe({

        next: response => {

          this.loading.set(false);

          if (id) {

            this.router.navigateByUrl(
              `/administration/cash-registers/${response.data?.id ?? id}`,
              {
                state: {
                  cashRegister: response.data
                }
              }
            );

            return;
          }

          this.router.navigateByUrl(
            '/administration/cash-registers'
          );

        },

        error: error => {

          console.error(
            id
              ? 'Error actualizando caja'
              : 'Error creando caja',
            error
          );

          this.error.set(
            error?.error?.message
              ?? (
                id
                  ? 'No se pudo actualizar la caja.'
                  : 'No se pudo crear la caja.'
              )
          );

          this.loading.set(false);

        }

      });

  }

  goBack(): void {

    const id =
      this.editCashRegisterId();

    this.router.navigateByUrl(
      id
        ? `/administration/cash-registers/${id}`
        : '/administration/cash-registers',
      {
        replaceUrl: true
      }
    );

  }

  private loadCashRegister(id: number): void {

    this.loadingCashRegister.set(true);
    this.error.set('');

    this.cashRegisterService
      .getById(id)
      .subscribe({

        next: response => {

          const cashRegister =
            response.data;

          this.form.patchValue({
            name: cashRegister.name,
            code: cashRegister.code,
            active: cashRegister.active
          });

          this.loadingCashRegister.set(false);

        },

        error: error => {

          console.error(
            'Error cargando caja para editar',
            error
          );

          this.error.set(
            error?.error?.message
              ?? 'No se pudo cargar la caja.'
          );

          this.loadingCashRegister.set(false);

        }

      });

  }

}
