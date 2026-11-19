/* Renders the company, catalogue, process and industry cards from js/config/content.js */
(() => {
  const C = CONTENT, B = BOTTLE, $ = s => document.querySelector(s);
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const card = (t, d) => `<div class="card"><h4>${esc(t)}</h4><p>${esc(d)}</p></div>`;

  $('#c-title').textContent = C.company.title;
  $('#c-lead').textContent = C.company.lead;
  $('#c-about').innerHTML = C.company.about.map(p => `<p>${esc(p)}</p>`).join('');
  $('#c-facts').innerHTML = C.company.facts.map(([k, v]) => `<div><span>${esc(k)}</span><b>${esc(v)}</b></div>`).join('');
  $('#pillars').innerHTML = C.pillars.map(p => card(p.t, p.d)).join('');
  $('#steps').innerHTML = C.steps.map(p => card(p.t, p.d)).join('');
  $('#inds').innerHTML = C.industries.map(p => card(p.t, p.d)).join('');

  const jug = c => `<svg viewBox="0 0 64 64" width="64" height="64" aria-hidden="true"><path d="M34 14V8a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v6" fill="none" stroke="currentColor" stroke-width="3"/><rect x="8" y="14" width="48" height="46" rx="9" fill="none" stroke="currentColor" stroke-width="3"/><path d="M12 34h40v18a6 6 0 0 1-6 6H18a6 6 0 0 1-6-6z" fill="${c}"/><rect x="14" y="6" width="12" height="8" rx="2" fill="currentColor"/></svg>`;
  $('#products').innerHTML = C.products.map((p, i) =>
    `<article class="card pcard" tabindex="0" role="button" data-p="${i}" aria-label="${esc(p.name)} details">${jug(B.variants[p.variants[0]].c)}<small>${esc(p.category)}</small><h4>${esc(p.name)}</h4><p>${esc(p.desc)}</p><div class="dots">${p.variants.map(v => `<i style="background:${B.variants[v].c}"></i>`).join('')}</div></article>`).join('');

  const dlg = $('#pd');
  function open(i) {
    const p = C.products[i];
    dlg.innerHTML = `<form method="dialog" class="dh"><div><small>${esc(p.category)}</small><h3>${esc(p.name)}</h3></div><button class="btn dk" aria-label="Close details">Close</button></form>
    <p class="lead" style="margin-top:6px">${esc(p.desc)}</p>
    <h4>Applications</h4><div>${p.apps.map(a => `<span class="chip">${esc(a)}</span>`).join('')}</div>
    <h4>Variants</h4><div class="sw">${p.variants.map(x => `<button type="button" data-v="${x}" aria-label="${esc(B.variants[x].n)}" style="background:linear-gradient(135deg,${B.variants[x].c},${B.variants[x].c2})"></button>`).join('')}</div><div class="vn"></div>
    <div class="facts"><div><span>Packaging</span><b>${esc(p.packaging)}</b></div><div><span>Documentation</span><b>${esc(p.docs)}</b></div></div>
    <div class="acts"><button type="button" class="btn dk" data-act="3d">View in 3D</button><a class="btn outl quote2" href="#">Request a Quote</a></div>
    <p class="note" style="margin-top:14px">Sample entry. Replace with verified VELNOVA product data.</p>`;
    let v = p.variants[0];
    const sel = x => {
      v = x;
      dlg.querySelectorAll('.sw button').forEach(b => b.classList.toggle('on', +b.dataset.v === x));
      dlg.querySelector('.vn').textContent = B.variants[x].n + ' – ' + B.variants[x].d;
      dlg.querySelector('.quote2').href = 'mailto:' + C.contact.email + '?subject=' + encodeURIComponent('Quote request – ' + p.name + ' (' + B.variants[x].n + ')');
    };
    dlg.querySelectorAll('.sw button').forEach(b => b.onclick = () => sel(+b.dataset.v));
    sel(v);
    dlg.querySelector('[data-act=3d]').onclick = () => {
      dlg.close();
      setV(v);
      window.setLabel && setLabel({ subtitle: p.name.toUpperCase() });
      document.querySelector('#inspect').scrollIntoView({ behavior: 'smooth' });
    };
    dlg.showModal();
  }
  document.querySelectorAll('.pcard').forEach(el => {
    el.onclick = () => open(+el.dataset.p);
    el.onkeydown = e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(+el.dataset.p); } };
  });
  dlg.addEventListener('click', e => { if (e.target === dlg) dlg.close(); });
})();
