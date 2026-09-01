import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { API_ENDPOINTS } from '../../../../core/constants/api.constants';
import { ApiResponse } from '../../../../core/models/api-response.model';

import { Shift } from '../models/shift.model';
import { ShiftRequest } from '../models/shift-request.model';

@Injectable({
  providedIn: 'root'
})
export class ShiftService {

  private readonly http = inject(HttpClient);

  getAll(): Observable<ApiResponse<Shift[]>> {

    return this.http.get<ApiResponse<Shift[]>>(
      API_ENDPOINTS.SHIFTS.BASE
    );

  }

  getActive(): Observable<ApiResponse<Shift[]>> {

    return this.http.get<ApiResponse<Shift[]>>(
      API_ENDPOINTS.SHIFTS.ACTIVE
    );

  }

  getById(
    id: number
  ): Observable<ApiResponse<Shift>> {

    return this.http.get<ApiResponse<Shift>>(
      `${API_ENDPOINTS.SHIFTS.BASE}/${id}`
    );

  }

  create(
    request: ShiftRequest
  ): Observable<ApiResponse<Shift>> {

    return this.http.post<ApiResponse<Shift>>(
      API_ENDPOINTS.SHIFTS.BASE,
      request
    );

  }

  update(
    id: number,
    request: ShiftRequest
  ): Observable<ApiResponse<Shift>> {

    return this.http.put<ApiResponse<Shift>>(
      `${API_ENDPOINTS.SHIFTS.BASE}/${id}`,
      request
    );

  }

}
