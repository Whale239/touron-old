import React from 'react';
import { Link } from 'react-router-dom';
// import errImg from "../assests/404Error.jpg";
import './NotFound.css';

const NotFound = () => {
  return (
    <div className='notfound'>
      <div>
        <h3>IT LOOKS LIKE YOU'RE LOST </h3>
      </div>
      <div className='notfoundimg'>
        {/* <img src={errImg} alt="" /> */}
        <img
          src='https://firebasestorage.googleapis.com/v0/b/touronapp-248e4.appspot.com/o/404Error.jpg?alt=media&token=33ce2bdc-998a-46e6-8b7f-257718d62043'
          alt=''
        />
      </div>
      <div>
        <Link to='/'>
          <button>Go to HomePage</button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
