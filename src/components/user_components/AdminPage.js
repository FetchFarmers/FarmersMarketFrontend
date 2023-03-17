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
  const [userData, setUserData] = useState(null);
  const [products, setProducts] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState('');
  const [subcategoryFilter, setSubcategoryFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const token = window.localStorage.getItem('token')

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };  

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

  const handleProductCreated = (newProduct) => {
    setProducts([...products, newProduct]);
  };

  return (
    <div className="admin-page">
      {isAdmin ? (
        <div>
          <h1 className="admin-page-title">Welcome, {userData && userData.username}!</h1>
          <CreateProduct onProductCreated={handleProductCreated} />
          <h2 className="admin-page-subtitle">Products</h2>
          <div className="admin-page-filters">
            <div className="admin-page-filter">
              <label className="admin-page-filter-label">Filter by Category:</label>
              <select value={categoryFilter} onChange={handleCategoryFilter} className="admin-page-filter-select">
                <option value="All Products">All Products</option>
                {menuItems.map((item) => (
                  <option key={item.url} value={item.title}>
                    {item.title}
                  </option>
                ))}
              </select>
            </div>
            {categoryFilter && categoryFilter !== 'All Products' && (
              <div className="admin-page-filter">
                <label className="admin-page-filter-label">Filter by Subcategory:</label>
                <select value={subcategoryFilter} onChange={handleSubcategoryFilter} className="admin-page-filter-select">
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
            <div className="admin-page-filter">
              <label className="admin-page-filter-label">Search by Product Name:</label>
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearchTermChange}
                className="admin-page-filter-input"
              />
            </div>
          </div>
          <div className="admin-page-products">
            {products
              .filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase()))
              .map((product) => (
                <div key={product.id} className="admin-page-product">
                  <div className="admin-page-product-info">
                    <h3 className="admin-page-product-name">
                      <Link to={`/products/${product.id}`}>{product.name}</Link>
                    </h3>
                    <p className="admin-page-product-inventory">Inventory: {product.inventory}</p>
                  </div>
                  <button className="btn-delete" onClick={() => handleDelete(product.id)}>
                    Delete
                  </button>
                </div>
              ))}
          </div>
        </div>
      ) : (
        <h1>Access Denied</h1>
      )}
    </div>
  );  
}

