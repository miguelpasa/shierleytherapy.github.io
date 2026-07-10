# #20 Create llms.txt for AI-Readable Site Context

**Priority:** MEDIUM
**Status:** `done`
**Effort:** Low — 30 min
**Impact:** High (AI readiness)
**Tags:** GEO

## Problem

No `llms.txt` exists at the site root. This emerging convention (analogous to `robots.txt` for AI systems) lets practitioners provide structured context — credentials, services, fees, service area, preferred citation text — without AI systems having to infer it from page content. Low effort, high signal for a YMYL professional site.

## Fix

Create `llms.txt` at the repo root. Contents to include:

- Practitioner full name + credentials (ACA Level 2 Registered Counsellor & Psychotherapist)
- Services offered (anxiety, burnout, cultural identity, relationships, life transitions, etc.)
- Fees ($150 standard / $170 Saturday / $100 concession)
- Service area (East Melbourne; telehealth Australia-wide)
- Practice hours (Tue–Wed 10–6pm, Thu 5–9pm, Sat 9am–1pm)
- Contact details
- Preferred citation text
- No GP referral required

## Notes

Practitioner's full name confirmed: **Shierly Halim**. Use this in the `name` field.
