## Plan: Theme-aware logo

1. Upload both provided logos to Lovable Assets:
   - `edutotal-1.png` (colored) → `src/assets/logo-light.png.asset.json`
   - `edutotal-2.png` (white) → `src/assets/logo-dark.png.asset.json`

2. Update `src/components/layout/Header.tsx`:
   - Import both asset pointers.
   - Track current theme by observing the `dark` class on `<html>` (initial value + `MutationObserver` so it updates live with `ThemeToggle`).
   - Render the colored logo in light mode and the white logo in dark mode.
   - Remove the Supabase `site_settings.logo_url` fetch so these uploaded logos always take precedence (the textual fallback also goes away).

No other files change. No DB or backend changes.