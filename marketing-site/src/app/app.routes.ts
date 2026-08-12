import { Routes } from '@angular/router';
import { Layout } from './marketing-site/layout/layout';
import { Home } from './marketing-site/home/home';
import { LoginSignup } from './marketing-site/login-signup/login-signup';

export const routes: Routes = [
    {
        path: '',
        component: Layout,
        children: [
            {
                path: '',
                redirectTo: 'home',
                pathMatch: 'full'
            },
            {
                path: 'home',
                component: Home
            }
        ]
    },
    {
        path: 'login-signup',
        component: LoginSignup
    }
];