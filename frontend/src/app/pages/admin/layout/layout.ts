import { Component, HostListener } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

interface AdminNavGroup {
  label: string;
  items: { label: string; icon: string; route: string; badge?: string }[];
}

@Component({
  selector: 'app-admin-layout',
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
})
export class AdminLayout {
  sidebarOpen = false;
  accountMenuOpen = false;

  readonly navigation: AdminNavGroup[] = [
    { label: 'Overview', items: [
      { label: 'Dashboard', icon: 'space_dashboard', route: '/admin/dashboard' },
      { label: 'Analytics', icon: 'monitoring', route: '/admin/analytics' },
    ]},
    { label: 'Management', items: [
      { label: 'Members', icon: 'group', route: '/admin/members' },
      { label: 'Claims', icon: 'description', route: '/admin/claims' },
      { label: 'Payments', icon: 'payments', route: '/admin/payments' },
      { label: 'Approvals', icon: 'task_alt', route: '/admin/approvals', badge: '8' },
    ]},
    { label: 'Finance & insights', items: [
      { label: 'Accounting', icon: 'account_balance', route: '/admin/accounting' },
      { label: 'Reports', icon: 'assessment', route: '/admin/reports' },
    ]},
    { label: 'Operations', items: [
      { label: 'CRM', icon: 'contacts', route: '/admin/crm' },
      { label: 'Notifications', icon: 'notifications', route: '/admin/notifications' },
      { label: 'Document Management', icon: 'folder_open', route: '/admin/documents' },
    ]},
    { label: 'System', items: [
      { label: 'Roles & Permissions', icon: 'admin_panel_settings', route: '/admin/roles' },
      { label: 'Audit Logs', icon: 'history', route: '/admin/audit-logs' },
    ]},
  ];

  toggleAccountMenu(event: MouseEvent): void {
    event.stopPropagation();
    this.accountMenuOpen = !this.accountMenuOpen;
  }

  @HostListener('document:click')
  closeAccountMenu(): void { this.accountMenuOpen = false; }

  @HostListener('document:keydown.escape')
  closeOverlays(): void { this.sidebarOpen = false; this.accountMenuOpen = false; }
}
