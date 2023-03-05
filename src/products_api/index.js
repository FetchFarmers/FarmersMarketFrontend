const BASE_URL = 'https://farmers-market-1oeq.onrender.com/api';

async function createProduct(productData) {
  const response = await fetch(`${BASE_URL}/products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(productData),
  });
  const product = await response.json();
  return product;
}

async function getCategory(productId) {
  const response = await fetch(`${BASE_URL}/products/${productId}/category`);
  const category = await response.json();
  return category;
}

export { createProduct, getCategory };
