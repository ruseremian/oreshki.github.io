## Parent PRD

`issues/prd.md`

## What to build

Add behavioral tests for the core customer and owner paths described in the PRD. Tests should focus on externally visible behavior and stable contracts: catalog resolution, pricing, phone and date validation, order API behavior, notifications, admin status handling, dashboard metrics, and a smoke path from storefront order submission to owner status update.

## Acceptance criteria

- [ ] Pricing tests cover pickup, delivery below threshold, delivery at threshold, delivery above threshold, decimal prices, and empty carts.
- [ ] Phone tests cover accepted formats, normalization, and invalid values.
- [ ] Preferred-date tests cover minimum-date behavior and rejected early dates.
- [ ] Product contract tests verify that site content references valid catalog products and orderable variants.
- [ ] Order API tests cover success, invalid cart, unavailable product, missing delivery address, invalid contact method, invalid fulfillment method, trusted totals, and backend insert failures.
- [ ] Telegram tests cover notification payloads, secret validation, confirm/cancel callbacks, and duplicate action handling.
- [ ] Admin tests cover order rendering, status updates, metrics, empty state, and cancelled-order revenue treatment.
- [ ] An end-to-end smoke test covers adding a product, submitting checkout, seeing confirmation, viewing the order in admin, and changing status.

## Blocked by

- Blocked by `issues/001-storefront-language-and-content-foundation.md`
- Blocked by `issues/002-product-catalog-and-variant-ordering.md`
- Blocked by `issues/003-cart-pricing-and-free-delivery-path.md`
- Blocked by `issues/004-checkout-form-validation-and-confirmation.md`
- Blocked by `issues/005-order-persistence-and-trusted-server-contract.md`
- Blocked by `issues/006-owner-notifications-through-telegram.md`
- Blocked by `issues/007-admin-login-and-order-queue.md`
- Blocked by `issues/008-admin-status-lifecycle-and-metrics.md`

## User stories addressed

- User story 60
- User story 61
- User story 62
- User story 63
- User story 64
- User story 65

## Progress notes

- 2026-05-19: Added the baseline `npm run test` and `npm run typecheck` feedback loop using TypeScript compile output plus Node's built-in test runner.
- 2026-05-19: Added focused behavioral tests for pricing, phone normalization/validation, preferred-date rules, and storefront product/variant catalog references.
- 2026-05-19: Added behavioral coverage for order submission validation and trusted totals, Telegram message/button behavior, order status parsing, and admin revenue metrics.
- Browser-level checkout/admin smoke coverage is not included because the project does not currently have a browser test harness; the Node test suite now covers the stable public contracts that support those flows.
