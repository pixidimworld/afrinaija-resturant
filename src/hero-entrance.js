(() => {
  const dish = document.querySelector('.main-dish');
  const stage = dish?.closest('.dish-stage');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const announceReady = () => {
    document.documentElement.dataset.heroReady = 'true';
    window.dispatchEvent(new CustomEvent('afrinaija:hero-ready'));
  };

  if (!dish || !stage || reduceMotion) {
    stage?.classList.add('is-hero-arrived');
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', announceReady, { once: true });
    else announceReady();
    return;
  }

  dish.classList.add('is-hero-pending');

  const imageReady = dish.complete
    ? dish.decode?.().catch(() => {})
    : new Promise(resolve => {
      dish.addEventListener('load', resolve, { once: true });
      dish.addEventListener('error', resolve, { once: true });
    }).then(() => dish.decode?.().catch(() => {}));

  imageReady.then(() => {
    requestAnimationFrame(() => {
      let finished = false;
      const finish = () => {
        if (finished) return;
        finished = true;
        dish.removeEventListener('animationend', finish);
        dish.classList.remove('is-hero-entering');
        stage.classList.remove('is-hero-animating');
        stage.classList.add('is-hero-arrived');
        performance.mark('afrinaija-hero-entrance-end');
        announceReady();
      };

      performance.mark('afrinaija-hero-entrance-start');
      stage.classList.add('is-hero-animating');
      dish.classList.remove('is-hero-pending');
      dish.classList.add('is-hero-entering');
      dish.addEventListener('animationend', finish, { once: true });
      window.setTimeout(finish, 950);
    });
  });
})();
