import React from "react";
import "./Cart.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

const Cart = (props) => {
  const { cart, children } = props;

  // calculation
  let total = 0;
  let totalShipping = 0;
  let quantity = 0;
  for (const product of cart) {
    // solution-1
    // product.quantity = product.quantity || 1;

    // solution-2
    /* if (product.quantity === 0) {
      product.quantity = 1;
    } */

    total += product.price * product.quantity;
    totalShipping += product.shipping;
    quantity = quantity + product.quantity;
  }
  const tax = (total * 7) / 100;
  const grandTotal = total + totalShipping + tax;

  return (
    <div className="cart-container">
      <h1 className="font-bold text-center">Order Summary</h1>
      <h1>Selected items: {quantity}</h1>
      <h1>Total Price: {total}</h1>
      <h1>Total Shipping Charge: {totalShipping}</h1>
      <h1>Tax: {tax.toFixed(2)}</h1>
      <h1 className="font-bold text-1xl">
        Grand Total: {grandTotal.toFixed(2)}
      </h1>
      <button onClick={props.clearCartBtn} className='clear-cart'>
        <span>Clear Cart</span>
        <FontAwesomeIcon icon={faTrash} />
      </button>
      {children}
    </div>
  );
};

export default Cart;
