import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AddToCart from '../../cart_components/AddToCart';
import { fetchUserData } from '../../../user_api';

function Bakery({setCartItemTotal, cartItemTotal}) {
  const [products, setProducts] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [token, setToken] = useState(window.localStorage.getItem('token'));
  const [userData, setUserData] = useState(null);
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    fetch('https://farmers-market-1oeq.onrender.com/api/products/category/Bakery')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setProducts(data);
      })
      .catch(error => {
        console.log('There was a problem with the API request:', error);
      });
  }, []);

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

  const handleSearch = e => {
    setSearchInput(e.target.value);
  };

  const filteredProducts = products.filter(
    product =>
      product.name.toLowerCase().includes(searchInput.toLowerCase()) ||
      product.category.toLowerCase().includes(searchInput.toLowerCase()) ||
      product.subcategory.toLowerCase().includes(searchInput.toLowerCase()) ||
      product.description.toLowerCase().includes(searchInput.toLowerCase())
  );

  return (
    <div className='products-page'>
      <h3 className='product-title'>Bakery</h3>
      <div className='search-bar'>
        <input type='text' placeholder='Search' onChange={handleSearch} />
      </div>
      <div className="product-list">
        {filteredProducts.map(product => (
          <div key={product.id} className="product">
            <Link to={`/products/${product.id}`}>
              <img className="product-image" src={product.imageURL} alt={product.name} />
              <div className="product-details">
                <h3 className='product-name'>{product.name}</h3>
                <div className='product-price'>${product.price}</div>
              </div>
            </Link>
            {product.id && <AddToCart setCartItemTotal={setCartItemTotal} cartItemTotal={cartItemTotal} productId={product.id} productInventory={product.inventory} className="add-to-cart" />}
          </div>
        ))}
      </div>
    </div>
  );  
}

export default Bakery;
