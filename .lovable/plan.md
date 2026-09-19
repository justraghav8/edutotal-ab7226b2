# Correct location maps in Footer and Contact Us

## Goal
Use the address managed in the website settings — **904, Indraprakash Building, 21, Barakhamba Road, New Delhi – 110001, India** — consistently for map display and directions.

## Changes

### Footer
- Keep the existing address display sourced from website settings.
- Add a branded **Click for Directions** button directly below the address.
- Open Google Maps directions in a new tab, with the managed address pre-filled as the destination.
- Include a directions icon and accessible labeling.

### Contact Us page
- Add a dedicated **Find Us** map section below the contact form/information area.
- Embed a responsive Google map centered on the managed address.
- Show the address alongside a **Click for Directions** action that opens turn-by-turn directions in Google Maps.
- Provide a graceful fallback link if the embedded map cannot load.

### Consistency and verification
- Build both map and directions URLs from the same database-managed address so future address edits update both locations automatically.
- Preserve the current light/dark visual system and mobile layout.
- Verify the footer button, embedded map, and directions link on desktop and mobile, including keyboard accessibility and correct destination.

## Technical details
- Reuse the existing `site_settings.contact_address` value already loaded by both areas.
- Use a Google Maps embed generated from that address; no new location data will be hardcoded into the page presentation.
- Use the existing design-system button rather than a custom control.
