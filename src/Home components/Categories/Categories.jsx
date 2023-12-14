import React from 'react';
import './Categories.css';
import { Link } from 'react-router-dom';
import Plan from '../../assests/Category/Plan.jpg';
import Lux from '../../assests/Category/Lux.jpg';
import Hon from '../../assests/Category/Hon.jpg';
import Road from '../../assests/Category/Road.jpg';
// import Sur from '../../assests/Category/Sur.jpg';
import Wild from '../../assests/Category/Wild.jpg';

export default function Categories() {
  const categories = [
    {
      name: 'Luxury Tour',
      route: '/luxury-tour',
      image: Lux,
    },
    {
      name: 'Honeymoon Tour',
      route: '/honeymoon-tour',
      image: Hon,
    },
    {
      name: 'Planned Tour',
      route: '/planned-tour',
      image: Plan,
    },
    // {
    //   name: "Surprise Tour",
    //   route: "/surprise-tour",
    //   image: Sur,
    // },
    {
      name: 'Wildlife',
      route: '/wildlife-tour',
      image: Wild,
    },
    {
      name: 'Road Trip',
      route: '/roadtrip-tour',
      image: Road,
    },
  ];
  return (
    <div className='categories'>
      {categories.map((c, index) => (
        <Link to={c.route} key={index} style={{ textDecoration: 'none' }}>
          <div className='cat-body'>
            <img className='image' src={c.image} alt='' />
            <div className='title'>
              <p>{c.name}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
