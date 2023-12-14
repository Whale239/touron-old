import React, { useState, useEffect, useRef } from 'react';
import './MyRequest.css';
import { GiJourney } from 'react-icons/gi';
import { HiInformationCircle } from 'react-icons/hi';
// import { MdDeleteForever } from "react-icons/md";
import { TiGroup, TiTicket } from 'react-icons/ti';
import { Ellipsis } from 'react-spinners-css';
import { AiFillStar } from 'react-icons/ai';
import { BiCalendar } from 'react-icons/bi';
import { ImEnter, ImExit } from 'react-icons/im';
import { FaBed } from 'react-icons/fa';
import { FaRegCalendarAlt, FaTachometerAlt } from 'react-icons/fa';
import { GiMeal } from 'react-icons/gi';
import { BsClockHistory } from 'react-icons/bs';
import {
  Table,
  Modal,
  Pagination,
  PaginationLink,
  PaginationItem,
} from 'reactstrap';
import Profilenav from './Profilenav';
import Profilepage from './Profilepage';
import { firedb } from '../firebase';
import { isAuthenticated } from '../Login components/auth';
import * as BiIcons from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { MdFlight, MdDirectionsBus, MdTrain } from 'react-icons/md';
import Slider from 'react-slick';
import Planning from '../assests/Planning.jpg';

const MyRequest = () => {
  const isMounted = useRef(false);
  const [step, setStep] = useState(1);
  const [detailsModal, setDetailsModal] = useState(false);
  const [userRequest, setUserRequest] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState({});
  const [key, setKey] = useState('');
  const [loading, setLoading] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [plannedDetails, setPlannedDetails] = useState({});
  const { user } = isAuthenticated();

  const toggleSidebar = () => {
    setClicked(!clicked);
  };

  const innerWidth = window.innerWidth;
  useEffect(() => {
    if (innerWidth < 900) {
      setClicked(true);
    }
  }, []);

  const getDepatureDate = (date) => {
    const countDate = Date.parse(date);
    const now = new Date().getTime();
    const gap = countDate - now;
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
    const d = Math.floor(gap / day);
    return d;
  };

  const openDetailsModal = () => {
    setDetailsModal(true);
  };
  const closeDetailsModal = () => {
    setDetailsModal(false);
  };

  useEffect(() => {
    isMounted.current = true;
    getUserRequest();
    return () => (isMounted.current = false);
  }, []);

  const getUserRequest = () => {
    setLoading(true);
    firedb.ref('requests').on('value', (data) => {
      if (isMounted.current) {
        if (data) {
          let req = [];
          data.forEach((d) => {
            if (d.val().userID === user.uid) {
              req.push(d.val());
            }
          });
          setUserRequest(req.reverse());
          setLoading(false);
        }
      }
    });
  };

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

  let pageSize = 10;
  let pagesCount = Math.ceil(Object.keys(userRequest).length / pageSize);
  const [currentPage, setCurrentpage] = useState(0);

  const handleClick = (e, index) => {
    e.preventDefault();
    setCurrentpage(index);
  };

  const planning = () => {
    return (
      <div className='req-plan-main'>
        <div className='req-plan-image'>
          <img src={Planning} alt='taxiImage' />
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
                      <td>{selectedRequest.requestID}</td>
                    </tr>
                    <tr>
                      <td>Tour Category</td>
                      <td>{selectedRequest.tourCategory}</td>
                    </tr>
                    <tr>
                      <td>Destination Type</td>
                      <td>{selectedRequest.tourType}</td>
                    </tr>
                    <tr>
                      <td>Travel Mode</td>
                      <td>{selectedRequest.travelMode}</td>
                    </tr>
                    <tr>
                      <td>Tour Preference</td>
                      <td>{selectedRequest.tourPreference}</td>
                    </tr>
                    <tr>
                      <td>From Date</td>
                      <td>{selectedRequest.fromDate}</td>
                    </tr>
                    <tr>
                      <td>To Date</td>
                      <td>{selectedRequest.toDate}</td>
                    </tr>
                    <tr>
                      <td>Destination</td>
                      <td>{selectedRequest.destination}</td>
                    </tr>
                    <tr>
                      <td>Boarding Point</td>
                      <td>{selectedRequest.startPoint}</td>
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
                      <td>Tour Companions</td>
                      <td>{selectedRequest.travellerType}</td>
                    </tr>
                    <tr>
                      <td>Adult(s)</td>
                      <td>{selectedRequest.adult}</td>
                    </tr>
                    <tr>
                      <td>Children(s)</td>
                      <td>{selectedRequest.children}</td>
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
                      <td>Your Preference</td>
                      <td>{selectedRequest.preferanece}</td>
                    </tr>
                    <tr>
                      <td>Name</td>
                      <td>{selectedRequest.name}</td>
                    </tr>
                    <tr>
                      <td>Budget</td>
                      <td>{selectedRequest.budget}</td>
                    </tr>
                    <tr>
                      <td>Whatsapp Number</td>
                      <td>{selectedRequest.number}</td>
                    </tr>
                  </tbody>
                </Table>
                {selectedRequest.tourCategory === 'Surprise Tour' ? (
                  <Table bordered>
                    <thead>
                      <tr>
                        <th className='title-Information'>
                          <GiJourney className='title-Information-icon' />
                          Expedition
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Expedition 1</td>
                        <td>{selectedRequest.expediture1}</td>
                      </tr>
                      <tr>
                        <td>Expedition 2</td>
                        <td>{selectedRequest.expediture2}</td>
                      </tr>
                      <tr>
                        <td>Expedition 3</td>
                        <td>{selectedRequest.expediture3}</td>
                      </tr>
                    </tbody>
                  </Table>
                ) : null}
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
            var sectionStyle = {
              backgroundImage: `url(
                "https://images.pexels.com/photos/379419/pexels-photo-379419.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                )`,
            };
            return sectionStyle;
          }
          if (image === 'Train') {
            var sectionStyle1 = {
              backgroundImage: `url(
                "https://images.pexels.com/photos/730134/pexels-photo-730134.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                )`,
            };
            return sectionStyle1;
          }
          if (image === 'Bus') {
            var sectionStyle2 = {
              backgroundImage: `url(
                "https://images.pexels.com/photos/68629/pexels-photo-68629.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                )`,
            };
            return sectionStyle2;
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
        var settings3 = {
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
                            <Slider {...settings3} className='slide-hotel'>
                              {c.hotelPicture.map((h) => {
                                return (
                                  <div className='req-hotels-main'>
                                    <div className='req-hotels-image'>
                                      <img src={h} alt='hotel-image' />
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
        var settings4 = {
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
                      <Slider {...settings4} className='slide-taxi'>
                        {plannedDetails.taxiDetails.taxiPicture.map((c, i) => {
                          return (
                            <div key={i} className='req-taxi-main'>
                              <div className='req-taxi-image'>
                                <img src={c} alt='taxi-image' />
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
        <div className='requests-info'>
          <Profilenav title={'My Request'} />
        </div>

        <div className='requests-tables'>
          <Table hover bordered>
            <thead>
              <tr>
                <th scope='col'>Request Status</th>
                <th scope='col'>Request Id</th>
                <th scope='col'>Tour Category</th>
                <th scope='col'>Destination</th>
                <th scope='col'>Departure Date</th>
                <th scope='col'>Departure in Days</th>
              </tr>
            </thead>
            <tbody className='bg-white'>
              {loading ? (
                <div className='req-loading'>
                  Fetching Data <Ellipsis color='#fff' />
                </div>
              ) : (
                <>
                  {userRequest.length !== 0 ? (
                    <>
                      {Object.keys(userRequest)
                        .slice(
                          currentPage * pageSize,
                          (currentPage + 1) * pageSize
                        )
                        .map((c, i) => (
                          <tr
                            key={i}
                            onClick={() => {
                              setKey(c);
                              setSelectedRequest(userRequest[c]);
                              getPlannedDetailsD(userRequest[c].requestID);
                              setStep(1);
                              openDetailsModal();
                            }}>
                            <td
                              style={{
                                color: `${getColor(userRequest[c].status)}`,
                              }}>
                              {userRequest[c].status}
                            </td>
                            <td>{userRequest[c].requestID}</td>
                            <td>{userRequest[c].tourCategory}</td>
                            <td>
                              {userRequest[c].tourCategory === 'Surprise Tour'
                                ? '--'
                                : userRequest[c].destination}
                            </td>
                            <td>{userRequest[c].fromDate}</td>
                            <td>
                              {getDepatureDate(userRequest[c].fromDate)} days
                              {/* {userRequest[c].status === "Duplicate Query" ? (
                                <MdDeleteForever className="duplicateDelete" />
                              ) : null} */}
                            </td>
                          </tr>
                        ))}
                    </>
                  ) : (
                    <tr>
                      <div className='noFind'>
                        No Request found
                        <Link className='plink' to='/planned-tour'>
                          <button>Start Planning</button>
                        </Link>
                      </div>
                    </tr>
                  )}
                </>
              )}
            </tbody>
          </Table>
        </div>

        {Object.keys(userRequest).length <= 7 ? null : (
          <div>
            <Pagination
              className='pagination justify-content-end'
              listClassName='justify-content-end'>
              <PaginationItem disabled={currentPage <= 0}>
                <PaginationLink
                  onClick={(e) => handleClick(e, currentPage - 1)}
                  previous
                  href='#'>
                  <i className='fa fa-angle-left' />
                </PaginationLink>
              </PaginationItem>
              {[...Array(pagesCount)].map((page, i) => (
                <PaginationItem active={i === currentPage} key={i}>
                  <PaginationLink
                    onClick={(e) => handleClick(e, i)}
                    href='#pablo'>
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem disabled={currentPage >= pagesCount - 1}>
                <PaginationLink
                  onClick={(e) => handleClick(e, currentPage + 1)}
                  next
                  href='#'>
                  <i className='fa fa-angle-right' />
                </PaginationLink>
              </PaginationItem>
            </Pagination>
          </div>
        )}

        <Modal contentClassName='modal-request' isOpen={detailsModal}>
          <div className='modal-header'>
            <h3 className='modal-title' id='modal-title-notification'>
              Request Info
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
  );
};

export default MyRequest;
