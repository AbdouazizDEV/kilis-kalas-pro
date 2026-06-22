import { Routes } from '@angular/router';

export const HOME_MAP_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home-map.page').then((m) => m.HomeMapPage),
  },
  {
    path: 'chat',
    loadComponent: () => import('./pages/ride-chat/ride-chat.page').then((m) => m.RideChatPage),
  },
  {
    path: 'profile',
    loadComponent: () =>
      import('./pages/profile/driver-profile.page').then((m) => m.DriverProfilePage),
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./pages/dashboard/driver-dashboard.page').then((m) => m.DriverDashboardPage),
  },
  {
    path: 'documents',
    loadComponent: () =>
      import('./pages/documents/driver-documents.page').then((m) => m.DriverDocumentsPage),
  },
  {
    path: 'history',
    loadComponent: () =>
      import('./pages/history/driver-history.page').then((m) => m.DriverHistoryPage),
  },
  {
    path: 'history/:id',
    loadComponent: () =>
      import('./pages/history/driver-history-detail.page').then((m) => m.DriverHistoryDetailPage),
  },
  {
    path: 'help',
    loadComponent: () => import('./pages/help/driver-help.page').then((m) => m.DriverHelpPage),
  },
];
