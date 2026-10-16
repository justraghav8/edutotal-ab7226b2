# Architecture rules

- Shared section copy and visibility for Services, Industries and Careers is stored in `public.page_content` and edited through Page Content; item-specific content stays in its existing model to keep public pages CMS-driven.
- Repeated text lists use the shared ListEditor and are saved as trimmed JSON arrays; empty arrays hide their public sections.
- Service-to-industry relationships are managed through the industry editor under server-enforced administrator policies.