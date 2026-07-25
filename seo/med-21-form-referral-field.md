# #21 Remove Required from "How Did You Hear About Us?" Form Field

**Priority:** MEDIUM
**Status:** `done`
**Effort:** Low — 5 min
**Impact:** High (conversion)
**Tags:** SXO, CONVERSION

## Problem

The "How did you hear about us?" field is marked `required` in the contact/enquiry forms. For users who are anxious or in distress, every required field increases abandonment probability. This internal analytics question should never gate a first contact.

## Fix

Remove the `required` attribute from the referral field across all enquiry forms. Attribution data can be collected via UTM parameters in booking links instead.

Files to update:
- `index.html`
- `contact/index.html`
- `about/index.html`
- `how-i-can-help/index.html`
