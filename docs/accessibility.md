# Accessibility review

This is a manual review guide, not a claim of WCAG certification.

## Keyboard

1. Navigate from the top of the page using only Tab and Shift+Tab.
2. Check that the navigation, category controls, search field and flavor buttons can be reached.
3. Confirm a visible focus indicator is present on interactive elements.
4. Activate flavor selections with Enter or Space as appropriate.
5. Confirm focus remains usable after filtering or changing the preview.

## Focus visibility on catalog controls

The app-wide CSS in `src/styles/globals.css` defines a `:focus-visible` outline, but `FlavorExplorer.tsx` adds Tailwind `focus-visible:outline-none` to the search field, flavor buttons and preview-close control. These local classes may override the shared focus indication. The search field changes its border on focus; the catalog buttons do not define a comparable explicit focus ring in their own class lists.

- [ ] Starting with a mouse-free reload, use Tab and Shift+Tab to focus **Todos**, each category chip, **Buscar sabor**, a flavor result, and **Cerrar vista del sabor** after selecting one.
- [ ] Verify that **every** focused control has a high-contrast, unambiguous visible indicator against its selected, dimmed, and normal backgrounds.
- [ ] Repeat with browser zoom and the high-contrast/forced-colors mode where supported. Do not rely on a mouse hover state as the keyboard focus style.
- [ ] If the outline is absent, fix the component styles and rerun the browser checks in a separately reviewed change; the current source inspection alone does not establish the rendered result.

## Skip link and mobile navigation checks

The `index.html` skip link targets `#main` in `src/App.tsx`, and `Nav.tsx` controls its mobile navigation with a button that exposes `aria-expanded` and `aria-controls="mobile-menu"`. The menu code also handles Escape by closing the menu and returning focus to its toggle.

Review these source-backed behaviors manually:

1. Reload at the top of the page, press Tab, and verify `Saltar al contenido` becomes visible and leads to the main content.
2. At a mobile viewport, open the navigation using the keyboard; verify the toggle's accessible name and expanded state.
3. Press Escape with the menu open; verify the panel closes and focus returns to the toggle.
4. Open it again, follow a navigation anchor, and check that the panel closes without obscuring the destination.
5. Verify that links hidden from navigation due to missing business data are not offered as dead anchors.

These are regression steps, not evidence of a completed keyboard or screen-reader audit.

## Screen reader basics

- Check meaningful names for the search input and flavor controls.
- Check that product images have useful alternative text or are intentionally decorative.
- Check that headings follow a comprehensible hierarchy.
- Check that empty search results and selection changes remain understandable.

## Dynamic catalog announcements

`FlavorExplorer.tsx` sets `aria-live="polite"` on the selected-flavor preview container, while its empty-search message is an animated `<p>` without an explicit status role. Category chips and flavor buttons report selection visually (flavor buttons also have `aria-pressed`). The markup does not, by itself, prove that a screen reader announces **the right amount** of updated content or the **zero-results message**.

- [ ] With a screen reader, focus one flavor result and activate it twice; check whether the chosen flavor, category and availability are announced coherently without repeating an entire card unnecessarily.
- [ ] Type a query with no matches and confirm that the empty state can be discovered without leaving the search field; record whether an automatic status announcement is missing.
- [ ] Move between `Todos` and an individual category using keyboard navigation, then inspect the selected state and result count accessibility.
- [ ] Clear the preview and confirm the `Cerrar vista del sabor` button is removed from the focus order and focus stays predictable.

Log the actual browser/screen-reader pairing and findings; any ARIA adjustment should be followed by a separate accessibility review, not guessed from source inspection.

## Review stars and spoken ratings

If real reviews are enabled, `Reviews.tsx` renders the **visible star count using `Math.round(r.rating)`** while the `aria-label` reports the **unrounded** numeric `r.rating` (for example, 4.4 displays four filled stars yet announces `4.4 de 5 estrellas`). The catalog's content guide already restricts ratings to finite values from 1 to 5, but **fractional values can still communicate different precision visually and audibly**. The reviews array is empty today, so this has not been exercised with live content.

- [ ] In a local, temporary review fixture, compare a fractional rating, an integer rating and an omitted rating with a screen reader and visual inspection.
- [ ] Confirm the announced count and the graphic represent the same rating convention approved by the business; if partial stars or a textual rating are needed, review the rendering in a separate UI change.
- [ ] Remove all test reviews before committing or deploying; never invent customer testimonials to fill the empty section.

## Motion preferences

`src/hooks/useReducedMotion.ts` wraps Framer Motion's reduced-motion preference, and `src/utils/a11y.ts` contains a media-query helper.

Test with `prefers-reduced-motion: reduce` enabled in browser or operating-system settings. Verify that essential content remains available without depending on animation.

## Known mobile preview scroll gap

In `src/sections/FlavorExplorer.tsx`, selecting a flavor below 1024 px schedules `scrollIntoView({ behavior: "smooth", block: "center" })` even when the reduced-motion hook returns `true`. This is an observed **source-code gap**, not a claim that browser behavior was tested.

To reproduce, enable reduced motion in the browser/OS, use a viewport narrower than 1024 px, select a flavor, and inspect how the preview moves into view. Desired behavior: honor the motion preference (or avoid animated scrolling) while keeping the selected preview visible. A future code fix should have a dedicated browser check; the current document does not imply that the gap is fixed.

## Touch scrolling and accidental flavor selection

The flavor tiles in `FlavorExplorer.tsx` use native `<button onClick={...}>` handlers; there is **no custom touch-gesture discrimination** in the current component. Browsers normally suppress clicks after a true scroll gesture, but the project itself does not guarantee that a near-tap while moving a finger cannot select a flavor. The mobile selection also requests smooth scrolling to the preview (see the reduced-motion gap above).

On a physical touch device, drag through the grid with slow and quick gestures, stop a drag near a button, and check whether selection and automatic scrolling occur unexpectedly. Repeat a deliberate tap to make sure selection still works. Record device/browser and touch behavior; a desktop mouse test alone cannot establish this interaction is safe. This is a manual test recommendation, not a verified defect.

## Visual legibility

Review text/background contrast, zoom to 200%, narrow viewport reflow and focus visibility in the current **light, cream-colored appearance**. The application does not presently implement a separate dark theme; do not report dark-mode accessibility tests as passing unless such a theme is added and actually exercised.

When fixing an issue, record the browser, assistive technology (if used), reproduction steps and expected behavior.
