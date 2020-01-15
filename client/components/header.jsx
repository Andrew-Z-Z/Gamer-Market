import React from 'react';

const Header = props => {
  const property = 'h5 m-2';
  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between text-white bg-dark">
        <p className={property}>
        $Wicked Sales
        </p>
        <p className={property}>
          {
          `${props.cartItemCount} Items `
          }
          <i className="fas fa-shopping-cart"></i>
        </p>
      </div>
    </div>
  );
};

export default Header;
