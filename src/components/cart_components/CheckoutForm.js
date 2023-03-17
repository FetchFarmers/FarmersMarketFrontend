import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PaymentElement} from "@stripe/react-stripe-js";
import { useStripe, useElements } from '@stripe/react-stripe-js';

import { 
  fetchCheckout,
} from '../../orders_api'; 

const CheckoutForm = ({ orderId, setUserOrderProducts, cartTotal, setCartItemTotal }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [message, setMessage] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  let navigate = useNavigate();

  async function handleCheckout() {
    try{
      const orderDate = new Date().toLocaleDateString('en-US');
      console.log('orderDate :>> ', orderDate);

      const results = await fetchCheckout (orderId, cartTotal, orderDate);
      console.log('checkoutResults :>> ', results);
      if (results.isCheckedOut){  
        setUserOrderProducts([]);
        setCartItemTotal(0);
        window.localStorage.removeItem("cartTotal");
        window.localStorage.removeItem("fetchSessionId")
      }

    } catch (error) {
      console.error(error);
    }
  }

  async function handlePayment(event) {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    setIsProcessing(true);
    
    const { error } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });

    if (!error) {
      await handleCheckout();
      navigate("/payment_completion");
    }

    if (error) {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error ocurred.");
    }

    setIsProcessing(false);
  }

  return (
    <form className='paymentForm' onSubmit={handlePayment}>
      <h3 className='paymentHeaders'>Card Details&nbsp;&nbsp; <span className='testCardMsg'>To test checkout - Use card number 4242 4242 4242 4242</span></h3>
      <PaymentElement />
      <button className='payBtn' disabled={isProcessing}><span>{isProcessing ? "Processing ..." : "Pay now"}</span></button>
      {message &&<p>{message}</p>}
    </form>
  );
};

export default CheckoutForm;
