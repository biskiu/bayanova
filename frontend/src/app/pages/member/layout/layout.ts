import { Component, DestroyRef, HostListener, inject } from '@angular/core';
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
})
export class Layout {
  private readonly destroyRef = inject(DestroyRef);
  private readonly router = inject(Router);

  sidebarOpen = false;
  profileMenuOpen = false;
  pageTitle = 'Dashboard';

  private readonly pageTitles: Record<string, string> = {
    '/member/dashboard': 'Dashboard',
    '/member/membership-status': 'Membership status',
    '/member/fund-balance': 'Fund balance',
    '/member/family-members': 'Family members',
    '/member/qr-member-id': 'QR member ID',
    '/member/membership-card': 'Digital membership card',
    '/member/renew-subscription': 'Renew subscription',
    '/member/claims': 'Claims',
    '/member/payments': 'Payments',
    '/member/payment-history': 'Payment history',
    '/member/receipts': 'Receipts',
    '/member/support': 'Support',
    '/member/announcements': 'Announcements',
    '/member/profile': 'Profile',
    '/member/profile/information': 'Personal information',
    '/member/profile/documents': 'Identity documents',
    '/member/referral': 'Refer a friend',
  };

  readonly navigation: NavigationSection[] = [
    {
      label: 'Overview',
      items: [
        { label: 'Dashboard', icon: 'grid_view', route: '/member/dashboard' },
      ],
    },
    {
      label: 'Membership',
      items: [
        { label: 'Membership Status', icon: 'verified_user', route: '/member/membership-status' },
        { label: 'Fund Balance', icon: 'account_balance_wallet', route: '/member/fund-balance' },
        { label: 'Family Members', icon: 'group', route: '/member/family-members' },
        { label: 'QR Member ID', icon: 'qr_code_2', route: '/member/qr-member-id' },
        { label: 'Digital Membership Card', icon: 'badge', route: '/member/membership-card' },
        { label: 'Renew Subscription', icon: 'autorenew', route: '/member/renew-subscription' },
      ],
    },
    {
      label: 'Transactions',
      items: [
        { label: 'Claims', icon: 'description', route: '/member/claims' },
        { label: 'Payments', icon: 'payments', route: '/member/payments' },
        { label: 'Payment History', icon: 'receipt_long', route: '/member/payment-history' },
        { label: 'Download Receipts', icon: 'download', route: '/member/receipts' },
      ],
    },
    {
      label: 'Help & updates',
      items: [
        { label: 'Support Ticket', icon: 'support_agent', route: '/member/support' },
        { label: 'Announcements', icon: 'campaign', route: '/member/announcements' },
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

  private updatePageTitle(url: string): void {
    const path = url.split('?')[0].split('#')[0];
    this.pageTitle = this.pageTitles[path] ?? 'Member portal';
  }

  @HostListener('document:click')
  handleDocumentClick(): void {
    this.closeProfileMenu();
  }

  @HostListener('document:keydown.escape')
  handleEscapeKey(): void {
    this.closeProfileMenu();
    this.closeSidebar();
  }
}
