# #15 Switch Google Fonts to Async Load Pattern

**Priority:** HIGH
**Status:** `todo`
**Effort:** Low — 20 min
**Impact:** High (CWV)
**Tags:** PERFORMANCE

## Problem

The `<link rel="stylesheet">` for Google Fonts is parser-blocking — the browser pauses HTML rendering until the font CSS is fetched over the network. The `preconnect` hints are present but don't eliminate the blocking.

## Fix

Replace the blocking font link with a preload + async pattern on all pages:

```html
<link rel="preload" as="style"
  onload="this.onload=null;this.rel='stylesheet'"
  href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600&family=Lato:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&display=swap">
<noscript>
  <link rel="stylesheet"
    href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600&family=Lato:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&display=swap">
</noscript>
```

Keep the existing `preconnect` hints above this.

Files to update: all 8 HTML pages.
