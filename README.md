# Ovi Poddar's portfolio

Static HTML, CSS, and JavaScript. No package installation or build step is needed.

## Preview

From this directory, run `python -m http.server 8766`, then open
`http://localhost:8766/`. The existing GitHub Pages workflow deploys `master`;
feature branches do not replace the live site.

## Update News and Contributions

- Edit the `#news` and `#contributions` sections in `index.html`.
- Keep news in reverse chronological order, using `<time datetime="YYYY-MM-DD">`
  (or `YYYY-MM` when only the month is known). The focusable timeline scrolls vertically.
- Check the linked upstream PR or issue before changing a status. Update the
  status-check date and summary counts at the same time as the relevant badge.
- An open PR is submitted work, not a merged contribution. An issue report is
  not an implemented fix. Keep project descriptions and technical evidence accurate.
- Counts and statuses are a manually checked snapshot, not a live GitHub feed.

The original project/research component styles are in `styles.css`; the shared
editorial design and responsive News/Contributions styles are in `research.css`.
`script.js` enhances navigation, project selectors, and the contribution carousel.
The carousel shows two cards per page on desktop and one on mobile, with arrows,
page dots, native touch scrolling, and Left/Right/Home/End keys when the track is
focused. There is no autoplay. Without JavaScript, all cards form a static grid. Technical
notes use native `<details>` and do not require JavaScript. The CV button links
to the real PDF rather than generating an alternative document.

## Check changes

- Run `node --check script.js` and `git diff --check`.
- Check desktop and narrow mobile widths (including 320px) for page overflow.
- Open the mobile menu with the keyboard; Escape should close it and return
  focus to the menu button. Following a menu link should close the menu.
- Scroll News to the earliest milestone using touch, wheel, or keyboard.
- Check contribution arrows, page dots, track keyboard controls, boundary disabled
  states, and page retention when resizing. Open technical notes on both pages.
- Switch projects in each showcase.
- Check the CV, local assets, section anchors, and external submission links.
- Page content should remain visible with JavaScript disabled. Reduced-motion
  settings should disable smooth scrolling through the existing CSS rule.

## Featured project case studies

The first three AI project panels contain a model-comparison graphic and two
workflow diagrams built with HTML/CSS. Update the price-prediction numbers and
bar proportions together, using the linked project results. These are reported
project results, not benchmarks rerun by the portfolio. Preserve the experimental
scope and the distinction between a functional demo and measured performance.

Page order prioritizes research, selected engineering projects, contributions,
and industry experience before the historical News timeline. The original
portrait is retained; its monochrome treatment is CSS-only. Bump the stylesheet
query version when changing its published content to refresh cached assets.
