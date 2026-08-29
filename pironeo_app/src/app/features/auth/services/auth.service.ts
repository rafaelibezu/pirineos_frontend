import {
  computed,
  inject,
  Injectable,
  signal
} from '@angular/core';

import {
  HttpClient
} from '@angular/common/http';

import {
  Observable,
  tap
} from 'rxjs';

import {
  API_ENDPOINTS
} from '../../../core/constants/api.constants';

import {
  STORAGE_KEYS
} from '../../../core/constants/storage.constants';

import {
  ApiResponse
} from '../../../core/models/api-response.model';

import {
  UserSession
} from '../../../core/models/user-session.model';

import {
  StorageService
} from '../../../core/services/storage.service';

import {
  LoginRequest
} from '../models/login-request.model';

import {
  LoginResponse
} from '../models/login-response.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly http =
    inject(HttpClient);

  private readonly storage =
    inject(StorageService);

  private readonly sessionSignal =
    signal<UserSession | null>(
      this.restoreSession()
    );

  readonly session =
    this.sessionSignal.asReadonly();

  readonly authenticated =
    computed(
      () => this.sessionSignal() !== null
    );

  readonly role =
    computed(
      () => this.sessionSignal()?.role ?? null
    );

  readonly currentUser =
    computed(
      () => this.sessionSignal()
    );

  login(
    request: LoginRequest,
    rememberMe = false
  ): Observable<ApiResponse<LoginResponse>> {

    return this.http
      .post<ApiResponse<LoginResponse>>(
        API_ENDPOINTS.AUTH.LOGIN,
        request
      )
      .pipe(

        tap(response => {

          const loginData =
            response.data;

          const session: UserSession = {

            userId:
              loginData.userId,

            username:
              loginData.username,

            firstName:
              loginData.firstName,

            lastName:
              loginData.lastName,

            role:
              loginData.role,

            accessToken:
              loginData.accessToken,

            tokenType:
              loginData.tokenType
          };

          this.saveSession(
            session,
            rememberMe
          );

        })

      );
  }

  logout(): void {

    this.storage.remove(
      STORAGE_KEYS.AUTH_TOKEN
    );

    this.storage.remove(
      STORAGE_KEYS.USER_SESSION
    );

    this.storage.remove(
      STORAGE_KEYS.REMEMBER_ME
    );

    this.sessionSignal.set(null);
  }

  getToken(): string | null {

    return this.storage.getString(
      STORAGE_KEYS.AUTH_TOKEN
    );
  }

  getCurrentSession(): UserSession | null {

    return this.sessionSignal();
  }

  isAuthenticated(): boolean {

    return !!this.getToken()
      && !!this.sessionSignal();
  }

  hasRole(
    role: 'ADMIN' | 'WAITER'
  ): boolean {

    return this.sessionSignal()?.role === role;
  }

  private saveSession(
    session: UserSession,
    rememberMe: boolean
  ): void {

    this.storage.setString(
      STORAGE_KEYS.AUTH_TOKEN,
      session.accessToken
    );

    this.storage.set(
      STORAGE_KEYS.USER_SESSION,
      session
    );

    this.storage.set(
      STORAGE_KEYS.REMEMBER_ME,
      rememberMe
    );

    this.sessionSignal.set(session);
  }

  private restoreSession(): UserSession | null {

    const session =
      this.storage.get<UserSession>(
        STORAGE_KEYS.USER_SESSION
      );

    const token =
      this.storage.getString(
        STORAGE_KEYS.AUTH_TOKEN
      );

    if (!session || !token) {
      return null;
    }

    return {
      ...session,
      accessToken: token
    };
  }
}