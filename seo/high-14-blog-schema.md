# #14 Add BlogPosting + BreadcrumbList + WebSite JSON-LD

**Priority:** HIGH
**Status:** `done`
**Effort:** Low — 1 hr
**Impact:** High
**Tags:** SCHEMA, GEO

## Problem

No schema exists on blog or inner pages beyond what's covered in task #7. Missing:
- `BlogPosting` / `Article` schema on the blog post
- `BreadcrumbList` on all inner pages
- `WebSite` schema on homepage

## Fix

### `blog/counsellor-psychotherapist-psychologist.html` — BlogPosting
```json
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "Counsellor vs Psychotherapist vs Psychologist: What's the Difference?",
  "author": {
    "@type": "Person",
    "name": "[Full Name]",
    "jobTitle": "ACA Level 2 Registered Counsellor & Psychotherapist"
  },
  "datePublished": "[ISO date]",
  "dateModified": "[ISO date]",
  "publisher": {
    "@type": "Organization",
    "name": "Shierly Therapy",
    "url": "https://shierlytherapy.com.au"
  },
  "url": "https://shierlytherapy.com.au/blog/counsellor-psychotherapist-psychologist/"
}
```

### All inner pages — BreadcrumbList example (About page)
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://shierlytherapy.com.au/" },
    { "@type": "ListItem", "position": 2, "name": "About", "item": "https://shierlytherapy.com.au/about/" }
  ]
}
```

### `index.html` — WebSite
```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Shierly Therapy",
  "url": "https://shierlytherapy.com.au"
}
```

## Notes

Partially blocked on task [#6](crit-06-practitioners-full-name.md) for the BlogPosting author field. BreadcrumbList and WebSite schema can proceed independently.
