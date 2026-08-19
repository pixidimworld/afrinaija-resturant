import { setupReservationForm } from './reservation.js';
import { setupQuickNavigation } from './navigation.js';
import { setupFoodShowcase } from './food-showcase.js';
import { setupSmoothScroll, scrollToTarget, setSmoothScrollPaused } from './smooth-scroll.js';

const menuButton = document.querySelector('.menu-button');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
function setupFoldText() {
  const root = document.querySelector('[data-fold-text]');
  if (!root) return;

  const text = root.dataset.foldText.replaceAll('\\n', '\n');
  const visual = document.createElement('span');
  visual.className = 'fold-text-visual';
  visual.setAttribute('aria-hidden', 'true');

  let segmentIndex = 0;
  [...text].forEach((character) => {
    if (character === '\n') {
      visual.append(document.createElement('br'));
      return;
    }

    const segment = document.createElement('span');
    segment.className = 'fold-text-segment';
    const piece = document.createElement('span');
    piece.className = 'fold-text-piece';
    piece.dataset.foldHinge = 'top';
    piece.style.setProperty('--fold-delay', `${segmentIndex * 0.045}s`);
    piece.textContent = character === ' ' ? '\u00a0' : character;
    segment.append(piece);
    visual.append(segment);
    segmentIndex += 1;
  });

  const accessibleText = document.createElement('span');
  accessibleText.className = 'fold-text-sr-only';
  accessibleText.textContent = text;
  root.replaceChildren(accessibleText, visual);
  requestAnimationFrame(() => root.classList.add('is-folding-in'));
}

function setupFoodLoop() {
  const loop = document.querySelector('.food-loop');
  const path = document.querySelector('#food-loop-path');
  const dishes = [...document.querySelectorAll('.food-loop-dish')];
  if (!loop || !path || !dishes.length) return;

  dishes.forEach(dish => {
    const image = dish.querySelector('img[data-src]');
    if (!image) return;
    image.src = image.dataset.src;
    delete image.dataset.src;
  });

  const pathLength = path.getTotalLength();
  const duration = 18000;
  let startTime;
  let frameId;
  let isVisible = true;

  const placeDishes = (progress = 0) => {
    const scaleX = loop.clientWidth / 1200;
    const scaleY = loop.clientHeight / 150;
    dishes.forEach((dish, index) => {
      const position = (progress + index / dishes.length) % 1;
      const point = path.getPointAtLength(position * pathLength);
      dish.style.transform = `translate3d(${point.x * scaleX}px, ${point.y * scaleY}px, 0) translate(-50%, -50%)`;
    });
  };

  const animate = timestamp => {
    if (!startTime) startTime = timestamp;
    placeDishes(((timestamp - startTime) % duration) / duration);
    frameId = requestAnimationFrame(animate);
  };

  const updateMotion = () => {
    cancelAnimationFrame(frameId);
    startTime = undefined;
    placeDishes();
    const shouldRun = isVisible && !document.hidden && !reduceMotion.matches;
    loop.dataset.loopRunning = String(shouldRun);
    if (shouldRun) frameId = requestAnimationFrame(animate);
  };

  const observer = new IntersectionObserver(entries => {
    isVisible = entries.some(entry => entry.isIntersecting);
    updateMotion();
  }, { rootMargin: '120px 0px', threshold: 0 });

  observer.observe(loop);
  reduceMotion.addEventListener('change', updateMotion);
  document.addEventListener('visibilitychange', updateMotion);
  window.addEventListener('resize', () => {
    if (!isVisible || reduceMotion.matches) placeDishes();
  });
  updateMotion();
}
function setupTextLoop() {
  const roots = [...document.querySelectorAll('.text-loop')];
  roots.forEach(root => {
    const path = root.querySelector('path');
    const measureText = root.querySelector('.text-loop-measure');
    const head = root.querySelector('.text-loop-head');
    const tail = root.querySelector('.text-loop-tail');
    if (!path || !measureText || !head || !tail) return;

    const phrase = root.dataset.text || 'THE BEST NIGERIAN CUISINE';
    const unit = `${phrase}\u00a0\u2726\u00a0`;
    const speed = Number(root.dataset.speed) || 90;
    let pathLength = 0;
    let offset = 0;
    let previousTime;
    let frameId;
    let isVisible = false;

    const apply = value => {
      const partner = value >= 0 ? value - pathLength : value + pathLength;
      head.setAttribute('startOffset', String(value));
      tail.setAttribute('startOffset', String(partner));
    };

    const animate = timestamp => {
      if (!previousTime) previousTime = timestamp;
      const delta = Math.min((timestamp - previousTime) / 1000, .05);
      previousTime = timestamp;
      offset = (offset + speed * delta) % pathLength;
      apply(offset);
      frameId = requestAnimationFrame(animate);
    };

    const updateMotion = () => {
      cancelAnimationFrame(frameId);
      previousTime = undefined;
      const shouldRun = isVisible && !document.hidden && !reduceMotion.matches && speed > 0;
      root.dataset.loopRunning = String(shouldRun);
      if (shouldRun) frameId = requestAnimationFrame(animate);
    };

    const measure = () => {
      pathLength = path.getTotalLength();
      const unitWidth = measureText.getComputedTextLength();
      const repetitions = unitWidth > 0 ? Math.max(1, Math.round(pathLength / unitWidth)) : 1;
      const loopText = unit.repeat(repetitions);
      [head, tail].forEach(textPath => {
        textPath.textContent = loopText;
        textPath.setAttribute('textLength', String(pathLength));
        textPath.setAttribute('lengthAdjust', 'spacing');
      });
      apply(offset);
      updateMotion();
    };

    const observer = new IntersectionObserver(entries => {
      isVisible = entries.some(entry => entry.isIntersecting);
      updateMotion();
    }, { rootMargin: '180px 0px', threshold: 0 });

    observer.observe(root);
    reduceMotion.addEventListener('change', updateMotion);
    document.addEventListener('visibilitychange', updateMotion);
    measure();
    document.fonts?.ready.then(measure).catch(() => {});
  });
}
function setupAboutTextReveal() {
  const paragraph = document.querySelector('.about-reveal');
  if (!paragraph) return;

  const text = paragraph.textContent.trim().replace(/\s+/g, ' ');
  let hasRevealed = false;
  let resizeTimer;

  const buildLines = () => {
    paragraph.classList.add('is-splitting');
    paragraph.classList.remove('is-ready', 'is-visible');
    paragraph.textContent = '';

    const words = text.split(' ');
    words.forEach((word, index) => {
      const wordElement = document.createElement('span');
      wordElement.className = 'about-reveal-word';
      wordElement.textContent = word;
      paragraph.append(wordElement);
      if (index < words.length - 1) paragraph.append(document.createTextNode(' '));
    });

    const rows = [];
    [...paragraph.querySelectorAll('.about-reveal-word')].forEach(word => {
      const row = rows.find(candidate => Math.abs(candidate.top - word.offsetTop) < 2);
      if (row) row.words.push(word.textContent);
      else rows.push({ top: word.offsetTop, words: [word.textContent] });
    });

    paragraph.textContent = '';
    rows.forEach((row, index) => {
      const line = document.createElement('span');
      line.className = 'about-reveal-line';
      line.setAttribute('aria-hidden', 'true');

      const inner = document.createElement('span');
      inner.className = 'about-reveal-line-inner';
      inner.style.setProperty('--line-index', index);
      inner.textContent = row.words.join(' ');
      line.append(inner);
      paragraph.append(line);
    });

    paragraph.setAttribute('aria-label', text);
    paragraph.classList.remove('is-splitting');
    paragraph.classList.add('is-ready');
    if (hasRevealed || reduceMotion.matches) paragraph.classList.add('is-visible');
  };

  const reveal = () => {
    hasRevealed = true;
    requestAnimationFrame(() => paragraph.classList.add('is-visible'));
  };

  buildLines();
  document.fonts?.ready.then(buildLines).catch(() => {});

  if (reduceMotion.matches || !('IntersectionObserver' in window)) reveal();
  else {
    const observer = new IntersectionObserver(entries => {
      if (!entries.some(entry => entry.isIntersecting)) return;
      reveal();
      observer.disconnect();
    }, { threshold: 0.32 });
    observer.observe(paragraph);
  }

  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(buildLines, 180);
  });
}
function setupAboutDecorations() {
  const section = document.querySelector('.about-section');
  const palm = document.querySelector('.about-palm');
  const gsap = window.gsap;
  if (!section || !palm || !gsap) return;

  if (reduceMotion.matches || !('IntersectionObserver' in window)) {
    gsap.set(palm, { '--palm-drop': '0px' });
    return;
  }

  gsap.set(palm, { '--palm-drop': '-34px' });
  const observer = new IntersectionObserver(entries => {
    if (!entries.some(entry => entry.isIntersecting)) return;
    gsap.to(palm, { '--palm-drop': '0px', duration: 1.35, ease: 'power2.out' });
    observer.disconnect();
  }, { threshold: .2 });
  observer.observe(section);
}

function setupStaffCarousel() {
  const stage = document.querySelector('.staff-carousel');
  const path = document.querySelector('#staff-arc-path');
  const cards = [...document.querySelectorAll('.staff-card')];
  if (!stage || !path || !cards.length) return;

  const pathLength = path.getTotalLength();
  const duration = 22000;
  let startTime;
  let frameId;

  const placeCards = (progress = 0) => {
    const scaleX = stage.clientWidth / 1200;
    const scaleY = stage.clientHeight / 430;
    cards.forEach((card, index) => {
      const position = (progress + index / cards.length) % 1;
      const point = path.getPointAtLength(position * pathLength);
      card.style.transform = `translate3d(${point.x * scaleX}px, ${point.y * scaleY}px, 0) translate(-50%, -50%)`;
    });
  };

  const animate = timestamp => {
    if (!startTime) startTime = timestamp;
    placeCards(((timestamp - startTime) % duration) / duration);
    frameId = requestAnimationFrame(animate);
  };

  const updateMotion = () => {
    cancelAnimationFrame(frameId);
    startTime = undefined;
    placeCards();
    if (!reduceMotion.matches) frameId = requestAnimationFrame(animate);
  };

  reduceMotion.addEventListener('change', updateMotion);
  window.addEventListener('resize', () => {
    if (reduceMotion.matches) placeCards();
  });
  updateMotion();
}
const environmentImages = [
  'WhatsApp Image 2026-08-12 at 1.34.19 PM (1).jpeg',
  'WhatsApp Image 2026-08-12 at 1.34.19 PM.jpeg',
  'WhatsApp Image 2026-08-12 at 1.34.20 PM.jpeg',
  'WhatsApp Image 2026-08-12 at 1.34.23 PM.jpeg',
  'WhatsApp Image 2026-08-12 at 1.59.31 PM (1).jpeg',
  'WhatsApp Image 2026-08-12 at 1.59.31 PM.jpeg',
  'WhatsApp Image 2026-08-12 at 1.59.32 PM (1).jpeg',
  'WhatsApp Image 2026-08-12 at 1.59.32 PM.jpeg',
  'WhatsApp Image 2026-08-12 at 1.59.33 PM.jpeg',
  'WhatsApp Image 2026-08-12 at 1.59.37 PM.jpeg',
  'WhatsApp Image 2026-08-12 at 1.59.40 PM (1).jpeg',
  'WhatsApp Image 2026-08-12 at 1.59.40 PM.jpeg',
  'WhatsApp Image 2026-08-12 at 1.59.44 PM.jpeg',
  'WhatsApp Image 2026-08-12 at 1.59.45 PM.jpeg',
  'WhatsApp Image 2026-08-12 at 1.59.48 PM.jpeg',
  'WhatsApp Image 2026-08-12 at 1.59.49 PM.jpeg',
  'WhatsApp Image 2026-08-12 at 1.59.52 PM.jpeg',
  'WhatsApp Image 2026-08-12 at 1.59.53 PM.jpeg',
  'WhatsApp Image 2026-08-12 at 1.59.55 PM.jpeg',
  'WhatsApp Image 2026-08-12 at 1.59.56 PM.jpeg',
  'WhatsApp Image 2026-08-12 at 1.59.59 PM.jpeg'
];

function setupExperienceCarousel() {
  const carousel = document.querySelector('.experience-carousel');
  const cardsRoot = document.querySelector('.experience-cards');
  const gsap = window.gsap;
  if (!carousel || !cardsRoot || !gsap) return;

  const cards = environmentImages.map((filename, index) => {
    const figure = document.createElement('figure');
    figure.className = 'experience-card';
    const image = document.createElement('img');
    image.dataset.src = `/assets/environment-images/${filename}`;
    image.alt = `Naija Afrinaija Pot restaurant environment ${index + 1}`;
    image.loading = 'lazy';
    image.decoding = 'async';
    image.draggable = false;
    figure.append(image);
    cardsRoot.append(figure);
    return figure;
  });

  const loadImages = () => {
    cardsRoot.querySelectorAll('img[data-src]').forEach(image => {
      image.src = image.dataset.src;
      delete image.dataset.src;
    });
  };
  const loadObserver = new IntersectionObserver(entries => {
    if (!entries.some(entry => entry.isIntersecting)) return;
    loadObserver.disconnect();
    loadImages();
  }, { rootMargin: '1200px 0px', threshold: 0 });
  loadObserver.observe(carousel);

  const state = { position: 0 };
  let dragging = false;
  let moved = false;
  let startX = 0;
  let startPosition = 0;
  let lastX = 0;
  let lastTime = 0;
  let velocity = 0;

  const wrapDistance = value => {
    const count = cards.length;
    return ((value + count / 2) % count + count) % count - count / 2;
  };

  const getMetrics = () => {
    const mobile = window.matchMedia('(max-width: 900px)').matches;
    return {
      spacing: carousel.clientWidth * (mobile ? .31 : .235),
      radius: mobile ? 2.25 : 3.45,
      curve: mobile ? 4 : 5.2
    };
  };

  const render = () => {
    const { spacing, radius, curve } = getMetrics();
    cards.forEach((card, index) => {
      const distance = wrapDistance(index - state.position);
      const depth = Math.abs(distance);
      const visible = depth <= radius + .7;
      const edgeFade = gsap.utils.clamp(0, 1, radius + .55 - depth);
      const scale = Math.max(.72, 1 - depth * .075);
      const y = -curve * depth * depth;

      gsap.set(card, {
        x: distance * spacing,
        y,
        scale,
        opacity: visible ? edgeFade : 0,
        zIndex: Math.round(100 - depth * 10),
        visibility: visible ? 'visible' : 'hidden',
        filter: `saturate(${Math.max(.78, 1 - depth * .055)}) brightness(${Math.max(.82, 1 - depth * .04)})`,
        force3D: true
      });

      const isCentered = depth < .5;
      card.setAttribute('aria-hidden', String(!isCentered));
    });
  };

  const normalize = () => {
    state.position = ((state.position % cards.length) + cards.length) % cards.length;
    render();
  };

  const glideTo = target => {
    gsap.killTweensOf(state);
    const distance = Math.abs(target - state.position);
    gsap.to(state, {
      position: target,
      duration: reduceMotion.matches ? .2 : gsap.utils.clamp(.45, .9, .42 + distance * .12),
      ease: reduceMotion.matches ? 'power1.out' : 'power3.out',
      onUpdate: render,
      onComplete: normalize
    });
  };

  const release = event => {
    if (!dragging) return;
    dragging = false;
    carousel.classList.remove('is-dragging');
    if (carousel.hasPointerCapture?.(event.pointerId)) carousel.releasePointerCapture(event.pointerId);
    const { spacing } = getMetrics();
    const projected = state.position - (velocity * 260) / spacing;
    glideTo(Math.round(projected));
  };

  carousel.addEventListener('pointerdown', event => {
    if (event.button !== undefined && event.button !== 0) return;
    gsap.killTweensOf(state);
    dragging = true;
    moved = false;
    startX = event.clientX;
    startPosition = state.position;
    lastX = event.clientX;
    lastTime = performance.now();
    velocity = 0;
    carousel.classList.add('is-dragging');
    carousel.setPointerCapture?.(event.pointerId);
  });

  carousel.addEventListener('pointermove', event => {
    if (!dragging) return;
    const now = performance.now();
    const deltaX = event.clientX - startX;
    const elapsed = Math.max(8, now - lastTime);
    velocity = (event.clientX - lastX) / elapsed;
    moved = moved || Math.abs(deltaX) > 5;
    state.position = startPosition - deltaX / getMetrics().spacing;
    lastX = event.clientX;
    lastTime = now;
    render();
  });

  carousel.addEventListener('pointerup', release);
  carousel.addEventListener('pointercancel', release);
  carousel.addEventListener('lostpointercapture', event => {
    if (dragging) release(event);
  });
  carousel.addEventListener('click', event => {
    if (!moved) return;
    event.preventDefault();
    event.stopPropagation();
  }, true);

  carousel.addEventListener('keydown', event => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    event.preventDefault();
    glideTo(Math.round(state.position) + (event.key === 'ArrowRight' ? 1 : -1));
  });

  window.addEventListener('resize', render, { passive: true });
  carousel.setAttribute('aria-roledescription', 'draggable carousel');
  render();
}
function setupExperienceEntrance() {
  const section = document.querySelector('.experience-section');
  if (!section) return;

  if (reduceMotion.matches || !('IntersectionObserver' in window)) {
    section.classList.add('is-in-view');
    return;
  }

  const observer = new IntersectionObserver(entries => {
    if (!entries.some(entry => entry.isIntersecting)) return;
    section.classList.add('is-in-view');
    observer.disconnect();
  }, { threshold: .18 });

  observer.observe(section);
}
const testimonials = [
  { name: 'Adam Jano', text: 'Great food and great service. Highly recommend if you like West African food \u2014 the plates are generous and full of flavour.' },
  { name: 'Gaelle Isimbi', text: 'The customer service is top-notch. You feel genuinely welcomed, and the food matches that same energy.' },
  { name: 'Shell Scale', text: 'The food, packaging, delivery and customer service were top-notch. I will definitely be buying from them throughout my stay in Kigali.' },
  { name: 'Stella Omodolapo', text: 'The food is very nice and tastes like home.' },
  { name: 'hamzahahmed1', text: 'Had jollof rice, egusi soup, chicken and yam \u2014 all great flavours!' },
  { name: 'Info Divine Custom Cakes', text: 'Service was great and friendly, the food was yummy and the packaging was classy and neat. Highly recommend.' },
  { name: 'Malcolm Kiiza', text: 'Service and food were great. Definitely recommend.' }
];

function setupTestimonialsStack() {
  const stack = document.querySelector('.testimonials-stack');
  const inner = document.querySelector('.testimonials-stack-inner');
  if (!stack || !inner) return;

  testimonials.forEach(({ name, text }, index) => {
    const article = document.createElement('article');
    article.className = 'testimonial-card';
    article.style.setProperty('--card-index', index);
    article.innerHTML = `<div><p class="testimonial-stars" aria-label="5 out of 5 stars">\u2605\u2605\u2605\u2605\u2605</p><p class="testimonial-review">${text}</p></div><div class="testimonial-card-footer"><h3>${name}</h3><span aria-hidden="true">${String(index + 1).padStart(2, '0')}</span></div>`;
    inner.append(article);
  });

  const end = document.createElement('div');
  end.className = 'testimonials-stack-end';
  end.setAttribute('aria-hidden', 'true');
  stack.append(end);

  const cards = [...inner.querySelectorAll('.testimonial-card')];
  let metrics = [];
  let ticking = false;

  const update = () => {
    ticking = false;
    if (reduceMotion.matches) return;
    const viewportHeight = window.innerHeight;
    const stackTop = Math.min(150, Math.max(82, viewportHeight * 0.16));

    cards.forEach((card, index) => {
      const nextTop = metrics[index + 1];
      if (nextTop === undefined) {
        card.style.setProperty('--stack-scale', '1');
        return;
      }

      const nextStickyTop = stackTop + (index + 1) * 14;
      const nextViewportTop = nextTop - window.scrollY;
      const progress = Math.min(1, Math.max(0, (viewportHeight * 0.82 - nextViewportTop) / (viewportHeight * 0.82 - nextStickyTop)));
      const targetScale = 0.88 + index * 0.018;
      card.style.setProperty('--stack-scale', (1 - progress * (1 - targetScale)).toFixed(4));
    });
  };

  const measure = () => {
    const stackDocumentTop = stack.getBoundingClientRect().top + window.scrollY;
    metrics = cards.map(card => stackDocumentTop + card.offsetTop);
    update();
  };

  const requestUpdate = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(update);
  };

  cards.forEach((card, index) => {
    card.style.setProperty('--stack-top', `calc(clamp(82px, 16vh, 150px) + ${index * 14}px)`);
    card.style.zIndex = index + 1;
  });

  measure();
  window.addEventListener('scroll', requestUpdate, { passive: true });
  window.addEventListener('resize', measure);
}
function setupBookingTransition() {
  const triggers = [...document.querySelectorAll('.booking-trigger')];
  const overlay = document.querySelector('.booking-overlay');
  const path = document.querySelector('.booking-transition-path');
  const page = document.querySelector('.booking-page');
  const close = document.querySelector('.booking-close');
  if (!triggers.length || !overlay || !path || !page || !close) return;

  const states = {
    closed: { edge: 100, curve: 100 },
    middle: { edge: 50, curve: 0 },
    open: { edge: 0, curve: 0 }
  };
  let animating = false;
  let activeTrigger = triggers[0];

  const draw = ({ edge, curve }) => {
    path.setAttribute('d', `M 0 100 V ${edge} Q 50 ${curve} 100 ${edge} V 100 z`);
  };

  const tween = (from, to, duration, ease) => new Promise(resolve => {
    const started = performance.now();
    const frame = timestamp => {
      const raw = Math.min((timestamp - started) / duration, 1);
      const progress = ease(raw);
      draw({
        edge: from.edge + (to.edge - from.edge) * progress,
        curve: from.curve + (to.curve - from.curve) * progress
      });
      if (raw < 1) requestAnimationFrame(frame);
      else resolve();
    };
    requestAnimationFrame(frame);
  });

  const power2In = value => value * value;
  const power2Out = value => 1 - (1 - value) * (1 - value);

  const openBooking = async () => {
    if (animating || overlay.classList.contains('is-open')) return;
    animating = true;
    page.scrollTop = 0;
    const reservationStatus = page.querySelector('.reservation-status');
    reservationStatus?.replaceChildren();
    if (reservationStatus) delete reservationStatus.dataset.state;
    overlay.classList.add('is-active');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.classList.add('booking-open');
    setSmoothScrollPaused(true);
    if (reduceMotion.matches) draw(states.open);
    else {
      await tween(states.closed, states.middle, 480, power2In);
      await tween(states.middle, states.open, 480, power2Out);
    }
    overlay.classList.add('is-open');
    animating = false;
    close.focus();
  };

  const closeBooking = async () => {
    if (animating || !overlay.classList.contains('is-open')) return;
    animating = true;
    overlay.classList.remove('is-open');
    if (reduceMotion.matches) draw(states.closed);
    else {
      await tween(states.open, states.middle, 480, power2In);
      await tween(states.middle, states.closed, 480, power2Out);
    }
    overlay.classList.remove('is-active');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('booking-open');
    if (!document.body.classList.contains('nav-open')) setSmoothScrollPaused(false);
    animating = false;
    activeTrigger.focus();
  };

  triggers.forEach(trigger => trigger.addEventListener('click', event => {
    event.preventDefault();
    activeTrigger = trigger;
    openBooking();
  }));
  close.addEventListener('click', closeBooking);
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && overlay.classList.contains('is-open')) closeBooking();
  });
}
const navigation = document.querySelector('.nav-overlay');
const navClose = document.querySelector('.nav-close');
const navBackdrop = document.querySelector('.nav-backdrop');
const navLinks = [...document.querySelectorAll('.nav-link')];
let previousFocus;

function setNavigation(isOpen, restoreFocus = true) {
  previousFocus = isOpen ? document.activeElement : previousFocus;
  navigation.classList.toggle('is-open', isOpen);
  navigation.setAttribute('aria-hidden', String(!isOpen));
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
  menuButton.classList.toggle('is-open', isOpen);
  document.body.classList.toggle('nav-open', isOpen);
  if (isOpen) setSmoothScrollPaused(true);
  else if (!document.body.classList.contains('booking-open')) setSmoothScrollPaused(false);

  if (isOpen) requestAnimationFrame(() => navClose.focus());
  else {
    const returnTarget = previousFocus?.matches?.('button, a, input, select, textarea, [tabindex]:not([tabindex="-1"])')
      ? previousFocus
      : menuButton;
    returnTarget.focus();
  }
}

menuButton.addEventListener('click', () => setNavigation(menuButton.getAttribute('aria-expanded') !== 'true'));
navClose.addEventListener('click', () => setNavigation(false));
navBackdrop.addEventListener('click', () => setNavigation(false));
navLinks.forEach(link => link.addEventListener('click', event => {
  const destination = link.getAttribute('href');

  setNavigation(false, false);
  if (destination === '/menu.html') return;

  const target = destination ? document.querySelector(destination) : null;
  if (!target) return;
  event.preventDefault();
  requestAnimationFrame(() => {
    scrollToTarget(target);
    history.pushState(null, '', destination);
  });
}));

document.addEventListener('keydown', event => {
  if (!navigation.classList.contains('is-open')) return;
  if (event.key === 'Escape') {
    setNavigation(false);
    return;
  }
  if (event.key !== 'Tab') return;

  const focusable = [navClose, ...navLinks];
  const first = focusable[0];
  const last = focusable.at(-1);
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
});
function setupSocialTitle() {
  const title = document.querySelector('.social-pop-title');
  const gsap = window.gsap;
  if (!title || !gsap || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  gsap.set(title, { autoAlpha: 0, scale: .78, y: 28, transformOrigin: '50% 60%' });
  const observer = new IntersectionObserver(entries => {
    if (!entries.some(entry => entry.isIntersecting)) return;
    observer.disconnect();
    gsap.to(title, {
      autoAlpha: 1,
      scale: 1,
      y: 0,
      duration: .9,
      ease: 'back.out(1.55)',
      clearProps: 'transform,opacity,visibility'
    });
  }, { threshold: .3 });
  observer.observe(title);
}
function setupFoodShowcaseWhenNear() {
  const root = document.querySelector('.food-showcase');
  if (!root) return;

  const initialize = () => setupFoodShowcase();
  if (!('IntersectionObserver' in window)) {
    initialize();
    return;
  }

  const observer = new IntersectionObserver(entries => {
    if (!entries.some(entry => entry.isIntersecting)) return;
    observer.disconnect();
    initialize();
  }, { rootMargin: '600px 0px', threshold: 0 });

  observer.observe(root);
}
function setupDeferredImages() {
  const images = [...document.querySelectorAll('img[data-deferred-src]')];
  if (!images.length) return;

  const load = image => {
    image.src = image.dataset.deferredSrc;
    delete image.dataset.deferredSrc;
  };

  if (!('IntersectionObserver' in window)) {
    images.forEach(load);
    return;
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      observer.unobserve(entry.target);
      load(entry.target);
    });
  }, { rootMargin: '80px 0px', threshold: 0 });

  images.forEach(image => observer.observe(image));
}
setupSmoothScroll();
setupDeferredImages();
setupFoldText();
setupBookingTransition();
setupReservationForm();
setupQuickNavigation();
setupFoodLoop();

let deferredFeaturesStarted = false;
const startDeferredFeatures = () => {
  if (deferredFeaturesStarted) return;
  deferredFeaturesStarted = true;

  const initialize = () => {
    setupTextLoop();
    setupAboutTextReveal();
    setupAboutDecorations();
    setupStaffCarousel();
    setupExperienceCarousel();
    setupExperienceEntrance();
    setupSocialTitle();
    setupTestimonialsStack();
    setupFoodShowcaseWhenNear();
  };

  if ('requestIdleCallback' in window) window.requestIdleCallback(initialize, { timeout: 700 });
  else window.setTimeout(initialize, 32);
};

window.addEventListener('afrinaija:hero-ready', startDeferredFeatures, { once: true });
if (reduceMotion.matches || document.documentElement.dataset.heroReady === 'true') startDeferredFeatures();
window.setTimeout(startDeferredFeatures, 3500);























