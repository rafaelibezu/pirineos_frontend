import { Routes } from '@angular/router';

import { roleGuard } from '../../core/guards/role.guard';

export const ADMINISTRATION_ROUTES: Routes = [

  {
    path: '',

    canActivate: [roleGuard],

    data: {
      roles: ['ADMIN']
    },

    children: [

      {
        path: '',
        loadComponent: () =>
          import(
            './pages/administration-home/administration-home.page'
          ).then(
            m => m.AdministrationHomePage
          )
      },

      {
        path: 'users',
        loadComponent: () =>
          import(
            './users/pages/user-list/user-list.page'
          ).then(
            m => m.UserListPage
          )
      },

      {
        path: 'users/new',
        loadComponent: () =>
          import(
            './users/pages/user-form/user-form.page'
          ).then(
            m => m.UserFormPage
          )
      },

      {
        path: 'users/:id/edit',
        loadComponent: () =>
          import(
            './users/pages/user-form/user-form.page'
          ).then(
            m => m.UserFormPage
          )
      },

      {
        path: 'users/:id',
        loadComponent: () =>
          import(
            './users/pages/user-detail/user-detail.page'
          ).then(
            m => m.UserDetailPage
          )
      },

      {
        path: 'cash-registers',
        loadComponent: () =>
          import(
            './cash-registers/pages/cash-register-list/cash-register-list.page'
          ).then(
            m => m.CashRegisterListPage
          )
      },

      {
        path: 'cash-registers/new',
        loadComponent: () =>
          import(
            './cash-registers/pages/cash-register-form/cash-register-form.page'
          ).then(
            m => m.CashRegisterFormPage
          )
      },

      {
        path: 'cash-registers/:id/edit',
        loadComponent: () =>
          import(
            './cash-registers/pages/cash-register-form/cash-register-form.page'
          ).then(
            m => m.CashRegisterFormPage
          )
      },

      {
        path: 'cash-registers/:id',
        loadComponent: () =>
          import(
            './cash-registers/pages/cash-register-detail/cash-register-detail.page'
          ).then(
            m => m.CashRegisterDetailPage
          )
      },

      {
        path: 'shifts',
        loadComponent: () =>
          import(
            './shifts/pages/shift-list/shift-list.page'
          ).then(
            m => m.ShiftListPage
          )
      },

      {
        path: 'shifts/new',
        loadComponent: () =>
          import(
            './shifts/pages/shift-form/shift-form.page'
          ).then(
            m => m.ShiftFormPage
          )
      },

      {
        path: 'shifts/:id/edit',
        loadComponent: () =>
          import(
            './shifts/pages/shift-form/shift-form.page'
          ).then(
            m => m.ShiftFormPage
          )
      },

      {
        path: 'shifts/:id',
        loadComponent: () =>
          import(
            './shifts/pages/shift-detail/shift-detail.page'
          ).then(
            m => m.ShiftDetailPage
          )
      },

      {
        path: 'distributors',
        loadComponent: () =>
          import(
            './distributors/pages/distributor-list/distributor-list.page'
          ).then(
            m => m.DistributorListPage
          )
      },

      {
        path: 'distributors/new',
        loadComponent: () =>
          import(
            './distributors/pages/distributor-form/distributor-form.page'
          ).then(
            m => m.DistributorFormPage
          )
      },

      {
        path: 'distributors/:id/edit',
        loadComponent: () =>
          import(
            './distributors/pages/distributor-form/distributor-form.page'
          ).then(
            m => m.DistributorFormPage
          )
      },

      {
        path: 'distributors/:id',
        loadComponent: () =>
          import(
            './distributors/pages/distributor-detail/distributor-detail.page'
          ).then(
            m => m.DistributorDetailPage
          )
      },

      {
        path: 'history',
        loadComponent: () =>
          import(
            './history/pages/history-list/history-list.page'
          ).then(
            m => m.HistoryListPage
          )
      }

    ]
  }

];
