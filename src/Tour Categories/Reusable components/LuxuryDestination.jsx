import React from 'react';
import './Destination.css';

import { Input } from 'reactstrap';
const LuxuryDestination = ({
  imgSrc,
  destination,
  startPoint,
  preferanece,
  setDestination,
  setPreferanece,
  setStartPoint,
}) => {
  return (
    <div className='destination-container'>
      {/* <img className="destination-img" src={imgSrc} alt="" /> */}
      <div className='destination-questions'>
        <div className='que2 qes2'>
          <h6>Enter the holiday destination you want to travel</h6>
          <Input
            type='text'
            className='luxury-dest'
            onChange={(e) => setDestination(e.target.value)}
            value={destination}
            placeholder='Select country'
          />
        </div>
        <div className='que2'>
          <h6>From where would you like to start your journey </h6>

          <input
            type='text'
            onChange={(e) => setStartPoint(e.target.value)}
            value={startPoint}
          />
        </div>
        <div className='que3'>
          <h6>Your preferences when you travel (Optional):</h6>
          <input
            type='text'
            onChange={(e) => setPreferanece(e.target.value)}
            value={preferanece}
          />
        </div>
      </div>
    </div>
  );
};

export default LuxuryDestination;
