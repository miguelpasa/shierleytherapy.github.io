# #10 Fix og:image; Add OG + Twitter Card Meta to All Pages

**Priority:** HIGH
**Status:** `done`
**Effort:** Low — 45 min
**Impact:** High
**Tags:** TECHNICAL, ON-PAGE

## Problem

- The homepage `og:image` uses a relative path (`assets/images/hero-birds.jpg`) — all social platforms require an absolute URL. Shares currently render with no image preview.
- `og:url` is missing on all pages
- Inner pages have no Open Graph tags at all
- No Twitter/X Card meta tags exist anywhere

## Fix

### Homepage — fix og:image
```html
<meta property="og:image" content="https://shierlytherapy.com.au/assets/images/hero-birds.jpg">
```

### All pages — full OG + Twitter Card block
```html
<meta property="og:type" content="website">
<meta property="og:url" content="https://shierlytherapy.com.au/[path]">
<meta property="og:site_name" content="Shierly Therapy">
<meta property="og:locale" content="en_AU">
<meta property="og:title" content="[Page title]">
<meta property="og:description" content="[Page meta description]">
<meta property="og:image" content="https://shierlytherapy.com.au/assets/images/[hero-image]">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:image" content="https://shierlytherapy.com.au/assets/images/[hero-image]">
```

Files to update: all 8 HTML pages.
