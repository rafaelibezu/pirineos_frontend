import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonButton, IonContent, IonSpinner } from '@ionic/angular';
import { finalize } from 'rxjs';

import { AdminDashboardModel } from '../../models/admin-dashboard.model';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    IonButton,
    IonContent,
    IonSpinner,
    RouterLink
  ],
  templateUrl: './admin-dashboard.page.html',
  styleUrl: './admin-dashboard.page.scss'
})
export class AdminDashboardPage implements OnInit {

  dashboard: AdminDashboardModel | null = null;

  loading = false;

  errorMessage = '';

  constructor(
    private readonly dashboardService: DashboardService
  ) {}

  ngOnInit(): void {
    this.loadDashboard();
  }

  loadDashboard(): void {

    this.loading = true;
    this.errorMessage = '';

    this.dashboardService
      .getAdminDashboard()
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
}
