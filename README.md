# juliavaskul.com

Personal portfolio of Julia Vaskul (EN/FR), hosted on GitHub Pages at https://juliavaskul.com.

- `index.html` — the whole site and all its data (projects, texts, alt texts). **Edit only this file.**
- `fashion/`, `beauty/`, `film/`, `contact/`, `legal/`, `fr/…` and `sitemap.xml` — **generated** copies of `index.html`, one per page, each with its own title, description, preview image and structured data for Google. Never edit them by hand: after every push that changes `index.html`, the GitHub Action "Build SEO pages" rebuilds them automatically (or run `node tools/build-pages.mjs` locally).
- Addresses: `/fashion/still-water/`, `/beauty/triad/`, `/film/rimowa/`; French: `/fr/…`. Old `#p-…` links still work and redirect to the new addresses.
- `m/` — images, films, textures
- `about.html`, `work.html`, `contact.html`, `deep-dive.html` — redirects from the old site's addresses
- `CNAME` — custom domain, do not delete

To fill in later (search `index.html`):
- Legal notice: add SIRET (and address if wanted) after registration
