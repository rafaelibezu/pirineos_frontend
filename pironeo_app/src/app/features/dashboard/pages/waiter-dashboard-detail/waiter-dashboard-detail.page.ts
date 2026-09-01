import { CommonModule } from '@angular/common';
import {
  Component,
  OnInit,
  computed,
  inject,
  signal
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  IonContent,
  IonIcon,
  IonSpinner
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import {
  arrowBackOutline,
  cardOutline,
  cashOutline,
  checkmarkCircleOutline,
  clipboardOutline,
  listOutline,
  scaleOutline,
  swapHorizontalOutline,
  timeOutline
} from 'ionicons/icons';

import {
  WaiterClosing,
  WaiterDashboard,
  WaiterMovement,
  WaiterTransfer
} from '../../models/waiter-dashboard.model';
import { DashboardService } from '../../services/dashboard.service';

type DetailSection =
  | 'differences'
  | 'movements'
  | 'closings'
  | 'transfers';

@Component({
  selector: 'app-waiter-dashboard-detail',
  standalone: true,
  templateUrl: './waiter-dashboard-detail.page.html',
  styleUrls: ['./waiter-dashboard-detail.page.scss'],
  imports: [
    CommonModule,
    IonContent,
    IonIcon,
    IonSpinner
  ]
})
export class WaiterDashboardDetailPage implements OnInit {

  private readonly dashboardService =
    inject(DashboardService);

  private readonly route =
    inject(ActivatedRoute);

  private readonly router =
    inject(Router);

  readonly loading =
    signal(true);

  readonly error =
    signal('');

  readonly dashboard =
    signal<WaiterDashboard | null>(null);

  readonly activeSection =
    signal<DetailSection>('movements');

  readonly allClosings =
    computed(() => {
      const data =
        this.dashboard();

      if (!data) {
        return [];
      }

      const closings =
        [
          ...data.todayClosings,
          ...data.recentClosings
        ];

      return closings.filter(
        (closing, index, list) =>
          list.findIndex(item => item.closingId === closing.closingId) === index
      );
    });

  readonly sectionTitle =
    computed(() => {
      switch (this.activeSection()) {
        case 'differences':
          return 'Descuadres';
        case 'closings':
          return 'Historial de cierres';
        case 'transfers':
          return 'Traspasos';
        default:
          return 'Movimientos';
      }
    });

  constructor() {
    addIcons({
      arrowBackOutline,
      cardOutline,
      cashOutline,
      checkmarkCircleOutline,
      clipboardOutline,
      listOutline,
      scaleOutline,
      swapHorizontalOutline,
      timeOutline
    });
  }

  ngOnInit(): void {
    const section =
      this.route.snapshot.queryParamMap.get('section');

    if (this.isSection(section)) {
      this.activeSection.set(section);
    }

    this.loadDashboard();
  }

  loadDashboard(): void {
    this.loading.set(true);
    this.error.set('');

    this.dashboardService
      .getWaiterDashboard()
      .subscribe({
        next: response => {
          this.dashboard.set(response.data);
          this.loading.set(false);
        },
        error: error => {
          this.error.set(
            error?.error?.message
            ?? 'No se pudo cargar el detalle'
          );
          this.loading.set(false);
        }
      });
  }

  setSection(section: DetailSection): void {
    this.activeSection.set(section);
  }

  goBack(): void {
    this.router.navigateByUrl(
      '/dashboard/waiter',
      {
        replaceUrl: true
      }
    );
  }

  trackClosing(
    _index: number,
    closing: WaiterClosing
  ): number {
    return closing.closingId;
  }

  trackMovement(
    _index: number,
    movement: WaiterMovement
  ): number {
    return movement.movementId;
  }

  trackTransfer(
    _index: number,
    transfer: WaiterTransfer
  ): number {
    return transfer.transferId;
  }

  private isSection(
    value: string | null
  ): value is DetailSection {
    return value === 'differences'
      || value === 'movements'
      || value === 'closings'
      || value === 'transfers';
  }
}
