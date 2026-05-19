## Parent PRD

`issues/prd.md`

## What to build

Create the owner notification path for new orders using Telegram. New orders should notify the owner promptly, include enough order detail to act, and support protected Telegram actions for confirming or cancelling an order. WhatsApp notification work is intentionally excluded from this issue based on stakeholder feedback after the PRD was written.

## Acceptance criteria

- [ ] A successful new order sends a Telegram notification to the configured owner channel or chat.
- [ ] Telegram notifications include customer, fulfillment, preferred date, item, and total details.
- [ ] Telegram notification failure does not prevent a valid order from being created.
- [ ] Telegram action buttons can confirm or cancel an order.
- [ ] Telegram callbacks validate the configured webhook secret.
- [ ] Telegram action buttons cannot be reused to perform duplicate status changes.
- [ ] No Telegram token or webhook secret is exposed to client-side code.

## Blocked by

- Blocked by `issues/005-order-persistence-and-trusted-server-contract.md`

## User stories addressed

- User story 44
- User story 45
- User story 46
- User story 64
