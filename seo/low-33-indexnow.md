# #33 Implement IndexNow

**Priority:** LOW
**Status:** `todo`
**Effort:** Low — 1 hr
**Impact:** Low
**Tags:** TECHNICAL

## Problem

No IndexNow implementation exists. IndexNow allows immediate notification to Bing, Yandex, and other search engines when content is published or updated. Currently new content relies on organic crawl discovery.

## Fix

1. Generate an IndexNow API key at indexnow.org or via Bing Webmaster Tools
2. Place the key file at the repo root: `[key].txt` containing the key value
3. Script as a GitHub Actions workflow triggered on deploy to auto-submit updated URLs to `https://api.indexnow.org/indexnow`

## Notes

Low priority — GitHub Pages has no server-side scripting, so this requires a GitHub Actions step. Most impactful after the blog has more posts and content is being updated regularly.
