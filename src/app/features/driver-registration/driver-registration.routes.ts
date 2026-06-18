import { Routes } from '@angular/router';

export const DRIVER_REGISTRATION_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'transport-mode',
    pathMatch: 'full',
  },
  {
    path: 'transport-mode',
    loadComponent: () =>
      import('./pages/transport-mode/transport-mode.page').then((m) => m.TransportModePage),
  },
  {
    path: 'documents',
    loadComponent: () => import('./pages/documents/documents.page').then((m) => m.DocumentsPage),
  },
  {
    path: 'vehicle-info',
    loadComponent: () =>
      import('./pages/vehicle-info/vehicle-info.page').then((m) => m.VehicleInfoPage),
  },
  {
    path: 'profile-photo',
    loadComponent: () =>
      import('./pages/profile-photo/profile-photo.page').then((m) => m.ProfilePhotoPage),
  },
  {
    path: 'summary',
    loadComponent: () => import('./pages/summary/summary.page').then((m) => m.SummaryPage),
  },
];
