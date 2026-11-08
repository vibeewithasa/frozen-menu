# Updating menu content

The catalog data is maintained in `src/data/flavors.ts`.

## Add or edit a flavor

1. Find `rawFlavors` and add or edit a flavor entry.
2. Keep `id` unique and stable; use its category's `id` as `categoryId`.
3. Set a supported `theme` from the `FlavorTheme` union.
4. Optionally set `description`, `featured`, `available`, `isNew` or `season`.
5. Place the corresponding image at `public/images/flavors/<categoryId>/<id>.jpg`, or set an explicit `image` path.
6. Check category filtering, search results and the larger image preview.

The **explorer preview** shows a visual fallback when an image fails to load; still verify assets before deployment. The **featured section does not have the same network-error fallback**: `Featured.tsx` renders an `<img>` when its `image` path is nonempty, and `resolveImage()` supplies a nonempty default path for every catalog flavor. A missing featured image may therefore render broken even when the explorer preview looks acceptable. Check a newly featured flavor's image in **both** places. An omitted `available` field defaults to true.

## Availability, featured items, and seasonal notes

These flags control different behavior in the current UI:

- A **category** with `available: false` is omitted from the category tabs. `getVisibleCategories()` also omits categories that have no flavors at all. **However, this flag does not hide the category's products from `Todos` or name search**: the explorer filters the `flavors` list without checking the parent category's `available` flag. Do not use the category setting as a publication embargo.
- A **flavor** with `available: false` stays in the explorer results and can still be previewed: its selection is dimmed and the preview shows an `Agotado` badge. This is **not** a mechanism for hiding a flavor from the catalog.
- `featured: true` adds a flavor to the separate featured section. If no flavors are marked, that section and its navigation link are omitted.
- `isNew: true` displays a new-item badge; `season` is currently descriptive data and does not automatically schedule visibility.

After changing these flags, check both the explorer and navigation links, not just the main flavor grid. If a product must disappear completely, plan and review that behavior separately rather than assuming `available: false` hides it.

### Where sold-out flavors still appear

The current `FlavorMarquee.tsx` renders the full `flavors` array, including entries with `available: false`, in a decorative ribbon. The `Hero.tsx` flavor count also uses `flavors.length`, not a count of available items. The `Featured.tsx` section uses `featuredFlavors` and does not filter by `available`, so a flavor that is both featured and sold out may still have a featured card.

This matters when publishing availability changes: review explorer results, marquee, featured cards and hero count together. Do not interpret the homepage count as the number currently in stock; hiding unavailable products in these secondary surfaces would require a separate, tested code change.

## Edit categories

Categories are defined in the `categories` array with stable IDs, display names, ordering and an `available` flag. If you rename an ID, update references in flavors and the relevant asset folder.

## Update business details

Edit `src/config/site.ts` for brand details, social links, business hours, gallery, reviews and SEO content. Values intentionally left null or empty suppress unsupported sections. Confirm real business information with its owner before publishing.


## Pre-publication data integrity checks

Before adding a batch of flavors, compare every new `id` against the existing `rawFlavors` entries. IDs are used for lookup and default image paths, so duplicate IDs can cause the wrong item to be selected. Confirm each `categoryId` exists in `categories`, and avoid renaming existing IDs unless the corresponding images and references are updated together.

For each new flavor, open its resolved image URL in a browser (the convention uses a `.jpg` extension). A working fallback does not establish that the intended photograph was uploaded. Check the menu with both the new category selected and `Todos` selected, then search for the flavor by its visible name. These checks are manual; this repository does not currently declare an automated test script.

## Validate social handles and order links

`src/config/site.ts` stores **handles, not complete social URLs**. The `instagramUrl()` and `facebookUrl()` helpers prepend the relevant hostname; pasting `https://...` into `site.instagram` or `site.facebook` would construct a malformed destination. Set only the exact approved profile handle or page path. `site.whatsapp` must contain the full international number **as digits only**, without `+`, spaces or dashes: `whatsappUrl()` inserts it into `https://wa.me/` and URL-encodes any optional prefilled text.

After changing these fields, click the actual links on desktop and mobile, verify the destination profile/number with the business owner, and check that `Pedir por WhatsApp` contains the intended prefilled message. A working social domain is not proof that it is the correct account.

## Review checklist

- Names, spelling and category assignments are correct.
- Image paths exist, and descriptions/alt text are appropriate.
- Unavailable products are clearly represented.
- No invented addresses, opening hours or customer reviews were added.
