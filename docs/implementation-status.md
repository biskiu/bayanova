# Implementation status

This is a living snapshot of what exists in the repository. Update it when a capability moves between states.

## Current

- Angular marketing, member, and admin page shells are present.
- Route definitions cover the public, member, and admin URLs in [`product-and-routes.md`](product-and-routes.md).
- PrimeNG Aura theming is configured globally.
- Member/admin section pages render representative in-memory tables, cards, charts, and actions.
- The member portal uses cooperative-first navigation and dashboard language, including assembly, household, member ID, community-program, and member-service summaries.
- Laravel is installed as a framework skeleton with default migrations and tests.

## Prototype

- Member and admin records shown in tables and statistics are hard-coded demo data, including membership, participation, assembly, and program values.
- Login and signup pages are UI surfaces; route guards and server-backed identity are not established.
- Claims, document upload, referral, support, announcements, exports, and notifications are not durable workflows.
- Membership card and member ID output are browser-generated demonstration behavior; member IDs do not use QR codes.
- Membership payments have a browser-local prototype flow: admins upload the cooperative payment QR and members view scan instructions. There is no payment gateway or transfer processing.
- Marketing community-program imagery currently uses remote placeholder image URLs.

## Planned before production use

- Agree and document domain entities and API contracts.
- Implement authentication, session/token handling, route guards, and role-based authorization.
- Add persistence and validation for members, dependents, claims, documents, support, notifications, and audit logs.
- Add secure file storage and access control for identity and claim documents.
- Replace hard-coded UI data with loading, error, empty, and mutation states backed by the Laravel API.
- Add end-to-end coverage for critical member and admin flows, including accessibility checks.
