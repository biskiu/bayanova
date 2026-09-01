import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

interface AdminNavGroup {
  label: string;
  items: { label: string; icon: string; route: string; badge?: string }[];
}

@Component({
  selector: 'app-admin-layout',
  imports: [FormsModule, RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
  host: {
    '(document:click)': 'closeAccountMenu()',
    '(document:keydown.escape)': 'closeOverlays()',
  },
})
export class AdminLayout {
  sidebarOpen = false;
  accountMenuOpen = false;
  searchQuery = '';
  notificationsOpen = false;
  unreadNotifications = 4;

  readonly notifications = [
    { icon: 'person_add', title: 'New member application', copy: 'Maria Santos submitted an application.', time: '2 minutes ago', tone: 'blue' },
    { icon: 'description', title: 'Claim needs review', copy: 'Claim CLM-2026-0084 has new documents.', time: '18 minutes ago', tone: 'red' },
    { icon: 'diversity_3', title: 'Community program published', copy: 'The livelihood workshop is now visible to members.', time: '34 minutes ago', tone: 'green' },
    { icon: 'task_alt', title: 'Approval queue updated', copy: 'Three requests are marked high priority.', time: '1 hour ago', tone: 'gold' },
  ];

  readonly navigation: AdminNavGroup[] = [
    { label: 'Overview', items: [
      { label: 'Dashboard', icon: 'space_dashboard', route: '/admin/dashboard' },
      { label: 'Analytics', icon: 'monitoring', route: '/admin/analytics' },
    ]},
    { label: 'Management', items: [
      { label: 'Members', icon: 'group', route: '/admin/members' },
      { label: 'Membership Payments', icon: 'payments', route: '/admin/payments' },
      { label: 'Claims', icon: 'description', route: '/admin/claims' },
      { label: 'Approvals', icon: 'task_alt', route: '/admin/approvals', badge: '8' },
      { label: 'Support Tickets', icon: 'support_agent', route: '/admin/support-tickets', badge: '14' },
    ]},
    { label: 'Finance & insights', items: [
      { label: 'Accounting', icon: 'account_balance', route: '/admin/accounting' },
      { label: 'Reports', icon: 'assessment', route: '/admin/reports' },
    ]},
    { label: 'Operations', items: [
      { label: 'CRM', icon: 'contacts', route: '/admin/crm' },
      { label: 'Document Management', icon: 'folder_open', route: '/admin/documents' },
    ]},
    { label: 'System', items: [
      { label: 'Roles & Permissions', icon: 'admin_panel_settings', route: '/admin/roles' },
      { label: 'Audit Logs', icon: 'history', route: '/admin/audit-logs' },
    ]},
  ];

  get searchResults(): { label: string; icon: string; route: string }[] {
    const query = this.searchQuery.trim().toLowerCase();

    if (!query) return [];

    return this.navigation
      .flatMap((group) => group.items)
      .filter((item) => item.label.toLowerCase().includes(query));
  }

  clearSearch(): void {
    this.searchQuery = '';
  }

  toggleAccountMenu(event: MouseEvent): void {
    event.stopPropagation();
    this.notificationsOpen = false;
    this.accountMenuOpen = !this.accountMenuOpen;
  }

  toggleNotifications(event: MouseEvent): void {
    event.stopPropagation();
    this.accountMenuOpen = false;
    this.notificationsOpen = !this.notificationsOpen;
  }

  markAllRead(): void {
    this.unreadNotifications = 0;
    this.notificationsOpen = false;
  }

  closeAccountMenu(): void { this.accountMenuOpen = false; this.notificationsOpen = false; }

  closeOverlays(): void { this.sidebarOpen = false; this.accountMenuOpen = false; this.notificationsOpen = false; }
}
