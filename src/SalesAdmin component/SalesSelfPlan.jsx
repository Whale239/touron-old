import React, { useState, useEffect, useContext, useRef } from 'react';
import { firedb } from '../firebase';
import { TiGroup, TiTicket } from 'react-icons/ti';
import { HiInformationCircle } from 'react-icons/hi';
import { Table, Modal, Input, Popover } from 'reactstrap';
import { Ellipsis } from 'react-spinners-css';
import { FaBed } from 'react-icons/fa';
import { BsClockHistory } from 'react-icons/bs';
import { FaRegCalendarAlt, FaTachometerAlt } from 'react-icons/fa';
import { GiMeal } from 'react-icons/gi';
import { BiCalendar } from 'react-icons/bi';
import SalesAdmin from './SalesAdmin';
import { useToasts } from 'react-toast-notifications';
import Planning from '../assests/Planning.jpg';
import Slider from 'react-slick';
import {
  getExpoToken,
  sendPushNotification,
} from './../Login components/PushNotification';

import { MdFlight, MdDirectionsBus, MdTrain } from 'react-icons/md';
import { AiFillStar } from 'react-icons/ai';
import { ImEnter, ImExit } from 'react-icons/im';
import moment from 'moment';
import { ApiContext } from './../Context/ApiContext';

const SalesSelfPlan = () => {
  const isMounted = useRef(false);
  const { addToast } = useToasts();
  const { employees } = useContext(ApiContext);
  const [selfPlans, setSelfPlans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [querystatus, setQueryStatus] = useState('');

  const [detailsModal, setDetailsModal] = useState(false);
  const [selectedPlans, setSelectedPlans] = useState({});
  const [selfPlanModal, setSelfPlanModal] = useState(false);
  const [key, setKey] = useState('');
  const [status, setStatus] = useState('');
  const [planKey, setPlanKey] = useState({});
  const [cost, setCost] = useState(0);
  const [plannedDetails, setPlannedDetails] = useState({});
  const [pageSize, setPageSize] = useState(20);
  // let pagesCount = Math.ceil(Object.keys(selfPlans).length / pageSize);
  const [currentPage, setCurrentpage] = useState(1);
  const [taskAssigned, setTaskAssigned] = useState('');
  const [assignedTasks, setAssignedTasks] = useState([]);
  const [userRequestDates, setUserRequestDates] = useState([]);
  const [userRequestCount, setUserRequestCount] = useState(0);
  const [userRequestLength, setUserRequestLength] = useState([]);

  const getTaskAssigne = (requestID) => {
    let name = '';
    assignedTasks.forEach((a) => {
      if (a.requestID === requestID) {
        name = a.name;
      }
    });
    return name;
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
      name: 'On Progress',
      color: '#8e44ad',
    },
    {
      name: 'Plan Shared',
      color: '#7f8c8d',
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
      color: '#FFF',
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
      color: 'red',
    },
    {
      name: 'Completed',
      color: '#55efc4',
    },
  ];

  const assignTask = () => {
    firedb
      .ref(`assignedTasks`)
      .push({
        name: taskAssigned,
        requestID: selectedPlans.requestID,
      })
      .then(() => {
        setTaskAssigned('');
        addToast('Task assigned Successfully', {
          appearance: 'success',
        });
      })
      .catch((err) => console.log(`err`, err));
  };

  const getAssignTask = () => {
    let task = [];
    firedb.ref(`assignedTasks`).on('value', (data) => {
      if (isMounted.current) {
        if (data.val() === null || data.val() === undefined) {
          return;
        }
        if (data.val() !== null || data.val() !== undefined) {
          data.forEach((d) => {
            task.push(d.val());
          });
        }
      }
      setAssignedTasks(task);
    });
  };

  useEffect(() => {
    isMounted.current = true;
    getAssignTask();
    return () => (isMounted.current = false);
  }, []);

  let pagesCount = userRequestLength.length;

  const handleClick = (e, index) => {
    e.preventDefault();
    setCurrentpage(index);
  };

  const openDetailsModal = () => {
    setDetailsModal(true);
  };
  const closeDetailsModal = () => {
    setDetailsModal(false);
  };
  const openSelfPlanModal = () => {
    setSelfPlanModal(true);
  };
  const closeSelfPlanModal = () => {
    setPlanKey({});
    setSelfPlanModal(false);
  };

  const planning = () => {
    return (
      <div className='req-plan-main'>
        <div className='req-plan-image'>
          <img src={Planning} alt='taxi-ijmage' />
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

  // const deleteRequest = () => {
  //   firedb
  //     .ref(`self-planned-tours/${key}`)
  //     .set(null)
  //     .then(() => {
  //       setKey("");
  //       setStatus("");
  //       closeDetailsModal();
  //       addToast("Duplicated Query Deleted Successfully", {
  //         appearance: "error",
  //       });
  //     })
  //     .catch((err) => console.log("err :>> ", err));
  // };

  const getColor = (status) => {
    let color = '';
    colors.filter((c) => {
      if (c.name === status) color = c.color;
    });
    return color;
  };

  useEffect(() => {
    isMounted.current = true;
    getSelfPlans();
    return () => (isMounted.current = false);
  }, [currentPage, pageSize]);

  const getUserRequestLength = (uid) => {
    firedb.ref('self-planned-tours').on('value', (data) => {
      if (isMounted.current) {
        let req = [];
        data.forEach((d) => {
          req.push({
            key: d.key,
            value: d.val(),
          });
        });
        setUserRequestLength(req);
      }
    });
  };
  useEffect(() => {
    isMounted.current = true;
    getUserRequestLength();
    return () => (isMounted.current = false);
  }, []);

  const updateRequest = () => {
    firedb
      .ref(`self-planned-tours/${key}`)
      .update({
        status: status,
        tourCost: cost,
      })
      .then(() => {
        setKey('');
        setStatus('');
        setCost(0);

        closeDetailsModal();
        addToast('Request Status Updated Successfully', {
          appearance: 'success',
        });
        const token = getExpoToken(selectedPlans.userID);

        const message = {
          to: token,
          sound: 'default',
          title: `Request Status Changed`,
          body: `Request Status Changed for your ${selectedPlans.tourCategory} of id ${selectedPlans.requestID} has been changed to  ${status}`,
          data: selectedPlans,
        };
        sendPushNotification(message);
      })
      .catch((err) => console.log('err :>> ', err));
  };

  const getSelfPlans = () => {
    let plans = [];
    setLoading(true);
    firedb
      .ref('self-planned-tours')
      .orderByKey()
      .limitToLast(currentPage * pageSize)
      .on('value', (data) => {
        if (isMounted.current) {
          if (data.val() === null || data.val() === undefined) {
            setLoading(false);
            return;
          }
          if (data.val() !== null || data.val() !== undefined) {
            let newReq = {};
            let revReq = Object.keys(data.val()).reverse();
            revReq.forEach((i) => {
              newReq[i] = data.val()[i];
            });
            setSelfPlans({
              ...newReq,
            });
          }
        }
        setLoading(false);
      });
  };

  const getUserRequestCount = (uid) => {
    let req = {};
    Object.keys(selfPlans).forEach((d) => {
      if (selfPlans[d].userId === uid) {
        req[d] = selfPlans[d];
      }
    });
    setUserRequestDates(req);
    setUserRequestCount(Object.keys(req).length);
  };

  const [weekPopover, setWeekPopover] = useState(false);
  const [monthPopover, setMonthPopover] = useState(false);
  const [totalPopover, setTotalPopover] = useState(false);

  const toggleWeekPopover = () => setWeekPopover(!weekPopover);
  const toggleMonthPopover = () => setMonthPopover(!monthPopover);
  const toggleTotalPopover = () => setTotalPopover(!totalPopover);

  const getKey = (id) => {
    let key = '';
    Object.keys(selfPlans).map((r) => {
      if (selfPlans[r].requestID === id) {
        key = r;
      }
    });
    return key;
  };
  let weekReq = {};

  const weekRequest = () => {
    let count = 0;
    Object.keys(userRequestDates).forEach((da) => {
      const { requestID } = selfPlans[da];
      const d = requestID.slice(3, 5);
      const m = requestID.slice(5, 7);
      const y = requestID.slice(7, 9);
      const ds = moment();
      const date = moment().subtract(7, 'days');

      if (moment(`${d}-${m}-20${y}`, 'DD-MM-YYYY').isBetween(date, ds)) {
        count = count + 1;
        weekReq[da] = selfPlans[da];
      }
    });
    return count;
  };

  // const filterSelfPlan = () => {
  //   if (querystatus == '') return selfPlans;
  //   const req = {};
  //   Object.keys(selfPlans).forEach((s) => {
  //     if (selfPlans[s].status === querystatus) {
  //       req[s] = selfPlans[s];
  //     }
  //   });
  //   return req;
  // };

  const filterSelfPlan = () => {
    let newReq = [];
    firedb
      .ref('self-planned-tours')
      .orderByChild('status')
      .equalTo(querystatus)
      .on('value', (data) => {
        if (data.val() !== null || data.val() !== undefined) {
          data.forEach((d) => {
            newReq.push({
              key: d.key,
              value: d.val(),
            });
          });
        }
      });
    return newReq.reverse();
  };

  let monthReq = {};
  const monthRequest = () => {
    let count = 0;
    Object.keys(userRequestDates).forEach((da) => {
      const { requestID } = selfPlans[da];
      const d = requestID.slice(3, 5);
      const m = requestID.slice(5, 7);
      const y = requestID.slice(7, 9);
      const ds = moment();
      const month = moment().subtract(31, 'days');
      if (moment(`${d}-${m}-20${y}`, 'DD-MM-YYYY').isBetween(month, ds)) {
        count = count + 1;
        monthReq[da] = selfPlans[da];
      }
    });
    return count;
  };

  const getPlannedDetails = (key) => {
    firedb.ref('plannedDetails').on('value', (data) => {
      if (data.val() === null || data.val() === undefined) {
        return;
      }
      if (data.val() !== null || data.val() !== undefined) {
        let revReq = Object.keys(data.val());
        revReq.forEach((i) => {
          if (data.val()[i].requestID === key) {
            setPlanKey({
              key: i,
              data: data.val()[i],
            });
          }
        });
      }
    });
  };

  const getPlannedDetailsD = (key) => {
    firedb.ref('plannedDetails').on('value', (data) => {
      if (data.val() === null || data.val() === undefined) {
        // setLoading(false);
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

  // const deletePlans = (key) => {
  //   console.log("key", key);
  //   firedb
  //     .ref(`self-planned-tours/${key}`)
  //     .set(null)
  //     .then(() => {
  //       setKey("");
  //       setStatus("");
  //       addToast("Deleted Successfully", {
  //         appearance: "error",
  //       });
  //     })
  //     .catch((err) => console.log("err :>> ", err));
  // };

  // useEffect(() => {
  //   getPlannedDetails();
  // }, []);

  const renderSteps = (step) => {
    switch (step) {
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
                      <td>Tour Category</td>
                      <td>{selectedPlans.tourCategory}</td>
                    </tr>
                    <tr>
                      <td>Destination Type</td>
                      <td>{selectedPlans.tourType}</td>
                    </tr>
                    <tr>
                      <td>Travel Mode</td>
                      <td>{selectedPlans.travelMode}</td>
                    </tr>
                    <tr>
                      <td>Tour Preference</td>
                      <td>{selectedPlans.tourPreference}</td>
                    </tr>
                    <tr>
                      <td>From Date</td>
                      <td>{selectedPlans.fromData}</td>
                    </tr>
                    <tr>
                      <td>To Date</td>
                      <td>{selectedPlans.toData}</td>
                    </tr>
                    <tr>
                      <td>Destination</td>
                      <td>
                        {Object.keys(selectedPlans).includes(
                          'selectedCities'
                        ) ? (
                          <>
                            {selectedPlans.selectedCities.length ===
                            0 ? null : (
                              <h5>
                                {selectedPlans.selectedCities.map((t, i) => {
                                  return <h6 key={i}> {t.cityName}</h6>;
                                })}
                              </h5>
                            )}
                          </>
                        ) : (
                          <h5>-</h5>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td>Boarding Point</td>
                      <td>{selectedPlans.startPoint}</td>
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
                      <td>{selectedPlans.travellerType}</td>
                    </tr>
                    <tr>
                      <td>Adult(s)</td>
                      <td>{selectedPlans.adult}</td>
                    </tr>
                    <tr>
                      <td>Children(s)</td>
                      <td>{selectedPlans.children}</td>
                    </tr>
                  </tbody>
                </Table>
                <Table bordered>
                  <thead>
                    <tr>
                      <th className='title-companions'>
                        <TiGroup className='title-companions-icon' />
                        User History
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Name</td>
                      <td>{selectedPlans.name}</td>
                    </tr>
                    <tr>
                      <td>Total Request</td>
                      <td id='totalPopover' style={{ cursor: 'pointer' }}>
                        {userRequestCount}
                      </td>
                    </tr>
                    <Popover
                      placement='right'
                      isOpen={totalPopover}
                      target='totalPopover'
                      toggle={toggleTotalPopover}>
                      {Object.keys(userRequestDates).map((t, index) => {
                        return (
                          <h6
                            key={index}
                            style={{
                              padding: 8,
                              overflow: 'auto',
                              margin: 0,
                              cursor: 'pointer',
                              backgroundColor:
                                selectedPlans.requestID ===
                                selfPlans[t].requestID
                                  ? '#53E0BC'
                                  : '',
                            }}
                            onClick={() => {
                              closeDetailsModal();
                              setSelectedPlans(selfPlans[t]);
                              setStatus(selfPlans[t].status);
                              setKey(getKey(selfPlans[t].requestID));
                              openDetailsModal();
                            }}>
                            {index + 1}.{selfPlans[t].requestID} -{' '}
                            {selfPlans[t].requestDate},
                            {getTaskAssigne(selfPlans[t].requestID)}
                          </h6>
                        );
                      })}
                    </Popover>
                    {/* popover-1 */}
                    <tr>
                      <td>Last Week Request</td>
                      <td id='weekPopover' style={{ cursor: 'pointer' }}>
                        {weekRequest()}
                      </td>
                    </tr>
                    <Popover
                      placement='right'
                      isOpen={weekPopover}
                      target='weekPopover'
                      toggle={toggleWeekPopover}>
                      {Object.keys(weekReq).map((w, index) => {
                        return (
                          <h6
                            key={index}
                            style={{
                              padding: 8,
                              overflow: 'auto',
                              margin: 0,
                              cursor: 'pointer',
                              backgroundColor:
                                selectedPlans.requestID ===
                                selfPlans[w].requestID
                                  ? '#53E0BC'
                                  : '',
                            }}
                            onClick={() => {
                              closeDetailsModal();
                              setSelectedPlans(selfPlans[w]);
                              setStatus(selfPlans[w].status);
                              setKey(getKey(selfPlans[w].requestID));
                              openDetailsModal();
                            }}>
                            {index + 1}.{selfPlans[w].requestID} -{' '}
                            {w.requestDate},
                            {getTaskAssigne(selfPlans[w].requestID)}
                          </h6>
                        );
                      })}
                    </Popover>
                    <tr>
                      <td>Last Month Request</td>
                      <td id='monthPopover' style={{ cursor: 'pointer' }}>
                        {monthRequest()}
                      </td>
                    </tr>
                    <Popover
                      placement='right'
                      isOpen={monthPopover}
                      target='monthPopover'
                      toggle={toggleMonthPopover}>
                      <div style={{ overflow: 'auto' }}>
                        {Object.keys(monthReq).map((m, index) => {
                          return (
                            <h6
                              key={index}
                              style={{
                                padding: 8,
                                margin: 0,
                                overflow: 'auto',
                                cursor: 'pointer',
                                backgroundColor:
                                  selectedPlans.requestID ===
                                  selfPlans[m].requestID
                                    ? '#53E0BC'
                                    : '',
                              }}
                              onClick={() => {
                                closeDetailsModal();
                                setSelectedPlans(selfPlans[m]);
                                setStatus(selfPlans[m].status);
                                setKey(getKey(selfPlans[m].requestID));
                                openDetailsModal();
                              }}>
                              {index + 1}.{selfPlans[m].requestID} -
                              {getTaskAssigne(selfPlans[m].requestID)}
                            </h6>
                          );
                        })}
                      </div>
                    </Popover>
                    {/* popover-3 */}
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
                      <td>{selectedPlans.preferanece}</td>
                    </tr>
                    <tr>
                      <td>Name</td>
                      <td>{selectedPlans.name}</td>
                    </tr>
                    <tr>
                      <td>Budget</td>
                      <td>{selectedPlans.budget}</td>
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
                      {Object.keys(selectedPlans).includes('tourDetails') && (
                        <>
                          {Object.keys(selectedPlans.tourDetails).map(
                            (t, index) => {
                              return (
                                <tr key={index}>
                                  <td>{index + 1}</td>
                                  <td>
                                    {selectedPlans.tourDetails[t].tourName}
                                  </td>
                                </tr>
                              );
                            }
                          )}
                        </>
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
            <>
              <div className='status-flex'>
                <div className='status'>
                  <h1>Status:</h1>
                  <Input
                    type='select'
                    onChange={(e) => setStatus(e.target.value)}
                    value={status}>
                    {colors.map((c, index) => {
                      return (
                        <option key={index} value={c.name}>
                          {c.name}
                        </option>
                      );
                    })}
                  </Input>
                </div>
                <div className='status'>
                  <h1>Tour Cost:</h1>
                  <Input
                    type='text'
                    onChange={(e) => setCost(e.target.value)}
                    value={cost}
                  />
                </div>

                <div className='update-button'>
                  <button className='btn btn-success' onClick={updateRequest}>
                    Update
                  </button>
                </div>
                <div>
                  <button
                    className='btn btn-success'
                    style={{ backgroundColor: 'blue' }}
                    onClick={() => {
                      getPlannedDetails(selectedPlans.requestID);
                      openSelfPlanModal();
                    }}>
                    Add plan
                  </button>
                </div>
              </div>

              <div className='status-flex'>
                <div className='status'>
                  <h1>Query Assigned</h1>
                  <Input
                    value={taskAssigned}
                    onChange={(e) => setTaskAssigned(e.target.value)}
                    type='select'>
                    <option value='' selected disabled hidden>
                      select One
                    </option>
                    <option value='All'>All</option>
                    {employees?.map((e, i) => {
                      if (
                        e.designation === 'CEO' ||
                        e.designation == 'Travel Associate'
                      )
                        return (
                          <option key={i} value={e.name}>
                            {e.name}
                          </option>
                        );
                    })}
                  </Input>
                </div>

                <div className='update-button'>
                  <button className='btn btn-success' onClick={assignTask}>
                    Assign
                  </button>
                </div>
                <div className='update-button'>
                  <h1>Handled By {getTaskAssigne(selectedPlans.requestID)}</h1>
                </div>
              </div>
            </>
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
                              {c.hotelPicture.map((h, i) => {
                                return (
                                  <div className='req-hotels-main' key={i}>
                                    <div className='req-hotels-image'>
                                      <img src={h} alt='hotelImage' />
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
                                              key={i}
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
                                <img src={c} alt='taxiImage' />
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
    }
  };

  return (
    <div
      className='booking-container'
      style={{
        padding: '20px',
      }}>
      <div
        className='booking-name-container'
        style={{
          padding: '30px',
        }}>
        <div>
          <h3 style={{ color: '#666666' }}>Self Plan Management</h3>
        </div>
      </div>
      <div
        className='booking-stats-container'
        style={{
          padding: '30px',
        }}>
        <div className='booking-stats'>
          <h3>Submitted Request</h3>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {/* <h6>{Object.keys(selfPlans).length}</h6> */}
            <h6>{userRequestLength.length}</h6>
          </div>
        </div>
        <div
          className='filters'
          style={{
            padding: '30px',
          }}>
          <div className='month'>
            <label>Show Item : </label>
            <select
              value={pageSize}
              onChange={(e) => setPageSize(e.target.value)}>
              <option value='10'>10</option>
              <option value='20'>20</option>
              <option value='50'>50</option>
            </select>
          </div>
          <div className='month'>
            <label>Query Status : </label>
            <select
              onChange={(e) => {
                setQueryStatus(e.target.value);
              }}
              value={querystatus}>
              {colors.map((c, index) => {
                return (
                  <option key={index} value={c.name === 'All' ? '' : c.name}>
                    {c.name}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
      </div>

      <div className='b-table' style={{ height: 'auto' }}>
        <div
          className='table-heading-container request'
          style={{
            width: '100%',
          }}>
          <h5>Request Status</h5>
          <h5>Request Id</h5>
          <h5>Name</h5>
          <h5>Travel Mode</h5>
          {/* <h5>Selected Cities</h5> */}
          <h5>Departure Date</h5>
          <h5>Total No of Days</h5>
          <h5>Handle By </h5>
        </div>

        {querystatus === '' ? (
          <>
            {loading ? (
              <div className='req-lo'>
                Fetching Data <Ellipsis color='#0057ff' />
              </div>
            ) : (
              <>
                {selfPlans.length !== 0 ? (
                  <>
                    {Object.keys(selfPlans)
                      .slice(
                        (currentPage === 1 ? 0 : currentPage - 1) * pageSize,
                        currentPage * pageSize
                      )
                      .map((c, i) => {
                        return (
                          <div
                            className='table-heading-row request'
                            key={i}
                            style={{
                              backgroundColor:
                                selfPlans[c].status === 'Duplicate Query'
                                  ? '#FF6666'
                                  : '',
                            }}
                            onClick={() => {
                              openDetailsModal();
                              setSelectedPlans(selfPlans[c]);
                              setStatus(selfPlans[c].status);
                              setStep(1);
                              setKey(c);
                              getUserRequestCount(selfPlans[c].userId);
                              getPlannedDetailsD(selfPlans[c].requestID);
                              setTaskAssigned(
                                getTaskAssigne(selfPlans[c].requestID)
                              );
                            }}>
                            <h5
                              style={{
                                color: `${getColor(selfPlans[c].status)}`,
                              }}>
                              {selfPlans[c].status}
                            </h5>
                            <h5>{selfPlans[c].requestID}</h5>
                            <h5>{selfPlans[c].name}</h5>
                            <h5>{selfPlans[c].travelmode}</h5>
                            <h5>{selfPlans[c].fromData}</h5>
                            <h5>{selfPlans[c].totalDays}</h5>
                            <h5>{getTaskAssigne(selfPlans[c].requestID)}</h5>
                          </div>
                        );
                      })}
                    <div className='pagination-table'>
                      {currentPage === 1 ? null : (
                        <div
                          className='pag-count'
                          onClick={(e) => {
                            handleClick(e, currentPage - 1);
                          }}
                          style={{
                            backgroundColor: '#0057ff',
                            color: '#fff',
                          }}>
                          <h5>{'<'}</h5>
                        </div>
                      )}
                      {new Array(pagesCount).fill('1').map((c, i) => {
                        if (i + 1 < currentPage + 5 && i > currentPage - 2) {
                          return (
                            <div
                              key={i}
                              className='pag-count'
                              onClick={(e) => handleClick(e, i + 1)}
                              style={{
                                backgroundColor:
                                  currentPage - 1 === i ? '#0057ff' : '#fff',
                                color: currentPage - 1 === i ? '#fff' : '#333',
                              }}>
                              <h5>{i + 1}</h5>
                            </div>
                          );
                        }
                      })}
                      {pagesCount - 1 === currentPage ? null : (
                        <div
                          className='pag-count'
                          onClick={(e) => handleClick(e, currentPage + 1)}
                          style={{
                            backgroundColor: '#0057ff',
                            color: '#fff',
                          }}>
                          <h5>{'>'}</h5>
                        </div>
                      )}
                    </div>
                  </>
                ) : (
                  <tr>
                    <div className='noFind'>No Request found</div>
                  </tr>
                )}
              </>
            )}
          </>
        ) : (
          <>
            {filterSelfPlan().map((c, i) => {
              const { value, key } = c;
              return (
                <div
                  className='table-heading-row request'
                  key={i}
                  style={{
                    backgroundColor:
                      value.status === 'Duplicate Query' ? '#FF6666' : '',
                  }}
                  onClick={() => {
                    openDetailsModal();
                    setSelectedPlans(value);
                    setStatus(value.status);
                    setStep(1);
                    setKey(key);
                    getUserRequestCount(value.userId);
                    getPlannedDetailsD(value.requestID);
                    setTaskAssigned(getTaskAssigne(value.requestID));
                  }}>
                  <h5
                    style={{
                      color: `${getColor(value.status)}`,
                    }}>
                    {value.status}
                  </h5>
                  <h5>{value.requestID}</h5>
                  <h5>{value.name}</h5>
                  <h5>{value.travelmode}</h5>
                  <h5>{value.fromData}</h5>
                  <h5>{value.totalDays}</h5>
                  <h5>{getTaskAssigne(value.requestID)}</h5>
                </div>
              );
            })}
          </>
        )}
      </div>

      {/* {loading ? (
          <div className='req-lo'>
            Fetching Data <Ellipsis color='#0057ff' />
          </div>
        ) : (
          <>
            {Object.keys(filterSelfPlan()).length !== 0 ? (
              <>
                {Object.keys(filterSelfPlan())
                  .slice(
                    (currentPage === 1 ? 0 : currentPage - 1) * pageSize,
                    currentPage * pageSize
                  )
                  .map((c, i) => {
                    return (
                      <div
                        className='table-heading-row request'
                        key={i}
                        style={{
                          backgroundColor:
                            selfPlans[c].status === 'Duplicate Query'
                              ? '#FF6666'
                              : '',
                        }}
                        onClick={() => {
                          openDetailsModal();
                          setSelectedPlans(selfPlans[c]);
                          setStatus(selfPlans[c].status);
                          setStep(1);
                          setKey(c);
                          getUserRequestCount(selfPlans[c].userId);
                          getPlannedDetailsD(selfPlans[c].requestID);
                          setTaskAssigned(
                            getTaskAssigne(selfPlans[c].requestID)
                          );
                        }}>
                        <h5
                          style={{
                            color: `${getColor(selfPlans[c].status)}`,
                          }}>
                          {selfPlans[c].status}
                        </h5>
                        <h5>{selfPlans[c].requestID}</h5>
                        <h5>{selfPlans[c].name}</h5>
                        <h5>{selfPlans[c].travelmode}</h5>
                        <h5>{selfPlans[c].fromData}</h5>
                        <h5>{selfPlans[c].totalDays}</h5>
                        <h5>{getTaskAssigne(selfPlans[c].requestID)}</h5>
                      </div>
                    );
                  })}
              </>
            ) : (
              <tr className='noFind'>No Plans found</tr>
            )}
          </>
        )} */}
      {/* <div className='pagination-table'>
        {currentPage === 1 ? null : (
          <div
            className='pag-count'
            onClick={(e) => {
              handleClick(e, currentPage - 1);
            }}
            style={{
              backgroundColor: '#0057ff',
              color: '#fff',
            }}>
            <h5>{'<'}</h5>
          </div>
        )}
        {new Array(pagesCount).fill('1').map((c, i) => {
          if (i + 1 < currentPage + 5 && i > currentPage - 2) {
            return (
              <div
                key={i}
                className='pag-count'
                onClick={(e) => handleClick(e, i + 1)}
                style={{
                  backgroundColor: currentPage - 1 === i ? '#0057ff' : '#fff',
                  color: currentPage - 1 === i ? '#fff' : '#333',
                }}>
                <h5>{i + 1}</h5>
              </div>
            );
          }
        })}
        {pagesCount - 1 === currentPage ? null : (
          <div
            className='pag-count'
            onClick={(e) => handleClick(e, currentPage + 1)}
            style={{
              backgroundColor: '#0057ff',
              color: '#fff',
            }}>
            <h5>{'>'}</h5>
          </div>
        )}
      </div> */}
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
            <h6 onClick={() => setStep(4)}>Transfer</h6>
          </div>
        </div>
        <div>{renderSteps(step)}</div>
      </Modal>
    </div>
    // </>
  );
};

export default SalesSelfPlan;
