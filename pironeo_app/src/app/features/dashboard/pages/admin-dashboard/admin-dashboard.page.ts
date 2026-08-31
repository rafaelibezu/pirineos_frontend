import { CommonModule } from '@angular/common';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent, IonIcon, IonSpinner } from '@ionic/angular';
import { addIcons } from 'ionicons';
import {
  briefcaseOutline,
  calendarOutline,
  cardOutline,
  cashOutline,
  filterOutline,
  homeOutline,
  logOutOutline,
  notificationsOutline,
  personCircleOutline,
  receiptOutline,
  shieldCheckmarkOutline,
  statsChartOutline,
  swapHorizontalOutline,
  walletOutline
} from 'ionicons/icons';

import { AuthService } from '../../../auth/services/auth.service';
import { AdminDashboard } from '../../models/admin-dashboard.model';
import { DashboardService } from '../../services/dashboard.service';

type DashboardPeriod = 'day' | 'week' | 'month';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, IonContent, IonIcon, IonSpinner],
  templateUrl: './admin-dashboard.page.html',
  styleUrl: './admin-dashboard.page.scss'
})
export class AdminDashboardPage implements OnInit {

  private readonly dashboardService = inject(DashboardService);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  readonly dashboard = signal<AdminDashboard | null>(null);
  readonly loading = signal(true);
  readonly errorMessage = signal('');
  readonly selectedPeriod = signal<DashboardPeriod>('day');
  readonly selectedDate = signal(this.getToday());
  readonly selectedShift = signal<'all' | 'morning' | 'afternoon'>('all');

  readonly firstName = computed(
    () => this.authService.currentUser()?.firstName?.trim() || 'Administrador'
  );

  readonly displayDate = computed(() => {
    const [year, month, day] = this.selectedDate().split('-');
    return `${day}/${month}/${year}`;
  });

  readonly maxShiftSales = computed(() => Math.max(
    1,
    ...(this.dashboard()?.shifts.map(shift => shift.totalSales) ?? [1])
  ));

  constructor() {
    addIcons({
      briefcaseOutline,
      calendarOutline,
      cardOutline,
      cashOutline,
      filterOutline,
      homeOutline,
      logOutOutline,
      notificationsOutline,
      personCircleOutline,
      receiptOutline,
      shieldCheckmarkOutline,
      statsChartOutline,
      swapHorizontalOutline,
      walletOutline
    });
  }

  ngOnInit(): void {
    this.loadDashboard();
  }

  loadDashboard(): void {
    const { from, to } = this.getDateRange();
    this.loading.set(true);
    this.errorMessage.set('');

    this.dashboardService.getAdminDashboard(from, to).subscribe({
      next: response => {
        this.dashboard.set(response.data);
        this.loading.set(false);
      },
      error: error => {
        this.errorMessage.set(
          error?.error?.message ?? 'No se pudo cargar el dashboard'
        );
        this.loading.set(false);
      }
    });
  }

  selectPeriod(period: DashboardPeriod): void {
    if (this.selectedPeriod() === period) {
      return;
    }

    this.selectedPeriod.set(period);
    this.loadDashboard();
  }

  selectShift(shift: 'all' | 'morning' | 'afternoon'): void {
    this.selectedShift.set(shift);
  }

  onDateChange(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    if (!value) {
      return;
    }

    this.selectedDate.set(value);
    this.loadDashboard();
  }

  getShiftBarHeight(totalSales: number): number {
    return Math.max(12, totalSales * 100 / this.maxShiftSales());
  }

  getShiftPercent(totalSales: number): number {
    const total = this.dashboard()?.summary.totalSales ?? 0;
    return total > 0 ? totalSales * 100 / total : 0;
  }

  goToClosing(): void {
    void this.router.navigateByUrl('/closing');
  }

  goToPayments(): void {
    void this.router.navigateByUrl('/payments/add-payment');
  }

  goToAdministration(): void {
    void this.router.navigateByUrl('/administration');
  }

  logout(): void {
    this.authService.logout();
    void this.router.navigateByUrl('/auth/login', { replaceUrl: true });
  }

  private getDateRange(): { from: string; to: string } {
    const to = new Date(`${this.selectedDate()}T12:00:00`);
    const from = new Date(to);

    if (this.selectedPeriod() === 'week') {
      from.setDate(from.getDate() - 6);
    } else if (this.selectedPeriod() === 'month') {
      from.setDate(from.getDate() - 29);
    }

    return {
      from: this.toApiDate(from),
      to: this.toApiDate(to)
    };
  }

  private getToday(): string {
    return this.toApiDate(new Date());
  }

  private toApiDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}
