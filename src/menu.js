import { setupMyOrder } from './order.js';

const riceAndMeats = [
  { name: 'Jollof Rice', price: 'RWF 12,000', image: '/assets/images/main-dish.png', description: 'Smoky Nigerian jollof rice served with a carefully prepared protein.' },
  { name: 'Full Package Jollof', price: 'RWF 20,000', image: '', description: 'Our complete jollof experience with generous accompaniments and protein.' },
  { name: 'White Rice & Stew', price: 'RWF 12,000', image: '', description: 'Steamed white rice paired with a rich, deeply seasoned Nigerian stew.' },
  { name: 'Fried Rice', price: 'RWF 12,000', image: '/assets/images/dish-rotate-3.png', description: 'Colourful Nigerian fried rice served with a carefully prepared protein.' },
  { name: 'Full Package Fried Rice', price: 'RWF 20,000', image: '', description: 'A generous fried rice plate completed with accompaniments and protein.' },
  { name: 'Coconut Rice', price: 'RWF 14,000', image: '', description: 'Fragrant rice cooked with coconut for a rich and comforting finish.' },
  { name: 'Local Nigerian Rice', price: 'RWF 12,000', image: '', description: 'Traditional Nigerian rice prepared with familiar spices and homestyle flavour.' },
  { name: 'Ofada Rice & Ofada Sauce', price: 'RWF 18,000', image: '', description: 'Distinctive Ofada rice served with its bold, traditional pepper sauce.' },
  { name: 'Ofada Sauce & White Rice', price: 'RWF 12,000', image: '', description: 'Steamed white rice accompanied by our rich and aromatic Ofada sauce.' },
  { name: 'White Rice & Vegetable', price: 'RWF 14,000', image: '', description: 'Steamed white rice served with a flavourful Nigerian vegetable preparation.' },
  { name: 'Special Fried Rice with Shrimps', price: 'RWF 30,000', image: '', description: 'Our special fried rice finished with seasoned shrimps for a celebratory plate.' }
];

const createMenuItems = (category, items) => items.map(([name, price]) => ({
  name,
  price,
  image: '',
  description: name + ' from our ' + category + ' selection.'
}));

const menuCategories = {
  'Rice & Meats': riceAndMeats,
  Breakfast: createMenuItems('Breakfast', [
    ['Chips & Egg', 'RWF 8,500'],
    ['Indomie, Egg & Plantain', 'RWF 8,500'],
    ['Special Omelette', 'RWF 8,500'],
    ['Fried Plantain & Egg', 'RWF 9,500'],
    ['Akara & Custard', 'RWF 10,000'],
    ['Moi Moi & Custard', 'RWF 10,000'],
    ['Jollof Spaghetti', 'RWF 9,500'],
    ['Jollof Macaroni', 'RWF 9,500']
  ]),
  Porridge: createMenuItems('Porridge', [
    ['Rwandan Beans', 'RWF 9,000'],
    ['Nigerian Beans', 'RWF 13,000'],
    ['Sweet Potatoes', 'RWF 10,000'],
    ['Irish Potato', 'RWF 10,000'],
    ['Yam', 'RWF 15,000'],
    ['Ripe Plantain', 'RWF 10,000'],
    ['Unripe Plantain', 'RWF 10,000']
  ]),
  Soups: createMenuItems('Soups', [
    ['Egusi', 'RWF 6,000'],
    ['Vegetable', 'RWF 6,000'],
    ['Efo Riro', 'RWF 6,000'],
    ['Okra', 'RWF 6,000'],
    ['Ogbono', 'RWF 7,000'],
    ['Bitter Leaf', 'RWF 7,000'],
    ['Banga', 'RWF 7,000'],
    ['Afang', 'RWF 8,000'],
    ['Fisherman', 'RWF 10,000'],
    ['White Soup', 'RWF 7,000'],
    ['Oha', 'RWF 7,500'],
    ['Ewedu', 'RWF 6,000'],
    ['Gbegiri', 'RWF 7,000'],
    ['Egusi Bitter Leaf', 'RWF 7,000'],
    ['Groundnuts', 'RWF 6,500']
  ]),
  Proteins: createMenuItems('Proteins', [
    ['Goat', 'RWF 5,000'],
    ['Chicken', 'RWF 4,000'],
    ['Tilapia Fish', 'RWF 5,000'],
    ['Titus Fish', 'RWF 5,000'],
    ['Beef', 'RWF 4,000'],
    ['Cow Leg', 'RWF 5,000'],
    ['Assorted Meats', 'RWF 4,000'],
    ['Dry Fish', 'RWF 5,000'],
    ['Turkey', 'RWF 6,000']
  ]),
  Swallow: createMenuItems('Swallow', [
    ['Pando', 'RWF 5,000'],
    ['Amala', 'RWF 4,000'],
    ['Fufu', 'RWF 3,000'],
    ['Semo', 'RWF 3,000'],
    ['Garri', 'RWF 4,000'],
    ['Wheat', 'RWF 3,000'],
    ['Oatmeal', 'RWF 5,000'],
    ['Plantain Flour', 'RWF 4,000'],
    ['Tuwo Shinkefa', 'RWF 3,000']
  ]),
  'Vegetarian Foods': createMenuItems('Vegetarian Foods', [
    ['Vegetable Sauce & Rice', 'RWF 12,000'],
    ['Jollof & Vegetable', 'RWF 12,000'],
    ['Special Salad', 'RWF 10,000'],
    ['Spaghetti & Vegetables', 'RWF 12,000'],
    ['Macaroni & Vegetables', 'RWF 12,000'],
    ['Fried Rice', 'RWF 12,000'],
    ['Coconut Rice', 'RWF 12,000'],
    ['Veggies Noodles', 'RWF 8,500'],
    ['Spinach & Rice', 'RWF 12,000']
  ]),
  Shawarma: createMenuItems('Shawarma', [
    ['Chicken Shawarma', 'RWF 5,000'],
    ['Beef Shawarma', 'RWF 5,000'],
    ['Shawarma with Sausage', 'RWF 7,000'],
    ['Chicken Brochettes', 'RWF 5,000'],
    ['Beef Brochettes', 'RWF 5,000'],
    ['Fisherman Brochettes', 'RWF 6,000']
  ]),
  'Food in Liters': createMenuItems('Food in Liters', [
    ['1 Liter', 'RWF 20,000'],
    ['2 Liters', 'RWF 40,000'],
    ['3 Liters', 'RWF 60,000'],
    ['4 Liters', 'RWF 80,000'],
    ['5 Liters', 'RWF 100,000']
  ]),
  'Rwandan Specials': createMenuItems('Rwandan Specials', [
    ['Matoke & Beef', 'RWF 7,000'],
    ['Chips & Chicken', 'RWF 8,500'],
    ['Amachaza Rice & Sauce', 'RWF 9,500'],
    ['Rice, Chips & Beans MEA', 'RWF 9,000'],
    ['Macaroni & Vegetables', 'RWF 6,000'],
    ['Buliu', 'RWF 10,000'],
    ['Pilau Rice & Meat', 'RWF 9,500'],
    ['Imvange', 'RWF 9,000'],
    ['Spinach & Rice Chips', 'RWF 7,500'],
    ['Isombe Swallow With', 'RWF 8,500']
  ]),
  'Food Platters': [
    {
      name: 'Pilau Platter',
      price: 'RWF 40,000',
      image: '',
      description: 'Pilau, chicken or beef, chips, salad and sauce.'
    },
    {
      name: 'Jollof Platter for Six',
      price: 'RWF 55,000',
      image: '',
      description: 'Jollof, chicken or beef or fish, plantain, salad and sauce.'
    },
    {
      name: 'AfriNaija Special Birthday Platter for 10',
      price: 'RWF 300,000',
      image: '',
      description: 'Bowl of jollof, pilau and fried rice, fried fish and fried chicken, salad, vegetable chips and plantain, sauce, bottle of red or white wine and cake.'
    }
  ],
  Drinks: createMenuItems('Drinks', [
    ['Soda', 'RWF 1,500'],
    ['Sparkling Water', 'RWF 1,500'],
    ['Yange Juice', 'RWF 3,500'],
    ['Muzig', 'RWF 2,000'],
    ['Heineken', 'RWF 2,500'],
    ['Small Water', 'RWF 1,000'],
    ['Big Water', 'RWF 2,500'],
    ['Skol', 'RWF 1,500'],
    ['Guinness', 'RWF 4,000'],
    ['Savannah', 'RWF 5,000'],
    ['Black Tea', 'RWF 4,000'],
    ['Green Tea', 'RWF 4,000'],
    ['Coffee Black', 'RWF 5,000'],
    ['Exprso', 'RWF 5,000'],
    ['Maltona', 'RWF 1,500']
  ]),
  Grills: createMenuItems('Grills', [
    ['Full Chicken Suya', 'RWF 18,000'],
    ['Pepper Chicken Medium', 'RWF 18,000'],
    ['Pepper Chicken Large', 'RWF 30,000'],
    ['Grilled Goat', 'RWF 20,000'],
    ['Asun', 'RWF 15,000'],
    ['Grilled Catfish', 'RWF 25,000'],
    ['Grilled Tilapia Medium', 'RWF 18,000'],
    ['Grilled Tilapia Large', 'RWF 30,000'],
    ['Half Chicken & Chips', 'RWF 15,000'],
    ['Peppered Beef', 'RWF 14,000'],
    ['Peppered Goat', 'RWF 18,000'],
    ['Peppered Pomo', 'RWF 12,000'],
    ['Beef Suya', 'RWF 13,000']
  ]),
  'Pepper Soup': createMenuItems('Pepper Soup', [
    ['Full Catfish', 'RWF 18,000'],
    ['Full Large Catfish', 'RWF 25,000'],
    ['Tilapia Fish', 'RWF 15,000'],
    ['Chicken', 'RWF 10,000'],
    ['Goat', 'RWF 15,000'],
    ['Beef', 'RWF 10,000'],
    ['Assorted Cow Meat', 'RWF 10,000'],
    ['Assorted Goat Meat', 'RWF 12,000']
  ]),
  'Special Order': createMenuItems('Special Order', [
    ['Ise Ewu', 'RWF 16,000'],
    ['Nkwobi', 'RWF 14,000'],
    ['Abacha', 'RWF 10,000'],
    ['Waakye', 'RWF 15,000']
  ])
};

function setupMenuPage() {
  const previous = document.querySelector('.menu-meal-previous');
  const next = document.querySelector('.menu-meal-next');
  const title = document.querySelector('.menu-meal-title');
  const image = document.querySelector('.menu-meal-image');
  const imageStage = document.querySelector('.menu-meal-image-stage');
  const price = document.querySelector('.menu-meal-price');
  const details = document.querySelector('.menu-meal-description');
  const detailName = document.querySelector('.menu-meal-detail-name');
  const description = document.querySelector('.menu-meal-detail-copy');
  const count = document.querySelector('.menu-meal-count');
  const categoryLabel = document.querySelector('.menu-page-kicker');
  const categoryToggle = document.querySelector('.menu-category-toggle');
  const categoryCard = document.querySelector('.menu-category-card');
  const categoryButtons = [...document.querySelectorAll('[data-category]')];
  const gsap = window.gsap;
  if (!previous || !next || !title || !image || !imageStage || !price || !details || !detailName || !description || !count || !categoryLabel || !categoryToggle || !categoryCard || !categoryButtons.length || !gsap) return;

  let activeCategory = 'Rice & Meats';
  let activeIndex = 0;
  let transitioning = false;
  let activeTimeline;
  const targets = [title, imageStage, price, details, count];

  const finishActiveTransition = () => {
    if (!transitioning || !activeTimeline) return;
    const timeline = activeTimeline;
    activeTimeline = null;
    transitioning = false;
    timeline.progress(1);
    timeline.kill();
  };

  const createTransition = () => {
    transitioning = true;
    activeTimeline = gsap.timeline({
      onComplete: () => {
        transitioning = false;
        activeTimeline = null;
      }
    });
    return activeTimeline;
  };

  const getMeals = () => menuCategories[activeCategory];

  const updateCategoryButtons = () => {
    categoryButtons.forEach(button => {
      button.setAttribute('aria-current', String(button.dataset.category === activeCategory));
    });
  };

  const applyMeal = index => {
    const meals = getMeals();
    const meal = meals[index];
    title.textContent = meal.name;
    price.textContent = meal.price;
    detailName.textContent = meal.name;
    description.textContent = meal.description;
    count.textContent = String(index + 1).padStart(2, '0') + ' / ' + String(meals.length).padStart(2, '0');
    categoryLabel.textContent = activeCategory;
    imageStage.dataset.meal = meal.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    if (meal.image) {
      image.src = meal.image;
      image.alt = meal.name + ' at Afrinaija Pot';
      image.hidden = false;
      imageStage.classList.remove('is-empty');
    } else {
      image.removeAttribute('src');
      image.alt = '';
      image.hidden = true;
      imageStage.classList.add('is-empty');
    }
  };

  const moveTo = nextIndex => {
    finishActiveTransition();
    const meals = getMeals();
    const wrappedIndex = (nextIndex + meals.length) % meals.length;
    const direction = wrappedIndex > activeIndex || (activeIndex === meals.length - 1 && wrappedIndex === 0) ? 1 : -1;
    createTransition()
      .to(targets, { autoAlpha: 0, x: -22 * direction, duration: .24, ease: 'power2.in', stagger: .025 })
      .add(() => {
        activeIndex = wrappedIndex;
        applyMeal(activeIndex);
        gsap.set(targets, { x: 22 * direction });
      })
      .to(targets, { autoAlpha: 1, x: 0, duration: .48, ease: 'power3.out', stagger: .035 });
  };

  const setCategoryOpen = isOpen => {
    categoryToggle.setAttribute('aria-expanded', String(isOpen));
    categoryCard.setAttribute('aria-hidden', String(!isOpen));
    categoryCard.classList.toggle('is-open', isOpen);
    gsap.to(categoryToggle.querySelector('svg'), { rotation: isOpen ? 180 : 0, duration: .35, ease: 'power2.out' });
  };

  const changeCategory = category => {
    if (!menuCategories[category]) return;
    finishActiveTransition();
    if (category === activeCategory) {
      setCategoryOpen(false);
      return;
    }

    setCategoryOpen(false);
    createTransition()
      .to(targets, { autoAlpha: 0, x: -22, duration: .24, ease: 'power2.in', stagger: .025 })
      .add(() => {
        activeCategory = category;
        activeIndex = 0;
        applyMeal(0);
        updateCategoryButtons();
        gsap.set(targets, { x: 22 });
      })
      .to(targets, { autoAlpha: 1, x: 0, duration: .48, ease: 'power3.out', stagger: .035 });
  };

  previous.addEventListener('click', () => {
    finishActiveTransition();
    moveTo(activeIndex - 1);
  });
  next.addEventListener('click', () => {
    finishActiveTransition();
    moveTo(activeIndex + 1);
  });
  categoryToggle.addEventListener('click', () => setCategoryOpen(categoryToggle.getAttribute('aria-expanded') !== 'true'));
  categoryButtons.forEach(button => {
    button.addEventListener('click', () => changeCategory(button.dataset.category));
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      finishActiveTransition();
      moveTo(activeIndex - 1);
    }
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      finishActiveTransition();
      moveTo(activeIndex + 1);
    }
  });

  updateCategoryButtons();
  applyMeal(0);
  setupMyOrder({
    getCurrentSelection: () => {
      const meal = getMeals()[activeIndex];
      return {
        name: meal.name,
        category: activeCategory,
        price: meal.price
      };
    }
  });
}

function setupMenuEntrance() {
  const curtain = document.querySelector('.menu-page-entrance');
  const gsap = window.gsap;
  if (!curtain) return;
  if (!gsap || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    curtain.remove();
    return;
  }

  const header = document.querySelector('.menu-page-header');
  const kicker = document.querySelector('.menu-page-kicker');
  const title = document.querySelector('.menu-meal-title');
  const image = document.querySelector('.menu-meal-image-stage');
  const controls = [...document.querySelectorAll('.menu-meal-arrow, .menu-meal-meta, .menu-meal-description, .menu-meal-count, .menu-category-toggle, .my-order-floating')];
  const content = [header, kicker, title, image, ...controls].filter(Boolean);

  gsap.set(content, { autoAlpha: 0 });
  gsap.timeline({ defaults: { ease: 'power3.out' }, onComplete: () => curtain.remove() })
    .to(curtain.querySelector('span'), { autoAlpha: 0, y: -16, duration: .3, ease: 'power2.in' })
    .to(curtain, { yPercent: -100, duration: .78, ease: 'power3.inOut' })
    .fromTo(header, { y: -20 }, { autoAlpha: 1, y: 0, duration: .5 }, '-=.38')
    .fromTo(kicker, { y: -12 }, { autoAlpha: 1, y: 0, duration: .45 }, '<.06')
    .fromTo(title, { scale: .94 }, { autoAlpha: 1, scale: 1, duration: .65 }, '<')
    .fromTo(image, { y: 42, scale: .9 }, { autoAlpha: 1, y: 0, scale: 1, duration: .72 }, '<.06')
    .fromTo(controls, { y: 18 }, { autoAlpha: 1, y: 0, duration: .48, stagger: .035 }, '-=.44');
}
setupMenuPage();
setupMenuEntrance();


