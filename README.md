# Dubey Visuals: Personal Website

Live, responsive one-page site for Rohit Kumar Dubey, Glasgow based social media strategist.

Live site: https://dubeyvisuals.github.io

## Stack

Plain HTML, CSS and minimal JavaScript. No framework, no build step.

## Structure

```
index.html          Single page: Hero, Work, Process, Results, Services, Experience, Contact
css/style.css        All styling. Black and white only, mobile-first, responsive.
js/main.js           Role switcher, typewriter, timecode, scroll effects, counters, copy email
images/               Photos and work visuals (shown in greyscale via CSS)
```

## Design rules

- Black and white only, no colour accents. Any photos are rendered in greyscale with CSS.
- One sans-serif typeface throughout.
- Mobile-first layout, responsive from phone through desktop.
- Content follows exactly what is documented for Rohit: no invented clients, metrics, tools or claims.

## Role-tailored links

The page re-angles itself for different job types. Visitors can pick a role in the hero
("What are you hiring for?"), or you can send a link that opens already tailored:

| Link suffix              | Headline                 | Leads with                     |
|--------------------------|--------------------------|--------------------------------|
| *(none)*                 | Cycles through all roles | Everything                     |
| `?role=videographer`     | Videographer             | Shooting, aerial reel views    |
| `?role=editor`           | Video Editor             | Editing, watch time            |
| `?role=creator`          | Content Creator          | Shoot + edit, total views      |
| `?role=strategist`       | Social Media Strategist  | Strategy, brief/plan/measure   |
| `?role=marketer`         | Social Media Marketer    | Management, follower growth    |

Each role changes the hero line and intro, the order of Results and Services, the
"Main focus" service cards and the "Focus" steps in the Process timeline. Edit the
`ROLES` object at the top of `js/main.js` to change any of it or add a new role
(then add a matching `.chip` button in `index.html`).

## Photos, CV and testimonials

- `images/profile.jpg`: hero photo (camera shot). `images/headshot.jpg`: round avatar in Contact.
  Both render in greyscale and hide themselves if the file is missing.
- `images/og-card.png`: the preview image shown when the link is shared (LinkedIn, WhatsApp, email).
- CV: put the PDF at `files/Rohit-Kumar-Dubey-CV.pdf` and uncomment the "Download CV" link in the header nav.
- Testimonials: uncomment the testimonials block above Contact in `index.html` and fill in the quote.

## Work card video loops

Each work card plays a 4 second muted loop: greyscale at rest, full colour on hover (desktop)
or while in view (phones). Visitors with reduced motion turned on see the poster only.

- Originals go in `raw/` (git-ignored, never published), named `NN-short-name.mp4`.
- Web versions live in `media/<slug>.mp4` (540x960, ~0.3-0.7 MB) and `media/<slug>.jpg` (poster).
- To make a new one (ffmpeg via `python -m pip install imageio-ffmpeg`):

```
ffmpeg -i raw/06-name.mp4 -ss 2.0 -t 4 -an -vf "scale=540:960:force_original_aspect_ratio=increase,crop=540:960,fps=30" -c:v libx264 -pix_fmt yuv420p -crf 27 -preset slow -movflags +faststart media/name.mp4
ffmpeg -i raw/06-name.mp4 -ss 2.5 -frames:v 1 -vf "scale=540:960:force_original_aspect_ratio=increase,crop=540:960" -q:v 4 media/name.jpg
```

Then copy any `.reel` card in `index.html` and point its `<video>` at the new files.

## Local preview

Open `index.html` directly in a browser, or serve the folder locally, for example:

```
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Deployment

Hosted on GitHub Pages from the `main` branch of this repository (`dubeyvisuals/dubeyvisuals.github.io`), which serves directly at the root domain.

## Updating content

All copy lives in `index.html`. Images go in `images/` and are referenced from there; CSS already applies greyscale, so colour photos can be dropped in as-is.
