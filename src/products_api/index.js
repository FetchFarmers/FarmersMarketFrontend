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

async function getAllProducts() {
  try {
    const response = await fetch(`${BASE_URL}/products`);
    const products = await response.json();
    return products;
  } catch (error) {
    console.log(error);
  }
}

export async function getProductsByCategory(category) {
  try {
    const response = await fetch(`${BASE_URL}/products/category/${category}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

async function getProductsBySubcategory(subcategory) {
  try {
    const response = await fetch(`${BASE_URL}/products/subcategory/${subcategory}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

// async function getCategory(productId) {
//   const response = await fetch(`${BASE_URL}/products/${productId}/category`);
//   const category = await response.json();
//   return category;
// }

async function updateProduct(id, updates) {
  try {
    const response = await fetch(`${BASE_URL}/products/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updates)
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

async function deleteProduct(id) {
  try {
    const response = await fetch(`${BASE_URL}/products/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (!response.ok) {
      throw new Error('Failed to delete product');
    }
  } catch (error) {
    console.log('Error:', error.message);
  }
}

export { createProduct, updateProduct, deleteProduct, getAllProducts, getProductsBySubcategory };


