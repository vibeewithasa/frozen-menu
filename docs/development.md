# Local development

This project is a React + TypeScript single-page application built with Vite.

## Prerequisites

- Node.js and npm
- A current browser for manual checks

## First run

```bash
npm ci
npm run dev
```

`npm ci` installs the dependency versions recorded in `package-lock.json`. Open the local URL printed by Vite.

## Validation commands

```bash
npm run typecheck
npm run lint
npm run build
npm run preview
```

`typecheck` runs TypeScript without emitting files; `lint` checks the source files with ESLint; `build` creates a production bundle in `dist/`; `preview` serves that bundle locally.

## Suggested change workflow

1. Make one focused change.
2. Run type checking and linting.
3. Build the app, then inspect the affected page in a browser.
4. Check desktop and mobile widths before committing.

The repository does not currently declare a `test` npm script. Use the manual testing checklist until automated coverage is added.
