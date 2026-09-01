# Product areas and routes

The current frontend route map is defined in `frontend/src/app/app.routes.ts`. Routes below are **Current** unless marked otherwise. Authentication guards are not currently configured in the route definitions.

## Public marketing

| URL | Area | Purpose |
| --- | --- | --- |
| `/` | Marketing | Home page with BayaNova cooperative positioning, community-program content, and FAQ |
| `/privacy-policy` | Marketing | Privacy policy page |

## Member portal

`/member` redirects to `/member/login`.

| URL | Purpose |
| --- | --- |
| `/member/login` | Member sign-in UI |
| `/member/signup` | Member registration UI |
| `/member/dashboard` | Cooperative member overview with assembly, household, community-program, and member-service summaries |
| `/member/profile` | Member profile summary |
| `/member/profile/information` | Personal information UI |
| `/member/profile/documents` | Identity document upload UI |
| `/member/membership-status` | Membership status UI |
| `/member/family-members` | Household members UI |
| `/member/membership-card` | Plain member ID card UI (no QR code) |
| `/member/payments` | Membership payment instructions and the admin-managed payment QR |
| `/member/claims` | Member benefit-request UI |
| `/member/edit-information` | Redirects to `/member/profile/information` |
| `/member/upload-ids` | Redirects to `/member/profile/documents` |
| `/member/referral` | Member invitation UI |
| `/member/support` | Support ticket UI |
| `/member/announcements` | Cooperative notices, assemblies, and community-program UI |

## Admin portal

| URL | Purpose |
| --- | --- |
| `/admin/login` | Admin sign-in UI |
| `/admin` | Redirects to `/admin/dashboard` |
| `/admin/dashboard` | Admin dashboard |
| `/admin/profile` | Admin profile UI |
| `/admin/members` | Member operations |
| `/admin/claims` | Claims operations |
| `/admin/payments` | Membership payment records and payment QR management |
| `/admin/accounting` | Accounting operations |
| `/admin/reports` | Reports and exports |
| `/admin/notifications` | Notifications |
| `/admin/approvals` | Approval queue |
| `/admin/support-tickets` | Support tickets |
| `/admin/crm` | CRM notes and follow-ups |
| `/admin/audit-logs` | Audit history |
| `/admin/analytics` | Analytics |
| `/admin/roles` | Roles and permissions |
| `/admin/documents` | Document management |

Member and admin section routes currently reuse generic section components with route `data` to select headings or datasets. A future implementation should preserve URLs while replacing prototype data with defined backend contracts.

### Cooperative portal framing

- **Current:** The member portal navigation and dashboard emphasize cooperative membership, participation, general assemblies, community programs, member IDs, household members, and member services.
- **Prototype:** Membership status, participation counts, program schedules, and assembly details are representative display data only.
- **Assumption:** Cooperative membership categories, voting eligibility, benefit eligibility, and any future financial rules must be confirmed before backend implementation.
- **Current prototype:** Membership payments are completed externally by scanning an administrator-managed cooperative QR. The portal does not process transfers directly.
