import React from 'react';
import './Touristnumber.css';

const Touristnumber = ({
  imgSrc1,
  imgSrc2,
  nextStep,
  prevStep,
  adult,
  children,
  setAdult,
  setChildren,
  step,
  submitData,
}) => {
  return (
    <div className='tourist-container'>
      <div style={{ display: 'flex' }}>
        <div className='adult'>
          <div className='tourist-category'>
            <label>Adult</label>
          </div>
          <img src={imgSrc1} alt='adult' />
          <div className='tourist-func'>
            <button
              className='decrement'
              onClick={() => {
                if (adult !== 0) setAdult(adult - 1);
              }}>
              -
            </button>
            <input type='text' value={adult} className='numbers' />
            <button className='increment' onClick={() => setAdult(adult + 1)}>
              +
            </button>
          </div>
        </div>
        <div className='child'>
          <div className='tourist-category'>
            <label>Child</label>
          </div>
          <img src={imgSrc2} alt='child' />

          <div className='tourist-func'>
            <button
              className='decrement'
              onClick={() => {
                if (children !== 0) setChildren(children - 1);
              }}>
              -
            </button>
            <input type='text' value={children} className='numbers' />
            <button
              className='increment'
              onClick={() => setChildren(children + 1)}>
              +
            </button>
          </div>
        </div>
      </div>
      <div className='navigation_btn'>
        <>
          <button className='previous-button' onClick={() => prevStep()}>
            Previous
          </button>
          {adult === 0 ? (
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
  );
};

export default Touristnumber;
