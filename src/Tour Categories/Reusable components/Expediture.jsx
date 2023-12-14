import React from 'react';
import './Expediture.css';

const Expediture = ({
  expediture1,
  expediture2,
  expediture3,
  startPoint,
  setStartPoint,
  prevStep,
  nextStep,
  setExpediture1,
  setExpediture2,
  setExpediture3,
}) => {
  return (
    <div className='destination-container'>
      {/* <img className="expediture-img" src={imgSrc} alt="" /> */}
      <h4>Enter your last three expedition(journey's)</h4>

      <div className='destination-questionss'>
        <div>
          <div className='que1'>
            <h6>Expedition 1</h6>
            <input
              type='text'
              onChange={(e) => {
                setExpediture1(e.target.value);
              }}
              value={expediture1}
            />
          </div>
          <div className='que2'>
            <h6>Expedition 2</h6>

            <input
              type='text'
              onChange={(e) => {
                setExpediture2(e.target.value);
              }}
              value={expediture2}
            />
          </div>
        </div>
        <div>
          <div className='que3'>
            <h6>Expedition 3</h6>
            <input
              type='text'
              onChange={(e) => {
                setExpediture3(e.target.value);
              }}
              value={expediture3}
            />
          </div>
          <div className='que3'>
            <h6>Start Point</h6>
            <input
              type='text'
              onChange={(e) => {
                setStartPoint(e.target.value);
              }}
              value={startPoint}
            />
          </div>
        </div>
      </div>
      <div className='navigation_btn '>
        <>
          <button className='previous-button' onClick={prevStep}>
            Previous
          </button>

          {expediture1 !== '' &&
          expediture2 !== '' &&
          expediture3 !== '' &&
          startPoint !== '' ? (
            <button className='next-button' onClick={() => nextStep()}>
              Next
            </button>
          ) : (
            <button
              disabled
              style={{ color: '#c1c1c1' }}
              className='next-button'
              onClick={() => nextStep()}>
              Next
            </button>
          )}
        </>
      </div>
    </div>
  );
};

export default Expediture;
