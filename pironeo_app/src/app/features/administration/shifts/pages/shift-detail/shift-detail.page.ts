import { CommonModule } from '@angular/common';

import {
  Component,
  OnInit,
  inject,
  signal
} from '@angular/core';

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
  createOutline,
  keyOutline,
  moonOutline,
  sunnyOutline,
  timeOutline
} from 'ionicons/icons';

import { Shift } from '../../models/shift.model';
import { ShiftService } from '../../services/shift.service';

@Component({
  selector: 'app-shift-detail',
  standalone: true,
  templateUrl: './shift-detail.page.html',
  styleUrls: ['./shift-detail.page.scss'],
  imports: [
    CommonModule,
    IonContent,
    IonIcon,
    IonSpinner
  ]
})
export class ShiftDetailPage implements OnInit {

  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly shiftService = inject(ShiftService);

  readonly shift = signal<Shift | null>(null);
  readonly loading = signal(true);
  readonly error = signal('');

  constructor() {

    addIcons({
      arrowBackOutline,
      checkmarkCircleOutline,
      closeCircleOutline,
      createOutline,
      keyOutline,
      moonOutline,
      sunnyOutline,
      timeOutline
    });

  }

  ngOnInit(): void {

    const updatedShift =
      this.router.getCurrentNavigation()?.extras.state?.['shift'] as Shift | undefined;

    if (updatedShift) {
      this.shift.set(updatedShift);
      this.loading.set(false);
    }

    this.refreshShift(
      !updatedShift
    );

  }

  ionViewWillEnter(): void {
    this.refreshShift(false);
  }

  getShiftIcon(
    shift: Shift
  ): string {

    if (shift.code === 'MORNING') {
      return 'sunny-outline';
    }

    if (shift.code === 'AFTERNOON') {
      return 'moon-outline';
    }

    return 'time-outline';

  }

  edit(): void {

    const currentShift =
      this.shift();

    if (!currentShift) {
      return;
    }

    this.router.navigate(
      [
        '/administration/shifts',
        currentShift.id,
        'edit'
      ]
    );

  }

  goBack(): void {

    this.router.navigateByUrl(
      '/administration/shifts',
      {
        replaceUrl: true
      }
    );

  }

  private refreshShift(showLoading: boolean): void {

    const id = Number(
      this.route.snapshot.paramMap.get('id')
    );

    if (!id) {

      this.error.set(
        'Turno no valido.'
      );

      this.loading.set(false);

      return;
    }

    this.loadShift(
      id,
      showLoading
    );

  }

  private loadShift(
    id: number,
    showLoading = true
  ): void {

    if (showLoading) {
      this.loading.set(true);
    }

    this.error.set('');

    this.shiftService
      .getById(id)
      .subscribe({

        next: response => {

          this.shift.set(
            response.data
          );

          this.loading.set(false);

        },

        error: error => {

          console.error(
            'Error cargando turno',
            error
          );

          this.error.set(
            error?.error?.message
              ?? 'No se pudo cargar el turno.'
          );

          this.loading.set(false);

        }

      });

  }

}
