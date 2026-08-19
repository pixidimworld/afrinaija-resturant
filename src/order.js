const STORAGE_KEY = 'afrinaija_order';
const WHATSAPP_NUMBER = '250782647630';

const parsePrice = price => Number(String(price).replace(/[^\d]/g, '')) || 0;
const formatRwf = value => 'RWF ' + Number(value).toLocaleString('en-US');

const loadOrder = () => {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    if (!Array.isArray(stored)) return [];
    return stored
      .filter(item => item && item.name && item.category && Number(item.unitPrice) > 0)
      .map(item => ({
        name: String(item.name),
        category: String(item.category),
        price: formatRwf(Number(item.unitPrice)),
        unitPrice: Number(item.unitPrice),
        quantity: Math.max(1, Number.parseInt(item.quantity, 10) || 1)
      }));
  } catch {
    return [];
  }
};

export function setupMyOrder({ getCurrentSelection }) {
  const orderButton = document.querySelector('.menu-order-button');
  const floatingButton = document.querySelector('.my-order-floating');
  const badge = document.querySelector('.my-order-badge');
  const confirmationOverlay = document.querySelector('.order-confirmation-overlay');
  const confirmationItem = document.querySelector('.order-confirmation-item');
  const orderOverlay = document.querySelector('.my-order-overlay');
  const orderItems = document.querySelector('.my-order-items');
  const emptyMessage = document.querySelector('.my-order-empty');
  const totalElement = document.querySelector('.my-order-total strong');
  const proceedButton = document.querySelector('.proceed-whatsapp');
  const viewOrderButton = document.querySelector('[data-view-order]');
  const continueConfirmation = document.querySelector('[data-continue-confirmation]');
  const continueOrder = document.querySelector('[data-continue-order]');
  const confirmationClosers = [...document.querySelectorAll('[data-close-confirmation]')];
  const orderClosers = [...document.querySelectorAll('[data-close-order]')];

  if (!orderButton || !floatingButton || !badge || !confirmationOverlay || !confirmationItem || !orderOverlay || !orderItems || !emptyMessage || !totalElement || !proceedButton || !viewOrderButton || !continueConfirmation || !continueOrder || typeof getCurrentSelection !== 'function') return;

  let order = loadOrder();

  const persist = () => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(order));
    } catch {
      // The order remains available for this page even if browser storage is unavailable.
    }
  };

  const totalQuantity = () => order.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = () => order.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);

  const setConfirmationOpen = isOpen => {
    confirmationOverlay.classList.toggle('is-open', isOpen);
    confirmationOverlay.setAttribute('aria-hidden', String(!isOpen));
  };

  const setOrderOpen = isOpen => {
    orderOverlay.classList.toggle('is-open', isOpen);
    orderOverlay.setAttribute('aria-hidden', String(!isOpen));
  };

  const createQuantityButton = (label, action, index, disabled = false) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'my-order-quantity-button';
    button.dataset.orderAction = action;
    button.dataset.orderIndex = String(index);
    button.setAttribute('aria-label', label);
    button.textContent = action === 'increase' ? '+' : '−';
    button.disabled = disabled;
    return button;
  };

  const renderOrder = () => {
    const quantity = totalQuantity();
    badge.textContent = String(quantity);
    badge.hidden = quantity === 0;
    badge.setAttribute('aria-label', quantity + (quantity === 1 ? ' selected item' : ' selected items'));

    orderItems.replaceChildren();
    order.forEach((item, index) => {
      const article = document.createElement('article');
      article.className = 'my-order-item';

      const copy = document.createElement('div');
      copy.className = 'my-order-item-copy';

      const category = document.createElement('p');
      category.className = 'my-order-item-category';
      category.textContent = item.category;

      const name = document.createElement('h3');
      name.textContent = item.name;

      const price = document.createElement('p');
      price.className = 'my-order-item-price';
      price.textContent = item.price + ' each';

      copy.append(category, name, price);

      const controls = document.createElement('div');
      controls.className = 'my-order-item-controls';

      const quantityControls = document.createElement('div');
      quantityControls.className = 'my-order-quantity';
      const decrease = createQuantityButton('Decrease ' + item.name + ' quantity', 'decrease', index, item.quantity <= 1);
      const quantityValue = document.createElement('span');
      quantityValue.textContent = String(item.quantity);
      quantityValue.setAttribute('aria-label', 'Quantity ' + item.quantity);
      const increase = createQuantityButton('Increase ' + item.name + ' quantity', 'increase', index);
      quantityControls.append(decrease, quantityValue, increase);

      const remove = document.createElement('button');
      remove.type = 'button';
      remove.className = 'my-order-remove';
      remove.dataset.orderAction = 'remove';
      remove.dataset.orderIndex = String(index);
      remove.textContent = 'Remove';

      controls.append(quantityControls, remove);
      article.append(copy, controls);
      orderItems.append(article);
    });

    const isEmpty = order.length === 0;
    emptyMessage.hidden = !isEmpty;
    totalElement.textContent = formatRwf(totalPrice());
    proceedButton.disabled = isEmpty;
  };

  const updateOrder = () => {
    persist();
    renderOrder();
  };

  const addCurrentMeal = () => {
    const selection = getCurrentSelection();
    if (!selection || !selection.name || !selection.category || !selection.price) return;

    const unitPrice = parsePrice(selection.price);
    const existing = order.find(item => item.name === selection.name && item.category === selection.category && item.unitPrice === unitPrice);
    if (existing) {
      existing.quantity += 1;
    } else {
      order.push({
        name: selection.name,
        category: selection.category,
        price: selection.price,
        unitPrice,
        quantity: 1
      });
    }

    confirmationItem.textContent = selection.name + ' — ' + selection.category;
    updateOrder();
    setConfirmationOpen(true);
  };

  orderButton.addEventListener('click', addCurrentMeal);
  floatingButton.addEventListener('click', () => {
    renderOrder();
    setOrderOpen(true);
  });

  confirmationClosers.forEach(button => button.addEventListener('click', () => setConfirmationOpen(false)));
  continueConfirmation.addEventListener('click', () => setConfirmationOpen(false));
  viewOrderButton.addEventListener('click', () => {
    setConfirmationOpen(false);
    renderOrder();
    setOrderOpen(true);
  });

  orderClosers.forEach(button => button.addEventListener('click', () => setOrderOpen(false)));
  continueOrder.addEventListener('click', () => setOrderOpen(false));

  orderItems.addEventListener('click', event => {
    const button = event.target.closest('[data-order-action]');
    if (!button) return;
    const index = Number.parseInt(button.dataset.orderIndex, 10);
    const item = order[index];
    if (!item) return;

    if (button.dataset.orderAction === 'increase') item.quantity += 1;
    if (button.dataset.orderAction === 'decrease') item.quantity = Math.max(1, item.quantity - 1);
    if (button.dataset.orderAction === 'remove') order.splice(index, 1);
    updateOrder();
  });

  proceedButton.addEventListener('click', () => {
    if (!order.length) return;

    const lines = [
      'Hello AfriNaija Pots, I would like to place the following order:',
      ''
    ];

    order.forEach((item, index) => {
      lines.push((index + 1) + '. ' + item.name + ' — ' + item.category);
      lines.push('Qty: ' + item.quantity + ' — ' + formatRwf(item.unitPrice * item.quantity));
      lines.push('');
    });

    lines.push('Total: ' + formatRwf(totalPrice()));
    lines.push('');
    lines.push('Please let me know the next steps for confirming my order and payment. Thank you.');

    const url = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(lines.join('\n'));
    window.open(url, '_blank', 'noopener,noreferrer');
  });

  document.addEventListener('keydown', event => {
    if (event.key !== 'Escape') return;
    setConfirmationOpen(false);
    setOrderOpen(false);
  });

  renderOrder();
}
