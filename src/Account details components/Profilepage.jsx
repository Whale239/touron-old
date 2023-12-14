import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ProfileSidebarData } from './ProfileSidebarData';
import './Profilepage.css';
import Logo from '../assests/logo2.png';
const Profilepage = () => {
  const [clicked, setClicked] = useState('');
  const lo = useLocation();
  useEffect(() => {
    const location = lo.pathname;
    setClicked(location);
  }, [lo.pathname]);

  return (
    <div className={'sidebar-menu'}>
      <div className='sidebar-image'>
        <img src={Logo} alt='' />
      </div>

      <ul className='sidebar-menu-items'>
        {ProfileSidebarData.map((item, index) => {
          return (
            <li
              key={index}
              onClick={() => setClicked(item.path)}
              className={
                item.path === clicked
                  ? `${item.className} clicked `
                  : `${item.className}`
              }>
              <Link to={item.path}>
                {item.icon}
                <span
                  style={{ fontFamily: 'andika' }}
                  className='sidebar-title'>
                  {item.title}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Profilepage;
