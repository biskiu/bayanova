import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';

type SectionKey =
  | 'profile'
  | 'membership-status'
  | 'fund-balance'
  | 'family-members'
  | 'qr-member-id'
  | 'membership-card'
  | 'renew-subscription'
  | 'claims'
  | 'payments'
  | 'payment-history'
  | 'receipts'
  | 'edit-information'
  | 'upload-ids'
  | 'referral'
  | 'support'
  | 'announcements';

interface PageHeading {
  eyebrow: string;
  title: string;
  description: string;
  icon: string;
}

@Component({
  selector: 'app-member-section-page',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './section-page.html',
  styleUrl: './section-page.scss',
})
export class SectionPage {
  readonly page: SectionKey;

  readonly headings: Record<SectionKey, PageHeading> = {
    profile: { eyebrow: 'Account', title: 'My Profile', description: 'View your personal and membership information.', icon: 'person' },
    'membership-status': { eyebrow: 'Membership', title: 'Membership Status', description: 'Review your plan, coverage period, and account standing.', icon: 'verified_user' },
    'fund-balance': { eyebrow: 'Membership', title: 'Subscription Fund Balance', description: 'Track your available fund and recent contributions.', icon: 'account_balance_wallet' },
    'family-members': { eyebrow: 'Membership', title: 'Covered Family Members', description: 'Manage the individuals covered by your membership.', icon: 'group' },
    'qr-member-id': { eyebrow: 'Member ID', title: 'QR Member ID', description: 'Present this code at participating BayaNova partners.', icon: 'qr_code_2' },
    'membership-card': { eyebrow: 'Member ID', title: 'Digital Membership Card', description: 'Your portable proof of active BayaNova membership.', icon: 'badge' },
    'renew-subscription': { eyebrow: 'Membership', title: 'Renew Subscription', description: 'Keep your membership and family coverage active.', icon: 'autorenew' },
    claims: { eyebrow: 'Transactions', title: 'Claims', description: 'Review and monitor your submitted benefit claims.', icon: 'description' },
    payments: { eyebrow: 'Transactions', title: 'Payments', description: 'Make a contribution to your subscription fund.', icon: 'payments' },
    'payment-history': { eyebrow: 'Transactions', title: 'Payment History', description: 'Review all payments posted to your account.', icon: 'receipt_long' },
    receipts: { eyebrow: 'Transactions', title: 'Download Receipts', description: 'Access official receipts for your completed payments.', icon: 'download' },
    'edit-information': { eyebrow: 'Profile', title: 'Personal Information', description: 'Keep your contact and personal details up to date.', icon: 'manage_accounts' },
    'upload-ids': { eyebrow: 'Profile', title: 'Identity Documents', description: 'Submit identification documents for verification.', icon: 'verified' },
    referral: { eyebrow: 'Community', title: 'Referral Link', description: 'Invite family and friends to join the BayaNova community.', icon: 'share' },
    support: { eyebrow: 'Help', title: 'Support Tickets', description: 'Ask for help and follow the status of your requests.', icon: 'support_agent' },
    announcements: { eyebrow: 'Updates', title: 'Announcements', description: 'Read the latest news and advisories from BayaNova.', icon: 'campaign' },
  };

  readonly familyMembers = [
    { initials: 'JD', name: 'Juan Dela Cruz', relation: 'Primary member', id: 'BN-2026-00482' },
    { initials: 'MD', name: 'Maria Dela Cruz', relation: 'Spouse', id: 'BN-2026-00482-01' },
    { initials: 'SD', name: 'Sofia Dela Cruz', relation: 'Daughter', id: 'BN-2026-00482-02' },
    { initials: 'MD', name: 'Miguel Dela Cruz', relation: 'Son', id: 'BN-2026-00482-03' },
  ];

  readonly transactions = [
    { date: 'Aug 18, 2026', reference: 'PAY-082026-1842', method: 'GCash', amount: '₱500.00' },
    { date: 'Jul 18, 2026', reference: 'PAY-072026-1605', method: 'Maya', amount: '₱500.00' },
    { date: 'Jun 18, 2026', reference: 'PAY-062026-1339', method: 'GCash', amount: '₱500.00' },
  ];

  readonly announcements = [
    { date: 'August 20, 2026', title: 'Community health day this September', copy: 'Members and covered dependents are invited to our free community health screening.', tone: 'blue' },
    { date: 'August 12, 2026', title: 'Updated partner clinic directory', copy: 'Three new partner clinics have been added in Bacolod City and nearby areas.', tone: 'red' },
    { date: 'August 2, 2026', title: 'Scheduled portal maintenance', copy: 'The member portal will undergo routine maintenance on August 24 from 1–3 AM.', tone: 'gold' },
  ];

  constructor(route: ActivatedRoute) {
    this.page = route.snapshot.data['page'] as SectionKey;
  }

  get heading(): PageHeading {
    return this.headings[this.page];
  }

  async downloadMembershipCard(): Promise<void> {
    const canvas = await this.renderMembershipCard();
    const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/png', 1));
    if (!blob) return;

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'BayaNova-Membership-Card-Juan-Dela-Cruz.png';
    link.click();
    URL.revokeObjectURL(url);
  }

  async printMembershipCard(): Promise<void> {
    const printWindow = window.open('', '_blank', 'width=1100,height=760');
    if (!printWindow) return;

    printWindow.document.body.innerHTML = '<p style="font-family:sans-serif;padding:24px">Preparing membership card…</p>';

    try {
      const canvas = await this.renderMembershipCard();
      const imageUrl = canvas.toDataURL('image/png', 1);
      printWindow.document.open();
      printWindow.document.write(`<!doctype html>
        <html>
          <head>
            <title>BayaNova Membership Card</title>
            <style>
              @page { size: landscape; margin: 12mm; }
              * { box-sizing: border-box; }
              body { min-height: 100vh; margin: 0; display: grid; place-items: center; background: #fff; }
              img { display: block; width: min(100%, 160mm); height: auto; }
              @media print { body { min-height: auto; } }
            </style>
          </head>
          <body><img src="${imageUrl}" alt="BayaNova membership card"></body>
        </html>`);
      printWindow.document.close();
      const image = printWindow.document.querySelector('img');
      image?.addEventListener(
        'load',
        () => {
          printWindow.focus();
          printWindow.print();
        },
        { once: true },
      );
    } catch {
      printWindow.close();
    }
  }

  private async renderMembershipCard(): Promise<HTMLCanvasElement> {
    const canvas = document.createElement('canvas');
    canvas.width = 1000;
    canvas.height = 600;
    const context = canvas.getContext('2d');
    if (!context) throw new Error('Canvas is not supported by this browser.');

    context.save();
    this.roundedRectangle(context, 0, 0, canvas.width, canvas.height, 38);
    context.clip();

    const background = context.createLinearGradient(0, 0, canvas.width, canvas.height);
    background.addColorStop(0, '#123d99');
    background.addColorStop(0.72, '#2864df');
    background.addColorStop(0.721, '#e22d46');
    background.addColorStop(1, '#c92139');
    context.fillStyle = background;
    context.fillRect(0, 0, canvas.width, canvas.height);

    context.fillStyle = 'rgba(255,255,255,.07)';
    context.beginPath();
    context.arc(120, 90, 210, 0, Math.PI * 2);
    context.fill();

    const logo = await this.loadImage('/images/BAYANOVA_LOGO_TRANSPARENT.png').catch(() => null);
    if (logo) {
      context.save();
      context.filter = 'brightness(0) invert(1)';
      context.drawImage(logo, 54, 36, 250, 98);
      context.restore();
    } else {
      context.fillStyle = '#ffffff';
      context.font = '800 36px Poppins, sans-serif';
      context.fillText('BayaNova', 60, 96);
    }

    context.fillStyle = 'rgba(255,255,255,.9)';
    context.font = '700 18px Poppins, sans-serif';
    context.textAlign = 'right';
    context.fillText('MEMBER', 938, 82);
    context.textAlign = 'left';

    context.fillStyle = 'rgba(255,255,255,.16)';
    this.roundedRectangle(context, 58, 184, 116, 116, 28);
    context.fill();
    context.strokeStyle = 'rgba(255,255,255,.38)';
    context.lineWidth = 3;
    context.stroke();
    context.fillStyle = '#ffffff';
    context.font = '800 34px Poppins, sans-serif';
    context.textAlign = 'center';
    context.fillText('JD', 116, 254);
    context.textAlign = 'left';

    context.fillStyle = 'rgba(255,255,255,.66)';
    context.font = '700 13px Poppins, sans-serif';
    context.fillText('MEMBER NAME', 205, 204);
    context.fillText('MEMBER NUMBER', 205, 276);
    context.fillStyle = '#ffffff';
    context.font = '800 32px Poppins, sans-serif';
    context.fillText('JUAN DELA CRUZ', 205, 246);
    context.font = '700 20px Poppins, sans-serif';
    context.fillText('BN-2026-00482', 205, 310);

    this.drawQrPattern(context, 726, 156, 190);

    context.fillStyle = 'rgba(5,19,54,.24)';
    context.fillRect(0, 510, canvas.width, 90);
    context.fillStyle = 'rgba(255,255,255,.86)';
    context.font = '600 16px Poppins, sans-serif';
    context.fillText('Family Membership', 58, 562);
    context.textAlign = 'right';
    context.fillText('Valid until 03/18/2027', 942, 562);
    context.restore();
    return canvas;
  }

  private drawQrPattern(context: CanvasRenderingContext2D, x: number, y: number, size: number): void {
    context.fillStyle = '#ffffff';
    this.roundedRectangle(context, x, y, size, size, 14);
    context.fill();

    const cells = 21;
    const padding = 14;
    const cell = (size - padding * 2) / cells;
    context.fillStyle = '#101b35';
    for (let row = 0; row < cells; row += 1) {
      for (let column = 0; column < cells; column += 1) {
        const inFinder =
          (row < 7 && column < 7) ||
          (row < 7 && column >= cells - 7) ||
          (row >= cells - 7 && column < 7);
        const finderPixel =
          inFinder &&
          (row % 7 === 0 || column % 7 === 0 || row % 7 === 6 || column % 7 === 6 ||
            (row % 7 >= 2 && row % 7 <= 4 && column % 7 >= 2 && column % 7 <= 4));
        const dataPixel = !inFinder && ((row * 7 + column * 11 + row * column) % 5 < 2);
        if (finderPixel || dataPixel) {
          context.fillRect(x + padding + column * cell, y + padding + row * cell, Math.ceil(cell), Math.ceil(cell));
        }
      }
    }
  }

  private roundedRectangle(
    context: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
    radius: number,
  ): void {
    context.beginPath();
    context.roundRect(x, y, width, height, radius);
  }

  private loadImage(source: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = () => reject(new Error(`Could not load ${source}`));
      image.src = source;
    });
  }
}
