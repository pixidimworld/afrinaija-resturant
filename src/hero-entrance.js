(() => {
  const dish = document.querySelector('.main-dish');
  const gsap = window.gsap;
  if (!dish || !gsap || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const mobile = window.matchMedia('(max-width: 900px)').matches;
  gsap.fromTo(
    dish,
    mobile ? { xPercent: -135, yPercent: 0 } : { xPercent: 0, yPercent: -145 },
    {
      xPercent: 0,
      yPercent: 0,
      duration: 0.9,
      ease: 'power3.out',
      force3D: true,
      onComplete: () => gsap.set(dish, { clearProps: 'transform,willChange' })
    }
  );
})();
