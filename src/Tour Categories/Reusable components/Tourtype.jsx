import React from 'react';
import Checked from './Checked';
import './Tourtype.css';
import Domestic from '../../assests/planned-tour/india.png';
import International from '../../assests/planned-tour/International.png';

const Tourtype = ({
  tourType,
  setTourType,
  nextStep,
  prevStep,
  step,
  submitData,
}) => {
  return (
    <div className='tourtype'>
      <h5>Pick the type of tour! </h5>
      <div className='tour-type'>
        <div
          className={
            tourType === 'Domestic' ? 'domestic-selected domestic' : 'domestic'
          }
          onClick={() => setTourType('Domestic')}>
          <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
            {tourType === 'Domestic' ? <Checked /> : null}
          </div>
          <img src={Domestic} alt='' />
          <h6>Domestic</h6>
        </div>
        <div
          className={
            tourType === 'International'
              ? 'international-selected international'
              : 'international'
          }
          onClick={() => setTourType('International')}>
          <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
            {tourType === 'International' ? <Checked /> : null}
          </div>
          <img src={International} alt='' />
          <h6>International</h6>
        </div>
      </div>
      <div>
        <div className='navigation_btn'>
          <>
            <button className='previous-button' onClick={() => prevStep()}>
              Previous
            </button>
            {tourType === '' ? (
              <button
                disabled
                className='next-button'
                style={{ color: '#c1c1c1' }}
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

export default Tourtype;
