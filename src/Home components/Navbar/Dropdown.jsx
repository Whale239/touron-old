import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Dropdown.css';
import { MenuItems } from './MenuItems';

const Dropdown = () => {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);

  return (
    <>
      <ul
        onClick={handleClick}
        className={click ? 'dropdowns-menu clicked' : 'dropdowns-menu'}>
        {MenuItems.map((item, index) => {
          return (
            <li key={index}>
              <Link
                to={item.path}
                className={item.className}
                onClick={() => setClick(false)}>
                {item.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default Dropdown;
