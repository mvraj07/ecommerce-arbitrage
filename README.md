# E-commerce Starter (Next.js + Tailwind)

This repository is a runnable starter scaffold based on the provided screenshots. It implements a mobile-first storefront with:

- Product collection (search + pagination)
- Product detail with gallery and add-to-cart
- Cart persisted in `localStorage`
- Mock checkout API and order confirmation page

What to run locally

1. Install dependencies

```bash
npm install
```

2. Run the dev server

```bash
npm run dev
# Open http://localhost:3000
```

Deployment (recommended minimal setup)

Frontend: Vercel (free hobby tier)

- Connect this repository to Vercel and deploy. Vercel will detect Next.js and build automatically.
- Ensure the `public/` folder is included (product images are SVG placeholders there).

Backend & Storage (optional but recommended for production)

- Supabase: use Supabase for Postgres, Storage (images), Auth, and Edge Functions.
- Move product data from `data/products.json` into a `products` table in Postgres and update API routes to query Supabase instead of the local file.

Payments

- For India use Razorpay. For global card payments use Stripe. Configure server-side webhooks to update order status.

Ad networks & analytics

- Insert AdSense/Ad network scripts in `pages/_document.js` or via a client-side component to reserve ad slots.
- Add Google Analytics or another analytics provider as needed.

Next tasks you may want me to finish (I can continue):

- Replace mock API with Supabase/Postgres integration and authentication.
- Add real payments integration (Razorpay/Stripe) and webhook handlers.
- Add admin UI for product management or import scripts for CSV.
- Add unit and E2E tests (Playwright/Cypress) and CI pipeline.

License: MIT-style for starter code. Use and adapt as needed.
