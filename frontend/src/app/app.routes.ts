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
    path: 'login-signup',
    loadComponent: () =>
      import('./pages/marketing-site/login-signup/login-signup').then((m) => m.LoginSignup),
  },
];
