# Updating menu content

The catalog data is maintained in `src/data/flavors.ts`.

## Add or edit a flavor

1. Find `rawFlavors` and add or edit a flavor entry.
2. Keep `id` unique and stable; use its category's `id` as `categoryId`.
3. Set a supported `theme` from the `FlavorTheme` union.
4. Optionally set `description`, `featured`, `available`, `isNew` or `season`.
5. Place the corresponding image at `public/images/flavors/<categoryId>/<id>.jpg`, or set an explicit `image` path.
6. Check category filtering, search results and the larger image preview.

Missing image files use a visual fallback; still inspect the page to verify assets before deployment. An omitted `available` field defaults to true.

## Availability, featured items, and seasonal notes

These flags control different behavior in the current UI:

- A **category** with `available: false` is omitted from the category tabs. `getVisibleCategories()` also omits categories that have no flavors at all.
- A **flavor** with `available: false` stays in the explorer results and can still be previewed: its selection is dimmed and the preview shows an `Agotado` badge. This is **not** a mechanism for hiding a flavor from the catalog.
- `featured: true` adds a flavor to the separate featured section. If no flavors are marked, that section and its navigation link are omitted.
- `isNew: true` displays a new-item badge; `season` is currently descriptive data and does not automatically schedule visibility.

After changing these flags, check both the explorer and navigation links, not just the main flavor grid. If a product must disappear completely, plan and review that behavior separately rather than assuming `available: false` hides it.

## Edit categories

Categories are defined in the `categories` array with stable IDs, display names, ordering and an `available` flag. If you rename an ID, update references in flavors and the relevant asset folder.

## Update business details

Edit `src/config/site.ts` for brand details, social links, business hours, gallery, reviews and SEO content. Values intentionally left null or empty suppress unsupported sections. Confirm real business information with its owner before publishing.

## Review checklist

- Names, spelling and category assignments are correct.
- Image paths exist, and descriptions/alt text are appropriate.
- Unavailable products are clearly represented.
- No invented addresses, opening hours or customer reviews were added.
