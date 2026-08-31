import { Routes } from '@angular/router';

import { authGuard } from './core/guards/auth.guard';

import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';

import { MainLayoutComponent } from './layout/main-layout/main-layout.component';

export const routes: Routes = [

  {
    path: '',
    component: AuthLayoutComponent,
    children: [

      {
        path: '',
        redirectTo: 'auth/splash',
        pathMatch: 'full',
      },

      {
        path: 'auth',
        loadChildren: () =>
          import('./features/auth/auth.routes')
            .then((m) => m.AUTH_ROUTES),
      },

    ],
  },

  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [authGuard],
    children: [

      {
        path: 'dashboard',
        loadChildren: () =>
          import('./features/dashboard/dashboard.routes')
            .then((m) => m.DASHBOARD_ROUTES),
      },

      {
        path: 'closing',
        loadChildren: () =>
          import('./features/closing/closing.routes')
            .then((m) => m.CLOSING_ROUTES),
      },

      {
        path: 'payments/add-payment',
        loadComponent: () =>
          import('./features/payments/pages/add-payment/add-payment.page')
            .then((m) => m.AddPaymentPage),
      },

      {
        path: 'administration',
        loadChildren: () =>
          import('./features/administration/administration.routes')
            .then((m) => m.ADMINISTRATION_ROUTES),
      },

    ],
  },

  {
    path: '**',
    redirectTo: 'auth/splash',
  },

];