# Deployment notes

The repository includes `netlify.toml` with a Vite build configuration:

- Build command: `npm run build`
- Publish directory: `dist`
- Fallback redirect: `/*` to `/index.html` with status 200

The configuration also defines cache headers, including a separate rule for `/index.html`. Review those rules when changing asset naming or hosting behavior.

## Cache verification for updated images

The current `netlify.toml` applies `Cache-Control: public, max-age=31536000, immutable` to `/*`, alongside a more specific `/index.html` revalidation rule. Because flavor artwork uses stable public paths such as `/images/flavors/<categoryId>/<id>.jpg`, replacing an image **without changing its URL** can leave visitors seeing the old copy if it was cached with the immutable policy.

Before promoting a release that replaces an existing image, inspect the actual deployed response headers for that image and `/index.html` (do not assume which overlapping Netlify rule wins). Test with a warm browser cache as well as a private window. If the old asset remains cached, review an intentional filename/versioning or cache-policy change separately with deployment tests; this document does not change hosting configuration.

## Social-preview image URLs

`index.html` currently declares an Open Graph image using the root-relative path `/images/logo-helados.png` and repeats that path in structured data and Twitter metadata. Some social crawlers expect an **absolute public HTTPS URL** for share images; a local build passing does not prove that an external preview service can resolve a relative URL. After connecting the final domain, verify the deployed document and test its share preview with the relevant crawler/debugger, including image dimensions and public access. Do not invent a production domain or silently change social metadata without confirming the actual deployment URL.

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
