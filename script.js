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

