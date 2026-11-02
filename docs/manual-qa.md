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
