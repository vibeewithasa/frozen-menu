# Application architecture

`src/App.tsx` composes the navigation, main sections and footer into one page. Section components live in `src/sections/`, while layout and reusable UI components live in `src/components/`.

## Source-of-truth files

- `src/data/flavors.ts`: category and flavor definitions, plus catalog helpers.
- `src/config/site.ts`: brand, contact information, optional business content and SEO metadata.

Avoid copying business details into individual React components. Update the corresponding source-of-truth file instead.

## Static document metadata is a separate publication surface

`src/config/site.ts` defines `site.seo` (title, description, Open Graph image and optional canonical URL), but the current `index.html` also contains **hard-coded** title, description, Open Graph/Twitter tags and `IceCreamShop` structured data. The HTML does not dynamically import `site.seo`. Changing the TypeScript configuration alone therefore does **not** update those document-head values.

Before a brand or domain change, review both files together. Check `index.html` for the favicon, social-preview image, structured-data `sameAs` accounts and published metadata; only add business address, opening hours or prices after independent confirmation. This is a documentation note about the current implementation, not an automatic metadata synchronization feature.

## Catalog interactions

`src/sections/FlavorExplorer.tsx` renders the flavor grid, filtering controls and preview. `src/hooks/useFlavorStore.ts` holds the selected flavor, active category and search query using Zustand. Changes to catalog data flow into the UI through imports and derived helper functions.

**State boundaries matter when debugging:** the Zustand store is in-memory only; it does not use `persist`, browser storage or query-string synchronization. The selected flavor ID is **independent** of the category and query, so filtering does not automatically clear the large preview. The component applies `useDeferredValue(query)` to keep typing responsive, derives results via normalized name/category matching and owns the visible page size locally (`24` initially, `24` more per click). It resets that page size when category or deferred query changes; the component also owns image-failure flags keyed by flavor ID. These are interface states, **not** persisted catalog data or server-side pagination. A full browser reload discards them; the actual source catalog remains `src/data/flavors.ts`.

For any future deep-link, bookmarking or persisted-filter feature, decide the URL/session semantics and test fast typing, `Cargar más`, active preview and image failures together. See `docs/manual-qa.md` for reproduction scenarios.

## Presentation utilities

- `src/lib/flavorTheme.ts` maps typed theme names to CSS custom properties.
- `src/lib/motion.ts` provides animation variants/transitions.
- `src/hooks/useReducedMotion.ts` reads the user's reduced-motion preference.
- `src/lib/sections.ts` derives navigation items from available content.
- `src/utils/a11y.ts` contains an accessibility preference helper.

## Content-dependent sections

Business sections such as gallery, reviews and visit details are optional. Keep them conditional rather than publishing invented placeholder information.
