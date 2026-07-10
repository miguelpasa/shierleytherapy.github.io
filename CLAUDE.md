# Shierly Therapy — Claude Context

## What this project is

A static multi-page site for Shierly Therapy, replacing the previous live site at https://www.shierlytherapy.com.au.

- No build tool. Pure HTML, CSS (`assets/css/styles.css`, `assets/css/blog.css`), JS (`assets/js/main.js`).
- Deployed via GitHub Pages from the `main` branch to the custom domain `shierlytherapy.com.au`.

## Pages

- `index.html` — Homepage
- `about/index.html` — About Shierly
- `how-i-can-help/index.html` — Areas of support
- `faq/index.html` — FAQ
- `contact/index.html` — Contact & enquiry form
- `blog/index.html` — Blog listing
- `privacy-policy/index.html` — Privacy policy

## Key rules

1. **Copy:** Mirror the live site (https://www.shierlytherapy.com.au) for all content — same wording, same sections.
2. **Colours:** Use the same colour palette as the live site.
3. **Assets:** All images and media must come **exclusively** from the approved Google Drive folder:
   https://drive.google.com/drive/folders/1QHuXifazU8jCK-bp92xf5OEUHTULGJh6
   Never source images from Unsplash or any other third-party provider.

## Forms

All enquiry forms use **Web3Forms** (`https://api.web3forms.com/submit`). The access key is already set — do not change the form provider or remove the key. A toast notification confirms submission.

## Pending tasks

- Audit copy across all pages against the live site and align any differences.
