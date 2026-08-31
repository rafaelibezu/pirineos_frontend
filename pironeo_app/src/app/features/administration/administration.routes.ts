import { Routes } from '@angular/router';

export const ADMINISTRATION_ROUTES: Routes = [

  {
    path: '',
    loadComponent: () =>
      import(
        './pages/administration-home/administration-home.page'
      ).then(
        m => m.AdministrationHomePage
      )
  }

];