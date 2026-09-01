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
  businessOutline,
  checkmarkCircleOutline,
  closeCircleOutline,
  documentTextOutline
} from 'ionicons/icons';

import { DistributorService } from '../../services/distributor.service';

@Component({
  selector: 'app-distributor-form',
  standalone: true,
  templateUrl: './distributor-form.page.html',
  styleUrls: ['./distributor-form.page.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonContent,
    IonIcon,
    IonSpinner
  ]
})
export class DistributorFormPage implements OnInit {

  private readonly fb = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly distributorService = inject(DistributorService);

  readonly loading = signal(false);
  readonly loadingDistributor = signal(false);
  readonly error = signal('');
  readonly editDistributorId = signal<number | null>(null);

  readonly isEditMode = computed(() =>
    this.editDistributorId() !== null
  );

  readonly title = computed(() =>
    this.isEditMode()
      ? 'Editar distribuidor'
      : 'Nuevo distribuidor'
  );

  readonly subtitle = computed(() =>
    this.isEditMode()
      ? 'Actualiza los datos del distribuidor'
      : 'Registra un proveedor del negocio'
  );

  readonly saveLabel = computed(() =>
    this.isEditMode()
      ? 'Actualizar distribuidor'
      : 'Guardar distribuidor'
  );

  readonly form = this.fb.nonNullable.group({

    name: [
      '',
      [
        Validators.required,
        Validators.maxLength(120)
      ]
    ],

    description: [
      '',
      [
        Validators.maxLength(250)
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
      businessOutline,
      checkmarkCircleOutline,
      closeCircleOutline,
      documentTextOutline
    });

  }

  ngOnInit(): void {

    const id = Number(
      this.route.snapshot.paramMap.get('id')
    );

    if (!id) {
      return;
    }

    this.editDistributorId.set(id);
    this.loadDistributor(id);

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
      this.editDistributorId();

    const request =
      this.form.getRawValue();

    const request$ =
      id
        ? this.distributorService.update(
          id,
          request
        )
        : this.distributorService.create(
          request
        );

    request$
      .subscribe({

        next: response => {

          this.loading.set(false);

          if (id) {

            this.router.navigateByUrl(
              `/administration/distributors/${response.data?.id ?? id}`,
              {
                state: {
                  distributor: response.data
                }
              }
            );

            return;
          }

          this.router.navigateByUrl(
            '/administration/distributors'
          );

        },

        error: error => {

          console.error(
            id
              ? 'Error actualizando distribuidor'
              : 'Error creando distribuidor',
            error
          );

          this.error.set(
            error?.error?.message
              ?? (
                id
                  ? 'No se pudo actualizar el distribuidor.'
                  : 'No se pudo crear el distribuidor.'
              )
          );

          this.loading.set(false);

        }

      });

  }

  goBack(): void {

    const id =
      this.editDistributorId();

    this.router.navigateByUrl(
      id
        ? `/administration/distributors/${id}`
        : '/administration/distributors',
      {
        replaceUrl: true
      }
    );

  }

  private loadDistributor(id: number): void {

    this.loadingDistributor.set(true);
    this.error.set('');

    this.distributorService
      .getById(id)
      .subscribe({

        next: response => {

          const distributor =
            response.data;

          this.form.patchValue({
            name: distributor.name,
            description: distributor.description ?? '',
            active: distributor.active
          });

          this.loadingDistributor.set(false);

        },

        error: error => {

          console.error(
            'Error cargando distribuidor para editar',
            error
          );

          this.error.set(
            error?.error?.message
              ?? 'No se pudo cargar el distribuidor.'
          );

          this.loadingDistributor.set(false);

        }

      });

  }

}
