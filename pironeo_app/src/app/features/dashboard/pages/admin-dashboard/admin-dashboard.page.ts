import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { IonButton, IonContent, IonIcon, IonSpinner } from '@ionic/angular';
import { finalize } from 'rxjs';
import { addIcons } from 'ionicons';
import { logOutOutline } from 'ionicons/icons';

import { AuthService } from '../../../auth/services/auth.service';
import { AdminDashboard } from '../../models/admin-dashboard.model';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    IonButton,
    IonContent,
    IonIcon,
    IonSpinner,
    RouterLink
  ],
  templateUrl: './admin-dashboard.page.html',
  styleUrl: './admin-dashboard.page.scss'
})
export class AdminDashboardPage implements OnInit {

  dashboard: AdminDashboard | null = null;

  loading = false;

  errorMessage = '';

  constructor(
    private readonly dashboardService: DashboardService,
    private readonly authService: AuthService,
    private readonly router: Router
  ) {
    addIcons({ logOutOutline });
  }

  ngOnInit(): void {
    this.loadDashboard();
  }

  loadDashboard(): void {

    this.loading = true;
    this.errorMessage = '';

    this.dashboardService
      .getAdminDashboard(
        this.getToday(),
        this.getToday()
      )
      .pipe(
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe({
        next: response => {
          this.dashboard = response.data;
        },
        error: error => {
          this.errorMessage =
            error?.error?.message
            ?? 'No se pudo cargar el dashboard';
        }
      });
  }

  logout(): void {
    this.authService.logout();
    void this.router.navigateByUrl('/auth/login', {
      replaceUrl: true
    });
  }

  private getToday(): string {

    return new Date()
      .toISOString()
      .slice(0, 10);
  }
}
