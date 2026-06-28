# Standardize site-wide spacing

The public site currently mixes several spacing systems, which makes content edges and section rhythm jump around as you scroll and move between pages.

## What's inconsistent today

- **Gutters:** most sections use `container mx-auto px-4` (= 16px gutter), but a few use `px-4 md:px-8`, `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`, or no container at all.
- **Max width:** Tailwind's `container` caps at 1400px at 2xl. Other places use `max-w-7xl` (1280px), `max-w-6xl`, or `max-w-3xl`. So content edges shift between sections.
- **Vertical spacing:** sections alternate between `py-12`, `py-16`, `py-20`, `py-24`, `py-28`, `py-36` with no rule. Hero/CTA bands and standard content bands are not differentiated consistently.
- Tailwind's `container` config sets `padding: '2rem'`, but almost every usage overrides with `px-4`, so the config is effectively ignored.

## Reference: Who We Are

Who We Are uses the cleanest pattern, which we'll adopt as the standard:

```
<section className="py-20 bg-...">
  <div className="container mx-auto px-4">
    ...
  </div>
</section>
```

## The new standard (public site only)

1. **Single container pattern** for all content sections:
   `<div className="container mx-auto px-4 md:px-6 lg:px-8">`
   - Update `tailwind.config.ts` container padding to be responsive (`DEFAULT: '1rem', md: '1.5rem', lg: '2rem'`) and keep `2xl: 1400px` max.
   - Remove ad-hoc `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8` wrappers in favor of the container class.
   - Inner narrow blocks (prose, centered intros) keep their own `max-w-2xl/3xl/4xl mx-auto` — that's content width, not layout gutter.

2. **Vertical rhythm — three tiers only:**
   - Hero band: `py-24 md:py-32`
   - Standard content section: `py-20`
   - Compact band (sticky tab nav, breadcrumb, small CTA strip): `py-6` to `py-8`
   - CTA / "next page" bands: `py-20`
   Anything currently at `py-12 / py-16 / py-24 / py-28 / py-36` for a normal content section gets normalized to `py-20`.

3. **Full-bleed sections** (hero carousel, marquees, image galleries that intentionally touch the edges) stay full-bleed — their inner text/captions still sit inside the same container so headings align with the rest of the page.

## Files to update

Public pages:
- `src/pages/Index.tsx` (home — most variance: `py-36`, `py-28`, `py-20`, mixed `px-4 md:px-8`)
- `src/pages/Industries.tsx`
- `src/pages/IndustryDetail.tsx`
- `src/pages/Services.tsx`
- `src/pages/ServiceDetail.tsx`
- `src/pages/About.tsx`
- `src/pages/WhoWeAre.tsx` (already close — minor cleanup only)
- `src/pages/Insights.tsx`, `src/pages/InsightDetail.tsx`
- `src/pages/Careers.tsx`
- `src/pages/Contact.tsx`
- `src/pages/ClientsPage.tsx`

Shared section components:
- `src/components/sections/HeroSection.tsx`
- `src/components/sections/HeroCarousel.tsx` (inner caption container only — keep full-bleed visuals)
- `src/components/sections/TestimonialsSlider.tsx`
- `src/components/sections/ImageGallery.tsx`
- `src/components/sections/ClientLogos.tsx`
- `src/components/sections/NextPageCTA.tsx`

Config:
- `tailwind.config.ts` — responsive `container.padding`.

`/admin/*` pages are out of scope per your answer.

## Out of scope

- No color, typography, copy, or component-logic changes.
- No changes to the hero carousel's visual treatment (kept as-is from the previous fix).
- No changes to inner grid gaps unless they directly cause edge misalignment.

## Verification

- Build the project.
- Spot-check Home, Industries, Industry detail, Services, Service detail, About, Who We Are, Insights, Careers, Contact at desktop (1440), tablet (1024), and mobile (390) — the left/right content edges should line up as you scroll and navigate between pages, and section heights should feel like a consistent rhythm.
