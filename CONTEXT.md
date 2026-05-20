# Maison Zhanna Ordering

Maison Zhanna Ordering describes the customer-facing preorder flow and the owner-facing operational record for a small handmade bakery and home-cooking business in Strasbourg.

## Language

**Preorder Request**:
A customer's submitted request for handmade food that still requires owner confirmation before it becomes a committed arrangement.
_Avoid_: Purchase, confirmed order, transaction

**Order**:
The owner-facing operational record created from exactly one **Preorder Request**, tracked through preparation and fulfillment.
_Avoid_: Purchase, transaction, preorder request when speaking about the admin record

**Confirmation**:
The owner's acceptance that a **Preorder Request** is feasible for the requested assortment, date, and fulfillment path. Confirmation does not mean payment has been agreed or received.
_Avoid_: Payment confirmation, paid, accepted payment

**Payment Details**:
The manually agreed payment method or instructions shared by the owner after **Confirmation**. Payment itself is outside the v1 ordering domain.
_Avoid_: Online payment, payment status, paid flag

**Fulfillment Method**:
The way an **Order** reaches the customer. Each **Order** has exactly one fulfillment method: **Pickup** or **Delivery**.
_Avoid_: Shipping, logistics option

**Pickup**:
A fulfillment method where the customer collects the order in Strasbourg, with exact details confirmed privately by the owner.
_Avoid_: Public pickup address

**Delivery**:
A fulfillment method where the owner may bring the order to the customer in Strasbourg or nearby communes, subject to confirmation.
_Avoid_: Shipping, guaranteed delivery zone

## Example Dialogue

Customer: "I submitted a preorder request for Saturday."

Owner: "I see the order in the dashboard. I can confirm whether the assortment, date, and fulfillment work, then send payment details separately."
