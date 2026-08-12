import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgOptimizedImage } from '@angular/common';

interface Faq {
  q: string;
  a: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  /** Which FAQ accordion item is expanded (null = all closed) */
  faqOpen: number | null = 0;

  faqs: Faq[] = [
    {
      q: 'What is BayaNova?',
      a: "BayaNova is a community welfare membership program built on the Filipino spirit of Bayanihan. Members contribute to a shared fund that provides assistance during qualified emergencies such as hospitalization or loss of a loved one.",
    },
    {
      q: 'Who can join?',
      a: "Any Filipino individual or household looking for affordable community-based welfare assistance can apply for membership, subject to BayaNova's standard registration requirements.",
    },
    {
      q: 'How much is membership?',
      a: 'Membership requires a one-time registration and an affordable monthly subscription fund contribution of ₱200, which covers up to four individuals under one membership.',
    },
    {
      q: 'How does the Subscription Fund work?',
      a: 'Your monthly ₱200 contribution goes into a shared community fund used to provide qualified assistance to members experiencing hospitalization, loss, or other covered hardships.',
    },
    {
      q: 'How do I claim benefits?',
      a: "Members submit a claim along with required supporting documents through BayaNova's claims process. Once verified, qualified assistance is released to the member or their beneficiary.",
    },
    {
      q: 'Can I register online?',
      a: 'Yes. BayaNova offers online registration so you can become a member and add your covered individuals without visiting a branch in person.',
    },
  ];

  /** Called when a nav link is clicked. Smoothly scrolls to the target section. */
  setActive(id: string, event?: Event): void {
    if (event) event.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  toggleFaq(index: number): void {
    this.faqOpen = this.faqOpen === index ? null : index;
  }
}
