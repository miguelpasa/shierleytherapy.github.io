# #6 Add Practitioner's Full Last Name Sitewide

**Priority:** CRITICAL
**Status:** `done`
**Effort:** Low — 30 min
**Impact:** Very High (AI entity recognition)
**Tags:** GEO, YMYL

## Problem

The practitioner is referred to only as "Shierly" across all pages, files, and metadata. AI systems cannot build an entity association for an incomplete name and cannot independently verify credentials without a full legal name. This blocks Knowledge Panel candidacy and YMYL E-E-A-T signals.

## Fix

Once Shierly confirms her full legal name, add it to:

1. The About page bio (first mention)
2. The blog post author byline
3. The Person JSON-LD schema (task [#7](crit-07-json-ld-schema.md))
4. `<meta name="author" content="[Full Name]">` on all pages
5. The `llms.txt` name field (task [#20](med-20-llms-txt.md))

## Notes

Full name confirmed: **Shierly Halim**. This unblocks tasks [#7](crit-07-json-ld-schema.md), [#14](high-14-blog-schema.md), [#20](med-20-llms-txt.md), [#24](med-24-expand-blog-post.md), [#25](med-25-new-blog-posts.md), and [#26](low-26-directory-listings.md).
