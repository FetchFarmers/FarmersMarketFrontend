import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';

import { 
    fetchLogin
 } from '../../user_api';

function Login({setLoggedInUser, setToken, setUserMessage}) {

  const [username, setUsername] = useState("")
  console.log("🚀 ~ file: Login.js:11 ~ Login ~ username:", username)
  const [password, setPassword] = useState("")
  console.log("🚀 ~ file: Login.js:13 ~ Login ~ password:", password)
  

  

  const handleLogin = async (event) => {
    event.preventDefault()
    try {  
      const user = await fetchLogin(username, password);
      console.log('logInUserResults :>> ', user);
      window.localStorage.setItem("username", user.user.username);
      window.localStorage.setItem("token", user.token);

    } catch (error) {
      console.error(error);
    }
  }

  
  return (
    <div className="logIn_signUp_create_edit_container">
        <h1 className="pageTitle">Log In </h1>
        
        <form onSubmit={handleLogin} className="form">
            <label>User Name</label><br/>
            <input className="logIn_signUp_create_edit_entry" type="text" value={username} onChange={(event) => setUsername(event.target.value)} required/><br/>
            <label>Password</label><br/>
            <input className="logIn_signUp_create_edit_entry" type="password" value={password} onChange={(event) => setPassword(event.target.value)}  required/><br/>
            <input className="submitButton" type="submit" ></input>
        </form>
        <Link className="signUp_NewActivity_Link" to="/signup">Don't have an account? Sign Up here!</Link>
    </div>
  );
}

export default Login;