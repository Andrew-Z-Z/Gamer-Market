import React from 'react';
import CartSummaryItem from './cart-summary.item';

const CartSummary = props => {
  const cartArray = props.cartArray;
  let totalPrice = 0;
  if (cartArray) {
    cartArray.forEach(element => { totalPrice += parseInt((element.price / 100).toFixed(2), 10); });
  }
  if (!cartArray) return <h1>Your Cart Is Empty!</h1>;
  return (
    <div className="container">
      <p className="h2 my-4">My Cart</p>
      <button className="btn btn-outline-success mb-4" onClick={() => props.click('catalog', { params: {} })} >Back to Catalog</button>
      {
        cartArray.map(individual => {
          return <CartSummaryItem item={individual} key={individual.cartItemId} />;
        })
      }
      <p className="my-4 h2"> {`Item Total $${totalPrice}`} </p>
    </div>
  );
};

export default CartSummary;
