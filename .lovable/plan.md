

## Redesign Testimonials / Impact Stories Section

### Current State
The section displays testimonials in a static 3-column grid with quote marks, numbers, and hover accent lines. It loads up to 3 testimonials from the database.

### Plan

**1. Increase testimonial limit**
- Change the query limit from 3 to 10 to support a proper slider experience.

**2. Replace grid layout with an interactive slider**
- Build a full-width slider using Framer Motion's `AnimatePresence` (consistent with the existing `HeroCarousel` pattern).
- Dark background (`bg-foreground`) with light text for visual contrast and premium feel.
- Center the active testimonial with a large serif quote, author info with avatar, and organization.
- Add left/right navigation arrows and dot indicators at the bottom.
- Auto-advance every 8 seconds with pause on hover.

**3. Visual design details**
- Large decorative quotation mark as a subtle background element.
- Testimonial text in large serif font (2xl-4xl), centered.
- Author section below with circular avatar, name, role, and organization.
- Smooth crossfade animation between testimonials.
- Slide counter or progress dots styled with accent color.
- Navigation arrows styled similarly to the hero carousel (circular, bordered).

**4. Files modified**
- `src/pages/Index.tsx` — Replace the testimonials section (lines 343-421) with the new slider component, update query limit.

