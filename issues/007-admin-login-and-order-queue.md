## Parent PRD

`issues/prd.md`

## What to build

Build the private owner-facing order queue described in the PRD. The owner should be able to log in, see newest orders first, inspect order details and items, use the dashboard on desktop or mobile, and understand configuration errors when order data cannot load.

## Acceptance criteria

- [ ] The admin orders page requires a private login before showing order data.
- [ ] Orders are loaded server-side from the order database.
- [ ] Orders are sorted newest first.
- [ ] The dashboard auto-refreshes periodically while open.
- [ ] Desktop layout supports scanning many orders in a table.
- [ ] Mobile layout supports viewing orders as cards with detail panels.
- [ ] Order details include customer, contact preference, fulfillment, address, preferred date, notes, items, and totals.
- [ ] Empty and backend-configuration error states are clear.

## Blocked by

- Blocked by `issues/005-order-persistence-and-trusted-server-contract.md`

## User stories addressed

- User story 48
- User story 49
- User story 50
- User story 51
- User story 52
- User story 55
- User story 56
- User story 59
- User story 63
