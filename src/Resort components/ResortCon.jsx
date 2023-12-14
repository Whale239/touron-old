import React from 'react';
import { Link } from 'react-router-dom';
import './ResortCon.css';

const ResortCon = () => {
  return (
    <div className='ResortConMain'>
      <Link to='/resorts'>
        <button className='ResortConMain_btn'>View</button>
      </Link>
    </div>
  );
};

export default ResortCon;
