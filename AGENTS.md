# BayaNova agent instructions

Before changing the repository, read the relevant documentation in [`docs/`](docs/README.md). Treat those documents as the source of truth for architecture, product behavior, routes, UI conventions, and known implementation status.

## Required workflow

1. Read [`docs/README.md`](docs/README.md) and identify the documentation relevant to the requested change.
2. Read each relevant document before inspecting or editing the implementation. If the code and docs disagree, verify the current code and update the docs in the same change when the documented behavior is still intended.
3. Check for a more specific `AGENTS.md` in the directory being changed. Its instructions apply in addition to this file; currently, frontend work must also follow [`frontend/AGENTS.md`](frontend/AGENTS.md).
4. Keep `/docs` current whenever routes, user-visible behavior, architecture, integrations, or development commands change.
5. Do not invent backend APIs, persistence, authentication, payment processing, or production business rules from prototype UI data. Document assumptions and confirm them against the source of truth first.
6. Before handoff, run the narrowest relevant validation and report any checks that could not be run.

## Documentation conventions

- Put durable project knowledge in `/docs`, not only in chat or code comments.
- Prefer short, topic-focused Markdown files.
- Label facts as `Current`, `Planned`, or `Assumption` when the distinction matters.
- Update the documentation index when adding a new document.

