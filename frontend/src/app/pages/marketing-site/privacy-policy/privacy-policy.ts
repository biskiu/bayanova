import { Component, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.html',
  styleUrl: './privacy-policy.scss',
})
export class PrivacyPolicy {
  private readonly title = inject(Title);

  constructor() {
    this.title.setTitle('Privacy Policy | BayaNova');
  }
}
