This is a large, multi-area pass. I'll group the work into 11 sections matching your numbering. Where useful, I've split items into clearly scoped tasks and called out trade-offs.

## 1. Images Across Landing Pages

- Audit Index, About, WhoWeAre, Services, Industries, Insights, Clients, Careers, Contact for missing/broken images.
- Add a shared `SafeImage` component with skeleton + hash-based fallback so any blank image area degrades gracefully instead of showing a broken icon.
- Replace bare `<img>` tags in key sections (Industries grid, Service detail hero, Insights cards, NextPageCTA backgrounds) with `SafeImage`.

## 2. Who We Are — Leadership / Team / Advisory

- LinkedIn icon already saved per member. Add a per-member toggle `show_linkedin` (boolean) and `show_email` (boolean) on `team_members` so each icon can be enabled/disabled individually in the CMS form. Default true.
- Refresh layout to a unified, consistent visual treatment across all three categories:
  - Leadership: large alternating cards with rounded-2xl portraits and a soft "device-frame" border (inner ring + outer shadow).
  - Team: square portraits in a uniform grid, all with rounded-2xl + subtle gradient ring on hover.
  - Advisory: same portrait treatment, side-by-side bio. Aspect ratios standardized to 4:5 across all sections so faces don't get cropped inconsistently.
- Optional iPhone/device-frame style: rounded-[2rem] outer + thin border + inner padding + drop shadow. We'll go with this contemporary look.

## 3. Image Gallery

- Create dedicated `/gallery` page (currently the gallery section only renders inside About). Header link "Gallery" will route to `/gallery` instead of `/about#gallery`.
- The page reuses the existing `ImageGallery` section but in a full-page layout with hero, full grid (not just horizontal scroll), filters by year/category if present, and lightbox.
- Upload capacity: confirm in-line. Current bucket is the shared `images` bucket on Lovable Cloud (default 50 MB per file). There's no hard image-count limit beyond your storage quota. We'll surface this and keep gallery uploads in the same `images` bucket; admin Gallery already lists & sorts via `order_index`.

## 4. Services

- ServiceDetail hero: replace plain primary background with `service.image_url` as a darkened cover image (fallback to gradient if missing). Add subtle overlay so text remains readable.
- ServiceFormDialog: confirm and (if missing) add full editing for `approach[]`, `benefits[]`, `domestic_expertise`, `international_expertise`, `image_url`, `order_index`. Make `order_index` an editable integer with helpful "Drag-to-reorder" guidance text (true drag-reorder UI is out of scope for this pass; numeric reorder is supported).
- Services admin list: sort by `order_index` and show the order column directly editable inline (up/down arrows) so the user can renumber without opening the form.

## 5. Testimonials / Homepage Display

- Redesign the testimonials section into a structured block format:
  - Each slide shows a left logo block (client.logo_url tied via new optional `client_id` link OR a per-testimonial `logo_url` field — see schema note) prominently, with a separator, then quote, then name/role/organization in clear hierarchy.
  - Add `logo_url` column to `testimonials` table for direct logo upload per testimonial.
- Update TestimonialFormDialog with `logo_url` field.
- Improve typography and add a card-style block with border + shadow so the elements stand out more.

## 6. Industries

- Add `image_url` column to `industries` table.
- Industries listing: each card shows a hero image at top, with title/description below.
- IndustryDetail: add hero image, plus a new editable `content_box` rich-text field (jsonb/text). Add to schema and `IndustryFormDialog`.
- Use `RichTextEditor` for the content box so admins can format freely.

## 7. Clients

- Add `description` (3–4 line caption) column to `clients` table.
- Update `ClientFormDialog` to include description field.
- Clients page + homepage marquee: on hover over a logo, slide up an overlay revealing the description. Click on logo opens `client.website` in new tab (already implemented, will verify).
- For missing logos, add a placeholder + label so cards never appear empty.

## 8. Get in Touch — Make icons actionable

- Address icon → wraps in `<a target="_blank" href="https://www.google.com/maps/search/?api=1&query=...">`. Address string also URL-encoded.
- Email → already `mailto:` (verify on all places).
- Phone → already `tel:` on Contact page; verify in Footer too. Both will be properly linked, ensuring mobile-tap-to-dial works.
- Make the entire icon+text block clickable, not just the text.

## 9. Visual Treatment — Continue Exploring & plain backgrounds

- Add a subtle background treatment to `NextPageCTA` (faint geometric SVG watermark + soft gradient) so it no longer feels plain.
- Apply the same treatment to other plain section backgrounds (Industries CTA, Contact business hours card).

## 10. CMS Scope — Confirmation

Confirmed CRUD coverage exists for: About content (via site_settings + hero_banners), Who We Are/Team, Services, Industries (will be expanded in #6), Insights, Testimonials (expanded in #5), Image Gallery, Clients (expanded in #7), Hero Banners, Careers, Contact submissions (read-only). Will explicitly verify each admin route renders a working form, and add a note on the Admin Dashboard listing all manageable models.

## 11. Further Additions

- **Footer social media:** add `social_instagram`, `social_youtube` columns to `site_settings` (plus future-proof `social_links` jsonb array `[{platform, url, enabled}]`). Footer pulls from `site_settings`. Each link can be enabled/disabled and new ones added via Settings admin.
- **Logo placement:** Add `logo_url` from `site_settings` to both Header (replacing/augmenting "EduTotal" wordmark) and Footer. Falls back to the wordmark if no logo set.
- **Default day mode:** update `src/main.tsx` to default to `light` instead of following `prefers-color-scheme: dark`. Theme toggle still works and persists user's choice.

## Technical details

### Schema migrations (single migration)

```text
ALTER TABLE team_members
  ADD COLUMN show_linkedin boolean DEFAULT true,
  ADD COLUMN show_email boolean DEFAULT true;

ALTER TABLE testimonials
  ADD COLUMN logo_url text;

ALTER TABLE industries
  ADD COLUMN image_url text,
  ADD COLUMN content_box text;

ALTER TABLE clients
  ADD COLUMN description text;

ALTER TABLE site_settings
  ADD COLUMN social_instagram text,
  ADD COLUMN social_youtube text,
  ADD COLUMN social_links jsonb DEFAULT '[]'::jsonb,
  ADD COLUMN logo_url text;  -- already exists, will skip if present
```

### New files

- `src/components/SafeImage.tsx`
- `src/components/LanguageSwitcher.tsx`
- `src/i18n/index.ts` + `src/i18n/locales/{en,fr,de,es,it,ja,ko,zh,ru}.json`
- `src/pages/Gallery.tsx`
- Route: `/gallery`

### Updated files (high-level)

- `src/main.tsx` — default light mode
- `src/components/layout/Header.tsx` — logo + LanguageSwitcher + Gallery route
- `src/components/layout/Footer.tsx` — logo, dynamic socials, mailto/tel/maps links
- `src/pages/Contact.tsx` — wrap address/email/phone in proper links
- `src/pages/WhoWeAre.tsx` — unified card treatment + per-member icon visibility
- `src/pages/ServiceDetail.tsx` — image hero
- `src/pages/Industries.tsx`, `src/pages/IndustryDetail.tsx` — image + content_box
- `src/pages/ClientsPage.tsx` + `src/components/sections/ClientLogos.tsx` — hover description
- `src/components/sections/TestimonialsSlider.tsx` — block layout w/ logo
- `src/components/sections/NextPageCTA.tsx` — background treatment
- All affected admin form dialogs (`TeamMemberFormDialog`, `IndustryFormDialog`, `ClientFormDialog`, `TestimonialFormDialog`, `ServiceFormDialog` verification, settings page for socials/logo)

## Out of scope / called out

- True drag-and-drop reordering for services — numeric `order_index` editing only.
- Per-image gallery upload limits beyond the storage quota of Lovable Cloud.

If this looks right, approve and I'll switch to build mode and execute end-to-end. If you'd like to drop or defer any item (e.g. language switcher) to keep the scope smaller, tell me which and I'll revise.