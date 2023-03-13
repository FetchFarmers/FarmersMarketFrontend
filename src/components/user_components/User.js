import React, {useState} from 'react';
import {Routes, Route} from 'react-router-dom';
import CompletedOrderDetail from './completedOrderDetail';
import Login from './Login';
import Register from './Register';
import UserProfile from './UserProfile';

function User ({setCartItemTotal}) {
  const [closedOrderDetails, setClosedOrderDetails] = useState({})

  
    return (
        <div className="App">
          <Routes>
            <Route path="/user/login" element={ <Login setCartItemTotal={setCartItemTotal}/> } />
            <Route path="/user/register" element={ <Register/> } />
            <Route path="/user/profile" element={ <UserProfile setClosedOrderDetails={setClosedOrderDetails}/> } />
            <Route path="/user/order_details" element={<CompletedOrderDetail closedOrderDetails={closedOrderDetails}/>}/>
          </Routes>
        </div>
    );

}
export default User ;