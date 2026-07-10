# #5 Add Canonical Tags to All Pages

**Priority:** CRITICAL
**Status:** `done`
**Effort:** Low — 30 min
**Impact:** High
**Tags:** TECHNICAL, GEO

## Problem

No `<link rel="canonical">` exists on any page. GitHub Pages serves blog posts at both `/blog/post.html` and `/blog/post` (both return 200). Without canonical tags, Google may index duplicate URLs as separate documents and split link equity.

## Fix

Add to the `<head>` of every page:

```html
<link rel="canonical" href="https://shierlytherapy.com.au/[path]">
```

Use absolute URLs. Canonical URL per page:

| File | Canonical URL |
|---|---|
| `index.html` | `https://shierlytherapy.com.au/` |
| `about/index.html` | `https://shierlytherapy.com.au/about/` |
| `how-i-can-help/index.html` | `https://shierlytherapy.com.au/how-i-can-help/` |
| `faq/index.html` | `https://shierlytherapy.com.au/faq/` |
| `contact/index.html` | `https://shierlytherapy.com.au/contact/` |
| `blog/index.html` | `https://shierlytherapy.com.au/blog/` |
| `blog/counsellor-psychotherapist-psychologist.html` | `https://shierlytherapy.com.au/blog/counsellor-psychotherapist-psychologist/` |
| `privacy-policy/index.html` | `https://shierlytherapy.com.au/privacy-policy/` |
