export function setupQuickNavigation() {
  const root = document.querySelector('.floating-navigation');
  const toggle = document.querySelector('.quick-navigation-toggle');
  const card = document.querySelector('.quick-navigation-card');
  const links = [...document.querySelectorAll('.quick-navigation-card a')];
  if (!root || !toggle || !card) return;

  const setOpen = isOpen => {
    root.classList.toggle('is-open', isOpen);
    toggle.setAttribute('aria-expanded', String(isOpen));
    toggle.setAttribute('aria-label', isOpen ? 'Close quick navigation' : 'Open quick navigation');
    card.setAttribute('aria-hidden', String(!isOpen));
  };

  toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
  links.forEach(link => link.addEventListener('click', event => {
    const destination = link.getAttribute('href');
    setOpen(false);

    if (destination === '/menu.html') return;

    const target = destination ? document.querySelector(destination) : null;
    if (!target) return;
    event.preventDefault();
    requestAnimationFrame(() => {
      if (window.afrinaijaScroll && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) window.afrinaijaScroll.scrollTo(target, { duration: 1.05, force: true });
      else target.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
      history.pushState(null, '', destination);
    });
  }));

  document.addEventListener('pointerdown', event => {
    if (root.classList.contains('is-open') && !root.contains(event.target)) setOpen(false);
  });

  document.addEventListener('keydown', event => {
    if (event.key !== 'Escape' || !root.classList.contains('is-open')) return;
    setOpen(false);
    toggle.focus();
  });
}
