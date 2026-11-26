# Dubey Visuals: Personal Website

Live, responsive one-page site for Rohit Kumar Dubey, Glasgow based social media strategist.

Live site: https://dubeyvisuals.github.io

## Stack

Plain HTML, CSS and minimal JavaScript. No framework, no build step.

## Structure

```
index.html          Single page: Hero, Selected Work, Results, Experience, Services, Contact
css/style.css        All styling. Black and white only, mobile-first, responsive.
js/main.js           Minimal JS (mobile nav toggle, current year in footer)
images/               Photos and work visuals (shown in greyscale via CSS)
```

## Design rules

- Black and white only, no colour accents. Any photos are rendered in greyscale with CSS.
- One sans-serif typeface throughout.
- Mobile-first layout, responsive from phone through desktop.
- Content follows exactly what is documented for Rohit: no invented clients, metrics, tools or claims.

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
