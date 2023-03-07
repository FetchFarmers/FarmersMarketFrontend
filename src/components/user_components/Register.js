import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

import { 
    fetchSignUp
 } from '../../user_api';

function Register () {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [email, setEmail] = useState("")
    let navigate = useNavigate()
    
  
    const handleSignUp = async (event) => {
      event.preventDefault()
      try {  
        if (password === passwordConfirm) {
            const user = await fetchSignUp(username, password, email);
            console.log('signUpInUserResults :>> ', user);
            window.localStorage.setItem("username", user.user.username);
            window.localStorage.setItem("token", user.token);
            setUsername("")
            setPassword("")
            setPasswordConfirm("")
            setEmail("")
            navigate("/")

        } else {
            alert("Passwords do not match. Try Again");
            setPassword("")
            setPasswordConfirm("")
        }
  
      } catch (error) {
        console.error(error);
      }
    }

    return (
        <div className="logIn_signUp_container">
            <h1 className="logIn_signUp_pageTitle">Create Account </h1>
            <form onSubmit={handleSignUp} className="form">
                <label>User Name</label><br/>
                <input className="logIn_signUp_entry" type="username" value={username} onChange={(event) => setUsername(event.target.value)} required/><br/>
                <label>Email Address</label><br/>
                <input className="logIn_signUp_entry" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required/><br/>
                <label>Password - minimum 8 characters</label><br/>
                <input className="logIn_signUp_entry" type="password" minLength={8} value={password} onChange={(event) => setPassword(event.target.value)}  required/><br/>
                <label>Re-enter Password</label><br/>
                <input className="logIn_signUp_entry" type="password" minLength={8} value={passwordConfirm} onChange={(event) => setPasswordConfirm(event.target.value)} required/><br/>
                <input className="logIn_signUp_submitButton" type="submit" value='Submit'></input>
            </form>
        </div>
      );
}
export default Register ;