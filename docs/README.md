# BayaNova project documentation

This directory is the project source of truth for future implementations. Read this index first, then the documents relevant to the requested change. Documentation describes the intended product and the current implementation separately where they differ.

## Documents

- [`architecture.md`](architecture.md) — repository boundaries, runtime responsibilities, and data-flow expectations.
- [`product-and-routes.md`](product-and-routes.md) — current user-facing areas and the Angular route map.
- [`frontend.md`](frontend.md) — Angular, PrimeNG, styling, accessibility, and component conventions.
- [`backend.md`](backend.md) — Laravel status, current server surface, and API-readiness notes.
- [`implementation-status.md`](implementation-status.md) — what is prototype-only, what exists today, and the next implementation priorities.
- [`marketing-copy.md`](marketing-copy.md) — approved public marketing voice, positioning, and program language.

## Status vocabulary

- **Current** means verified in the repository at the time this document was last updated.
- **Planned** means an intended capability that is not yet implemented.
- **Prototype** means a user-interface demonstration or local behavior that must not be treated as production business logic.
- **Assumption** means a design or product decision that still needs confirmation.

When a code change changes a documented fact, update the relevant document in the same change. If implementation and documentation conflict, do not silently choose a behavior: record the discrepancy and resolve it with the intended product behavior.
