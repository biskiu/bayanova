import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({ selector: 'app-admin-dashboard', imports: [RouterLink], templateUrl: './dashboard.html', styleUrl: './dashboard.scss' })
export class AdminDashboard {
  exportNotice = false;

  exportSummary(): void {
    this.exportNotice = true;
    window.setTimeout(() => this.exportNotice = false, 2600);
  }
}
