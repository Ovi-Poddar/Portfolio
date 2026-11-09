// Content stays visible without JavaScript. Enhance only the navigation and
// existing project selectors; native details elements handle technical notes.
document.documentElement.classList.add('js');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
navToggle.hidden = false;

function setMenuOpen(open, restoreFocus = false) {
    navMenu.classList.toggle('active', open);
    navToggle.classList.toggle('active', open);
    navToggle.setAttribute('aria-expanded', String(open));
    navToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    if (restoreFocus) navToggle.focus();
}
navToggle.addEventListener('click', () => {
    setMenuOpen(navToggle.getAttribute('aria-expanded') !== 'true');
});
navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => setMenuOpen(false));
});
document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && navToggle.getAttribute('aria-expanded') === 'true') {
        setMenuOpen(false, true);
    }
});
window.addEventListener('resize', () => {
    if (window.innerWidth > 900) setMenuOpen(false);
});

const navLinks = Array.from(document.querySelectorAll('.nav-link'));
const navSections = Array.from(document.querySelectorAll('main > section[id]'));
let scrollUpdatePending = false;
function updateNavigation() {
    document.querySelector('.navbar').classList.toggle('is-scrolled', window.scrollY > 20);
    let currentSection = 'home';
    navSections.forEach(section => {
        if (section.getBoundingClientRect().top <= 130) currentSection = section.id;
    });
    navLinks.forEach(link => {
        const active = link.getAttribute('href') === '#' + currentSection;
        link.classList.toggle('active', active);
        if (active) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
    });
    scrollUpdatePending = false;
}
window.addEventListener('scroll', () => {
    if (!scrollUpdatePending) {
        scrollUpdatePending = true;
        window.requestAnimationFrame(updateNavigation);
    }
}, { passive: true });
window.addEventListener('load', updateNavigation);
updateNavigation();

// Preserve the original master-detail project showcase with explicit state.
document.querySelectorAll('.projects-showcase').forEach(showcase => {
    const buttons = Array.from(showcase.querySelectorAll('.project-nav-item'));
    const panels = Array.from(showcase.querySelectorAll('.project-detail-panel'));
    function selectProject(button) {
        const target = panels.find(panel => panel.id === button.dataset.target);
        if (!target) return;
        buttons.forEach(item => {
            const active = item === button;
            item.classList.toggle('active', active);
            item.setAttribute('aria-pressed', String(active));
            item.setAttribute('aria-controls', item.dataset.target);
        });
        panels.forEach(panel => {
            panel.classList.toggle('active', panel === target);
            panel.hidden = panel !== target;
        });
    }
    buttons.forEach(button => button.addEventListener('click', () => selectProject(button)));
    const selected = buttons.find(button => button.classList.contains('active'));
    if (selected) selectProject(selected);
});

// Swipeable contribution pages. No autoplay: visitors control the reading pace.
document.querySelectorAll('.contribution-carousel').forEach(carousel => {
    const track = carousel.querySelector('.contribution-track');
    const cards = Array.from(track.querySelectorAll('.contribution-card'));
    const controls = carousel.querySelector('.carousel-controls');
    const dots = controls.querySelector('.carousel-dots');
    const previous = controls.querySelector('[data-carousel="previous"]');
    const next = controls.querySelector('[data-carousel="next"]');
    const status = controls.querySelector('.carousel-status');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let pages = [];
    let current = 0;
    let perPage = 1;

    cards.forEach((card, index) => {
        card.setAttribute('role', 'group');
        card.setAttribute('aria-roledescription', 'slide');
        card.setAttribute('aria-label', (index + 1) + ' of ' + cards.length + ': ' + card.querySelector('h3').textContent.trim());
    });

    function updateControls() {
        let closest = 0;
        pages.forEach((offset, index) => {
            if (Math.abs(track.scrollLeft - offset) < Math.abs(track.scrollLeft - pages[closest])) closest = index;
        });
        current = closest;
        Array.from(dots.children).forEach((dot, index) => {
            if (index === current) dot.setAttribute('aria-current', 'true');
            else dot.removeAttribute('aria-current');
        });
        previous.disabled = current === 0;
        next.disabled = current === pages.length - 1;
        const label = String(current + 1).padStart(2, '0') + ' / ' + String(pages.length).padStart(2, '0');
        if (status.textContent !== label) status.textContent = label;
    }

    function showPage(index) {
        const target = Math.max(0, Math.min(index, pages.length - 1));
        track.scrollTo({left: pages[target], behavior: reducedMotion.matches ? 'instant' : 'smooth'});
    }

    function buildPages() {
        const firstVisible = current * perPage;
        perPage = parseInt(getComputedStyle(track).getPropertyValue('--cards-per-view'), 10) || 1;
        cards.forEach((card, index) => card.classList.toggle('carousel-page-start', index % perPage === 0));
        const maxScroll = Math.max(0, track.scrollWidth - track.clientWidth);
        pages = [];
        dots.replaceChildren();
        for (let start = 0; start < cards.length; start += perPage) {
            const offset = Math.min(cards[start].offsetLeft - cards[0].offsetLeft, maxScroll);
            pages.push(offset);
            const dot = document.createElement('button');
            dot.type = 'button';
            dot.className = 'carousel-dot';
            dot.setAttribute('aria-label', 'Show contributions ' + (start + 1) + ' to ' + Math.min(start + perPage, cards.length) + ' of ' + cards.length);
            dot.setAttribute('aria-controls', track.id);
            const pageIndex = pages.length - 1;
            dot.addEventListener('click', () => showPage(pageIndex));
            dots.appendChild(dot);
        }
        controls.hidden = pages.length <= 1;
        const retained = Math.min(Math.floor(firstVisible / perPage), pages.length - 1);
        track.scrollTo({left: pages[retained], behavior: 'instant'});
        updateControls();
    }

    previous.addEventListener('click', () => showPage(current - 1));
    next.addEventListener('click', () => showPage(current + 1));
    track.addEventListener('scroll', updateControls, {passive: true});
    track.addEventListener('keydown', event => {
        if (event.target !== track) return;
        const targets = {ArrowLeft: current - 1, ArrowRight: current + 1, Home: 0, End: pages.length - 1};
        if (Object.hasOwn(targets, event.key)) {
            event.preventDefault();
            showPage(targets[event.key]);
        }
    });
    let observedWidth = track.clientWidth;
    new ResizeObserver(() => {
        if (track.clientWidth !== observedWidth) {
            observedWidth = track.clientWidth;
            buildPages();
        }
    }).observe(track);
    buildPages();
});

