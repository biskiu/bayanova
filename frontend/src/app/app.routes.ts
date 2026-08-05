import { Routes } from '@angular/router';
import { Layout } from './pages/marketing-site/layout/layout';
import { Home } from './pages/marketing-site/home/home';

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
    }
];
