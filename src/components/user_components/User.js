import React from 'react';
import {Routes, Route, Link} from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import UserProfile from './UserProfile';

function User () {
    return (
        <div className="App">
          <Routes>
            <Route path="/user/login" element={ <Login/> } />
            <Route path="/user/register" element={ <Register/> } />
            <Route path="/user/profile" element={ <UserProfile/> } />
          </Routes>
        </div>
    );

}
export default User ;