import React from 'react';
import './Popup.css';
import popMob from '../assests/Popup/popMob.jpeg';
import popPlayApp from '../assests/Popup/popPlay&App.jpeg';
// import { Link } from "react-router-dom";

const Popup = ({ setPopup, popup }) => {
  const innerWidth = window.innerWidth;
  const platform = navigator.platform;

  return (
    <div className='popup'>
      <div className='popup__content'>
        <div className='popup__content-circle1'>&nbsp;</div>
        <div className='popup__content-circle2'>&nbsp;</div>
        <div className='popup__content-circle3'>&nbsp;</div>
        <div className='popup__content-circle4'>&nbsp;</div>
        <div className='popup__content-circle5'>&nbsp;</div>
        <div className='popup__content-circle6'>&nbsp;</div>
        <div
          className='popup__content-close'
          onClick={() =>
            // setPopup({
            //   ...popup,
            //   value: false,
            //   count: 1,
            // })
            setPopup(false)
          }>
          &times;
        </div>
        <div className='popup__content__left'>
          <img src={popMob} className='popup__image_Mob' alt='popMob' />
        </div>
        <div className='popup__content__right'>
          <h4 className='popup__content__head'>Hello There,</h4>
          {innerWidth <= 440 ? (
            <p className='popup__content__para1'>
              Do you know our self planning Mobile Application is Live Now ?
            </p>
          ) : (
            <>
              <p className='popup__content__para1'>
                Do you know our self planning Mobile Application is
              </p>

              <p className='popup__content__para2'>Live Now ?</p>
            </>
          )}
          <img src={popPlayApp} alt='popApp' className='popup__image_App' />
          <div className='popup__content__button'>
            <div className='popup__content__button_m'>
              <a
                href={
                  platform.includes('Win') ||
                  platform.includes('Linux') ||
                  platform.includes('Android')
                    ? 'https://play.google.com/store/apps/details?id=com.touron.travelapp'
                    : 'https://apps.apple.com/in/app/tour-on/id1544389334'
                }
                target='_blank'
                rel='noopener noreferrer'
                className='popup__content__button1-link'
                onClick={() =>
                  // setPopup({
                  //   ...popup,
                  //   value: false,
                  //   count: 1,
                  // })
                  setPopup(false)
                }>
                <div className='popup__content__button1'>
                  <h6>Download Now!</h6>
                </div>
              </a>
              <p className='popup__content__p'>Travel Made much easy now!!</p>
            </div>
            <div className='popup__content__button_m'>
              <div
                className='popup__content__button2'
                onClick={() =>
                  // setPopup({
                  //   ...popup,
                  //   value: false,
                  //   count: 1,
                  // })
                  setPopup(false)
                }>
                <h6>Do it Later!</h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popup;
