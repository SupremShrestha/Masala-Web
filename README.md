# Masala — a Nepali spice storefront

A responsive React + Next.js concept store with a parchment, chilli-burgundy, and brass theme, Nepali product names, NPR pricing, custom spice imagery, illustrated packaging, and recipes.

## Run locally

Requires Node.js 20.9 or newer.

```sh
npm install
npm run dev
```

Open http://localhost:3000.

```sh
npm run typecheck
npm run build
```

The production build exports the site to `out/` for static hosting. The build uses Next.js's [static export support](https://nextjs.org/docs/app/guides/static-exports). `npm run dev` runs the local Next.js development server; serve `out/` with a static host to preview a production build.

## Make it yours

- **Brand name, tagline, products, prices, and recipes:** `src/lib/shop.ts`
- **Page layout and interactions:** `src/app/page.tsx`
- **Colours, fonts, and responsive styles:** `src/app/globals.css`
- **Search, basket, product, and recipe dialogs:** `src/app/overlays.css`
- **Page metadata:** `src/app/layout.tsx` (uses the shared brand name)
- **Favicon:** `src/app/icon.svg`
- **Images:** `public/images/`

Change `brand.name` in `src/lib/shop.ts` to rename the storefront, product packaging, and page title together. The Sites hosting title and URL are separate settings.

## Included

- Category filtering and product search (English and Nepali names).
- Product detail dialogs with ingredients and usage notes.
- Add, remove, and update basket quantities, with browser-local persistence.
- Defensive validation of saved basket values and a 20-per-product limit.
- Sample order summary with an explicit demo message.
- Three complete vegetarian recipes.
- Responsive navigation, Escape-to-close dialogs, keyboard focus containment, focus restoration, skip link, and reduced-motion support.

## Before accepting orders

The brand, catalogue, product packaging, ingredients, weights, and prices are illustrative. Replace them with verified business information. This is a frontend demo: no orders are submitted and no payments or personal information are collected. Connect inventory, delivery, and checkout services before turning it into a live shop. Google Fonts are loaded externally, with system font fallbacks.

AI-generated editorial images are used for illustration; they do not represent actual merchandise. See `ASSETS.md` for their prompts and locations.

## Hosting

`.openai/hosting.json` records the private Sites project and the `out/` static export directory. Keep this identity when publishing updates. The source project is the repository root.
