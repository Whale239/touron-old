import React, { useState, useEffect, useContext, useRef } from 'react';
import { GiMeal, GiJourney } from 'react-icons/gi';
import { ImEnter, ImExit } from 'react-icons/im';
import { FaBed } from 'react-icons/fa';
import { BiCalendar } from 'react-icons/bi';
import { AiFillStar } from 'react-icons/ai';
import { HiInformationCircle } from 'react-icons/hi';
import { FaRegCalendarAlt, FaTachometerAlt } from 'react-icons/fa';
import { TiGroup, TiTicket } from 'react-icons/ti';
import { BsClockHistory } from 'react-icons/bs';
import { Ellipsis } from 'react-spinners-css';
import moment from 'moment';
import Planning from '../assests/Planning.jpg';
import Slider from 'react-slick';
import { Button, Table, Modal, Popover, Input } from 'reactstrap';
import { firedb } from '../firebase';
import { useToasts } from 'react-toast-notifications';
import {
  getExpoToken,
  sendPushNotification,
} from './../Login components/PushNotification';
import SalesAdmin from './SalesAdmin';
import './SalesRequest.css';
import { MdFlight, MdDirectionsBus, MdTrain } from 'react-icons/md';
import ReactExport from 'react-export-excel';
import { ApiContext } from './../Context/ApiContext';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const SalesRequest = () => {
  const isMounted = useRef(false);
  const { employees } = useContext(ApiContext);
  const { addToast } = useToasts();
  const [taskAssigned, setTaskAssigned] = useState('');
  const [step, setStep] = useState(1);
  const [domesticModal, setDomesticModal] = useState(false);
  const [internationalModal, setInternationalModal] = useState(false);
  const [detailsModal, setDetailsModal] = useState(false);
  const [userRequest, setUserRequest] = useState([]);
  const [userRequestLength, setUserRequestLength] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userRequestDates, setUserRequestDates] = useState([]);
  const [userRequestCount, setUserRequestCount] = useState(0);
  const [selectedRequest, setSelectedRequest] = useState({});
  const [status, setStatus] = useState('');
  const [key, setKey] = useState('');
  const [clicked, setClicked] = useState(false);
  const [querystatus, setQueryStatus] = useState('');
  const [category, setCategory] = useState('');
  const [requestId, setRequestId] = useState('');
  const [number, setNumber] = useState('');
  const [selfPlanModal, setSelfPlanModal] = useState(false);
  const [planKey, setPlanKey] = useState({});
  const [cost, setCost] = useState(0);
  const [plannedDetails, setPlannedDetails] = useState({});
  const [assignedTasks, setAssignedTasks] = useState([]);
  const [pageSize, setPageSize] = useState(20);
  const [currentPage, setCurrentpage] = useState(1);
  const [reqDate, setReqDate] = useState('');
  const [reqToDate, setReqToDate] = useState('');

  const getTaskAssigne = (requestID) => {
    let name = '';
    assignedTasks.forEach((a) => {
      if (a.requestID === requestID) {
        name = a.name;
      }
    });
    return name;
  };

  const innerWidth = window.innerWidth;
  useEffect(() => {
    if (innerWidth < 900) {
      setClicked(true);
    }
  }, []);
  const [weekPopover, setWeekPopover] = useState(false);
  const [monthPopover, setMonthPopover] = useState(false);
  const [totalPopover, setTotalPopover] = useState(false);

  const toggleWeekPopover = () => setWeekPopover(!weekPopover);
  const toggleMonthPopover = () => setMonthPopover(!monthPopover);
  const toggleTotalPopover = () => setTotalPopover(!totalPopover);

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

  let weekReq = [];

  const weekRequest = () => {
    let count = 0;
    userRequestDates.forEach((d) => {
      const ds = moment();
      const date = moment().subtract(7, 'days');

      if (moment(d.requestDate).isBetween(date, ds)) {
        count = count + 1;
        weekReq.push(d);
      }
    });
    return count;
  };

  let monthReq = [];
  const monthRequest = () => {
    let count = 0;
    userRequestDates.forEach((d) => {
      const ds = moment();
      const month = moment().subtract(31, 'days');
      if (moment(d.requestDate).isBetween(month, ds)) {
        count = count + 1;
        monthReq.push(d);
      }
    });
    return count;
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

  const closeDomesticModal = () => {
    setDomesticModal(false);
  };
  const openDetailsModal = () => {
    setDetailsModal(true);
  };
  const closeDetailsModal = () => {
    setDetailsModal(false);
    setWeekPopover(false);
    setMonthPopover(false);
    setTotalPopover(false);
    setPlannedDetails({});
  };
  const openSelfPlanModal = () => {
    setSelfPlanModal(true);
  };
  const closeSelfPlanModal = () => {
    setPlanKey({});
    setSelfPlanModal(false);
  };

  function closeInternationalModal() {
    setInternationalModal(false);
  }

  useEffect(() => {
    isMounted.current = true;
    getAllRequest();
    return () => (isMounted.current = false);
  }, [currentPage, pageSize]);

  useEffect(() => {
    isMounted.current = true;
    getUserRequestLength();
    return () => (isMounted.current = false);
  }, []);
  useEffect(() => {
    isMounted.current = true;
    getAssignTask();
    return () => (isMounted.current = false);
  }, []);

  const getUserRequestCount = (uid) => {
    firedb.ref('requests').on('value', (data) => {
      if (data !== null) {
        let req = [];
        data.forEach((d) => {
          if (d.val().userID === uid) {
            req.push(d.val());
          }
        });
        setUserRequestDates(req);
        setUserRequestCount(req.length);
      }
    });
  };
  const getUserRequestLength = (uid) => {
    firedb.ref('requests').on('value', (data) => {
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
  const getAllRequest = () => {
    setLoading(true);
    firedb
      .ref('requests')
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
            setUserRequest({
              ...newReq,
            });
          }
        }
      });
    setLoading(false);
  };

  const assignTask = () => {
    firedb
      .ref(`assignedTasks`)
      .push({
        name: taskAssigned,
        requestID: selectedRequest.requestID,
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

  const updateRequest = () => {
    firedb
      .ref(`requests/${key}`)
      .update({
        status: status,
        tourCost: cost,
      })
      .then(() => {
        closeDetailsModal();
        setKey('');
        setStatus('');
        addToast('Request Status Updated Successfully', {
          appearance: 'success',
        });
        const token = getExpoToken(selectedRequest.userID);

        const message = {
          to: token,
          sound: 'default',
          title: `Request Status Changed`,
          body: `Request Status Changed for your ${selectedRequest.tourCategory} of id ${selectedRequest.requestID} has been changed to  ${status}`,
          data: selectedRequest,
        };
        sendPushNotification(message);
      })
      .catch((err) => console.log('err :>> ', err));
  };

  const getPlannedDetails = (key) => {
    firedb.ref('plannedDetails').on('value', (data) => {
      if (data.val() === null || data.val() === undefined) {
        // setLoading(false);
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

  const getColor = (status) => {
    let color = '';
    colors.filter((c) => {
      if (c.name === status) color = c.color;
    });
    return color;
  };

  const getKey = (id) => {
    let key = '';
    Object.keys(userRequest).map((r) => {
      if (userRequest[r].requestID === id) {
        key = r;
      }
    });
    return key;
  };

  const filterRequests = () => {
    if (querystatus !== '') {
      let newReq = [];
      firedb
        .ref('requests')
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
    } else if (reqDate !== '') {
      let rs = [];
      userRequestLength.map((r) => {
        const { value } = r;
        if (reqToDate === '') {
          if (
            moment(value?.requestDate).format('L') ===
            moment(reqDate).format('L')
          ) {
            rs.push(r);
          }
        } else {
          console.log('running');
          let formatedDate = moment(value?.requestDate).format('YYYY-MM-DD');
          let fromDate = moment(reqDate).subtract(1, 'days');
          let toDate = moment(reqToDate).add(1, 'days');

          if (
            moment(formatedDate).isBetween(moment(fromDate), moment(toDate))
          ) {
            console.log(`r`, r);
            rs.push(r);
          }
        }
      });
      return rs;
    } else if (category !== '') {
      let newReq = [];
      firedb
        .ref('requests')
        .orderByChild('tourCategory')
        .equalTo(category)
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
    } else if (requestId !== '') {
      let rs = [];
      userRequestLength.map((r) => {
        const { value } = r;
        if (
          value?.requestID
            ?.trim()
            .toLowerCase()
            .includes(requestId.trim().toLowerCase())
        ) {
          rs.push(r);
        }
      });
      return rs;
    } else if (number !== '') {
      let rs = [];
      userRequestLength.map((r) => {
        const { value } = r;
        if (
          value?.number
            ?.toString()
            .trim()
            .toLowerCase()
            .includes(number.trim().toLowerCase()) ||
          value?.name
            ?.toString()
            .trim()
            .toLowerCase()
            .includes(number.trim().toLowerCase())
        ) {
          rs.push(r);
        }
      });
      return rs.reverse();
    }
  };

  const convert = () => {
    const arr = [];
    if (
      querystatus === '' &&
      category === '' &&
      number === '' &&
      requestId === '' &&
      reqDate === ''
    ) {
      return Object.values(userRequest);
    } else {
      filterRequests().map((ar) => {
        arr.push(ar.value);
      });
    }
    return arr;
  };

  let pagesCount = userRequestLength.length;

  const handleClick = (e, index) => {
    e.preventDefault();
    setCurrentpage(index);
  };

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
                      <td>{selectedRequest.name}</td>
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
                      {userRequestDates.map((t, index) => {
                        return (
                          <h6
                            key={index}
                            style={{
                              padding: 8,
                              overflow: 'auto',
                              margin: 0,
                              cursor: 'pointer',
                              backgroundColor:
                                selectedRequest.requestID === t.requestID
                                  ? '#53E0BC'
                                  : '',
                            }}
                            onClick={() => {
                              // setKey(c);
                              // setSelectedRequest(userRequest[c]);
                              // setStatus(userRequest[c].status);

                              closeDetailsModal();
                              setSelectedRequest(t);
                              setStatus(t.status);
                              setKey(getKey(t.requestID));
                              openDetailsModal();
                            }}>
                            {index + 1}.{t.requestID} - {t.requestDate},
                            {getTaskAssigne(t.requestID)}
                          </h6>
                        );
                      })}
                    </Popover>

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
                      {weekReq.map((w, index) => {
                        return (
                          <h6
                            key={index}
                            style={{
                              padding: 8,
                              overflow: 'auto',

                              margin: 0,
                              cursor: 'pointer',
                              backgroundColor:
                                selectedRequest.requestID === w.requestID
                                  ? '#53E0BC'
                                  : '',
                            }}
                            onClick={() => {
                              closeDetailsModal();
                              setSelectedRequest(w);
                              setStatus(w.status);
                              setKey(getKey(w.requestID));
                              openDetailsModal();
                            }}>
                            {index + 1}.{w.requestID} - {w.requestDate},
                            {getTaskAssigne(w.requestID)}
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
                      <div
                        style={{
                          overflow: 'auto',
                        }}>
                        {monthReq.map((m, index) => {
                          return (
                            <h6
                              key={index}
                              style={{
                                padding: 8,
                                margin: 0,
                                overflow: 'auto',
                                cursor: 'pointer',
                                backgroundColor:
                                  selectedRequest.requestID === m.requestID
                                    ? '#53E0BC'
                                    : '',
                              }}
                              onClick={() => {
                                closeDetailsModal();
                                setSelectedRequest(m);
                                setStatus(m.status);
                                setKey(getKey(m.requestID));
                                openDetailsModal();
                              }}>
                              {index + 1}.{m.requestID} -{' '}
                              {m.requestDate.toString()},
                              {getTaskAssigne(m.requestID)}
                            </h6>
                          );
                        })}
                      </div>
                    </Popover>
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
                    <tr>
                      <td>Your Preference</td>
                      <td>{selectedRequest.preferanece}</td>
                    </tr>
                    <tr>
                      <td>Query From</td>
                      <td>{selectedRequest.receivedFrom}</td>
                    </tr>
                  </tbody>
                </Table>
                {selectedRequest.priority && (
                  <div className='priorClass'>
                    <p>{selectedRequest.priority}</p>
                  </div>
                )}

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
                      getPlannedDetails(selectedRequest.requestID);
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
                    // value={getTaskAssigne(selectedRequest.requestID)}
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
                        e.designation === 'Travel Associate' ||
                        e.designation === 'Division Manager'
                      )
                        return (
                          <option key={i} value={e.name}>
                            {e.name}
                          </option>
                        );
                    })}
                    {/* <option value="Ganesh">Ganesh</option>
                    <option value="Kirthika">Kirthika</option>
                    <option value="Vikash">Vikash</option>
                    <option value="Sam">Sam</option>
                    <option value="Swetha">Swetha</option>
                    <option value="Bharathwaaj">Bharathwaaj</option> */}
                  </Input>
                </div>

                <div className='update-button'>
                  <button className='btn btn-success' onClick={assignTask}>
                    Assign
                  </button>
                </div>
                <div className='update-button'>
                  <h1>
                    Handled By {getTaskAssigne(selectedRequest.requestID)}
                  </h1>
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
                          <div key={i} className='slide-hotel-single'>
                            <Slider {...settings3} className='slide-hotel'>
                              {c.hotelPicture.map((h, index) => {
                                return (
                                  <div className='req-hotels-main' key={index}>
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
                                    <h6>
                                      {c.checkIn.slice(0, 10)},
                                      {c.checkIn.slice(11)}
                                    </h6>
                                  </div>
                                  <div className='req-hotel-infrms-checki'>
                                    <h6>-----</h6>
                                    <BiCalendar className='req-hotell-icon' />
                                    <h6>-----</h6>
                                  </div>
                                  <div className='req-hotel-infrms-checki'>
                                    <h6>Check Out</h6>
                                    <ImExit className='req-hotell-icon' />
                                    <h6>
                                      {c.checkOut.slice(0, 10)},
                                      {c.checkOut.slice(11)}
                                    </h6>
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
    }
  };

  return (
    <>
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
            <h3 style={{ color: '#666666' }}>Request Management</h3>
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
              <h6>{userRequestLength.length}</h6>
            </div>
          </div>
          <div className='booking-stats'>
            <h3>Completed Request</h3>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <h6>0</h6>
            </div>
          </div>
          {reqDate != '' && (
            <div className='booking-stats'>
              <h3>
                No of Queries in{'\n'} {reqDate}{' '}
                {reqToDate !== '' ? `- ${reqToDate}` : ''}
              </h3>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <h6>{filterRequests().length}</h6>
              </div>
            </div>
          )}
          {/* <div className="booking-stats">
            <h3>Places to visit in Abroad</h3>
            <div style={{ display: "flex", alignItems: "center" }}>
              <h6>30</h6>
            </div>
          </div> */}
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
              <option value='20'>20</option>
              <option value='50'>50</option>
              <option value='100'>100</option>
            </select>
          </div>

          <div className='month'>
            <label>Tour Category : </label>
            <select
              onChange={(e) => setCategory(e.target.value)}
              value={category}>
              <option value=''>All</option>
              <option value='Planned Tour'>Planned Tour</option>
              <option value='Surprise Tour'>Surprise Tour</option>
              <option value='Honeymoon Trip'>Honeymoon Trip</option>
              <option value='Luxury Tour'>Luxury Tour</option>
              <option value='Road Trip'>Road Trip</option>
              <option value='Wildlife'>Wildlife</option>
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
          <div className='month'>
            <label> Phone Number or Name: </label>
            <input
              type='text'
              onChange={(e) => setNumber(e.target.value)}
              value={number}
            />
          </div>
          <div className='month'>
            <label> Request ID : </label>
            <input
              type='text'
              onChange={(e) => setRequestId(e.target.value)}
              value={requestId}
            />
          </div>
        </div>
        <div className='exportCont'>
          <div className='datesCont'>
            <div className='month'>
              <label>From Date : </label>
              <input
                type='date'
                onChange={(e) => {
                  if (reqToDate === '') {
                    setReqDate(e.target.value);
                  } else {
                    setReqDate(e.target.value);
                    setReqToDate('');
                  }
                }}
                value={reqDate}
              />
            </div>
            <div className='month'>
              <label> To : </label>
              <input
                type='date'
                onChange={(e) => setReqToDate(e.target.value)}
                value={reqToDate}
              />
            </div>
            <button
              className='export'
              style={{ marginLeft: 20 }}
              onClick={() => {
                setReqDate('');
                setReqToDate('');
              }}>
              Clear Search
            </button>
          </div>

          <ExcelFile
            element={<button className='export'>Export to Excel</button>}>
            <ExcelSheet data={convert()} name='Queries'>
              <ExcelColumn label='Request ID' value='requestID' />
              <ExcelColumn label='Request Date' value='requestDate' />
              <ExcelColumn label='Tour Category' value='tourCategory' />
              <ExcelColumn label='Destination' value='destination' />
              <ExcelColumn label='Tour Category' value='tourCategory' />
              <ExcelColumn label='Name' value='name' />
              <ExcelColumn label='Phone Number' value='number' />
              <ExcelColumn label='Budget' value='budget' />
              <ExcelColumn
                label='Remaining Days'
                value={(col) =>
                  `${moment(col.fromDate).diff(moment(), 'days')} days`
                }
              />
              <ExcelColumn
                label='Assigned to'
                value={(col) => getTaskAssigne(col.requestID)}
              />
            </ExcelSheet>
          </ExcelFile>
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
            <h5>Tour Category</h5>
            <h5>Destination</h5>
            <h5>Departure Date</h5>
            <h5>Departure in Days</h5>
            <h5>Handled By</h5>
          </div>

          {querystatus === '' &&
          reqDate === '' &&
          category === '' &&
          number === '' &&
          requestId === '' ? (
            <>
              {loading ? (
                <div className='req-lo'>
                  Fetching Data <Ellipsis color='#0057ff' />
                </div>
              ) : (
                <>
                  {userRequest.length !== 0 ? (
                    <>
                      {Object.keys(userRequest)
                        .slice(
                          (currentPage === 1 ? 0 : currentPage - 1) * pageSize,
                          currentPage * pageSize
                        )
                        .map((c, i) => {
                          return (
                            <div
                              className={
                                userRequest[c].status === 'Duplicate Query'
                                  ? 'table-heading-row request duplicate'
                                  : 'table-heading-row request'
                              }
                              // className="table-heading-row request"
                              key={i}
                              onClick={() => {
                                setKey(c);
                                setSelectedRequest(userRequest[c]);
                                setCost(userRequest[c].tourCost);
                                setStep(1);
                                openDetailsModal();
                                setStatus(userRequest[c].status);
                                getUserRequestCount(userRequest[c].userID);
                                getPlannedDetailsD(userRequest[c].requestID);
                              }}>
                              <h5
                                style={{
                                  color: `${getColor(userRequest[c].status)}`,
                                }}>
                                {userRequest[c].status}
                              </h5>
                              <h5>{userRequest[c].requestID}</h5>
                              <h5>{userRequest[c].name}</h5>
                              <h5>{userRequest[c].tourCategory}</h5>
                              <h5>
                                {userRequest[c].tourCategory === 'Surprise Tour'
                                  ? '--'
                                  : userRequest[c].destination}
                              </h5>
                              <h5>{userRequest[c].fromDate}</h5>
                              <h5>
                                {moment(userRequest[c].fromDate).diff(
                                  moment(),
                                  'days'
                                )}
                                days
                              </h5>
                              <h5>
                                {getTaskAssigne(userRequest[c].requestID)}
                              </h5>
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
                                  color:
                                    currentPage - 1 === i ? '#fff' : '#333',
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
              {filterRequests().map((c, i) => {
                const { value, key } = c;
                return (
                  <div
                    className={
                      value.status === 'Duplicate Query'
                        ? 'table-heading-row request duplicate'
                        : 'table-heading-row request'
                    }
                    // className="table-heading-row request"
                    key={i}
                    onClick={() => {
                      setKey(key);
                      setSelectedRequest(value);
                      openDetailsModal();
                      setCost(value.tourCost);
                      setStep(1);
                      openDetailsModal();
                      setStatus(value.status);
                      getUserRequestCount(value.userID);
                      getPlannedDetailsD(value.requestID);
                    }}>
                    <h5
                      style={{
                        color: `${getColor(value.status)}`,
                      }}>
                      {value.status}
                    </h5>
                    <h5>{value.requestID}</h5>
                    <h5>{value.name}</h5>
                    <h5>{value.tourCategory}</h5>
                    <h5>
                      {value.tourCategory === 'Surprise Tour'
                        ? '--'
                        : value.destination}
                    </h5>
                    <h5>{value.fromDate}</h5>
                    <h5>{moment(value.fromDate).diff(moment(), 'days')}</h5>
                    {/* <h5>{getDepatureDate(value.fromDate)} days</h5> */}
                    <h5>{getTaskAssigne(value.requestID)}</h5>
                  </div>
                );
              })}
            </>
          )}
        </div>

        <Modal
          className='modal-dialog-centered modal-danger'
          contentClassName='bg-gradient-danger'
          isOpen={domesticModal}>
          <div className='modal-header'>
            <h6 className='modal-title' id='modal-title-notification'>
              Domestic
            </h6>
            <button
              aria-label='Close'
              className='close'
              data-dismiss='modal'
              type='button'
              onClick={closeDomesticModal}>
              <span aria-hidden={true}>×</span>
            </button>
          </div>
          <div className='modal-body'>
            <div className='py-3 text-center'>
              <i className='ni ni-bell-55 ni-3x' />
              <h4 className='heading mt-4'>You should read this!</h4>
              <p>
                A small river named Duden flows by their place and supplies it
                with the necessary regelialia.
              </p>
            </div>
          </div>
          <div className='modal-footer'>
            <Button className='btn-white' color='default' type='button'>
              Ok, Got it
            </Button>
            <Button
              className='text-white ml-auto'
              color='link'
              data-dismiss='modal'
              type='button'
              onClick={closeDomesticModal}>
              Close
            </Button>
          </div>
        </Modal>
        <Modal
          className='modal-dialog-centered modal-danger'
          contentClassName='bg-gradient-danger'
          isOpen={internationalModal}>
          <div className='modal-header'>
            <h6 className='modal-title' id='modal-title-notification'>
              International
            </h6>
            <button
              aria-label='Close'
              className='close'
              data-dismiss='modal'
              type='button'
              onClick={closeInternationalModal}>
              <span aria-hidden={true}>×</span>
            </button>
          </div>
          <div className='modal-body'>
            <div className='py-3 text-center'>
              <i className='ni ni-bell-55 ni-3x' />
              <h4 className='heading mt-4'>You should read this!</h4>
              <p>
                A small river named Duden flows by their place and supplies it
                with the necessary regelialia.
              </p>
            </div>
          </div>
          <div className='modal-footer'>
            <Button className='btn-white' color='default' type='button'>
              Ok, Got it
            </Button>
            <Button
              className='text-white ml-auto'
              color='link'
              data-dismiss='modal'
              type='button'
              onClick={closeInternationalModal}>
              Close
            </Button>
          </div>
        </Modal>
        <Modal contentClassName='modal-request' isOpen={selfPlanModal}>
          <div className='modal-header'>
            <h6 className='modal-title' id='modal-title-notification'>
              Add Tour Plans
            </h6>
            <button
              aria-label='Close'
              className='close'
              data-dismiss='modal'
              type='button'
              onClick={closeSelfPlanModal}>
              <span aria-hidden={true}>×</span>
            </button>
          </div>
          <SalesAdmin
            selectedRequest={selectedRequest}
            closeSelfPlanModal={closeSelfPlanModal}
            planKey={planKey}
          />
        </Modal>
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
              <h6 onClick={() => setStep(4)}>Transfer</h6>
            </div>
          </div>
          <div>{renderSteps(step)}</div>
        </Modal>
      </div>
    </>
  );
};

export default SalesRequest;
