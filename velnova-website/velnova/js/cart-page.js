(() => {
  const itemsContainer = document.querySelector('#cart-items');
  const totalElement = document.querySelector('#cart-total');
  const status = document.querySelector('#cart-status');
  const orderButton = document.querySelector('#whatsapp-order');
  const escapeHtml = value => String(value).replace(/[&<>"']/g, character => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[character]));

  function render() {
    const items = VelnovaCart.getItems();
    const count = items.reduce((sum, item) => sum + item.quantity, 0);
    const total = items.reduce((sum, item) => sum + item.lineTotal, 0);
    totalElement.textContent = VelnovaCart.formatMoney(total);
    orderButton.disabled = items.length === 0;
    itemsContainer.innerHTML = items.length
      ? items.map(item => `<article class="cart-item">
          <div class="cart-item-copy">
            <p class="kick">${escapeHtml(item.category)}</p>
            <h2>${escapeHtml(item.name)}</h2>
            <p class="cart-unit-price">${VelnovaCart.formatMoney(item.price)} each</p>
          </div>
          <label class="cart-quantity">Quantity
            <input type="number" min="1" step="1" value="${item.quantity}" inputmode="numeric" data-cart-quantity="${escapeHtml(item.id)}">
          </label>
          <strong class="cart-line-total">${VelnovaCart.formatMoney(item.lineTotal)}</strong>
          <button type="button" class="cart-remove" data-remove-from-cart="${escapeHtml(item.id)}" aria-label="Remove ${escapeHtml(item.name)}">Remove</button>
        </article>`).join('')
      : '<p class="empty-cart">Your cart is empty. Browse the catalogue to add products.</p>';
    status.textContent = items.length ? `${count} ${count === 1 ? 'item' : 'items'} in your cart.` : '';
  }

  itemsContainer.addEventListener('change', event => {
    const input = event.target.closest('[data-cart-quantity]');
    if (!input) return;
    const quantity = Number(input.value);
    if (!Number.isSafeInteger(quantity) || quantity < 1) {
      status.textContent = 'Enter a quantity of at least 1.';
      render();
      return;
    }
    VelnovaCart.setQuantity(input.dataset.cartQuantity, quantity);
    render();
  });

  itemsContainer.addEventListener('click', event => {
    const button = event.target.closest('[data-remove-from-cart]');
    if (!button) return;
    VelnovaCart.remove(button.dataset.removeFromCart);
    render();
  });

  orderButton.addEventListener('click', () => {
    const items = VelnovaCart.getItems();
    if (!items.length) return;

    const phone = String(CONTENT.contact.whatsappNumber || '').replace(/\D/g, '');
    if (!/^\d{8,15}$/.test(phone)) {
      status.textContent = 'WhatsApp ordering is not configured. Please contact VELNOVA.';
      return;
    }

    const total = items.reduce((sum, item) => sum + item.lineTotal, 0);
    const lines = items.map(item =>
      `- ${item.name} x ${item.quantity} = ${VelnovaCart.formatMoney(item.lineTotal)}`
    );
    const message = [
      'Hello VELNOVA, I would like to place an order:',
      '',
      ...lines,
      '',
      `Products subtotal: ${VelnovaCart.formatMoney(total)}`,
      'Please confirm availability and delivery charges.'
    ].join('\n');
    window.location.href = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  });

  window.addEventListener('velnova:cartchange', render);
  render();
})();
