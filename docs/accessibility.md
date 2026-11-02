# Accessibility review

This is a manual review guide, not a claim of WCAG certification.

## Keyboard

1. Navigate from the top of the page using only Tab and Shift+Tab.
2. Check that the navigation, category controls, search field and flavor buttons can be reached.
3. Confirm a visible focus indicator is present on interactive elements.
4. Activate flavor selections with Enter or Space as appropriate.
5. Confirm focus remains usable after filtering or changing the preview.

## Screen reader basics

- Check meaningful names for the search input and flavor controls.
- Check that product images have useful alternative text or are intentionally decorative.
- Check that headings follow a comprehensible hierarchy.
- Check that empty search results and selection changes remain understandable.

## Motion preferences

`src/hooks/useReducedMotion.ts` wraps Framer Motion's reduced-motion preference, and `src/utils/a11y.ts` contains a media-query helper.

Test with `prefers-reduced-motion: reduce` enabled in browser or operating-system settings. Verify that essential content remains available without depending on animation.

## Visual legibility

Review text/background contrast, zoom to 200%, narrow viewport reflow and focus visibility. Test light and dark appearances where applicable.

When fixing an issue, record the browser, assistive technology (if used), reproduction steps and expected behavior.
