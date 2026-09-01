import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { API_ENDPOINTS } from '../../../../core/constants/api.constants';
import { ApiResponse } from '../../../../core/models/api-response.model';

import { CashRegister } from '../models/cash-register.model';
import { CashRegisterRequest } from '../models/cash-register-request.model';

@Injectable({
  providedIn: 'root'
})
export class CashRegisterService {

  private readonly http = inject(HttpClient);

  getAll(): Observable<ApiResponse<CashRegister[]>> {

    return this.http.get<ApiResponse<CashRegister[]>>(
      API_ENDPOINTS.CASH_REGISTERS.BASE
    );

  }

  getActive(): Observable<ApiResponse<CashRegister[]>> {

    return this.http.get<ApiResponse<CashRegister[]>>(
      API_ENDPOINTS.CASH_REGISTERS.ACTIVE
    );

  }

  getById(
    id: number
  ): Observable<ApiResponse<CashRegister>> {

    return this.http.get<ApiResponse<CashRegister>>(
      `${API_ENDPOINTS.CASH_REGISTERS.BASE}/${id}`
    );

  }

  create(
    request: CashRegisterRequest
  ): Observable<ApiResponse<CashRegister>> {

    return this.http.post<ApiResponse<CashRegister>>(
      API_ENDPOINTS.CASH_REGISTERS.BASE,
      request
    );

  }

  update(
    id: number,
    request: CashRegisterRequest
  ): Observable<ApiResponse<CashRegister>> {

    return this.http.put<ApiResponse<CashRegister>>(
      `${API_ENDPOINTS.CASH_REGISTERS.BASE}/${id}`,
      request
    );

  }

}
