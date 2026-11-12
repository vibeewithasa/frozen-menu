# Manual QA checklist

Use this checklist before releasing catalog or layout changes. Record the browser and viewport used, plus any failures.

## Catalog data

- [ ] All visible categories contain the expected flavors.
- [ ] Selecting a category updates the results.
- [ ] Returning to "Todos" restores the full catalog.
- [ ] Searching for an existing flavor returns the expected item.
- [ ] Searching for an unknown flavor shows an understandable empty state.
- [ ] Names with accents remain searchable.
- [ ] Unavailable flavors are represented correctly if any are configured.
- [ ] Flavor images load or show an intentional fallback.

## Interaction and layout

- [ ] Selecting a flavor updates its preview.
- [ ] Selection is usable with a keyboard.
- [ ] Scrolling on a touch device does not accidentally choose a flavor.
- [ ] Navigation anchors lead to visible sections.
- [ ] Layouts remain readable at narrow mobile and desktop widths.
- [ ] No unintended horizontal overflow occurs.

## Content and links

- [ ] Visible contact links open the expected destinations.
- [ ] Sections without verified business data stay hidden.
- [ ] Page title and metadata reflect the current brand.

## Search updates and pagination after rapid typing

`FlavorExplorer.tsx` keeps the input's immediate `query` state, filters on `useDeferredValue(query)`, and resets visible results to **24** in an effect when the deferred query or selected category changes. This is intended to keep typing responsive, but a normal single-keypress check does not exercise intermediate results, a previously expanded list or quick filter changes.

- [ ] With more than 24 matching flavors, select **Cargar más** and confirm the additional items appear.
- [ ] Type several characters rapidly, then clear the search before results settle. After the UI stabilizes, ensure the displayed list matches the **current input**, not an older query.
- [ ] With an expanded list, switch categories or change the search. Confirm the pagination returns to the first 24 matches and that **Cargar más** reports the appropriate remaining count.
- [ ] Search for no results, remove the query and switch back to `Todos`; check that there are no duplicated entries or stale empty messages.

These steps require a browser test; the documented hooks are not evidence that all transitions already pass.

## Active preview after changing a filter

The selected flavor ID is stored independently of the category and search fields in `useFlavorStore`. The explorer currently changes category/query results without clearing that selection, so the large preview may continue displaying a flavor **not in the filtered grid**. This is a source-backed interaction gap requiring product review, not an observed browser-test result.

- [ ] Select a flavor from `Base de leche`, then switch to `Base de agua`; inspect whether the preview still shows the first flavor.
- [ ] Select a result, then search for a different name or a query with zero matches; check whether the preview stays visible and whether that behavior is understandable.
- [ ] Clear the selection using `Cerrar vista del sabor` and confirm the empty-preview prompt returns.

Do not treat a stale selected preview as evidence that filtering returned the wrong items; review these two states separately before changing the implementation.

## When publishing optional gallery or review sections

`src/config/site.ts` currently leaves `gallery` and `reviews` empty. If approved business content is added, review these safeguards separately:

- [ ] Gallery images come from authorized sources, use distinct `src` values (the React list uses `img.src` as its key), have specific `alt` text, and load at multiple viewport widths.
- [ ] A missing gallery image does not have the explorer's error fallback; test the actual image URLs rather than relying on the empty gallery state.
- [ ] Every review is genuine and approved for display; `author`, `text` and optional `source` identify it accurately.
- [ ] Optional numeric `rating` values are finite and between **1 and 5**. `Reviews.tsx` repeats star characters after rounding without runtime bounds checking; a negative or extreme value can cause a rendering error. Omit a rating when none was provided.
- [ ] Verify the `Galería` and `Opiniones` navigation links only appear when their sections contain real content.

## Before release

Run `npm run typecheck`, `npm run lint` and `npm run build`. Browser checks are still required because these commands cannot validate visual behavior.

## Catalog flag regression scenarios

When changing availability or featured flags in `src/data/flavors.ts`, test each behavior separately:

- [ ] Set one flavor's `available` to `false` temporarily: it remains in explorer results, appears dimmed, and its preview shows `Agotado`.
- [ ] Set one category's `available` to `false` temporarily: its tab disappears; restore the value after checking.
- [ ] Mark one flavor `featured: true` temporarily: it appears in the featured section and the navigation entry becomes available; remove the flag afterward if it was only a test.
- [ ] With no featured flavors, confirm the featured section and navigation entry are absent.
- [ ] Change `season` on a test flavor: confirm this metadata alone does not schedule automatic visibility changes.

Restore all temporary catalog edits before committing or publishing. These are manual scenarios, not assertions that a browser test has already passed.
