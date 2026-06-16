# public/ — static assets

Files here are served from the site root (`/`). Drop brand and content assets in
and reference them by absolute path, e.g. `<img src="/brand/logo.svg" />` or in
CSS `url(/imagery/hero.jpg)`.

## Structure

- `brand/` — logo, emblem, wordmark, favicon source, OG art.
- `imagery/` — photography, illustrations, content images.

## Conventions

- Prefer SVG for logos/emblems; WebP/AVIF (or optimized JPG/PNG) for photos.
- Use descriptive, kebab-case names: `logo-light.svg`, `emblem.svg`, `og-default.png`.
- Reference via the Next.js `<Image>` component for content imagery where possible
  (automatic sizing/optimization); plain `<img>`/CSS for small brand marks is fine.
- Favicons: `app/icon.png` / `app/apple-icon.png` are picked up automatically by the
  App Router, or place `favicon.ico` here.

Upload your assets into `brand/` and `imagery/` and tell me which to wire in
(header logo, footer mark, hero imagery, OG image, etc.) and I'll integrate them.
