# Shierly Therapy

Marketing site for **Shierly Therapy** — counselling & psychotherapy in East Melbourne, VIC, and online across Australia.

A multi-page static site with a fullscreen hero and GSAP scroll animations, in a warm navy palette. No build step — just HTML, CSS and JS.

Live site: **https://www.shierlytherapy.com.au**

## Project brief

This site is a **replacement** for the previous live site.

- **Copy:** Match the copy from the live site exactly (same wording, same sections).
- **Colour palette:** Use the same colour palette as the live site.
- **Assets:** All images and media must come **only** from the approved Google Drive folder:
  https://drive.google.com/drive/folders/1QHuXifazU8jCK-bp92xf5OEUHTULGJh6
  Do **not** use Unsplash or any other external image source.

## Structure

```
index.html                                  # Homepage
about/index.html                            # About Shierly
how-i-can-help/index.html                   # Areas of support
faq/index.html                              # Frequently asked questions
contact/index.html                          # Contact & enquiry form
blog/index.html                             # Blog listing
blog/counsellor-psychotherapist-psychologist.html  # Blog article
privacy-policy/index.html                   # Privacy policy
assets/css/styles.css                       # Global styles + colour palette (CSS custom properties at top)
assets/css/blog.css                         # Blog-specific styles
assets/js/main.js                           # Lenis smooth scroll + GSAP/ScrollTrigger animations + form toast
assets/images/                              # Approved photography and logos
CNAME                                       # Custom domain (shierlytherapy.com.au)
.nojekyll                                   # Tells GitHub Pages to serve every file as-is
```

GSAP, ScrollTrigger, and Lenis are loaded from CDN (jsDelivr). Fonts (Cinzel + Lato) are loaded from Google Fonts.

## Editing content

All copy lives in the relevant HTML file for each page. To retune colours, edit the custom properties at the top of `assets/css/styles.css` (`--navy`, `--cream`, `--sage`, `--terracotta`, …).

## Contact form

All enquiry forms use **Web3Forms** (`https://api.web3forms.com/submit`). The access key is already configured — forms are live and delivering to the inbox. No further setup required.

A toast notification confirms submission to the user.

## Local preview

```bash
python -m http.server 8000
# then open http://localhost:8000
```

## Deploy (GitHub Pages)

The site deploys automatically from the `main` branch via GitHub Pages.

1. Push to `main`.
2. GitHub Pages builds and deploys from the repo root.
3. The custom domain `shierlytherapy.com.au` is set via the `CNAME` file and configured in **Settings → Pages**.

### DNS (custom domain)

The apex domain is pointed at GitHub Pages with the following `A` records:

```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

HTTPS is enforced via **Settings → Pages → Enforce HTTPS**.

## Accessibility & motion

- All animations honour `prefers-reduced-motion`; content is fully visible if JavaScript fails to load.
- Skip link, semantic landmarks, focus styles, and alt text are included.

## Image credits

All assets are sourced from the approved Google Drive folder:
https://drive.google.com/drive/folders/1QHuXifazU8jCK-bp92xf5OEUHTULGJh6

Do **not** use Unsplash or any other third-party image source.
