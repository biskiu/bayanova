# Implementation status

This is a living snapshot of what exists in the repository. Update it when a capability moves between states.

## Current

- Angular marketing, member, and admin page shells are present.
- Route definitions cover the public, member, and admin URLs in [`product-and-routes.md`](product-and-routes.md).
- PrimeNG Aura theming is configured globally.
- Member/admin section pages render representative in-memory tables, cards, charts, and actions.
- Laravel is installed as a framework skeleton with default migrations and tests.

## Prototype

- Member and admin records shown in tables and statistics are hard-coded demo data.
- Login and signup pages are UI surfaces; route guards and server-backed identity are not established.
- Payment, claims, document upload, renewal, referral, support, announcements, exports, and notifications are not durable workflows.
- Membership QR/card output is browser-generated demonstration behavior.
- Marketing community-program imagery currently uses remote placeholder image URLs.

## Planned before production use

- Agree and document domain entities and API contracts.
- Implement authentication, session/token handling, route guards, and role-based authorization.
- Add persistence and validation for members, dependents, claims, contributions/payments, documents, support, notifications, and audit logs.
- Add secure file storage and access control for identity and claim documents.
- Integrate and verify payment processing and receipt generation.
- Replace hard-coded UI data with loading, error, empty, and mutation states backed by the Laravel API.
- Add end-to-end coverage for critical member and admin flows, including accessibility checks.
