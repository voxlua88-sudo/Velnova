(() => {
  const form = document.querySelector('#quote-form');
  const productSelect = document.querySelector('#quote-product');
  const status = document.querySelector('#quote-status');
  const submitButton = document.querySelector('#quote-submit');

  CONTENT.products.forEach(category => category.items.forEach(item => {
    const option = document.createElement('option');
    option.value = item.id;
    option.textContent = item.name;
    productSelect.append(option);
  }));

  const requestedProduct = new URLSearchParams(location.search).get('product');
  if ([...productSelect.options].some(option => option.value === requestedProduct)) {
    productSelect.value = requestedProduct;
  }

  form.action = `https://formsubmit.co/ajax/${CONTENT.contact.email}`;
  form.addEventListener('submit', async event => {
    event.preventDefault();
    status.textContent = 'Sending your request…';
    submitButton.disabled = true;

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(Object.fromEntries(new FormData(form)))
      });
      const result = await response.json();
      if (!response.ok || !result.success || result.success === 'false') {
        throw new Error(result.message || `Quote service returned ${response.status}.`);
      }
      form.reset();
      status.textContent = 'Thanks — your request was sent. VELNOVA will follow up by email.';
    } catch (error) {
      console.error('Unable to send the quote request.', error);
      status.textContent = 'We could not send your request. Please try again or email velnovahq@gmail.com.';
    } finally {
      submitButton.disabled = false;
    }
  });
})();
