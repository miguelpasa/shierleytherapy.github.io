# #27 Fix Generic Alt Text on Hero Images

**Priority:** LOW
**Status:** `done`
**Effort:** Low — 15 min
**Impact:** Medium
**Tags:** TECHNICAL, ACCESSIBILITY

## Problem

The FAQ, How I Can Help, and Blog hero images share identical alt text: "Scenic nature landscape." The Contact page hero has "A warm and welcoming scene." These fail accessibility standards and provide no contextual SEO signal.

## Fix

Update each hero `<img>` with page-contextual, descriptive alt text:

| Page | File | Suggested alt |
|---|---|---|
| `/faq/` | `hero-photo-1.jpg` | "Sunlit path through a peaceful bush setting, representing the journey of therapy" |
| `/how-i-can-help/` | `hero-photo-2.jpg` | "Calm forest path with dappled light, representing the path to healing and support" |
| `/blog/` | `hero-photo-3.jpg` | "Peaceful natural scene representing reflection and personal growth" |
| `/contact/` | `contact-hero.jpg` | "Warm light through a window, evoking a safe and welcoming counselling space" |

## Files

- `faq/index.html`
- `how-i-can-help/index.html`
- `blog/index.html`
- `contact/index.html`
