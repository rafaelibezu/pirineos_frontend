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
  moonOutline,
  sunnyOutline,
  timeOutline
} from 'ionicons/icons';

import { ShiftService } from '../../services/shift.service';

@Component({
  selector: 'app-shift-form',
  standalone: true,
  templateUrl: './shift-form.page.html',
  styleUrls: ['./shift-form.page.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonContent,
    IonIcon,
    IonSpinner
  ]
})
export class ShiftFormPage implements OnInit {

  private readonly fb = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly shiftService = inject(ShiftService);

  readonly loading = signal(false);
  readonly loadingShift = signal(false);
  readonly error = signal('');
  readonly editShiftId = signal<number | null>(null);

  readonly isEditMode = computed(() =>
    this.editShiftId() !== null
  );

  readonly title = computed(() =>
    this.isEditMode()
      ? 'Editar turno'
      : 'Nuevo turno'
  );

  readonly subtitle = computed(() =>
    this.isEditMode()
      ? 'Actualiza la informacion del turno'
      : 'Registra un turno de trabajo'
  );

  readonly saveLabel = computed(() =>
    this.isEditMode()
      ? 'Actualizar turno'
      : 'Guardar turno'
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
      moonOutline,
      sunnyOutline,
      timeOutline
    });

  }

  ngOnInit(): void {

    const id = Number(
      this.route.snapshot.paramMap.get('id')
    );

    if (!id) {
      return;
    }

    this.editShiftId.set(id);
    this.loadShift(id);

  }

  selectCode(code: string): void {
    this.form.controls.code.setValue(code);
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
      this.editShiftId();

    const request =
      this.form.getRawValue();

    const request$ =
      id
        ? this.shiftService.update(
          id,
          request
        )
        : this.shiftService.create(
          request
        );

    request$
      .subscribe({

        next: response => {

          this.loading.set(false);

          if (id) {

            this.router.navigateByUrl(
              `/administration/shifts/${response.data?.id ?? id}`,
              {
                state: {
                  shift: response.data
                }
              }
            );

            return;
          }

          this.router.navigateByUrl(
            '/administration/shifts'
          );

        },

        error: error => {

          console.error(
            id
              ? 'Error actualizando turno'
              : 'Error creando turno',
            error
          );

          this.error.set(
            error?.error?.message
              ?? (
                id
                  ? 'No se pudo actualizar el turno.'
                  : 'No se pudo crear el turno.'
              )
          );

          this.loading.set(false);

        }

      });

  }

  goBack(): void {

    const id =
      this.editShiftId();

    this.router.navigateByUrl(
      id
        ? `/administration/shifts/${id}`
        : '/administration/shifts',
      {
        replaceUrl: true
      }
    );

  }

  private loadShift(id: number): void {

    this.loadingShift.set(true);
    this.error.set('');

    this.shiftService
      .getById(id)
      .subscribe({

        next: response => {

          const shift =
            response.data;

          this.form.patchValue({
            name: shift.name,
            code: shift.code,
            active: shift.active
          });

          this.loadingShift.set(false);

        },

        error: error => {

          console.error(
            'Error cargando turno para editar',
            error
          );

          this.error.set(
            error?.error?.message
              ?? 'No se pudo cargar el turno.'
          );

          this.loadingShift.set(false);

        }

      });

  }

}
