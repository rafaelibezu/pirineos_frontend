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
      }

    ]
  }

];