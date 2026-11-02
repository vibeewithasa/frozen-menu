# Deployment notes

The repository includes `netlify.toml` with a Vite build configuration:

- Build command: `npm run build`
- Publish directory: `dist`
- Fallback redirect: `/*` to `/index.html` with status 200

The configuration also defines cache headers, including a separate rule for `/index.html`. Review those rules when changing asset naming or hosting behavior.

## Before publishing

```bash
npm ci
npm run typecheck
npm run lint
npm run build
```

Then review the build with `npm run preview`. A successful build does not replace browser checks.

## After publishing

1. Open the site in a normal browser and a private window.
2. Check that the catalog and all visible product images load.
3. Test category filtering, the search field and flavor selection.
4. Test social/contact links and any newly enabled sections.
5. Check mobile and desktop layouts and browser console errors.

## Rollback

Keep the previous known-good Git commit available. If a release is broken, use the hosting platform's deployment rollback mechanism when supported, or redeploy a known-good revision. Avoid making speculative live changes without reproducing the issue.
