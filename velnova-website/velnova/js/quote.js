(() => {
  const form = document.querySelector('#quote-form');
  const productSelect = document.querySelector('#quote-product');
  const categoryField = document.querySelector('#quote-category');
  const nextField = document.querySelector('#quote-next');

  CONTENT.products.forEach(category => category.items.forEach(item => {
    const option = document.createElement('option');
    option.value = item.id;
    option.textContent = item.name;
    productSelect.append(option);
  }));

  const params = new URLSearchParams(location.search);
  const requestedProduct = params.get('product');
  const productCategory = CONTENT.products.find(category =>
    category.items.some(item => item.id === requestedProduct)
  );
  const requestedCategory = CONTENT.products.find(category => category.slug === params.get('category'));
  const selectedCategory = requestedCategory || productCategory;

  if (selectedCategory) {
    categoryField.value = `${selectedCategory.name} (${selectedCategory.category})`;
    if (!productCategory) {
      productSelect.options[0].textContent = `General enquiry — ${selectedCategory.name}`;
    }
  }
  if (productCategory) {
    productSelect.value = requestedProduct;
  }

  form.action = `https://formsubmit.co/${CONTENT.contact.email}`;
  nextField.value = new URL('/quote-sent', location.origin).href;
})();
