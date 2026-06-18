import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'onboarding/splash',
    pathMatch: 'full',
  },
  {
    path: 'onboarding',
    loadChildren: () =>
      import('./features/onboarding/onboarding.routes').then((m) => m.ONBOARDING_ROUTES),
  },
  {
    path: 'auth/login',
    loadComponent: () =>
      import('./features/auth/pages/login/login.page').then((m) => m.LoginPage),
  },
  {
    path: 'auth/register',
    loadComponent: () =>
      import('./features/auth/pages/register/register.page').then((m) => m.RegisterPage),
  },
  {
    path: 'driver-registration',
    loadChildren: () =>
      import('./features/driver-registration/driver-registration.routes').then(
        (m) => m.DRIVER_REGISTRATION_ROUTES,
      ),
  },
  {
    path: 'verification-pending',
    loadComponent: () =>
      import('./features/verification-pending/pages/pending/pending.page').then(
        (m) => m.VerificationPendingPage,
      ),
  },
  {
    path: '**',
    redirectTo: 'onboarding/splash',
  },
];
