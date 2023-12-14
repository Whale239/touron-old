import React from 'react';
import './TouristDate.css';
// import { enGB } from "date-fns/locale";
// import { DateRangePicker, START_DATE, END_DATE } from "react-nice-dates";
import moment from 'moment';

const TouristDate = ({
  imgSrc,
  fromDate,
  toDate,
  setFromDate,
  setToDate,
  prevStep,
  setStep,
  nextStep,
  travellerType,
}) => {
  return (
    <>
      <div className='date-range'>
        {/* <img src={imgSrc} alt="" /> */}
        <div className='date-container'>
          <div className='from-date'>
            <label>Onward</label>
            <input
              type='date'
              min={moment().add(14, 'days').format('YYYY-MM-DD')}
              onChange={(e) => setFromDate(e.target.value)}
              value={fromDate}
            />
          </div>

          <div className='to-date'>
            <label>Return</label>
            <input
              type='date'
              min={fromDate}
              max={moment(fromDate).add(30, 'days').format('YYYY-MM-DD')}
              onChange={(e) => setToDate(e.target.value)}
              value={toDate}
            />
          </div>
        </div>
        <div className='navigation_btn'>
          <>
            {travellerType === 'Solo' ? (
              <button className='previous-button' onClick={() => setStep(2)}>
                Previous
              </button>
            ) : (
              <button className='previous-button' onClick={() => prevStep()}>
                Previous
              </button>
            )}
            {fromDate === '' || toDate === '' ? (
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
    </>
  );
};

export default TouristDate;
