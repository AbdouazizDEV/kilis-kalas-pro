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
    path: 'national-id-photo',
    loadComponent: () =>
      import('./pages/national-id-photo/national-id-photo.page').then((m) => m.NationalIdPhotoPage),
  },
  {
    path: 'license-photo',
    loadComponent: () =>
      import('./pages/license-photo/license-photo.page').then((m) => m.LicensePhotoPage),
  },
  {
    path: 'insurance-photo',
    loadComponent: () =>
      import('./pages/insurance-photo/insurance-photo.page').then((m) => m.InsurancePhotoPage),
  },
  {
    path: 'registration-complete',
    loadComponent: () =>
      import('./pages/registration-complete/registration-complete.page').then(
        (m) => m.RegistrationCompletePage,
      ),
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
