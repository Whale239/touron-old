import React, { useState, useEffect } from 'react';
import './SavedTours.css';
import Profilenav from './Profilenav';
import Profilepage from './Profilepage';
import * as BiIcons from 'react-icons/bi';

const SavedTours = () => {
  const [clicked, setClicked] = useState(false);
  const toggleSidebar = () => {
    setClicked(!clicked);
  };

  const innerWidth = window.innerWidth;
  useEffect(() => {
    if (innerWidth < 900) {
      setClicked(true);
    }
  }, [innerWidth]);
  const tours = [
    {
      tourCost: {
        adult: 2500,
        children: 2100,
      },
      pickUpPoint: ['Common Point Pickup'],
      tourCategory: ['Activities', 'Attraction', 'Tour'],
      idealType: ['All Traveller Profile'],
      pickUpAvailableOn: ['Morning'],
      _id: '5f02c9565d974f00174f4f9b',
      cityName: 'Bangkok',
      tourName: 'Bangkok Floating Markets Tour',
      aboutTour:
        "Take a tour at 2 of the most popular floating markets in Bangkok complete with a professional licensed guide and air-conditioned transfers\nWeave through Damnoen Saduak Floating Market's maze of vendors, the largest and most popular floating market in the country\nRide long-tail boats down Amphawa Floating Market's river, populated by numerous stalls of local goods, delicacies, and fireflies at night!\nWatch a train pass through the middle of a bustling market at the Maeklong Railway Market\nHave a quick and convenient meet up with easy-to-spot Klook staff at Century Mall or Siam Paragon",
      imageUrl:
        'https://drwyjmricaxm7.cloudfront.net/repository/1555124905-5068-03_crop_flip_800_450_f2f2f2_center-center.jpg',
      ratings: '4.6',
      reviews: '13,905',
      inclusion:
        '1.Admission to attractions\n2.Chinese/English-speaking guide\n3.Bottled drinking water\n4.Insurance provided by the operator\n5.Air-conditioned bus\n6.30-45 minute electric boat ride at a floating market\n7.Free tourist cards and cash coupons for ICONSIAM mall',
      itinerary:
        'Tour Schedule\nThis tour is available on\nMonday-Sunday\nEarly Bird Day Tour from Siam Paragon (Daily)\n1.Meet up at Siam Paragon Mall Gate 1 GF\n06:45\n2.Depart Bangkok, proceed to Damneon Saduak Floating Market\n07:00\n3.Longtail boat ride (30-45 minutes) to the main part of the market. Explore the floating market or rent a paddleboat (at your own expense)\n09:30\n4.Maeklong Railway Market\n10:40\n5.Depart for Bangkok\n12:30\n6.Drop off at Icon Siam\n14:30\n7.Drop off at Asiastique\n15:30\n8.Drop off at Siam Paragon\n16:30',
      tourDuration: '8-10 hours',
      tourType: 'Full Day Tour',
      additionalInformation:
        '1.The tour will run in all weather conditions\n2.Important: For packages that include a train experience, please meet the guide at the Maeklong Railway Market before the train schedule.Latecomers will not be allowed to join the train experience\n3.Insurance will be provided by the operator for reported accidents during your tour date only. No assistance will be provided for any accidents reported beyond your tour date\n4.Travel with just your family and friends on this Private Full or Half Day Tour to Amphawa Floating Market and Maeklong Railway Market with Firefly Viewing',
      tourPreferance: 'SIC Basis',
      trending: 'No',
      referanceLink:
        'https://www.klook.com/en-IN/activity/3020-floating-markets-day-tour-bangkok/#krt=r22&krid=0795a2e2-d21c-4423-75dc-acb3c16e854d',
      countryName: 'Thailand',
      pickUpTime: '6.45 am',
      dropTime: '4.30 pm',
      __v: 1,
    },
    {
      tourCost: {
        adult: 3100,
        children: 2600,
      },
      pickUpPoint: ['No Pickup'],
      tourCategory: ['Attraction', 'Theme Park'],
      idealType: ['Family and kids', 'Young Couple', 'Friends'],
      pickUpAvailableOn: ['Morning', 'Afternoon'],
      _id: '5f02ca125d974f00174f4f9c',
      cityName: 'Singapore',
      tourName: 'LEGOLAND Ticket in Johor Bahru',
      aboutTour:
        "1. Spend a day at Legoland in Johor Bahru - with over seven thrilling and fun-filled theme parks, perfect for the entire family!\n2. Explore a tropical jungle at the Land of Adventure or go for a thrilling ride on The Dragon roller-coaster ride\n3. Book family combo tickets and let the young and old ones enjoy LEGOLAND!\n4. Learn about marine life at SEA LIFE Malaysia's aquarium zones or brave the tube and body slides at the Water Park",
      imageUrl:
        'https://res.klook.com/images/fl_lossy.progressive,q_65/c_fill,w_1295,h_720,f_auto/w_80,x_15,y_15,g_south_west,l_klook_water/activities/ehj9oz86xjvrndejw8ou/LEGOLANDTicketinJohorBahru.webp',
      ratings: '4.6',
      reviews: '8,459',
      inclusion:
        '1-day attraction pass\n\nAdmission to select attractions: Theme Park',
      itinerary: '-',
      tourDuration: '4-5 hours',
      tourType: 'Full Day Tour',
      additionalInformation:
        'Travelers should obtain all entry or transit visa requirements to Malaysia.\n\nPassports must have a minimum of 6 months validity after completing the journey across to Malaysia',
      tourPreferance: 'On Your Own',
      trending: 'No',
      referanceLink:
        'https://www.klook.com/en-IN/activity/133-legoland-in-johor-bahru-admission-ticket-singapore/#krt=&krid=',
      countryName: 'Singapore',
      pickUpTime: 'N.A',
      dropTime: 'N.A',
      __v: 1,
    },
    {
      tourCost: {
        adult: 3500,
        children: 3100,
      },
      pickUpPoint: ['Hotel Pickup'],
      tourCategory: ['Activities', 'Attraction', 'Tour'],
      idealType: ['All Traveller Profile'],
      pickUpAvailableOn: ['Morning', 'Afternoon'],
      _id: '5f02cdcf5d974f00174f4f9d',
      cityName: 'Pattaya',
      tourName: 'Pattaya to Koh Larn Half Day Tour',
      aboutTour:
        'Discover a Thai paradise of white sandy beaches and azure waters on Koh Larn by speedboat!\nHome to six beautiful beaches, Koh Larn is an exotic haven for island hopping enthusiasts\nEnjoy convenient roundtrip hotel transfers from Pattaya City aboard a songthaew\nChase the winds and ride the tides by parasailing, seawalking, or by riding a jet ski or a banana boat!\nExtend your stay in a tropical utopia and explore a full day tour on Koh Larn island!',
      imageUrl: 'https://static.toiimg.com/photo/54342111/.jpg',
      ratings: '4.4',
      reviews: '892',
      inclusion:
        '1.Chinese/English-speaking guide\n2.Insurance provided by the operator\n3.Speedboat trips\n4.Round trip hotel transfers in Pattaya city area only by songthaew (public seater truck)\n5.1 round of parasailing\n6.Jet Ski ride\n7.Banana boat\n8.Korean-speaking guide (subject to availability)',
      itinerary:
        '1.8:20-8:50 hotel pick up\n2.9:10 depart to Koh Larn by speedboat\n3.9:40-10:00 arrive on Koh Larn\n4.12:00-12:30 return to Pattaya beach by speedboat\n5.12:30-13:00 arrive at Pattaya beach and hotel drop off\nAfternoon Tour\n1.12:00-12:40 hotel pick up\n2.13:00 depart to Koh Larn by speedboat\n3.14:00-14:30 arrive on Koh Larn\n4.16:00-16:30 return to Pattaya beach by speedboat\n5.16:30-17:00 arrive at Pattaya beach and hotel drop off',
      tourDuration: '5-6 hours',
      tourType: 'Half Day Tour',
      additionalInformation:
        '1.For those who are prone to seasickness or are experiencing back pains on the day of the activity, please sit at the back of the speedboat\n2.Please follow the safety guidelines from the local guide to avoid any unexpected accidents\n3.Beach chair will be provided daily except Wednesdays',
      tourPreferance: 'SIC Basis',
      trending: 'No',
      referanceLink:
        'https://www.klook.com/en-IN/activity/11424-pattaya-to-koh-larn-half-day-tour-pattaya/#krt=r22&krid=4729ce58-0a96-4d66-5cc0-07149d4ddef4',
      countryName: 'Thailand',
      pickUpTime: '8.20 AM/12.00 PM',
      dropTime: '1:00 PM / 5:00 PM',
      __v: 0,
    },
    {
      tourCost: {
        adult: 1100,
        children: 800,
      },
      pickUpPoint: ['No Pickup'],
      tourCategory: ['Attraction', 'Learning'],
      idealType: [
        'Family and kids',
        'Solo',
        'Mature Couple',
        'Young Couple',
        'Friends',
      ],
      pickUpAvailableOn: ['Morning', 'Afternoon', 'Evening'],
      _id: '5f02ce125d974f00174f4fa3',
      cityName: 'Singapore',
      tourName: 'National Museum of Singapore',
      aboutTour:
        "Explore 700 years of Singapore’s legacy and development through its immersive galleries\n\nView over 1,700 artifacts presented through creative storytelling at Singapore's oldest museum\n\nBuy the all-access Pass to see ‘An Old New World’ exhibition, commemorating the Singapore Bicentennial\n\nEnjoy museums? Visit the Malay Heritage Centre, Indian Heritage Centre or Sun Yat Sen Nanyang Memorial Hall and get to know more about the history behind Singapore’s local communities\n\nYou may also be interested in the National Gallery Singapore – Singapore’s newest and most iconic museum",
      imageUrl:
        'https://res.klook.com/images/fl_lossy.progressive,q_65/c_fill,w_1295,h_720,f_auto/w_80,x_15,y_15,g_south_west,l_klook_water/activities/e75d2145-National-Museum-of-Singapore/NationalMuseumofSingapore.webp',
      ratings: '4.7',
      reviews: '1,517',
      inclusion:
        'Admission to attractions: Singapore History Gallery and all Level One and Two galleries (Stamford Gallery, Goh Seng Choo Gallery, Modern Colony Gallery, Growing Up Gallery, Surviving Syonan Gallery, Voices of Singapore Gallery, Singapore History Gallery, and Glass Rotunda)',
      itinerary: '-',
      tourDuration: '3-4 hours',
      tourType: 'Half Day Tour',
      additionalInformation:
        ' Audio guide availability is dependent on the venue. Please refer to the official website for more information\nStorage areas are available at the venue. Please contact staff on site for rates',
      tourPreferance: 'SIC Basis',
      trending: 'No',
      referanceLink:
        'https://www.klook.com/en-IN/activity/1199-national-museum-singapore/#krt=r22&krid=898259b4-1eb1-4c35-4199-91660fb7a571',
      countryName: 'Singapore',
      pickUpTime: 'N.A',
      dropTime: 'N.A',
      __v: 1,
    },
    {
      tourCost: {
        adult: 3500,
        children: 2500,
      },
      pickUpPoint: ['Hotel Pickup', 'Common Point Pickup'],
      tourCategory: ['Tour'],
      idealType: ['All Traveller Profile'],
      pickUpAvailableOn: ['Morning'],
      _id: '5f02cf105d974f00174f4fa4',
      cityName: 'Hanoi',
      tourName: 'Luon Cave and Titop Island',
      aboutTour:
        "Skip the bustling cities and start moving around Vietnam with an island getaway in Halong island!\nWitness local livelihood when you visit the country's world-famous fishing destination, Halong Bay.\nCapture the natural essence of Luon Cave where paradise hides beyond steep cliffs and crystal clear waters.\nDon't miss the chance of an exciting trek towards the summit at the gorgeous Titop island.\nSpend the rest of the day having a great time with your friends at a sunset party on deck.\nJourney back to Ha Noi from Halong as you pass through the highway.",
      imageUrl:
        'https://www.packist.com/images/products/998520181102152602_1.jpg',
      ratings: '4.5',
      reviews: '650',
      inclusion:
        '1. Round trip transfer from Hanoi to Halong Bay.\n2. Cruise\n3. Kayak or bamboo boat ride.\n4. Life jacket\n5. Experienced English speaking guide.\n6. Lunch\n7. Sunset party\n8.Two bottles of mineral water\n9. Entrance fees and sightseeing tickets\n10. Hotel pick up and drop off within Hanoi Old Quarter\n11. Insurance provided .by the operator',
      itinerary:
        '1. Time: 07:30-20:30 2. Meet up with guide at meet up location 3. Depart from Hanoi 4. Arrive Tuan Chau island 5. Have lunch on cruise 6. Explore Sung Sot grotto 7. Discover Luon Cave 8. Kayaking or bamboo boat or relaxing on cruise 9. Visit Titop island 10. Swimming on the beach 11. Trek to Titop peak 12. Return to Tuan Chau island 13. Enjoy a sunset party on cruise 14. End of tour, drop off at your hotel or meet up location 15. The schedule is subject to change depending on traffic and weather conditions on your activity date 16. Please note that different pick up or meet up time applies depending on tour day.',
      tourDuration: '10-12 hours',
      tourType: 'Full Day Tour',
      additionalInformation:
        '1. Important: No single-use of plastics are allowed when visiting Halong Bay.\n2. Sunscreen\n3. Caps or hats\n4. Swimwear\n5. Sunglasses and umbrella\n6. Insect repellent\n7. Wear Light and comfortable clothing (preferrably dri-fit material).',
      tourPreferance: 'SIC Basis',
      trending: 'No',
      referanceLink:
        'https://www.klook.com/en-IN/activity/13066-luon-cave-titop-island-full-day-tour-hanoi-halong-bay/#krt=r22&krid=e9f458c2-509b-43da-42e9-b3e5d191b454',
      countryName: 'Vietnam',
      pickUpTime: '7:30 AM',
      dropTime: '8:30 PM',
      __v: 0,
    },
    {
      tourCost: {
        adult: 2800,
        children: 2800,
      },
      pickUpPoint: ['No Pickup'],
      tourCategory: ['Activities', 'Attraction', 'Theme Park'],
      idealType: ['Family and kids', 'Young Couple', 'Friends', 'Honeymoon'],
      pickUpAvailableOn: ['Morning', 'Afternoon', 'Evening'],
      _id: '5f02d4fa5d974f00174f4fa5',
      cityName: 'Singapore',
      tourName: 'Sentosa Fun Pass',
      aboutTour:
        '1. The Sentosa Token Fun Pass are your tickets to unlimited fun at a bargain!2. \nThis budget-friendly Sentosa Fun Pass allows you to simply go to the attractions of your choice!\n3. Visit popular attractions such as Adventure Cove Waterpark, S.E.A. Aquarium, and Wings of Time',
      imageUrl:
        'https://res.klook.com/image/upload/c_fill,w_960,h_460,f_auto/w_80,x_15,y_15,g_south_west,l_klook_water/activities/b8351e89-Sentosa-FUN-Pass-Singapore.JPG',
      ratings: '4.6',
      reviews: '5,527',
      inclusion:
        '2-day consecutive attraction pass\n\nSentosa Token FUN Pass with 55 tokens',
      itinerary: '-',
      tourDuration: '6-7 hours',
      tourType: 'Full Day Tour',
      additionalInformation:
        "1. Once you activate a pass, it can only be used by that individual. Passes cannot be re-sold or used by more than one person\n2. Wings of Time tickets must be redeemed at Wings of Time Ticketing Counters prior to the show\n3. Guests will be able to top up their Sentosa FUN Passes at all Sentosa Ticketing Counters in blocks of 5 tokens for SGD5\n4. All guests must present a valid ticket to staff manning the island or attraction's admission points or the outlet staff to avail the service or products indicated on the tickets\n5. Please refer to the official website for the respective attractions’ height, weight, and age restrictions\n6. Tickets are not to be used for touting purposes\nPlease see the full list of attractions and number of tokens required to participate for more information",
      tourPreferance: 'SIC Basis',
      trending: 'No',
      referanceLink:
        'https://www.klook.com/en-IN/activity/2121-sentosa-fun-pass-singapore/#krt=r22&krid=71de5334-4cd0-442f-74da-076a0fe8c8b6',
      countryName: 'Singapore',
      pickUpTime: 'N.A',
      dropTime: 'N.A',
      __v: 1,
    },
    {
      tourCost: {
        adult: 2000,
        children: 1200,
      },
      pickUpPoint: ['Hotel Pickup'],
      tourCategory: ['Food and Dining'],
      idealType: ['All Traveller Profile'],
      pickUpAvailableOn: ['Morning', 'Afternoon'],
      _id: '5f02d5ca5d974f00174f4fa6',
      cityName: 'Hanoi',
      tourName: 'Old Quarter Food Tour',
      aboutTour:
        "Try a myriad of local delicacies, from the French influenced Vietnamese banh mi and Bun Cha noodles to sweet milk dessert and fruity drinks.Be led to one of few egg coffee shops to sample this truly unique drink.Learn about the history and landmarks of Hanoi's Old Quarter from your English speaking guide.\n\n",
      imageUrl:
        'https://assets.londonist.com/uploads/2016/04/model_market_.jpg',
      ratings: '4.8',
      reviews: '532',
      inclusion:
        '1.English-speaking guide\n2.Meals and beverages\n3. Hotel pick up only\n4.Join in food tour',
      itinerary:
        '1. Indicate your preferred start time upon check out (earliest timeslot at 8:00, latest at 18:00)\n2. Learn the history of the Old Quarter and Hanoi\n3. Enjoy famous and authentic food from local family restaurants\n4.Tour ends after 3 hours in the Old Quarter\n5. Guests to make their own way back to their hotel',
      tourDuration: '4-5 hours',
      tourType: 'Half Day Tour',
      additionalInformation:
        'Sample Menu\n1. Chicken/Beef  Noodle (Pho Bo/Ga)\n2. Vermicelli with Grilled Pork (Bun Cha)\n3. Steam-rolled Cake (Bánh Cuon Thit)\n4. Spring Rolls (Nem Cuon)\n5. Fermented Pork (Nem Chua Ran)\n6. Steamed Wheat Flour Cake (Banh Bao)\n7. Pillow Cake (Banh Goi)\n8. Fried Rice Pancake (Banh Xeo)\n9. Mixed Fruits (Hoa Qua Dam)\n10. Egg Coffee (Ca Phe Trung)\n11. The menu is subject to change depending on the season and availability of ingredients.',
      tourPreferance: 'SIC Basis',
      trending: 'No',
      referanceLink:
        'https://www.klook.com/en-IN/activity/1969-old-quarter-food-tour-hanoi/#krt=r22&krid=e9f458c2-509b-43da-42e9-b3e5d191b454',
      countryName: 'Vietnam',
      pickUpTime: 'NA',
      dropTime: 'NA',
      __v: 0,
    },
    {
      tourCost: {
        adult: 3000,
        children: 20000,
      },
      pickUpPoint: ['Hotel Pickup', 'Common Point Pickup'],
      tourCategory: ['Activities', 'Tour'],
      idealType: ['All Traveller Profile'],
      pickUpAvailableOn: ['Morning'],
      _id: '5f02e5355d974f00174f4fa7',
      cityName: 'Hanoi',
      tourName: 'Majestic Trang An Tour',
      aboutTour:
        '1. See the largest pagoda in Vietnam – the Bai Dinh Pagoda, completely only recently in 2015.\n2. Explore the Trang An Cave Complex, a scenic area renowned for its boat cave tours\n3. Take a break over an authentic Vietnamese lunch and try local specialties\n4. Enjoy convenient roundtrip transfers from Hanoi and professional private guide services.\n',
      imageUrl:
        'https://mediaim.expedia.com/localexpert/758116/47df50e6-168a-4069-9616-54e2931eafc2.jpg?impolicy=resizecrop&rw=350&rh=197',
      ratings: '4.4',
      reviews: '942',
      inclusion:
        '1. Admission to attractions\n2. English-speaking guide\n3. Lunch \n4. Round-trip transfers to and from your hotel\n5. Insurance provided by the operator\n6. Boat trip cruise\n7. Join In Day Tour\n',
      itinerary:
        '1. Time:\n07:30-19:00\n2. Hotel pick up at the Old Quarter or meet up at original meet up point\n3. Transfer from Hanoi to Ninh Binh with a short break on the way\n4. Visit Bai Dinh pagoda\n5. Lunch at local restaurant\n6. Explore Sang Cave (Bright Cave), Toi Cave (Dark Cave), Ba Giot Cave, and Sinh Cave by boat\n7. Travel back to Hanoi\n8. Drop off at your hotel or original meet up point\n',
      tourDuration: '8-10 hours',
      tourType: 'Full Day Tour',
      additionalInformation:
        '1. Due to the nature of this activity, it is not recommended for persons with impaired physical mobility or those in wheelchairs\n2. This activity is not recommended for those with medical conditions (high blood pressure, epilepsy, etc.), pregnant women, or seniors\n3. The activity is able to accommodate special dietary requirements (allergies, gluten intolerance, vegetarian diets, or other dietary needs)\n',
      tourPreferance: 'SIC Basis',
      trending: 'No',
      referanceLink:
        'https://www.klook.com/en-IN/activity/1965-majestic-trang-an-tour-hanoi/#krt=r22&krid=e9f458c2-509b-43da-42e9-b3e5d191b454',
      countryName: 'Vietnam',
      pickUpTime: '08:00-08:30 AM',
      dropTime: 'NA',
      __v: 0,
    },
  ];
  return (
    <div style={{ display: 'flex' }}>
      <div className={clicked ? 'toggleSidebar' : 'toggleSideba'}>
        <Profilepage />
      </div>
      <div className='savedtour-container'>
        <BiIcons.BiMenuAltRight
          onClick={toggleSidebar}
          size={50}
          color='white'
          style={{
            zIndex: 20,
            position: 'absolute',
            paddingLeft: 20,
            marginRight: 20,
            top: 18,
            cursor: 'pointer',
          }}
        />
        <Profilenav title={'Saved Tours'} />
        <div className='tours-container'>
          {tours.map((t) => (
            <div className='tour'>
              <img src={t.imageUrl} alt='tour' />
              <div className='tourdetails'>
                <h6 className='mb-2 text-muted'>{t.cityName}</h6>
                <h4>{t.tourName}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SavedTours;
