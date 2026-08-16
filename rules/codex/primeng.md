# PrimeNG rules for admin and member pages

These rules apply when working under:

- `frontend/src/app/pages/admin/**`
- `frontend/src/app/pages/member/**`

## UI implementation

- Use PrimeNG for UI controls and common interface patterns whenever a suitable PrimeNG component exists.
- Import only the PrimeNG standalone directives or modules used by each component; do not create a shared catch-all PrimeNG module.
- Prefer PrimeNG component APIs and design tokens for styling and variants. Keep page-specific layout rules in the page SCSS.
- Preserve semantic HTML, accessible labels, keyboard behavior, focus states, and WCAG AA contrast when composing or customizing PrimeNG components.
- Use native HTML when it is more semantic or when PrimeNG does not provide an appropriate component.
