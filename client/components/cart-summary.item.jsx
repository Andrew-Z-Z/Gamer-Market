import React from 'react';

const CartSummaryItem = props => {
  const item = props.item;
  return (
    <div className="card cart-card my-2" >
      <div className="row no-gutters">
        <div className="col-6 card-left">
          <img src={item.image} alt={item.name} className="cover" />
        </div>
        <div className="col-6">
          <div className="card-body">
            <h5 className="card-title"> {item.name} </h5>
            <p className="card-text h4"> {'$' + (item.price / 100).toFixed(2)} </p>
            <p className="card-te"> {item.shortDescription} </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartSummaryItem;
