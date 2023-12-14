import React, { useState, useEffect } from 'react';
// import { ApiContext } from '../../Context/ApiContext';
import { NavLink } from 'react-router-dom';
import './Navbar.css';
import Logo from '../../assests/logof.png';
// import moment from 'moment';
// import { firedb } from '../../firebase';
// import { BiUserCircle } from 'react-icons/bi';
import { GrTextAlignCenter } from 'react-icons/gr';
import { RiAccountCircleFill } from 'react-icons/ri';
import Dropdown from './Dropdown';
import { isAuthenticated } from '../../Login components/auth';
const Navbar = ({ isOpen }) => {
  // const { userInfo } = useContext(ApiContext);
  // const [custDocuments, setCustDocuments] = useState([]);
  const [dropdown, setDropdown] = useState(false);
  const [navHide, setNavHide] = useState(true);
  const [clicked, setClicked] = useState(false);
  const handleClick = () => setClicked(!clicked);
  const handleNavHide = () => setNavHide(!navHide);
  const onDropdownClick = () => {
    setNavHide(false);
    setDropdown(!dropdown);
  };
  // const [date, setDate] = useState(moment(new Date()).format().slice(0, 10));

  // const upcoming = custDocuments.filter((cust) => date < cust.returnDate);

  const onNavHide = () => {
    if (window.innerWidth > 970) {
      setNavHide(true);
      setDropdown(false);
    }
    setClicked(false);
  };

  useEffect(() => {
    if (isOpen) setNavHide(false);
    if (window.innerWidth < 970) {
      setNavHide(false);
    }
  }, [isOpen]);

  // const getDocuments = () => {
  //   let doc = [];
  //   firedb.ref('bookingdetails1').on('value', (data) => {
  //     data.forEach((d) => {
  //       if (d.val()?.general?.email === userInfo?.email) {
  //         doc.push(d.val().general);
  //       }
  //     });
  //     setCustDocuments(doc);
  //   });
  // };

  // useEffect(() => {
  //   getDocuments();
  // }, [userInfo]);

  return (
    <div className='n'>
      <div className='menu-icon'>
        <GrTextAlignCenter
          onClick={handleNavHide}
          color='#ff7f00'
          className='navhide'
        />
        {isAuthenticated() && (
          <RiAccountCircleFill
            color='#ff7f00'
            style={{ fontSize: '25px' }}
            onClick={onDropdownClick}
          />
        )}
        {dropdown && <Dropdown />}
      </div>
      <nav className={navHide ? 'NavbarItems hide' : 'NavbarItems'}>
        <div className='hamburger' onClick={handleClick}>
          <i className={clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
        </div>
        <div className='navbar-logo'>
          <img src={Logo} alt='' />
        </div>

        <ul className={clicked ? 'nav-menus open' : 'nav-menus'}>
          <li>
            <NavLink
              exact
              to='/'
              className='nav-links'
              activeClassName='selected'
              onClick={onNavHide}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/about'
              className='nav-links'
              activeClassName='selected'
              onClick={onNavHide}>
              About
            </NavLink>
          </li>
          {/* <li>
            <NavLink
              to="/how-it-works"
              className="nav-links"
              activeClassName="selected"
              onClick={onNavHide}
            >
              How it Works
            </NavLink>
          </li> */}
          <li>
            <NavLink
              to='/contact'
              className='nav-links'
              activeClassName='selected'
              onClick={onNavHide}>
              Contact
            </NavLink>
          </li>
          {/* <li>
            <NavLink
              to="/destination"
              className="nav-links"
              activeClassName="selected"
              onClick={onNavHide}
            >
              Destination Guide
            </NavLink>
          </li> */}
          <li>
            <NavLink
              to='/visa'
              className='nav-links'
              activeClassName='selected'
              onClick={onNavHide}>
              Visa Request
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/blogs'
              className='nav-links'
              activeClassName='selected'
              onClick={() => {
                onNavHide();
                setNavHide(false);
              }}>
              Blogs
            </NavLink>
          </li>
          <li>
            <NavLink
              target='_blank'
              to='/storysection'
              className='nav-links'
              activeClassName='selected'
              onClick={() => {
                onNavHide();
                setNavHide(false);
              }}>
              Stories
            </NavLink>
          </li>
          <li>
            <NavLink
              target='_blank'
              to='/gaia'
              className='nav-links'
              activeClassName='selected'
              onClick={() => {
                onNavHide();
                setNavHide(false);
              }}>
              Gaia
            </NavLink>
          </li>
          {/* {upcoming.length !== 0 && (
            <li>
              <NavLink
                to="/onboard"
                className="nav-links"
                activeClassName="selected"
                onClick={() => {
                  onNavHide()
                  setNavHide(false)
                }}
              >
                OnBoard
              </NavLink>
            </li>
          )} */}

          {!isAuthenticated() && (
            <li>
              <NavLink
                to='/login'
                className='nav-links'
                activeClassName='selected'
                onClick={onNavHide}>
                Login/SignUp
              </NavLink>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
