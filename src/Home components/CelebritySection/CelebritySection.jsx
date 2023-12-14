import React from 'react';
import './CelebritySection.css';
import Slider from 'react-slick';
import celeb1 from '../../assests/Celebrity Profile/1-mi.png';
import celeb2 from '../../assests/Celebrity Profile/2-mi.png';
import celeb3 from '../../assests/Celebrity Profile/3-mi.png';
import celeb4 from '../../assests/Celebrity Profile/4-mi.png';
import celeb5 from '../../assests/Celebrity Profile/5-mi.png';
import celeb6 from '../../assests/Celebrity Profile/6-mi.png';
import celeb7 from '../../assests/Celebrity Profile/7-mi.png';
import celeb8 from '../../assests/Celebrity Profile/8-mi.png';

const CelebritySection = () => {
  const celebrites = [
    {
      link: 'https://www.instagram.com/p/B4eKsUTD6dF/',
      image: celeb1,
    },
    {
      link: 'https://www.instagram.com/p/B5O10q-lpkW/',
      image: celeb2,
    },
    {
      link: 'https://www.instagram.com/p/B0u0yjtFul5/',
      image: celeb3,
    },
    {
      link: 'https://www.instagram.com/p/B5zFZeDDrb6/',
      image: celeb4,
    },
    {
      link: 'https://www.instagram.com/p/B0FdwLWDIeT/',
      image: celeb5,
    },
    {
      link: 'https://www.instagram.com/p/BpJTROogQpN/',
      image: celeb6,
    },
    {
      link: 'https://www.instagram.com/p/B8i77VBp1TW/?igshid=1m0halmm8uazc',
      image: celeb7,
    },
    {
      link: '#',
      image: celeb8,
    },
  ];

  function SampleNextArrow(props) {
    const { className, onClick } = props;
    return <div className={className} onClick={onClick}></div>;
  }

  function SamplePrevArrow(props) {
    const { className, onClick } = props;
    return <div className={className} onClick={onClick} />;
  }

  var settings = {
    infinite: true,
    speed: 8000,
    dots: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          arrows: false,
        },
      },
      {
        breakpoint: 620,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          arrows: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
        },
      },
      {
        breakpoint: 360,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          dots: false,
        },
      },
      {
        breakpoint: 280,
        settings: {
          slidesToShow: 1,
          arrows: false,
          slidesToScroll: 1,
          dots: false,
        },
      },
    ],
  };

  return (
    <>
      <div className='celebrity-section'>
        <div className='tags'>
          <div className='heading'>
            <h1>Celebrity Travellers</h1>
          </div>
          <div className='tag-content'>
            <p>
              Here's our pick of Celebrity explorers who choose us for their
              fantasy excursion will inspire you and push you to pack your backs
              and hit the street..!
            </p>
            <h5>
              To know more about their journey
              <br />
              click on their image
            </h5>
          </div>
        </div>
        <div className='pictures'>
          <Slider {...settings}>
            {celebrites.map((c, index) => (
              <div key={index}>
                <div className='celebrity-image'>
                  <a href={c.link} target='_blank' rel='noopener noreferrer'>
                    <img src={c.image} alt='' />
                  </a>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </>
  );
};

export default CelebritySection;
