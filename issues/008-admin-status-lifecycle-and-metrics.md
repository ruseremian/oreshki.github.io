## Parent PRD

`issues/prd.md`

## What to build

Complete the operational admin workflow from the PRD by adding validated order status transitions and dashboard metrics. The owner should be able to update an order through the controlled lifecycle and see metrics that reflect active billable work.

## Acceptance criteria

- [ ] Orders support the statuses new, confirmed, preparing, ready, delivered, and cancelled.
- [ ] Status changes are submitted through a protected server endpoint.
- [ ] Invalid status values are rejected server-side.
- [ ] The dashboard reflects updated statuses without requiring a full manual navigation flow.
- [ ] Dashboard metrics include total orders, revenue, orders today, and average order value.
- [ ] Cancelled orders are excluded from revenue and average order value calculations.
- [ ] Status labels remain clear in the owner-facing dashboard.

## Blocked by

- Blocked by `issues/007-admin-login-and-order-queue.md`

## User stories addressed

- User story 53
- User story 54
- User story 57
- User story 58
- User story 60
