import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

interface SectionData {
  action: string;
  stats: { label: string; value: string; detail: string }[];
  columns: string[];
  rows: string[][];
}

@Component({ selector: 'app-admin-section', imports: [], templateUrl: './section.html', styleUrl: './section.scss' })
export class AdminSection {
  readonly title: string;
  readonly icon: string;
  readonly config: SectionData;

  private readonly sections: Record<string, SectionData> = {
    Members: this.data('Add member', [['Total members','12,482','+4.8% this month'],['Active members','11,930','95.6% of total'],['Pending applications','127','18 added today']], ['Member','Membership','Joined','Status'], [['Juan Dela Cruz · BN-00482','Family Plan','Aug 18, 2026','Active'],['Maria Santos · BN-00481','Individual Plan','Aug 18, 2026','Pending'],['Roberto Garcia · BN-00480','Family Plan','Aug 17, 2026','Active'],['Ana Reyes · BN-00479','Individual Plan','Aug 17, 2026','Needs review']]),
    Claims: this.data('Create claim', [['Open claims','184','32 need review'],['Approved this month','426','₱1.8M total value'],['Average processing','2.4 days','−0.6 days vs July']], ['Claim','Member','Amount','Status'], [['CLM-2026-0084 · Consultation','Juan Dela Cruz','₱750.00','In review'],['CLM-2026-0083 · Laboratory','Maria Santos','₱1,250.00','Approved'],['CLM-2026-0082 · Medicine','Roberto Garcia','₱860.00','Pending'],['CLM-2026-0081 · Dental care','Ana Reyes','₱1,500.00','Needs review']]),
    Payments: this.data('Record payment', [['Collected this month','₱2.4M','+8.1% vs July'],['Successful payments','4,812','98.7% success rate'],['Failed payments','63','12 retrying today']], ['Reference','Member','Method','Amount / Status'], [['PAY-0821-1842','Juan Dela Cruz','GCash','₱500 · Successful'],['PAY-0821-1841','Maria Santos','Maya','₱1,000 · Successful'],['PAY-0821-1840','Roberto Garcia','Card','₱500 · Failed'],['PAY-0821-1839','Ana Reyes','GCash','₱2,000 · Successful']]),
    Accounting: this.data('New entry', [['Cash on hand','₱8.42M','Across all accounts'],['Receivables','₱412K','₱86K overdue'],['Operating expenses','₱1.17M','August to date']], ['Account','Category','Period','Balance'], [['Membership Contributions','Revenue','August 2026','₱2,402,500'],['Claims Disbursement','Expense','August 2026','₱1,824,750'],['Operations Fund','Asset','Current','₱4,180,200'],['Partner Payables','Liability','Current','₱638,400']]),
    Reports: this.data('Generate report', [['Generated this month','38','12 scheduled reports'],['Shared reports','17','6 external recipients'],['Scheduled next','5','Within 7 days']], ['Report','Owner','Generated','Status'], [['Monthly Membership Summary','Admin User','Aug 20, 2026','Ready'],['Claims Performance Report','Liza Ramos','Aug 19, 2026','Ready'],['Payment Reconciliation','Marco Lim','Aug 18, 2026','Processing'],['Quarterly Compliance Review','Admin User','Aug 15, 2026','Ready']]),
    Notifications: this.data('New announcement', [['Sent this month','24,680','Email, SMS, and in-app'],['Delivery rate','98.2%','+0.4% this month'],['Scheduled','6','Next send tomorrow']], ['Campaign','Channel','Audience','Status'], [['Community Health Day','Email + In-app','12,482 members','Scheduled'],['Payment Reminder — August','SMS','1,204 members','Sent'],['New Partner Clinics','In-app','All members','Sent'],['Portal Maintenance','Email','All members','Draft']]),
    Approvals: this.data('Review queue', [['Waiting for approval','8','3 high priority'],['Approved today','17','By 4 administrators'],['Average wait','3.2 hrs','Within target SLA']], ['Request','Submitted by','Submitted','Priority'], [['Member plan adjustment · APR-2941','Liza Ramos','12 minutes ago','High'],['Claims batch · APR-2940','Marco Lim','31 minutes ago','Normal'],['Partner clinic onboarding · APR-2939','Sarah Go','1 hour ago','High'],['Refund request · APR-2938','Nico Cruz','2 hours ago','Normal']]),
    CRM: this.data('Add contact', [['Active contacts','12,938','+186 this month'],['Open conversations','74','16 awaiting reply'],['Satisfaction score','4.7 / 5','From 892 responses']], ['Contact','Last interaction','Owner','Stage'], [['Juan Dela Cruz · Member','Payment inquiry','Nico Cruz','Resolved'],['HealthPlus Clinic · Partner','Contract follow-up','Sarah Go','In progress'],['Maria Santos · Applicant','Document verification','Liza Ramos','Waiting'],['Bacolod Diagnostics · Partner','Onboarding call','Marco Lim','New']]),
    'Audit Logs': this.data('Export logs', [['Events today','2,841','Across 28 administrators'],['Security alerts','2','Both acknowledged'],['Data exports','14','Last export 24 min ago']], ['Event','Administrator','Time','Result'], [['Updated member BN-00482','Admin User','8:42 PM','Success'],['Exported claims report','Liza Ramos','8:31 PM','Success'],['Changed role permissions','Admin User','7:58 PM','Success'],['Failed sign-in attempt','Unknown · 192.168.1.24','7:41 PM','Blocked']]),
    Analytics: this.data('Open explorer', [['Member growth','+18.4%','Year over year'],['Retention rate','94.8%','+1.2% vs last quarter'],['Claims ratio','31.6%','Within target range']], ['Metric','Current period','Previous period','Change'], [['New memberships','486','412','+18.0%'],['Renewals','1,204','1,131','+6.5%'],['Claims submitted','642','598','+7.4%'],['Fund contributions','₱2.4M','₱2.2M','+8.1%']]),
    'Roles & Permissions': this.data('Create role', [['Administrator accounts','28','24 currently active'],['Custom roles','7','Across 5 departments'],['Pending invitations','3','Expire in 5 days']], ['Role','Users','Access level','Status'], [['Super Administrator','3 users','Full system access','Active'],['Membership Manager','8 users','Members and documents','Active'],['Claims Officer','7 users','Claims and approvals','Active'],['Finance Analyst','5 users','Payments and reports','Active']]),
    'Document Management': this.data('Upload document', [['Total documents','38,294','84.2 GB storage used'],['Awaiting verification','126','19 submitted today'],['Expiring soon','42','Within 30 days']], ['Document','Owner','Uploaded','Status'], [['National ID · ID-88241','Juan Dela Cruz','Aug 21, 2026','Verified'],['Proof of Address · DOC-19284','Maria Santos','Aug 21, 2026','In review'],['Clinic Accreditation · DOC-19283','HealthPlus Clinic','Aug 20, 2026','Verified'],['Birth Certificate · DOC-19282','Ana Reyes','Aug 20, 2026','Needs review']]),
  };

  constructor(route: ActivatedRoute) {
    this.title = route.snapshot.data['title'];
    this.icon = route.snapshot.data['icon'];
    this.config = this.sections[this.title];
  }

  statusClass(value: string): string {
    const text = value.toLowerCase();
    if (['active','approved','ready','sent','success','successful','verified','resolved'].some((word) => text.includes(word))) return 'success';
    if (['failed','blocked','high','needs review'].some((word) => text.includes(word))) return 'danger';
    if (['pending','review','processing','scheduled','waiting','progress'].some((word) => text.includes(word))) return 'warning';
    return 'neutral';
  }

  private data(action: string, stats: string[][], columns: string[], rows: string[][]): SectionData {
    return { action, stats: stats.map(([label, value, detail]) => ({ label, value, detail })), columns, rows };
  }
}
