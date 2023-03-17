/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import { fetchUserClosedOrders } from '../../orders_api';
import { fetchUpdateUser, fetchUserData } from '../../user_api';
import Loading from '../Loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort } from '@fortawesome/free-solid-svg-icons';

function UserProfile ({setClosedOrderDetails}) {
  const [loading, setLoading] = useState(false);
  const [orderHistory, setOrderHistory] = useState([]);
  const [user, setUser] = useState({});
  const [newUsername, setNewUsername] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [datedSort, setDatedSort] = useState([]);
  const [revDatedSort, setRevDatedSort] = useState([]);
  const [prodTotalSort, setProdTotalSort] = useState([]);
  const [revProdTotalSort, setRevProdTotalSort] = useState([]);
  const [priceSort, setPriceSort] = useState([]);
  const [revPriceSort, setRevPriceSort] = useState([]);
  const [userMessage, setUserMessage] = useState("");


  async function loadUserAndClosedOrders() {
    try { 
      setLoading(true);
      const userResults = await fetchUserData();
      console.log('userResults :>> ', userResults);
      setUser(userResults);
      setNewUsername(userResults.username);
      setNewEmail(userResults.email);
      const results = await fetchUserClosedOrders();
      setOrderHistory(results);
      setLoading(false);

    } catch (error) {
      console.error(error);
    }
  }

  async function loadUserData() {
    try {  
      const results = await fetchUserData();
      setUser(results);
      setNewUsername(user.username);
      setNewEmail(user.email);

    } catch (error) {
      console.error(error);
    }
  }

  async function loadSortedOrders() {
    if (datedSort[0]){
      setOrderHistory(datedSort);
    }
    if (revDatedSort[0]){
      setOrderHistory(revDatedSort);
    }
    if (prodTotalSort[0]) {
      setOrderHistory(prodTotalSort);
    }
    if (revProdTotalSort[0]) {
      setOrderHistory(revProdTotalSort);
    }
    if (priceSort[0]) {
      setOrderHistory(priceSort);
    }
    if (revPriceSort[0]) {
      setOrderHistory(revPriceSort);
    }
  }

  async function handleUpdateUser(event) {
    event.preventDefault();
    try {
      const results = await fetchUpdateUser (newUsername, newEmail);
      console.log('UpdateUserResults :>> ', results);
      if (!results.id){
        setUserMessage("Sorry there was an error updating your profile. Please try again")
        console.log(userMessage);
      } else {  
        loadUserData();
        setIsEditing(false);
      }

    } catch (error) {
      console.error(error)
    }
  }

  function handleFilterByDate(event) {
    event.preventDefault();
    setPriceSort([]);
    setRevPriceSort([]);
    setProdTotalSort([]);
    setRevProdTotalSort([]);

    if (!datedSort[0]){
      const sort = orderHistory.sort((a, b) => {return new Date (a.checkoutDate) - new Date (b.checkoutDate)}); 
      setDatedSort(sort);
      setRevDatedSort([]);
    } else {
      const sort = orderHistory.reverse();
      setRevDatedSort(sort);
      setDatedSort([]);
    }
    
    loadSortedOrders();
  }

  function handleFilterByItems(event) {
    event.preventDefault();
    setPriceSort([]);
    setRevPriceSort([]);
    setProdTotalSort([]);
    setRevProdTotalSort([]);

    if (!prodTotalSort[0]){
      const sort = orderHistory.sort((a, b) => {return a.products.length - b.products.length});   
      setProdTotalSort(sort);
      setRevProdTotalSort([]);
    } else {
      const sort = orderHistory.reverse();
      setRevProdTotalSort(sort);
      setProdTotalSort([]);
    }

    loadSortedOrders();
  }

  function handleFilterByPrice(event) {
    event.preventDefault()
    setPriceSort([]);
    setRevPriceSort([]);
    setProdTotalSort([]);
    setRevProdTotalSort([]);

    if (!priceSort[0]) {
      const sort = orderHistory.sort((a, b) => {return a.checkoutSum - b.checkoutSum});
      setPriceSort(sort);
      setRevPriceSort([]);
    } else {
      const sort = orderHistory.reverse();
      setRevPriceSort(sort);
      setPriceSort([]);
    }

    loadSortedOrders();
  }
  

  useEffect(() => {
    loadUserAndClosedOrders();
  }, [])

  return (
    <div>
      {loading && <Loading/>}
      {!loading && <div className='mainUserProfilePage'>
        <h3 className='cartPageTitle' >{user.username}'s Profile</h3>
        <div className='userProfileDetailsCtr'>
          <div className="userDetailsCtr">  
            <h3 className="userDetailsTitle">User Details</h3>
            <form onSubmit={handleUpdateUser} className='username_emailCtr'>
              <div className='userCtr'>
                <div className='username_emailCtr'>
                  <h3 className='username_emailTitle'>Username:</h3>
                  {!isEditing &&<h3 className='username_email'>{user.username}</h3>}
                  {isEditing && <input className='editUserInputs' type='text' defaultValue={user.username} onSubmit={(event) => setNewUsername(event.target.value)} onChange={(event) => setNewUsername(event.target.value)} required/>}
                </div>
                <div className='username_emailCtr'>
                  <h3 className='username_emailTitle'>User Email: </h3>
                  {!isEditing &&<h3 className='username_email'>{user.email}</h3>}
                  {isEditing &&<input className='editUserInputs' defaultValue={user.email} onChange={(event) => setNewEmail(event.target.value)}  onSubmit={(event) => setNewEmail(event.target.value)} required/>}
                </div>
                <div className='editUserBtnCtr'>
                  {!isEditing &&<button className='editUserBtn' onClick={() => setIsEditing(true)}>Edit</button>}
                  {isEditing &&<input className='editUserBtn' type='submit' value='Submit'></input>}
                  {isEditing &&<button className='cancelEditUserBtn' onClick={()=>setIsEditing(false)}>Cancel</button>}
                </div>
                {userMessage &&<h5 className='updateUserErrorMessage'>{userMessage}</h5>}
              </div>
            </form>
          </div>
          <div>  
            <div className='orderHistoryListCtr'>
              <h3 className="orderHistoryTitle">Order History</h3>
              <div className='orderDtlsTitlesCtr'>
                <button onClick={handleFilterByDate} className='orderHistoryHeaderLbl'>Date&nbsp;&nbsp;<FontAwesomeIcon  icon={faSort}/></button>
                <button onClick={handleFilterByItems} className='orderHistoryHeaderLbl'>Items&nbsp;&nbsp;<FontAwesomeIcon  icon={faSort}/></button>
                <button onClick={handleFilterByPrice} className='orderHistoryHeaderLbl'>Price&nbsp;&nbsp;<FontAwesomeIcon  icon={faSort}/></button>
                <p className='orderHistoryHeaderDtlLbl'>Details</p>
              </div>
              {!orderHistory[0] && <p className='noOrdersMessage'>No previous orders found</p>}
              <div className='orderHistoryInsideCtr'>
                {orderHistory[0] && orderHistory.map((order) => (<div key={order.id} className='orderCtr'>
                  <p className='orderHistoryData'>{order.checkoutDate}</p>
                  <p className='orderHistoryData'>{order.products.length} items</p>
                  <p className='orderHistoryData'>${order.checkoutSum}</p>
                  <button className='viewOrderDetailsBtn' onClick={() => setClosedOrderDetails(order)}><Link to="/user/order_details">View</Link></button>
                </div>))}
              </div>
            </div>
          </div>
        </div> 
      </div>}
    </div>
  );
}
export default UserProfile;
