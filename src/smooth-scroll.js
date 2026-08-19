const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

export function setupSmoothScroll() {
  const { Lenis, gsap, ScrollTrigger } = window;
  if (!Lenis || !gsap || reduceMotion.matches) {
    document.documentElement.dataset.smoothScroll = 'native';
    return null;
  }

  const lenis = new Lenis({
    duration: 1.05,
    easing: value => Math.min(1, 1.001 - Math.pow(2, -10 * value)),
    smoothWheel: true,
    syncTouch: false,
    wheelMultiplier: .88,
    touchMultiplier: 1.05,
    anchors: false,
    autoResize: true,
    overscroll: true
  });

  const update = time => lenis.raf(time * 1000);
  if (ScrollTrigger) lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add(update);
  gsap.ticker.lagSmoothing(0);

  window.afrinaijaScroll = lenis;
  document.documentElement.dataset.smoothScroll = 'lenis';
  return lenis;
}

export function scrollToTarget(target, options = {}) {
  if (!target) return;
  const lenis = window.afrinaijaScroll;
  if (lenis && !reduceMotion.matches) {
    lenis.scrollTo(target, {
      duration: options.duration || 1.05,
      offset: options.offset || 0,
      lock: false,
      force: true
    });
    return;
  }

  target.scrollIntoView({ behavior: reduceMotion.matches ? 'auto' : 'smooth', block: 'start' });
}

export function setSmoothScrollPaused(paused) {
  const lenis = window.afrinaijaScroll;
  if (!lenis) return;
  if (paused) lenis.stop();
  else lenis.start();
}