import React, { useState, useEffect, useRef } from 'react';
import './Testimonials.css';
import Slider from 'react-slick';
import { firedb } from './../../firebase';
import { AiFillStar } from 'react-icons/ai';
import { SiFacebook } from 'react-icons/si';
import { FcGoogle } from 'react-icons/fc';
import parse from 'html-react-parser';

const Testimonials = () => {
  const isMounted = useRef(false);
  const [testimonials, setTestimonials] = useState([]);
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
    if (type === '' || type === null || type === undefined) return;
    const review = reviews.filter((c) => {
      return c.type === type;
    });
    return review[0].icon;
  };
  const testimonialsCities = [
    'Maldives',
    'Kashmir',
    'Dubai',
    'Himachal',
    'Europe',
    'Coorg',
    'New Zealand',
    'Sikkim',
    'Singapore',
    'Andaman',
  ];
  const [city, setCity] = useState('Maldives');

  const onTestCityClick = () => {
    if (city === '') return testimonials;

    const filter = testimonials.filter((c) => {
      return c.tourPlace === city;
    });
    return filter;
  };

  const getTestimonial = () => {
    firedb.ref('testimonials').on('value', (data) => {
      if (isMounted.current) {
        if (data !== null) {
          let req = [];
          data.forEach((d) => {
            req.push(d.val());
          });

          setTestimonials(req.reverse());
        }
      }
    });
  };

  useEffect(() => {
    isMounted.current = true;
    getTestimonial();
    return () => (isMounted.current = false);
  }, []);

  const innerWidth = window.innerWidth;
  useEffect(() => {
    if (innerWidth > 620) {
      setShow(true);
    }
  }, []);

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
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: false,
          arrows: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
          arrows: false,
          dots: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false,

          arrows: false,
        },
      },
      {
        breakpoint: 360,
        settings: {
          slidesToShow: 1,
          dots: false,

          slidesToScroll: 1,
          arrows: false,
        },
      },
      {
        breakpoint: 280,
        settings: {
          dots: false,

          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
        },
      },
    ],
  };

  return (
    <>
      {testimonials.length === 0 ? null : (
        <div className='testimonial-main'>
          <div className='testi-heading_section'>
            <span className='testi-subheading1'>Our Traveler Talks</span>
          </div>
          <div className='testi-p'>
            <p>
              "Feedback is the breakfast of champions" - Ken Blanchard <br />
              Read the testimonials of our happy travellers as they recollect
              fond memories after a fabulous tour with us !
            </p>
          </div>
          <div className='test-cities'>
            {testimonialsCities.map((t, index) => (
              <div key={index}>
                <h1
                  className={t === city ? 'tcitiess' : 'tcities'}
                  onClick={() => setCity(t)}>
                  {t}
                </h1>
              </div>
            ))}
          </div>
          <Slider {...settings}>
            {onTestCityClick().map((k, index) => (
              <div key={index}>
                {show ? (
                  <>
                    <div className='testi-content'>
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

export default Testimonials;
