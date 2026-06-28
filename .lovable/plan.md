# Rebuild SearchDialog as a command-center popup

Restyle `src/components/SearchDialog.tsx` to match the selected "Command center" prototype, while keeping all existing behavior (Supabase query, debounce, routing, props).

## Layout & structure

- Dialog opens **top-aligned** (≈10vh from top), not vertically centered.
- Widen to `sm:max-w-2xl`, rounded `rounded-xl`, removed default header.
- Three zones: search input header, scrollable grouped results, sticky footer with keyboard hints.

## Search header

- 24px green search icon (uses `text-accent` / accent token) on the left.
- Large input (`text-xl`, `py-5`, transparent, no ring).
- `ESC` kbd badge on the right.
- Subtle bottom border.

## Results

- Group results by type into three sections: **Services**, **Insights**, **Industries** (sections render only when they have hits).
- Section label: uppercase, tracked, muted, 11px.
- Each result row:
  - 40×40 tinted icon tile (`bg-accent/10 text-accent`) that fills to solid accent on hover.
  - Title (medium weight; insights use Libre Baskerville italic to match the editorial feel).
  - One-line excerpt in muted-foreground text.
  - Hover: row background `bg-muted/50`.
- Scrollable container `max-h-[480px]`.
- Subtle dividers between groups.

## Empty / no-results / loading

- Empty (no query): centered prompt with two suggestion chips ("Services", "Insights", "Industries") that prefill the query.
- Loading: spinner stays in the input row (current behavior preserved).
- No results: refined centered "No results for …" message.

## Sticky footer

- Left: ↑↓ Navigate · ENTER Select kbd hints.
- Right: green "N results" count when results exist.

## Theming

- Use semantic tokens (`bg-popover`, `border-border`, `text-foreground`, `text-muted-foreground`, `bg-accent`, `text-accent`) so it works in both light and dark themes — no hardcoded `bg-[#1a1a1a]` / `text-white`.

## Motion

- Existing Radix Dialog fade/zoom kept.
- Add a soft stagger on result rows via Framer Motion (`opacity`+`y`, 30ms stagger) on each query result render.

## Out of scope

- No changes to header trigger button, keyboard shortcut wiring, or Supabase schema.
- No new result types.
- No arrow-key navigation logic (the footer hint is visual; full kbd nav is a separate task).

## Files

- `src/components/SearchDialog.tsx` — rewrite render; keep state & data-fetch logic identical.

## Verify

- Build.
- Playwright: open `/`, trigger search via header button, type a query, screenshot to confirm grouped layout, footer bar, and light/dark parity.
