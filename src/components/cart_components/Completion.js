import { Link } from "react-router-dom";

const Completion = () => {
  const isLoggedIn = window.localStorage.getItem("username");


  return(
    <div className="mainCartPage">
      <div className="paymentSuccessMsgCtr">
        <h1>Success!!</h1>
        {!isLoggedIn && <h3>Thank you for your order. Your delivery will arrive shortly.</h3>}
        {isLoggedIn &&<h3>View your <Link to="/user/profile" style={{textDecoration: "underline", fontStyle: "italic"}}>profile</Link> to see your order history.</h3>}
      </div>
    </div>
  )
}

export default Completion;