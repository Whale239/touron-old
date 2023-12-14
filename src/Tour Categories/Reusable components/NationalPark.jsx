import React from 'react';
import './NationalPark.css';

const NationalPark = ({
  nationalPark,
  setNationalPark,
  prevStep,
  nextStep,
}) => {
  const nationalParks = [
    {
      imageUrl: 'https://www.corbettnationalpark.in/assets/img/bannersss.jpg',
      name: 'Jim Corbett',
    },
    {
      imageUrl: 'https://www.girnationalpark.in/images/jungle_safari.jpg',
      name: 'Gir',
    },
    {
      imageUrl:
        'https://static.india.com/wp-content/uploads/2014/09/Kaziranga-National-Park.jpg',
      name: 'Kaziranga',
    },
    {
      imageUrl:
        'https://curlytales.com/wp-content/uploads/2020/04/white-bengal-tigers-768x504-1.jpg',
      name: 'Sunderban',
    },
    {
      imageUrl:
        'https://breathedreamgo.com/wp-content/uploads/2018/02/Khana-Guide-HD-2.jpg',
      name: 'Kanha',
    },
    {
      imageUrl:
        'https://www.thehotelguru.com/_images/3f/5f/3f5fb246f07c2cc4bf014d8946da8801/500x332.jpg',
      name: 'Bandhavgarh',
    },
    {
      imageUrl:
        'https://davidsbeenhere.com/wp-content/uploads/2019/06/manas-national-park-travel-guide19.jpg',
      name: 'Manas',
    },
    {
      imageUrl:
        'https://www.explorationscompany.com/media/6552/india-reni-pani-jungle-lodge-satpura-national-park-muggar-crocodile.jpg?anchor=center&mode=crop&quality=80&width=680&height=384&rnd=131623229190000000',
      name: 'Saptura',
    },

    {
      imageUrl:
        'http://www.jagranjosh.com/imported/images/E/Articles/76.%20Nanda%20Devi%20National%20Park_%20Facts%20at%20a%20Glance2.jpg',
      name: 'Nandha Devi',
    },
    {
      imageUrl:
        'https://media.istockphoto.com/photos/big-sloth-bear-or-melursus-ursinus-vulnerable-species-encounter-in-picture-id1177584713?k=6&m=1177584713&s=612x612&w=0&h=2Hdmo4p81mO3FV1uXHRqruhs_H88dhEUTJKIigMW-eI=',
      name: 'Pench',
    },
    {
      imageUrl:
        'https://s01.sgp1.cdn.digitaloceanspaces.com/article/144005-lgvnxmsved-1594103535.jpeg',
      name: 'Nagarhole',
    },
    {
      imageUrl:
        'https://indiatrotter.com/wp-content/uploads/2020/08/periyar-national-park-location.jpg',
      name: 'Periyar',
    },
    {
      imageUrl:
        'https://keralatourism.travel/images/places-to-visit/headers/eravikulam-national-park-munnar-tourism-entry-fee-timings-holidays-reviews-header.jpg',
      name: 'Eravikulam',
    },
    {
      imageUrl:
        'https://sites.google.com/a/miamioh.edu/geo121f15/_/rsrc/1444604447269/home/asia-valley-of-the-flowers-india-10/ValleyofFlowers.jpg',
      name: 'Valley Of Flowers',
    },
    {
      imageUrl:
        'https://viewtraveling.com/wp-content/uploads/2018/06/Bandipur-National-Park-India.jpg',
      name: 'Bandipur',
    },
  ];
  return (
    <div className='pc'>
      <div>
        <h3 className='parkName'>Select the National Park</h3>
      </div>
      <div className='parkContainer'>
        {nationalParks.map((item, index) => (
          <div key={index} className='park'>
            {nationalPark === item.name ? (
              <div>
                <img
                  className='parkImage'
                  src={require('../../assests/ticks.png')}
                  alt=''
                />
              </div>
            ) : (
              <div onClick={() => setNationalPark(item.name)}>
                <img className='parkImage' src={item.imageUrl} alt='' />
              </div>
            )}
            <h4>{item.name}</h4>
          </div>
        ))}
      </div>
      <div className='navigation_btn'>
        <>
          <button className='previous-button' onClick={prevStep}>
            Previous
          </button>
          {nationalPark !== '' ? (
            <button className='next-button' onClick={nextStep}>
              Next
            </button>
          ) : (
            <button
              disabled
              style={{ color: '#c1c1c1' }}
              className='next-button'
              onClick={nextStep}>
              Next
            </button>
          )}
        </>
      </div>
    </div>
  );
};

export default NationalPark;
