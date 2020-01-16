import React from 'react';
import CartSummaryItem from './cart-summary.item';

const CartSummary = props => {
  const cartArray = props.cartArray;
  let totalPrice = 0;
  if (cartArray) {
    cartArray.forEach(element => { totalPrice += parseInt(element.price, 10); });
  }
  if (!cartArray) return <h1>Your Cart Is Empty!</h1>;
  return (
    <div className="container">
      <p className="h2 my-4">My Cart</p>
      <button className="btn btn-outline-success" onClick={() => props.click('catalog', {})} >Back to Catalog</button>
      {
        cartArray.map(individual => {
          return <CartSummaryItem item={individual} key={individual.cartItemId} remove={props.remove} />;
        })
      }
      <div className="d-flex justify-content-between align-items-center my-2">
        <p className="h1"> {`Total: $${(totalPrice / 100).toFixed(2)}`} </p>
        <button className="btn btn-outline-danger" onClick={() => props.click('checkout', {})} >CheckOut</button>
      </div>
    </div>
  );
};

export default CartSummary;
