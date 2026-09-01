# Architecture

## Current repository shape

The repository is a two-application workspace:

| Area | Location | Current responsibility |
| --- | --- | --- |
| Frontend | `frontend/` | Angular single-page application for marketing, member, and admin experiences |
| Backend | `backend/` | Laravel application skeleton; currently only exposes the default web view route |
| Shared project guidance | `docs/`, root `AGENTS.md` | Product, architecture, and implementation guidance |
| UI-specific rules | `frontend/AGENTS.md`, `rules/` | Frontend and PrimeNG conventions |

## Runtime boundaries

The Angular app owns routing and the rendered user experience. It currently contains representative in-memory data and browser-only interactions such as modals, CSV/PDF export, clipboard sharing, and membership-card rendering.

The Laravel app is the future home for HTTP endpoints, authentication, authorization, persistence, claims, documents, notifications, payment references, verification, and audit history. Those capabilities are **Planned** unless the backend code and routes establish otherwise. Membership payments are completed externally through an administrator-managed cooperative QR; there is no gateway integration in the prototype.

There is no documented frontend-to-backend API contract yet. Do not create client calls or infer endpoint names without first defining the contract in `/docs` and implementing the matching backend surface.

## Feature boundary

Keep the three frontend surfaces separate:

- Marketing pages: public acquisition and informational content.
- Member portal: authenticated member self-service.
- Admin portal: authenticated staff operations and reporting.

Shared concerns should be introduced deliberately through small services or shared types. Avoid coupling marketing content to member/admin state.

## Source-of-truth hierarchy

1. Explicit product decisions recorded in `/docs`.
2. This repository's current implementation, when the docs identify the behavior as Current.
3. Framework defaults and generated READMEs.

If a feature is ambiguous, preserve the existing behavior and document the ambiguity rather than fabricating production rules.
