import { Component, AfterViewInit, HostListener } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';

interface Faq {
  q: string;
  a: string;
  icon: string;
}

interface EventItem {
  title: string;
  date: string;
  venue: string;
  desc: string;
  img: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements AfterViewInit {
  readonly events: EventItem[] = [
    {
      title: 'Community Health Day',
      date: 'September 2026 · Community Program',
      venue: 'BayaNova Community',
      desc: 'Members and families come together for health education, outreach, and meaningful opportunities to care for one another.',
      img: 'https://picsum.photos/seed/neonfreq/800/1000',
    },
    {
      title: 'Education and Awareness',
      date: 'October 2026 · Community Program',
      venue: 'BayaNova Community',
      desc: 'Programs that encourage learning, participation, and practical knowledge for members and the communities we serve.',
      img: 'https://picsum.photos/seed/midnightjazz/800/1000',
    },
    {
      title: 'Livelihood and Skills Development',
      date: 'October 2026 · Community Program',
      venue: 'BayaNova Community',
      desc: 'Initiatives that help members build skills, explore opportunities, and grow toward self-reliance.',
      img: 'https://picsum.photos/seed/openaircinema/800/1000',
    },
    {
      title: 'Feeding and Community Support',
      date: 'November 2026 · Community Program',
      venue: 'BayaNova Community',
      desc: 'Activities that bring people together and extend support where it can make a difference.',
      img: 'https://picsum.photos/seed/streetfoodsound/800/1000',
    },
    {
      title: 'Community Development',
      date: 'December 2026 · Community Program',
      venue: 'BayaNova Community',
      desc: 'Projects that contribute to the long-term development and well-being of our communities.',
      img: 'https://picsum.photos/seed/analogartfair/800/1000',
    },
  ];

  faqs: Faq[] = [
    {
      q: 'What is BayaNova?',
      a: 'BayaNova Cooperative brings people together through shared opportunities, community programs, and meaningful member participation. We believe communities become stronger, more capable, and more prepared when people work together.',
      icon: 'help',
    },
    {
      q: 'Who can join?',
      a: 'Individuals, families, organizations, businesses, and community leaders who believe in participation, shared growth, and building stronger communities can become part of BayaNova.',
      icon: 'groups',
    },
    {
      q: 'What does membership mean?',
      a: 'Membership is an opportunity to participate in a growing community, support meaningful programs, and help create shared opportunities for members and communities.',
      icon: 'payments',
    },
    {
      q: 'What programs does BayaNova support?',
      a: 'BayaNova brings members together to participate in programs, services, and initiatives designed to create shared value and strengthen the communities we serve.',
      icon: 'account_balance_wallet',
    },
    {
      q: 'How can I participate?',
      a: 'You can participate by becoming a member, contributing to community initiatives, supporting programs, sharing opportunities, or partnering with BayaNova to help communities grow.',
      icon: 'verified_user',
    },
    {
      q: 'How can organizations partner with BayaNova?',
      a: 'Schools, organizations, businesses, community groups, and leaders can partner with BayaNova to create value for members and communities through meaningful programs and shared opportunities.',
      icon: 'computer',
    },
  ];

  activeIndex = 0;
  textIndex = 0;

  private touchStartX: number | null = null;

  ngAfterViewInit(): void {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.12 }
    );

    document.querySelectorAll('.fade-up').forEach((el) => observer.observe(el));
  }

  get activeEvent(): EventItem {
    return this.events[this.textIndex];
  }

  trackByTitle(_index: number, item: EventItem): string {
    return item.title;
  }

  private shortestDelta(from: number, to: number, len: number): number {
    let d = to - from;
    if (d > len / 2) d -= len;
    if (d < -len / 2) d += len;
    return d;
  }

  positionFor(index: number): string {
    const delta = this.shortestDelta(this.activeIndex, index, this.events.length);
    return Math.abs(delta) > 2 ? 'far' : String(delta);
  }

  isActive(index: number): boolean {
    return index === this.activeIndex;
  }

  goTo(index: number): void {
    const len = this.events.length;
    const wrapped = ((index % len) + len) % len;
    if (wrapped === this.activeIndex) return;

    this.activeIndex = wrapped;
    this.textIndex = wrapped;
  }

  next(): void {
    this.goTo(this.activeIndex + 1);
  }

  prev(): void {
    this.goTo(this.activeIndex - 1);
  }

  onSlideClick(index: number): void {
    if (index !== this.activeIndex) this.goTo(index);
  }

  @HostListener('document:keydown', ['$event'])
  onKeydown(e: KeyboardEvent): void {
    if (e.key === 'ArrowLeft') this.prev();
    if (e.key === 'ArrowRight') this.next();
  }

  onTouchStart(e: TouchEvent): void {
    this.touchStartX = e.touches[0].clientX;
  }

  onTouchEnd(e: TouchEvent): void {
    if (this.touchStartX === null) return;
    const dx = e.changedTouches[0].clientX - this.touchStartX;
    if (Math.abs(dx) > 40) {
      dx < 0 ? this.next() : this.prev();
    }
    this.touchStartX = null;
  }

  /** Smoothly scrolls to the target section. */
  setActive(id: string, event?: Event): void {
    if (event) event.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
