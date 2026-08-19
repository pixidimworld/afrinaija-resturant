(() => {
  const dish = document.querySelector('.main-dish');
  const gsap = window.gsap;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const announceReady = () => window.dispatchEvent(new CustomEvent('afrinaija:hero-ready'));

  if (!dish || !gsap || reduceMotion) {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', announceReady, { once: true });
    else announceReady();
    return;
  }

  const mobile = window.matchMedia('(max-width: 900px)').matches;
  const start = mobile ? { xPercent: -135, yPercent: 0 } : { xPercent: 0, yPercent: -145 };
  gsap.set(dish, { ...start, force3D: true, willChange: 'transform' });

  const pageReady = document.readyState === 'complete'
    ? Promise.resolve()
    : new Promise(resolve => window.addEventListener('load', resolve, { once: true }));
  const imageReady = dish.complete
    ? dish.decode?.().catch(() => {})
    : new Promise(resolve => dish.addEventListener('load', resolve, { once: true })).then(() => dish.decode?.().catch(() => {}));

  Promise.all([pageReady, imageReady]).then(() => {
    requestAnimationFrame(() => requestAnimationFrame(() => {
      performance.mark('afrinaija-hero-entrance-start');
      gsap.to(dish, {
        xPercent: 0,
        yPercent: 0,
        duration: 1.05,
        ease: 'power3.out',
        force3D: true,
        overwrite: true,
        onComplete: () => {
          performance.mark('afrinaija-hero-entrance-end');
          announceReady();
          requestAnimationFrame(() => gsap.set(dish, { clearProps: 'transform,willChange' }));
        }
      });
    }));
  });
})();
