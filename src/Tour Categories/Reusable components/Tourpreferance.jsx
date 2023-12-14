import React from 'react';
import Checked from './Checked';
import './Tourpreferance.css';

const Tourpreference = ({
  imgSrc1,
  imgSrc2,
  imgSrc3,
  imgSrc4,
  tourPreferance,
  setAdventure,
  setRelaxation,
  setCultural,
  setExplore,
  nextStep,
  prevStep,
}) => {
  return (
    <div className='traveltype_container'>
      <h5 className='travellertype-sub'>
        Are you the Solo traveller kind or the more the merrier kind? Select
        your tour companions.
      </h5>
      <div className='travellertype-row1'>
        <div
          className={
            tourPreferance === 'Adventure' ? ' solo traveltype' : 'traveltype'
          }
          style={{ width: '150px', height: '140px' }}
          onClick={() => {
            setAdventure();
            // nextStep();
          }}>
          <div className='traveltype-details'>
            <div className='traveltype-details-category'>
              {tourPreferance === 'Adventure' ? <Checked /> : null}
            </div>
            <img src={imgSrc1} alt='a' />
            <h2>Adventure</h2>
          </div>
        </div>
        <div
          className={
            tourPreferance === 'Relaxation'
              ? ' family traveltype'
              : 'traveltype'
          }
          style={{ width: '150px', height: '140px' }}
          onClick={() => {
            setRelaxation();
            // nextStep();
          }}>
          <div className='traveltype-details'>
            <div className='traveltype-details-category'>
              {tourPreferance === 'Relaxation' ? <Checked /> : null}
            </div>
            <img src={imgSrc2} alt='a' />
            <h2>Relaxation</h2>
          </div>
        </div>
      </div>
      <div className='travellertype-row2'>
        <div
          className={
            tourPreferance === 'Cultural' ? ' friends traveltype' : 'traveltype'
          }
          style={{ width: '150px', height: '140px' }}
          onClick={() => {
            setCultural();
            // nextStep();
          }}>
          <div className='traveltype-details'>
            <div className='traveltype-details-category'>
              {tourPreferance === 'Cultural' ? <Checked /> : null}
            </div>
            <img src={imgSrc3} alt='a' />
            <h2>Cultural</h2>
          </div>
        </div>
        <div
          className={
            tourPreferance === 'Explore'
              ? ' honeymoon traveltype'
              : 'traveltype'
          }
          style={{ width: '150px', height: '140px' }}
          onClick={() => {
            setExplore();
            // nextStep();
          }}>
          <div className='traveltype-details'>
            <div className='traveltype-details-category'>
              {tourPreferance === 'Explore' ? <Checked /> : null}
            </div>
            <img src={imgSrc4} alt='a' />
            <h2>Explore</h2>
          </div>
        </div>
        {/* <div
      className="traveltype"
      onClick={() => {
        setHoneymoon();
        nextStep();
      }}
    >
      <div>
        <div style={{ position: "absolute", top: -30, right: -20 }}>
          {tourPreferance === "Honeymoon" ? <Checked /> : null}
        </div>
        <img src={imgSrc4} />

        <h2>Honeymoon</h2>
      </div>
    </div> */}
      </div>
      <div className='navigation_btn'>
        <>
          <button className='previous-button' onClick={() => prevStep()}>
            Previous
          </button>
          {tourPreferance === 0 ? (
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

export default Tourpreference;
