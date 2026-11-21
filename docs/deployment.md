# Deployment notes

The repository includes `netlify.toml` with a Vite build configuration:

- Build command: `npm run build`
- Publish directory: `dist`
- Fallback redirect: `/*` to `/index.html` with status 200

The configuration also defines cache headers, including a separate rule for `/index.html`. Review those rules when changing asset naming or hosting behavior.

## Cache verification for updated images

The current `netlify.toml` applies `Cache-Control: public, max-age=31536000, immutable` to `/*`, alongside a more specific `/index.html` revalidation rule. Because flavor artwork uses stable public paths such as `/images/flavors/<categoryId>/<id>.jpg`, replacing an image **without changing its URL** can leave visitors seeing the old copy if it was cached with the immutable policy.

Before promoting a release that replaces an existing image, inspect the actual deployed response headers for that image and `/index.html` (do not assume which overlapping Netlify rule wins). Test with a warm browser cache as well as a private window. If the old asset remains cached, review an intentional filename/versioning or cache-policy change separately with deployment tests; this document does not change hosting configuration.

## Logo and favicon cache consistency

The same public file `/images/logo-helados.png` appears in `index.html` as the favicon, Apple touch icon, Open Graph/Twitter image and structured-data image; it also appears in the decorative hero and navigation. The `/*` long-lived immutable caching rule can make **some returning visitors keep an older logo after a rebrand**, even when newly deployed HTML references the current name. A private-window test alone may miss that failure because it starts with an empty cache.

Before changing the logo, test a returning browser with a **warm cache** as well as a clean session. Inspect the deployed response headers for `/images/logo-helados.png` and `/index.html`, the browser tab icon, navigation/hero artwork and a social-card preview. If the public image URL needs to change, review all referenced surfaces **together**, including `src/config/site.ts`, and plan an explicitly versioned asset or cache-policy adjustment; do not just disable caching globally without a measured deployment test.

## Social-preview image URLs

`index.html` currently declares an Open Graph image using the root-relative path `/images/logo-helados.png` and repeats that path in structured data and Twitter metadata. Some social crawlers expect an **absolute public HTTPS URL** for share images; a local build passing does not prove that an external preview service can resolve a relative URL. After connecting the final domain, verify the deployed document and test its share preview with the relevant crawler/debugger, including image dimensions and public access. Do not invent a production domain or silently change social metadata without confirming the actual deployment URL.

## Fonts and third-party connectivity

`index.html` fetches **Fraunces and Inter** through `fonts.googleapis.com` and `fonts.gstatic.com`; they are not guaranteed to be cached or accessible on a visitor's network. A successful Vite build does not include those remote responses, and a cached developer browser can mask a blocked font request.

- In a clean browser profile, block both Google Fonts hosts and reload. Check that the catalog, headings, navigation and buttons remain legible in their fallback fonts with no unexpected layout overflow.
- Repeat on a slow mobile connection and with browser zoom. Inspect font request failures and layout movement rather than treating every network warning as a JavaScript failure.
- If offline font availability or avoiding third-party requests becomes a requirement, review license and self-hosted asset packaging **as a separate implementation change**. Do not assume the current source bundles the fonts or change their CDN configuration without testing.

These are publication checks, **not** measurements already made in a browser.

## Hosting at the domain root versus a subdirectory

The current `vite.config.ts` does **not** configure a non-root `base`, and both `index.html` and the React components reference root-absolute paths such as `/src/main.tsx` (rewritten by Vite for the build) and `/images/logo-helados.png`. Therefore the documented Netlify setup assumes the site is served at the **origin root** (`https://example.com/`), not automatically at `/catalogo/` or another nested directory. Copying `dist/` below a URL prefix without reviewing these paths can break the bundle, catalog images and social previews even when `npm run build` succeeds.

If the deployment needs a subpath, first decide the canonical public URL and review Vite's `base`, every root-absolute image/icon path, metadata URLs and hosting rewrite rules **together**. Validate the built assets and page via that exact subpath in a test deployment, including direct reloads and a clean-cache browser. Do not blindly change the Netlify redirect or replace paths with an invented production domain. This is a deployment limitation documented from source, **not** an already implemented subpath mode.

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
