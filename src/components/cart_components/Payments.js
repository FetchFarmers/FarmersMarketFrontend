/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

import { loadStripe } from "@stripe/stripe-js";

import { 
  fetchStripe, 
  fetchStripePaymentIntent,
} from '../../orders_api'; 
import AddressForm from './AddressForm';


const Payments = ({ orderId, setUserOrderProducts, cartTotal, setCartItemTotal }) => {
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");
  console.log(cartTotal)
  const checkoutPrice = (cartTotal/.01).toFixed(0)
  console.log(checkoutPrice)

  const loadStripePublishableKey = async () => {
    try {
      const {publishableKey} = await fetchStripe();
      setStripePromise(loadStripe(publishableKey));
      console.log('publishableKey :>> ', publishableKey);
    } catch(error) {
      console.error(error);
    }
  }

  const loadStripePaymentIntent = async () => {
    try {
      const {clientSecret} = await fetchStripePaymentIntent(checkoutPrice);
      setClientSecret(clientSecret);
      console.log('clientSecret :>> ', clientSecret);
    } catch(error) {
      console.error(error);
    }
  }

  useEffect(() => {
    loadStripePublishableKey()
    loadStripePaymentIntent()
  }, [])

  return (
    <div className="mainCartPage">
      {clientSecret && stripePromise && (<Elements stripe={stripePromise} options={{ clientSecret }}>
        <AddressForm/>
        <CheckoutForm 
          setCartItemTotal={setCartItemTotal} 
          orderId={orderId} 
          setUserOrderProducts={setUserOrderProducts}
          cartTotal={cartTotal} 
        />               
      </Elements>
      )}
    </div>
  );

}

export default Payments;