# Accessibility review

This is a manual review guide, not a claim of WCAG certification.

## Keyboard

1. Navigate from the top of the page using only Tab and Shift+Tab.
2. Check that the navigation, category controls, search field and flavor buttons can be reached.
3. Confirm a visible focus indicator is present on interactive elements.
4. Activate flavor selections with Enter or Space as appropriate.
5. Confirm focus remains usable after filtering or changing the preview.

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

Review text/background contrast, zoom to 200%, narrow viewport reflow and focus visibility. Test light and dark appearances where applicable.

When fixing an issue, record the browser, assistive technology (if used), reproduction steps and expected behavior.
