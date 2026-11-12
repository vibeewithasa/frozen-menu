# Troubleshooting

Use the smallest applicable diagnostic step before changing dependencies or configuration.

## Development server does not start

- Confirm Node.js and npm are installed and available on your PATH.
- Run `npm ci` to install the lockfile-defined dependencies.
- Run `npm run dev` again and read the terminal output for the actual error.
- If Vite reports a busy port, use the alternate local address it prints.

## Type checking or linting fails

```bash
npm run typecheck
npm run lint
```

Read the first reported file and line, fix the source, then rerun the command. Do not silence warnings globally just to make a check pass.

## A flavor image is missing

For a flavor without an explicit `image` property, the expected file is:

`public/images/flavors/<categoryId>/<id>.jpg`

Check letter case, file extension, category ID and the resulting URL in browser developer tools. The fallback UI is not proof that the original image exists.

## Corrected flavor image still shows the fallback

`FlavorExplorer.tsx` records preview image failures in the **component-local `imgError` map keyed by flavor ID**. Once a particular image emits `onError`, switching categories or reselecting the same flavor does not clear its error flag. That fallback is not proof that the server is still serving the missing file: after fixing an asset URL or deployment, **reload the page**, then inspect the resolved image response in developer tools. Verify the exact catalog image path, response status and any caching headers before changing flavor data.

This applies to the **large explorer preview**. Featured cards and the hero have separate rendering paths and do not inherit that error map; test those images individually. A cache or network failure may still persist after reload, so do not claim a reload fixes the underlying asset.

## Content section does not appear

Check `src/config/site.ts`. Empty arrays and null business details deliberately suppress some sections and navigation links. Do not fill them with fabricated placeholders.


## A sold-out flavor is still visible

Check the flavor's `available` flag in `src/data/flavors.ts`. Setting it to `false` dims its explorer entry and displays `Agotado` in the preview; it does not remove the flavor from all sections. The decorative marquee, hero count and featured cards can still include sold-out flavors. See [the content guide](content-guide.md#where-sold-out-flavors-still-appear) before changing catalog visibility. Do not remove products from data merely to work around a display expectation without confirming the desired business behavior.

## Search finds fewer flavors than expected

`src/sections/FlavorExplorer.tsx` searches **`f.name` only**, case-insensitively and with diacritics removed. It does not search `description`, `season`, `id` or category labels. A category filter and a text query apply **together**, so a matching flavor in another selected category is excluded.

If a flavor cannot be found, switch the category to `Todos`, clear the search field, then search by its display name (for example, try `mazapan` for `Mazapán`). The list initially shows 24 results; when applicable, `Cargar más` reveals the remaining matches. Use this sequence to distinguish intended filtering from missing catalog data before changing the source.

## Filters or selected flavor disappear after a reload

`src/hooks/useFlavorStore.ts` uses a plain in-memory Zustand store (`activeFlavor`, `category`, `query`) with no `persist` middleware, URL query parameters or storage integration. The current selection and search are therefore **session UI state**, not saved preferences. A full browser reload starts again with all categories, an empty query and no selected preview. Do not diagnose this expected reset as lost catalog data; the actual list of flavors still comes from `src/data/flavors.ts`.

If product requirements call for bookmarked searches or restored sessions, agree on URL/storage behavior and privacy implications first, then implement and test it as a separate feature.

## The deployed page differs from local

Run `npm run build` and `npm run preview`. Compare the deployed commit, hosting build logs, network requests and caching behavior. The Netlify configuration lives in `netlify.toml`.
