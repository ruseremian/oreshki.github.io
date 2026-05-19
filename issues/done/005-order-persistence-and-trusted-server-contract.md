## Parent PRD

`issues/prd.md`

## What to build

Implement the trusted order-submission contract described in the PRD. The server should validate submitted checkout data, recalculate product pricing and delivery fees from trusted catalog data, persist the order and order items, and return a stable response for the customer confirmation flow.

## Acceptance criteria

- [ ] Order submission is handled by a server route.
- [ ] The server rejects invalid customer, contact, fulfillment, preferred date, and cart data.
- [ ] The server recalculates all item prices, line totals, subtotal, delivery fee, and total.
- [ ] Orders are stored separately from order items.
- [ ] Stored order items include product ID, product name, quantity, unit price, and line total.
- [ ] Order tables are accessed only through server-side credentials.
- [ ] Missing backend configuration returns a clear server error.
- [ ] Successful responses include order ID, subtotal, delivery fee, and total.

## Blocked by

- Blocked by `issues/004-checkout-form-validation-and-confirmation.md`

## User stories addressed

- User story 39
- User story 40
- User story 41
- User story 42
- User story 43
- User story 59
- User story 61
- User story 63
- User story 64
- User story 65
