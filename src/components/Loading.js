import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const Loading = () => {


  return(
    <div className="mainCartPage">
      <div className="paymentSuccessMsgCtr">
        <h1>loading <FontAwesomeIcon className='fas fa-spinner fa-spin'  icon={faSpinner} /></h1>
      </div>
    </div>
  )
}

export default Loading;