import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

import { 
    fetchSignUp
 } from '../../user_api';

function Register () {
  const [userMessage, setUserMessage] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [isProcessing, setIsProcessing] = useState("");
  const [email, setEmail] = useState("");
  let navigate = useNavigate()

  
  const handleSignUp = async (event) => {
    event.preventDefault()
    setIsProcessing(true)
    try {  
      if (password === passwordConfirm) {
        const user = await fetchSignUp(username, password, email);
        console.log('signUpInUserResults :>> ', user);
        if (user.message === 'UserTakenError is not defined') {
          setIsProcessing(false)
          setUserMessage("Username is not available. Please try Again");
          setTimeout(() => setUserMessage(""), 3000);
          return;
        } else if (user.user.username) {
          window.localStorage.setItem("username", user.user.username);
          window.localStorage.setItem("token", user.token);
          setUsername("")
          setPassword("")
          setPasswordConfirm("")
          setEmail("")
          setIsProcessing(false)
          navigate("/")
        } else {
          setUsername("")
          setPassword("")
          setPasswordConfirm("")
          setEmail("")
          setIsProcessing(false)
          setUserMessage("There was an error creating your account. Please try Again");
          setTimeout(() => setUserMessage(""), 3000);
        }

      } else {
        setIsProcessing(false)
        setUserMessage("Passwords do not match. Try Again");
        setTimeout(() => setUserMessage(""), 3000);
        setPassword("")
        setPasswordConfirm("")
      }

    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="logIn_signUp_container">
      <h1 className="logIn_signUp_Title">Create Account </h1>
      {userMessage &&<h5 className='logInErrorMessage'>{userMessage}</h5>}
      <form onSubmit={handleSignUp} className="form">
        <label>User Name</label><br/>
        <input className="logIn_signUp_entry" type="username" value={username} onChange={(event) => setUsername(event.target.value)} required/><br/>
        <label>Email Address</label><br/>
        <input className="logIn_signUp_entry" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required/><br/>
        <label>Password - minimum 8 characters</label><br/>
        <input className="logIn_signUp_entry" type="password" minLength={8} value={password} onChange={(event) => setPassword(event.target.value)}  required/><br/>
        <label>Re-enter Password</label><br/>
        <input className="logIn_signUp_entry" type="password" minLength={8} value={passwordConfirm} onChange={(event) => setPasswordConfirm(event.target.value)} required/><br/>
        <button disabled={isProcessing} className="logIn_signUp_submitButton" type="submit" >{isProcessing ? "Processing..." : "Submit"}</button>
      </form>
    </div>
  );
}
export default Register ;