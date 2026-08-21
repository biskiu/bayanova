import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  @ViewChild('memberIdDialog') private memberIdDialog?: ElementRef<HTMLDialogElement>;

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
}
