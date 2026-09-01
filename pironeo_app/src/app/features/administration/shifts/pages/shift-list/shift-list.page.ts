import { CommonModule } from '@angular/common';

import {
  Component,
  OnInit,
  inject,
  signal
} from '@angular/core';

import { Router } from '@angular/router';

import {
  IonContent,
  IonIcon,
  IonSpinner
} from '@ionic/angular';

import { addIcons } from 'ionicons';

import {
  addOutline,
  arrowBackOutline,
  chevronForwardOutline,
  moonOutline,
  refreshOutline,
  sunnyOutline,
  timeOutline,
  warningOutline
} from 'ionicons/icons';

import { Shift } from '../../models/shift.model';
import { ShiftService } from '../../services/shift.service';

@Component({
  selector: 'app-shift-list',
  standalone: true,
  templateUrl: './shift-list.page.html',
  styleUrls: ['./shift-list.page.scss'],
  imports: [
    CommonModule,
    IonContent,
    IonIcon,
    IonSpinner
  ]
})
export class ShiftListPage implements OnInit {

  private readonly router = inject(Router);
  private readonly shiftService = inject(ShiftService);

  readonly shifts = signal<Shift[]>([]);
  readonly loading = signal(true);
  readonly error = signal('');

  constructor() {

    addIcons({
      addOutline,
      arrowBackOutline,
      chevronForwardOutline,
      moonOutline,
      refreshOutline,
      sunnyOutline,
      timeOutline,
      warningOutline
    });

  }

  ngOnInit(): void {
    this.loadShifts();
  }

  ionViewWillEnter(): void {
    this.loadShifts(false);
  }

  loadShifts(
    showLoading = true
  ): void {

    if (showLoading) {
      this.loading.set(true);
    }

    this.error.set('');

    this.shiftService
      .getAll()
      .subscribe({

        next: response => {

          this.shifts.set(
            response.data ?? []
          );

          this.loading.set(false);

        },

        error: error => {

          console.error(
            'Error cargando turnos',
            error
          );

          this.error.set(
            error?.error?.message
              ?? 'No se pudieron cargar los turnos.'
          );

          this.loading.set(false);

        }

      });

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

  getShiftDescription(
    shift: Shift
  ): string {

    if (shift.code === 'MORNING') {
      return 'Turno de manana';
    }

    if (shift.code === 'AFTERNOON') {
      return 'Turno de tarde';
    }

    return 'Turno de trabajo';

  }

  viewShift(
    shift: Shift
  ): void {

    this.router.navigate(
      [
        '/administration/shifts',
        shift.id
      ]
    );

  }

  createShift(): void {

    this.router.navigateByUrl(
      '/administration/shifts/new'
    );

  }

  goBack(): void {

    this.router.navigateByUrl(
      '/administration',
      {
        replaceUrl: true
      }
    );

  }

}
