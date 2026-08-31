import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  @ViewChild('memberIdDialog') private memberIdDialog?: ElementRef<HTMLDialogElement>;
  qrSaved = false;
  notificationHint = false;

  openMemberId(): void {
    const dialog = this.memberIdDialog?.nativeElement;
    if (dialog && !dialog.open) {
      dialog.showModal();
    }
  }

  closeMemberId(): void {
    this.memberIdDialog?.nativeElement.close();
  }

  handleDialogClick(event: MouseEvent): void {
    if (event.target === this.memberIdDialog?.nativeElement) {
      this.closeMemberId();
    }
  }

  saveQr(): void {
    this.closeMemberId();
    this.qrSaved = true;
    window.setTimeout(() => this.qrSaved = false, 2400);
  }

  showNotificationHint(): void {
    this.notificationHint = true;
    window.setTimeout(() => this.notificationHint = false, 2400);
  }
}
