import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
})
export class Layout {
  mobileOpen = false;

  toggleMobileMenu(): void {
    this.mobileOpen = !this.mobileOpen;
  }

  scrollTo(id: string, event: Event): void {
    event.preventDefault();
    this.mobileOpen = false;
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
