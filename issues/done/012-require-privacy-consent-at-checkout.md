## Parent PRD

`issues/prd.md`

## What to build

Require explicit privacy/data-use consent before checkout submission and store an auditable consent timestamp on new orders. This slice should include the customer-facing checkout behavior, server validation, persistence, admin compatibility for old orders, and privacy-page alignment described in the PRD.

## Acceptance criteria

- [ ] Checkout shows a required privacy/data-use consent checkbox using approved bilingual copy.
- [ ] Customers cannot submit checkout until consent is checked.
- [ ] The order API rejects new submissions that do not include consent.
- [ ] Successful new orders store `privacy_consent_at`.
- [ ] Older orders with null or missing consent timestamps remain readable in admin.
- [ ] Privacy/terms copy reflects the consent behavior.
- [ ] Tests cover client/server consent behavior and persistence contract where practical.

## Blocked by

- Blocked by `issues/010-business-rules-and-content-cleanup-review.md`

## User stories addressed

- User story 31
- User story 38
- User story 61
- User story 63
- User story 74
- User story 77
