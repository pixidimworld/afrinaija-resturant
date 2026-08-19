const waitForImage = async image => {
  if (!image.complete) {
    await new Promise(resolve => {
      image.addEventListener('load', resolve, { once: true });
      image.addEventListener('error', resolve, { once: true });
    });
  }

  if (image.decode) {
    try {
      await image.decode();
    } catch {
      // A completed image can reject decode after the decoded frame is already available.
    }
  }
};

export async function setupFoodShowcase() {
  const root = document.querySelector('.food-showcase');
  if (!root) return;

  const slides = [...root.querySelectorAll('.food-showcase-slide')];
  const imageElements = [...root.querySelectorAll('.food-showcase-media > img')];
  const status = root.querySelector('.food-showcase-status');
  const { gsap, ScrollTrigger, SplitText } = window;

  if (!slides.length || !gsap || !ScrollTrigger || !SplitText) {
    root.classList.add('is-static');
    return;
  }

  root.classList.add('is-loading');
  await Promise.all(imageElements.map(waitForImage));
  root.classList.remove('is-loading');
  root.classList.add('is-ready');

  gsap.registerPlugin(ScrollTrigger, SplitText);

  const media = slides.map(slide => slide.querySelector('.food-showcase-media'));
  const headings = slides.map(slide => slide.querySelector('.food-showcase-heading'));
  const outers = slides.map(slide => slide.querySelector('.food-showcase-outer'));
  const inners = slides.map(slide => slide.querySelector('.food-showcase-inner'));
  const splitHeadings = headings.map(heading => SplitText.create(heading, {
    type: 'chars,words,lines',
    linesClass: 'food-showcase-clip-text'
  }));
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  gsap.set(slides, { autoAlpha: 0, zIndex: 0 });
  gsap.set([outers, inners, media], { yPercent: 0 });
  gsap.set(slides[0], { autoAlpha: 1, zIndex: 1 });
  gsap.set(splitHeadings[0].chars, { autoAlpha: 1, yPercent: 0 });

  const timeline = gsap.timeline({
    defaults: { duration: 1, ease: 'power1.inOut' },
    paused: true
  });
  timeline.addLabel('dish-1', 0);

  slides.slice(1).forEach((slide, offset) => {
    const index = offset + 1;
    const previousIndex = index - 1;
    const at = offset;
    const factor = reduceMotion.matches ? 0 : 1;

    timeline
      .addLabel(`dish-${index + 1}`, at)
      .set(slide, { autoAlpha: 1, zIndex: 2 }, at)
      .set(outers[index], { yPercent: 100 * factor }, at)
      .set(inners[index], { yPercent: -100 * factor }, at)
      .set(media[index], { yPercent: 15 * factor }, at)
      .set(splitHeadings[index].chars, {
        autoAlpha: reduceMotion.matches ? 1 : 0,
        yPercent: 150 * factor
      }, at)
      .to(media[previousIndex], { yPercent: -15 * factor }, at)
      .to([outers[index], inners[index]], { yPercent: 0 }, at)
      .to(media[index], { yPercent: 0 }, at)
      .to(splitHeadings[index].chars, {
        autoAlpha: 1,
        yPercent: 0,
        duration: reduceMotion.matches ? .18 : .78,
        ease: 'power2.out',
        stagger: reduceMotion.matches ? 0 : { each: .012, from: 'random' }
      }, at + (reduceMotion.matches ? 0 : .12))
      .set(slides[previousIndex], { autoAlpha: 0, zIndex: 0 }, at + .995)
      .set(slide, { zIndex: 1 }, at + 1);
  });
  timeline.addLabel(`dish-${slides.length}`, slides.length - 1);

  let announcedIndex = -1;
  const announce = progress => {
    const index = Math.min(slides.length - 1, Math.max(0, Math.round(progress * (slides.length - 1))));
    if (index === announcedIndex) return;
    announcedIndex = index;
    if (status) status.textContent = `Featured dish ${index + 1} of ${slides.length}: ${headings[index].textContent}`;
  };

  const getScrollDistance = () => {
    const mobile = window.matchMedia('(max-width: 700px)').matches;
    const perSlide = Math.max(mobile ? 500 : 680, window.innerHeight * (mobile ? .72 : .86));
    return Math.round(perSlide * (slides.length - 1));
  };

  const trigger = ScrollTrigger.create({
    id: 'food-showcase-sequence',
    trigger: root,
    animation: timeline,
    start: 'top top',
    end: () => `+=${getScrollDistance()}`,
    pin: true,
    pinSpacing: true,
    scrub: reduceMotion.matches ? true : .85,
    anticipatePin: 1,
    invalidateOnRefresh: true,
    fastScrollEnd: false,
    preventOverlaps: 'food-showcase-sequence',
    onUpdate: self => announce(self.progress),
    onLeave: self => {
      self.getTween()?.progress(1);
      timeline.progress(1);
      announce(1);
    },
    onLeaveBack: self => {
      self.getTween()?.progress(1);
      timeline.progress(0);
      announce(0);
    }
  });

  announce(0);
  requestAnimationFrame(() => {
    ScrollTrigger.refresh();
    root.dataset.showcaseReady = 'true';
  });

  return () => {
    trigger.kill();
    timeline.kill();
    splitHeadings.forEach(split => split.revert());
  };
}