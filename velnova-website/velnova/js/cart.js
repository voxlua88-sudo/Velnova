(() => {
  const KEY = 'velnova-cart-v1';
  const products = new Map(CONTENT.products.flatMap(category =>
    category.items.map(item => [item.id, { ...item, category: category.name }])
  ));

  function readCart() {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    try {
      const entries = JSON.parse(raw);
      if (!Array.isArray(entries)) throw new TypeError('Cart data must be an array.');
      return entries.filter(entry =>
        entry &&
        products.has(entry.id) &&
        Number.isSafeInteger(entry.quantity) &&
        entry.quantity > 0
      );
    } catch (error) {
      console.error('Unable to read the saved Velnova cart.', error);
      return [];
    }
  }

  function saveCart(entries) {
    localStorage.setItem(KEY, JSON.stringify(entries));
    window.dispatchEvent(new Event('velnova:cartchange'));
  }

  function getItems() {
    return readCart().map(({ id, quantity }) => {
      const product = products.get(id);
      return { ...product, id, quantity, lineTotal: product.price * quantity };
    });
  }

  function add(id) {
    if (!products.has(id)) throw new Error(`Unknown Velnova product: ${id}`);
    const entries = readCart();
    const existing = entries.find(entry => entry.id === id);
    if (existing) existing.quantity += 1;
    else entries.push({ id, quantity: 1 });
    saveCart(entries);
  }

  function setQuantity(id, quantity) {
    if (!products.has(id)) throw new Error(`Unknown Velnova product: ${id}`);
    if (!Number.isSafeInteger(quantity) || quantity < 1) {
      throw new RangeError('Cart quantity must be a positive whole number.');
    }
    const entries = readCart();
    const existing = entries.find(entry => entry.id === id);
    if (!existing) return;
    existing.quantity = quantity;
    saveCart(entries);
  }

  function remove(id) {
    saveCart(readCart().filter(entry => entry.id !== id));
  }

  function formatMoney(amount) {
    return `RM ${new Intl.NumberFormat('en-MY', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    }).format(amount)}`;
  }

  function updateCount() {
    const count = getItems().reduce((sum, item) => sum + item.quantity, 0);
    document.querySelectorAll('.cart-count').forEach(element => {
      element.textContent = String(count);
    });
    document.querySelectorAll('.cart-nav').forEach(link => {
      link.setAttribute('aria-label', `Shopping cart, ${count} ${count === 1 ? 'item' : 'items'}`);
    });
  }

  window.VelnovaCart = Object.freeze({ add, formatMoney, getItems, remove, setQuantity });
  updateCount();
  window.addEventListener('storage', updateCount);
  window.addEventListener('velnova:cartchange', updateCount);

  document.addEventListener('click', event => {
    const button = event.target.closest('[data-add-to-cart]');
    if (!button) return;
    try {
      add(button.dataset.addToCart);
      const originalLabel = button.textContent;
      button.textContent = 'Added';
      window.setTimeout(() => {
        if (button.isConnected) button.textContent = originalLabel;
      }, 1400);
    } catch (error) {
      console.error('Unable to add this product to the cart.', error);
      button.textContent = 'Could not add';
    }
  });
})();
