import React from 'react';
import './PopularCountries.css';
import { Link } from 'react-router-dom';

export default function PopularCountries() {
  const popularCountries = [
    {
      visa: {
        onArrival: 'Yes',
        cost: 0,
      },
      general: {
        bestTimeToVisit: [
          'August',
          'September',
          'October',
          'November',
          'December',
        ],
        currency: 'Maldivian rufiyaa',
        timeZone: '-30 min',
      },
      _id: '5ef5f055db65dc0017ca6936',
      countryName: 'Maldives',
      flagUrl:
        'https://www.countryflags.com/wp-content/uploads/maldives-flag-png-large.png',
      aboutCountry:
        'The Maldives, officially the Republic of Maldives, is a small island nation in South Asia, located in the Arabian Sea of the Indian Ocean. It lies southwest of Sri Lanka and India, about 1,000 kilometres from the Asian continent',
      idealDays: '4-5 days',
      imageUrl:
        'https://images.pexels.com/photos/1483053/pexels-photo-1483053.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      weather: '26 to 32',
      bestPlaces: 'Male',
      __v: 0,
      createdAt: '2020-08-26T07:54:32.309Z',
      updatedAt: '2020-09-04T07:17:10.894Z',
      className: '',
    },
    {
      visa: {
        onArrival: 'No',
        cost: 9000,
      },
      flagUrl:
        'https://www.countryflags.com/wp-content/uploads/new-zealand-flag-png-large.png',
      general: {
        bestTimeToVisit: [
          'March',
          'April',
          'May',
          'September',
          'October',
          'November',
          'December',
        ],
        currency: 'New Zealand dollar',
        timeZone: '+6.5 Hours',
      },
      _id: '5efc388ed70bb90017268bc0',
      countryName: 'New Zealand',
      aboutCountry:
        'New Zealand is an island country in the southwestern Pacific Ocean. It comprises two main landmasses—the North Island and the South Island —and around 600 smaller islands, covering a total area of 268,021 square kilometres.',
      idealDays: '8-10 days',
      imageUrl:
        'https://images.pexels.com/photos/724963/pexels-photo-724963.png?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      weather: '17 to 24',
      bestPlaces:
        '1. Wellington 2.Auckland 3. Queenstown 4. Christchurch 5.Rotorua 6.Marlborough 7.Dunedin 8. Milford Sound',
      __v: 0,
      createdAt: '2020-08-26T10:17:18.561Z',
      updatedAt: '2020-08-27T08:36:52.842Z',
      className: '',
    },
    {
      visa: {
        onArrival: 'YES',
        cost: 0,
      },
      flagUrl:
        'https://www.countryflags.com/wp-content/uploads/sri-lanka-flag-png-large.png',
      general: {
        bestTimeToVisit: ['January', 'Febuary', 'March', 'December'],
        currency: 'Sri Lankan rupee',
        timeZone: 'No time difference',
      },
      _id: '5ef4a6f9bd272f0017c79211',
      countryName: 'Sri Lanka',
      aboutCountry:
        'Endless beaches, timeless ruins, welcoming people, oodles of elephants, rolling surf, cheap prices, fun trains, famous tea and flavourful food make Sri Lanka irresistible.',
      idealDays: '8-10 days',
      imageUrl:
        'https://images.pexels.com/photos/319892/pexels-photo-319892.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
      weather: '27',
      bestPlaces: '1. Galle 2. Colombo 3. Sigiriya 4. Kandy 5. Nuwara Eliya',
      __v: 0,
      createdAt: '2020-08-26T09:25:39.745Z',
      updatedAt: '2020-08-26T10:10:37.279Z',
      className: '',
    },
    {
      visa: {
        onArrival: 'No',
        cost: 5000,
      },
      general: {
        bestTimeToVisit: [
          'January',
          'Febuary',
          'March',
          'April',
          'November',
          'December',
        ],
        currency: 'AED',
        timeZone: '-1.5 Hours',
      },
      _id: '5ef48d3fbd272f0017c79205',
      countryName: 'Dubai',
      aboutCountry:
        'Dubai is situated on the Persian Gulf coast of the United Arab Emirates',
      idealDays: '6-7 days',
      imageUrl:
        'https://images.pexels.com/photos/3763190/pexels-photo-3763190.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      weather: '37',
      bestPlaces: 'Abhu- dhabi, Sharjah,  Ajman',
      className: 'displayC',
    },
  ];

  const innerWidth = window.innerWidth;

  return (
    <div className='country'>
      <div className='country-header'>
        <div className='country-title'>
          {/* <div className="country-subtitle">True now</div> */}
          <h2>Fascinating Countries</h2>
          <p>
            Explore enchanting new lands that will steal your heart. Find out
            more about the countries you want to visit
          </p>
        </div>
        <div>
          <Link to='./popular_countries' className='plink'>
            <div className='pcountry'>
              <h4>View all countries</h4>
            </div>
          </Link>
        </div>
      </div>
      <div className='country_content'>
        {popularCountries.map((c, index) => {
          if (innerWidth < 770 ? index < 4 : index < 3)
            return (
              <div
                className={
                  c.className === ''
                    ? 'country_content2 '
                    : 'country_content2 displayC'
                }
                key={index}>
                <Link
                  className='plink'
                  to={{
                    pathname: `/countrydetails/${c.countryName}`,
                  }}>
                  <div className='country_imgg'>
                    <img src={c.imageUrl} alt='' />
                  </div>
                  <div className='countryflagg'>
                    <img src={c.flagUrl} alt='flafimg' />
                  </div>
                  <div className='countrykk'>
                    <div className='countryname'>{c.countryName}</div>
                    <p className='countrydesc'>
                      {c.aboutCountry.slice(0, 200)}
                    </p>
                  </div>
                </Link>
                <Link className='plink' to='/popular_tour'>
                  <p className='countryvieww'>View all tours</p>
                </Link>
                <p className='countryvieww hide'>{c.countryName}</p>
              </div>
            );
        })}
      </div>
    </div>
  );
}
