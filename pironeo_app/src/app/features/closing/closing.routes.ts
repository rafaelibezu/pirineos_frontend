import { Routes } from '@angular/router';

export const CLOSING_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'step-one',
    pathMatch: 'full',
  },
  {
    path: 'step-one',
    loadComponent: () => import('./pages/closing-step-one/closing-step-one.page').then((m) => m.ClosingStepOnePage),
  },
  {
    path: 'step-two',
    loadComponent: () => import('./pages/closing-step-two/closing-step-two.page').then((m) => m.ClosingStepTwoPage),
  },
  {
    path: 'summary',
    loadComponent: () => import('./pages/closing-summary/closing-summary.page').then((m) => m.ClosingSummaryPage),
  },
  {
    path: ':id',
    loadComponent: () => import('./pages/closing-detail/closing-detail.page').then((m) => m.ClosingDetailPage),
  },
];
