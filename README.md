# Ovi Poddar's portfolio

Static HTML, CSS, and JavaScript. No package installation or build step is needed.

## Preview

From this directory, run `python -m http.server 8766`, then open
`http://localhost:8766/`. The existing GitHub Pages workflow deploys `master`;
feature branches do not replace the live site.

## Update News and Contributions

- Edit the `#news` and `#contributions` sections in `index.html`.
- Keep news in reverse chronological order, using `<time datetime="YYYY-MM-DD">`.
- Check the linked upstream PR or issue before changing a status. Update the
  status-check date and summary counts at the same time as the relevant badge.
- An open PR is submitted work, not a merged contribution. An issue report is
  not an implemented fix. Retain evidence, limitations, and AI-assistance context.
- Counts and statuses are a manually checked snapshot, not a live GitHub feed.

The original project/research component styles are in `styles.css`; the shared
editorial design and responsive News/Contributions styles are in `research.css`.
`script.js` enhances the navigation and existing project selectors. Technical
notes use native `<details>` and do not require JavaScript. The CV button links
to the real PDF rather than generating an alternative document.

## Check changes

- Run `node --check script.js` and `git diff --check`.
- Check desktop and narrow mobile widths (including 320px) for page overflow.
- Open the mobile menu with the keyboard; Escape should close it and return
  focus to the menu button. Following a menu link should close the menu.
- Open a contribution's technical notes, and switch projects in each showcase.
- Check the CV, local assets, section anchors, and external submission links.
- Page content should remain visible with JavaScript disabled. Reduced-motion
  settings should disable smooth scrolling through the existing CSS rule.
