import React from 'react';
import HeaderNav from './header-nav';

const Header = props => {
  const property = 'h5 m-2';
  return (
    <div className="container-fluid mb-4">
      <div className="d-flex justify-content-between text-white bg-dark">
        <p className={property}>
        $Wicked Sales
        </p>
        <p className={property + ' cursor'} onClick={() => props.click('cart', {})} >
          {
          `${props.cartItemCount} Items `
          }
          <i className="fas fa-shopping-cart"></i>
        </p>
      </div>
      <div className="navigation-bar" >
        <HeaderNav />
      </div>
    </div>
  );
};

export default Header;
