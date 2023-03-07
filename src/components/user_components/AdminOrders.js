 /* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';

import { 
  fetchAllOpenOrders
} from '../../orders_api'; 


function AdminOrders() {
  const [openOrders, setOpenOrders] = useState([])


  
  async function loadAllOpenOrders() {
    try {  

        const results = await fetchAllOpenOrders();
        setOpenOrders(() => results);
        console.log('openOrders :>> ', openOrders);


    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    loadAllOpenOrders()
  }, [])


  return (
    <div>
      <h1 className='pageTitle' >View Orders</h1>
      {/* {(!userOrderProducts) && <h3 className='pageTitle' >Your cart is currently empty</h3>}
      {userOrderProducts && <ul>
        {userOrderProducts.map((item) =>
          (<div>
            <div key={item.id}>
              <h4>{item.name} ({item.quantity} x ${item.price})</h4>
              <h4>Total: ${(item.price*item.quantity).toFixed(2)}</h4>
              <div className='editCartControlsContainer'>
                <input className='quantityDropdown' type="number" defaultValue={item.quantity} onChange={(event) => setQuantity(event.target.value)} min={1} max={item.inventory || 10}/>
                <button className="editCartButtons" onClick={() => handleUpdateItem(item.orderProductId)}>Update&nbsp;<FontAwesomeIcon  icon={faCartShopping}/></button>
                <button className="editCartButtons" onClick={() =>handleRemoveItem(item.orderProductId)} >Remove All</button>
              </div>
            </div>
          </div>
        ))}
        <h3>Order Total: ${orderSum.toFixed(2)}</h3>
        <div className='editCartControlsContainer'>
        {cartItemTotal !== 0 &&<button className="editCartButtons" onClick={() =>handleCheckout()} >Checkout</button>}
        {cartItemTotal !== 0 &&<button className="editCartButtons" onClick={() =>handleCancelOrder()} >Cancel Order</button>}
        </div> */}
      {/* </ul>} */}
    </div>
  );
}

export default AdminOrders;