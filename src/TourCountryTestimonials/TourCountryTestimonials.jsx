import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import parse from 'html-react-parser';
import { AiFillStar } from 'react-icons/ai';
import { SiFacebook } from 'react-icons/si';
import { FcGoogle } from 'react-icons/fc';
import './TourCountryTestimonials.css';

const TourCountryTestimonials = ({ testimonials }) => {
  const [show, setShow] = useState(false);

  const reviews = [
    {
      type: 'Google',
      icon: <FcGoogle />,
    },
    {
      type: 'Facebook',
      icon: <SiFacebook color='#007bff' />,
    },
  ];
  const getReviewIcon = (type) => {
    const review = reviews.filter((c) => {
      return c.type === type;
    });
    return review[0].icon;
  };
  function SampleNextArrow(props) {
    const { className, onClick } = props;
    return <div className={className} onClick={onClick}></div>;
  }

  function SamplePrevArrow(props) {
    const { className, onClick } = props;
    return <div className={className} onClick={onClick} />;
  }

  var settings = {
    dots: true,
    autoplay: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: true,
    fade: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  const innerWidth = window.innerWidth;
  useEffect(() => {
    if (innerWidth > 620) {
      setShow(true);
    }
  }, []);

  return (
    <>
      {testimonials.length === 0 ? null : (
        <div className='testimonial-main'>
          <div className='testi-heading_section'>
            <span className='testi-subheading1'>Our Traveler Talks</span>
          </div>
          <div className='testi-p11'>
            <p>
              "Feedback is the breakfast of champions" - Ken Blanchard <br />
              Read the testimonials of our happy travellers as they recollect
              fond memories after a fabulous tour with us !
            </p>
          </div>
          <Slider {...settings}>
            {testimonials.map((k, index) => (
              <div>
                {show ? (
                  <>
                    <div className='testi-content' key={index}>
                      <div className='testi-content-flex1'>
                        <img className='testiImg' src={k.testImage} alt='' />
                      </div>
                      <div className='testi-content-flex2'>
                        <div className='testiStar'>
                          <div className='testiIcon'>
                            {getReviewIcon(k.field)}
                          </div>
                          <AiFillStar />
                          <AiFillStar />
                          <AiFillStar />
                          <AiFillStar />
                          <AiFillStar />
                        </div>
                        <div className='testiDescription'>
                          <h6>{parse(k.comment)}</h6>
                        </div>
                        <div className='testiName'>
                          <h5>
                            - {k.name}, Traveled to {k.tourPlace}
                          </h5>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className='testi-content'>
                      <div className='testiStar'>
                        <div className='testiIcon'>
                          {getReviewIcon(k.field)}
                        </div>
                        <AiFillStar />
                        <AiFillStar />
                        <AiFillStar />
                        <AiFillStar />
                        <AiFillStar />
                      </div>
                      <div className='testiDescription'>
                        <h6>{parse(k.comment)}</h6>
                      </div>
                      <div className='testiName'>
                        <div className='testi-con-img'>
                          <img className='testiImg' src={k.testImage} alt='' />
                        </div>
                        <div className='testi-con-name'>
                          <h5>
                            - {k.name}, Traveled to {k.tourPlace}
                          </h5>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))}
          </Slider>
        </div>
      )}
    </>
  );
};

export default TourCountryTestimonials;
