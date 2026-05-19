# Vercel Preprod Deployment Workflow

This project uses GitHub branches with Vercel Git deployments:

- `main` -> production
- `preprod` -> pre-production preview deployment
- `feature/*` -> feature preview deployments

Vercel should keep `main` configured as the Production Branch. Branches other than the Production Branch create Preview deployments through the Vercel Git integration, so `preprod` works as a stable preview environment while feature branches still get their own preview URLs.

## Branch Model

`main` is the production release branch. Merging to `main` should deploy to the production environment.

`preprod` is the pre-production branch. It should use a Vercel Preview deployment, ideally with Preview environment variables that point at pre-production services.

`feature/*` branches are development branches for individual changes. They should be created from `preprod`, reviewed with pull requests into `preprod`, and tested through their Vercel Preview deployments before merging.

## Create The Preprod Branch

Run this once after `main` is ready:

```bash
git checkout main
git pull
git checkout -b preprod
git push -u origin preprod
```

After pushing, confirm Vercel creates a Preview deployment for the `preprod` branch.

## Recommended Workflow

1. Create a feature branch from `preprod`.
2. Push the feature branch and open a pull request into `preprod`.
3. Test the Vercel Preview deployment generated for the feature branch or pull request.
4. Merge the feature branch into `preprod`.
5. Test the Vercel Preview deployment generated from `preprod`.
6. When ready for production, merge `preprod` into `main`.
7. Verify the Vercel Production deployment from `main`.

Example:

```bash
git checkout preprod
git pull
git checkout -b feature/order-copy-update
git push -u origin feature/order-copy-update
```

## Vercel Environment Variables

Configure environment variables in the Vercel project settings.

- Production variables apply to `main` production deployments.
- Preview variables apply to non-production branches, including `preprod` and `feature/*`.
- Optional branch-specific Preview variables can be scoped only to `preprod`.

Use branch-specific Preview variables for `preprod` when it needs stable pre-production services that differ from ad hoc feature preview deployments.

Recommended separation:

- Production Supabase project and service-role key for `main`.
- Pre-production Supabase project and service-role key for `preprod` when possible.
- Separate Telegram bot/chat/webhook secret for preprod when testing notifications.
- Separate admin password for preprod.
- `NEXT_PUBLIC_SITE_URL` matching the deployed environment when callbacks or admin links need an absolute URL.

Do not commit secrets. `.env.example` documents names only.

## Database And API Keys

Use different database and API keys between production and preprod whenever possible. Preview deployments should not write test orders into the production database unless the owner explicitly accepts that risk.

At minimum, confirm these values before enabling preprod order testing:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `ADMIN_PASSWORD`
- `ADMIN_WHATSAPP_NUMBER`
- `TELEGRAM_BOT_TOKEN`
- `TELEGRAM_CHAT_ID`
- `TELEGRAM_WEBHOOK_SECRET`

If a shared service must be used temporarily, document the risk in the release notes and avoid destructive testing.

## Verify A Preprod Deployment

1. Push a change to `preprod`.
2. Open the Vercel project dashboard and find the Preview deployment for the `preprod` branch.
3. Verify the generated preprod URL.
4. Confirm the build completed successfully.
5. Manually smoke test the storefront:
   - Open the preprod URL.
   - Add a product and a variant to the cart.
   - Confirm cart totals and delivery fee behavior.
   - Verify checkout validation without submitting real customer data.
   - If using a preprod database, submit a test order and confirm admin/Telegram behavior.
6. Confirm production remains unchanged until `preprod` is merged into `main`.

## Future Release Checklist

- Feature branches were created from `preprod`.
- Pull requests were merged into `preprod`, not directly into `main`.
- Vercel Preview deployment for `preprod` is green.
- Manual smoke tests passed on the preprod URL.
- Production and preprod environment variables point to the intended services.
- Database/API keys are separated where possible.
- `preprod` has been merged into `main` for release.
- Vercel Production deployment from `main` is green.
- Post-release smoke test passed on the production URL.
