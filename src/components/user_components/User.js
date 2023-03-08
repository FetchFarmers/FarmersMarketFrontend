import React from 'react';
import {Routes, Route} from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import UserProfile from './UserProfile';

function User ({setCartItemTotal}) {

  
    return (
        <div className="App">
          <Routes>
            <Route path="/user/login" element={ <Login setCartItemTotal={setCartItemTotal}/> } />
            <Route path="/user/register" element={ <Register/> } />
            <Route path="/user/profile" element={ <UserProfile/> } />
          </Routes>
        </div>
    );

}
export default User ;