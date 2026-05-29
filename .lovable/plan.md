## Problem

The site shows a horizontal scrollbar at most viewports. The page can be dragged left/right even though no section is intentionally wider than the screen.

## Root cause

`src/App.css` still contains the **default Vite starter styles** that were never removed when the real layout was built:

```css
#root {
  max-width: 1280px;   /* constrains the whole app */
  margin: 0 auto;
  padding: 2rem;       /* adds 32px padding on every side of the app */
  text-align: center;  /* forces center alignment everywhere */
}
```

This file is imported in `src/main.tsx` and silently overrides the Tailwind layout system used by `MainLayout`, `Header`, every page container, etc. Symptoms it produces:

- The sticky `Header` (`w-full`) is sized to `#root`'s content box, but full-bleed sections (hero carousel, parallax CTA, client marquee) compute widths from the viewport — the 2rem of horizontal padding on `#root` pushes those sections past the right edge → horizontal scroll.
- Uneven left margins on inner pages (already reported earlier on the Industry page) are the same root cause.
- Stray `text-align: center` leaks into left-aligned sections.

There is also no global safety net: `html`/`body` do not have `overflow-x: hidden`, so any single overflowing child (a long unbreakable string, a future full-bleed element, etc.) will create a body-level horizontal scroll.

## Fix

1. **`src/App.css`** — strip the file down to an empty (or nearly empty) stylesheet. Remove `#root` rules, `.logo`, `.card`, `.read-the-docs`, and the `logo-spin` keyframes. None of them are used by the real app.
2. **`src/index.css`** — in the `@layer base` block, add a small overflow-x guard:
   ```css
   html, body, #root { @apply overflow-x-hidden; max-width: 100%; }
   ```
   This both fixes the current issue and prevents future regressions if a single element ever spills.
3. **Verify** in the browser at 1366×768, 1024×768, 768×1024, and 390×844:
   - No horizontal scrollbar on `/`, `/services`, `/industries`, `/industries/:slug`, `/who-we-are`, `/insights`, `/clients`, `/careers`, `/gallery`, `/contact`.
   - Hero carousel, parallax CTA section, and client logo marquee still render full-bleed (edge-to-edge) and the marquee animation still works (its parent already has `overflow-hidden`, so clipping the body won't break it).
   - Header sticky bar still spans the full viewport width.

No component files need to change — the layout system in `MainLayout`, `Header`, and the per-page `container mx-auto px-4` wrappers is already correct; it was just being overridden by App.css.

## Files touched

- `src/App.css` (clear out Vite defaults)
- `src/index.css` (add global `overflow-x-hidden` on `html, body, #root`)
