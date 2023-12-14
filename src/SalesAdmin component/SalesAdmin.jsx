import React, { useState, useEffect } from 'react';
import { firedb } from '../firebase';
import './SalesAdmin.css';
import { useToasts } from 'react-toast-notifications';
import {
  getExpoToken,
  sendPushNotification,
} from '../Login components/PushNotification';

const SalesAdmin = ({ selectedRequest, closeSelfPlanModal, planKey }) => {
  const { addToast } = useToasts();
  const [step, setStep] = useState(1);
  const [hotels, setHotels] = useState(new Array(1).fill(0));
  const [values, setValues] = useState({
    requestId: selectedRequest.requestID,
    tourCategory: selectedRequest.tourCategory,
    cityName1: '',
    hotelName1: '',
    hotel1Img1: '',
    hotel1Img2: '',
    hotel1Img3: '',
    cityName2: '',
    hotelName2: '',
    hotel2Img1: '',
    hotel2Img2: '',
    hotel2Img3: '',
    cityName3: '',
    hotelName3: '',
    hotel3Img1: '',
    hotel3Img2: '',
    hotel3Img3: '',
    cityName4: '',
    hotelName4: '',
    hotel4Img1: '',
    hotel4Img2: '',
    hotel4Img3: '',
    rating1: '',
    rating2: '',
    rating3: '',
    rating4: '',
    checkIn1: '',
    checkIn2: '',
    checkIn3: '',
    checkIn4: '',
    checkOut1: '',
    checkOut2: '',
    checkOut3: '',
    checkOut4: '',
    roomType1: '',
    roomType2: '',
    roomType3: '',
    roomType4: '',
    mealPlan1: '',
    mealPlan2: '',
    mealPlan3: '',
    mealPlan4: '',
    tCondition1: '',
    tCondition2: '',
    tCondition3: '',
    tCondition4: '',
    taxiName: '',
    taxiImg1: '',
    taxiImg2: '',
    taxiImg3: '',
    noOfDays: '',
    kiloMeters: '',
    daysLimit: '',
    termsCondition: '',
    onwardFlightName: '',
    onwardFrom: '',
    onwardTo: '',
    onwardDepartureDate: '',
    onwardDepartureTime: '',
    onwardArrivalDate: '',
    onwardArrivalTime: '',
    onwardTransportMode: '',
    onwardFromCityCode: '',
    onwardToCityCode: '',
    returnFlightName: '',
    returnFrom: '',
    returnTo: '',
    returnDepartureDate: '',
    returnDepartureTime: '',
    returnArrivalDate: '',
    returnArrivalTime: '',
    returnTransportMode: '',
    returnFromCityCode: '',
    returnToCityCode: '',
    paymentLink: '',
  });

  console.log(`values`, values);

  const { key, data } = planKey;
  const taxis = [
    {
      taxiName: 'Sedan',
      images: [
        'https://imgctcf.aeplcdn.com/thumbs/p-nc-p-s500-ver4/images/cars/generic/Maruti-Ciaz-Top-Sedan-In-India-For-2015.png',
        'https://www.indiacarnews.com/wp-content/uploads/2018/11/Tata-E-Vision-Concept-1.jpg',
        'https://www.carblogindia.com/wp-content/uploads/2019/11/Honda-Civic.jpg',
      ],
    },
    {
      taxiName: 'SUV',
      images: [
        'https://i.ytimg.com/vi/aW5iK5ps2lo/maxresdefault.jpg',
        'https://www.drivespark.com/car-image/320x225x35/car/x22852853-hyundai_creta.jpg.pagespeed.ic.6k9MHYFSiP.jpg',
        'https://www.drivespark.com/car-image/320x225x35/car/x16794025-hyundai_venue.jpg.pagespeed.ic.sBSwOS5KRB.jpg',
      ],
    },
    {
      taxiName: 'Tempo Traveller',
      images: [
        'https://5.imimg.com/data5/UO/LY/MY-9754485/17-seater-tempo-traveller-rental-500x500.jpg',
        'https://apollo-singapore.akamaized.net/v1/files/966sq0ywn7ek1-IN/image;s=850x0',
        'https://apollo-singapore.akamaized.net/v1/files/mo5ib5iznh4q-IN/image;s=850x0',
      ],
    },
    {
      taxiName: 'Sea Plane',
      images: [
        'https://www.mumpacktravel.com/wp-content/uploads/2017/06/boardingtheseaplane-1-1080x720.jpg',
        'https://i.ytimg.com/vi/CmaidFTejF4/maxresdefault.jpg',
        'https://www.hospitalitynet.org/picture/xxl_153100328.jpg?t=20190506153734',
      ],
    },
    {
      taxiName: 'Speed Boat',
      images: [
        'https://www.kurumba.com/uploads/2016-01/awo32lttb1zph5pnbzicojnf7rdb4ws7.jpg',
        'https://media.tacdn.com/media/attractions-splice-spp-674x446/06/71/22/b3.jpg',
        'https://media-cdn.tripadvisor.com/media/photo-s/07/dd/6a/0f/kurumba-maldives.jpg',
      ],
    },
  ];

  const setTaxiImages = (name) => {
    taxis.forEach((t) => {
      if (t.taxiName === name) {
        setValues({
          ...values,
          taxiImg1: t.images[0],
          taxiImg2: t.images[1],
          taxiImg3: t.images[2],
          taxiName: name,
        });
      }
    });
  };

  useEffect(() => {
    if (Object.keys(planKey).length === 0) return;
    setValues({
      ...values,
      requestId: data.requestID,
      tourCategory: data.tourCategory,
      cityName1: data.hotels[0].cityName,
      hotelName1: data.hotels[0].hotelName,
      hotel1Img1: data.hotels[0].hotelPicture[0],
      hotel1Img2: data.hotels[0].hotelPicture[1],
      hotel1Img3: data.hotels[0].hotelPicture[2],
      tCondition1: data.hotels[0].tCondition,
      tCondition2: data.hotels[1].tCondition,
      tCondition3: data.hotels[2].tCondition,
      tCondition4: data.hotels[3].tCondition,
      cityName2: data.hotels[1].cityName,
      hotelName2: data.hotels[1].hotelName,
      hotel2Img1: data.hotels[1].hotelPicture[0],
      hotel2Img2: data.hotels[1].hotelPicture[1],
      hotel2Img3: data.hotels[1].hotelPicture[2],
      cityName3: data.hotels[2].cityName,
      hotelName3: data.hotels[2].hotelName,
      hotel3Img1: data.hotels[2].hotelPicture[0],
      hotel3Img2: data.hotels[2].hotelPicture[1],
      hotel3Img3: data.hotels[2].hotelPicture[2],
      cityName4: data.hotels[3].cityName,
      hotelName4: data.hotels[1].hotelName,
      hotel4Img1: data.hotels[3].hotelPicture[0],
      hotel4Img2: data.hotels[3].hotelPicture[1],
      hotel4Img3: data.hotels[3].hotelPicture[2],
      rating1: data.hotels[0].hotelRatings,
      rating2: data.hotels[1].hotelRatings,
      rating3: data.hotels[2].hotelRatings,
      rating4: data.hotels[3].hotelRatings,
      checkIn1: data.hotels[0].checkIn,
      checkIn2: data.hotels[1].checkIn,
      checkIn3: data.hotels[2].checkIn,
      checkIn4: data.hotels[3].checkIn,
      checkOut1: data.hotels[0].checkOut,
      checkOut2: data.hotels[1].checkOut,
      checkOut3: data.hotels[2].checkOut,
      checkOut4: data.hotels[3].checkOut,
      mealPlan1: data.hotels[0].mealPlan,
      mealPlan2: data.hotels[1].mealPlan,
      mealPlan3: data.hotels[2].mealPlan,
      mealPlan4: data.hotels[3].mealPlan,
      roomType1: data.hotels[0].roomType,
      roomType2: data.hotels[1].roomType,
      roomType3: data.hotels[2].roomType,
      roomType4: data.hotels[3].roomType,
      taxiName: data.taxiDetails.taxiName,
      taxiImg1: data.taxiDetails.taxiPicture[0],
      taxiImg2: data.taxiDetails.taxiPicture[1],
      taxiImg3: data.taxiDetails.taxiPicture[2],
      noOfDays: data.basicDetails.days,
      kiloMeters: data.basicDetails.kilometers,
      daysLimit: data.basicDetails.daysLimit,
      termsCondition: data.basicDetails.termsConditions,
      onwardFlightName: data.flightDetails.onward.flightName,
      onwardFrom: data.flightDetails.onward.from,
      onwardTo: data.flightDetails.onward.to,
      onwardDepartureDate: data.flightDetails.onward.depatureDate,
      onwardDepartureTime: data.flightDetails.onward.depatureTime,
      onwardArrivalDate: data.flightDetails.onward.arrivalDate,
      onwardArrivalTime: data.flightDetails.onward.arrivalTime,
      onwardTransportMode: data.flightDetails.onward.onwardTransportMode,
      returnFlightName: data.flightDetails.return.flightName,
      returnFrom: data.flightDetails.return.from,
      returnTo: data.flightDetails.return.to,
      returnDepartureDate: data.flightDetails.return.depatureDate,
      returnDepartureTime: data.flightDetails.return.depatureTime,
      returnArrivalDate: data.flightDetails.return.arrivalDate,
      returnArrivalTime: data.flightDetails.return.arrivalTime,
      returnTransportMode: data.flightDetails.return.returnTransportMode,
      paymentLink: data.paymentLink,
      onwardFromCityCode: data.flightDetails.onward.onwardFromCityCode,
      onwardToCityCode: data.flightDetails.onward.onwardToCityCode,
      returnFromCityCode: data.flightDetails.return.returnFromCityCode,
      returnToCityCode: data.flightDetails.return.returnToCityCode,
    });
  }, []);

  const {
    requestId,
    tourCategory,
    cityName1,
    hotelName1,
    hotel1Img1,
    hotel1Img2,
    hotel1Img3,
    cityName2,
    hotelName2,
    hotel2Img1,
    hotel2Img2,
    hotel2Img3,
    cityName3,
    hotelName3,
    hotel3Img1,
    hotel3Img2,
    hotel3Img3,
    cityName4,
    hotelName4,
    hotel4Img1,
    hotel4Img2,
    hotel4Img3,
    rating1,
    rating2,
    rating3,
    rating4,
    taxiName,
    taxiImg1,
    taxiImg2,
    taxiImg3,
    noOfDays,
    kiloMeters,
    daysLimit,
    termsCondition,
    onwardFlightName,
    onwardFrom,
    onwardTo,
    onwardDepartureDate,
    onwardDepartureTime,
    onwardArrivalDate,
    onwardArrivalTime,
    onwardTransportMode,
    onwardFromCityCode,
    onwardToCityCode,
    returnFlightName,
    returnFrom,
    returnTo,
    returnDepartureDate,
    returnDepartureTime,
    returnArrivalDate,
    returnArrivalTime,
    returnTransportMode,
    returnFromCityCode,
    returnToCityCode,
    paymentLink,
    checkIn1,
    checkIn2,
    checkIn3,
    checkIn4,
    checkOut1,
    checkOut2,
    checkOut3,
    checkOut4,
    mealPlan1,
    mealPlan2,
    mealPlan3,
    mealPlan4,
    roomType1,
    roomType2,
    roomType3,
    roomType4,
    tCondition1,
    tCondition2,
    tCondition3,
    tCondition4,
  } = values;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const submit = () => {
    const details = {
      requestID: requestId,
      tourCategory: tourCategory,
      paymentLink: paymentLink,
      hotels: [
        {
          hotelName: hotelName1,
          hotelPicture: [hotel1Img1, hotel1Img2, hotel1Img3],
          hotelRatings: rating1,
          cityName: cityName1,
          checkIn: checkIn1,
          checkOut: checkOut1,
          roomType: roomType1,
          mealPlan: mealPlan1,
          tCondition: tCondition1,
        },
        {
          hotelName: hotelName2,
          hotelPicture: [hotel2Img1, hotel2Img2, hotel2Img3],
          hotelRatings: rating2,
          cityName: cityName2,
          checkIn: checkIn2,
          checkOut: checkOut2,
          roomType: roomType2,
          mealPlan: mealPlan2,
          tCondition: tCondition2,
        },
        {
          hotelName: hotelName3,
          hotelPicture: [hotel3Img1, hotel3Img2, hotel3Img3],
          hotelRatings: rating3,
          cityName: cityName3,
          checkIn: checkIn3,
          checkOut: checkOut3,
          roomType: roomType3,
          mealPlan: mealPlan3,
          tCondition: tCondition3,
        },
        {
          hotelName: hotelName4,
          hotelPicture: [hotel4Img1, hotel4Img2, hotel4Img3],
          hotelRatings: rating4,
          cityName: cityName4,
          checkIn: checkIn4,
          checkOut: checkOut4,
          roomType: roomType4,
          tCondition: tCondition4,

          mealPlan: mealPlan4,
        },
      ],
      taxiDetails: {
        taxiName: taxiName,
        taxiPicture: [taxiImg1, taxiImg2, taxiImg3],
      },
      basicDetails: {
        days: noOfDays,
        kilometers: kiloMeters,
        daysLimit: daysLimit,
        termsConditions: termsCondition,
      },
      flightDetails: {
        onward: {
          onwardTransportMode: onwardTransportMode,
          flightName: onwardFlightName,
          from: onwardFrom,
          to: onwardTo,
          depatureDate: onwardDepartureDate,
          depatureTime: onwardDepartureTime,
          arrivalDate: onwardArrivalDate,
          arrivalTime: onwardArrivalTime,
          onwardFromCityCode: onwardFromCityCode,
          onwardToCityCode: onwardToCityCode,
        },
        return: {
          returnTransportMode: returnTransportMode,
          flightName: returnFlightName,
          from: returnFrom,
          to: returnTo,
          depatureDate: returnDepartureDate,
          depatureTime: returnDepartureTime,
          arrivalDate: returnArrivalDate,
          arrivalTime: returnArrivalTime,
          returnFromCityCode: returnFromCityCode,
          returnToCityCode: returnToCityCode,
        },
      },
    };

    firedb
      .ref('plannedDetails')
      .push(details)
      .then(() => {
        const token = getExpoToken(selectedRequest.userID);
        const message = {
          to: token,
          sound: 'default',
          title: `Tour Plan Updated`,
          body: `Hello! Our travel experts have curated your tour plan for your query ${selectedRequest.requestID}. Come have a look!`,

          data: selectedRequest,
        };
        sendPushNotification(message);
      });
    closeSelfPlanModal();
  };
  const update = () => {
    console.log(`tcondition1`, tCondition1);
    const details = {
      requestID: requestId,
      tourCategory: tourCategory,
      paymentLink: paymentLink,
      hotels: [
        {
          hotelName: hotelName1,
          hotelPicture: [hotel1Img1, hotel1Img2, hotel1Img3],
          hotelRatings: rating1,
          cityName: cityName1,
          checkIn: checkIn1,
          checkOut: checkOut1,
          roomType: roomType1,
          mealPlan: mealPlan1,
          tCondition: tCondition1,
        },
        {
          hotelName: hotelName2,
          hotelPicture: [hotel2Img1, hotel2Img2, hotel2Img3],
          hotelRatings: rating2,
          cityName: cityName2,
          checkIn: checkIn2,
          checkOut: checkOut2,
          roomType: roomType2,
          mealPlan: mealPlan2,
          tCondition: tCondition2,
        },
        {
          hotelName: hotelName3,
          hotelPicture: [hotel3Img1, hotel3Img2, hotel3Img3],
          hotelRatings: rating3,
          cityName: cityName3,
          checkIn: checkIn3,
          checkOut: checkOut3,
          roomType: roomType3,
          mealPlan: mealPlan3,
          tCondition: tCondition3,
        },
        {
          hotelName: hotelName4,
          hotelPicture: [hotel4Img1, hotel4Img2, hotel4Img3],
          hotelRatings: rating4,
          cityName: cityName4,
          checkIn: checkIn4,
          checkOut: checkOut4,
          roomType: roomType4,
          mealPlan: mealPlan4,
          tCondition: tCondition4,
        },
      ],
      taxiDetails: {
        taxiName: taxiName,
        taxiPicture: [taxiImg1, taxiImg2, taxiImg3],
      },
      basicDetails: {
        days: noOfDays,
        kilometers: kiloMeters,
        daysLimit: daysLimit,
        termsConditions: termsCondition,
      },
      flightDetails: {
        onward: {
          onwardTransportMode: onwardTransportMode,
          flightName: onwardFlightName,
          from: onwardFrom,
          to: onwardTo,
          depatureDate: onwardDepartureDate,
          depatureTime: onwardDepartureTime,
          arrivalDate: onwardArrivalDate,
          arrivalTime: onwardArrivalTime,
          onwardFromCityCode: onwardFromCityCode,
          onwardToCityCode: onwardToCityCode,
        },
        return: {
          returnTransportMode: returnTransportMode,
          flightName: returnFlightName,
          from: returnFrom,
          to: returnTo,
          depatureDate: returnDepartureDate,
          depatureTime: returnDepartureTime,
          arrivalDate: returnArrivalDate,
          arrivalTime: returnArrivalTime,
          returnFromCityCode: returnFromCityCode,
          returnToCityCode: returnToCityCode,
        },
      },
    };

    firedb
      .ref(`plannedDetails/${key}`)
      .update(details)
      .then(() => {
        const token = getExpoToken(selectedRequest.userID);

        const message = {
          to: token,
          sound: 'default',
          title: `Tour Plan Updated`,
          body: `Hello! Our travel experts have curated your tour plan for your query ${selectedRequest.requestID}. Come have a look!`,
          data: selectedRequest,
        };
        sendPushNotification(message);
      })
      .catch((err) => console.log(`err`, err));
    closeSelfPlanModal();
  };

  const deletePlan = (key) => {
    firedb
      .ref(`plannedDetails/${key}`)
      .set(null)
      .then(() => {
        addToast(' Deleted Successfully', {
          appearance: 'error',
        });
        closeSelfPlanModal();
      })
      .catch((err) => console.log('err :>> ', err));
  };

  const renderSteps = (step) => {
    switch (step) {
      case 1:
        return (
          <>
            <div className='reqField'>
              <div className='reqFieldDivreq'>
                <h6>Request ID</h6>
              </div>
              <div className='reqFieldInputreq'>
                <input
                  type='text'
                  name='requestId'
                  value={requestId}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className='reqField'>
              <div className='reqFieldDivreq'>
                <h6>Tour Category</h6>
              </div>
              <div className='reqFieldInputreq'>
                <input
                  type='text'
                  name='tourCategory'
                  value={tourCategory}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className='reqField'>
              <div className='reqFieldDivreq'>
                <h6>Payment Link</h6>
              </div>
              <div className='reqFieldInputreq'>
                <input
                  type='text'
                  name='paymentLink'
                  value={paymentLink}
                  onChange={handleChange}
                />
              </div>
            </div>
          </>
        );
      case 2:
        return (
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            <div className='hotelField'>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div className='flexField'>
                  <div className='reqFieldDivreq'>
                    <h6>City Name</h6>
                  </div>
                  <div className='reqFieldInputreq'>
                    <input
                      type='text'
                      name='cityName1'
                      value={cityName1}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className='flexField'>
                  <div className='reqFieldDivreq'>
                    <h6>Hotel name</h6>
                  </div>
                  <div className='reqFieldInputreq'>
                    <input
                      type='text'
                      name='hotelName1'
                      value={hotelName1}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className='flexField'>
                  <div className='reqFieldDivreq'>
                    <h6>Check In</h6>
                  </div>
                  <div className='reqFieldInputreq'>
                    <input
                      type='datetime-local'
                      name='checkIn1'
                      value={checkIn1}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className='flexField'>
                  <div className='reqFieldDivreq'>
                    <h6>Check Out</h6>
                  </div>
                  <div className='reqFieldInputreq'>
                    <input
                      type='datetime-local'
                      name='checkOut1'
                      value={checkOut1}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className='flexField'>
                  <div className='reqFieldDivreq'>
                    <h6>Room Type</h6>
                  </div>
                  <div className='reqFieldInputreq'>
                    <input
                      type='text'
                      name='roomType1'
                      value={roomType1}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className='flexField'>
                  <div className='reqFieldDivreq'>
                    <h6>Meal Plan</h6>
                  </div>
                  <div className='reqFieldInputreq'>
                    <select
                      name='mealPlan1'
                      value={mealPlan1}
                      onChange={handleChange}>
                      <option value='' disabled selected hidden>
                        Select
                      </option>
                      <option value='All Meal Plan'>All Meal Plan</option>
                      <option value='Breakfast & Dinner'>
                        Breakfast & Dinner
                      </option>
                      <option value='Breakfast Only'>Breakfast Only</option>
                    </select>
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div className='flexField'>
                  <div className='reqFieldDivreq'>
                    <h6>Rating</h6>
                  </div>
                  <div className='reqFieldInputreq'>
                    <select
                      name='rating1'
                      value={rating1}
                      onChange={handleChange}>
                      <option value='' disabled selected hidden>
                        Select
                      </option>
                      <option value='1'>1</option>
                      <option value='2'>2</option>
                      <option value='3'>3</option>
                      <option value='4'>4</option>
                      <option value='5'>5</option>
                    </select>
                  </div>
                </div>
                <div className='flexField'>
                  <div className='reqFieldDivreq'>
                    <h6>Img1</h6>
                  </div>
                  <div className='reqFieldInputreq'>
                    <input
                      type='text'
                      name='hotel1Img1'
                      value={hotel1Img1}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className='flexField'>
                  <div className='reqFieldDivreq'>
                    <h6>Img2</h6>
                  </div>
                  <div className='reqFieldInputreq'>
                    <input
                      type='text'
                      name='hotel1Img2'
                      value={hotel1Img2}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className='flexField'>
                  <div className='reqFieldDivreq'>
                    <h6>Img3</h6>
                  </div>
                  <div className='reqFieldInputreq'>
                    <input
                      type='text'
                      name='hotel1Img3'
                      value={hotel1Img3}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className='flexField'>
                  <div className='reqFieldDivreq'>
                    <h6>Additional Information</h6>
                  </div>
                  <div className='reqFieldInputreq'>
                    <input
                      type='text'
                      name='tCondition1'
                      value={tCondition1}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>

            {hotels.length > 1 ? (
              <div className='hotelField'>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <div className='flexField'>
                    <div className='reqFieldDivreq'>
                      <h6>City Name</h6>
                    </div>
                    <div className='reqFieldInputreq'>
                      <input
                        type='text'
                        name='cityName2'
                        value={cityName2}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className='flexField'>
                    <div className='reqFieldDivreq'>
                      <h6>Hotel name</h6>
                    </div>
                    <div className='reqFieldInputreq'>
                      <input
                        type='text'
                        name='hotelName2'
                        value={hotelName2}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className='flexField'>
                    <div className='reqFieldDivreq'>
                      <h6>Check In</h6>
                    </div>
                    <div className='reqFieldInputreq'>
                      <input
                        type='datetime-local'
                        name='checkIn2'
                        value={checkIn2}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className='flexField'>
                    <div className='reqFieldDivreq'>
                      <h6>Check Out</h6>
                    </div>
                    <div className='reqFieldInputreq'>
                      <input
                        type='datetime-local'
                        name='checkOut2'
                        value={checkOut2}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className='flexField'>
                    <div className='reqFieldDivreq'>
                      <h6>Room Type</h6>
                    </div>
                    <div className='reqFieldInputreq'>
                      <input
                        type='text'
                        name='roomType2'
                        value={roomType2}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className='flexField'>
                    <div className='reqFieldDivreq'>
                      <h6>Meal Plan</h6>
                    </div>
                    <div className='reqFieldInputreq'>
                      <select
                        name='mealPlan2'
                        value={mealPlan2}
                        onChange={handleChange}>
                        <option value='' disabled selected hidden>
                          Select
                        </option>
                        <option value='All Meal Plan'>All Meal Plan</option>
                        <option value='Breakfast & Dinner'>
                          Breakfast & Dinner
                        </option>
                        <option value='Breakfast Only'>Breakfast Only</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <div className='flexField'>
                    <div className='reqFieldDivreq'>
                      <h6>Rating</h6>
                    </div>
                    <div className='reqFieldInputreq'>
                      <select
                        name='rating2'
                        value={rating2}
                        onChange={handleChange}>
                        <option value='' disabled selected hidden>
                          Select
                        </option>
                        <option value='1'>1</option>
                        <option value='2'>2</option>
                        <option value='3'>3</option>
                        <option value='4'>4</option>
                        <option value='5'>5</option>
                      </select>
                    </div>
                  </div>
                  <div className='flexField'>
                    <div className='reqFieldDivreq'>
                      <h6>Img1</h6>
                    </div>
                    <div className='reqFieldInputreq'>
                      <input
                        type='text'
                        name='hotel2Img1'
                        value={hotel2Img1}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className='flexField'>
                    <div className='reqFieldDivreq'>
                      <h6>Img2</h6>
                    </div>
                    <div className='reqFieldInputreq'>
                      <input
                        type='text'
                        name='hotel2Img2'
                        value={hotel2Img2}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className='flexField'>
                    <div className='reqFieldDivreq'>
                      <h6>Img3</h6>
                    </div>
                    <div className='reqFieldInputreq'>
                      <input
                        type='text'
                        name='hotel2Img3'
                        value={hotel2Img3}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className='flexField'>
                    <div className='reqFieldDivreq'>
                      <h6>Additional Information</h6>
                    </div>
                    <div className='reqFieldInputreq'>
                      <input
                        type='text'
                        name='tCondition2'
                        value={tCondition2}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
            {hotels.length > 2 ? (
              <div className='hotelField'>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <div className='flexField'>
                    <div className='reqFieldDivreq'>
                      <h6>City Name</h6>
                    </div>
                    <div className='reqFieldInputreq'>
                      <input
                        type='text'
                        name='cityName3'
                        value={cityName3}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className='flexField'>
                    <div className='reqFieldDivreq'>
                      <h6>Hotel name</h6>
                    </div>
                    <div className='reqFieldInputreq'>
                      <input
                        type='text'
                        name='hotelName3'
                        value={hotelName3}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className='flexField'>
                    <div className='reqFieldDivreq'>
                      <h6>Check In</h6>
                    </div>
                    <div className='reqFieldInputreq'>
                      <input
                        type='datetime-local'
                        name='checkIn3'
                        value={checkIn3}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className='flexField'>
                    <div className='reqFieldDivreq'>
                      <h6>Check Out</h6>
                    </div>
                    <div className='reqFieldInputreq'>
                      <input
                        type='datetime-local'
                        name='checkOut3'
                        value={checkOut3}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className='flexField'>
                    <div className='reqFieldDivreq'>
                      <h6>Room Type</h6>
                    </div>
                    <div className='reqFieldInputreq'>
                      <input
                        type='text'
                        name='roomType3'
                        value={roomType3}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className='flexField'>
                    <div className='reqFieldDivreq'>
                      <h6>Meal Plan</h6>
                    </div>
                    <div className='reqFieldInputreq'>
                      <select
                        name='mealPlan3'
                        value={mealPlan3}
                        onChange={handleChange}>
                        <option value='' disabled selected hidden>
                          Select
                        </option>
                        <option value='All Meal Plan'>All Meal Plan</option>
                        <option value='Breakfast & Dinner'>
                          Breakfast & Dinner
                        </option>
                        <option value='Breakfast Only'>Breakfast Only</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <div className='flexField'>
                    <div className='reqFieldDivreq'>
                      <h6>Rating</h6>
                    </div>
                    <div className='reqFieldInputreq'>
                      <select
                        name='rating3'
                        value={rating3}
                        onChange={handleChange}>
                        <option value='' disabled selected hidden>
                          Select
                        </option>
                        <option value='1'>1</option>
                        <option value='2'>2</option>
                        <option value='3'>3</option>
                        <option value='4'>4</option>
                        <option value='5'>5</option>
                      </select>
                    </div>
                  </div>
                  <div className='flexField'>
                    <div className='reqFieldDivreq'>
                      <h6>Img1</h6>
                    </div>
                    <div className='reqFieldInputreq'>
                      <input
                        type='text'
                        name='hotel3Img1'
                        value={hotel3Img1}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className='flexField'>
                    <div className='reqFieldDivreq'>
                      <h6>Img2</h6>
                    </div>
                    <div className='reqFieldInputreq'>
                      <input
                        type='text'
                        name='hotel3Img2'
                        value={hotel3Img2}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className='flexField'>
                    <div className='reqFieldDivreq'>
                      <h6>Img3</h6>
                    </div>
                    <div className='reqFieldInputreq'>
                      <input
                        type='text'
                        name='hotel3Img3'
                        value={hotel3Img3}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className='flexField'>
                    <div className='reqFieldDivreq'>
                      <h6>Additional Information</h6>
                    </div>
                    <div className='reqFieldInputreq'>
                      <input
                        type='text'
                        name='tCondition3'
                        value={tCondition3}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
            {hotels.length > 3 ? (
              <div className='hotelField'>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <div className='flexField'>
                    <div className='reqFieldDivreq'>
                      <h6>City Name</h6>
                    </div>
                    <div className='reqFieldInputreq'>
                      <input
                        type='text'
                        name='cityName4'
                        value={cityName4}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className='flexField'>
                    <div className='reqFieldDivreq'>
                      <h6>Hotel name</h6>
                    </div>
                    <div className='reqFieldInputreq'>
                      <input
                        type='text'
                        name='hotelName4'
                        value={hotelName4}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className='flexField'>
                    <div className='reqFieldDivreq'>
                      <h6>Check In</h6>
                    </div>
                    <div className='reqFieldInputreq'>
                      <input
                        type='datetime-local'
                        name='checkIn4'
                        value={checkIn4}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className='flexField'>
                    <div className='reqFieldDivreq'>
                      <h6>Check Out</h6>
                    </div>
                    <div className='reqFieldInputreq'>
                      <input
                        type='datetime-local'
                        name='checkOut4'
                        value={checkOut4}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className='flexField'>
                    <div className='reqFieldDivreq'>
                      <h6>Room Type</h6>
                    </div>
                    <div className='reqFieldInputreq'>
                      <input
                        type='text'
                        name='roomType4'
                        value={roomType4}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className='flexField'>
                    <div className='reqFieldDivreq'>
                      <h6>Meal Plan</h6>
                    </div>
                    <div className='reqFieldInputreq'>
                      <select
                        name='mealPlan4'
                        value={mealPlan4}
                        onChange={handleChange}>
                        <option value='' disabled selected hidden>
                          Select
                        </option>
                        <option value='All Meal Plan'>All Meal Plan</option>
                        <option value='Breakfast & Dinner'>
                          Breakfast & Dinner
                        </option>
                        <option value='Breakfast Only'>Breakfast Only</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <div className='flexField'>
                    <div className='reqFieldDivreq'>
                      <h6>Rating</h6>
                    </div>
                    <div className='reqFieldInputreq'>
                      <select
                        name='rating4'
                        value={rating4}
                        onChange={handleChange}>
                        <option value='' disabled selected hidden>
                          Select
                        </option>
                        <option value='1'>1</option>
                        <option value='2'>2</option>
                        <option value='3'>3</option>
                        <option value='4'>4</option>
                        <option value='5'>5</option>
                      </select>
                    </div>
                  </div>

                  <div className='flexField'>
                    <div className='reqFieldDivreq'>
                      <h6>Img1</h6>
                    </div>
                    <div className='reqFieldInputreq'>
                      <input
                        type='text'
                        name='hotel4Img1'
                        value={hotel4Img1}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className='flexField'>
                    <div className='reqFieldDivreq'>
                      <h6>Img2</h6>
                    </div>
                    <div className='reqFieldInputreq'>
                      <input
                        type='text'
                        name='hotel4Img2'
                        value={hotel4Img2}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className='flexField'>
                    <div className='reqFieldDivreq'>
                      <h6>Img3</h6>
                    </div>
                    <div className='reqFieldInputreq'>
                      <input
                        type='text'
                        name='hotel4Img3'
                        value={hotel4Img3}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className='flexField'>
                    <div className='reqFieldDivreq'>
                      <h6>Additional Information</h6>
                    </div>
                    <div className='reqFieldInputreq'>
                      <input
                        type='text'
                        name='tCondition4'
                        value={tCondition4}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {hotels.length === 4 ? null : (
                <button
                  style={{
                    border: 'none',
                    outline: 'none',
                    backgroundColor: 'coral',
                    padding: 5,
                    color: '#fff',
                    margin: 5,
                  }}
                  onClick={() =>
                    setHotels(new Array(hotels.length + 1).fill('o'))
                  }>
                  +
                </button>
              )}
              {hotels.length === 1 ? null : (
                <button
                  style={{
                    border: 'none',
                    outline: 'none',
                    backgroundColor: 'coral',
                    padding: 5,
                    color: '#fff',
                    margin: 5,
                  }}
                  onClick={() =>
                    setHotels(new Array(hotels.length - 1).fill('o'))
                  }>
                  -
                </button>
              )}
            </div>
          </div>
        );
      case 3:
        return (
          <div className='taxiField'>
            <div>
              <div className='flexField'>
                <div className='reqFieldDivreq'>
                  <h6>Transfer name</h6>
                </div>
                <div className='reqFieldInputreq'>
                  <select
                    name='taxiName'
                    value={taxiName}
                    onChange={(e) => {
                      setTaxiImages(e.target.value);
                    }}>
                    <option value='' disabled selected hidden>
                      Select
                    </option>
                    {taxis.map((t, i) => {
                      return (
                        <option key={i} value={t.taxiName}>
                          {t.taxiName}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
            </div>
            <div>
              <div className='flexField'>
                <div className='reqFieldDivreq'>
                  <h6>Img1</h6>
                </div>
                <div className='reqFieldInputreq'>
                  <input
                    type='text'
                    name='taxiImg1'
                    value={taxiImg1}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className='flexField'>
                <div className='reqFieldDivreq'>
                  <h6>Img2</h6>
                </div>
                <div className='reqFieldInputreq'>
                  <input
                    type='text'
                    name='taxiImg2'
                    value={taxiImg2}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className='flexField'>
                <div className='reqFieldDivreq'>
                  <h6>Img3</h6>
                </div>
                <div className='reqFieldInputreq'>
                  <input
                    type='text'
                    name='taxiImg3'
                    value={taxiImg3}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <>
            <div className='otherField'>
              <div className='flexField'>
                <div className='reqFieldDivreq'>
                  <h6>No of Days</h6>
                </div>
                <div className='reqFieldInputreq'>
                  <input
                    type='text'
                    name='noOfDays'
                    value={noOfDays}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className='flexField'>
                <div className='reqFieldDivreq'>
                  <h6>Kilometers</h6>
                </div>
                <div className='reqFieldInputreq'>
                  <input
                    type='text'
                    name='kiloMeters'
                    value={kiloMeters}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            <div className='flexField'>
              <div className='reqFieldDivreq'>
                <h6>Days Limit</h6>
              </div>
              <div className='reqFieldInputreq'>
                <input
                  type='text'
                  name='daysLimit'
                  value={daysLimit}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className='flexField'>
              <div className='reqFieldDivreq'>
                <h6>Terms and condition</h6>
              </div>
              <div className='reqFieldInputreq-'>
                <textarea
                  style={{
                    backgroundColor: 'transparent',
                    border: 'none',
                    outline: 'none',
                    color: 'white',
                  }}
                  cols='20'
                  rows='1'
                  name='termsCondition'
                  value={termsCondition}
                  onChange={handleChange}
                />
              </div>
            </div>
          </>
        );
      case 5:
        return (
          <>
            <div className='flightFields'>
              <div>
                <h5>Onward</h5>
                <div className='transCat'>
                  <div className='transcatS'>
                    <input
                      type='radio'
                      name='onwardTransportMode'
                      value='Flight'
                      onChange={handleChange}
                    />
                    <label>Flight</label>
                  </div>
                  <div className='transcatS'>
                    <input
                      type='radio'
                      name='onwardTransportMode'
                      value='Train'
                      onChange={handleChange}
                    />
                    <label>Train</label>
                  </div>
                  <div className='transcatS'>
                    <input
                      type='radio'
                      name='onwardTransportMode'
                      value='Bus'
                      onChange={handleChange}
                    />
                    <label>Bus</label>
                  </div>
                </div>
                <div className='flightFlexField'>
                  <div className='reqFieldDivv'>
                    <h6>Name</h6>
                  </div>
                  <div className='reqFieldInputt'>
                    <input
                      type='text'
                      name='onwardFlightName'
                      value={onwardFlightName}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className='flightFlexField'>
                  <div className='reqFieldDivv'>
                    <h6>From</h6>
                  </div>
                  <div className='reqFieldInputt'>
                    <input
                      type='text'
                      name='onwardFrom'
                      value={onwardFrom}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className='flightFlexField'>
                  <div className='reqFieldDivv'>
                    <h6>From City Code</h6>
                  </div>
                  <div className='reqFieldInputt'>
                    <input
                      type='text'
                      name='onwardFromCityCode'
                      value={onwardFromCityCode}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className='flightFlexField'>
                  <div className='reqFieldDivv'>
                    <h6>To</h6>
                  </div>
                  <div className='reqFieldInputt'>
                    <input
                      type='text'
                      name='onwardTo'
                      value={onwardTo}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className='flightFlexField'>
                  <div className='reqFieldDivv'>
                    <h6>To CIty Code</h6>
                  </div>
                  <div className='reqFieldInputt'>
                    <input
                      type='text'
                      name='onwardToCityCode'
                      value={onwardToCityCode}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className='flightFlexField'>
                  <div className='reqFieldDivv'>
                    <h6>Departure Date</h6>
                  </div>
                  <div className='reqFieldInputt'>
                    <input
                      type='date'
                      name='onwardDepartureDate'
                      value={onwardDepartureDate}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className='flightFlexField'>
                  <div className='reqFieldDivv'>
                    <h6>Departure Time</h6>
                  </div>
                  <div className='reqFieldInputt'>
                    <input
                      type='text'
                      name='onwardDepartureTime'
                      value={onwardDepartureTime}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className='flightFlexField'>
                  <div className='reqFieldDivv'>
                    <h6>Arrival Date</h6>
                  </div>
                  <div className='reqFieldInputt'>
                    <input
                      type='date'
                      name='onwardArrivalDate'
                      value={onwardArrivalDate}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className='flightFlexField'>
                  <div className='reqFieldDivv'>
                    <h6>Arrival Time</h6>
                  </div>
                  <div className='reqFieldInputt'>
                    <input
                      type='text'
                      name='onwardArrivalTime'
                      value={onwardArrivalTime}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
              <div>
                <h5>Return</h5>
                <div className='transCat'>
                  <div className='transcatS'>
                    <input
                      type='radio'
                      name='returnTransportMode'
                      value='Flight'
                      onChange={handleChange}
                    />
                    <label>Flight</label>
                  </div>
                  <div className='transcatS'>
                    <input
                      type='radio'
                      name='returnTransportMode'
                      value='Train'
                      onChange={handleChange}
                    />
                    <label>Train</label>
                  </div>
                  <div className='transcatS'>
                    <input
                      type='radio'
                      name='returnTransportMode'
                      value='Bus'
                      onChange={handleChange}
                    />
                    <label>Bus</label>
                  </div>
                </div>
                <div className='flightFlexField'>
                  <div className='reqFieldDivv'>
                    <h6>Name</h6>
                  </div>
                  <div className='reqFieldInputt'>
                    <input
                      type='text'
                      name='returnFlightName'
                      value={returnFlightName}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className='flightFlexField'>
                  <div className='reqFieldDivv'>
                    <h6>From</h6>
                  </div>
                  <div className='reqFieldInputt'>
                    <input
                      type='text'
                      name='returnFrom'
                      value={returnFrom}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className='flightFlexField'>
                  <div className='reqFieldDivv'>
                    <h6>From CIty Code</h6>
                  </div>
                  <div className='reqFieldInputt'>
                    <input
                      type='text'
                      name='returnFromCityCode'
                      value={returnFromCityCode}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className='flightFlexField'>
                  <div className='reqFieldDivv'>
                    <h6>To</h6>
                  </div>
                  <div className='reqFieldInputt'>
                    <input
                      type='text'
                      name='returnTo'
                      value={returnTo}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className='flightFlexField'>
                  <div className='reqFieldDivv'>
                    <h6>To CIty Code</h6>
                  </div>
                  <div className='reqFieldInputt'>
                    <input
                      type='text'
                      name='returnToCityCode'
                      value={returnToCityCode}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className='flightFlexField'>
                  <div className='reqFieldDivv'>
                    <h6>Departure Date</h6>
                  </div>
                  <div className='reqFieldInputt'>
                    <input
                      type='date'
                      name='returnDepartureDate'
                      value={returnDepartureDate}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className='flightFlexField'>
                  <div className='reqFieldDivv'>
                    <h6>Departure Time</h6>
                  </div>
                  <div className='reqFieldInputt'>
                    <input
                      type='text'
                      name='returnDepartureTime'
                      value={returnDepartureTime}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className='flightFlexField'>
                  <div className='reqFieldDivv'>
                    <h6>Arrival Date</h6>
                  </div>
                  <div className='reqFieldInputt'>
                    <input
                      type='date'
                      name='returnArrivalDate'
                      value={returnArrivalDate}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className='flightFlexField'>
                  <div className='reqFieldDivv'>
                    <h6>Arrival Time</h6>
                  </div>
                  <div className='reqFieldInputt'>
                    <input
                      type='text'
                      name='returnArrivalTime'
                      value={returnArrivalTime}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          </>
        );
      default:
        break;
    }
  };

  return (
    <>
      <div className='salesField'>
        <div className='plan_Fieldss'>
          <div className='basic_Fields'>
            <h4
              onClick={() => setStep(1)}
              style={{
                color: step === 1 ? '#fff' : '',
              }}>
              General
            </h4>
            <h4
              onClick={() => setStep(2)}
              style={{
                color: step === 2 ? '#fff' : '',
              }}>
              Hotel
            </h4>
            <h4
              onClick={() => setStep(3)}
              style={{
                color: step === 3 ? '#fff' : '',
              }}>
              Transfer
            </h4>
            <h4
              onClick={() => setStep(4)}
              style={{
                color: step === 4 ? '#fff' : '',
              }}>
              Other
            </h4>
            <h4
              onClick={() => setStep(5)}
              style={{
                color: step === 5 ? '#fff' : '',
              }}>
              Transport
            </h4>
          </div>
          <div className='step_Fields'>{renderSteps(step)}</div>
          <div>
            {Object.keys(planKey).length === 0 ? (
              <div className='PlanFieldButton'>
                <button onClick={submit}>Submit</button>
              </div>
            ) : (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <div className='PlanFieldButton'>
                  <button onClick={update} style={{ margin: 5 }}>
                    Update
                  </button>
                </div>
                <div className='PlanFieldButton'>
                  <button
                    style={{ margin: 5 }}
                    onClick={() => {
                      deletePlan(key);
                    }}>
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SalesAdmin;
