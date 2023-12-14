import React from 'react';
import Checked from './Checked';
import './Tourtype.css';

const Travelmode = ({
  travelMode,
  imgSrc1,
  imgSrc2,
  name1,
  setTrain,
  setFlight,
  name2,
  prevStep,
  step,
  nextStep,
  submitData,
}) => {
  return (
    <div className='travelmode'>
      <h5>It’s all about the journey! Select your preferred mode of travel</h5>
      <div className='tour-type'>
        <div
          className={
            travelMode === name1 ? 'domestic-selected domestic' : 'domestic'
          }
          onClick={() => setTrain()}>
          <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
            {travelMode === name1 ? <Checked /> : null}
          </div>
          <img src={imgSrc1} alt='' />
          <h6>{name1}</h6>
        </div>
        <div
          className={
            travelMode === name2
              ? 'international-selected international'
              : 'international'
          }
          onClick={() => setFlight()}>
          <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
            {travelMode === name2 ? <Checked /> : null}
          </div>
          <img
            src='https://image.freepik.com/free-vector/boeing-plane-illustration_138676-2405.jpg'
            alt=''
            className='travelmode-image'
          />
          <h6>{name2}</h6>
        </div>
      </div>
      <div>
        <div className='navigation_btn'>
          <>
            <button className='previous-button' onClick={() => prevStep()}>
              Previous
            </button>
            {travelMode === '' ? (
              <button
                disabled
                style={{ color: '#c1c1c1' }}
                className='next-button'
                onClick={() => nextStep()}>
                Next
              </button>
            ) : (
              <button className='next-button' onClick={() => nextStep()}>
                Next
              </button>
            )}
          </>
        </div>
      </div>
    </div>
  );
};

export default Travelmode;
