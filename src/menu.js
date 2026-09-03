import { setupMyOrder } from './order.js';

const riceAndMeats = [
  { name: 'Jollof Rice', price: 'RWF 12,000', image: '/assets/images/main-dish.png', description: 'Smoky Nigerian jollof rice served with a carefully prepared protein.' },
  { name: 'Full Package Jollof', price: 'RWF 20,000', image: '/assets/menu/fullpackage jollof.png', description: 'Our complete jollof experience with generous accompaniments and protein.' },
  { name: 'White Rice & Stew', price: 'RWF 12,000', image: '/assets/menu/white rice and stew.png', description: 'Steamed white rice paired with a rich, deeply seasoned Nigerian stew.' },
  { name: 'Fried Rice', price: 'RWF 12,000', image: '/assets/images/dish-rotate-3.png', description: 'Colourful Nigerian fried rice served with a carefully prepared protein.' },
  { name: 'Full Package Fried Rice', price: 'RWF 20,000', image: '/assets/menu/full package fried rice.jpg', description: 'A generous fried rice plate completed with accompaniments and protein.' },
  { name: 'Coconut Rice', price: 'RWF 14,000', image: '/assets/menu/coconut rice.png', description: 'Fragrant rice cooked with coconut for a rich and comforting finish.' },
  { name: 'Local Nigerian Rice', price: 'RWF 12,000', image: '/assets/menu/local nigerian rice.png', description: 'Traditional Nigerian rice prepared with familiar spices and homestyle flavour.' },
  { name: 'Ofada Rice & Ofada Sauce', price: 'RWF 18,000', image: '/assets/menu/ofada rice and ofada sauce.png', description: 'Distinctive Ofada rice served with its bold, traditional pepper sauce.' },
  { name: 'Ofada Sauce & White Rice', price: 'RWF 12,000', image: '/assets/menu/ofada sauce and white rice.png', description: 'Steamed white rice accompanied by our rich and aromatic Ofada sauce.' },
  { name: 'White Rice & Vegetable', price: 'RWF 14,000', image: '/assets/menu/white rice and vegetables.png', description: 'Steamed white rice served with a flavourful Nigerian vegetable preparation.' },
  { name: 'Special Fried Rice with Shrimps', price: 'RWF 30,000', image: '/assets/menu/special fried rice with shrimps.png', description: 'Our special fried rice finished with seasoned shrimps for a celebratory plate.' }
];

const createMenuItems = (category, items) => items.map(([name, price, image = '']) => ({
  name,
  price,
  image,
  description: name + ' from our ' + category + ' selection.'
}));

const menuCategories = {
  'Rice & Meats': riceAndMeats,
  Breakfast: createMenuItems('Breakfast', [
    ['Chips & Egg', 'RWF 8,500', '/assets/menu/chips and eggs.png'],
    ['Indomie, Egg & Plantain', 'RWF 8,500', '/assets/menu/indomie eggs plantain.png'],
    ['Special Omelette', 'RWF 8,500', '/assets/menu/special omelette.png'],
    ['Fried Plantain & Egg', 'RWF 9,500', '/assets/menu/freid plantain and egg.png'],
    ['Akara & Custard', 'RWF 10,000', '/assets/menu/akara and custard.png'],
    ['Moi Moi & Custard', 'RWF 10,000', '/assets/menu/moi moi and custard.png'],
    ['Jollof Spaghetti', 'RWF 9,500', '/assets/menu/jollof spaghetti.png?v=20260828-1'],
    ['Jollof Macaroni', 'RWF 9,500', '/assets/menu/jollof macroni.png']
  ]),
  Porridge: createMenuItems('Porridge', [
    ['Rwandan Beans', 'RWF 9,000', '/assets/menu/rwanda beans.png'],
    ['Nigerian Beans', 'RWF 13,000', '/assets/menu/nigerian beans.png'],
    ['Sweet Potatoes', 'RWF 10,000', '/assets/menu/sweet potates.png'],
    ['Irish Potato', 'RWF 10,000', '/assets/menu/irish pototates.png'],
    ['Yam', 'RWF 15,000', '/assets/menu/yam.png'],
    ['Ripe Plantain', 'RWF 10,000', '/assets/menu/ripe plantain.png'],
    ['Unripe Plantain', 'RWF 10,000', '/assets/menu/unripe plantain.png']
  ]),
  Soups: createMenuItems('Soups', [
    ['Egusi', 'RWF 6,000', '/assets/menu/egusi.png'],
    ['Vegetable', 'RWF 6,000', '/assets/menu/vegetables.png'],
    ['Efo Riro', 'RWF 6,000', '/assets/menu/Efo Riro.jpg'],
    ['Okra', 'RWF 6,000', '/assets/menu/Okra.jpg'],
    ['Ogbono', 'RWF 7,000', '/assets/menu/Ogbono.png'],
    ['Bitter Leaf', 'RWF 7,000', '/assets/menu/bitter leaf.png'],
    ['Banga', 'RWF 7,000', '/assets/menu/Banga.jpg'],
    ['Afang', 'RWF 8,000', '/assets/menu/Afang.jpeg'],
    ['Fisherman', 'RWF 10,000', '/assets/menu/fisherman.png'],
    ['White Soup', 'RWF 7,000', '/assets/menu/White Soup.jpg'],
    ['Oha', 'RWF 7,500', '/assets/menu/Oha.jpg'],
    ['Ewedu', 'RWF 6,000', '/assets/menu/Ewedu.png'],
    ['Gbegiri', 'RWF 7,000', '/assets/menu/Gbegiri.jpg'],
    ['Egusi Bitter Leaf', 'RWF 7,000', '/assets/menu/Egusi Bitter Leaf.jpg'],
    ['Groundnuts', 'RWF 6,500', '/assets/menu/Groundnuts.png']
  ]),
  Proteins: createMenuItems('Proteins', [
    ['Goat', 'RWF 5,000', '/assets/menu/goat.png'],
    ['Chicken', 'RWF 4,000', '/assets/menu/chicken.jpg'],
    ['Tilapia Fish', 'RWF 5,000', '/assets/menu/tilapia fish.jpg'],
    ['Titus Fish', 'RWF 5,000', '/assets/menu/titus fish.png?v=20260823-2'],
    ['Beef', 'RWF 4,000', '/assets/menu/beef.png'],
    ['Cow Leg', 'RWF 5,000', '/assets/menu/cow leg.png'],
    ['Assorted Meats', 'RWF 4,000', '/assets/menu/assorted meat.png'],
    ['Dry Catfish', 'RWF 5,000', '/assets/menu/dry catfish.jpg'],
    ['Turkey', 'RWF 6,000', '/assets/menu/turkey.png?v=20260823-2']
  ]),
  Swallow: createMenuItems('Swallow', [
    ['Pando', 'RWF 5,000', '/assets/menu/pando.png'],
    ['Amala', 'RWF 4,000', '/assets/menu/amala.png'],
    ['Fufu', 'RWF 3,000', '/assets/menu/fufu.png'],
    ['Semo', 'RWF 3,000', '/assets/menu/semo.png'],
    ['Garri', 'RWF 4,000', '/assets/menu/garri.png'],
    ['Wheat', 'RWF 3,000', '/assets/menu/wheat.png'],
    ['Oatmeal', 'RWF 5,000', '/assets/menu/oatmeal.png'],
    ['Plantain Flour', 'RWF 4,000', '/assets/menu/amala.jpg'],
    ['Tuwo Shinkefa', 'RWF 3,000', '/assets/menu/Tuwo Shinkefa.png']
  ]),
  'Vegetarian Foods': createMenuItems('Vegetarian Foods', [
    ['Vegetable Sauce & Rice', 'RWF 12,000', '/assets/menu/Vegetable Sauce & Rice.jpg'],
    ['Jollof & Vegetable', 'RWF 12,000', '/assets/menu/Jollof & Vegetable.jpg'],
    ['Special Salad', 'RWF 10,000', '/assets/menu/Salad.jpeg'],
    ['Spaghetti & Vegetables', 'RWF 12,000', '/assets/menu/Spaghetti & Vegetables.jpg'],
    ['Macaroni & Vegetables', 'RWF 12,000', '/assets/menu/Macaroni & Vegetables.jpg'],
    ['Fried Rice', 'RWF 12,000', '/assets/menu/Fried Rice.jpg'],
    ['Coconut Rice', 'RWF 12,000', '/assets/menu/coconut rice.png'],
    ['Veggies Noodles', 'RWF 8,500', '/assets/menu/Veggies Noodles.png'],
    ['Spinach & Rice', 'RWF 12,000', '/assets/menu/spinach rice.png']
  ]),
  Shawarma: createMenuItems('Shawarma', [
    ['Chicken Shawarma', 'RWF 5,000', '/assets/menu/Chicken Shawarma.jpg'],
    ['Beef Shawarma', 'RWF 5,000', '/assets/menu/Beef Shawarma.jpg'],
    ['Shawarma with Sausage', 'RWF 7,000', '/assets/menu/Shawarma with Sausage.png'],
    ['Chicken Brochettes', 'RWF 5,000', '/assets/menu/Chicken Brochettes.jpg'],
    ['Beef Brochettes', 'RWF 5,000', '/assets/menu/Beef Brochettes.jpg'],
    ['Fisherman Brochettes', 'RWF 6,000', '/assets/menu/Fisherman Brochettes.jpg']
  ]),
  'Food in Liters': createMenuItems('Food in Liters', [
    ['1 Liter', 'RWF 20,000', '/assets/menu/1 liter.jpg'],
    ['2 Liters', 'RWF 40,000', '/assets/menu/2 liter.jpeg'],
    ['3 Liters', 'RWF 60,000', '/assets/menu/3 liter.jpeg'],
    ['4 Liters', 'RWF 80,000', '/assets/menu/4 liter.jpeg'],
    ['5 Liters', 'RWF 100,000', '/assets/menu/5 liter.jpeg']
  ]),
  'Rwandan Specials': createMenuItems('Rwandan Specials', [
    ['Matoke & Beef', 'RWF 7,000', '/assets/menu/Matoke & Beef.jpg'],
    ['Chips & Chicken', 'RWF 8,500', '/assets/menu/chips and chicken.png'],
    ['Amashaza Rice & Sauce', 'RWF 9,500', '/assets/menu/Amachaza Rice & Sauce.jpg'],
    ['Rice, Chips & Beans Meat', 'RWF 9,000', '/assets/menu/Rice, Chips & Beans MEA.png'],
    ['Macaroni & Vegetables', 'RWF 6,000', '/assets/menu/Macaroni & Vegetables.jpg'],
    ['Boilo', 'RWF 10,000', '/assets/menu/Buliu.jpg'],
    ['Pilau Rice & Meat', 'RWF 9,500', '/assets/menu/Pilau Rice & Meat.png'],
    ['Imvange', 'RWF 9,000', '/assets/menu/Imvange.png'],
    ['Spinach & Rice Chips', 'RWF 7,500', '/assets/menu/Spinach & Rice Chips.jpg'],
    ['Isombe Swallow Meat', 'RWF 8,500', '/assets/menu/Isombe Swallow meat.jpg']
  ]),
  'Food Platters': [
    {
      name: 'Complete Platter for eight',
      price: 'RWF 80,000',
      image: '/assets/menu/Pilau Platter.jpg',
      description: 'Pilau, chicken or beef, chips, salad and sauce.'
    },
    {
      name: 'Jollof Platter for Six',
      price: 'RWF 55,000',
      image: '/assets/menu/Jollof Platter for Six.jpg',
      description: 'Jollof, chicken or beef or fish, plantain, salad and sauce.'
    },
    {
      name: 'AfriNaija Special Birthday Platter for 10',
      price: 'RWF 300,000',
      image: ['/assets/menu/AfriNaija Special Birthday Platter for 10.jpg', '/assets/menu/small chops.jpg'],
      description: 'Bowl of jollof, pilau and fried rice, fried fish and fried chicken, salad, vegetable chips and plantain, sauce, bottle of unalcholic wine and red wine with cake.'
    }
  ],
  Drinks: createMenuItems('Drinks', [
    ['Soda', 'RWF 2,000', '/assets/menu/soft drink soda.png?v=20260828-1'],
    ['Sparkling Water', 'RWF 1,500', '/assets/menu/sparkling water.png'],
    ['Fresh Juice', 'RWF 3,500', '/assets/menu/fresh juice.png'],
    ['Iyange Juice', 'RWF 4,000', '/assets/menu/iyange juice.png?v=20260828-1'],
    ['Muzig', 'RWF 2,000', '/assets/menu/mutzig.png'],
    ['Heineken', 'RWF 2,500', '/assets/menu/heineken.png'],
    ['Small Water', 'RWF 1,000', '/assets/menu/small water.png'],
    ['Big Water', 'RWF 2,500', '/assets/menu/big water.png'],
    ['Skol', 'RWF 2,000', '/assets/menu/skol.png'],
    ['Guinness', 'RWF 5,000', '/assets/menu/guinness.png'],
    ['Savannah', 'RWF 5,000', '/assets/menu/savanna.png'],
    ['Black Tea', 'RWF 4,000', '/assets/menu/black tea.png'],
    ['Green Tea', 'RWF 4,000', '/assets/menu/greentea.png'],
    ['Coffee Black', 'RWF 5,000', '/assets/menu/coffee black.png'],
    ['Espresso', 'RWF 5,000', '/assets/menu/exprso.png'],
    ['Guiness Maltina', 'RWF 5,0000', '/assets/menu/guiness malt.png']
  ]),
  Grills: createMenuItems('Grills', [
    ['Full Chicken Suya', 'RWF 18,000', '/assets/menu/Full Chicken Suya.png'],
    ['Pepper Chicken Medium', 'RWF 18,000', '/assets/menu/Pepper Chicken Medium.jpg'],
    ['Pepper Chicken Large', 'RWF 30,000', '/assets/menu/Pepper Chicken Large.jpg'],
    ['Grilled Goat', 'RWF 20,000', '/assets/menu/Grilled Goat.jpg'],
    ['Asun', 'RWF 15,000', '/assets/menu/Asun.jpg'],
    ['Grilled Catfish', 'RWF 25,000', '/assets/menu/Grilled Catfish.jpg'],
    ['Grilled Tilapia Medium', 'RWF 18,000', '/assets/menu/Grilled Tilapia Medium.jpg'],
    ['Grilled Tilapia Large', 'RWF 30,000', '/assets/menu/Grilled Tilapia Large.jpg'],
    ['Half Chicken & Chips', 'RWF 15,000', '/assets/menu/Half Chicken & Chips.jpg'],
    ['Peppered Beef', 'RWF 14,000', '/assets/menu/Peppered Beef.jpg'],
    ['Peppered Goat', 'RWF 18,000', '/assets/menu/Peppered Goat.jpg'],
    ['Peppered Pomo', 'RWF 12,000', '/assets/menu/Peppered Pomo.png'],
    ['Beef Suya', 'RWF 13,000', '/assets/menu/Beef Suya.jpg']
  ]),
  'Pepper Soup': createMenuItems('Pepper Soup', [
    ['Full Catfish', 'RWF 18,000', '/assets/menu/catfishpeppersoup.jpg'],
    ['Full Large Catfish', 'RWF 25,000', '/assets/menu/catfish pepper soup.jpg'],
    ['Tilapia Fish', 'RWF 15,000', '/assets/menu/tilapia pepper soup.jpg'],
    ['Chicken', 'RWF 10,000', '/assets/menu/chicken pepper soup.jpg'],
    ['Goat', 'RWF 18,000', '/assets/menu/goat pepper soup.jpg'],
    ['Beef', 'RWF 15,000', '/assets/menu/assorted beef pepper soup.jpg'],
    ['Assorted Cow Meat', 'RWF 15,000', '/assets/menu/assorted cow meat.jpg'],
    ['Assorted Goat Meat', 'RWF 15,000', '/assets/menu/Assorted Goat Meat soup.jpg']
  ]),
  'Special Order': createMenuItems('Special Order', [
    ['Isi Ewu', 'RWF 16,000', '/assets/menu/Ise Ewu.png'],
    ['Nkwobi', 'RWF 14,000', '/assets/menu/Nkwobi.png'],
    ['Abacha', 'RWF 10,000', '/assets/menu/Abacha.png'],
    ['Waakye', 'RWF 15,000', '/assets/menu/Waakye.jpg']
  ])
};

function setupMenuPage() {
  const grid = document.querySelector('.menu-food-grid');
  const categoryStrip = document.querySelector('.menu-category-strip');
  const activeCategoryTitle = document.querySelector('.menu-active-category');
  const itemCount = document.querySelector('.menu-item-count');
  const orderProxy = document.querySelector('.menu-order-proxy');
  const categoryButtons = [...document.querySelectorAll('[data-category]')];
  const gsap = window.gsap;
  if (!grid || !categoryStrip || !activeCategoryTitle || !itemCount || !orderProxy || !categoryButtons.length) return;

  let activeCategory = 'Rice & Meats';
  let selectedMeal = menuCategories[activeCategory][0];
  let activeDrinkIndex = 0;

  const updateCategoryButtons = () => {
    categoryButtons.forEach(button => {
      button.setAttribute('aria-current', String(button.dataset.category === activeCategory));
    });
  };

  const createFoodCard = (meal, index) => {
    const card = document.createElement('article');
    card.className = 'menu-food-card';

    const media = document.createElement('div');
    media.className = 'menu-food-media';
    if (meal.image) {
      const images = Array.isArray(meal.image) ? meal.image : [meal.image];
      const imgContainer = document.createElement('div');
      imgContainer.style.display = 'flex';
      imgContainer.style.width = '100%';
      imgContainer.style.height = '96%';
      imgContainer.style.alignItems = 'center';
      imgContainer.style.justifyContent = 'center';
      imgContainer.style.gap = '8px';
      imgContainer.style.padding = '0 8px';
      imgContainer.style.position = 'relative';
      imgContainer.style.zIndex = '1';

      images.forEach((src) => {
        const image = document.createElement('img');
        image.className = 'menu-food-image';
        image.src = src;
        image.alt = meal.name + ' at Afrinaija Pot';
        image.loading = index < 4 ? 'eager' : 'lazy';
        image.decoding = 'async';
        if (images.length > 1) {
          image.style.width = 'calc(50% - 4px)';
          image.style.height = '100%';
          image.style.objectFit = 'cover';
          image.style.borderRadius = '12px';
        }
        image.addEventListener('error', () => {
          image.remove();
          if (imgContainer.children.length === 0) media.classList.add('is-empty');
        }, { once: true });
        imgContainer.append(image);
      });
      media.append(imgContainer);
    } else {
      media.classList.add('is-empty');
    }

    const price = document.createElement('p');
    price.className = 'menu-food-price';
    price.textContent = meal.price;
    media.append(price);

    const information = document.createElement('div');
    information.className = 'menu-food-information';

    const row = document.createElement('div');
    row.className = 'menu-food-name-row';

    const name = document.createElement('h3');
    name.textContent = meal.name;

    const addButton = document.createElement('button');
    addButton.type = 'button';
    addButton.className = 'menu-card-order';
    addButton.textContent = 'Add to order';
    addButton.setAttribute('aria-label', 'Add ' + meal.name + ' to My Order');
    addButton.addEventListener('click', () => {
      selectedMeal = meal;
      orderProxy.click();
    });

    const details = document.createElement('div');
    details.className = 'menu-food-details';
    const category = document.createElement('span');
    category.textContent = activeCategory;
    details.append(category);

    row.append(name, addButton);
    information.append(row);

    if (meal.description) {
      const desc = document.createElement('p');
      desc.className = 'menu-food-description';
      desc.textContent = meal.description;
      desc.style.margin = '10px 0 0';
      desc.style.fontSize = 'clamp(13px, 1.2vw, 15px)';
      desc.style.color = '#455648';
      desc.style.lineHeight = '1.4';
      information.append(desc);
    }

    information.append(details);
    card.append(media, information);
    return card;
  };

  const createDrinksShowcase = drinks => {
    const showcase = document.createElement('section');
    showcase.className = 'drinks-showcase';
    showcase.setAttribute('aria-label', 'Drinks selection');

    const main = document.createElement('div');
    main.className = 'drinks-showcase-main';

    const copy = document.createElement('header');
    copy.className = 'drinks-showcase-copy';
    const eyebrow = document.createElement('p');
    eyebrow.className = 'drinks-showcase-eyebrow';
    eyebrow.textContent = 'Afrinaija refreshments';
    const name = document.createElement('h3');
    name.className = 'drinks-showcase-name';
    const description = document.createElement('p');
    description.className = 'drinks-showcase-description';
    copy.append(eyebrow, name, description);

    const product = document.createElement('div');
    product.className = 'drinks-showcase-product';
    const previousButton = document.createElement('button');
    previousButton.type = 'button';
    previousButton.className = 'drinks-showcase-arrow drinks-showcase-previous';
    previousButton.setAttribute('aria-label', 'Previous drink');
    previousButton.innerHTML = '<svg viewBox="0 0 28 20" aria-hidden="true"><path d="M26 10H3M10 3l-7 7 7 7" /></svg>';
    const nextButton = document.createElement('button');
    nextButton.type = 'button';
    nextButton.className = 'drinks-showcase-arrow drinks-showcase-next';
    nextButton.setAttribute('aria-label', 'Next drink');
    nextButton.innerHTML = '<svg viewBox="0 0 28 20" aria-hidden="true"><path d="M2 10h23M18 3l7 7-7 7" /></svg>';
    const image = document.createElement('img');
    image.className = 'drinks-showcase-image';
    image.decoding = 'async';
    image.addEventListener('error', () => {
      image.hidden = true;
      product.classList.add('is-empty');
    });
    product.append(previousButton, image, nextButton);

    const meta = document.createElement('div');
    meta.className = 'drinks-showcase-meta';
    const price = document.createElement('p');
    price.className = 'drinks-showcase-price';
    const addButton = document.createElement('button');
    addButton.type = 'button';
    addButton.className = 'drinks-showcase-order';
    addButton.textContent = 'Add to order';
    addButton.addEventListener('click', () => orderProxy.click());
    meta.append(price, addButton);

    main.append(copy, product, meta);

    const selector = document.createElement('div');
    selector.className = 'drinks-showcase-selector';
    selector.setAttribute('role', 'tablist');
    selector.setAttribute('aria-label', 'Choose a drink');
    const selectorButtons = drinks.map((drink, index) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'drinks-showcase-option';
      button.dataset.drinkIndex = String(index);
      button.setAttribute('role', 'tab');
      button.textContent = drink.name;
      selector.append(button);
      return button;
    });

    let switchTimeline;
    const applyDrink = index => {
      const drink = drinks[index];
      activeDrinkIndex = index;
      selectedMeal = drink;
      name.textContent = drink.name;
      description.textContent = drink.description;
      price.textContent = drink.price;
      addButton.setAttribute('aria-label', 'Add ' + drink.name + ' to My Order');
      product.classList.toggle('is-empty', !drink.image);
      if (drink.image) {
        image.src = drink.image;
        image.alt = drink.name + ' at Afrinaija Pot';
        image.hidden = false;
      } else {
        image.removeAttribute('src');
        image.alt = '';
        image.hidden = true;
      }
      selectorButtons.forEach((button, buttonIndex) => {
        const isActive = buttonIndex === index;
        button.setAttribute('aria-selected', String(isActive));
        button.setAttribute('tabindex', isActive ? '0' : '-1');
      });
    };

    const selectDrink = (index, directionHint = 0) => {
      if (index === activeDrinkIndex || !drinks[index]) return;
      const direction = directionHint || (index > activeDrinkIndex ? 1 : -1);
      if (!gsap || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        applyDrink(index);
        return;
      }

      switchTimeline?.kill();
      gsap.killTweensOf([image, name, description, price]);
      switchTimeline = gsap.timeline({ defaults: { overwrite: true } })
        .to([image, name, description, price], {
          autoAlpha: 0,
          x: -18 * direction,
          scale: .965,
          duration: .16,
          ease: 'power2.in',
          stagger: .012
        })
        .add(() => applyDrink(index))
        .fromTo([image, name, description, price], {
          autoAlpha: 0,
          x: 22 * direction,
          scale: .96
        }, {
          autoAlpha: 1,
          x: 0,
          scale: 1,
          duration: .28,
          ease: 'power2.out',
          stagger: .018,
          clearProps: 'transform,opacity,visibility'
        });
    };

    selectorButtons.forEach((button, index) => {
      button.addEventListener('click', () => selectDrink(index));
    });

    previousButton.addEventListener('click', () => {
      selectDrink((activeDrinkIndex - 1 + drinks.length) % drinks.length, -1);
    });
    nextButton.addEventListener('click', () => {
      selectDrink((activeDrinkIndex + 1) % drinks.length, 1);
    });

    let selectorPointerId = null;
    let selectorPointerStart = 0;
    let selectorDragged = false;
    selector.addEventListener('pointerdown', event => {
      selectorPointerId = event.pointerId;
      selectorPointerStart = event.clientX;
      selectorDragged = false;
    }, { passive: true });
    selector.addEventListener('pointermove', event => {
      if (event.pointerId !== selectorPointerId) return;
      if (Math.abs(event.clientX - selectorPointerStart) > 6) selectorDragged = true;
    }, { passive: true });
    const releaseSelectorPointer = event => {
      if (event.pointerId !== selectorPointerId) return;
      selectorPointerId = null;
      if (event.type === 'pointercancel') selectorDragged = false;
      else if (selectorDragged) requestAnimationFrame(() => { selectorDragged = false; });
    };
    selector.addEventListener('pointerup', releaseSelectorPointer);
    selector.addEventListener('pointercancel', releaseSelectorPointer);
    selector.addEventListener('click', event => {
      if (!selectorDragged) return;
      event.preventDefault();
      event.stopPropagation();
      selectorDragged = false;
    }, true);

    activeDrinkIndex = Math.min(activeDrinkIndex, drinks.length - 1);
    applyDrink(activeDrinkIndex);
    showcase.append(main, selector);
    return showcase;
  };

  const animateCards = () => {
    if (!gsap || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const cards = [...grid.children];
    gsap.killTweensOf(cards);
    gsap.fromTo(cards,
      { autoAlpha: 0, y: 16, scale: .965 },
      { autoAlpha: 1, y: 0, scale: 1, duration: .34, stagger: .035, ease: 'power2.out', overwrite: true, clearProps: 'transform,opacity,visibility' }
    );
  };

  const renderCards = (animate = true) => {
    const meals = menuCategories[activeCategory];
    if (activeCategory === 'Drinks') {
      grid.classList.add('is-drinks-showcase');
      grid.replaceChildren(createDrinksShowcase(meals));
      activeCategoryTitle.textContent = activeCategory;
      itemCount.textContent = meals.length + (meals.length === 1 ? ' drink' : ' drinks');
      if (animate) animateCards();
      return;
    }

    grid.classList.remove('is-drinks-showcase');
    const fragment = document.createDocumentFragment();
    meals.forEach((meal, index) => fragment.append(createFoodCard(meal, index)));
    grid.replaceChildren(fragment);
    activeCategoryTitle.textContent = activeCategory;
    itemCount.textContent = meals.length + (meals.length === 1 ? ' dish' : ' dishes');
    if (animate) animateCards();
  };

  const selectCategory = button => {
    const category = button.dataset.category;
    if (!menuCategories[category]) return;
    if (category !== activeCategory) {
      activeCategory = category;
      selectedMeal = menuCategories[activeCategory][0];
      updateCategoryButtons();
      renderCards();
    }

    const centeredLeft = button.offsetLeft - (categoryStrip.clientWidth - button.offsetWidth) / 2;
    categoryStrip.scrollTo({ left: Math.max(0, centeredLeft), behavior: 'smooth' });
  };

  categoryButtons.forEach(button => {
    button.addEventListener('click', () => selectCategory(button));
  });

  let pointerId = null;
  let pointerStart = 0;
  let scrollStart = 0;
  let dragged = false;
  categoryStrip.addEventListener('pointerdown', event => {
    if (event.pointerType !== 'mouse' || event.button !== 0) return;
    pointerId = event.pointerId;
    pointerStart = event.clientX;
    scrollStart = categoryStrip.scrollLeft;
    dragged = false;
  });
  categoryStrip.addEventListener('pointermove', event => {
    if (event.pointerId !== pointerId) return;
    const distance = event.clientX - pointerStart;
    if (Math.abs(distance) > 5 && !dragged) {
      dragged = true;
      categoryStrip.setPointerCapture(pointerId);
    }
    categoryStrip.scrollLeft = scrollStart - distance;
  });
  const releasePointer = event => {
    if (event.pointerId !== pointerId) return;
    if (categoryStrip.hasPointerCapture(pointerId)) categoryStrip.releasePointerCapture(pointerId);
    pointerId = null;
    if (event.type === 'pointercancel') dragged = false;
    else if (dragged) requestAnimationFrame(() => { dragged = false; });
  };
  categoryStrip.addEventListener('pointerup', releasePointer);
  categoryStrip.addEventListener('pointercancel', releasePointer);
  categoryStrip.addEventListener('click', event => {
    if (!dragged) return;
    event.preventDefault();
    event.stopPropagation();
    dragged = false;
  }, true);

  updateCategoryButtons();
  renderCards(false);
  setupMyOrder({
    getCurrentSelection: () => ({
      name: selectedMeal.name,
      category: activeCategory,
      price: selectedMeal.price
    })
  });
}

function setupMenuEntrance() {
  const gsap = window.gsap;
  if (!gsap || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const header = document.querySelector('.menu-page-header');
  const heading = document.querySelector('.menu-catalogue-heading');
  const categories = document.querySelector('.menu-category-strip');
  const summary = document.querySelector('.menu-category-summary');
  const cards = [...document.querySelectorAll('.menu-food-card')];
  const opening = [header, heading, categories, summary].filter(Boolean);

  gsap.killTweensOf([...opening, ...cards]);
  gsap.timeline({ defaults: { ease: 'power2.out' } })
    .fromTo(header, { autoAlpha: 0, y: -14 }, { autoAlpha: 1, y: 0, duration: .36 })
    .fromTo(heading, { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: .4 }, '<.04')
    .fromTo(categories, { autoAlpha: 0, x: 18 }, { autoAlpha: 1, x: 0, duration: .36 }, '<.06')
    .fromTo(summary, { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: .3 }, '<.04')
    .fromTo(cards,
      { autoAlpha: 0, y: 16, scale: .965 },
      { autoAlpha: 1, y: 0, scale: 1, duration: .34, stagger: .035, clearProps: 'transform,opacity,visibility' },
      '<.02'
    );
}

function setupFloatingMenuControls() {
  const header = document.querySelector('.menu-page-header');
  const controls = document.querySelector('.menu-scroll-controls');
  const floatingCart = document.querySelector('.menu-scroll-cart');
  const originalCart = document.querySelector('.my-order-floating');
  const originalBadge = document.querySelector('.my-order-badge');
  const floatingBadge = document.querySelector('.menu-scroll-order-badge');
  if (!header || !controls || !floatingCart || !originalCart || !originalBadge || !floatingBadge) return;

  const syncBadge = () => {
    floatingBadge.textContent = originalBadge.textContent;
    floatingBadge.hidden = originalBadge.hidden;
    floatingBadge.setAttribute('aria-label', originalBadge.getAttribute('aria-label') || '0 selected items');
  };

  const setControlsVisible = isVisible => {
    controls.classList.toggle('is-visible', isVisible);
    controls.setAttribute('aria-hidden', String(!isVisible));
  };

  floatingCart.addEventListener('click', () => originalCart.click());
  new MutationObserver(syncBadge).observe(originalBadge, {
    attributes: true,
    attributeFilter: ['hidden', 'aria-label'],
    childList: true,
    characterData: true,
    subtree: true
  });
  syncBadge();

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(([entry]) => {
      setControlsVisible(!entry.isIntersecting);
    }, { threshold: 0.01 });
    observer.observe(header);
  } else {
    let ticking = false;
    const update = () => {
      const bounds = header.getBoundingClientRect();
      setControlsVisible(bounds.bottom <= 0 || bounds.top >= window.innerHeight);
      ticking = false;
    };
    window.addEventListener('scroll', () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    }, { passive: true });
    update();
  }
}

setupMenuPage();
setupMenuEntrance();
setupFloatingMenuControls();
