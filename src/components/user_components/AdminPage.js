import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchUserData } from "../../user_api";
import CreateProduct from "../products_components/admin/CreateProduct";
import { getAllProducts } from "../../products_api";
import { getProductsByCategory } from "../../products_api";
import { getProductsBySubcategory } from "../../products_api";
import { menuItems } from "../../menuItems";
import { deleteProduct } from "../../products_api";

export default function AdminPage() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [token, setToken] = useState(window.localStorage.getItem('token'));
  const [userData, setUserData] = useState(null);
  const [products, setProducts] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState('');
  const [subcategoryFilter, setSubcategoryFilter] = useState('');

  useEffect(() => {
    const getUserData = async () => {
      if (token) {
        const data = await fetchUserData(token);
        setIsAdmin(data.isAdmin);
        setUserData(data);
      }
    };
    getUserData();
  }, [token]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        let data = [];

        if (subcategoryFilter) {
          data = await getProductsBySubcategory(subcategoryFilter);
        } else if (categoryFilter) {
          if (categoryFilter === 'All Products') {
            data = await getAllProducts();
          } else {
            data = await getProductsByCategory(categoryFilter);
          }
        } else {
          data = await getAllProducts();
        }

        setProducts(data);
      } catch (error) {
        console.error(error);
      }
    };

    getProducts();
  }, [categoryFilter, subcategoryFilter]);

  const handleCategoryFilter = (event) => {
    setCategoryFilter(event.target.value);
    setSubcategoryFilter('');
  };

  const handleSubcategoryFilter = (event) => {
    setSubcategoryFilter(event.target.value);
  };

  const handleDelete = async (productId) => {
    try {
      await deleteProduct(productId);
      setProducts(products.filter(product => product.id !== productId));
    } catch (error) {
      console.log('There was a problem deleting the product:', error);
    }
  };

  return (
    <div>
      {isAdmin ? (
        <div>
          <h1>Welcome, {userData && userData.username}!</h1>
          <CreateProduct />
          <h2>Products</h2>
          <div>
            <div>
              <label>Filter by Category:</label>
              <select value={categoryFilter} onChange={handleCategoryFilter}>
                <option value="All Products">All Products</option>
                {menuItems.map((item) => (
                  <option key={item.url} value={item.title}>
                    {item.title}
                  </option>
                ))}
              </select>
            </div>
            {categoryFilter && categoryFilter !== 'All Products' && (
              <div>
                <label>Filter by Subcategory:</label>
                <select value={subcategoryFilter} onChange={handleSubcategoryFilter}>
                  <option value="">All {categoryFilter} Products</option>
                  {menuItems
                    .find((item) => item.title === categoryFilter)
                    ?.submenu.map((item) => (
                      <option key={item.url} value={item.title}>
                        {item.title}
                      </option>
                    ))}
                </select>
              </div>
            )}
          </div>
          {products.map((product) => (
            <div key={product.id}>
              <h3><Link to={`/products/${product.id}`}>{product.name}</Link></h3>
              <p>Inventory: {product.inventory}</p>
              {<button onClick={() => handleDelete(product.id)}>Delete</button>}
            </div>
          ))}
        </div>
      ) : (
        <h1>Access Denied</h1>
      )}
    </div>
  );
      }  

