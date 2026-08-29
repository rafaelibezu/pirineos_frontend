import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';

import { API_ENDPOINTS } from '../../../core/constants/api.constants';
import { ApiResponse } from '../../../core/models/api-response.model';

import { AdminDashboard } from '../models/admin-dashboard.model';
import { WaiterDashboard } from '../models/waiter-dashboard.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private readonly http =
    inject(HttpClient);

  getWaiterDashboard(
    date?: string
  ): Observable<ApiResponse<WaiterDashboard>> {

    let params =
      new HttpParams();

    if (date) {
      params =
        params.set(
          'date',
          date
        );
    }

    return this.http.get<ApiResponse<WaiterDashboard>>(
      API_ENDPOINTS.DASHBOARD.WAITER,
      {
        params
      }
    );
  }

  getAdminDashboard(
    from: string,
    to: string,
    waiterId?: number,
    distributorId?: number,
    shiftId?: number,
    cashRegisterId?: number
  ): Observable<ApiResponse<AdminDashboard>> {

    let params =
      new HttpParams()
        .set('from', from)
        .set('to', to);

    if (waiterId) {
      params =
        params.set(
          'waiterId',
          waiterId
        );
    }

    if (distributorId) {
      params =
        params.set(
          'distributorId',
          distributorId
        );
    }

    if (shiftId) {
      params =
        params.set(
          'shiftId',
          shiftId
        );
    }

    if (cashRegisterId) {
      params =
        params.set(
          'cashRegisterId',
          cashRegisterId
        );
    }

    return this.http.get<ApiResponse<AdminDashboard>>(
      API_ENDPOINTS.DASHBOARD.ADMIN,
      {
        params
      }
    );
  }
}