import { fetchUserData } from "../user_api";

const BASE_URL = 'https://farmers-market-1oeq.onrender.com/api';

let token = null;
let userData = null;

async function initAuth() {
  token = localStorage.getItem('token');
  userData = await fetchUserData(token);
}
const searchProducts = async (searchQuery) => {
  try {
    const response = await fetch(`${BASE_URL}/products/search?q=${searchQuery}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

async function createProduct(productData) {
  try {
    if (!userData || !userData.isAdmin) {
      await initAuth();
    }
    const response = await fetch(`${BASE_URL}/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(productData),
    });
    const product = await response.json();
    return product;
  } catch (error) {
    console.error(error);
    throw error;
  }
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

async function getProductsByCategory(category) {
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

async function updateProduct(id, updates) {
  try {
    if (!userData || !userData.isAdmin) {
      await initAuth();
    }
    const response = await fetch(`${BASE_URL}/products/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(updates),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function deleteProduct(id) {
  try {
    if (!userData || !userData.isAdmin) {
      await initAuth();
    }
    const response = await fetch(`${BASE_URL}/products/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error('Failed to delete product');
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export { searchProducts, createProduct, updateProduct, deleteProduct, getAllProducts, getProductsByCategory, getProductsBySubcategory };


