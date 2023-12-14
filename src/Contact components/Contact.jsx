import React, { useState, useContext, useEffect } from 'react';
import './Contact.css';
import { Link } from 'react-router-dom';
import { MdLocationOn } from 'react-icons/md';
import Navbar from '../Home components/Navbar/Navbar';
import Footer from '../Home components/Footer/Footer';
import { useToasts } from 'react-toast-notifications';
import { firedb } from './../firebase';
import { ApiContext } from '../Context/ApiContext';

export default function Contact() {
  const { cont } = useContext(ApiContext);
  const { addToast } = useToasts();
  const [address, setAddress] = useState('address2');
  const [values, setValues] = useState({
    name: '',
    email: '',
    mobileNumber: '',
    queryType: '',
    comments: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const submitQueryData = (e) => {
    e.preventDefault();
    firedb
      .ref(`supportQueries`)
      .push(values)
      .then((data) => {
        addToast('Submitted Successfully', {
          appearance: 'success',
        });

        setValues({
          name: '',
          email: '',
          mobileNumber: '',
          queryType: '',
          comments: '',
        });
      })
      .catch((err) => console.log('err :>> ', err));
  };

  const { name, email, comments, mobileNumber } = values;

  return (
    <>
      <Navbar />
      <div className='contact'>
        <div className='contact_top'></div>
        <div className='contact_img'>
          <div className='contact_title'>
            <p className='breadcrumbs'>
              <span className='mr-2'>
                <Link className='linkin' to='/'>
                  Home <i className='fa fa-chevron-right'></i>
                </Link>
              </span>
              <span className='abt'>
                Contact us <i className='fa fa-chevron-right'></i>
              </span>
            </p>
            <h1 className='bread'>Contact Us</h1>
          </div>
        </div>

        <div className='address'>
          <div className='add'>
            <div className='icon'>
              <i className='fa fa-compass'></i>
            </div>
            <h3 className='connect'>Address</h3>
            <div className='contact-address'>
              {/* <div
                className={
                  address === 'address1' ? 'conselectAddress' : 'conaddress-1'
                }
                onClick={() => {
                  setAddress('address1');
                }}>
                <MdLocationOn />
                Sholinganallur
              </div> */}
              <div
                className='conaddress-2'
                // className={
                //   address === 'address2' ? 'conselectAddress' : 'conaddress-2'
                // }
                // onClick={() => {
                //   setAddress('address2');
                // }}
              >
                <MdLocationOn />
                Anna Nagar
              </div>
            </div>
            {address === 'address1' ? (
              <p className='locate'>
                tour On Holidays,Workafella, Rathha Towers, Tek Meadows - A
                Block, 4th Floor, Opposite to Accenture, Sholinganallur, OMR,
                Chennai-119
              </p>
            ) : (
              <p className='locate'>
                tour On Holidays,The Hive,Level 3 VR Mall,
                <br />
                Next to Madras House(Landmark),
                <br />
                Thirumangalam, Chennai-40
              </p>
            )}
          </div>
          {cont == 'on' && (
            <div className='add'>
              <div className='icon'>
                <i className='fa fa-phone'></i>
              </div>
              <h3 className='connect'>Contact Number</h3>
              <p className='locate'>+91 91766 67761</p>
              {/* <p className='locate'>+91 97510 09500</p> */}
              {/* <p className='locate'>+91 97510 09400</p> */}
              {/* {address === 'address1' ? (
                <p className='locate'>+91 97510 09400</p>
              ) : (
                <p className='locate'>+91 97510 09500</p>
              )} */}
            </div>
          )}
          <div className='add'>
            <div className='icon'>
              <i className='fa fa-envelope'></i>
            </div>
            <h3 className='connect'>Email Address</h3>
            <p className='locate'>hello@touron.in</p>
          </div>
        </div>

        <div className='contact_info'>
          <div className='box'>
            <h2>Get in Touch</h2>
            <form>
              <div className='inputBox'>
                <input
                  value={name}
                  type='text'
                  name='name'
                  required='name'
                  onChange={handleChange}
                />
                <label>Name</label>
              </div>
              <div className='inputBox'>
                <input
                  value={email}
                  type='text'
                  name='email'
                  required='email'
                  onChange={handleChange}
                />
                <label>Email</label>
              </div>
              <div className='inputBox'>
                <input
                  value={mobileNumber}
                  type='text'
                  name='mobileNumber'
                  required='number'
                  onChange={handleChange}
                />
                <label>Mobile number</label>
              </div>
              <div className='inputBox'>
                <textarea
                  value={comments}
                  required='comments'
                  name='comments'
                  onChange={handleChange}
                />
                <label>Message</label>
              </div>
              <button className='bt' onClick={submitQueryData}>
                Send Message
              </button>
            </form>
          </div>
        </div>

        {/* <div className="mapping">
        <GMaps />
      </div> */}
      </div>
      <Footer />
    </>
  );
}
