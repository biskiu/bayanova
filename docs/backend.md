# Backend implementation guide

## Current state

The backend is a Laravel 13 application targeting PHP 8.3. It includes the default `User` model, initial users/cache/jobs migrations, Laravel configuration, and example tests. `backend/routes/web.php` currently defines only `GET /`, which renders the default welcome view.

No application API endpoints, domain models, authentication flow, authorization policies, file-storage workflow, or frontend API client are currently established in the repository. Membership payments use an external QR workflow; secure QR storage, payment-reference submission, and verification are Planned backend work.

## Rules for future backend work

- Define API behavior, request/response shapes, error behavior, and authorization expectations in `/docs` before wiring the frontend.
- Use migrations, models, policies, form requests, resources, and tests for durable domain behavior rather than storing production data in component fields.
- Treat member, dependent, claim, document, notification, support-ticket, and audit data as sensitive. Define access rules explicitly.
- Never treat UI demo values as canonical records.
- Update this document and the relevant product documentation when a real endpoint or integration is introduced.

## Validation

From `backend/`:

```bash
composer test
```

If dependencies or environment setup are unavailable, report that clearly rather than claiming backend verification.
