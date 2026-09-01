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
| `/member/dashboard` | Member dashboard |
| `/member/profile` | Member profile summary |
| `/member/profile/information` | Personal information UI |
| `/member/profile/documents` | Identity document upload UI |
| `/member/membership-status` | Membership status UI |
| `/member/fund-balance` | Subscription fund balance UI |
| `/member/family-members` | Covered family members UI |
| `/member/qr-member-id` | QR member ID UI |
| `/member/membership-card` | Digital membership card UI |
| `/member/renew-subscription` | Renewal UI |
| `/member/claims` | Claims UI |
| `/member/payments` | Payment UI |
| `/member/payment-history` | Payment history UI |
| `/member/receipts` | Receipt UI |
| `/member/edit-information` | Redirects to `/member/profile/information` |
| `/member/upload-ids` | Redirects to `/member/profile/documents` |
| `/member/referral` | Referral UI |
| `/member/support` | Support ticket UI |
| `/member/announcements` | Announcements UI |

## Admin portal

| URL | Purpose |
| --- | --- |
| `/admin/login` | Admin sign-in UI |
| `/admin` | Redirects to `/admin/dashboard` |
| `/admin/dashboard` | Admin dashboard |
| `/admin/profile` | Admin profile UI |
| `/admin/members` | Member operations |
| `/admin/claims` | Claims operations |
| `/admin/payments` | Payment operations |
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
