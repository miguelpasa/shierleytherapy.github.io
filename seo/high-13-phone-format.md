# #13 Standardise Phone Format; Change sms: to tel: Links

**Priority:** HIGH
**Status:** `todo`
**Effort:** Low — 20 min
**Impact:** High (NAP + UX)
**Tags:** LOCAL SEO, TECHNICAL

## Problem

- Homepage displays `043 555 7712`; Contact page displays `(+61) 43 555 7712` — inconsistent NAP (Name, Address, Phone) data causes citation drift across directories
- Both use `sms:` links only — mobile users who want to call cannot do so in one tap

## Fix

1. Standardise display format sitewide: **`0435 557 712`** (Australian convention)
2. Change all `href` values to `tel:+61435557712` (enables both calling and SMS on mobile)
3. Move the phone number to the global header so it's visible on every page

Files to check and update:
- `index.html`
- `contact/index.html`
- `about/index.html`
- `how-i-can-help/index.html`
- Footer on all pages
