# Frozen Menu — Interactive Ice Cream Menu

A responsive, interactive digital menu developed for **Helados Gourmet Leal**. Visitors can browse a selection of ice cream flavors and view the corresponding product images.

## Features

- Selectable flavor catalog
- Product images shown on demand
- Responsive grid for mobile and desktop
- Pointer gesture handling to avoid accidental selections while scrolling
- Keyboard-accessible flavor selection
- Social contact links
- Light and dark theme styling

## Tech stack

**React · TypeScript · Vite · Tailwind CSS · Zustand · Framer Motion**

The repository also contains experimental 3D-related code and dependencies (React Three Fiber / Three.js); the current main page uses the interactive flavor catalog.

## Run locally

Requires Node.js and npm.

```bash
npm install
npm run dev
```

Useful commands:

```bash
npm run build
npm run preview
npm run lint
npm run typecheck
```

## Project structure

- `src/components/` — page header, footer, and shared UI
- `src/features/flavor-list/` — flavor catalog and interactions
- `src/hooks/` — local UI state
- `public/images/` — menu imagery and flavor assets
- `netlify.toml` — deployment configuration

## License and assets

The project contains an existing [MIT license](LICENSE) for the repository's software. Product photographs, names, logos, and other brand materials may be subject to separate ownership or usage rights; verify them before reuse.

## Status

A functional interactive flavor menu. Additional visual experiments and refinements may be developed separately.
