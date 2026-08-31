import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ChartModule } from 'primeng/chart';

interface SectionData {
  action: string;
  stats: { label: string; value: string; detail: string }[];
  columns: string[];
  rows: string[][];
}

type ModalKind = 'action' | 'record' | 'filter' | 'export' | null;

@Component({
  selector: 'app-admin-section',
  imports: [ChartModule, FormsModule],
  templateUrl: './section.html',
  styleUrl: './section.scss',
  host: { '(document:keydown.escape)': 'handleEscape()' },
})
export class AdminSection {
  readonly title: string;
  readonly icon: string;
  readonly config: SectionData;
  modalKind: ModalKind = null;
  selectedRow: string[] = [];
  searchQuery = '';
  toastMessage = '';
  exportFormat: 'csv' | 'pdf' = 'csv';

  readonly chartData = {
    labels: ['Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
    datasets: [{ label: 'Active members', data: [11420, 11680, 11840, 11960, 12080, 12482], backgroundColor: '#2864df', borderRadius: 6, borderSkipped: false, barThickness: 28 }],
  };

  readonly chartOptions = {
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      x: { grid: { display: false }, ticks: { color: '#7f8b9e', font: { size: 10 } } },
      y: { beginAtZero: false, min: 11000, grid: { color: '#edf0f5' }, ticks: { color: '#7f8b9e', font: { size: 9 } } },
    },
  };

  readonly reportsTrendData = {
    labels: ['Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
    datasets: [
      { label: 'Contributions', data: [1.72, 1.85, 1.91, 2.08, 2.22, 2.4], borderColor: '#2864df', backgroundColor: 'rgba(40,100,223,.12)', fill: true, tension: .38, pointRadius: 3, pointHoverRadius: 5 },
      { label: 'Claims paid', data: [1.12, 1.28, 1.34, 1.46, 1.61, 1.82], borderColor: '#e22d46', backgroundColor: 'rgba(226,45,70,.08)', fill: true, tension: .38, pointRadius: 3, pointHoverRadius: 5 },
    ],
  };

  readonly reportsTrendOptions = {
    maintainAspectRatio: false,
    interaction: { intersect: false, mode: 'index' as const },
    plugins: { legend: { position: 'bottom' as const, align: 'start' as const, labels: { color: '#5b687d', usePointStyle: true, pointStyle: 'circle', padding: 18, font: { size: 12 } } } },
    scales: {
      x: { grid: { display: false }, ticks: { color: '#718097', font: { size: 11 } } },
      y: { beginAtZero: true, grid: { color: '#edf0f5' }, ticks: { color: '#718097', font: { size: 11 }, callback: (value: string | number) => `₱${value}M` } },
    },
  };

  readonly claimsMixData = {
    labels: ['Consultation', 'Laboratory', 'Medicine', 'Dental'],
    datasets: [{ data: [38, 26, 22, 14], backgroundColor: ['#2864df', '#6d92e9', '#e22d46', '#f2a93b'], borderWidth: 0, hoverOffset: 5 }],
  };

  readonly claimsMixOptions = {
    maintainAspectRatio: false,
    cutout: '68%',
    plugins: { legend: { position: 'bottom' as const, labels: { color: '#5b687d', usePointStyle: true, pointStyle: 'circle', padding: 14, font: { size: 11 } } } },
  };

  private readonly sections: Record<string, SectionData> = {
    Members: this.data('Add member', [['Total members','12,482','+4.8% this month'],['Active members','11,930','95.6% of total'],['Pending applications','127','18 added today']], ['Member','Contact','Membership','Status'], [['Juan Dela Cruz · BN-00482','juan@email.com · 0917 123 4567','Family Plan','Active'],['Maria Santos · BN-00481','maria@email.com · 0918 442 1052','Individual Plan','Pending'],['Roberto Garcia · BN-00480','roberto@email.com · 0919 783 2180','Family Plan','Active'],['Ana Reyes · BN-00479','ana@email.com · 0920 422 9931','Individual Plan','Needs review']]),
    Claims: this.data('Create claim', [['Open claims','184','32 need review'],['Approved this month','426','₱1.8M total value'],['Average processing','2.4 days','−0.6 days vs July']], ['Claim / Type','Member','Amount / Documents','Status'], [['CLM-2026-0084 · Consultation','Juan Dela Cruz','₱750.00 · 2 files','Under review'],['CLM-2026-0083 · Laboratory','Maria Santos','₱1,250.00 · 3 files','Approved'],['CLM-2026-0082 · Medicine','Roberto Garcia','₱860.00 · 1 file','Pending'],['CLM-2026-0081 · Dental care','Ana Reyes','₱1,500.00 · 2 files','Rejected']]),
    Payments: this.data('Record payment', [['Collected this month','₱2.4M','+8.1% vs July'],['Successful payments','4,812','98.7% success rate'],['Failed payments','63','12 retrying today']], ['Reference / Date','Member','Method','Amount / Status'], [['PAY-0821-1842 · Aug 21, 2026','Juan Dela Cruz','GCash','₱500 · Successful'],['PAY-0821-1841 · Aug 21, 2026','Maria Santos','Maya','₱1,000 · Successful'],['PAY-0821-1840 · Aug 21, 2026','Roberto Garcia','Card','₱500 · Failed'],['PAY-0821-1839 · Aug 20, 2026','Ana Reyes','GCash','₱2,000 · Successful']]),
    Accounting: this.data('New transaction', [['Total income','₱2.40M','August 2026'],['Total expenses','₱1.82M','August 2026'],['Balance','₱577,750','Income less expenses']], ['Date','Type / Description','Reference','Amount'], [['Aug 21, 2026','Income · Membership contribution','PAY-0821-1842','+ ₱500'],['Aug 20, 2026','Expense · Claim disbursement','CLM-2026-0079','− ₱2,500'],['Aug 20, 2026','Income · Registration fee','REG-2026-1028','+ ₱1,000'],['Aug 19, 2026','Expense · Office supplies','EXP-2026-0204','− ₱3,200']]),
    Reports: this.data('Generate report', [['Generated this month','38','Membership, claims, finance'],['CSV exports','21','Ready to download'],['PDF exports','17','Ready to download']], ['Report','Type / Period','Generated','Status'], [['Monthly Membership Summary','Membership · August 2026','Aug 20, 2026','Ready'],['Claims Performance Report','Claims · August 2026','Aug 19, 2026','Ready'],['Payment Reconciliation','Payments · August 2026','Aug 18, 2026','Processing'],['Quarterly Operations Report','Combined · Q3 2026','Aug 15, 2026','Ready']]),
    Notifications: this.data('Create notification', [['Sent this month','24,680','In-app notifications'],['Read rate','81.4%','+3.1% this month'],['Drafts','3','Not yet sent']], ['Notification','Audience','Created','Status'], [['Community Health Day','All members','Aug 21, 2026','Sent'],['Payment Reminder — August','Overdue members','Aug 20, 2026','Sent'],['New Partner Clinics','All members','Aug 18, 2026','Sent'],['Portal Maintenance','All members','Aug 17, 2026','Draft']]),
    Approvals: this.data('Review queue', [['Pending','8','3 high priority'],['Approved today','17','By 4 administrators'],['Rejected today','2','Reasons recorded']], ['Request','Submitted by','Submitted','Status'], [['Member application · APR-2941','Liza Ramos','12 minutes ago','Pending'],['Claim approval · APR-2940','Marco Lim','31 minutes ago','Pending'],['Document verification · APR-2939','Sarah Go','1 hour ago','Pending'],['Payment verification · APR-2938','Nico Cruz','2 hours ago','Pending']]),
    'Support Tickets': this.data('Review queue', [['Open tickets','14','4 submitted today'],['In review','6','Assigned to administrators'],['Resolved this month','82','Average resolution: 1.8 days']], ['Ticket / Subject','Member','Topic / Submitted','Status'], [['SUP-0821 · Payment not reflected','Juan Dela Cruz','Payment · Aug 20, 2026','In review'],['SUP-0820 · Update dependent details','Maria Santos','Membership · Aug 20, 2026','Open'],['SUP-0819 · Claim document question','Roberto Garcia','Claim · Aug 19, 2026','Open'],['SUP-0818 · Receipt download issue','Ana Reyes','Payment · Aug 18, 2026','Resolved']]),
    CRM: this.data('Add member note', [['Members contacted','186','This month'],['Open follow-ups','16','Due this week'],['Notes added','74','Across 42 members']], ['Member','Latest note','Administrator','Date'], [['Juan Dela Cruz · BN-00482','Called about renewal','Nico Cruz','Aug 20, 2026'],['Maria Santos · BN-00481','Submitted valid ID','Liza Ramos','Aug 19, 2026'],['Roberto Garcia · BN-00480','Asked about claim','Marco Lim','Aug 18, 2026'],['Ana Reyes · BN-00479','Payment follow-up','Sarah Go','Aug 17, 2026']]),
    'Audit Logs': this.data('Export logs', [], ['Administrator','Action','Target','Date'], [['Admin User','Updated member','BN-00482','Aug 21, 8:42 PM'],['Liza Ramos','Created member','BN-00483','Aug 21, 8:31 PM'],['Admin User','Deleted member','BN-00479','Aug 21, 7:58 PM']]),
    Analytics: this.data('', [['Members','12,482','11,930 active'],['Pending members','127','1.0% of total'],['Pending claims','184','32 need review']], ['Metric','Current month','Previous month','Change'], [['New memberships','486','412','+18.0%'],['Renewals','1,204','1,131','+6.5%'],['Claims submitted','642','598','+7.4%'],['Revenue','₱2.4M','₱2.2M','+8.1%']]),
    'Roles & Permissions': this.data('Invite administrator', [['Administrator accounts','28','24 currently active'],['Fixed roles','4','MVP access model'],['Pending invitations','3','Expire in 5 days']], ['Role','Users','Permissions','Status'], [['Super Admin','3 users','All modules','Active'],['Admin','8 users','Members, claims, notifications','Active'],['Claims Officer','7 users','Claims, approvals, documents','Active'],['Finance','5 users','Payments, accounting, reports','Active']]),
    'Document Management': this.data('Attach document', [['Total documents','38,294','Member and claim files'],['Awaiting verification','126','19 submitted today'],['Expiring soon','42','Within 30 days']], ['Document','Attached to','Uploaded','Status'], [['National ID · ID-88241','Member · Juan Dela Cruz','Aug 21, 2026','Verified'],['Proof of Address · DOC-19284','Member · Maria Santos','Aug 21, 2026','Under review'],['Medical Receipt · DOC-19283','Claim · CLM-2026-0084','Aug 20, 2026','Verified'],['Claim Form · DOC-19282','Claim · CLM-2026-0081','Aug 20, 2026','Needs review']]),
  };

  constructor(route: ActivatedRoute, private readonly router: Router) {
    this.title = route.snapshot.data['title'];
    this.icon = route.snapshot.data['icon'];
    this.config = this.sections[this.title];
  }

  get filteredRows(): string[][] {
    const query = this.searchQuery.trim().toLowerCase();
    return query ? this.config.rows.filter((row) => row.some((cell) => cell.toLowerCase().includes(query))) : this.config.rows;
  }

  get modalTitle(): string {
    if (this.modalKind === 'record') return `${this.title} details`;
    if (this.modalKind === 'filter') return `Filter ${this.title.toLowerCase()}`;
    if (this.modalKind === 'export') return `Export ${this.title.toLowerCase()}`;
    return this.config.action;
  }

  openModal(kind: Exclude<ModalKind, null>, row: string[] = []): void {
    this.selectedRow = row;
    this.modalKind = kind;
  }

  signInMember(): void {
    this.router.navigate(['/member/dashboard']);
  }

  closeModal(): void { this.modalKind = null; }

  completeAction(message?: string): void {
    this.closeModal();
    this.toastMessage = message ?? `${this.config.action} completed in this UI prototype.`;
    window.setTimeout(() => this.toastMessage = '', 2800);
  }

  exportData(): void {
    if (this.exportFormat === 'csv') this.downloadCsv();
    else this.printReport();
  }

  updateSearch(event: Event): void { this.searchQuery = (event.target as HTMLInputElement).value; }

  statusClass(value: string): string {
    const text = value.toLowerCase();
    if (['active','approved','ready','sent','success','successful','verified','resolved'].some((word) => text.includes(word))) return 'success';
    if (['failed','blocked','high','needs review','rejected'].some((word) => text.includes(word))) return 'danger';
    if (['pending','review','processing','scheduled','waiting','progress'].some((word) => text.includes(word))) return 'warning';
    return 'neutral';
  }

  private downloadCsv(): void {
    const rows = [this.config.columns, ...this.filteredRows];
    const csv = rows.map((row) => row.map((cell) => `"${cell.replace(/"/g, '""')}"`).join(',')).join('\r\n');
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8;' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = `bayanova-${this.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.csv`;
    link.click();
    URL.revokeObjectURL(url);
    this.completeAction('CSV export downloaded successfully.');
  }

  private printReport(): void {
    const printWindow = window.open('', '_blank', 'width=1000,height=760');
    if (!printWindow) return;
    const header = this.config.columns.map((column) => `<th>${this.escapeHtml(column)}</th>`).join('');
    const rows = this.filteredRows.map((row) => `<tr>${row.map((cell) => `<td>${this.escapeHtml(cell)}</td>`).join('')}</tr>`).join('');
    printWindow.document.write(`<!doctype html><html><head><title>BayaNova ${this.escapeHtml(this.title)} report</title><style>body{font-family:Inter,Arial,sans-serif;color:#14213d;padding:32px}h1{font-size:24px;margin:0 0 6px}p{color:#748198;font-size:13px;margin:0 0 24px}table{width:100%;border-collapse:collapse;font-size:12px}th,td{padding:11px;border:1px solid #e4e9f1;text-align:left}th{background:#f3f6fb;color:#526078;font-size:10px;text-transform:uppercase}@media print{body{padding:0}}</style></head><body><h1>BayaNova ${this.escapeHtml(this.title)} report</h1><p>Generated ${new Date().toLocaleString()}</p><table><thead><tr>${header}</tr></thead><tbody>${rows}</tbody></table></body></html>`);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
    this.completeAction('Print dialog opened.');
  }

  private escapeHtml(value: string): string {
    return value.replace(/[&<>'"]/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[character] ?? character);
  }

  handleEscape(): void { this.closeModal(); }

  private data(action: string, stats: string[][], columns: string[], rows: string[][]): SectionData {
    return { action, stats: stats.map(([label, value, detail]) => ({ label, value, detail })), columns, rows };
  }
}
