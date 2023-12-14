import React, { useEffect } from 'react';
import './Checkout.css';
import './Destination.css';
import { Ripple } from 'react-spinners-css';
import { firedb } from '../../firebase';
import { isAuthenticated } from '../../Login components/auth';

const Checkout = ({
  setName,
  setBudget,
  setNumber,
  submitData,
  prevStep,
  name,
  number,
  subLoaded,
  budget,
  tourCategory,
  tourType,
}) => {
  // const { user } = isAuthenticated()
  // const getCurrentUserData = () => {
  //   firedb.ref(`userGeneralInfo/${user.uid}`).on("value", (data) => {
  //     if (data !== null) {
  //       let val = data.val()
  //       setName(val.name)
  //       setNumber(val.phoneNumber)
  //     }
  //   })
  // }

  // useEffect(() => {
  //   getCurrentUserData()
  // }, [])

  // console.log('dfsd', number);
  // console.log("dfsd", typeof(number))
  // console.log("dfsd", name !== "" && budget >= 50000 && number !== "" && number !== undefined && (number !== undefined && number.length == 10))

  const handleKeyDown = (e) => {
    if (e.key === ' ') {
      e.preventDefault();
    }
  };

  const handleKeyPress = (e) => {
    if (!/[0-9]/.test(e.key)) {
      e.preventDefault();
    }
  };

  return (
    <div className='destination-container'>
      {/* <img className="checkout-image" src={imgSrc} alt="" /> */}
      <div className='destination-questions'>
        <div className='que1'>
          <h6>Enter your Name</h6>
          <input
            type='text'
            onChange={(e) => {
              setName(e.target.value);
            }}
            value={name}
          />
        </div>
        <div className='que2'>
          <h6>Your Budget / Person</h6>
          {tourCategory === 'LuxuryTour' ? (
            <>
              {tourType === 'Domestic' ? (
                <input
                  type='number'
                  placeholder='Minimum Rs.50000'
                  onChange={(e) => {
                    setBudget(e.target.value);
                  }}
                  value={budget}
                />
              ) : (
                <input
                  type='number'
                  placeholder='Minimum Rs.75000'
                  onChange={(e) => {
                    setBudget(e.target.value);
                  }}
                  value={budget}
                />
              )}
            </>
          ) : (
            <>
              {tourType === 'Domestic' ? (
                <input
                  type='number'
                  placeholder='Minimum Rs.10000'
                  onChange={(e) => {
                    setBudget(e.target.value);
                  }}
                  value={budget}
                />
              ) : (
                <>
                  {tourCategory === 'RoadTrip' ||
                  tourCategory === 'WildlifeTour' ? (
                    <input
                      type='number'
                      placeholder='Minimum Rs.20000'
                      onChange={(e) => {
                        setBudget(e.target.value);
                      }}
                      value={budget}
                    />
                  ) : (
                    <input
                      type='number'
                      placeholder='Minimum Rs.40000'
                      onChange={(e) => {
                        setBudget(e.target.value);
                      }}
                      value={budget}
                    />
                  )}
                </>
              )}
            </>
          )}
        </div>
        <div className='que3'>
          <h6>Whatsapp Number</h6>
          <input
            type='text'
            onChange={(e) => {
              setNumber(e.target.value);
            }}
            value={number}
            maxLength='10'
            onKeyDown={handleKeyDown}
            onKeyPress={handleKeyPress}
            // onKeyPress={(event) => {
            //   if (!/[0-9]/.test(event.key)) {
            //     event.preventDefault();
            //   }
            // }}
          />
        </div>
      </div>
      <div className='navigation_btn'>
        {subLoaded ? (
          <Ripple color='coral' />
        ) : (
          <>
            <button className='previous-button' onClick={() => prevStep()}>
              Previous
            </button>
            {tourCategory === 'LuxuryTour' ? (
              <>
                {tourType === 'Domestic' ? (
                  <>
                    {name !== '' &&
                    budget >= 50000 &&
                    number !== '' &&
                    number !== undefined &&
                    number !== undefined &&
                    number.length == 10 ? (
                      <button
                        className='submit-button'
                        onClick={() => {
                          submitData();
                        }}>
                        Submit
                      </button>
                    ) : (
                      <button
                        disabled
                        className='submit-button'
                        style={{ color: '#c1c1c1' }}
                        onClick={() => {
                          submitData();
                        }}>
                        Submit
                      </button>
                    )}
                  </>
                ) : (
                  <>
                    {name !== '' &&
                    budget >= 75000 &&
                    number !== '' &&
                    number !== undefined &&
                    number !== undefined &&
                    number.length == 10 ? (
                      <button
                        className='submit-button'
                        onClick={() => {
                          submitData();
                        }}>
                        Submit
                      </button>
                    ) : (
                      <button
                        disabled
                        className='submit-button'
                        style={{ color: '#c1c1c1' }}
                        onClick={() => {
                          submitData();
                        }}>
                        Submit
                      </button>
                    )}
                  </>
                )}
              </>
            ) : (
              <>
                {tourType === 'Domestic' ? (
                  <>
                    {name !== '' &&
                    budget >= 10000 &&
                    number !== '' &&
                    number !== undefined &&
                    number !== undefined &&
                    number.length == 10 ? (
                      <button
                        className='submit-button'
                        onClick={() => {
                          submitData();
                        }}>
                        Submit
                      </button>
                    ) : (
                      <button
                        disabled
                        className='submit-button'
                        style={{ color: '#c1c1c1' }}
                        onClick={() => {
                          submitData();
                        }}>
                        Submit
                      </button>
                    )}
                  </>
                ) : (
                  <>
                    {tourCategory === 'RoadTrip' ||
                    tourCategory === 'WildlifeTour' ? (
                      <>
                        {name !== '' &&
                        budget >= 20000 &&
                        number !== '' &&
                        number !== undefined &&
                        number !== undefined &&
                        number.length == 10 ? (
                          <button
                            className='submit-button'
                            onClick={() => {
                              submitData();
                            }}>
                            Submit
                          </button>
                        ) : (
                          <button
                            disabled
                            className='submit-button'
                            style={{ color: '#c1c1c1' }}
                            onClick={() => {
                              submitData();
                            }}>
                            Submit
                          </button>
                        )}
                      </>
                    ) : (
                      <>
                        {name !== '' &&
                        budget >= 40000 &&
                        number !== '' &&
                        number !== undefined &&
                        number !== undefined &&
                        number.length == 10 ? (
                          <button
                            className='submit-button'
                            onClick={() => {
                              submitData();
                            }}>
                            Submit
                          </button>
                        ) : (
                          <button
                            disabled
                            className='submit-button'
                            style={{ color: '#c1c1c1' }}
                            onClick={() => {
                              submitData();
                            }}>
                            Submit
                          </button>
                        )}
                      </>
                    )}
                  </>
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Checkout;
