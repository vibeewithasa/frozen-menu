# Application architecture

`src/App.tsx` composes the navigation, main sections and footer into one page. Section components live in `src/sections/`, while layout and reusable UI components live in `src/components/`.

## Source-of-truth files

- `src/data/flavors.ts`: category and flavor definitions, plus catalog helpers.
- `src/config/site.ts`: brand, contact information, optional business content and SEO metadata.

Avoid copying business details into individual components. Update the source-of-truth file instead.

## Catalog interactions

`src/sections/FlavorExplorer.tsx` renders the flavor grid, filtering controls and preview. `src/hooks/useFlavorStore.ts` holds the selected flavor, active category and search query using Zustand. Changes to catalog data flow into the UI through imports and derived helper functions.

## Presentation utilities

- `src/lib/flavorTheme.ts` maps typed theme names to CSS custom properties.
- `src/lib/motion.ts` provides animation variants/transitions.
- `src/hooks/useReducedMotion.ts` reads the user's reduced-motion preference.
- `src/lib/sections.ts` derives navigation items from available content.
- `src/utils/a11y.ts` contains an accessibility preference helper.

## Content-dependent sections

Business sections such as gallery, reviews and visit details are optional. Keep them conditional rather than publishing invented placeholder information.
