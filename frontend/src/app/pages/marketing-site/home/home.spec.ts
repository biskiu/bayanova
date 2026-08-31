import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Home } from './home';

describe('Home', () => {
  let component: Home;
  let fixture: ComponentFixture<Home>;

  beforeEach(async () => {
    globalThis.IntersectionObserver = class IntersectionObserverStub {
      readonly root = null;
      readonly rootMargin = '';
      readonly thresholds = [];
      disconnect(): void {}
      observe(): void {}
      takeRecords(): IntersectionObserverEntry[] { return []; }
      unobserve(): void {}
    };

    await TestBed.configureTestingModule({
      imports: [Home],
    }).compileComponents();

    fixture = TestBed.createComponent(Home);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
