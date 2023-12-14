import React from 'react';
import './LoaderAni.css';

const LoaderAni = () => {
  return (
    <div className='circleBack'>
      <div className='circleAni'></div>
      <div>
        <h3> Loading...</h3>
      </div>
    </div>
  );
};

export default LoaderAni;
