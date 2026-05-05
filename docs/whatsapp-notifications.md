# WhatsApp order notifications

This project sends automatic admin notifications through the Meta WhatsApp Cloud API after a new order and its order items are saved in Supabase.

The notification is server-side only. Secrets are read from environment variables in `lib/whatsapp.ts` and are not exposed to the browser.

## Required environment variables

Add these variables in Vercel under Project Settings > Environment Variables for Production, Preview, and Development as needed:

```env
WHATSAPP_TOKEN=
WHATSAPP_PHONE_NUMBER_ID=
ADMIN_WHATSAPP_NUMBER=
WHATSAPP_TEMPLATE_NAME=
WHATSAPP_TEMPLATE_LANGUAGE=fr
```

`ADMIN_WHATSAPP_NUMBER` should be the admin recipient number in international format, for example `33612345678`.

## Meta setup notes

Temporary access tokens from Meta Developers are only for testing. They expire and should not be used for production.

Production requires a permanent System User token from Meta Business Manager with access to the WhatsApp Business Account and phone number.

Automatic business-initiated messages require an approved WhatsApp message template. The template configured in `WHATSAPP_TEMPLATE_NAME` must exist and be approved for the language in `WHATSAPP_TEMPLATE_LANGUAGE`.

The template body must include five text variables in this order:

```text
{{1}} customer name
{{2}} customer phone
{{3}} order total in euros
{{4}} delivery method
{{5}} order id
```

`wa.me` links cannot send messages automatically. They only open WhatsApp with a prefilled manual message. This integration uses the Cloud API `/messages` endpoint to send the approved template programmatically.

## Failure behavior

Order creation is the priority. If WhatsApp is not configured or if Meta rejects the message, the order API logs the issue server-side and still returns a successful order response to the customer.

## Testing

1. Configure the WhatsApp environment variables in Vercel or your local environment.
2. Make sure the template is approved in Meta and has the five variables listed above.
3. Create a new order from the public checkout.
4. Confirm the order appears in Supabase and the admin dashboard.
5. Confirm the admin WhatsApp number receives the template notification.
6. If no message arrives, check the Vercel function logs for `[orders] WhatsApp notification failed` or `[orders] WhatsApp notification skipped`.
