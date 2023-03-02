import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';

// import { 
    // todo call api functions here
//  } from '../orders_api'; //! not positive about the path might need another dot or two??


function Cart() {
  const [orderItems, setOrderItems] = useState([]);

  useEffect(() => {
    const fetchOrderItems = async () => {
      try {
        const response = await fetch('https://farmers-market-1oeq.onrender.com/api/orders/open');
        const data = await response.json();
        setOrderItems(data[0].products);
      } catch (error) {
        console.error(error);
      }
    };

    fetchOrderItems();
  }, []);

  return (
    <div>
      <h2>Cart</h2>
      <ul>
        {orderItems.map((item) => (
          <li key={item.id}>
            <p>{item.name}</p>
            <p>Quantity: {item.quantity}</p>
            <p>Price: ${item.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Cart;
