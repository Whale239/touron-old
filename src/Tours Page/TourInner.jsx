import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import './TourInner.css';
import axios from 'axios';
import { API } from '../backend';
import { SemipolarLoading } from 'react-loadingg';
import SimilarTour from '../Country Page/SimilarTour';
import { firedb } from '../firebase';
import TourCountryTestimonials from '../TourCountryTestimonials/TourCountryTestimonials';
import Navbar from '../Home components/Navbar/Navbar';
import Footer from '../Home components/Footer/Footer';
import parse from 'html-react-parser';

const TourInner = () => {
  const isMounted = useRef(false);
  const [testimonials, setTestimonials] = useState([]);
  const { tourname, countryname, cityname, tourid } = useParams();
  const [toggleInfo, setToggleInfo] = useState('Inclusion');
  const [tourDetails, setTourDetails] = useState({});
  const [similarTours, setSimilarTours] = useState([]);
  const [contentLoaded, setContentLoaded] = useState(false);
  const [selectedTour, setSelectedTour] = useState('');

  //   const getTours = async () => {
  //     setContentLoaded(true);
  //     try {
  //       const tourResponse = await axios.get(`${API}/tour/${tourid}`);
  //       setTourDetails(tourResponse.data);
  //       setContentLoaded(false);
  //     } catch (err) {
  //       console.log(err, "errbcbbdcb");
  //     }
  //   };
  //   const getSimilarTours = async () => {
  //     try {
  //       const tourResponse = await axios.get(
  //         `${API}/tour/countryname/${countryname}`
  //       );
  //       setSimilarTours(tourResponse.data);
  //     } catch (err) {
  //       console.log(err, "errbcbbdcb");
  //     }
  //   };

  useEffect(() => {
    setContentLoaded(true);
    const source = axios.CancelToken.source();
    axios
      .get(`${API}/tour/${tourid}`, {
        cancelToken: source.token,
      })
      .then((res) => {
        setTourDetails(res.data);
        setContentLoaded(false);
      })
      .catch((err) => {
        if (axios.isCancel(err)) {
          console.log('Axios request aborted.');
        } else {
          console.error(err);
        }
      });
    return () => {
      source.cancel();
    };
  }, [tourid]);

  useEffect(() => {
    const source = axios.CancelToken.source();
    axios
      .get(`${API}/tour/countryname/${countryname}`, {
        cancelToken: source.token,
      })
      .then((res) => {
        setSimilarTours(res.data);
      })
      .catch((err) => {
        if (axios.isCancel(err)) {
          console.log('Axios request aborted.');
        } else {
          console.error(err);
        }
      });
    return () => {
      source.cancel();
    };
  }, [tourDetails]);

  const getTestimonial = () => {
    firedb.ref('testimonials').on('value', (data) => {
      if (data !== null) {
        let req = [];
        data.forEach((d) => {
          if (d.val().tourPlace === cityname) req.push(d.val());
        });
        setTestimonials(req);
      }
    });
  };

  //   useEffect(() => {
  //     getTours();
  //   }, [tourid]);
  //   useEffect(() => {
  //     getSimilarTours();
  //   }, [tourDetails]);

  useEffect(() => {
    isMounted.current = true;
    getTestimonial();
    return () => (isMounted.current = false);
  }, []);

  return (
    <>
      <Navbar isOpen={true} />
      <div className='TourInner_Details'>
        {contentLoaded ? (
          <div className='loader'>
            <SemipolarLoading
              style={{
                top: '150px',
                alignItems: 'center',
                // left: "48%",
              }}
              size='large'
            />
          </div>
        ) : (
          <>
            <div className='TourFeatures_Container'>
              <div className='countryname_container'>
                <h1
                  style={{ color: '#ff7f00', fontFamily: 'newyorklargeblack' }}>
                  {tourDetails.countryName} : {tourDetails.cityName}
                </h1>
              </div>

              <div className='TourName_Navigation_container'>
                <div className='TourName_Navigation'>
                  <div className='AboutTour'>
                    <h1>{tourDetails.tourName}</h1>
                    <p>{tourDetails.aboutTour}</p>
                  </div>
                </div>

                <div className='TourFeatures_Details'>
                  <div className='TourHighlights'>
                    <div className='Highlights'>
                      <h1>Highlights</h1>

                      {tourDetails.pickUpPoint !== undefined ? (
                        <ul>
                          <li>Pick Up : {tourDetails.pickUpPoint.join(',')}</li>
                          <li>Tour Type : {tourDetails.tourPreferance} </li>
                        </ul>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className='TourFeatures'>
              <div className='travel'>
                <i className='fas fa-globe-europe tourtype'></i>
                <div className='Idealfor'>
                  <h2>Tour Type</h2>
                  {tourDetails.tourCategory !== undefined ? (
                    <>
                      <h6>{tourDetails.tourCategory.join(',')}</h6>
                    </>
                  ) : null}
                </div>
              </div>
              <div className='travel'>
                <i className='far fa-hiking idealfor'></i>
                <div className='Idealfor'>
                  <h2>Ideal For</h2>
                  {tourDetails.idealType !== undefined ? (
                    <h6>{tourDetails.idealType.join(',')} </h6>
                  ) : null}
                </div>
              </div>

              <div className='travel'>
                <i className='far fa-clock duration'></i>
                <div className='Idealfor'>
                  <h2>Duration</h2>
                  <h6>{tourDetails.tourDuration}</h6>
                </div>
              </div>
            </div>

            <div className='Tourintro'>
              <div className='TourInner_image'>
                <img src={tourDetails.imageUrl} alt='bhv' />
                {/* 
              {tourDetails.tourVideoSrc === "" ? null : (
                <iframe
                  width="100%"
                  height="800px"
                  src="https://www.youtube.com/embed/JvTzj71UlCg"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                ></iframe>
              )} */}
              </div>

              <div className='TourName'>
                {/* <h2>{tourDetails.tourName}</h2>
              <h6>{tourDetails.ratings} / 5 Stars</h6> */}
              </div>
            </div>

            {/* <div className="tour-video">
              <iframe
                width="75%"
                title="video"
                height="600px"
                src="https://www.youtube.com/embed/JvTzj71UlCg"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            </div> */}

            <div className='Informations_Container'>
              <div className='Informations'>
                <h1>
                  Tour Inclusions & <br></br>Additional information{' '}
                </h1>

                <div className='labels'>
                  <h6
                    onClick={() => {
                      setToggleInfo('Inclusion');
                    }}
                    className={
                      toggleInfo === 'Inclusion' ? 'Selectedlabels' : ''
                    }>
                    Inclusion
                  </h6>
                  <h6
                    onClick={() => {
                      setToggleInfo('Tips');
                    }}
                    className={toggleInfo === 'Tips' ? 'Selectedlabels' : ''}>
                    Extras
                  </h6>
                </div>
                {Object.keys(tourDetails).length === 0 ? null : (
                  <>
                    {tourDetails.additionalInformation === null ||
                    undefined ||
                    tourDetails.inclusion === null ||
                    undefined ? null : (
                      <div className='labels_details'>
                        {toggleInfo === 'Inclusion' ? (
                          <p>{parse(tourDetails.inclusion)}</p>
                        ) : (
                          <p>{parse(tourDetails.additionalInformation)}</p>
                        )}
                      </div>
                    )}
                  </>
                )}
              </div>

              <div className='question_blocks'>
                <div className='question_block-title'>Got a Question?</div>
                <div className='question_block-text'>
                  Do not hesitate to give us a call. We are an expert team and
                  we are happy to talk to you.
                </div>
                <div className='question_block-tel'>+91 8667801206</div>
                <div className='question_block-mail'>hello@touron.in</div>
              </div>
            </div>
            <div className='similar'>
              {similarTours.length === 0 ? null : (
                <SimilarTour
                  tour={similarTours}
                  selectedTour={selectedTour}
                  setSelectedTour={setSelectedTour}
                  countryname={countryname}
                  heading={'Similar tours in'}
                  tourname={tourname}
                />
              )}
            </div>
            <TourCountryTestimonials testimonials={testimonials} />
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export default TourInner;
