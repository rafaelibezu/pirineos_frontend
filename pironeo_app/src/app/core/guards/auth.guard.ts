import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { STORAGE_KEYS } from '../constants/storage.constants';
import { StorageService } from '../services/storage.service';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const storage = inject(StorageService);
  const token = storage.get<string>(STORAGE_KEYS.AUTH_TOKEN);

  return token ? true : router.createUrlTree(['/auth/login']);
};
