(() => {
  const menu = document.querySelector('[data-category-menu]');
  if (!menu) return;
  CONTENT.products.forEach(category => {
    const link = document.createElement('a');
    link.href = `category.html?category=${encodeURIComponent(category.slug)}`;
    link.textContent = category.name;
    menu.append(link);
  });

  menu.addEventListener('click', event => {
    const link = event.target.closest('a');
    if (
      !link ||
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      (link.target && link.target !== '_self') ||
      link.hasAttribute('download') ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) return;

    event.preventDefault();
    if (document.body.classList.contains('page-leaving')) return;
    document.body.classList.add('page-leaving');
    window.setTimeout(() => {
      window.location.href = link.href;
    }, 220);
  });
})();
