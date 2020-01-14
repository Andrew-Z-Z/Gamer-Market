import React from 'react';

const ProductListItem = props => {
  const products = props.items;
  return (
    <div className="row row-cols-3">
      {
        products.map(product =>
          <div className="col-4 mb-4" key={product.name}>
            <div className="card border-secondary">
              <div className="card-top mt-1">
                <img src={product.image} alt={product.name} className="fill card-img-top" />
              </div>
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <div className="card-text">
                  <p>{'$' + (product.price / 100).toFixed(2)}</p>
                  <p>{product.shortDescription}</p>
                </div>
              </div>
            </div>
          </div >
        )}
    </div >
  );
};

export default ProductListItem;
