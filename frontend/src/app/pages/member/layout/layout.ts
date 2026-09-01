import { Component, DestroyRef, inject } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs';

interface NavigationItem {
  label: string;
  icon: string;
  route?: string;
}

interface NavigationSection {
  label: string;
  items: NavigationItem[];
}

@Component({
  selector: 'app-member-layout',
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
  host: {
    '(document:click)': 'handleDocumentClick()',
    '(document:keydown.escape)': 'handleEscapeKey()',
  },
})
export class Layout {
  private readonly destroyRef = inject(DestroyRef);
  private readonly router = inject(Router);

  sidebarOpen = false;
  profileMenuOpen = false;
  notificationsOpen = false;
  unreadNotifications = 3;
  pageTitle = 'Dashboard';

  readonly notifications = [
    { title: 'General assembly notice', message: 'Member registration opens September 12.', time: '10 minutes ago', icon: 'how_to_vote', tone: 'green' },
    { title: 'Community activity', message: 'Livelihood workshop registration closes September 18.', time: 'Yesterday', icon: 'diversity_3', tone: 'gold' },
  ];

  private readonly pageTitles: Record<string, string> = {
    '/member/dashboard': 'Dashboard',
    '/member/membership-status': 'Membership status',
    '/member/family-members': 'Household members',
    '/member/membership-card': 'Member ID',
    '/member/claims': 'Benefit requests',
    '/member/payments': 'Membership payments',
    '/member/support': 'Support',
    '/member/announcements': 'Community & assemblies',
    '/member/profile': 'Profile',
    '/member/profile/information': 'Personal information',
    '/member/profile/documents': 'Identity documents',
    '/member/referral': 'Invite a member',
  };

  readonly navigation: NavigationSection[] = [
    {
      label: 'My cooperative',
      items: [
        { label: 'Dashboard', icon: 'grid_view', route: '/member/dashboard' },
      ],
    },
    {
      label: 'Membership',
      items: [
        { label: 'Membership Status', icon: 'verified_user', route: '/member/membership-status' },
        { label: 'Household Members', icon: 'group', route: '/member/family-members' },
      ],
    },
    {
      label: 'Participation',
      items: [
        { label: 'Community & Assemblies', icon: 'diversity_3', route: '/member/announcements' },
        { label: 'Invite a Member', icon: 'person_add', route: '/member/referral' },
      ],
    },
    { label: 'Member ID', items: [{ label: 'Member ID Card', icon: 'badge', route: '/member/membership-card' }] },
    {
      label: 'Services & records',
      items: [
        { label: 'Benefit Requests', icon: 'volunteer_activism', route: '/member/claims' },
        { label: 'Membership Payments', icon: 'payments', route: '/member/payments' },
      ],
    },
    {
      label: 'Help & updates',
      items: [
        { label: 'Support Ticket', icon: 'support_agent', route: '/member/support' },
      ],
    },
  ];

  constructor() {
    this.updatePageTitle(this.router.url);
    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((event) => {
        this.updatePageTitle(event.urlAfterRedirects);
        this.closeProfileMenu();
        this.closeSidebar();
      });
  }

  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }

  closeSidebar(): void {
    this.sidebarOpen = false;
  }

  toggleProfileMenu(): void {
    this.profileMenuOpen = !this.profileMenuOpen;
  }

  closeProfileMenu(): void {
    this.profileMenuOpen = false;
  }

  toggleNotifications(): void {
    this.notificationsOpen = !this.notificationsOpen;
  }

  closeNotifications(): void {
    this.notificationsOpen = false;
  }

  markAllNotificationsRead(): void {
    this.unreadNotifications = 0;
    this.closeNotifications();
  }

  private updatePageTitle(url: string): void {
    const path = url.split('?')[0].split('#')[0];
    this.pageTitle = this.pageTitles[path] ?? 'Member portal';
  }

  handleDocumentClick(): void {
    this.closeProfileMenu();
    this.closeNotifications();
  }

  handleEscapeKey(): void {
    this.closeProfileMenu();
    this.closeNotifications();
    this.closeSidebar();
  }
}
