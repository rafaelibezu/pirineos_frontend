import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';

import { STORAGE_KEYS } from '../constants/storage.constants';
import { UserSession } from '../models/user-session.model';
import { StorageService } from '../services/storage.service';

export const roleGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const router = inject(Router);
  const storage = inject(StorageService);
  const session = storage.get<UserSession>(STORAGE_KEYS.userSession);
  const allowedRoles = route.data['roles'] as string[] | undefined;

  if (!allowedRoles?.length) {
    return true;
  }

  return session?.roles.some((role) => allowedRoles.includes(role)) ? true : router.createUrlTree(['/dashboard']);
};
