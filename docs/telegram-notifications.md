# Telegram Notifications

New order notifications include Telegram inline buttons:

- `✅ Confirmer` updates the order status to `confirmed`.
- `❌ Annuler` updates the order status to `cancelled`.
- `👀 Voir admin` opens `<NEXT_PUBLIC_SITE_URL>/admin/orders`.

Cancelled orders keep the same `cancelled` status used by the admin dashboard, so revenue KPIs treat them as 0 revenue.

## Webhook Setup

`TELEGRAM_WEBHOOK_SECRET` is checked server-side by the webhook route. Include it in the webhook URL query string when registering the webhook.

Register the webhook:

```text
https://api.telegram.org/bot<TELEGRAM_BOT_TOKEN>/setWebhook?url=<SITE_URL>/api/telegram/webhook?secret=<TELEGRAM_WEBHOOK_SECRET>
```

Example:

```text
https://api.telegram.org/botXXX/setWebhook?url=https://oreshki-github-io.vercel.app/api/telegram/webhook?secret=YYY
```

Remove the webhook:

```text
https://api.telegram.org/bot<TELEGRAM_BOT_TOKEN>/deleteWebhook
```

## Testing Checklist

- New order creates a Telegram notification.
- Telegram message has `Confirmer`, `Annuler`, and `Voir admin` buttons.
- Clicking `Confirmer` updates the Supabase order status to `confirmed`.
- Clicking `Annuler` updates the Supabase order status to `cancelled`.
- Admin dashboard reflects the new status after refresh.
- Cancelled orders count as 0 revenue in dashboard KPIs.
- Telegram callback stops loading after a button click.
- No Telegram token or webhook secret appears in client-side code.
- Vercel deployment completes successfully.
