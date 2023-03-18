/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';


const CompletedOrderDetail = ({closedOrderDetails, setViewDetails}) => {
  console.log('closeOrderDetails :>> ', closedOrderDetails);
  const orderProducts = closedOrderDetails.products

  let orderSum = 0
  if(orderProducts){
    orderProducts.map((item) => 
      orderSum += item.checkoutPrice*item.quantity
    )
  }
  let taxes = orderSum*.05
      

  return (
    <div>
      <div className='mainCartPage'>
        <h3 className='cartPageTitle' >Order from {closedOrderDetails.checkoutDate}</h3>
        <button className='returnBtn' onClick={() => setViewDetails(false)} ><FontAwesomeIcon className='arrow' icon={faArrowLeft}/>&nbsp;Return to history </button>
        <div className='cartDetailsCtr'>
          <div className='cartProductsOutsideCtr'>
          <h3 className="cartProductsCtrTitle">Products</h3>
            <div className="cartProductsCtr">
              {orderProducts.map((item) => (<div className='cartProductCtr'>
                <div key={item.id}>
                  <div className='cartProductCtrTop'>
                    <Link to={`/products/${item.id}`}>
                      <p className='cartProdTitle'>{item.name}<span className ='itemPrice'> - ${item.checkoutPrice} each</span></p>
                    </Link>
                  </div>  
                  <div className='cartQtyTotalCtr'>
                    <div className='cartQtyCtr'>
                      <h4 className='cartQtyTitle'>Quantity {item.quantity}</h4>
                    </div>
                    <h4 className='cartProdTotal'>${(item.checkoutPrice*item.quantity).toFixed(2)}</h4>
                  </div>
                </div>
              </div>))}
            </div>  
          </div>
          <div>  
            <div className="checkoutDetailsCtr">
              <h3 className="cartCheckoutDetailsCtrTitle">Order Details</h3>
              <h3 className='sumTotal'>Products Total: ${orderSum.toFixed(2)}</h3>
              <h3 className='shippingCharge'>Delivery Fee: $5.99</h3>
              <h3 className='taxes'>Taxes: ${taxes.toFixed(2)}</h3>
              <h3 className='orderTotal'>Order Total: ${(orderSum+taxes+5.99).toFixed(2)}</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompletedOrderDetail;