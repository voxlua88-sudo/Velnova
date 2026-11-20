(() => {
  const menu = document.querySelector('[data-category-menu]');
  if (!menu) return;
  CONTENT.products.forEach(category => {
    const link = document.createElement('a');
    link.href = `category.html?category=${encodeURIComponent(category.slug)}`;
    link.textContent = category.name;
    menu.append(link);
  });

  const quoteLink = document.createElement('a');
  quoteLink.href = 'quote.html';
  quoteLink.textContent = 'Quote';
  quoteLink.className = 'nav-quote';
  menu.append(quoteLink);
})();
