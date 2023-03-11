import { useState } from 'react';
import { useStripe, useElements, PaymentElement, AddressElement} from '@stripe/react-stripe-js';

const CheckoutForm = ({handleCheckout}) => {
  const [isProcessing, setIsProcessing] = useState(false)
  const [message, setMessage] = useState("")
  const stripe = useStripe()
  const elements = useElements() 


  const handlePayment = async (event) => {
    event.preventDefault()

    if (!stripe || !elements) {
      return;
    }
    setIsProcessing(true)

    const {error} = await stripe.confirmPayment({
      elements, 
      confirmParams: {
        return_url: `${window.location.origin}/payment_completion`,
        
      }
      
    });

    if (error) {
      setMessage(error.message)
    }

    setIsProcessing(false)
  }

  return (
    <form className='paymentForm' onSubmit={() => {handlePayment(); handleCheckout()}}>
      <AddressElement/>
      <PaymentElement />
      <button disabled={isProcessing}><span>{isProcessing ? "Processing ..." : "Pay now"}</span></button>
    </form>
  );
};

export default CheckoutForm;
