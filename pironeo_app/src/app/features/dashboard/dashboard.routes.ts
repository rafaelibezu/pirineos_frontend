import { Routes } from '@angular/router';

import { roleGuard } from '../../core/guards/role.guard';

export const DASHBOARD_ROUTES: Routes = [

  {
    path: 'waiter',
    canActivate: [roleGuard],
    data: {
      roles: ['WAITER']
    },
    loadComponent: () =>
      import(
        './pages/waiter-dashboard/waiter-dashboard.page'
      ).then(
        m => m.WaiterDashboardPage
      )
  },

  {
    path: 'waiter/detail',
    canActivate: [roleGuard],
    data: {
      roles: ['WAITER']
    },
    loadComponent: () =>
      import(
        './pages/waiter-dashboard-detail/waiter-dashboard-detail.page'
      ).then(
        m => m.WaiterDashboardDetailPage
      )
  },

  {
    path: 'admin',
    canActivate: [roleGuard],
    data: {
      roles: ['ADMIN']
    },
    loadComponent: () =>
      import(
        './pages/admin-dashboard/admin-dashboard.page'
      ).then(
        m => m.AdminDashboardPage
      )
  },

  {
    path: '',
    redirectTo: 'waiter',
    pathMatch: 'full'
  }

];
