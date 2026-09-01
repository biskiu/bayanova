# Frontend implementation guide

## Stack

Current dependencies include Angular 21, TypeScript 5.9, Angular Router, PrimeNG 21 with the Aura theme, RxJS, and Chart.js. The app is standalone-component based and uses lazy-loaded route components for most feature pages.

Use `frontend/AGENTS.md` as the detailed coding standard. In particular:

- use strict TypeScript and avoid `any`;
- prefer signals for local state and `inject()` for new services;
- use Angular control flow (`@if`, `@for`, `@switch`);
- use PrimeNG for suitable controls in admin/member pages;
- preserve semantic HTML, keyboard access, labels, focus states, and WCAG AA contrast;
- use `NgOptimizedImage` for static images;
- keep feature components focused and route-loadable.

## Styling

Global styles live in `frontend/src/styles.scss`. The application currently enforces a light color scheme and defines shared portal variables for typography, inputs, borders, and radii. Marketing, member, and admin surfaces have separate layout components and page-level SCSS.

Use the existing BayaNova palette and tokens before introducing new global variables. Keep layout-specific rules local to the owning page or layout.

## Current interaction model

Several pages are UI prototypes with hard-coded display data. Browser behaviors include local modal state, toast messages, clipboard/share actions, client-side CSV generation, print windows, and canvas-based membership-card output. These are not substitutes for server validation, authorization, secure file storage, or durable records.

## Validation

From `frontend/`:

```bash
npm run build
npm test
```

Run the narrowest relevant command first, then a production build for route/template changes when practical.

Membership payments are presented through an administrator-managed QR image. Transfers happen outside the portal, and the prototype stores the uploaded QR in browser-local storage.
