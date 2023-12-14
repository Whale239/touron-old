import React, { useState, useContext } from 'react';
import './Footer.css';
import { NavLink, Link } from 'react-router-dom';
import InstagramIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import MailIcon from '@material-ui/icons/Mail';
import { MdLocationOn } from 'react-icons/md';
import { isAuthenticated } from '../../Login components/auth';
import playStore from '../../assests/playStore.png';
import appStore from '../../assests/appStore.png';
import { ApiContext } from '../../Context/ApiContext';

const Footer = () => {
  const [address, setAddress] = useState('address2');
  const { cont } = useContext(ApiContext);

  return (
    <>
      <div className='footer nfhide'>
        <div className='footnav'>
          <div className='navigations'>
            <ul className='footnav-area'>
              <li className='footnav-items'>
                <NavLink
                  exact
                  to='/'
                  className='footnav-links'
                  activeClassName='selected'>
                  Home
                </NavLink>
              </li>
              <li className='footnav-items'>
                <NavLink
                  to='/about'
                  className='footnav-links'
                  activeClassName='selected'>
                  About
                </NavLink>
              </li>
              {/* <li className="footnav-items">
                <NavLink
                  to="/how-it-works"
                  className="footnav-links"
                  activeClassName="selected"
                >
                  How it Works
                </NavLink>
              </li> */}
              <li className='footnav-items'>
                <NavLink
                  to='/contact'
                  className='footnav-links'
                  activeClassName='selected'>
                  Contact
                </NavLink>
              </li>
              {/* <li className="footnav-items">
                <NavLink
                  to="/destination"
                  className="footnav-links"
                  activeClassName="selected"
                >
                  Destination Guide
                </NavLink>
              </li> */}
              <li className='footnav-items'>
                <NavLink
                  to='/visa'
                  className='footnav-links'
                  activeClassName='selected'>
                  Visa Request
                </NavLink>
              </li>
              <li className='footnav-items'>
                <NavLink
                  to='/blogs'
                  className='footnav-links'
                  activeClassName='selected'>
                  Blogs
                </NavLink>
              </li>
              <li className='footnav-items'>
                <NavLink
                  target='_blank'
                  to='/gaia'
                  className='footnav-links'
                  activeClassName='selected'>
                  Gaia
                </NavLink>
              </li>

              {!isAuthenticated() && (
                <li className='footnav-items'>
                  <NavLink
                    to='/login'
                    className='footnav-links'
                    activeClassName='selected'>
                    Login/SignUp
                  </NavLink>
                </li>
              )}
              {/* {isAuthenticated && (
                <li className="footnav-items">
                  <span
                    className="signoutSpan"
                    onClick={() => {
                      signout(() => {
                        history.push("/");
                      });
                    }}
                  >
                    Signout
                  </span>
                </li>
              )} */}
            </ul>
          </div>
          <div className='social-icons'>
            <div className='icons'>
              <p>
                <a
                  href='https://www.instagram.com/touronholidays/'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='instagram'>
                  <InstagramIcon />
                </a>
              </p>
              <p>
                <a
                  href='https://www.facebook.com/touronholidays/'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='facebook'>
                  <FacebookIcon />
                </a>
              </p>
              <p>
                <a
                  href='https://www.twitter.com/touronholidays/'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='twitter'>
                  <TwitterIcon />
                </a>
              </p>
              <p>
                <a
                  href='mailto:hello@touron.in'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='mail'>
                  <MailIcon />
                </a>
              </p>
            </div>
          </div>
        </div>
        <div className='footer-section'>
          <div className='book-now'>
            <div className='tour-types'>
              <ul style={{ listStyle: 'none' }}>
                <li>
                  <Link className='link' to='/luxury-tour'>
                    <p>Luxury Tour</p>
                  </Link>
                </li>
                <li>
                  <Link className='link' to='/honeymoon-tour'>
                    <p>Honeymoon Tour</p>
                  </Link>
                </li>
                <li>
                  <Link className='link' to='/planned-tour'>
                    <p>Planned Tour</p>
                  </Link>
                </li>
                <li>
                  <Link className='link' to='/surprise-tour'>
                    <p>Surprise Tour</p>
                  </Link>
                </li>
                <li>
                  <Link className='link' to='/wildlife-tour'>
                    <p>Wildlife Tour</p>
                  </Link>
                </li>
                <li>
                  <Link className='link' to='/roadtrip-tour'>
                    <p>Road Trip</p>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className='quick-links'>
            <div className='links'>
              <ul style={{ listStyle: 'none' }}>
                {/* <li>
                  <Link className="link" to="">
                    <p>How it works</p>
                  </Link>
                </li> */}
                <li>
                  <Link className='link' to='/termsCondition'>
                    <p>Terms & condition</p>
                  </Link>
                </li>
                <li>
                  <Link className='link' to='/blogs'>
                    <p>Blog</p>
                  </Link>
                </li>
                <li>
                  <Link className='link' to='/privacypolicy'>
                    <p>Privacy Policy</p>
                  </Link>
                </li>
                {/* <li>
                  <Link className="link" to="/destination">
                    <p>Destination Guide</p>
                  </Link>
                </li> */}
              </ul>
            </div>
          </div>
          {/* <div className="tour-ideas">
            <div className="ideas">
              <ul style={{ listStyle: "none" }}>
                <li>
                  <Link className="link" to="">
                    <p>Asia</p>
                  </Link>
                </li>
                <li>
                  <Link className="link" to="">
                    <p>Africa</p>
                  </Link>
                </li>
                <li>
                  <Link className="link" to="">
                    <p>Middle East</p>
                  </Link>
                </li>
                <li>
                  <Link className="link" to="">
                    <p>Oceania</p>
                  </Link>
                </li>
                <li>
                  <Link className="link" to="">
                    <p>Indian Ocean</p>
                  </Link>
                </li>
                <li>
                  <Link className="link" to="">
                    <p>Europe</p>
                  </Link>
                </li>
                <li>
                  <Link className="link" to="">
                    <p>Caribbean</p>
                  </Link>
                </li>
              </ul>
            </div>
          </div> */}

          <div className='magazine'>
            <div className='magContent'>
              <p>Featured on</p>
            </div>
            <div className='magLink'>
              <a
                href='https://startup.siliconindia.com/vendor/tour-on-the-best-vacation-planners-cid-15137.html'
                target='_blank'
                rel='noopener noreferrer'>
                <div className='silicon'>
                  <img
                    src='https://www.siliconindia.com/images/simag_images/images/startupcity-logo.jpg'
                    alt='siliconImg'
                    rel='noopener noreferrer'
                  />
                </div>
              </a>
            </div>
          </div>

          <div className='mobileStore'>
            <div className='storeContent'>
              <p>See us in action here!</p>
            </div>
            <div className='dualStore'>
              <a
                href='https://play.google.com/store/apps/details?id=com.touron.travelapp'
                target='_blank'
                rel='noopener noreferrer'>
                <div className='playStore'>
                  <img src={playStore} alt='playStore' />
                </div>
              </a>
              <a
                href='https://apps.apple.com/in/app/tour-on/id1544389334'
                target='_blank'
                rel='noopener noreferrer'>
                <div className='appStore'>
                  <img src={appStore} alt='appStore' />
                </div>
              </a>
            </div>
          </div>

          <div className='contact'>
            <div className='contact-section'>
              <div className='_title'>Contact us</div>
              <div className='footer-address'>
                {/* <div
                  className={
                    address === 'address1' ? 'selectAddress' : 'address-1'
                  }
                  onClick={() => {
                    setAddress('address1');
                  }}>
                  <MdLocationOn />
                  Sholinganallur
                </div> */}
                <div
                  className={
                    address === 'address2' ? 'selectAddress' : 'address-2'
                  }
                  // onClick={() => {
                  //   setAddress('address2');
                  // }}
                >
                  <MdLocationOn />
                  Anna Nagar
                </div>
              </div>
              <div className='footer_address'>
                {address === 'address1' ? (
                  <>
                    <p>
                      <span>Address:</span>
                      <span> </span>
                      tour On
                    </p>
                    <p>Workafella, Rathha Towers,</p>
                    <p>Tek Meadows - A Block, 4th Floor,</p>
                    <p>Opposite to Accenture, Sholinganallur,</p>
                    <p>OMR, Chennai-119</p>
                    {cont == 'on' && (
                      <p>
                        <span>Phone:</span>
                        <span> </span> +91 97510 09400
                      </p>
                    )}
                  </>
                ) : (
                  <>
                    <p>
                      <span>Address:</span>
                      <span> </span>
                      tour On
                    </p>
                    <p>The Hive,</p>
                    <p>Level 3 VR Mall,</p>
                    <p> Next to Madras House(Landmark),</p>
                    <p>Thirumangalam,Chennai-40</p>
                    {cont == 'on' && (
                      <p>
                        <span>Phone:</span>
                        <span> </span>
                        {/* +91 97510 09500, 97510 09400 */}
                        +91 91766 67761
                      </p>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className='copyrights'>
          <p className='text-center'>
            &copy; 2020 <span>tour On</span> (A Brand of Lotsatravel Holiday
            LLP) | All rights reserved.
          </p>
        </div>
      </div>
    </>
  );
};

export default Footer;
