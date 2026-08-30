import { CommonModule } from '@angular/common';
import {
  Component,
  OnInit,
  computed,
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
  addCircleOutline,
  alarmOutline,
  briefcaseOutline,
  cardOutline,
  cashOutline,
  checkmarkOutline,
  chevronDownOutline,
  chevronForwardOutline,
  clipboardOutline,
  documentTextOutline,
  homeOutline,
  listOutline,
  logOutOutline,
  notificationsOutline,
  personCircleOutline,
  scaleOutline,
  sunnyOutline,
  swapHorizontalOutline,
  timeOutline,
  trendingUpOutline
} from 'ionicons/icons';

import {
  WaiterClosing,
  WaiterDashboard,
  WaiterMovement
} from '../../models/waiter-dashboard.model';
import { DashboardService } from '../../services/dashboard.service';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-waiter-dashboard',
  standalone: true,
  templateUrl: './waiter-dashboard.page.html',
  styleUrls: ['./waiter-dashboard.page.scss'],
  imports: [
    CommonModule,
    IonContent,
    IonIcon,
    IonSpinner
  ]
})
export class WaiterDashboardPage implements OnInit {

  private readonly dashboardService =
    inject(DashboardService);

  private readonly router =
    inject(Router);

  private readonly authService =
    inject(AuthService);

  readonly loading =
    signal(true);

  readonly error =
    signal('');

  readonly dashboard =
    signal<WaiterDashboard | null>(null);

  readonly firstName =
    computed(() => {
      const name =
        this.dashboard()?.waiterName ?? '';

      return name.split(' ')[0] || '';
    });

  readonly latestClosing =
    computed<WaiterClosing | null>(() => {
      const closings =
        this.dashboard()?.todayClosings ?? [];

      return closings.find(closing => closing.status === 'DRAFT')
        ?? closings[0]
        ?? null;
    });

  readonly lastMovementAt =
    computed(() =>
      this.dashboard()?.recentMovements[0]?.movementAt
      ?? this.latestClosing()?.closingAt
      ?? null
    );

  readonly manualPercent =
    computed(() => this.getPercent(
      this.dashboard()?.summary.totalManual ?? 0,
      this.dashboard()?.summary.totalSales ?? 0
    ));

  readonly visaPercent =
    computed(() => this.getPercent(
      this.latestClosing()?.declaredVisa ?? 0,
      this.dashboard()?.summary.totalSales ?? 0
    ));

  constructor() {
    addIcons({
      addCircleOutline,
      alarmOutline,
      briefcaseOutline,
      cardOutline,
      cashOutline,
      checkmarkOutline,
      chevronDownOutline,
      chevronForwardOutline,
      clipboardOutline,
      documentTextOutline,
      homeOutline,
      listOutline,
      logOutOutline,
      notificationsOutline,
      personCircleOutline,
      scaleOutline,
      sunnyOutline,
      swapHorizontalOutline,
      timeOutline,
      trendingUpOutline
    });
  }

  ngOnInit(): void {
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
            ?? 'No se pudo cargar el dashboard'
          );
          this.loading.set(false);
        }
      });
  }

  goToClosing(): void {
    this.router.navigateByUrl('/closing');
  }

  logout(): void {
    this.authService.logout();
    void this.router.navigateByUrl('/auth/login', {
      replaceUrl: true
    });
  }

  goToPayments(): void {
    this.router.navigateByUrl('/payments/add-payment');
  }

  goToTransfers(): void {
    this.router.navigateByUrl('/dashboard/waiter');
  }

  goToHistory(): void {
    this.goToDetail('closings');
  }

  goToDetail(section: 'differences' | 'movements' | 'closings' | 'transfers'): void {
    this.router.navigate(
      ['/dashboard/waiter/detail'],
      {
        queryParams: {
          section
        }
      }
    );
  }

  trackMovement(
    _index: number,
    movement: WaiterMovement
  ): number {
    return movement.movementId;
  }

  private getPercent(
    value: number,
    total: number
  ): number {
    if (total <= 0) {
      return 0;
    }

    return value * 100 / total;
  }
}
