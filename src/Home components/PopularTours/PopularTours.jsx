import React from 'react';
import Slider from 'react-slick';
import './PopularTours.css';
import PopularTourTile from './PopularTourTile';
import { Link } from 'react-router-dom';

export default function PopularTours() {
  const tours = [
    {
      tourCost: {
        adult: 3200,
        children: 2600,
      },
      pickUpPoint: ['No Pickup'],
      tourCategory: ['Attraction'],
      idealType: ['All Traveller Profile'],
      pickUpAvailableOn: ['Morning'],
      _id: '5f02c14e5d974f00174f4f97',
      cityName: 'Singapore',
      tourName: 'S.E.A. Aquarium One-Day Ticket',
      aboutTour:
        "1. Visit one of the world's largest aquariums, housing over 100,000 marine life!\n2. Get a peek of diverse ocean life inside this breath-taking space through this S.E.A. Aquarium\n3. See more than 1,000 underwater species across 50 habitats and the largest collection of manta rays\n4. Enjoy exclusive entry to Open Ocean Habitat and Ocean Dome with the Up-Close Encounter Pass!\n5. Make your own unique encounters beyond the glass panels of the aquarium through diving, dining, and more",
      imageUrl:
        'https://res.klook.com/images/fl_lossy.progressive,q_65/c_fill,w_1295,h_720,f_auto/w_80,x_15,y_15,g_south_west,l_klook_water/activities/u5kof4eixvmohrpkfg4r/SEAAquarium%E2%84%A2One-DayTicket.webp',
      ratings: '4.7',
      reviews: '20,747',
      inclusion:
        '1 S.E.A. Aquarium™ One-Day ticket(s)\n\nOne Open Ocean Habitat exclusive viewing area ticket\n\nAdmission to select attractions: S.E.A. Aquarium™ (priority access), Ocean Dome, Meet the Dolphin Experience',
      itinerary: '-',
      tourDuration: '4-5 hours',
      tourType: 'Half Day Tour',
      additionalInformation:
        '1. Feeding times are the best times to view the wondrous marine life! Feeding times are not fixed but typically occur around 3:00pm at the Open Ocean Tank and around 10:00am-11:00am at the other exhibits\n2. Enjoy convenient and affordable transportation into Sentosa by purchasing a Sentosa Express Ticket\n3. Valid hand stamp and admission ticket are required for same day re-entry admission.',
      tourPreferance: 'On Your Own',
      trending: 'No',
      referanceLink:
        'https://www.klook.com/en-IN/activity/119-sea-aquarium-singapore/#krt=&krid=',
      countryName: 'Singapore',
      pickUpTime: 'NA',
      dropTime: 'NA',
      __v: 3,
    },
    {
      tourCost: {
        adult: 3000,
        children: 2600,
      },
      pickUpPoint: ['No Pickup'],
      tourCategory: ['Attraction', 'Tour'],
      idealType: [
        'Family',
        'Family and kids',
        'Solo',
        'Mature Couple',
        'Young Couple',
      ],
      pickUpAvailableOn: ['Morning', 'Afternoon'],
      _id: '5f02c3f15d974f00174f4f9a',
      cityName: 'Bangkok',
      tourName: 'Grand Palace and Emerald Buddha tour',
      aboutTour:
        'Discover Bangkok’s history and culture as you explore the world-famous Grand Palace complex\nPrivate and E-guided packages available starting 15 Dec 2019!\nVisit the Wat Phra Kaew, one of the most important Buddhist temples that houses the sacred Emerald Buddha\nCheck out the Wat Saket Private Tuk Tuk Tour for a unique and unforgettable tuk tuk experience in Bangkok',
      imageUrl:
        'https://media.tacdn.com/media/attractions-splice-spp-674x446/07/20/2e/be.jpg',
      ratings: '4.3',
      reviews: '1,054',
      inclusion:
        '1.Admission to select attractions: Grand Palace and Emerald Buddha\n2.English-speaking guide\n3.Skip-the-line services with guidance towards Grand Palace entrance',
      itinerary: 'Opening Hours\nMonday-Sunday:\n08:30-15:30',
      tourDuration: '7-8 hours',
      tourType: 'Full Day Tour',
      additionalInformation:
        '1.Wheelchairs can be borrowed at the cloakrooms near the Exhibition Road entrance\n2.Re-entry is not allowed\n3.The guide will only accompany you inside the Grand Palace',
      tourPreferance: 'On Your Own',
      trending: 'No',
      referanceLink:
        'https://www.klook.com/en-IN/activity/22759-grand-palace-emerald-buddha-ticket-bangkok/#krt=r22&krid=0795a2e2-d21c-4423-75dc-acb3c16e854d',
      countryName: 'Thailand',
      pickUpTime: 'NA',
      dropTime: 'NA',
      __v: 0,
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
    autoplay: true,
    speed: 6000,
    arrows: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '60px',
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          centerMode: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
        },
      },
      {
        breakpoint: 620,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: false,
        },
      },
      {
        breakpoint: 360,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: false,
        },
      },
      {
        breakpoint: 280,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: false,
        },
      },
    ],
  };
  return (
    <div className='tours'>
      <div className='tour-slider-header'>
        <div className='tour-slider-title'>
          {/* <p>popularly</p> */}
          <h2>Curated Tours</h2>
          <p>
            Are you a kindered spirit looking for the perfect? Look no further!
          </p>
        </div>
        <div>
          <Link to='/popular_tour' className='plink'>
            <div className='ptour'>
              <h4>View all tours</h4>
            </div>
          </Link>
        </div>
      </div>
      <div></div>
      <div className='tour-slider-home'>
        <div className='tour-slider'>
          <Slider {...settings} accessibility pauseOnHover={false}>
            {tours.map((t, index) => {
              return <PopularTourTile t={t} key={index} />;
            })}
          </Slider>
        </div>
      </div>
      {/* <div className="benefits">
        <div className="item">
          <div className="item_img">
            <img src={home1} alt="" />
          </div>
          <div className="tc">
            <h3 className="item_title">Any route</h3>
            <p className="item_text">
              We will help you to make any route for travel
            </p>
          </div>
        </div>
        <div className="item">
          <div className="item_img">
            <img src={home2} alt="" />
          </div>
          <div className="tc">
            <h3 className="item_title">Your dream</h3>
            <p className="item_text">
              Your dreams of an unforgettable journey can come true with us
            </p>
          </div>
        </div>
        <div className="item">
          <div className="item_img">
            <img src={home3} alt="" />
          </div>
          <div className="tc">
            <h3 className="item_title">Our guarantee</h3>
            <p className="item_text">
              We guarantee you an unforgettable journey and a lot of impressions
            </p>
          </div>
        </div>
      </div> */}
    </div>
  );
}
