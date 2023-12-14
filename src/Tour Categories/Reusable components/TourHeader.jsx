import React from 'react';
import { Link } from 'react-scroll';
import './TourHeader.css';

const TourHeader = ({ image, title, description, className }) => {
  var sectionStyle = {
    backgroundImage: `url(${image})`,
  };
  return (
    <div className='tour_Header-container' style={sectionStyle}>
      <div className='tour_Header'>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      <Link
        activeClass='active'
        to={className}
        smooth={true}
        duration={500}
        offset={50}>
        <div className='downarrow'>
          <h4>Start planning</h4>
          <i className='fas fa-angle-down'></i>
        </div>
      </Link>
    </div>
  );
};

export default TourHeader;
