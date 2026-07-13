# #2 Submit Sitemap in Google Search Console

**Priority:** CRITICAL
**Status:** `done`
**Effort:** Low — 5 min
**Impact:** Very High
**Tags:** TECHNICAL, CRAWLABILITY

## Problem

Even after deploying `sitemap.xml`, Google will not prioritise crawling until the sitemap is manually submitted in Google Search Console. New blog posts are at risk of slow or no indexation without it.

## Fix

1. Go to Google Search Console → Indexing → Sitemaps
2. Enter `https://shierlytherapy.com.au/sitemap.xml`
3. Click Submit

## Notes

Blocked on task [#1](crit-01-deploy-robots-sitemap.md) — sitemap must be deployed and live first. Also verify the property is set up in GSC and domain ownership is confirmed.
