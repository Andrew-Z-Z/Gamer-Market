import React from 'react';

const ProductListItem = props => {
  const products = props.items;
  return (
    <div className="row row-cols-3" >
      {
        products.map(product =>
          <div className="col-lg-4 col-md-6 mb-4 cursor" key={product.name} >
            <div className="card border-secondary" onClick={() => props.click('details', { productId: product.productId })}>
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
