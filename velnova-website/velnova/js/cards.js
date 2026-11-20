/* Renders the company, catalogue, process and industry cards from js/config/content.js */
(() => {
  const C = CONTENT, $ = s => document.querySelector(s);
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;' }[c]));
  const card = (t, d) => `<div class="card"><h4>${esc(t)}</h4><p>${esc(d)}</p></div>`;

  $('#c-title').textContent = C.company.title;
  $('#c-lead').textContent = C.company.lead;
  $('#c-about').innerHTML = C.company.about.map(p => `<p>${esc(p)}</p>`).join('');
  $('#c-facts').innerHTML = C.company.facts.map(([k, v]) => `<div><span>${esc(k)}</span><b>${esc(v)}</b></div>`).join('');
  $('#pillars').innerHTML = C.pillars.map(p => card(p.t, p.d)).join('');
  $('#company-spotlight').innerHTML = `
    <img class="company-spotlight-logo" src="assets/CompanyLogo.png" alt="VELNOVA company logo">
    <p class="kick">About VELNOVA</p>
    <h3>${esc(C.company.title)}</h3>
    <p>${esc(C.company.lead)}</p>
    <p class="company-spotlight-meta">${C.products.map(category => esc(category.category)).join(' · ')}</p>`;
  $('#showcase-ranges').innerHTML = C.products.map(category =>
    `<a class="showcase-range" href="category.html?category=${encodeURIComponent(category.slug)}">
      <span>${esc(category.category)}</span><strong>${esc(category.name)}</strong><b aria-hidden="true">→</b>
    </a>`
  ).join('');
  $('#steps').innerHTML = C.steps.map((p, i) =>
    `<article class="card process-card">
      <span class="process-step" aria-hidden="true">${i + 1}</span>
      ${i < 2 ? '<span class="process-arrow process-arrow-right" aria-hidden="true">→</span>' : ''}
      ${i === 1 ? '<span class="process-arrow process-arrow-down" aria-hidden="true">↓</span>' : ''}
      ${i < C.steps.length - 1 ? '<span class="process-arrow-mobile" aria-hidden="true">↓</span>' : ''}
      <h4>${esc(p.t)}</h4><p>${esc(p.d)}</p>
    </article>`
  ).join('');
  $('#inds').innerHTML = C.industries.map(p => card(p.t, p.d)).join('');

  const categoryIcon = c => `<svg viewBox="0 0 48 48" width="42" height="42" aria-hidden="true"><path d="M18 12h12l3 6v22H15V18z" fill="none" stroke="currentColor" stroke-width="1.7"/><rect x="20" y="7" width="8" height="6" rx="2" fill="${c}"/><path d="M17 29h14v8H17z" fill="${c}" fill-opacity=".55"/></svg>`;

  $('#products').innerHTML = C.products.map((p, i) =>
    `<article class="card category-card" tabindex="0" role="button" data-c="${i}" aria-label="Open ${esc(p.name)} category">
      ${categoryIcon(p.accent)}<small>${esc(p.category)}</small><h4>${esc(p.name)}</h4><p>${esc(p.desc)}</p>
      <div class="category-meta"><span>${p.items.length} ${p.items.length === 1 ? 'product' : 'products'}</span><b aria-hidden="true">View products →</b></div>
    </article>`).join('');

  const dlg = $('#pd');
  function openCategory(i) {
    const category = C.products[i];
    dlg.innerHTML = `<form method="dialog" class="dh"><div><small>${esc(category.category)}</small><h3>${esc(category.name)}</h3></div><button class="btn dk" aria-label="Close ${esc(category.name)}">Close</button></form>
      <p class="lead category-lead">${esc(category.desc)}</p>
      <div class="category-products">${category.items.map(item =>
        `<article class="product-card">
          <div class="product-card-art"><svg class="product-image" viewBox="0 0 180 210" role="img" aria-label="${esc(item.name)}">
            <rect x="67" y="24" width="46" height="18" rx="6" fill="${item.accent}" stroke="#ffffff" stroke-opacity=".8"/>
            <rect x="57" y="38" width="66" height="145" rx="18" fill="#f2f6f4" stroke="${item.accent}" stroke-width="3"/>
            <rect x="62" y="48" width="10" height="125" rx="5" fill="${item.accent}" fill-opacity=".22"/>
            <rect x="67" y="76" width="46" height="70" rx="7" fill="#ffffff" stroke="${item.accent}" stroke-opacity=".4"/>
            <text x="90" y="96" text-anchor="middle" fill="#123130" font-family="Manrope,sans-serif" font-size="10" font-weight="800">VELNOVA</text>
            <text x="90" y="116" text-anchor="middle" fill="#123130" font-family="Manrope,sans-serif" font-size="8" font-weight="700">${esc(item.name.replace('VELNOVA ', '').toUpperCase())}</text>
            <path d="M67 128h46" stroke="${item.accent}" stroke-opacity=".3"/>
          </svg></div>
          <div class="product-card-copy"><small>${esc(item.scent)}</small><h4>${esc(item.name)}</h4><p>${esc(item.desc)}</p>
          <strong class="product-price">${VelnovaCart.formatMoney(item.price)} <small>each</small></strong>
          <div class="product-actions"><button type="button" class="btn add-to-cart" data-add-to-cart="${esc(item.id)}">Add to Cart</button>
          <a class="btn outl product-quote" href="quote.html?product=${encodeURIComponent(item.id)}&category=${encodeURIComponent(category.slug)}">Quote</a></div></div>
        </article>`).join('')}</div>`;
    dlg.showModal();
  }
  document.querySelectorAll('.category-card').forEach(el => {
    el.onclick = () => openCategory(+el.dataset.c);
    el.onkeydown = e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openCategory(+el.dataset.c); } };
  });
  dlg.addEventListener('click', e => { if (e.target === dlg) dlg.close(); });
})();
