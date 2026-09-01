import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { API_ENDPOINTS } from '../../../../core/constants/api.constants';
import { ApiResponse } from '../../../../core/models/api-response.model';

import { History } from '../models/history.model';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  private readonly http = inject(HttpClient);

  getHistory(
    from?: string,
    to?: string,
    userId?: number | null
  ): Observable<ApiResponse<History>> {

    let params =
      new HttpParams();

    if (from) {
      params = params
        .set('from', from)
        .set('dateFrom', from);
    }

    if (to) {
      params = params
        .set('to', to)
        .set('dateTo', to);
    }

    if (userId) {
      params = params.set('userId', userId);
    }

    return this.http.get<ApiResponse<History>>(
      API_ENDPOINTS.HISTORY.BASE,
      {
        params
      }
    );

  }

}
