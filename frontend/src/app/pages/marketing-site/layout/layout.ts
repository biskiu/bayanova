import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet, NgOptimizedImage],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
  host: {
    '(window:resize)': 'onViewportResize()',
  },
})
export class Layout {
  mobileOpen = false;

  toggleMobileMenu(): void {
    this.mobileOpen = !this.mobileOpen;
  }

  onViewportResize(): void {
    if (window.innerWidth >= 1024 && this.mobileOpen) {
      this.mobileOpen = false;
    }
  }

  scrollTo(id: string, event: Event): void {
    event.preventDefault();
    this.mobileOpen = false;

    if (!document.getElementById(id)) {
      window.location.assign(`/#${id}`);
      return;
    }

    // Wait for the mobile menu to close before measuring the sticky header.
    requestAnimationFrame(() => {
      const target = document.getElementById(id);
      const header = document.querySelector<HTMLElement>('.site-header');

      if (!target) return;

      const headerHeight = header?.offsetHeight ?? 0;
      const targetTop = target.getBoundingClientRect().top + window.scrollY - headerHeight;

      window.scrollTo({
        top: Math.max(0, targetTop),
        behavior: 'smooth',
      });
    });
  }
}
