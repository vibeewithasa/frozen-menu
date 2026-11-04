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
