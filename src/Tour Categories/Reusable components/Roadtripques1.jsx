import React from 'react';
import './Roadtripques1.css';
import { Input } from 'reactstrap';

const Roadtripques1 = ({
  imgSrc,
  attr1,
  attr2,
  attr3,
  que1,
  que2,
  que3,
  func1,
  func2,
  func3,
  placeholder1,
  placeholder2,
  placeholder3,
  driveType,
  driverType,
  setRent,
  setOwned,
  setSelf,
  setDriver,
  className,
  prevStep,
  nextStep,
}) => {
  return (
    <div className='destination-container'>
      {/* <img className={className} src={imgSrc} alt="" /> */}
      <div className='destination-questions'>
        <div className='que1 qes1'>
          <h6>{que1}</h6>
          <input
            type='text'
            onChange={(e) => func1(e.target.value)}
            value={attr1}
            placeholder={placeholder1}
          />
        </div>
        <div className='que2 qes1'>
          <h6>{que2}</h6>

          <Input
            type='select'
            onChange={(e) => func2(e.target.value)}
            value={attr2}
            placeholder={placeholder2}>
            <option value='Yes'>Yes</option>
            <option value='No'>No</option>
          </Input>
        </div>
        <div className='que3 qes1'>
          <h6>{que3}</h6>
          <input
            type='text'
            onChange={(e) => func3(e.target.value)}
            value={attr3}
            placeholder={placeholder3}
          />
        </div>
        {attr2 === 'No' ? null : (
          <div className='que3'>
            <div>
              <h6>Would you like to have car or bike? </h6>
              <div className='radioButtons'>
                <div>
                  <input
                    type='radio'
                    className='radio1'
                    value={driveType}
                    checked={driveType === 'Rented Bike/Car' ? true : false}
                    onClick={setRent}
                  />
                  <label>Rented </label>
                </div>
                <div>
                  <input
                    type='radio'
                    className='radio1'
                    value={driveType}
                    checked={driveType === 'Own Bike/Car' ? true : false}
                    onClick={setOwned}
                  />
                  <label>Own </label>
                </div>
              </div>
            </div>
            <div>
              <h6>Would you like to have car or bike? </h6>
              <div className='radioButtons'>
                <div>
                  <input
                    type='radio'
                    className='radio1'
                    value={driverType}
                    checked={driverType === 'Self Drive' ? true : false}
                    onClick={setSelf}
                  />
                  <label>Self Drive</label>
                </div>
                <div>
                  <input
                    type='radio'
                    className='radio1'
                    value={driverType}
                    checked={driverType === 'Car Driver needed' ? true : false}
                    onClick={setDriver}
                  />
                  <label>Driver Needed</label>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className='navigation_btn'>
        <>
          <button className='previous-button' onClick={prevStep}>
            Previous
          </button>
          {attr1 !== '' && attr2 !== '' ? (
            <>
              {attr2 === 'No' ? (
                <button className='next-button' onClick={nextStep}>
                  Next
                </button>
              ) : (
                <>
                  {attr2 === 'Yes' && driveType !== '' && driverType !== '' ? (
                    <button className='next-button' onClick={nextStep}>
                      Next
                    </button>
                  ) : (
                    <button
                      disabled
                      style={{ color: '#c1c1c1' }}
                      className='next-button'
                      onClick={nextStep}>
                      Next
                    </button>
                  )}
                </>
              )}
            </>
          ) : (
            <button
              disabled
              style={{ color: '#c1c1c1' }}
              className='next-button'
              onClick={nextStep}>
              Next
            </button>
          )}
        </>
      </div>
    </div>
  );
};

export default Roadtripques1;
