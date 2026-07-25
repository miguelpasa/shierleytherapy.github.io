# #4 Fix Homepage H1 — Replace Image with Text Element

**Priority:** CRITICAL
**Status:** `done`
**Effort:** Low — 30 min
**Impact:** Very High
**Tags:** TECHNICAL, SXO, GEO

## Problem

The only `<h1>` on the homepage wraps `<img src="hero-title.png" alt="Shierly Therapy">`. Google parses the primary heading as "Shierly Therapy." The phrase "Individual Counselling & Psychotherapy" lives in a `<p class="hero__eyebrow">` with no heading weight. Every target keyword is invisible to crawlers at the heading level.

## Fix

1. Move the logo image to a decorative role (e.g. inside a `<p>` or `<div>`)
2. Add a real text `<h1>` containing: **"Individual Counselling & Psychotherapy in East Melbourne"**
3. Style it visually to match the brand
4. Do **NOT** use `display:none` or `visibility:hidden` — these hide content from crawlers too
5. If the logo image must stay visible as the hero visual, position the text off-screen accessibly using a CSS SR-only technique (clip-path or absolute offset)

## File

`index.html`
