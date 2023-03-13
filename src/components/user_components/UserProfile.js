import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import { fetchUserClosedOrders } from '../../orders_api';
import Loading from '../Loading';

function UserProfile ({setClosedOrderDetails}) {
  const [loading, setLoading] = useState(false)
  const [orderHistory, setOrderHistory] = useState([])

    async function loadUserClosedOrders() {
    try {  
      setLoading(true)
      const results = await fetchUserClosedOrders();
      console.log('results :>> ', results);
      setOrderHistory(results)
      setLoading(false)

    } catch (error) {
      console.error(error);
    }
  }

    useEffect(() => {
    loadUserClosedOrders()
  }, [])

  return (
    <div>
      {loading && <Loading/>}
      {!loading && <div className='mainCartPage'>
        <h3 className='cartPageTitle' >User Profile</h3>
        <div className="checkoutDetailsCtr">  
          <h3 className="cartCheckoutDetailsCtrTitle">User Details</h3>
          <h3 className='sumTotal'>Username:</h3>  
          <h3 className='shippingCharge'>Email</h3>  
        </div>    
        <div className='cartDetailsCtr'>
          <h3 className="cartProductsCtrTitle">OrderHistory</h3>
          {orderHistory.map((order) => (<div key={order.id} className='cartProductsOutsideCtr'>
            <p className='cartProdTotal'>Order Date: {order.checkoutDate}</p>
            <h4 className='cartProdTotal'>Order products {order.products.length}</h4>
            <h4 className='cartProdTotal'>Order Total ${order.checkoutSum}</h4>
            <button onClick={() => setClosedOrderDetails(order)}><Link to="/user/order_details">View Details</Link></button>
          </div>))}
        </div>
      </div>}
    </div>
  );
}
export default UserProfile;
