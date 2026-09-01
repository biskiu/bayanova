import { Routes } from '@angular/router';
import { Home } from './pages/marketing-site/home/home';
import { Layout } from './pages/marketing-site/layout/layout';

const loadMemberSection = () =>
  import('./pages/member/section-page/section-page').then((m) => m.SectionPage);

const loadAdminSection = () =>
  import('./pages/admin/section/section').then((m) => m.AdminSection);

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
          import('./pages/member/login/login').then((m) => m.Login),
      },
      {
        path: 'signup',
        loadComponent: () =>
          import('./pages/member/signup/signup').then((m) => m.Signup),
      },
      {
        path: '',
        loadComponent: () =>
          import('./pages/member/layout/layout').then((m) => m.Layout),
        children: [
          {
            path: 'dashboard',
            loadComponent: () =>
              import('./pages/member/dashboard/dashboard').then((m) => m.Dashboard),
          },
          {
            path: 'profile',
            children: [
              { path: '', loadComponent: loadMemberSection, data: { page: 'profile' } },
              {
                path: 'information',
                loadComponent: loadMemberSection,
                data: { page: 'edit-information' },
              },
              {
                path: 'documents',
                loadComponent: loadMemberSection,
                data: { page: 'upload-ids' },
              },
            ],
          },
          {
            path: 'membership-status',
            loadComponent: loadMemberSection,
            data: { page: 'membership-status' },
          },
          {
            path: 'family-members',
            loadComponent: loadMemberSection,
            data: { page: 'family-members' },
          },
          {
            path: 'membership-card',
            loadComponent: loadMemberSection,
            data: { page: 'membership-card' },
          },
          { path: 'claims', loadComponent: loadMemberSection, data: { page: 'claims' } },
          { path: 'payments', loadComponent: loadMemberSection, data: { page: 'payments' } },
          { path: 'edit-information', redirectTo: 'profile/information', pathMatch: 'full' },
          { path: 'upload-ids', redirectTo: 'profile/documents', pathMatch: 'full' },
          { path: 'referral', loadComponent: loadMemberSection, data: { page: 'referral' } },
          { path: 'support', loadComponent: loadMemberSection, data: { page: 'support' } },
          {
            path: 'announcements',
            loadComponent: loadMemberSection,
            data: { page: 'announcements' },
          },
        ],
      },
    ],
  },
  {
    path: 'admin/login',
    loadComponent: () =>
      import('./pages/admin/login/login').then((m) => m.AdminLogin),
  },
  {
    path: 'admin',
    loadComponent: () =>
      import('./pages/admin/layout/layout').then((m) => m.AdminLayout),
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./pages/admin/dashboard/dashboard').then((m) => m.AdminDashboard),
      },
      {
        path: 'profile',
        loadComponent: () =>
          import('./pages/admin/profile/profile').then((m) => m.AdminProfile),
      },
      { path: 'members', loadComponent: loadAdminSection, data: { title: 'Members', icon: 'group' } },
      { path: 'claims', loadComponent: loadAdminSection, data: { title: 'Claims', icon: 'description' } },
      { path: 'payments', loadComponent: loadAdminSection, data: { title: 'Payments', icon: 'payments' } },
      { path: 'accounting', loadComponent: loadAdminSection, data: { title: 'Accounting', icon: 'account_balance' } },
      { path: 'reports', loadComponent: loadAdminSection, data: { title: 'Reports', icon: 'assessment' } },
      { path: 'notifications', loadComponent: loadAdminSection, data: { title: 'Notifications', icon: 'notifications' } },
      { path: 'approvals', loadComponent: loadAdminSection, data: { title: 'Approvals', icon: 'task_alt' } },
      { path: 'support-tickets', loadComponent: loadAdminSection, data: { title: 'Support Tickets', icon: 'support_agent' } },
      { path: 'crm', loadComponent: loadAdminSection, data: { title: 'CRM', icon: 'contacts' } },
      { path: 'audit-logs', loadComponent: loadAdminSection, data: { title: 'Audit Logs', icon: 'history' } },
      { path: 'analytics', loadComponent: loadAdminSection, data: { title: 'Analytics', icon: 'monitoring' } },
      { path: 'roles', loadComponent: loadAdminSection, data: { title: 'Roles & Permissions', icon: 'admin_panel_settings' } },
      { path: 'documents', loadComponent: loadAdminSection, data: { title: 'Document Management', icon: 'folder_open' } },
    ],
  },
];
