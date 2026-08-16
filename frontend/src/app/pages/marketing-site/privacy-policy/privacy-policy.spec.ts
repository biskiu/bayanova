import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivacyPolicy } from './privacy-policy';

describe('PrivacyPolicy', () => {
  let fixture: ComponentFixture<PrivacyPolicy>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [PrivacyPolicy] }).compileComponents();
    fixture = TestBed.createComponent(PrivacyPolicy);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the policy heading', () => {
    expect(fixture.nativeElement.querySelector('h1')?.textContent).toContain('Privacy');
  });
});
