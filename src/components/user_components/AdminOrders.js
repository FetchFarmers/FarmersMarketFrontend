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
        <ul>
        {openOrders.map((order) => (
          <div>
            <div key={order.id}>
              <h4>{order.creatorName}</h4>
            </div>
          </div>
        ))}
        </ul>
    </div>
      

  );
}

export default AdminOrders;