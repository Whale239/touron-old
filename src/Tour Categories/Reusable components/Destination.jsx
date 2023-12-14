import React, { useState } from 'react';
import './Destination.css';
const Destination = ({
  destination,
  startPoint,
  preferanece,
  setDestination,
  setPreferanece,
  nextStep,
  prevStep,
  setStartPoint,
  tourType,
  typeee,
}) => {
  const [open, setOpen] = useState(false);

  let international = [
    'Turkey',
    'Indonesia',
    'Dubai',
    'Maldives',
    'Vietnam',
    'Australia',
    'Thailand',
    'Singapore',
    'Malaysia',
    'Cambodia',
    'New Zealand',
    'Bhutan',
    'Nepal',
    'Abu dhabi',
    'Saudi Arabia',
    'Africa',
    'Sri Lanka',
    'Europe',
    'United Kingdom',
    'Mauritius',
    'Seychelles',
    'Hong Kong',
    'Fiji',
    'Russia',
    'Egypt',
    'Jordan',
  ];
  let domestic = [
    'Kashmir',
    'Himachal Pradesh',
    'Arunachal pradesh',
    'Rajasthan',
    'Meghalaya',
    'Sikkim',
    'Kerala',
    'Karnataka',
    'Goa',
    'Uttarkhand',
    'Andaman Islands',
  ];
  return (
    <div className='destination-container'>
      {/* <img className="destination-img" src={imgSrc} alt="" /> */}
      <div className='destination-questions checkout'>
        <div className='que1'>
          <h6>Enter the holiday destination you want to travel</h6>
          {typeee === 'Wildlife' ? (
            <input
              type='text'
              onChange={(e) => setDestination(e.target.value)}
              value={destination}
              readOnly
              className='user-input-alter user-input'
            />
          ) : (
            <div className='select_in_alter'>
              <div onClick={() => setOpen(true)} style={{ cursor: 'pointer' }}>
                {destination === '' ? 'Select' : destination}
              </div>
              {open && (
                <div className='select_in_alter__ab'>
                  {tourType === 'Domestic' ? (
                    <>
                      {domestic.map((d) => (
                        <div
                          onClick={() => {
                            setDestination(d);
                            setOpen(false);
                          }}>
                          {d}
                        </div>
                      ))}
                    </>
                  ) : (
                    <>
                      {international.map((d) => (
                        <div
                          onClick={() => {
                            setDestination(d);
                            setOpen(false);
                          }}>
                          {d}
                        </div>
                      ))}
                    </>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
        <div className='que2'>
          <h6>From where would you like to start your journey </h6>

          <input
            type='text'
            onChange={(e) => {
              setStartPoint(e.target.value);
            }}
            value={startPoint}
            className='user-input-alter user-input'
          />
        </div>
        <div className='que3'>
          <h6>Your preferences when you travel (Optional):</h6>
          <input
            type='text'
            onChange={(e) => setPreferanece(e.target.value)}
            value={preferanece}
            className='user-input-alter user-input'
          />
        </div>
      </div>
      <div className='navigation_btn'>
        <>
          <button
            className='previous-button'
            onClick={() => {
              prevStep();
              setDestination('');
              setOpen(false);
            }}>
            Previous
          </button>
          {destination !== '' && startPoint !== '' ? (
            <button className='next-button' onClick={() => nextStep()}>
              Next
            </button>
          ) : (
            <button
              disabled
              className='next-button'
              style={{ color: '#c1c1c1' }}
              onClick={() => nextStep()}>
              Next
            </button>
          )}
        </>
      </div>
    </div>
  );
};

export default Destination;
