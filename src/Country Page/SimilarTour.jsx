import React from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';

const SimilarTour = ({
  tour,
  selectedTour,
  setSelectedTour,
  countryname,
  heading,
  tourname,
}) => {
  var settings = {
    infinite: true,
    autoplay: false,
    speed: 1000,
    arrows: true,
    slidesToShow: 2,
    slidesToScroll: 1,
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
    <div className='countryInner_tour'>
      <div className='countryInner_tour-title'>
        <h2>
          {heading} {countryname}
        </h2>
      </div>
      <div className='similartour_slide'>
        <Slider {...settings}>
          {tour.map((tour, index) => {
            if (tour.tourName !== tourname)
              return (
                <div
                  className={
                    selectedTour === tour.tourName
                      ? 'similartour_container_selected'
                      : 'similartour_container'
                  }
                  key={index}
                  onMouseOver={() => setSelectedTour(tour.tourName)}>
                  <Link
                    className='plink'
                    to={{
                      pathname: `/tourdetails/${tour.countryName}/${tour.cityName}/${tour.tourName}/${tour._id}`,
                    }}>
                    <img src={tour.imageUrl} alt='' />
                    <div
                      className='similartour-image-subtitle'
                      style={{
                        color:
                          selectedTour === tour.tourName ? '#db6500' : '#fff',
                      }}>
                      {tour.tourName}
                    </div>
                  </Link>
                </div>
              );
          })}
        </Slider>
      </div>
    </div>
  );
};

export default SimilarTour;
