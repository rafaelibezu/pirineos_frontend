import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

import { STORAGE_KEYS } from '../constants/storage.constants';
import { StorageService } from '../services/storage.service';

export const errorInterceptor: HttpInterceptorFn = (request, next) => {
  const router = inject(Router);
  const storage = inject(StorageService);

  return next(request).pipe(
    catchError((error: HttpErrorResponse) => {
      const isLoginRequest =
        request.url.includes('/auth/login');

      if (
        error.status === 401
        && !isLoginRequest
      ) {
        storage.remove(STORAGE_KEYS.AUTH_TOKEN);
        void router.navigate(['/auth/login']);
      }

      return throwError(() => error);
    }),
  );
};
