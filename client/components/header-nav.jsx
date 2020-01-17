import React from 'react';

const HeaderNav = props => {
  const listClass = 'nav-item m-2 d-flex align-items-center';
  return (
    <ul className="nav justify-content-center bg-light mt-1">
      <li className={listClass}>
        <button className="nav-link active badge badge-primary">General Catalog</button>
      </li>
      <li className={listClass}>
        <button className="nav-link badge badge-success">Hollow Knight</button>
      </li>
      <li className={listClass}>
        <button className="nav-link badge badge-success">Diablo 3</button>
      </li>
      <li className={listClass}>
        <button className="nav-link badge badge-success">Subnautica</button>
      </li>
    </ul>
  );
};

export default HeaderNav;
