import React from 'react';
import './Play.css';
import { Link } from 'react-router-dom';

const Play = () => {
  return (
    <div className='play'>
      <div>
        <h1>Explore with Gaia</h1>
      </div>
      <div>
        <Link to='/gaia' target='_blank'>
          <button>Play and Learn!</button>
        </Link>
      </div>
    </div>
  );
};

export default Play;
