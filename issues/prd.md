## Problem Statement

Oreshki is a small handmade bakery and home-cooking business that needs a polished, trustworthy ordering site for local customers. The business sells sweet pastries, signature oreshki, cakes, and savory Eastern European and Caucasus-inspired dishes, but customers need a clearer path than informal messages alone: they should be able to browse the offer, understand pricing, choose pickup or delivery, provide contact details, and submit a preorder request without friction.

The business also needs a lightweight operational workflow behind the storefront. Each order should be captured reliably, priced consistently on the server, forwarded to the owner through familiar channels, and visible in an admin dashboard where status can be updated as the order moves from new to confirmed, preparing, ready, delivered, or cancelled.

The current project already implements much of this experience. This PRD documents the intended product surface and the decisions implied by the existing codebase so future work can preserve the same direction.

## Solution

Build and maintain a modern one-page bilingual Oreshki storefront with an integrated cart-based preorder flow and a simple order-management backend.

Customers land on a warm, product-forward page that presents the brand, sweet products, savory specialties, story, reviews, and contact options in French and Russian. They can add products and variants to a cart, adjust quantities, see subtotal, delivery fee, free delivery progress, and final total, then submit a preorder request with name, phone, preferred contact method, fulfillment method, preferred date, and notes.

The server validates every order independently, recalculates trusted pricing, stores orders and order items in Supabase, and sends owner-facing notifications through Telegram and WhatsApp links. The admin dashboard gives the owner a private order queue with revenue metrics, order details, auto-refresh, mobile support, and status updates.

## User Stories

1. As a first-time customer, I want to understand what Oreshki sells immediately, so that I know whether the offer matches what I am looking for.
2. As a French-speaking customer, I want the site content in French, so that I can browse and order comfortably.
3. As a Russian-speaking customer, I want the site content in Russian, so that the brand feels familiar and accessible.
4. As a returning customer, I want my language preference remembered, so that I do not need to switch languages on every visit.
5. As a customer on mobile, I want navigation that stays usable on a small screen, so that I can order from my phone.
6. As a customer, I want clear product categories for sweet pastries and savory dishes, so that I can scan the assortment quickly.
7. As a customer, I want product cards with photos, descriptions, quantities, and prices, so that I can choose confidently.
8. As a customer, I want to see variant options for products like pelmeni, vareniki, and cakes, so that I can pick the exact flavor or filling.
9. As a customer, I want out-of-stock or unavailable products excluded from ordering, so that I do not submit requests the business cannot fulfill.
10. As a customer, I want to add products to a cart, so that I can build a multi-item order before submitting it.
11. As a customer, I want confirmation when a product is added, so that I know my action worked.
12. As a customer, I want to open the cart from navigation, so that I can review my order at any time.
13. As a customer, I want to increase or decrease item quantities, so that I can adjust my order without starting over.
14. As a customer, I want to remove individual items, so that I can correct mistakes.
15. As a customer, I want the cart to show line totals, subtotal, delivery fee, and total, so that pricing is transparent.
16. As a customer, I want pickup to be free, so that I can avoid delivery charges when collecting the order myself.
17. As a customer, I want delivery pricing to be visible, so that I know the final total before submitting.
18. As a customer, I want free delivery progress shown, so that I can decide whether to add more items to reach the threshold.
19. As a customer, I want free delivery unlocked automatically above the threshold, so that the order total reflects the promotion correctly.
20. As a customer, I want to know online payment is not enabled yet, so that I understand payment will be arranged after the request.
21. As a customer, I want to enter my name, so that the business can identify my order.
22. As a customer, I want to enter and format my phone number, so that the business can contact me reliably.
23. As a customer, I want phone validation before submitting, so that I can correct errors early.
24. As a customer, I want to choose WhatsApp, Telegram, Instagram, or phone as my preferred contact method, so that the business replies where I am easiest to reach.
25. As a customer, I want to choose pickup or delivery, so that fulfillment matches my needs.
26. As a delivery customer, I want to provide my address only when delivery is selected, so that the form stays focused.
27. As a delivery customer, I want address validation, so that my request includes the required delivery details.
28. As a customer, I want to choose a preferred date, so that I can request an order for a specific day.
29. As the bakery owner, I want preferred dates to respect a preparation lead time, so that customers do not request orders too soon.
30. As a customer, I want to add notes about time, preferences, or event details, so that special context travels with the order.
31. As a customer, I want clear inline errors, so that I know how to fix an invalid checkout.
32. As a customer, I want a success state with order number and final total, so that I know the order was received.
33. As a customer, I want contact buttons after ordering, so that I can follow up in my preferred messenger.
34. As a customer, I want the cart to clear after a successful order, so that I do not accidentally resubmit the same items.
35. As a customer, I want the site to feel handmade and trustworthy, so that I feel comfortable ordering food from a small producer.
36. As a customer, I want reviews visible on the page, so that I can evaluate social proof.
37. As a customer, I want contact links outside checkout, so that I can ask about custom quantities, family orders, or events.
38. As a customer, I want privacy and terms pages available, so that the site feels complete and responsible.
39. As the bakery owner, I want order submissions persisted in a database, so that requests are not lost in browser state or messages.
40. As the bakery owner, I want order items stored separately from orders, so that each order can contain multiple products with reliable quantities and prices.
41. As the bakery owner, I want server-side price calculation, so that client-side price tampering cannot change totals.
42. As the bakery owner, I want each item stored with product name, quantity, unit price, and line total, so that historical orders remain understandable even if product copy changes.
43. As the bakery owner, I want delivery fees stored with the order, so that revenue and totals are auditable later.
44. As the bakery owner, I want Telegram notifications for new orders, so that I can react quickly without checking the dashboard constantly.
45. As the bakery owner, I want Telegram action buttons to confirm or cancel orders, so that I can update order status from the notification.
46. As the bakery owner, I want Telegram actions protected by a webhook secret, so that unauthorized users cannot update orders.
47. As the bakery owner, I want a WhatsApp admin link, so that I can quickly send or forward order details through WhatsApp.
48. As the bakery owner, I want a private admin login, so that order data is not publicly visible.
49. As the bakery owner, I want an admin order list sorted by newest first, so that the freshest requests are easiest to process.
50. As the bakery owner, I want the dashboard to auto-refresh, so that new orders appear while the page is open.
51. As the bakery owner, I want mobile-friendly admin cards, so that I can manage orders from a phone.
52. As the bakery owner, I want desktop table layout for many orders, so that I can scan operational data quickly.
53. As the bakery owner, I want dashboard metrics for total orders, revenue, orders today, and average order value, so that I can understand order flow at a glance.
54. As the bakery owner, I want cancelled orders excluded from revenue calculations, so that metrics represent billable work.
55. As the bakery owner, I want to inspect customer details, preferred contact method, delivery method, address, preferred date, and notes, so that I can fulfill each order correctly.
56. As the bakery owner, I want to inspect all order items and totals, so that I can prepare the right quantities.
57. As the bakery owner, I want to change order status, so that the dashboard reflects operational progress.
58. As the bakery owner, I want status updates to be validated server-side, so that invalid states are not stored.
59. As the bakery owner, I want clear errors when Supabase is not configured, so that deployment issues can be diagnosed.
60. As a developer, I want product, pricing, validation, notification, and admin concerns separated into modules, so that future changes remain easy to reason about.
61. As a developer, I want shared order types, so that client and server agree on the checkout contract.
62. As a developer, I want reusable phone and date utilities, so that validation stays consistent between UI and API.
63. As a developer, I want database access limited to server-side service-role usage, so that public clients cannot directly read or write orders.
64. As a developer, I want environment variables documented, so that deployments can be configured without source changes.
65. As a developer, I want the project to remain deployable as a Next.js application, so that the storefront and backend routes ship together.

## Implementation Decisions

- Use a Next.js App Router application with a single customer-facing landing page and server API routes for order and admin workflows.
- Treat the customer storefront as a bilingual French/Russian experience, with language stored locally in the browser and applied to the document language.
- Keep product definitions, product IDs, order names, prices, availability, and images in structured product/content modules instead of hard-coded throughout components.
- Support two product categories: sweet bakery items and savory specialties.
- Model selectable product variants as distinct product IDs that can be added to cart and priced independently.
- Use a client-side cart provider for cart state, quantity changes, item removal, subtotal display, and checkout payload creation.
- Use a drawer checkout experience instead of navigating customers away from the one-page storefront.
- Require customer name and valid phone number for every order.
- Support preferred contact methods: WhatsApp, Telegram, Instagram, and phone.
- Support fulfillment methods: pickup and local delivery.
- Require delivery address only when delivery is selected.
- Allow optional preferred date and notes.
- Enforce the minimum preferred date in both the client form and server validation.
- Calculate subtotal and delivery fee from trusted server-side product data, not from client-supplied prices.
- Apply a fixed delivery fee for delivery orders below the free delivery threshold and no delivery fee for pickup.
- Store orders in a primary orders table and line items in a separate order items table.
- Store subtotal, delivery fee, and total on each order to support historical reporting.
- Insert order and items through a server route using Supabase service-role credentials.
- Enable row-level security on order tables and avoid public client policies for order data.
- Send Telegram notifications after successful order creation, while allowing the order to succeed even if notification delivery fails.
- Generate owner-facing WhatsApp URLs from normalized order data when an admin WhatsApp number is configured.
- Provide a password-protected admin orders page backed by server-side Supabase reads.
- Normalize order statuses into a controlled lifecycle: new, confirmed, preparing, ready, delivered, and cancelled.
- Allow order status changes through a protected API endpoint.
- Auto-refresh the admin dashboard periodically to reduce manual reloads.
- Display admin metrics based on current order data and exclude cancelled orders from revenue.
- Keep operational UI in French, matching the current admin dashboard language.
- Keep legal pages as separate routes linked from the storefront footer.
- Assume payment collection remains offline or manual for this PRD.

## Testing Decisions

- Good tests should exercise externally visible behavior and contracts: pricing outputs, validation responses, persisted order shape, notification payload construction, and UI-visible state changes. They should avoid coupling to component internals that do not affect user or owner behavior.
- Pricing tests should cover pickup, delivery below the free-delivery threshold, delivery at or above the threshold, item subtotals, decimal product prices, and empty carts.
- Preferred-date tests should cover minimum-date generation, allowed dates, and dates that are too early.
- Phone utility tests should cover accepted local/international formats, normalization, and rejected invalid values.
- Order API tests should cover valid order creation, empty cart rejection, unavailable product rejection, delivery without address rejection, invalid contact method rejection, invalid fulfillment method rejection, server-side total calculation, and Supabase insert failure handling.
- Product contract tests should verify every product ID referenced by site content exists in the product catalog and every available variant can be resolved for cart display.
- Admin status tests should cover accepted status values, French/accent-insensitive aliases, cancelled revenue exclusion, and invalid status rejection.
- Notification tests should cover Telegram message construction, webhook secret validation, confirm/cancel callback handling, and duplicate action handling where applicable.
- Admin dashboard tests should cover order rendering, status selection, empty state, mobile details view, metrics calculation, and cancelled-order treatment.
- Checkout UI tests should cover adding items, editing quantities, free-delivery messaging, pickup versus delivery address behavior, form validation, submission success, and cart clearing after confirmation.
- Prior art in the codebase includes focused utility modules for pricing, phone normalization, preferred date handling, order status normalization, Supabase access, Telegram notifications, and WhatsApp URL generation. These are strong candidates for isolated unit tests.
- End-to-end smoke tests should cover the complete customer path from product add to order confirmation and the owner path from order visibility to status update.

## Out of Scope

- Online payment processing.
- Customer accounts, saved addresses, and order history for customers.
- Real-time inventory management.
- Product management through the admin dashboard.
- CMS-backed editing for copy, reviews, products, or images.
- Multi-location delivery zones or distance-based delivery pricing.
- Automated delivery routing or courier assignment.
- Email notifications.
- Public order tracking pages.
- Promo codes beyond the current free-delivery threshold.
- Full multilingual admin interface.
- Advanced analytics beyond the current dashboard metrics.
- Native mobile applications.

## Further Notes

- This PRD is inferred from the current repository rather than a live stakeholder interview. Any future implementation work should confirm business-specific details such as delivery radius, preparation lead time, free-delivery threshold, accepted payment methods, food allergen requirements, and exact legal copy.
- Several source files contain mojibake in non-ASCII French/Russian text. The product intent is still clear, but a future content cleanup pass should restore proper encoding before treating copy as final.
- The admin auth model appears intentionally lightweight. If order volume or sensitivity grows, the project should revisit authentication, authorization, audit logging, and rate limiting.
- The current architecture is appropriate for a small preorder business: product data lives in code, orders live in Supabase, and owner actions happen through an admin dashboard and messaging integrations.
