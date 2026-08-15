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
      title: 'Neon Frequencies',
      date: 'Aug 22, 2026 · 8:00 PM',
      venue: 'Pier 17 Warehouse',
      desc: 'Three stages of bass-heavy sound and immersive light design take over the harbor for one night only, closing out the summer festival run.',
      img: 'https://picsum.photos/seed/neonfreq/800/1000',
    },
    {
      title: 'Midnight Jazz Sessions',
      date: 'Sep 5, 2026 · 9:30 PM',
      venue: 'The Velvet Room',
      desc: "An intimate late-night set from a rotating quartet, recorded live for the venue's long-running session series. Seating is limited.",
      img: 'https://picsum.photos/seed/midnightjazz/800/1000',
    },
    {
      title: 'Open Air Cinema: Sci-Fi Night',
      date: 'Sep 12, 2026 · 7:45 PM',
      venue: 'Rooftop at Meridian',
      desc: 'A double feature under the stars, projected against the skyline with blankets, snacks, and a pre-show talk from a local film critic.',
      img: 'https://picsum.photos/seed/openaircinema/800/1000',
    },
    {
      title: 'Street Food & Sound',
      date: 'Sep 20, 2026 · 12:00 PM',
      venue: 'Harbor Market',
      desc: "Forty vendors, a full day of local DJ sets, and a lineup built around the city's best independent kitchens. Rain or shine.",
      img: 'https://picsum.photos/seed/streetfoodsound/800/1000',
    },
    {
      title: 'Analog Art Fair',
      date: 'Oct 3, 2026 · 10:00 AM',
      venue: 'Foundry Hall',
      desc: 'Print, film photography, and hand-bound zines from over sixty independent artists, with live risograph demos running all weekend.',
      img: 'https://picsum.photos/seed/analogartfair/800/1000',
    },
  ];

  faqs: Faq[] = [
    {
      q: 'What is BayaNova?',
      a: 'BayaNova is a community welfare membership program built on the Filipino spirit of Bayanihan. Members contribute to a shared fund that provides assistance during qualified emergencies such as hospitalization or loss of a loved one.',
      icon: 'help',
    },
    {
      q: 'Who can join?',
      a: "Any Filipino individual or household looking for affordable community-based welfare assistance can apply for membership, subject to BayaNova's standard registration requirements.",
      icon: 'groups',
    },
    {
      q: 'How much is membership?',
      a: 'Membership requires a one-time registration and an affordable monthly subscription fund contribution of ₱200, which covers up to four individuals under one membership.',
      icon: 'payments',
    },
    {
      q: 'How does the Subscription Fund work?',
      a: 'Your monthly ₱200 contribution goes into a shared community fund used to provide qualified assistance to members experiencing hospitalization, loss, or other covered hardships.',
      icon: 'account_balance_wallet',
    },
    {
      q: 'How do I claim benefits?',
      a: "Members submit a claim along with required supporting documents through BayaNova's claims process. Once verified, qualified assistance is released to the member or their beneficiary.",
      icon: 'verified_user',
    },
    {
      q: 'Can I register online?',
      a: 'Yes. BayaNova offers online registration so you can become a member and add your covered individuals without visiting a branch in person.',
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
