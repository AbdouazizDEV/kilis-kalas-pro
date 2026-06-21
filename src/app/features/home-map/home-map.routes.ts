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
];
