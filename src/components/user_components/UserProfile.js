import { render } from '@testing-library/react';
import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import { fetchUserClosedOrders } from '../../orders_api';
import { fetchUserData } from '../../user_api';
import Loading from '../Loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSort } from '@fortawesome/free-solid-svg-icons'

function UserProfile ({setClosedOrderDetails}) {
  const [loading, setLoading] = useState(false);
  const [orderHistory, setOrderHistory] = useState([]);
  const [user, setUser] = useState({});
  // const [newUsername, setNewUsername] = useState("");
  // const [newEmail, setNewEmail] = useState("");
  const [isEditing, setIsEditing] = useState(false)
  const [sortedOrders, setSortedOrders] = useState([])
  // const [sortSelection, setSortSelection] = useState('checkoutSum')

  async function loadUserClosedOrders() {
    try {  
      setLoading(true);
      const results = await fetchUserClosedOrders();
      console.log('results :>> ', results);
      setOrderHistory(results);
      console.log('orderHistory :>> ', orderHistory);

    } catch (error) {
      console.error(error);
    }
  }

  async function reloadUserClosedOrders() {
    try {  

      if (sortedOrders[0]) {
        setOrderHistory(sortedOrders)
      }

    } catch (error) {
      console.error(error);
    }
  }

  async function loadUserData() {
    try {  
      const results = await fetchUserData();
      console.log('results :>> ', results);
      setUser(results);
      setLoading(false);

    } catch (error) {
      console.error(error);
    }
  }

  // todo 
  async function handleUpdateUser(event) {
    event.preventDefault() 
    try {


    } catch (error) {
      console.error(error)
    }
  }
  
  function handleFilterByDate(event) {
    event.preventDefault()
    const sort = orderHistory.sort((a, b) => (new Date (a.checkoutDate) < new Date (b.checkoutDate)) ? 1 : -1); 
    setSortedOrders(sort)
    reloadUserClosedOrders()
  }
  function handleFilterByItems(event) {
    event.preventDefault()
    const sort = orderHistory.sort((a, b) => (a.products.length < b.products.length) ? 1 : -1);    
    setSortedOrders(sort)
    reloadUserClosedOrders()
  }
  function handleFilterByPrice(event) {
    event.preventDefault()
    const sort = orderHistory.sort((a, b) => (a.checkoutSum < b.checkoutSum) ? 1 : -1);
    setSortedOrders(sort)
    reloadUserClosedOrders()
  }
  

  useEffect(() => {
    loadUserClosedOrders()
    loadUserData()
  }, [])

  return (
    <div>
      {loading && <Loading/>}
      {!loading && <div className='mainUserProfilePage'>
        <h3 className='cartPageTitle' >{user.username}'s Profile</h3>
        <div className='userProfileDetailsCtr'>
        <div className="userDetailsCtr">  
          <h3 className="cartCheckoutDetailsCtrTitle">User Details</h3>
          {!isEditing && <div className=''>
            <div className=''>
              <h3 className=''>Username</h3>
              <p className=''>{user.username}</p>
            </div>
            <div className=''>
              <h3 className='shippingCharge'>Email </h3>
              <h3 className=''>{user.email}</h3>
            </div>
            <button className='' onClick={() => setIsEditing(true)}>Edit</button>
          </div>}
          {isEditing && <form onSubmit={handleUpdateUser} className=''>
            <label>Name</label><br/>
            {/* <input className='' type='text' defaultValue={user.username} onSubmit={(event) => setNewUsername(event.target.value)} onChange={(event) => setNewUsername(event.target.value)} required/><br/> */}
            <label>Email</label><br/>
            {/* <input className='' defaultValue={user.email} onChange={(event) => setNewEmail(event.target.value)}  onSubmit={(event) => setNewEmail(event.target.value)} required/><br/> */}
            <input className='' type='submit' value='Submit'></input>
            <button className='' onClick={()=>setIsEditing(false)}>Cancel</button>
          </form>}
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
          <div className='orderHistoryInsideCtr'>
          {orderHistory.map((order) => (<div key={order.id} className='orderCtr'>
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
