import React from 'react';

const ProductListItem = props => {
  const price = props.item.price;
  return (
    <div className="container-fluid col-3 border border-dark d-flex flex-column justify-content-around m-2 bg-white">
      <div className="row">
        <img src={props.item.image} alt={props.item.name} className="img-fluid" />
      </div>
      <div className="d-flex flex-column row mx-1">
        <p className="h6">{props.item.name}</p>
        <p>{'$' + (price / 100).toFixed(2)}</p>
        <p>{props.item.shortDescription}</p>
      </div>
    </div>
  );
};

export default ProductListItem;
