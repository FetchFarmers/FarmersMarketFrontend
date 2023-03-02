//! This is where we will make all the products API calls 

// * this is how they called the functions on art collector - they didn't export at the bottom just imported at top of page where used
export async function functionName() {
  
    try {

    } catch (error) {
      throw error;
    }
  }

  export const getProductsByCategory = async (category) => {
    const response = await fetch(`/api/products/category/${category}`);
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    const products = await response.json();
    return products;
  };
  
  export const getProductsBySubcategory = async (subcategory) => {
    const response = await fetch(`/api/products/subcategory/${subcategory}`);
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    const products = await response.json();
    return products;
  };