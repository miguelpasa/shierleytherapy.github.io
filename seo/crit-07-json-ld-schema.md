# #7 Add LocalBusiness + Person JSON-LD Schema

**Priority:** CRITICAL
**Status:** `done`
**Effort:** Medium — 2–3 hrs
**Impact:** Very High
**Tags:** SCHEMA, LOCAL SEO, GEO

## Problem

Not a single `<script type="application/ld+json">` block exists anywhere on the site. This blocks: Google Knowledge Panel, Local Pack eligibility, FAQ rich results, Article rich results, and AI Overview citation. It is the single largest structural gap for a local healthcare practice.

## Fix

### `index.html` — LocalBusiness + Counselor schema
Include: name, address, phone, email, hours, priceRange, areaServed, url, sameAs (Instagram, GBP)

```json
{
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "MedicalBusiness"],
  "name": "Shierly Therapy",
  "url": "https://shierlytherapy.com.au",
  "telephone": "+61435557712",
  "email": "hello@shierlytherapy.com.au",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "East Melbourne",
    "addressRegion": "VIC",
    "addressCountry": "AU"
  },
  "priceRange": "$100–$170",
  "areaServed": ["East Melbourne", "Melbourne", "Australia"],
  "openingHoursSpecification": [
    { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Tuesday", "Wednesday"], "opens": "10:00", "closes": "18:00" },
    { "@type": "OpeningHoursSpecification", "dayOfWeek": "Thursday", "opens": "17:00", "closes": "21:00" },
    { "@type": "OpeningHoursSpecification", "dayOfWeek": "Saturday", "opens": "09:00", "closes": "13:00" }
  ]
}
```

### `about/index.html` — Person schema
Include: name (full), credentials, alumniOf, memberOf (ACA), jobTitle, url

### `faq/index.html` — FAQPage schema
Include all 8 Q&A pairs (see task [#19](med-19-faq-schema.md))

### `blog/counsellor-psychotherapist-psychologist.html` — BlogPosting
Include: headline, author (full name + credentials), datePublished, publisher

### All inner pages — BreadcrumbList
Include breadcrumb trail per page

## Notes

Partially blocked on task [#6](crit-06-practitioners-full-name.md) (full name) for the Person schema and blog author fields. The LocalBusiness schema can be completed independently.
