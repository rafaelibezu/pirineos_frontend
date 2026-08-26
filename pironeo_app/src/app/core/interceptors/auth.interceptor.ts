import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';

import { STORAGE_KEYS } from '../constants/storage.constants';
import { StorageService } from '../services/storage.service';

export const authInterceptor: HttpInterceptorFn = (request, next) => {
  const storage = inject(StorageService);
  const token = storage.get<string>(STORAGE_KEYS.accessToken);

  if (!token) {
    return next(request);
  }

  return next(
    request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    }),
  );
};
