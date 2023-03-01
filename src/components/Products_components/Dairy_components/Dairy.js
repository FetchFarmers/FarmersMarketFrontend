import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';

// import { 
    // todo call api functions here
//  } from '../products_api'; //! not positive about the path might need another dot or two??
function EggsAndDairy() {
    const [products, setProducts] = useState([]);
  
    useEffect(() => {
      fetch('https://farmers-market-1oeq.onrender.com/api/products/category/Dairy')
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
  
    return (
        <div>
          <h2>Bakery Products</h2>
          <ul>
            {products.map(product => (
              <li key={product.id}>
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <p>Inventory: {product.inventory}</p>
                <p>Price: ${product.price}</p>
                <p>Subcategory: {product.subCategory}</p>
                <img src={product.imageURL} alt={product.name} />
              </li>
            ))}
          </ul>
        </div>
      );
    }
  
  export default EggsAndDairy;
  