import React from 'react';
import './VirtualHome.css';
import { Link } from 'react-router-dom';

const VirtualHome = () => {
  return (
    <div className='virtualHome'>
      <div>
        <h1>Explore our Trial Room</h1>
      </div>
      <div>
        <Link to='/virtualtrialroom'>
          <button>Book Appointment</button>
        </Link>
      </div>
    </div>
  );
};

export default VirtualHome;
