## Parent PRD

`issues/prd.md`

## What to build

Store the customer's selected storefront language on each new preorder request and expose it in the owner workflow. This vertical slice should preserve compatibility with older orders that do not have a stored language while making new orders clearly actionable in French or Russian.

## Acceptance criteria

- [ ] The order schema supports an optional customer language field.
- [ ] New order submissions store `fr` or `ru` from the checkout payload.
- [ ] Invalid, missing, or legacy language input is normalized safely without breaking order creation.
- [ ] Admin order loading includes the stored language when present.
- [ ] Admin order details display the customer language or a safe fallback for older orders.
- [ ] Tests cover language normalization, storage contract, and admin fallback behavior where practical.

## Blocked by

None - can start immediately

## User stories addressed

- User story 55
- User story 61
- User story 63
- User story 75
- User story 76
