import React from "react";
import { AddressElement } from "@stripe/react-stripe-js";

const AddressForm = () => {

  return (
    <form className="paymentForm">
      <h3 className="paymentHeaders">Delivery Address</h3>
      <AddressElement options={{mode: 'shipping'}} />
    </form>
  );
};

export default AddressForm;