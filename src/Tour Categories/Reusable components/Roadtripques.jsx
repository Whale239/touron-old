import React from 'react';
import './Roadtripques1.css';

const Roadtripques = ({
  imgSrc,
  attr1,
  attr2,
  attr3,
  que1,
  que2,
  que3,
  func1,
  func2,
  nextStep,
  prevStep,
  func3,
  placeholder1,
  placeholder2,
  placeholder3,
}) => {
  // const [error, setError] = useState(true);

  return (
    <div className='destination-container'>
      {/* <img className={className} src={imgSrc} alt="" /> */}
      <div className='destination-questions'>
        <div className='que1'>
          <h6>{que1}</h6>
          <input
            type='text'
            onChange={(e) => func1(e.target.value)}
            value={attr1}
            placeholder={placeholder1}
          />
        </div>
        <div className='que2'>
          <h6>{que2}</h6>

          <input
            type='text'
            onChange={(e) => func2(e.target.value)}
            value={attr2}
            placeholder={placeholder2}
          />
        </div>
        <div className='que3'>
          <h6>{que3}</h6>
          <input
            type='text'
            onChange={(e) => {
              func3(e.target.value);
            }}
            value={attr3}
            placeholder={placeholder3}
          />
        </div>
      </div>
      <div className='navigation_btn'>
        <>
          <button className='previous-button' onClick={prevStep}>
            Previous
          </button>
          {attr3 !== '' ? (
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
      </div>
    </div>
  );
};

export default Roadtripques;
