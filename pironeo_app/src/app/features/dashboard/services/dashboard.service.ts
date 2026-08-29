import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { API_ENDPOINTS } from '../../../core/constants/api.constants';
import { ApiResponse } from '../../../core/models/api-response.model';
import { AdminDashboardModel } from '../models/admin-dashboard.model';
import { WaiterDashboardModel } from '../models/waiter-dashboard.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private readonly http =
    inject(HttpClient);

  getAdminDashboard(): Observable<ApiResponse<AdminDashboardModel>> {

    return this.http.get<ApiResponse<AdminDashboardModel>>(
      API_ENDPOINTS.DASHBOARD.ADMIN
    );
  }

  getWaiterDashboard(): Observable<ApiResponse<WaiterDashboardModel>> {

    return this.http.get<ApiResponse<WaiterDashboardModel>>(
      API_ENDPOINTS.DASHBOARD.WAITER
    );
  }
}
