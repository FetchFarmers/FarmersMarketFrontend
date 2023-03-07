import React, { useState } from 'react';
import {useNavigate, Link} from 'react-router-dom';

import { 
    fetchLogin
 } from '../../user_api';

function Login() {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  let navigate = useNavigate()

  const handleLogin = async (event) => {
    event.preventDefault()
    try {  
      const user = await fetchLogin(username, password);
      console.log('logInUserResults :>> ', user);
      window.localStorage.setItem("username", user.user.username);
      window.localStorage.setItem("token", user.token);
      window.localStorage.setItem("isAdmin", user.user.isAdmin)
      console.log('user.isAdmin :>> ', user.user.isAdmin);
      setUsername("")
      setPassword("")
      navigate("/")

    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="logIn_signUp_container">
        <h1 className="logIn_signUp_Title">Log In </h1>
        <form onSubmit={handleLogin} className="form">
            <label>User Name</label><br/>
            <input className="logIn_signUp_entry" type="username" value={username} onChange={(event) => setUsername(event.target.value)} required/><br/>
            <label>Password</label><br/>
            <input className="logIn_signUp_entry" type="password" value={password} onChange={(event) => setPassword(event.target.value)}  required/><br/>
            <input className="logIn_signUp_submitButton" type="submit" ></input>
        </form>
        <Link className="signUp_Link" to="/user/register">Don't have an account? Sign Up here!</Link>
    </div>
  );
}

export default Login;