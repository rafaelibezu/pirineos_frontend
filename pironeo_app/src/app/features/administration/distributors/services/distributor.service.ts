import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { API_ENDPOINTS } from '../../../../core/constants/api.constants';
import { ApiResponse } from '../../../../core/models/api-response.model';

import { Distributor } from '../models/distributor.model';
import { DistributorRequest } from '../models/distributor-request.model';

@Injectable({
  providedIn: 'root'
})
export class DistributorService {

  private readonly http = inject(HttpClient);

  getAll(): Observable<ApiResponse<Distributor[]>> {

    return this.http.get<ApiResponse<Distributor[]>>(
      API_ENDPOINTS.DISTRIBUTORS.BASE
    );

  }

  getActive(): Observable<ApiResponse<Distributor[]>> {

    return this.http.get<ApiResponse<Distributor[]>>(
      API_ENDPOINTS.DISTRIBUTORS.ACTIVE
    );

  }

  getById(
    id: number
  ): Observable<ApiResponse<Distributor>> {

    return this.http.get<ApiResponse<Distributor>>(
      `${API_ENDPOINTS.DISTRIBUTORS.BASE}/${id}`
    );

  }

  create(
    request: DistributorRequest
  ): Observable<ApiResponse<Distributor>> {

    return this.http.post<ApiResponse<Distributor>>(
      API_ENDPOINTS.DISTRIBUTORS.BASE,
      request
    );

  }

  update(
    id: number,
    request: DistributorRequest
  ): Observable<ApiResponse<Distributor>> {

    return this.http.put<ApiResponse<Distributor>>(
      `${API_ENDPOINTS.DISTRIBUTORS.BASE}/${id}`,
      request
    );

  }

}
