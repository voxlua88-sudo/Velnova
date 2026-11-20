(() => {
  const esc = value => String(value).replace(/[&<>"]/g, c => ({'&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;'}[c]));
  const slug = new URLSearchParams(location.search).get('category');
  const category = CONTENT.products.find(item => item.slug === slug);
  const title = document.querySelector('[data-category-title]');
  const description = document.querySelector('[data-category-description]');
  const type = document.querySelector('[data-category-type]');
  const products = document.querySelector('[data-category-products]');

  if (!category) {
    title.textContent = 'Category not found';
    description.textContent = 'Choose a category from the menu to browse our products.';
    type.textContent = 'VELNOVA catalogue';
    return;
  }

  document.title = `VELNOVA – ${category.name}`;
  title.textContent = category.name;
  description.textContent = category.desc;
  type.textContent = category.category;
  const ratingNote = document.createElement('p');
  ratingNote.className = 'note rating-note';
  ratingNote.textContent = 'Illustrative ratings for preview only.';
  products.before(ratingNote);
  products.innerHTML = category.items.map(item => {
    const label = item.name.replace('VELNOVA ', '').toUpperCase();
    return `<article class="category-product">
      <div class="category-product-art">
        <svg viewBox="0 0 180 210" role="img" aria-label="${esc(item.name)}">
          <rect x="67" y="24" width="46" height="18" rx="6" fill="${esc(item.accent)}" stroke="#ffffff" stroke-opacity=".8"/>
          <rect x="57" y="38" width="66" height="145" rx="18" fill="#f2f6f4" stroke="${esc(item.accent)}" stroke-width="3"/>
          <rect x="62" y="48" width="10" height="125" rx="5" fill="${esc(item.accent)}" fill-opacity=".22"/>
          <rect x="67" y="76" width="46" height="70" rx="7" fill="#ffffff" stroke="${esc(item.accent)}" stroke-opacity=".4"/>
          <text x="90" y="96" text-anchor="middle" fill="#123130" font-family="Manrope,sans-serif" font-size="10" font-weight="800">VELNOVA</text>
          <text x="90" y="116" text-anchor="middle" fill="#123130" font-family="Manrope,sans-serif" font-size="8" font-weight="700">${esc(label)}</text>
          <path d="M67 128h46" stroke="${esc(item.accent)}" stroke-opacity=".3"/>
        </svg>
        <span>${esc(item.scent)}</span>
      </div>
      <div class="category-product-info">
        <p class="kick">${esc(category.name)}</p>
        <h2>${esc(item.name)}</h2>
        <p>${esc(item.desc)}</p>
        <div class="rating" aria-label="${esc(item.rating)} out of 5 stars"><span aria-hidden="true">★★★★★</span><strong>${esc(item.rating)}</strong><small>${esc(item.reviews)} reviews</small></div>
        <strong class="product-price">${VelnovaCart.formatMoney(item.price)} <small>each</small></strong>
        <div class="product-actions">
          <button type="button" class="btn add-to-cart" data-add-to-cart="${esc(item.id)}">Add to Cart</button>
          <a class="btn outl product-quote" href="quote.html?product=${encodeURIComponent(item.id)}">Request a Quote</a>
        </div>
      </div>
    </article>`;
  }).join('');
})();
