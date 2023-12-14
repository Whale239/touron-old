import React from 'react';
import './Top_destination.css';
import TopdestinationTile from './Top_destinationTile';
// import Slider from "react-slick";

const Top_destination = () => {
  const width = window.innerWidth;
  const cities = [
    {
      cityName: 'Da Nang',
      countryName: 'Vietnam',
      imageUrl:
        'https://images.pexels.com/photos/2582757/pexels-photo-2582757.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    },
    {
      cityName: 'Bali',
      countryName: 'Indonesia',
      imageUrl:
        'https://images.pexels.com/photos/2474689/pexels-photo-2474689.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    },
    {
      cityName: 'Paris',
      countryName: 'France',
      imageUrl:
        'https://images.pexels.com/photos/597049/paris-france-eiffel-tower-597049.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    },
    {
      cityName: 'Sydney',
      countryName: 'Australia',
      imageUrl:
        'https://images.pexels.com/photos/2193300/pexels-photo-2193300.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    },
    {
      cityName: 'Queenstown',
      countryName: 'New Zealand',
      imageUrl:
        'https://images.pexels.com/photos/724949/pexels-photo-724949.png?auto=compress&cs=tinysrgb&dpr=2&w=500',
    },
    {
      cityName: 'Zurich',
      countryName: 'Switzerland',
      imageUrl:
        'https://www.barnes-international.com/images/visuels_articles/681_Ewar7_v.jpg',
    },
  ];

  // var settings = {
  //   infinite: true,
  //   autoplay: true,
  //   speed: 1000,
  //   arrows: true,
  //   slidesToShow: 7,
  //   slidesToScroll: 1,
  //   // centerMode: true,
  //   // centerPadding: "100px",
  //   // nextArrow: <SampleNextArrow />,
  //   // prevArrow: <SamplePrevArrow />,
  // };
  return (
    <div className='top_destination'>
      <div className='section_heading '>
        <div className='section_titles'>
          <h2>Beautiful Cities</h2>
          <p>
            Explore cities all over the world, with our never ending list of
            city tours
          </p>
        </div>
      </div>
      <div className='section_content popular_destination__content'>
        <div className='section_item'>
          {cities.map((t, index) => {
            if (width < 1300 ? index < 6 : index < 7)
              return <TopdestinationTile t={t} key={index} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Top_destination;
