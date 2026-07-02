# Shierly Therapy

Marketing site for **Shierly Therapy** — counselling & psychotherapy in East Melbourne, VIC, and online across Australia.

A single-page static site with a fullscreen masked-parallax hero and GSAP scroll animations, in a warm, comfy palette. No build step — just HTML, CSS and JS.

## Project brief

This site is a **replacement** for the existing live site at https://www.shierlytherapy.com.au.

- **Copy:** Match the copy from the live site exactly (same wording, same sections).
- **Colour palette:** Use the same colour palette as the live site.
- **Assets:** All images and media must come **only** from the approved Google Drive folder:
  https://drive.google.com/drive/folders/1QHuXifazU8jCK-bp92xf5OEUHTULGJh6
  Do **not** use Unsplash or any other external image source.

## Structure

```
index.html              # all page content (single scroll)
assets/css/styles.css   # styles + warm palette (CSS custom properties at the top)
assets/js/main.js       # Lenis smooth scroll + GSAP/ScrollTrigger animations
assets/images/          # Unsplash photography (see credits below)
.nojekyll               # tells GitHub Pages to serve every file as-is
```

GSAP, ScrollTrigger and Lenis are loaded from CDN (jsDelivr); fonts (Fraunces + DM Sans) from Google Fonts.

## Editing content

All copy lives in `index.html`. To retune colours, edit the custom properties at the top of `assets/css/styles.css` (`--cream`, `--terracotta`, `--sage`, `--ink`, …).

## ⚠️ Contact form — required setup

The contact form posts to **Formspree**. Before submissions work:

1. Create a free form at https://formspree.io and copy your form ID.
2. In `index.html`, find `action="https://formspree.io/f/YOUR_FORM_ID"` and replace `YOUR_FORM_ID`.

Until then the form is styled and functional but won't deliver messages. The email (`hello@shierlytherapy.com.au`) and SMS links work regardless.

## Local preview

```bash
python -m http.server 8000
# then open http://localhost:8000
```

## Deploy (GitHub Pages)

1. Push to GitHub. For a root site (`https://<user>.github.io`), the repo must be named **exactly** `<user>.github.io`.
   - Note: this folder is spelled `shierleytherapy.github.io` (extra "e"). If you want the root URL, rename the repo to match your username; otherwise it will serve under a project subpath like `https://<user>.github.io/<repo>/`.
2. Repo **Settings → Pages → Build and deployment → Deploy from a branch**, select `main` / `/ (root)`.
3. Wait for the green deploy; your site is live.

### Optional: custom domain (shierlytherapy.com.au)

1. Add a file named `CNAME` at the repo root containing a single line: `shierlytherapy.com.au`
2. At your DNS provider, point the domain at GitHub Pages:
   - `A` records for the apex → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - (or a `CNAME` for `www` → `<user>.github.io`)
3. In Settings → Pages, set the custom domain and enable **Enforce HTTPS**.

## Accessibility & motion

- All animations honour `prefers-reduced-motion` and content is fully visible if JavaScript fails to load.
- Skip link, semantic landmarks, focus styles, and alt text are included.

## Image credits

All assets must be sourced from the approved Google Drive folder:
https://drive.google.com/drive/folders/1QHuXifazU8jCK-pb92xf5OEUHTULGJh6

Do **not** use Unsplash or any other third-party image source. The placeholder Unsplash images currently in `assets/images/` are temporary and must be replaced with approved assets before launch.
