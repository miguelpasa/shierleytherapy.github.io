# #31 Replace Duplicate Coastal Landscape Image on Homepage

**Priority:** LOW
**Status:** `todo`
**Effort:** Low — 30 min
**Impact:** Low
**Tags:** SXO, UX

## Problem

`landscape-coastal.jpg` appears in both the "What I Offer" and "Areas of Support" sections on the homepage. This reduces visual differentiation and may trigger duplicate asset signals in Google's image index.

## Fix

Source a different approved image from the Google Drive folder for one of the two sections:
https://drive.google.com/drive/folders/1QHuXifazU8jCK-bp92xf5OEUHTULGJh6

Replace the duplicate reference in `index.html` and update `assets/css/styles.css` if the image is referenced there.
