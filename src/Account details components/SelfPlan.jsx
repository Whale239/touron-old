import React, { useState, useEffect, useRef } from 'react';
import { firedb } from '../firebase';
import Profilepage from './Profilepage';
import * as BiIcons from 'react-icons/bi';
import './SelfPlan.css';
import Profilenav from './Profilenav';
import { TiGroup, TiTicket } from 'react-icons/ti';
import { HiInformationCircle } from 'react-icons/hi';
import { Table, Modal } from 'reactstrap';
import { Ellipsis } from 'react-spinners-css';
import { isAuthenticated } from '../Login components/auth';
import Planning from '../assests/Planning.jpg';
import { MdFlight, MdDirectionsBus, MdTrain } from 'react-icons/md';
import { AiFillStar } from 'react-icons/ai';
import { ImEnter, ImExit } from 'react-icons/im';
import { BiCalendar } from 'react-icons/bi';
import { FaBed } from 'react-icons/fa';
import { FaRegCalendarAlt, FaTachometerAlt } from 'react-icons/fa';
import { GiMeal } from 'react-icons/gi';
import { BsClockHistory } from 'react-icons/bs';
import Slider from 'react-slick';

const SelfPlan = () => {
  const isMounted = useRef(false);
  const [selfPlans, setSelfPlans] = useState([]);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [detailsModal, setDetailsModal] = useState(false);
  const [selectedPlans, setSelectedPlans] = useState({});
  const [plannedDetails, setPlannedDetails] = useState({});
  const { user } = isAuthenticated();

  const toggleSidebar = () => {
    setClicked(!clicked);
  };
  const openDetailsModal = () => {
    setDetailsModal(true);
  };
  const closeDetailsModal = () => {
    setDetailsModal(false);
  };

  const getSelfPlans = () => {
    setLoading(true);
    firedb.ref('self-planned-tours').on('value', (data) => {
      if (isMounted.current) {
        if (data) {
          let req = [];
          data.forEach((d) => {
            if (d.val().userId === user.uid) {
              req.push(d.val());
            }
          });
          setSelfPlans(req.reverse());
          setLoading(false);
        }
      }
    });
  };

  useEffect(() => {
    isMounted.current = true;
    getSelfPlans();
    return () => (isMounted.current = false);
  }, []);

  const getPlannedDetailsD = (key) => {
    firedb.ref('plannedDetails').on('value', (data) => {
      if (data.val() === null || data.val() === undefined) {
        setLoading(false);
        return;
      }
      if (data.val() !== null || data.val() !== undefined) {
        data.forEach((i) => {
          if (i.val().requestID === key) {
            setPlannedDetails(i.val());
          }
        });
      }
    });
  };

  const planning = () => {
    return (
      <div className='req-plan-main'>
        <div className='req-plan-image'>
          <img src={Planning} alt='taxi' />
        </div>
        <div>
          <h3>
            You better get packing now, 'cause our experts have already started
            working their magic into your plan!'
          </h3>
        </div>
      </div>
    );
  };

  const colors = [
    {
      name: 'All',
      color: '#f39c12',
    },
    {
      name: 'Query Received',
      color: '#f39c12',
    },
    {
      name: 'Plan Shared',
      color: '#7f8c8d',
    },
    {
      name: 'On Progress',
      color: '#8e44ad',
    },
    {
      name: 'Cancelled',
      color: 'red',
    },
    {
      name: 'On Hold',
      color: '#3498db',
    },
    {
      name: 'Duplicate Query',
      color: '#fbc531',
    },
    {
      name: 'Tour Booked',
      color: '#2d3436',
    },
    {
      name: 'Awaiting Payment',
      color: '#00cec9',
    },
    {
      name: 'Cancellation Requested',
      color: '#d63031',
    },
    {
      name: 'Estimated',
      color: '#2d3436',
    },
    {
      name: 'Completed',
      color: '#55efc4',
    },
  ];

  const getColor = (status) => {
    let color = '';
    colors.filter((c) => {
      if (c.name === status) color = c.color;
    });
    return color;
  };

  const renderSteps = (key) => {
    switch (key) {
      case 1:
        return (
          <div className='modal-visadetails'>
            <div className='modal-req'>
              <div className='iternary'>
                <Table bordered>
                  <thead>
                    <tr>
                      <th className='title-iternary'>
                        <TiTicket className='title-iternary-icon' />
                        Itinerary
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Request ID</td>
                      <td>{selectedPlans.requestID}</td>
                    </tr>
                    <tr>
                      <td>Selected Cities</td>
                      {Object.keys(selectedPlans).length === 0 ? null : (
                        <td>
                          {Object.keys(selectedPlans.selectedCities).map(
                            (t) => {
                              return (
                                <h6>
                                  {selectedPlans.selectedCities[t].cityName}
                                </h6>
                              );
                            }
                          )}
                        </td>
                      )}
                    </tr>
                    <tr>
                      <td>Total Days</td>
                      <td>{selectedPlans.totalDays}</td>
                    </tr>
                    <tr>
                      <td>Tour Type</td>
                      <td>{selectedPlans.tourType}</td>
                    </tr>
                    <tr>
                      <td>From Date</td>
                      <td>{selectedPlans.fromData}</td>
                    </tr>
                    <tr>
                      <td>To Date</td>
                      <td>{selectedPlans.toData}</td>
                    </tr>
                  </tbody>
                </Table>
              </div>
              <div className='companions'>
                <Table bordered>
                  <thead>
                    <tr>
                      <th className='title-companions'>
                        <TiGroup className='title-companions-icon' />
                        Companions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Adults(s)</td>
                      <td>{selectedPlans.adult}</td>
                    </tr>
                    <tr>
                      <td>Children(s)</td>
                      <td>{selectedPlans.children}</td>
                    </tr>
                  </tbody>
                </Table>
              </div>
              <div className='Information'>
                <Table bordered>
                  <thead>
                    <tr>
                      <th className='title-Information'>
                        <HiInformationCircle className='title-Information-icon' />
                        Other Information
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Name</td>
                      <td>{selectedPlans.name}</td>
                    </tr>
                    <tr>
                      <td>Whatsapp Number</td>
                      <td>{selectedPlans.phoneNumber}</td>
                    </tr>
                  </tbody>
                </Table>
                {selectedPlans.tourType === 'International' ? (
                  <Table bordered>
                    <thead>
                      <tr>
                        <th className='title-companions'>Sl.No</th>
                        <th className='title-companions'>Tours Name</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.keys(selectedPlans.tourDetails).map(
                        (t, index) => {
                          return (
                            <tr>
                              <td>{index + 1}</td>
                              <td>{selectedPlans.tourDetails[t].tourName}</td>
                            </tr>
                          );
                        }
                      )}
                    </tbody>
                  </Table>
                ) : (
                  <Table bordered>
                    <thead>
                      <tr>
                        <th className='title-companions'>
                          <TiGroup className='title-companions-icon' />
                          Travel Details
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Hotel Type</td>
                        <td>{selectedPlans.hotelType}</td>
                      </tr>
                      <tr>
                        <td>Travel Mode</td>
                        <td>{selectedPlans.travelmode}</td>
                      </tr>
                    </tbody>
                  </Table>
                )}
              </div>
            </div>
          </div>
        );
      case 2:
        const renderIcon = (name) => {
          if (name === 'Flight') return <MdFlight style={{ fontSize: 25 }} />;
          if (name === 'Bus')
            return <MdDirectionsBus style={{ fontSize: 25 }} />;
          if (name === 'Train') return <MdTrain style={{ fontSize: 25 }} />;
        };

        const renderImage = (image) => {
          if (image === 'Flight') {
            return {
              backgroundImage: `url(
                "https://images.pexels.com/photos/379419/pexels-photo-379419.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                )`,
            };
          }
          if (image === 'Train') {
            return {
              backgroundImage: `url(
                "https://images.pexels.com/photos/730134/pexels-photo-730134.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                )`,
            };
          }
          if (image === 'Bus') {
            return {
              backgroundImage: `url(
                "https://images.pexels.com/photos/68629/pexels-photo-68629.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                )`,
            };
          }
        };
        return (
          <>
            {Object.keys(plannedDetails).length === 0 ? (
              <>{planning()}</>
            ) : (
              <>
                {Object.keys(plannedDetails.flightDetails.onward.from)
                  .length === 0 ? (
                  <>{planning()}</>
                ) : (
                  <div
                    className='req-travel-main'
                    style={renderImage(
                      plannedDetails.flightDetails.onward.onwardTransportMode
                    )}>
                    <div className='req-travel'>
                      <div className='req-travel-onward'>
                        <h5>
                          Onward<span> </span>
                          {
                            plannedDetails.flightDetails.onward
                              .onwardTransportMode
                          }
                        </h5>
                      </div>
                      <div className='req-onward-main'>
                        <div className='req-onward-details'>
                          <h6>{plannedDetails.flightDetails.onward.from}</h6>
                          <h3>
                            {
                              plannedDetails.flightDetails.onward
                                .onwardFromCityCode
                            }
                          </h3>
                          <h6>
                            {plannedDetails.flightDetails.onward.depatureTime}
                          </h6>
                          <h6>
                            {plannedDetails.flightDetails.onward.depatureDate}
                          </h6>
                        </div>
                        <div className='req-onward-type'>
                          <h5>-------</h5>
                          {renderIcon(
                            plannedDetails.flightDetails.onward
                              .onwardTransportMode
                          )}
                          <h5>-------</h5>
                        </div>
                        <div className='req-onward-details'>
                          <h6>{plannedDetails.flightDetails.onward.to}</h6>
                          <h3>
                            {
                              plannedDetails.flightDetails.onward
                                .onwardToCityCode
                            }
                          </h3>
                          <h6>
                            {plannedDetails.flightDetails.onward.arrivalTime}
                          </h6>
                          <h6>
                            {plannedDetails.flightDetails.onward.arrivalDate}
                          </h6>
                        </div>
                      </div>
                      <div className='req-onward-modeName'>
                        <h5>
                          {plannedDetails.flightDetails.onward.flightName}
                        </h5>
                      </div>
                    </div>
                    <div className='req-travel'>
                      <div className='req-travel-onward'>
                        <h5>
                          Return<span> </span>
                          {
                            plannedDetails.flightDetails.return
                              .returnTransportMode
                          }
                        </h5>
                      </div>
                      <div className='req-onward-main'>
                        <div className='req-onward-details'>
                          <h6>{plannedDetails.flightDetails.return.from}</h6>
                          <h3>
                            {
                              plannedDetails.flightDetails.return
                                .returnFromCityCode
                            }
                          </h3>
                          <h6>
                            {plannedDetails.flightDetails.return.depatureTime}
                          </h6>
                          <h6>
                            {plannedDetails.flightDetails.return.depatureDate}
                          </h6>
                        </div>
                        <div className='req-onward-type'>
                          <h5>-------</h5>
                          {renderIcon(
                            plannedDetails.flightDetails.return
                              .returnTransportMode
                          )}
                          <h5>-------</h5>
                        </div>
                        <div className='req-onward-details'>
                          <h6>{plannedDetails.flightDetails.return.to}</h6>
                          <h3>
                            {
                              plannedDetails.flightDetails.return
                                .returnToCityCode
                            }
                          </h3>
                          <h6>
                            {plannedDetails.flightDetails.return.arrivalTime}
                          </h6>
                          <h6>
                            {plannedDetails.flightDetails.return.arrivalDate}
                          </h6>
                        </div>
                      </div>
                      <div className='req-onward-modeName'>
                        <h5>
                          {plannedDetails.flightDetails.return.flightName}
                        </h5>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </>
        );
      case 3:
        var settings = {
          infinite: true,
          autoplay: true,
          speed: 500,
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          dots: true,
        };

        return (
          <>
            {Object.keys(plannedDetails).length === 0 ? (
              <>{planning()}</>
            ) : (
              <>
                {Object.keys(plannedDetails.hotels[0].hotelName).length ===
                0 ? (
                  <>{planning()}</>
                ) : (
                  <div className='req-hotel'>
                    {plannedDetails.hotels.map((c, i) => {
                      if (c.cityName !== '') {
                        return (
                          <div className='slide-hotel-single'>
                            <Slider {...settings} className='slide-hotel'>
                              {c.hotelPicture.map((h) => {
                                return (
                                  <div className='req-hotels-main'>
                                    <div className='req-hotels-image'>
                                      <img src={h} alt='hotel' />
                                    </div>
                                  </div>
                                );
                              })}
                            </Slider>
                            <div className='req-hotel-infrms'>
                              <div className='req-hotel-infrms-head'>
                                <div className='req-hotel-infrms-locate'>
                                  <div className='hotel-name-rating'>
                                    <h4 style={{ marginBottom: 0 }}>
                                      {new Array(parseInt(c.hotelRatings))
                                        .fill('1')
                                        .map((s, i) => {
                                          return (
                                            <AiFillStar
                                              style={{
                                                color: '#F7CD2E',
                                                fontSize: 18,
                                              }}
                                            />
                                          );
                                        })}
                                    </h4>
                                    <h4>{c.hotelName}</h4>
                                  </div>
                                  <div>
                                    <h4
                                      style={{
                                        color: 'black',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                      }}>
                                      {c.cityName}
                                    </h4>
                                  </div>
                                </div>
                                <div className='req-hotel-infrms-check'>
                                  <div className='req-hotel-infrms-checki'>
                                    <h6>Check In</h6>
                                    <ImEnter className='req-hotell-icon' />
                                    <h6>{c.checkIn}</h6>
                                  </div>
                                  <div className='req-hotel-infrms-checki'>
                                    <h6>-----</h6>
                                    <BiCalendar className='req-hotell-icon' />
                                    <h6>-----</h6>
                                  </div>
                                  <div className='req-hotel-infrms-checki'>
                                    <h6>Check Out</h6>
                                    <ImExit className='req-hotell-icon' />
                                    <h6>{c.checkOut}</h6>
                                  </div>
                                </div>
                                <div className='req-hotel-infrms-itern'>
                                  <div className='req-hotel-infrms-room'>
                                    <h6>Room Type</h6>
                                    <FaBed className='req-hotell-icon' />
                                    <h6>{c.roomType}</h6>
                                  </div>
                                  <div className='req-hotel-infrms-meal'>
                                    <h6>Meal Type</h6>
                                    <GiMeal className='req-hotell-icon' />
                                    <h6>{c.mealPlan}</h6>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      }
                    })}
                  </div>
                )}
              </>
            )}
          </>
        );
      case 4:
        var settings1 = {
          infinite: true,
          autoplay: true,
          speed: 500,
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          dots: true,
        };
        return (
          <>
            {Object.keys(plannedDetails).length === 0 ? (
              <>{planning()}</>
            ) : (
              <>
                {Object.keys(plannedDetails.taxiDetails.taxiName).length ===
                0 ? (
                  <>{planning()}</>
                ) : (
                  <div className='req-taxi'>
                    <div>
                      <div className='slide-taxiName'>
                        <h5>{plannedDetails.taxiDetails.taxiName}</h5>
                      </div>
                      <Slider {...settings1} className='slide-taxi'>
                        {plannedDetails.taxiDetails.taxiPicture.map((c, i) => {
                          return (
                            <div key={i} className='req-taxi-main'>
                              <div className='req-taxi-image'>
                                <img src={c} alt='taxi' />
                              </div>
                            </div>
                          );
                        })}
                      </Slider>
                    </div>
                    <div className='taxiInform'>
                      <div className='taxi-Informs'>
                        <div className='taxi-Informs-head'>
                          <h5>Taxi Informations</h5>
                        </div>
                        <div className='taxi-single-infrms-main'>
                          <div className='taxi-single-infrms'>
                            <h6>Distance</h6>
                            <FaTachometerAlt style={{ fontSize: 22 }} />
                            <h6>
                              {plannedDetails.basicDetails.kilometers} kms
                            </h6>
                          </div>
                          <div className='taxi-single-infrms'>
                            <h6>Days</h6>
                            <FaRegCalendarAlt style={{ fontSize: 22 }} />
                            <h6>{plannedDetails.basicDetails.days} Days</h6>
                          </div>
                          <div className='taxi-single-infrm'>
                            <h6>Days Limit</h6>
                            <BsClockHistory style={{ fontSize: 22 }} />
                            <h6>{plannedDetails.basicDetails.daysLimit} kms</h6>
                          </div>
                        </div>
                        <div className='taxi-condition'>
                          <div className='taxi-condition-head'>
                            <h5>Terms and Conditions</h5>
                          </div>
                          <div className='taxi-condition-content'>
                            <p>{plannedDetails.basicDetails.termsConditions}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </>
        );

      default:
        break;
    }
  };

  return (
    <div style={{ display: 'flex' }}>
      <div className={clicked ? 'toggleSidebar' : 'toggleSideba'}>
        <Profilepage />
      </div>
      <div className='request-container'>
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
        <div className='requests-infoo'>
          <Profilenav title={'Self Plans'} />
          <div className='requests-tablee'>
            <Table hover bordered>
              <thead>
                <tr>
                  <th scope='col'>Request Status</th>
                  <th scope='col'>Request Id</th>
                  <th scope='col'>Travel mode</th>
                  <th scope='col'>Selected Cities</th>
                  <th scope='col'>Departure Date</th>
                  <th scope='col'>Total No of Days</th>
                </tr>
              </thead>
              <tbody className='bg-white'>
                {loading ? (
                  <div className='req-loadingg'>
                    Fetching Data <Ellipsis color='#fff' />
                  </div>
                ) : (
                  <>
                    {selfPlans.length !== 0 ? (
                      <>
                        {Object.keys(selfPlans).map((c, index) => (
                          <tr
                            key={index}
                            onClick={() => {
                              setSelectedPlans(selfPlans[c]);
                              getPlannedDetailsD(selfPlans[c].requestID);
                              setStep(1);
                              openDetailsModal();
                            }}>
                            <td
                              style={{
                                color: `${getColor(selfPlans[c].status)}`,
                              }}>
                              {selfPlans[c].status}
                            </td>
                            <td>{selfPlans[c].requestID}</td>
                            <td>{selfPlans[c].travelmode}</td>
                            <td>
                              {Object.keys(selfPlans[c].selectedCities).map(
                                (t) => {
                                  return (
                                    <h6>
                                      {selfPlans[c].selectedCities[t].cityName}
                                    </h6>
                                  );
                                }
                              )}
                            </td>

                            <td>{selfPlans[c].fromData}</td>
                            <td>{selfPlans[c].totalDays}</td>
                          </tr>
                        ))}
                      </>
                    ) : (
                      <tr>
                        <div className='noFind'>No Self Plans found</div>
                      </tr>
                    )}
                  </>
                )}
              </tbody>
            </Table>
          </div>
          <Modal contentClassName='modal-request' isOpen={detailsModal}>
            <div className='modal-header'>
              <h3 className='modal-title' id='modal-title-notification'>
                Self Plan Info
              </h3>
              <button
                aria-label='Close'
                className='close'
                data-dismiss='modal'
                type='button'
                onClick={closeDetailsModal}>
                <span aria-hidden={true}>×</span>
              </button>
            </div>
            <div className='req-head'>
              <div className={step === 1 ? 'req-single' : 'req-single-none'}>
                <h6 onClick={() => setStep(1)}>General</h6>
              </div>
              <div className={step === 2 ? 'req-single' : 'req-single-none'}>
                <h6 onClick={() => setStep(2)}>Travel</h6>
              </div>
              <div className={step === 3 ? 'req-single' : 'req-single-none'}>
                <h6 onClick={() => setStep(3)}>Hotels</h6>
              </div>
              <div className={step === 4 ? 'req-single' : 'req-single-none'}>
                <h6 onClick={() => setStep(4)}>Taxi</h6>
              </div>
            </div>
            <div>{renderSteps(step)}</div>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default SelfPlan;
