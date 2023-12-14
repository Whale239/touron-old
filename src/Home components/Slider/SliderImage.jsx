import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import './SliderImage.css';
import { Link } from 'react-router-dom';

export default function SliderImage() {
  const [show, setShow] = useState(false);
  var settings = {
    infinite: true,
    autoplay: true,
    speed: 4000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    dots: false,
    fade: true,
  };

  const innerWidth = window.innerWidth;

  useEffect(() => {
    if (innerWidth > 768) {
      setShow(true);
    }
  }, [innerWidth]);

  console.log('inner', innerWidth);

  return (
    <>
      {!show ? (
        <Slider {...settings} accessibility pauseOnHover={false}>
          <div className='slide0 slide'>
            <div className='slider_title'>
              <h1>tour On</h1>
            </div>
          </div>
          <div className='slide1 slide'>
            <div className='slider_title'>
              <h1>tour On</h1>
            </div>
          </div>
          <div className='slide2 slide'>
            <div className='slider_title'>
              <h1>tour On</h1>
            </div>
          </div>
          <div className='slide3 slide'>
            <div className='slider_title'>
              <h1>tour On</h1>
            </div>
          </div>
          <div className='slide4 slide'>
            <div className='slider_title'>
              <h1>tour On</h1>
            </div>
          </div>
        </Slider>
      ) : (
        <Slider {...settings} accessibility pauseOnHover={false}>
          <div className='slide5 slidess'>
            <Link className='slide1_btn' to='/planned-tour'>
              <button>Plan now</button>
            </Link>
          </div>
          <div className='slide6 slidess'>
            <Link className='slide1_btns' to='/planned-tour'>
              <button>Plan now</button>
            </Link>
          </div>
        </Slider>
      )}
    </>
  );
}
