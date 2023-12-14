import React from 'react';
import './PopularTours.css';
import { Link } from 'react-router-dom';
import AccessTimeIcon from '@material-ui/icons/AccessTime';

export default function PopularTourTile({ t }) {
  return (
    <div className='poptour1'>
      <Link
        className='plink'
        to={{
          pathname: `/tourdetails/${t.countryName}/${t.cityName}/${t.tourName}/${t._id}`,
        }}>
        <div className='trends'>
          <div className='crop-bottom'>
            <img className='pop-image' src={t.imageUrl} alt='' />
          </div>
          <div className='tour-details'>
            <h3 className='title'>{t.tourName}</h3>
            <p className='description'>{t.aboutTour.slice(0, 100)}</p>
            <div className='days'>
              <span className='icons'>
                <AccessTimeIcon />
              </span>
              <div className='ig'>
                <span className='ic'>{t.tourDuration}</span>
                <span className='ic'>/</span>
                <span className='ic'>{t.tourType}</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
