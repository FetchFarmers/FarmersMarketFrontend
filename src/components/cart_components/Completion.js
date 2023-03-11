import { Link } from "react-router-dom";

const Completion = () => {


  return(
    <div className="mainCartPage">
      <div className="paymentSuccessMsgCtr">
        <h1>Success!!</h1>
        <h3>View your <Link to="/user/profile" style={{textDecoration: "underline", fontStyle: "italic"}}>profile</Link> to track order status.</h3>
      </div>
    </div>
  )
}

export default Completion;