import React, { useState, useContext } from 'react';
import { Popover, PopoverBody } from 'reactstrap';
import './UserDropdown.css';
import { UserMenuItems } from './UserMenuItems';
import { Link, Navigate } from 'react-router-dom';
import { signout } from '../Login components/auth';
import { ApiContext } from '../Context/ApiContext';

const Profilenav = (props) => {
  const [userDropdown, setUserDropdown] = useState(false);
  const toggle = () => setUserDropdown(!userDropdown);
  const { userInfo, employees } = useContext(ApiContext);
  console.log(`eyees`, employees);

  return (
    <div className='account-head'>
      <div className='account-title'>
        <h4>{props.title}</h4>
      </div>
      <div className='account-profile' id='Popover1'>
        <img src={userInfo.photoURL} alt='kb' />

        <h6 onClick={() => setUserDropdown(!userDropdown)}>{userInfo.name}</h6>
      </div>
      <Popover
        placement='bottom'
        isOpen={userDropdown}
        target='Popover1'
        toggle={toggle}>
        <PopoverBody>
          <ul className='user-dropdowns-menu'>
            {UserMenuItems.map((item, index) => {
              return (
                <Link
                  key={index}
                  to={item.path}
                  className={item.className}
                  onClick={() => {
                    if (item.title === 'Logout') {
                      signout(() => {
                        return <Navigate to='/' />;
                      });
                    }
                    setUserDropdown(false);
                  }}>
                  <li key={index}>{item.title}</li>
                </Link>
              );
            })}
          </ul>
        </PopoverBody>
      </Popover>
    </div>
  );
};

export default Profilenav;
