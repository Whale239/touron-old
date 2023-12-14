import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { API } from './../../backend';
import './SelfPlanTour.css';
import { firedb } from './../../firebase';
import { AiOutlineClose, AiOutlinePlus } from 'react-icons/ai';
import { BsPersonFill } from 'react-icons/bs';
import { MdChildCare } from 'react-icons/md';
import { GrFormPrevious } from 'react-icons/gr';
import { GrFormNext } from 'react-icons/gr';
import { Link } from 'react-router-dom';
// import { Pie } from 'react-chartjs-2';
import { isAuthenticated } from '../../Login components/auth';
import { ApiContext } from './../../Context/ApiContext';
import { Progress } from 'reactstrap';
import { Facebook, Ripple } from 'react-spinners-css';

import parse from 'html-react-parser';
import moment from 'moment';
import Modals from './../Modal';
import ACK from '../../assests/1.png';

const SelfPlanTour = () => {
  const [step, setStep] = useState(1);
  const [selectedState, setSelectedState] = useState('');
  const [cities, setCities] = useState([]);
  const [countries, setCountries] = useState([]);
  const [tour, setTours] = useState([]);
  const [dcities, setDCities] = useState([]);
  const [states, setStates] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [countrySearchText, setCountrySearchText] = useState('');
  const [selectedCity, setSelectedCity] = useState([]);
  const [selectedCityNames, setSelectedCityNames] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState([]);
  const [selectedCountryNames, setSelectedCountryNames] = useState([]);
  const [active, setActive] = useState(0);
  const [selectedTours, setSelectedTours] = useState([]);
  const [selectedTourNames, setSelectedTourNames] = useState([]);
  const [totalDays, setTotalDays] = useState(0);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [adult, setAdult] = useState(0);
  const [children, setChildren] = useState(0);
  const { userInfo } = useContext(ApiContext);
  const [activeCity, setActiveCIty] = useState('');
  const [activeCountry, setActiveCountry] = useState('');
  const [isLoggedin, setIsLoggedin] = useState(false);
  const { user } = isAuthenticated();
  const [cityDurations, setCityDurations] = useState({});
  const [loaded, setLoaded] = useState(false);
  const [submitLoaded, setSubmitLoaded] = useState(false);
  const [tourType, setTourtype] = useState('');
  const [hotelType, setHoteltype] = useState('');
  const [travelmode, setTravelmode] = useState('');
  const [flightType, setFlightType] = useState('');
  const [showS, setShowS] = useState(false);
  const [activec, setActiveC] = useState();
  function closeLogModal() {
    setIsOpen(false);
  }
  const [modalIsOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isAuthenticated()) return setIsLoggedin(true);
  }, []);
  const getCities = async (c) => {
    if (selectedCountry.length === 0) return;
    try {
      setLoaded(true);
      setCities([]);
      const cityResponse = await axios.get(`${API}/city/countryname/${c}`);
      setStep(2);
      setCities(cityResponse.data);
      setLoaded(false);
    } catch (err) {
      console.log(err, 'err');
    }
  };

  // const getCountry = async () => {
  //   try {
  //     setLoaded(true);
  //     const countryResponse = await axios.get(`${API}/country`);
  //     setCountries(countryResponse.data);
  //     setLoaded(false);
  //   } catch (err) {
  //     console.log(err, 'err');
  //   }
  // };

  useEffect(() => {
    setLoaded(true);
    const source = axios.CancelToken.source();
    axios
      .get(`${API}/country`, {
        cancelToken: source.token,
      })
      .then((res) => {
        setCountries(res.data);
        setLoaded(false);
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

  // const getStates = async () => {
  //   try {
  //     setLoaded(true);
  //     const stateResponse = await axios.get(`${API}/state`);
  //     setStates(stateResponse.data);
  //     setLoaded(false);
  //   } catch (err) {
  //     console.log(err, 'err');
  //   }
  // };

  useEffect(() => {
    setLoaded(true);
    const source = axios.CancelToken.source();
    axios
      .get(`${API}/state`, {
        cancelToken: source.token,
      })
      .then((res) => {
        setStates(res.data);
        setLoaded(false);
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

  const getDomesticCities = async (name) => {
    try {
      setLoaded(true);

      const domesticResponse = await axios.get(
        `${API}/statecity/statename/${name}`
      );

      setDCities(domesticResponse.data);
      setLoaded(false);
    } catch (err) {
      console.log(err, 'err');
    }
  };

  const getTour = async (city) => {
    try {
      setLoaded(true);
      const tourResponse = await axios.get(`${API}/tour/cityname/${city}`);
      setTours(tourResponse.data);
      setLoaded(false);
    } catch (err) {
      console.log(err, 'err');
    }
  };
  // useEffect(() => {
  //   getCountry();
  //   getStates();
  // }, []);

  const submitDetails = () => {
    const v = moment().format('L');
    const r = Math.floor((Math.random() + 4) * 345334);
    const req = `TO-${v.slice(3, 5)}${v.slice(0, 2)}${v.slice(8)}-${r}`;
    setSubmitLoaded(true);
    firedb
      .ref(`self-planned-tours`)
      .push({
        requestID: req,
        tourCategory: 'Self Plan Tour',
        tourType: tourType,
        userId: user.uid,
        adult: adult,
        children: children,
        fromData: fromDate,
        toData: toDate,
        selectedCities: selectedCity,
        name: userInfo.name,
        phoneNumber: userInfo.phoneNumber,
        totalDays: totalDays,
        hotelType: hotelType,
        travelmode: travelmode,
        flightType: flightType,
        selectedState: selectedState,
        tourDetails: selectedTours,
        status: 'Query Received',
        tourCost: 0,
        receivedFrom: 'Website',
      })
      .then((data) => {
        setSubmitLoaded(false);
        if (tourType === 'Domestic') setStep(5);
        else setStep(6);
      })
      .catch((err) => console.log(err));
  };

  const onSearch = () => {
    if (searchText === '') return cities;
    const filter = cities.filter((c) => {
      return c.cityName
        .trim()
        .toLowerCase()
        .includes(searchText.trim().toLowerCase());
    });
    return filter;
  };
  const onCountrySearch = () => {
    if (countrySearchText === '') return countries;
    const filter = countries.filter((c) => {
      return c.countryName
        .trim()
        .toLowerCase()
        .includes(countrySearchText.trim().toLowerCase());
    });
    return filter;
  };

  let specificCityTours = [];

  selectedCityNames.forEach((city) => {
    const arr3 = selectedTours.filter((tour) => {
      return city.includes(tour.cityName);
    });
    specificCityTours.push({
      cityName: city,
      tours: arr3,
    });
  });

  // calculating specific city tours duratiom

  let cityTourDurations = [];
  specificCityTours.forEach((c) => {
    let tourduration = 0;
    c.tours.forEach((t) => {
      let length = t.tourDuration.length;
      tourduration +=
        length < 11
          ? t.tourDuration.slice(2, 4) * 1
          : t.tourDuration.slice(3, 5) * 1;
      return tourduration;
    });

    cityTourDurations.push({
      cityName: c.cityName,
      tourDurations: tourduration,
    });
  });

  // combining city days and that city durations

  let cityTourDetails = [];
  cityTourDurations.forEach((c) => {
    let city = {};
    selectedCity.forEach((t) => {
      if (t.cityName === c.cityName) {
        city = {
          cityName: t.cityName,
          tourDurations: c.tourDurations,
          cityDays: t.days,
        };
      }
    });
    cityTourDetails.push(city);
  });

  const renderSelfModal = () => {
    switch (step) {
      case 1:
        return (
          <div className='selftour'>
            <div className='countrySelection'>
              <div className='countryform'>
                <input
                  type='text'
                  name='searchText'
                  placeholder='Search Country'
                  onChange={(e) => setCountrySearchText(e.target.value)}
                />

                {loaded ? (
                  <Facebook />
                ) : (
                  <div className='selfcountries-container'>
                    {onCountrySearch().map((c, i) => {
                      return (
                        <div
                          className='singlecountry'
                          style={{
                            backgroundColor: selectedCountryNames.includes(
                              c.countryName
                            )
                              ? '#6A1B4D'
                              : '',
                            borderRadius: selectedCountryNames.includes(
                              c.countryName
                            )
                              ? 20
                              : 0,
                            color: selectedCountryNames.includes(c.countryName)
                              ? '#fff'
                              : '',
                          }}
                          onClick={() => {
                            if (isLoggedin) {
                              if (
                                selectedCountryNames.includes(c.countryName)
                              ) {
                                const filter = selectedCountry.filter((sc) => {
                                  return sc.countryName !== c.countryName;
                                });
                                setSelectedCountry(filter);
                                const filters = selectedCountryNames.filter(
                                  (sc) => {
                                    return sc !== c.countryName;
                                  }
                                );
                                setSelectedCountryNames(filters);
                              } else {
                                if (selectedCountry.length <= 1) {
                                  setSelectedCountry([...selectedCountry, c]);
                                  setSelectedCountryNames([
                                    ...selectedCountryNames,
                                    c.countryName,
                                  ]);
                                }
                              }
                            } else setIsOpen(true);
                          }}>
                          <img
                            src={c.imageUrl}
                            style={{
                              width: 50,
                              height: 50,
                              borderRadius: 25,
                            }}
                            alt=''
                          />
                          <h5>{c.countryName}</h5>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className='selftour'>
            <div className='citySelection'>
              <div className='citySelection-flex1'>
                <div>
                  <h4 className='heading'>Choose the cities</h4>
                </div>
                <div className='selectedcities-container'>
                  {selectedCountry.map((c) => (
                    <div className='selectedcities'>
                      <h5
                        style={{
                          cursor: 'pointer',
                          color:
                            activeCountry === c.countryName
                              ? '#35BDD0'
                              : 'black',
                        }}
                        onClick={() => {
                          setActiveCountry(c.countryName);
                          getCities(c.countryName);
                        }}>
                        {c.countryName}
                      </h5>
                    </div>
                  ))}
                </div>
                {loaded ? (
                  <div
                    style={{
                      width: '100%',
                      justifyContent: 'center',
                      height: '100%',
                      alignItems: 'center',
                    }}>
                    <Facebook />
                  </div>
                ) : (
                  <div className='tourlistc'>
                    {onSearch().map((t) => {
                      return (
                        <div className='tourlist'>
                          <div
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                            }}>
                            <img
                              src={t.imageUrl}
                              style={{
                                width: 80,
                                height: 80,
                                borderRadius: 20,
                              }}
                              alt='tourImage'
                            />
                            <div style={{ paddingLeft: 18 }}>
                              <h4>{t.cityName}</h4>
                            </div>
                          </div>
                          <div>
                            <AiOutlinePlus
                              style={{ cursor: 'pointer' }}
                              onClick={() => {
                                setSelectedCity([
                                  ...selectedCity,
                                  {
                                    cityName: t.cityName,
                                    imageUrl: t.imageUrl,
                                    days: 0,
                                    countryName: t.countryName,
                                  },
                                ]);
                                setSelectedCityNames([
                                  ...selectedCityNames,
                                  t.cityName,
                                ]);
                              }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {selectedCity.length > 0 ? (
                <div className='citySelection-flex2'>
                  <div>
                    <h4 className='heading'>Selected Cities</h4>
                  </div>
                  <div className='tourlistc'>
                    {selectedCity.map((t) => (
                      <div className='tourlist'>
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                          }}>
                          <img
                            src={t.imageUrl}
                            style={{
                              width: 65,
                              height: 65,
                              borderRadius: 15,
                            }}
                            alt='ccimage'
                          />
                          <div style={{ paddingLeft: 18 }}>
                            <h4>{t.cityName}</h4>
                          </div>
                        </div>
                        <div>
                          <AiOutlineClose
                            style={{ cursor: 'pointer' }}
                            onClick={() => {
                              const filter = selectedCity.filter((sa) => {
                                return sa.cityName !== t.cityName;
                              });
                              setActive(active - 1);
                              setSelectedCity(filter);
                              const filters = selectedCityNames.filter((sa) => {
                                return sa !== t.cityName;
                              });
                              setSelectedCityNames(filters);
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        );
      case 3:
        return (
          <div className='selftour'>
            <div className='detailsSelection'>
              <h4>Enter number of days in each city</h4>
              <div className='details-flex1'>
                {selectedCity.map((c) => (
                  <div className='scdates'>
                    <img src={c.imageUrl} alt='cimage' />
                    <div>
                      <h5>{c.cityName}</h5>
                      <h6>{c.countryName}</h6>
                    </div>
                    <input
                      type='number'
                      max={1}
                      onChange={(e) => {
                        const index = selectedCity.findIndex((a) => {
                          return a.cityName === c.cityName;
                        });
                        const ne = [...selectedCity];
                        ne[index].days = e.target.value;
                        setSelectedCity(ne);
                        setTotalDays(calculateTotalDays());
                      }}
                    />
                  </div>
                ))}
              </div>
              <div className='details-flex2'>
                <div className='dates'>
                  <div className='dcont'>
                    <BsPersonFill className='selfPlanIcon' />
                    <input
                      type='number'
                      placeholder='No of adults'
                      onChange={(e) => {
                        setAdult(e.target.value);
                      }}
                    />
                  </div>
                  <div className='dcont'>
                    <MdChildCare className='selfPlanIcon' />
                    <input
                      type='number'
                      placeholder='Children'
                      onChange={(e) => {
                        setChildren(e.target.value);
                      }}
                    />
                  </div>
                  <div className='dcont'>
                    <input
                      type='date'
                      value={fromDate}
                      name='fromDate'
                      onChange={(e) => {
                        const date = moment(e.target.value)
                          .add(totalDays - 1, 'days')
                          .format('YYYY-MM-DD');
                        setFromDate(e.target.value);
                        setToDate(date);
                      }}
                    />
                    {fromDate === '' ? (
                      <h3>Onward Date</h3>
                    ) : (
                      <h3>{fromDate}</h3>
                    )}
                  </div>
                  <div className='dcont'>
                    <input
                      type='text'
                      placeholder='Return Date'
                      name='toDate'
                      value={toDate}
                      id=''
                      onChange={(e) => setToDate(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className='selftour'>
            <div className='citySelection  tourSelection'>
              <div className='citySelection-flex1'>
                <div>
                  <h4 className='heading'>Choose the Tours</h4>
                </div>
                <div className='selectedcities-container'>
                  {selectedCity.map((c) => (
                    <div className='selectedcities'>
                      <h5
                        style={{
                          cursor: 'pointer',
                          color:
                            activeCity === c.cityName ? '#35BDD0' : 'black',
                        }}
                        onClick={() => {
                          setActiveCIty(c.cityName);
                          getTour(c.cityName);
                        }}>
                        {c.cityName}
                      </h5>
                    </div>
                  ))}
                </div>
                {loaded ? (
                  <div
                    style={{
                      width: '100%',
                      justifyContent: 'center',
                      height: '100%',
                      alignItems: 'center',
                    }}>
                    <Facebook />
                  </div>
                ) : (
                  <div className='tourlistc'>
                    {tour.length === 0 ? (
                      <div className='notfound'>
                        <h2>Tours not found</h2>
                        <h6>
                          You can submit user request from the Planned tour
                          section{' '}
                        </h6>
                        <Link to='/planned-tour'>
                          <button>Go to Planned tour</button>
                        </Link>
                        {/* <img
                          src="https://image.freepik.com/free-vector/oops-404-error-with-broken-robot-concept-illustration_114360-1920.jpg"
                          alt="timage"
                        /> */}
                      </div>
                    ) : (
                      <>
                        {tour.map((t) => {
                          return (
                            <div className='tourlist'>
                              <div
                                style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                }}>
                                <img
                                  src={t.imageUrl}
                                  style={{
                                    width: 80,
                                    height: 80,
                                    borderRadius: 20,
                                  }}
                                  alt=''
                                />
                                <div style={{ paddingLeft: 18 }}>
                                  <h4>{t.tourName}</h4>
                                  <Link
                                    className='plink'
                                    target='_blank'
                                    to={{
                                      pathname: `/tourdetails/${t.countryName}/${t.cityName}/${t.tourName}/${t._id}`,
                                    }}>
                                    <h6>See more details</h6>
                                  </Link>
                                </div>
                              </div>
                              <div>
                                <AiOutlinePlus
                                  style={{ cursor: 'pointer' }}
                                  onClick={() => {
                                    setSelectedTours([...selectedTours, t]);
                                    setSelectedTourNames([
                                      ...selectedTourNames,
                                      t.tourName,
                                    ]);
                                  }}
                                />
                              </div>
                            </div>
                          );
                        })}
                      </>
                    )}
                  </div>
                )}
              </div>
              {selectedTours.length > 0 ? (
                <div className='citySelection-flex2'>
                  <div>
                    <h4 className='heading'>Selected Tours</h4>
                  </div>
                  <div className='selectedcities-container'>
                    {specificCityTours.map((c) => (
                      <div className='selectedcities'>
                        <h5
                          style={{
                            cursor: 'pointer',
                          }}
                          onClick={() => {
                            setActiveCIty(c.cityName);
                            getTour(c.cityName);
                          }}>
                          {c.cityName} : {c.tours.length}
                        </h5>
                      </div>
                    ))}
                  </div>
                  <div className='tourlistc'>
                    {selectedTours.map((t) => (
                      <div className='tourlist'>
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                          }}>
                          <img
                            src={t.imageUrl}
                            style={{
                              width: 65,
                              height: 65,
                              borderRadius: 15,
                            }}
                            alt='tour imageS'
                          />
                          <div style={{ paddingLeft: 18 }}>
                            <h4>{t.tourName}</h4>
                          </div>
                        </div>
                        <div>
                          <AiOutlineClose
                            style={{ cursor: 'pointer' }}
                            onClick={() => {
                              const filter = selectedTourNames.filter((sa) => {
                                return sa !== t.tourName;
                              });
                              setSelectedTourNames(filter);
                              const filters = selectedTours.filter((sa) => {
                                return sa.tourName !== t.tourName;
                              });
                              setSelectedTours(filters);
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        );
      case 5:
        const state = {
          labels: [
            'Wander, Explore, Discover! – Quest Zone',
            'Got to recharge the batteries! – Snooze Time',
            'Transit hours between tour spots – Road Trip',
            'A mug of hot coffee & a book? – Your Me-Time!',
            'Yummy in the Tummy – The Food Hour',
          ],
          datasets: [
            {
              backgroundColor: [
                '#383CC1',
                '#C9DE00',
                '#2FDE00',
                '#00A6B4',
                '#6800B4',
              ],
              hoverBackgroundColor: [
                '#501800',
                '#4B5000',
                '#175000',
                '#003350',
                '#35014F',
              ],
              // data: [20, 30, 40, 50, 60],
              data: [
                (cityDurations.cityDays - 1) * 8,
                20,
                cityDurations.cityDays * 2,
                cityDurations.cityDays * 3,
                cityDurations.tourDurations,
              ],
            },
          ],
        };

        // return (
        //   <Pie
        //     data={state}
        //     width={750}
        //     height={330}
        //     options={{
        //       maintainAspectRatio: false,
        //       title: {
        //         display: true,
        //         text: "How Our Time Is Spent in hours",
        //         fontSize: 20,
        //       },
        //       legend: {
        //         display: true,
        //         position: "right",
        //       },
        //     }}
        //   />
        // );
        return (
          <div className='selftour'>
            <div className='citySelection'>
              <div className='citySelection-flex1'>
                <div className='selectedcities-container'>
                  {cityTourDetails.map((c) => (
                    <div className='selectedcities'>
                      <h5
                        style={{
                          cursor: 'pointer',
                          color:
                            cityDurations.cityName === c.cityName
                              ? '#35BDD0'
                              : 'black',
                        }}
                        onClick={() => {
                          setCityDurations(c);
                        }}>
                        {c.cityName}
                      </h5>
                    </div>
                  ))}
                </div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    marginTop: '10px',
                  }}>
                  <p>
                    'Wander, Explore, Discover! – Quest Zone' -{' '}
                    {(cityDurations.cityDays - 1) * 8}
                  </p>
                  <p>'Got to recharge the batteries! – Snooze Time' - {20}</p>
                  <p>
                    'Transit hours between tour spots – Road Trip' -{' '}
                    {cityDurations.cityDays * 2}
                  </p>
                  <p>
                    'A mug of hot coffee & a book? – Your Me-Time!' -{' '}
                    {cityDurations.cityDays * 3}
                  </p>
                  <p>
                    'Yummy in the Tummy – The Food Hour' -{' '}
                    {cityDurations.tourDurations}
                  </p>
                </div>
              </div>
              {/* <div style={{ width: '30%' }}>
                <Pie
                  data={state}
                  width={230}
                  height={80}
                  options={{
                    // maintainAspectRatio: false,
                    title: {
                      display: true,
                      text: 'How Our Time Is Spent in hours',
                      fontSize: 20,
                    },
                    legend: {
                      display: true,
                      position: 'right',
                    },
                  }}
                />
              </div> */}
            </div>
            <div style={{ paddingBottom: 5 }} className='ack'>
              {submitLoaded ? (
                <Ripple className='loa' color='coral' />
              ) : (
                <button onClick={submitDetails}>Submit</button>
              )}
            </div>
            {/* <div style={{ paddingBottom: 5 }} className="ack">
              <button onClick={submitDetails}>Submit</button>
            </div> */}
          </div>
        );
      case 6:
        return (
          <div className='ack'>
            <img src={ACK} alt='ackImage' />
            <p>
              "Yay!! You've successfully submitted the query for your Dream
              destination. You better get packing now, 'cause our experts have
              already started working their magic into your plan!"
            </p>
            <p>You can check the progress of your query in Self Plan Section</p>
            <Link to='/profile/selfplan'>
              <button>Go to Self Plan Section</button>
            </Link>
          </div>
        );
      default:
        break;
    }
  };

  const calculateTotalDays = () => {
    let count = 0;
    selectedCity.forEach((c) => {
      return (count = count + c.days * 1);
    });
    return count;
  };

  const renderDomesticModal = () => {
    switch (step) {
      case 1:
        return (
          <div className='selftour'>
            <div className='countrySelection'>
              <div className='countryform'>
                <input
                  type='text'
                  name='searchText'
                  placeholder='Search Country'
                  onChange={(e) => setCountrySearchText(e.target.value)}
                />

                {loaded ? (
                  <Facebook />
                ) : (
                  <div className='selfcountries-container'>
                    {states.map((c, i) => {
                      return (
                        <div
                          className='singlecountry'
                          style={{
                            backgroundColor:
                              selectedState === c.stateName ? '#6A1B4D' : '',
                            borderRadius:
                              selectedState === c.stateName ? 20 : 0,
                            color: selectedState === c.stateName ? '#fff' : '',
                          }}
                          onClick={() => {
                            if (isLoggedin) {
                              setSelectedState(c.stateName);
                            } else setIsOpen(true);
                          }}>
                          <img
                            src={c.imageUrl}
                            style={{
                              width: 50,
                              height: 50,
                              borderRadius: 25,
                            }}
                            alt='stateImage'
                          />
                          <h5>{c.stateName}</h5>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className='ct'>
            <div className='selftour'>
              <div className='citySelection'>
                <div className='citySelection-flex1'>
                  <div>
                    <h4 className='heading'>Choose the cities</h4>
                  </div>
                  <div className='selectedcities-container'>
                    <div className='selectedcities'>
                      <h5
                        style={{
                          cursor: 'pointer',
                          color: '#35BDD0',
                        }}>
                        {selectedState}
                      </h5>
                    </div>
                  </div>
                  {loaded ? (
                    <div
                      style={{
                        width: '100%',
                        justifyContent: 'center',
                        height: '100%',
                        alignItems: 'center',
                      }}>
                      <Facebook />
                    </div>
                  ) : (
                    <div className='tourlistc'>
                      {dcities.map((t) => {
                        return (
                          <div className='tourlist'>
                            <div
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                              }}>
                              <img
                                src={t.imageUrl}
                                style={{
                                  width: 80,
                                  height: 80,
                                  borderRadius: 20,
                                }}
                                alt='tourImage'
                              />
                              <div style={{ paddingLeft: 18 }}>
                                <h4>{t.cityName}</h4>
                              </div>
                            </div>
                            <div>
                              <AiOutlinePlus
                                style={{ cursor: 'pointer' }}
                                onClick={() => {
                                  setSelectedCity([
                                    ...selectedCity,
                                    {
                                      cityName: t.cityName,
                                      days: 0,
                                      stateName: t.stateName,
                                      idealDays: t.idealDays,
                                      suggestedCombinations:
                                        t.suggestedCombinations,
                                      imageUrl: t.imageUrl,
                                    },
                                  ]);
                                  setSelectedCityNames([
                                    ...selectedCityNames,
                                    t.cityName,
                                  ]);
                                }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                {selectedCity.length > 0 ? (
                  <div className='citySelection-flex2'>
                    <div>
                      <h4 className='heading'>Selected Cities</h4>
                    </div>
                    <div className='tourlistc'>
                      {selectedCity.map((t, i) => (
                        <>
                          <div className='tourlist'>
                            <div
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                              }}>
                              <img
                                src={t.imageUrl}
                                style={{
                                  width: 65,
                                  height: 65,
                                  borderRadius: 15,
                                }}
                                alt='ccimage'
                              />
                              <div style={{ paddingLeft: 18 }}>
                                <h4>{t.cityName}</h4>
                              </div>
                            </div>
                            <div>
                              <AiOutlineClose
                                onClick={() => {
                                  const filter = selectedCity.filter((sa) => {
                                    return sa.cityName !== t.cityName;
                                  });
                                  setSelectedCity(filter);
                                  const filters = selectedCityNames.filter(
                                    (sa) => {
                                      return sa !== t.cityName;
                                    }
                                  );
                                  setSelectedCityNames(filters);
                                }}
                              />
                            </div>
                          </div>
                          <div style={{ display: 'flex' }}>
                            <h6
                              style={{ color: '#35BDD0', cursor: 'pointer' }}
                              onClick={() => {
                                setActiveC(i);
                                setShowS(!showS);
                              }}>
                              Suggested Combinations
                            </h6>
                            {showS && i === activec ? (
                              <h6>{parse(t.suggestedCombinations)}</h6>
                            ) : null}
                          </div>
                        </>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className='selftour'>
            <div className='detailsSelection'>
              <h4>Enter number of days in each city</h4>
              <div className='details-flex1'>
                {selectedCity.map((c) => (
                  <div>
                    <div className='scdates'>
                      <img src={c.imageUrl} alt='cimage' />
                      <div>
                        <h5>{c.cityName}</h5>
                        <h6 style={{ fontSize: 13 }}>{c.stateName}</h6>
                      </div>
                      <h1
                        style={{ cursor: 'pointer' }}
                        onClick={() => {
                          const index = selectedCity.findIndex((a) => {
                            return a.cityName === c.cityName;
                          });
                          const ne = [...selectedCity];
                          if (selectedCity.length === 1) {
                            if (ne[index].days > 3) {
                              ne[index].days = ne[index].days - 1;
                            }
                          } else {
                            if (ne[index].days > 2) {
                              ne[index].days = ne[index].days - 1;
                            }
                          }
                          setSelectedCity(ne);
                          setTotalDays(calculateTotalDays());
                        }}>
                        -
                      </h1>
                      <input type='number' max={1} value={c.days} />
                      <h1
                        style={{ cursor: 'pointer' }}
                        onClick={() => {
                          const index = selectedCity.findIndex((a) => {
                            return a.cityName === c.cityName;
                          });
                          const ne = [...selectedCity];
                          ne[index].days = ne[index].days + 1;
                          setSelectedCity(ne);
                          setTotalDays(calculateTotalDays());
                        }}>
                        +
                      </h1>
                    </div>
                    {selectedCity.length === 1 ? (
                      <h6 style={{ color: 'red' }}>Ideal Days Required 3</h6>
                    ) : (
                      <>
                        {c.days <= 2 ? (
                          <h6 style={{ color: 'red' }}>
                            Ideal Days Required {c.idealDays}
                          </h6>
                        ) : null}
                      </>
                    )}
                  </div>
                ))}
              </div>
              <div className='details-flex2'>
                <div className='dates'>
                  <div className='dcont'>
                    <BsPersonFill style={{ marginLeft: 20 }} size={30} />
                    <input
                      type='number'
                      placeholder='No of adults'
                      onChange={(e) => {
                        setAdult(e.target.value);
                      }}
                    />
                  </div>
                  <div className='dcont'>
                    <MdChildCare style={{ marginLeft: 20 }} size={30} />
                    <input
                      type='number'
                      placeholder='Children'
                      onChange={(e) => {
                        setChildren(e.target.value);
                      }}
                    />
                  </div>
                  <div className='dcont'>
                    <input
                      style={{ cursor: 'pointer' }}
                      type='date'
                      value={fromDate}
                      name='fromDate'
                      onChange={(e) => {
                        const date = moment(e.target.value)
                          .add(totalDays - 1, 'days')
                          .format('YYYY-MM-DD');

                        setFromDate(e.target.value);
                        setToDate(date);
                      }}
                    />
                    {fromDate === '' ? (
                      <h3>Onward Date</h3>
                    ) : (
                      <h3>{fromDate}</h3>
                    )}
                  </div>
                  <div className='dcont'>
                    <input
                      type='text'
                      placeholder='Return Date'
                      name='toDate'
                      value={toDate}
                      id=''
                      onChange={(e) => setToDate(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className='selftour'>
            <div className='detailsSelection'>
              <h4>"Where would you like to stay?</h4>
              <div className='details-flex1'>
                <div
                  className='htype'
                  onClick={() => setHoteltype('3 Star Hotel')}
                  style={{
                    cursor: 'pointer',
                    borderColor:
                      hotelType === '3 Star Hotel' ? '#35BDD0' : '#333',
                    backgroundColor:
                      hotelType === '3 Star Hotel' ? '#35BDD0' : '#fff',
                  }}>
                  <h6>3 star Hotel</h6>
                </div>
                <div
                  className='htype'
                  onClick={() => setHoteltype('4 Star Hotel')}
                  style={{
                    cursor: 'pointer',
                    borderColor:
                      hotelType === '4 Star Hotel' ? '#35BDD0' : '#333',
                    backgroundColor:
                      hotelType === '4 Star Hotel' ? '#35BDD0' : '#fff',
                  }}>
                  <h6>4 star Hotel</h6>
                </div>
                <div
                  onClick={() => setHoteltype('5 Star Hotel')}
                  className='htype'
                  style={{
                    cursor: 'pointer',
                    borderColor:
                      hotelType === '5 Star Hotel' ? '#35BDD0' : '#333',
                    backgroundColor:
                      hotelType === '5 Star Hotel' ? '#35BDD0' : '#fff',
                  }}>
                  <h6>5 star Hotel</h6>
                </div>
              </div>
              <h4>"How would you like to travel to your destination?"</h4>

              <div className='details-flex2'>
                <div
                  className='htype'
                  onClick={() => setTravelmode('Train')}
                  style={{
                    cursor: 'pointer',
                    backgroundColor:
                      travelmode === 'Train' ? '#35BDD0' : '#fff',
                  }}>
                  <h6>Train</h6>
                </div>
                <div
                  className='htype'
                  onClick={() => setTravelmode('Flight')}
                  style={{
                    cursor: 'pointer',
                    backgroundColor:
                      travelmode === 'Flight' ? '#35BDD0' : '#fff',
                  }}>
                  <h6>Flight</h6>
                </div>
              </div>
              {travelmode === 'Flight' ? (
                <>
                  <h4 style={{ paddingTop: 20 }}>Preferred Flight Type</h4>
                  <div className='details-flex2'>
                    <div
                      className='htype'
                      onClick={() => setFlightType('Non Stop')}
                      style={{
                        cursor: 'pointer',
                        backgroundColor:
                          flightType === 'Non Stop' ? '#35BDD0' : '#fff',
                      }}>
                      <h6>Non Stop</h6>
                    </div>
                    <div
                      className='htype'
                      onClick={() => setFlightType('Low Fare')}
                      style={{
                        cursor: 'pointer',
                        backgroundColor:
                          flightType === 'Low Fare' ? '#35BDD0' : '#fff',
                      }}>
                      <h6>Low Fare</h6>
                    </div>
                  </div>
                </>
              ) : null}
              {/* <div
                style={{
                  paddingBottom: 5,
                  paddingTop: 10,
                  display: "flex",
                  // alignItems: "center",
                  // justifyContent: "center",
                }}
              > */}
              <div style={{ paddingBottom: 5 }} className='ack'>
                {submitLoaded ? (
                  <Ripple className='loa' color='coral' />
                ) : (
                  <button onClick={submitDetails}>Submit</button>
                )}
              </div>
              {/* </div> */}
            </div>
          </div>
        );
      case 5:
        return (
          <div className='ack'>
            <img src={ACK} alt='ackImage' />
            <p>
              "Yay!! You've successfully submitted the query for your Dream
              destination. You better get packing now, 'cause our experts have
              already started working their magic into your plan!"
            </p>
            <p>You can check the progress of your query in Self Plan Section</p>
            <Link to='/profile/selfplan'>
              <button>Go to Self Plan Section</button>
            </Link>
          </div>
        );
      default:
        break;
    }
  };

  const renderSteps = () => {
    switch (step) {
      case 1:
        return (
          <div className='steps'>
            <h1 style={{ color: '#ff7f00' }}>Select Country</h1>
            <p>
              So, where are you off to, now? {'\n'}
              Choose the countries you want to add to your tour plan today..
            </p>
          </div>
        );
      case 2:
        return (
          <div className='steps'>
            <h1 style={{ color: '#ff7f00' }}>Select City</h1>
            <p>
              Let's give your tour plan some attitude of its own. Select the
              cities you want, to feature in your plan...
            </p>
          </div>
        );
      case 3:
        return (
          <div className='steps'>
            <h1 style={{ color: '#ff7f00' }}>Select details</h1>
            <p>
              Great going! Now, type in the number of days you'd like to spend
              at each city, while mentioning the dates of travel, and the number
              of passengers.
            </p>
          </div>
        );
      case 4:
        return (
          <div className='steps'>
            <h1 style={{ color: '#ff7f00' }}>Select tours</h1>
            <p>
              Almost done! Now, customise your tour plan further by adding the
              tours of your choice.
            </p>
          </div>
        );
      case 5:
        return (
          <div className='steps'>
            <h1 style={{ color: '#ff7f00' }}>Progress Page</h1>
            <p>
              Awesome! You can now check the progress of your tour plan here,
              while we work our magic into it!
            </p>
          </div>
        );
      default:
        break;
    }
  };
  const renderDSteps = () => {
    switch (step) {
      case 1:
        return (
          <div className='steps'>
            <h1 style={{ color: '#ff7f00' }}>Select State</h1>
            <p>
              So, where are you off to, now?
              <br /> Choose the State you want to add to your tour plan today..
            </p>
          </div>
        );
      case 2:
        return (
          <div className='steps'>
            <h1 style={{ color: '#ff7f00' }}>Select City</h1>
            <p>
              Let's give your tour plan some attitude of its own. Select the
              cities you want, to feature in your plan...
            </p>
          </div>
        );
      case 3:
        return (
          <div className='steps'>
            <h1 style={{ color: '#ff7f00' }}>Select details</h1>
            <p>
              Great going! Now, type in the number of days you'd like to spend
              at each city, while mentioning the dates of travel, and the number
              of passengers.
            </p>
          </div>
        );
      case 4:
        return (
          <div className='steps'>
            <h1 style={{ color: '#ff7f00' }}>Travel Details</h1>
            <p>
              Almost done! Now, customise your tour plan further by adding the
              hotel type and travel mode
            </p>
          </div>
        );
      case 5:
        return (
          <div className='steps'>
            <h1 style={{ color: '#ff7f00' }}>Select Country</h1>
            <p>
              Awesome! You can now check the progress of your tour plan here,
              while we work our magic into it!
            </p>
          </div>
        );
      default:
        break;
    }
  };
  return (
    <div className='selftour-container'>
      <Modals modalIsOpen={modalIsOpen} closeModal={closeLogModal} />

      {tourType === '' ? (
        <div className='selectTraveltype'>
          <div className='travelTypes'>
            <h1 style={{ textAlign: 'center' }}>
              "Welcome to tourOn! What is your travel mood today? -
              International / Domestic"
            </h1>
          </div>
          <div className='travelOption'>
            <div
              className='traveloption1'
              onClick={() => setTourtype('International')}>
              <h5>International</h5>
            </div>
            <div
              className='traveloption2'
              onClick={() => setTourtype('Domestic')}>
              <h5>Domestic</h5>
            </div>
          </div>
        </div>
      ) : (
        <>
          {tourType === 'Domestic' ? (
            <>
              <div style={{ width: '100%' }}>
                {step === 5 ? null : (
                  <Progress animated value={step * 20} color='info' />
                )}
              </div>
              <div className='scontent-container'>
                {step === 5 ? null : (
                  <div className='scontent'>{renderDSteps()}</div>
                )}
                <div>
                  {step === 1 || step === 5 ? null : (
                    <GrFormPrevious
                      style={{ cursor: 'pointer' }}
                      size={50}
                      color='#FFF'
                      onClick={() => {
                        if (step !== 1) setStep(step - 1);
                      }}
                    />
                  )}
                </div>
                <div style={{ width: '80%' }}>{renderDomesticModal()}</div>
                <div>
                  {selectedState === '' || step === 4 || step === 5 ? null : (
                    <GrFormNext
                      size={50}
                      style={{ color: '#fff', cursor: 'pointer' }}
                      onClick={() => {
                        if (step === 1) {
                          if (selectedCity !== '') {
                            getDomesticCities(selectedState);
                            setStep(step + 1);
                          }
                        } else if (step === 2) {
                          if (selectedCity.length > 0) {
                            setStep(step + 1);
                          }
                        } else if (step === 3) {
                          if (
                            totalDays !== 0 &&
                            adult !== 0 &&
                            fromDate !== ''
                          ) {
                            setStep(step + 1);
                          }
                        }
                      }}
                    />
                  )}
                </div>
              </div>
            </>
          ) : (
            <>
              <div style={{ width: '100%' }}>
                {step === 6 ? null : (
                  <Progress animated value={step * 20} color='info' />
                )}
              </div>
              <div className='scontent-container'>
                {step === 6 ? null : (
                  <div className='scontent'>{renderSteps()}</div>
                )}
                <div>
                  {step === 1 || step === 6 ? null : (
                    <GrFormPrevious
                      style={{ cursor: 'pointer' }}
                      size={50}
                      color='#FFF'
                      onClick={() => {
                        if (step !== 1) setStep(step - 1);
                      }}
                    />
                  )}
                </div>
                <div style={{ width: '80%' }}>{renderSelfModal()}</div>
                <div>
                  {step === 6 ? null : (
                    <GrFormNext
                      size={50}
                      style={{ color: '#fff', cursor: 'pointer' }}
                      onClick={() => {
                        if (step === 1) {
                          getCities(selectedCountryNames[0]);
                          setActiveCountry(selectedCountryNames[0]);
                          setStep(2);
                        } else if (step === 2) {
                          if (selectedCity.length > 0) {
                            setStep(step + 1);
                            getTour(selectedCity[0].cityName);
                            setActiveCIty(selectedCity[0].cityName);
                          }
                        } else if (step === 3) {
                          if (fromDate === '' && adult === 0) return;
                          setStep(step + 1);
                        } else if (step === 4) {
                          if (selectedTourNames.length > 0) {
                            setCityDurations(cityTourDetails[0]);
                            setStep(step + 1);
                          }
                        }
                      }}
                    />
                  )}
                </div>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default SelfPlanTour;
