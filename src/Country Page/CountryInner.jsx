import React, { useEffect, useState, useContext, useRef } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import './CountryInner.css';
import axios from 'axios';
import { API } from '../backend';
import SimilarTour from './SimilarTour';
import { ApiContext } from '../Context/ApiContext';
import Slider from 'react-slick';
import { Link } from 'react-scroll';
import { SemipolarLoading } from 'react-loadingg';
import { Form } from 'reactstrap';
import { AiOutlineUserAdd, AiOutlineWhatsApp } from 'react-icons/ai';
import { FaCity, FaRegMoneyBillAlt } from 'react-icons/fa';
import { GiPerson, GiCalendar } from 'react-icons/gi';
import { MdDateRange } from 'react-icons/md';
import { HiOutlineCalendar } from 'react-icons/hi';
import { RiCalendar2Line } from 'react-icons/ri';
import { BiDuplicate } from 'react-icons/bi';
import DatePicker from 'react-datepicker';
import { isAuthenticated } from '../Login components/auth';
import { firedb } from '../firebase';
import Modals from './../Tour Categories/Modal';
import { useToasts } from 'react-toast-notifications';
import TourCountryTestimonials from '../TourCountryTestimonials/TourCountryTestimonials';
import Navbar from '../Home components/Navbar/Navbar';
import Footer from '../Home components/Footer/Footer';
import moment from 'moment';

const CountryInner = () => {
  const isMounted = useRef(false);
  const { addToast } = useToasts();
  const [testimonials, setTestimonials] = useState([]);
  const { countryname } = useParams();
  const { countries } = useContext(ApiContext);
  const [countryDetails, setCountryDetails] = useState({});
  const [tourDetails, setTourDetails] = useState([]);
  const [cityDetails, setCityDetails] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedTour, setSelectedTour] = useState('');
  const [countryLoaded, setCountryLoaded] = useState(false);
  const [dateModel, setDateModel] = useState(false);
  const [personsModel, setPersonsModel] = useState(false);
  const [adult, setAdult] = useState(0);
  const [children, setChildren] = useState(0);
  const [toggleInfo, setToggleInfo] = useState('Flexible');
  const [tourCategories, setTourCategories] = useState('');
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [departure, setDeparture] = useState('');
  const [date, setDate] = useState();
  const [month, setMonth] = useState();
  const [budget, setBudget] = useState('');
  const [year, setYear] = useState();
  const { user } = isAuthenticated();
  let random;
  let formatedMonth;
  const [startDate, setStartDate] = useState('');
  const [week, setWeek] = useState('');
  const [modalIsOpen, setIsOpen] = useState(false);
  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }

  const submitData = (e) => {
    let values = {
      fromDate: `${startDate}, ${week}`,
      tourType: '',
      travellerType: '',
      adult: adult,
      children: children,
      travelMode: '',
      preferanece: '',
      destination: countryDetails.countryName,
      startPoint: departure,
      name: name,
      number: number,
      budget: '',
      requestID: `TO-${date}${formatedMonth}${year}-${random}`,
      status: 'Query Received',
      plans: '',
      reports: '',
      tourCost: '',
      budget: budget,
      userID: user.uid,
      tourCategory: tourCategories,
      requestDate: new Date().toDateString(),
      receivedFrom: 'Website',
    };

    if (name !== '' && number !== '' && departure !== '') {
      firedb
        .ref(`requests`)
        .push(values)
        .then((data) => {
          addToast('Submitted Successfully', {
            appearance: 'success',
          });
        })
        .catch((err) => console.log('err', err));
    } else {
      addToast('All fields Required', {
        appearance: 'error',
      });
    }
  };

  const getCurrentUserData = () => {
    firedb.ref(`userGeneralInfo/${user.uid}`).on('value', (data) => {
      if (isMounted.current) {
        if (data !== null) {
          let val = data.val();
          setName(val.name);
          setNumber(val.phoneNumber);
        }
      }
    });
  };

  useEffect(() => {
    isMounted.current = true;
    if (user) {
      getCurrentUserData();
    }
    return () => (isMounted.current = false);
  }, []);

  useEffect(() => {
    random = Math.floor((Math.random() + 4) * 345334);
    const requestDate = new Date();
    let currentYear = requestDate.getFullYear();
    setMonth(requestDate.getMonth() + 1);
    setDate(requestDate.getDate());
    setYear(currentYear.toString().slice(2, 4));
    formatedMonth = month < 10 ? '0' + month : month;
  });

  const openDateModel = () => {
    setDateModel(!dateModel);
  };

  const openPersonsModel = () => {
    setPersonsModel(!personsModel);
    setDateModel(false);
  };

  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sept',
    'Oct',
    'Nov',
    'Dec',
  ];

  const weeks = ['1st week', '2nd week', '3rd week', '4th week'];

  var sectionStyle = {
    backgroundImage: `url(${countryDetails.imageUrl})`,
  };

  //   const getCountries = async () => {
  //     setCountryLoaded(true)
  //     try {
  //       const countryResponse = await axios.get(`${API}/country/${countryname}`)
  //       setCountryDetails(countryResponse.data[0])
  //       setCountryLoaded(false)
  //     } catch (err) {
  //       console.log(err, "err")
  //     }
  //   }

  //   const getCities = async () => {
  //     try {
  //       const cityResponse = await axios.get(
  //         `${API}/city/countryname/${countryname}`
  //       )
  //       setCityDetails(cityResponse.data)
  //     } catch (err) {
  //       console.log(err, "err")
  //     }
  //   }
  //   const getTours = async () => {
  //     try {
  //       const tourResponse = await axios.get(
  //         `${API}/tour/countryname/${countryname}`
  //       )
  //       setTourDetails(tourResponse.data)
  //     } catch (err) {
  //       console.log(err, "err")
  //     }
  //   }
  const getTestimonial = () => {
    firedb.ref('testimonials').on('value', (data) => {
      if (data !== null) {
        let req = [];
        data.forEach((d) => {
          if (isMounted.current) {
            if (d.val().tourPlace === countryname) req.push(d.val());
          }
        });
        setTestimonials(req);
      }
    });
  };

  const getFirstCityName = () => {
    setTimeout(() => {
      if (cityDetails.length > 0 && selectedCity === '') {
        setSelectedCity(cityDetails[0].cityName);
      }
    }, 2000);
  };
  getFirstCityName();

  useEffect(() => {
    setCountryLoaded(true);
    const source = axios.CancelToken.source();
    axios
      .get(`${API}/country/${countryname}`, {
        cancelToken: source.token,
      })
      .then((res) => {
        setCountryDetails(res.data[0]);
        setCountryLoaded(false);
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
  }, [countryname]);

  useEffect(() => {
    const source = axios.CancelToken.source();
    axios
      .get(`${API}/city/countryname/${countryname}`, {
        cancelToken: source.token,
      })
      .then((res) => {
        setCityDetails(res.data);
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
  }, [countryname]);

  useEffect(() => {
    const source = axios.CancelToken.source();
    axios
      .get(`${API}/tour/countryname/${countryname}`, {
        cancelToken: source.token,
      })
      .then((res) => {
        setTourDetails(res.data);
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
  }, []);

  useEffect(() => {
    isMounted.current = true;
    getTestimonial();
    return () => (isMounted.current = false);
  }, []);

  // const filterC = () => {
  //   const filterCountry = testimonials.filter((c) => {
  //     return c.tourPlace === countryname;
  //   });
  //   return filterCountry;
  // };

  var settings = {
    infinite: true,
    autoplay: true,
    speed: 1000,
    arrows: true,
    slidesToShow: 6.5,
    slidesToScroll: 2,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
          arrows: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
          arrows: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          arrows: false,
        },
      },
      {
        breakpoint: 360,
        settings: {
          slidesToShow: 1.5,
          slidesToScroll: 1,
          arrows: false,
        },
      },
      {
        breakpoint: 280,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
        },
      },
    ],
  };
  return (
    <>
      <Navbar />
      <div className='countryInner_Details'>
        <Modals modalIsOpen={modalIsOpen} closeModal={closeModal} />

        {countryLoaded ? (
          <SemipolarLoading
            style={{
              top: '150px',
              alignItems: 'center',
              left: '48%',
            }}
            size='large'
          />
        ) : (
          <>
            <div className='countryInner_image' style={sectionStyle}>
              <div className='countryInner_name'>
                <h1>{countryDetails.countryName}</h1>
              </div>
            </div>
            <div className='countryInner_cities'>
              <div className='cityName_container'>
                <Link
                  activeClass='active'
                  to='countryInner_about'
                  smooth={true}
                  duration={500}
                  spy={true}>
                  <p>About</p>
                </Link>
                <Link
                  activeClass='active'
                  to='highlights'
                  smooth={true}
                  spy={true}
                  duration={1000}>
                  <p>Cities</p>
                </Link>
                <Link
                  activeClass='active'
                  spy={true}
                  to='tours_section'
                  smooth={true}
                  duration={1500}>
                  {tourDetails.length === 0 ? null : <p>Tours</p>}
                </Link>
              </div>
            </div>
            <div className='countryInner_about'>
              <div className='countryInner_aboutLeft'>
                <div className='inner_home'>
                  <div className='icon_home'>
                    <NavLink to='/popular_countries'>
                      <i className='far fa-home-alt'></i>
                    </NavLink>
                  </div>
                  <div className='icon_right'>
                    <i className='fa fa-chevron-right'></i>
                  </div>
                  <div>
                    <span className='inner_title'>
                      {countryDetails.countryName}
                    </span>
                  </div>
                </div>
                <div className='inner_about'>
                  <p className='having'>Family</p>
                  <p className='having'> Romantic</p>
                  <p className='having'>Adventure</p>
                </div>
                <div className='main_about'>
                  <div className='inner_name'>
                    About <span> </span>:<span> </span>
                    {countryDetails.countryName}
                  </div>
                  <div className='inner_desc'>
                    {countryDetails.aboutCountry}
                  </div>
                </div>
                <div className='available'>
                  <div className='available-left'>
                    <div className='available_t'>
                      <div>
                        <i className='fas fa-cloud-sun-rain'></i>
                      </div>
                      <div>
                        <h6>Weather</h6>
                        <p className='locat'>{countryDetails.weather} ℃</p>
                      </div>
                    </div>
                    <div className='available_t'>
                      <div>
                        <i className='fal fa-plane-departure'></i>
                      </div>
                      <div>
                        <h6>Visa On Arrival</h6>

                        <p className='locat'>
                          {countryDetails.visa !== undefined
                            ? countryDetails.visa.onArrival
                            : ''}
                        </p>
                      </div>
                    </div>
                    <div className='available_t'>
                      <div>
                        <i className='fad fa-calendar-day'></i>
                      </div>
                      <div>
                        <h6>Ideal Days</h6>
                        <p className='locat'>{countryDetails.idealDays}</p>
                      </div>
                    </div>
                  </div>
                  <div className='avalable-right'>
                    <div className='available_t'>
                      <div>
                        <i className='fas fa-wallet'></i>
                      </div>
                      <div>
                        <h6>Curreny</h6>
                        <p className='locat'>
                          {countryDetails.general !== undefined
                            ? countryDetails.general.currency
                            : ''}
                        </p>
                      </div>
                    </div>
                    <div className='available_t'>
                      <div>
                        <i className='fas fa-hourglass-start'></i>
                      </div>
                      <div>
                        <h6>Best time to visit</h6>
                        <p className='locat'>
                          {countryDetails.general !== undefined
                            ? countryDetails.general.bestTimeToVisit.join(',')
                            : ''}
                        </p>
                      </div>
                    </div>
                    <div className='available_t'>
                      <div>
                        <i className='far fa-city'></i>
                      </div>
                      <div>
                        <h6>Major Cities</h6>
                        <p className='locat'>{countryDetails.bestPlaces}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className='countryInner_aboutRight'>
                <Form>
                  <div className='countryInner_tit'>
                    <div>
                      <h6 className='countryInner_tithh'>
                        <b>Customise your trip to</b>
                      </h6>
                    </div>
                    <div className='countryInner_tith'>
                      <b>{countryDetails.countryName}</b>
                    </div>
                  </div>
                  <div className='countryInner_form'>
                    <div className='countryInner_names'>
                      <AiOutlineUserAdd className='countryInner_i' />
                      <input
                        type='text'
                        placeholder='Name'
                        required
                        onChange={(e) => {
                          if (isAuthenticated()) {
                            setName(e.target.value);
                          } else {
                            return openModal();
                          }
                        }}
                        value={name}
                      />
                    </div>
                    <div className='countryInner_no'>
                      <AiOutlineWhatsApp className='countryInner_i' />
                      <input
                        type='text'
                        placeholder='Whatsapp no.'
                        required
                        onChange={(e) => {
                          if (isAuthenticated()) {
                            setNumber(e.target.value);
                          } else {
                            return openModal();
                          }
                        }}
                        value={number}
                        maxLength='10'
                      />
                    </div>
                    <div className='countryInner_mail'>
                      <FaCity className='countryInner_i' />
                      <input
                        type='text'
                        placeholder='Departure City'
                        required
                        onChange={(e) => {
                          if (isAuthenticated()) {
                            setDeparture(e.target.value);
                          } else {
                            return openModal();
                          }
                        }}
                        value={departure}
                      />
                    </div>
                    <div className='countryInner_persons'>
                      <div
                        className='countryInner_persons-flex'
                        onClick={openPersonsModel}>
                        <div className='countryInner_ii'>
                          <GiPerson />
                        </div>
                        <div className='countryInner_inputp'>
                          {adult === 0 && children === 0 ? (
                            'No. of travellers'
                          ) : (
                            <h6>
                              {adult} adults, {adult === 0 ? 0 : children}
                              childrens
                            </h6>
                          )}
                        </div>
                      </div>
                      <div
                        className={
                          personsModel
                            ? 'countryInner_persons-model'
                            : 'countryInner_persons-model-none'
                        }>
                        <div className='adult-main-flex'>
                          <div className='adults'>Adults</div>
                          <div className='adult-flex'>
                            <div
                              className='adult-sub'
                              onClick={() => {
                                if (adult !== 0) setAdult(adult - 1);
                              }}>
                              -
                            </div>
                            <div className='adult-no'>{adult}</div>
                            <div
                              className='adult-add'
                              onClick={() => {
                                setAdult(adult + 1);
                              }}>
                              +
                            </div>
                          </div>
                        </div>
                        <div className='child-main-flex'>
                          <div className='childs'>Children</div>
                          <div className='child-flex'>
                            <div
                              className='child-sub'
                              onClick={() => {
                                if (children !== 0) setChildren(children - 1);
                              }}>
                              -
                            </div>
                            <div className='child-no'>
                              {adult === 0 ? 0 : children}
                            </div>
                            {adult !== 0 ? (
                              <div
                                className='child-add'
                                onClick={() => {
                                  setChildren(children + 1);
                                }}>
                                +
                              </div>
                            ) : (
                              <div disabled className='child-adds'>
                                +
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='countryInner_date'>
                      <div
                        className='countryInner_date-flex'
                        onClick={openDateModel}>
                        <div className='countryInner_ii'>
                          <MdDateRange />
                        </div>
                        <div className='countryInner_inputd'>
                          {startDate === '' ? (
                            'Dates of travel'
                          ) : (
                            <h6>
                              Travel Date:{startDate},<span> </span> {week}
                            </h6>
                          )}
                        </div>
                      </div>
                      <div
                        className={
                          dateModel
                            ? 'countryInner_date-model'
                            : 'countryInner_date-model-none'
                        }>
                        <div className='countryInner_date-model-type'>
                          <HiOutlineCalendar />
                          <div className='countryInner-d'>
                            Travel dates are?
                          </div>
                        </div>
                        <div className='countryInner-date-model-cat'>
                          <div
                            onClick={() => {
                              setToggleInfo('Flexible');
                            }}
                            className={
                              toggleInfo === 'Flexible'
                                ? 'date-flexible'
                                : 'date-none'
                            }>
                            Flexible
                          </div>
                          <div
                            onClick={() => {
                              setToggleInfo('Fixed');
                            }}
                            className={
                              toggleInfo === 'Fixed'
                                ? 'date-fixed'
                                : 'date-none'
                            }>
                            Fixed
                          </div>
                        </div>
                        {toggleInfo === 'Flexible' ? (
                          <>
                            <div className='countryInner_month'>
                              <HiOutlineCalendar />
                              <div className='countryInner-d'>
                                Select the month of travel
                              </div>
                            </div>
                            <div className='countryInner_month-cat'>
                              {months.map((months, i) => (
                                <div
                                  key={i}
                                  className={'month-cat'}
                                  onClick={() => setStartDate(months)}
                                  style={{
                                    backgroundColor: startDate.includes(months)
                                      ? '#db6500'
                                      : '',
                                    color: startDate.includes(months)
                                      ? '#fff'
                                      : '',
                                    borderRadius: startDate.includes(months)
                                      ? '20px'
                                      : '',
                                  }}>
                                  {months}
                                </div>
                              ))}
                            </div>
                            <div className='countryInner_week'>
                              <RiCalendar2Line />
                              <div className='countryInner-d'>
                                Select the week of travel
                              </div>
                            </div>
                            <div className='countryInner_week-cat'>
                              {weeks.map((weeks, i) => (
                                <div
                                  key={i}
                                  className='week-cat'
                                  onClick={() => setWeek(weeks)}
                                  style={{
                                    backgroundColor: week.includes(weeks)
                                      ? '#db6500'
                                      : '',
                                    color: week.includes(weeks) ? '#fff' : '',
                                    borderRadius: week.includes(weeks)
                                      ? '20px'
                                      : '',
                                  }}>
                                  {weeks}
                                </div>
                              ))}
                            </div>
                          </>
                        ) : (
                          <>
                            <div className='countryInner_calender'>
                              <GiCalendar />
                              <div className='countryInner-d'>
                                Select the start date of travel
                              </div>
                            </div>
                            <div className='datePicker'>
                              <input
                                type='date'
                                min={moment()
                                  .add(14, 'days')
                                  .format('YYYY-MM-DD')}
                                onChange={(e) => {
                                  // const d = date.toDateString();
                                  setStartDate(e.target.value);
                                }}
                                data-date-inline-picker='true'
                              />
                              {/* <DatePicker
                                minDate={moment()
                                  .add(14, "days")
                                  .format("YYYY-MM-DD")}
                                onChange={(date) => {
                                  const d = date.toDateString();
                                  setStartDate(d);
                                }}
                                inline
                              /> */}
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                    <div className='countryInner_category'>
                      <BiDuplicate className='countryInner_i' />
                      <select
                        required
                        onChange={(e) => {
                          setTourCategories(e.target.value);
                        }}>
                        <option value='' disabled selected hidden>
                          Tour category
                        </option>
                        <option value='Planned Tour'>Planned Tour</option>
                        <option value='Honeymoon Tour'>Honeymoon Tour</option>
                        {/* <option value="Surprise Tour">Surprise Tour</option> */}
                        <option value='Luxury Tour'>Luxury Tour</option>
                        <option value='Wildlife Tour'>Wildlife Tour</option>
                      </select>
                    </div>
                    <div className='countryInner_names'>
                      <FaRegMoneyBillAlt className='countryInner_i' />
                      {tourCategories === '' ? (
                        <input
                          type='text'
                          placeholder='Budget'
                          required
                          onChange={(e) => {
                            setBudget(e.target.value);
                          }}
                          value={budget}
                        />
                      ) : (
                        <>
                          {tourCategories === 'Luxury Tour' ? (
                            <input
                              type='text'
                              placeholder='Budget - Min.75000'
                              required
                              onChange={(e) => {
                                setBudget(e.target.value);
                              }}
                              value={budget}
                            />
                          ) : (
                            <>
                              {tourCategories === 'Wildlife Tour' ? (
                                <input
                                  type='text'
                                  placeholder='Budget - Min.20000'
                                  required
                                  onChange={(e) => {
                                    setBudget(e.target.value);
                                  }}
                                  value={budget}
                                />
                              ) : (
                                <input
                                  type='text'
                                  placeholder='Budget - Min.40000'
                                  required
                                  onChange={(e) => {
                                    setBudget(e.target.value);
                                  }}
                                  value={budget}
                                />
                              )}
                            </>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                  <div className='countryInner_btn'>
                    {tourCategories === 'Luxury Tour' ? (
                      <>
                        {budget >= 75000 ? (
                          <button
                            className='countryInner_button'
                            onClick={(e) => {
                              if (isAuthenticated()) {
                                submitData(e);
                              }
                            }}>
                            PLAN NOW
                          </button>
                        ) : (
                          <button className='countryInner_button' disabled>
                            PLAN NOW
                          </button>
                        )}
                      </>
                    ) : (
                      <>
                        {tourCategories === 'Wildlife Tour' ? (
                          <>
                            {budget >= 20000 ? (
                              <button
                                className='countryInner_button'
                                onClick={(e) => {
                                  if (isAuthenticated()) {
                                    submitData(e);
                                  }
                                }}>
                                PLAN NOW
                              </button>
                            ) : (
                              <button className='countryInner_button' disabled>
                                PLAN NOW
                              </button>
                            )}
                          </>
                        ) : (
                          <>
                            {tourCategories !== 'Luxury Tour' &&
                            'Wildlife Tour' ? (
                              <>
                                {budget >= 40000 ? (
                                  <button
                                    className='countryInner_button'
                                    onClick={(e) => {
                                      if (isAuthenticated()) {
                                        submitData(e);
                                      }
                                    }}>
                                    PLAN NOW
                                  </button>
                                ) : (
                                  <button
                                    className='countryInner_button'
                                    disabled>
                                    PLAN NOW
                                  </button>
                                )}
                              </>
                            ) : (
                              <>
                                <button
                                  className='countryInner_button'
                                  disabled>
                                  PLAN NOW
                                </button>
                              </>
                            )}
                          </>
                        )}
                      </>
                    )}
                  </div>
                </Form>
              </div>
            </div>
            <div className='highlights'>
              <div className='highlights_title'>
                <h2>Cities</h2>
              </div>

              <div
                className={
                  cityDetails.length >= 6
                    ? 'highlights_image-flex1'
                    : 'highlights_image-flex2'
                }>
                {cityDetails.map((city, index) => {
                  return (
                    <div
                      className={
                        selectedCity === city.cityName
                          ? 'highlights_image_selected'
                          : 'highlights_image'
                      }
                      key={index}
                      onMouseOver={() => setSelectedCity(city.cityName)}>
                      <img src={city.imageUrl} alt='' />
                      <div
                        className={
                          selectedCity === city.cityName
                            ? 'highlights_image-subtitle-select'
                            : 'highlights_image-subtitle'
                        }>
                        {city.cityName}
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className='highlights_about'>
                {cityDetails.map((city, index) => {
                  if (city.cityName === selectedCity)
                    return (
                      <div className='highlights_about-desc' key={index}>
                        <h2>{city.cityName}</h2>
                        <p>{city.aboutCity}</p>
                      </div>
                    );
                })}
              </div>
            </div>
            {tourDetails.length === 0 ? null : (
              <div id='tours_section'>
                <SimilarTour
                  tour={tourDetails}
                  selectedTour={selectedTour}
                  setSelectedTour={setSelectedTour}
                  countryname={countryname}
                  heading={'Tours in'}
                />
              </div>
            )}

            <div className='similarcountries'>
              <div className='similar-countries'>
                <h2>Similar Countries</h2>
              </div>

              <Slider {...settings}>
                {countries.map((country, index) => {
                  if (country.countryName !== countryDetails.countryName)
                    return (
                      <div className={'countries-container'} key={index}>
                        <NavLink
                          className='plink'
                          to={{
                            pathname: `/countrydetails/${country.countryName}/${country._id}`,
                          }}>
                          <img src={country.imageUrl} alt='' />
                        </NavLink>
                        <div className={'similar-country-name'}>
                          {country.countryName}
                        </div>
                      </div>
                    );
                })}
              </Slider>
            </div>
            <TourCountryTestimonials testimonials={testimonials} />
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export default CountryInner;
