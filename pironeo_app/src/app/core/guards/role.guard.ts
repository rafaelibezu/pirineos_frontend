import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';

import { STORAGE_KEYS } from '../constants/storage.constants';
import { UserRole, UserSession } from '../models/user-session.model';
import { StorageService } from '../services/storage.service';

export const roleGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const router = inject(Router);
  const storage = inject(StorageService);
  const session = storage.get<UserSession>(STORAGE_KEYS.USER_SESSION);
  const allowedRoles = route.data['roles'] as UserRole[] | undefined;

  if (!allowedRoles?.length) {
    return true;
  }

  const role =
    session?.role
      ?.trim()
      .toUpperCase()
      .replace('ROLE_', '') as UserRole | undefined;

  return role && allowedRoles.includes(role)
    ? true
    : router.createUrlTree(['/auth/login']);
};
