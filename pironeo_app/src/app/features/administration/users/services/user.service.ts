import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { API_ENDPOINTS } from '../../../../core/constants/api.constants';
import { ApiResponse } from '../../../../core/models/api-response.model';

import { User } from '../models/user.model';
import { CreateUserRequest } from '../models/create-user-request.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly http = inject(HttpClient);

  getAll(): Observable<ApiResponse<User[]>> {
    return this.http.get<ApiResponse<User[]>>(
      API_ENDPOINTS.USERS.BASE
    );
  }

  getWaiters(): Observable<ApiResponse<User[]>> {
    return this.http.get<ApiResponse<User[]>>(
      API_ENDPOINTS.USERS.WAITERS
    );
  }

  getById(id: number): Observable<ApiResponse<User>> {
    return this.http.get<ApiResponse<User>>(
      `${API_ENDPOINTS.USERS.BASE}/${id}`
    );
  }

  create(
    request: CreateUserRequest
  ): Observable<ApiResponse<User>> {

    return this.http.post<ApiResponse<User>>(
      API_ENDPOINTS.USERS.BASE,
      request
    );
  }
}