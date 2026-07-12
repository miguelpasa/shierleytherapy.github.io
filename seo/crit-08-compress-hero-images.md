# #8 Compress All Hero Images to WebP ≤200 KB

**Priority:** CRITICAL
**Status:** `done`
**Effort:** Medium — 2 hrs
**Impact:** Very High (CWV/LCP)
**Tags:** PERFORMANCE, CWV

## Problem

All inner-page heroes are uncompressed originals. On Australian median mobile (~30 Mbps), the /how-i-can-help/ hero alone takes ~6 seconds to download before decoding and paint.

| Page | Image | Current Size |
|---|---|---|
| `/how-i-can-help/` | `hero-photo-2.jpg` | **22.4 MB** |
| `/faq/` | `hero-photo-1.jpg` | 8.1 MB |
| `/blog/` | `hero-photo-3.jpg` | 7.2 MB |
| `/contact/` | `contact-hero.jpg` | 6.4 MB |
| `/about/` | `about-hero.jpg` | 5.9 MB |
| `/` (homepage) | `hero-birds.jpg` | 630 KB |

## Fix

1. Export all hero images at max 1920px width, saved as WebP at 80% quality — target ≤200 KB each
2. **Start with `hero-photo-2.jpg`** — it is 112× too large
3. Replace `.jpg` references in HTML with `.webp` equivalents
4. Add `fetchpriority="high"` to each hero `<img>` tag
5. Add `<link rel="preload" as="image" fetchpriority="high">` in `<head>` for the hero on each page

## Suggested CLI command

```bash
cwebp -q 80 -resize 1920 0 input.jpg -o output.webp
```

Alternatives: Squoosh (web), ImageOptim (Mac)
