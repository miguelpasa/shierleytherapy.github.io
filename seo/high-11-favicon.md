# #11 Add Favicon to All Pages

**Priority:** HIGH
**Status:** `todo`
**Effort:** Low — 10 min
**Impact:** Medium
**Tags:** TECHNICAL

## Problem

No `<link rel="icon">` or `<link rel="apple-touch-icon">` exists in any page. Browsers auto-request `/favicon.ico` which returns a GitHub Pages 404 HTML page. Every page load generates a spurious 404 in server logs; browser tabs show a blank icon.

## Fix

Add to the `<head>` of all pages:

```html
<link rel="icon" type="image/png" href="/assets/images/logo-blue.png">
<link rel="apple-touch-icon" href="/assets/images/logo-blue.png">
```

Optionally: generate proper multi-size ICO/PNG assets from the logo using a favicon generator (e.g. realfavicongenerator.net).

Files to update: all 8 HTML pages.
