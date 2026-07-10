# #19 Add FAQPage JSON-LD Schema

**Priority:** MEDIUM
**Status:** `todo`
**Effort:** Low — 30 min
**Impact:** High (AI citation)
**Tags:** SCHEMA, GEO

## Problem

The FAQ page has 8 well-written Q&A pairs covering pricing, Medicare, booking, and session expectations. Without FAQPage JSON-LD, Google AI Overviews cannot cite these answers for high-volume queries like "how much does counselling cost Melbourne" or "can I claim Medicare for counselling."

## Fix

Add a `FAQPage` JSON-LD block to `faq/index.html` covering all 8 Q&A pairs:

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "[Question text]",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "[Answer text]"
      }
    }
  ]
}
```

## Notes

FAQ accordion rich results were retired by Google in May 2026 — this schema is for AI Overview citation only, not visual SERP rich snippets. This task is a subset of the broader schema work in task [#7](crit-07-json-ld-schema.md).
