import { Routes } from '@angular/router';
import { Home } from './pages/marketing-site/home/home';
import { Layout } from './pages/marketing-site/layout/layout';

export const routes: Routes = [
  {
    path: '',
    component: Layout,
    children: [
      {
        path: '',
        component: Home,
      },
      {
        path: 'privacy-policy',
        loadComponent: () =>
          import('./pages/marketing-site/privacy-policy/privacy-policy').then(
            (m) => m.PrivacyPolicy,
          ),
      },
    ],
  },
  {
    path: 'member',
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'login',
      },
      {
        path: 'login',
        loadComponent: () =>
          import('./pages/member/login/login-signup').then((m) => m.LoginSignup),
      },
      {
        path: 'signup',
        loadComponent: () =>
          import('./pages/member/signup/login-signup').then((m) => m.LoginSignup),
      },
    ],
  },
  {
    path: 'login-signup',
    pathMatch: 'full',
    redirectTo: 'member/login',
  },
];
