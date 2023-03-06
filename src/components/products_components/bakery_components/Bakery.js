import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AddToCart from '../../cart_components/AddToCart';
import { fetchUserData } from '../../../user_api';
import { deleteProduct } from '../../../products_api';

function Bakery() {
  const [products, setProducts] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [token, setToken] = useState(window.localStorage.getItem('token'));
  const [userData, setUserData] = useState(null);

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

  const handleDelete = async (productId) => {
    try {
      await deleteProduct(productId);
      setProducts(products.filter(product => product.id !== productId));
    } catch (error) {
      console.log('There was a problem deleting the product:', error);
    }
  };

  return (
    <div className='products-page'>
      <h3 className='product-title'>Bakery</h3>
      <div className="product-list">
        {products.map(product => (
          <div key={product.id} className="product">
            <Link to={`/products/${product.id}`}>
              <img className="product-image" src={product.imageURL} alt={product.name} />
              <div className="product-details">
                <h3 className='product-name'>{product.name}</h3>
                <p className='product-price'>${product.price}</p>
              </div>
            </Link>
            {isAdmin && <button onClick={() => handleDelete(product.id)}>Delete</button>}
            {product.id && <AddToCart productId={product.id} productInventory={product.inventory} className="add-to-cart" />}
          </div>
        ))}
      </div>
    </div>
  );  
}

export default Bakery;