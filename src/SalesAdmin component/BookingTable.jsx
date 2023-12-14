import React, { useState, useContext, useEffect, useRef } from 'react';
import './BookingTable.css';
import { Link } from 'react-router-dom';
import { IoMdNotifications } from 'react-icons/io';
import moment from 'moment';
import { Ellipsis } from 'react-spinners-css';
import numeral from 'numeral';
import { ApiContext } from './../Context/ApiContext';
import { firedb } from '../firebase';

const BookingTable = () => {
  const isMounted = useRef(false);
  const { employees } = useContext(ApiContext);
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [bookingDetails, setBookingDetails] = useState([]);
  const [bMonth, setBMonth] = useState('');
  const [handleBy, setHandleBy] = useState('');
  const [year, setYear] = useState(new Date().getFullYear());
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentpage] = useState(0);
  const [search, setSearch] = useState('');
  const [openDelRecord, setOpenDelRecord] = useState(false);
  const [bookingRId, setBookingRId] = useState('');
  const [bookingAllDdd, setBookingAllDdd] = useState([]);

  useEffect(() => {
    isMounted.current = true;
    setLoading1(true);
    firedb
      .ref('bookingdetails1')
      .limitToLast(400)
      .on('value', (data) => {
        if (isMounted.current) {
          if (data.val() === null || data.val() === undefined) {
            setLoading1(false);
            return;
          }
          if (data.val() !== null || data.val() !== undefined) {
            let newReq = {};
            let revReq = Object.keys(data.val()).reverse();
            revReq.forEach((i) => {
              newReq[i] = data.val()[i];
            });
            setBookingDetails({
              ...newReq,
            });
          }
        }
      });
    setLoading1(false);
    return () => (isMounted.current = false);
  }, []);

  const getAllBookindDetails = () => {
    let ddd = [];
    firedb.ref('bookingdetails1').on('value', (data) => {
      if (isMounted.current) {
        data.forEach((d) => {
          ddd.push(d.key);
        });
      }
      setBookingAllDdd(ddd);
    });
  };

  useEffect(() => {
    isMounted.current = true;
    getAllBookindDetails();
    return () => (isMounted.current = false);
  }, []);

  const getRemindersCount = (reminders) => {
    let remindersData = [];
    if (reminders) {
      let count = 0;
      reminders.forEach((r) => {
        if (r.isStarted && !r.isCompleted) {
          count += 1;
          remindersData.push(r.title);
        }
      });
      return [count, remindersData];
    }
    return [0, remindersData];
  };
  const getDepatureDate = (date) => {
    const countDate = Date.parse(date);
    const now = new Date().getTime();
    const gap = countDate - now;
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const d = Math.floor(gap / day);
    if (d >= 0) return d;
    return 0;
  };

  const completedtRequest = (returnDate, isBookingCancelled) => {
    const date = moment(returnDate);

    if (isBookingCancelled) return 'cancelled';

    if (moment() > date) return 'completed';

    return '';
  };

  const render = (cat, val) => {
    switch (cat) {
      case 'travel':
        let req3 = {};
        Object.keys(bookingDetails).filter((b, i) => {
          if (handleBy === 'All' || handleBy === '') {
            if (
              bookingDetails[b]?.general.isBookingCancelled === false &&
              new Date(bookingDetails[b]?.general.onwardDate).getFullYear() ===
                parseInt(year) &&
              new Date(bookingDetails[b]?.general.onwardDate).getMonth() ===
                parseInt(bMonth)
            ) {
              req3[b] = bookingDetails[b];
            }
          } else {
            if (
              bookingDetails[b]?.general.isBookingCancelled === false &&
              new Date(bookingDetails[b]?.general.onwardDate).getFullYear() ===
                parseInt(year) &&
              new Date(bookingDetails[b]?.general.onwardDate).getMonth() ===
                parseInt(bMonth) &&
              bookingDetails[b]?.general.salesHandleName === handleBy
            ) {
              req3[b] = bookingDetails[b];
            }
          }

          if (
            bookingDetails[b]?.general.isBookingCancelled === false &&
            new Date(bookingDetails[b]?.general.onwardDate).getFullYear() ===
              parseInt(year) &&
            new Date(bookingDetails[b]?.general.onwardDate).getMonth() ===
              parseInt(bMonth) &&
            bookingDetails[b]?.general.salesHandleName === handleBy
          ) {
            req3[b] = bookingDetails[b];
          }
        });

        const sort3 = Object.keys(req3).sort((a, b) => {
          return (
            parseInt(getDepatureDate(bookingDetails[a].general.onwardDate)) -
            parseInt(getDepatureDate(bookingDetails[b].general.onwardDate))
          );
        });
        let q3 = {};
        sort3.map((s, i) => {
          return (q3[s] = bookingDetails[s]);
        });

        return q3;

      case 'reminder':
        let reminder = [];
        let c = 0;
        Object.keys(bookingDetails).forEach((r) => {
          // const { value } = r;
          if (bookingDetails[r].reminders) {
            bookingDetails[r].reminders.forEach((rr) => {
              if (rr.isStarted) {
                c += 1;
                if (reminder.length === 0) {
                  reminder.push(bookingDetails[r]?.surveyId);
                } else {
                  reminder.forEach((s) => {
                    if (reminder.includes(bookingDetails[s]?.surveyId)) {
                      return;
                    } else {
                      reminder.push(bookingDetails[s]?.surveyId);
                    }
                  });
                }
              }
            });
          }
        });
        let r = {};
        Object.keys(bookingDetails).forEach((b) => {
          if (reminder.includes(bookingDetails[b]?.surveyId)) {
            r[b] = bookingDetails[b];
          }
        });

        return [c, r];
      case 'current':
        let newReq = {};
        Object.keys(bookingDetails).forEach((d) => {
          const ds = moment(bookingDetails[d]?.general?.onwardDate);
          const date = moment(bookingDetails[d]?.general?.returnDate).add(
            1,
            'days'
          );
          console.log('date', date);

          if (
            moment().isBetween(ds, date) &&
            bookingDetails[d]?.general.isBookingCancelled === false
          ) {
            newReq[d] = bookingDetails[d];
          }
        });
        return newReq;
      case 'week':
        let newReq1 = {};
        Object.keys(bookingDetails).forEach((d) => {
          const ds = moment().subtract(1, 'days');
          const date = moment().add(val, 'days');
          if (
            moment(bookingDetails[d]?.general.onwardDate).isBetween(ds, date) &&
            bookingDetails[d]?.general.isBookingCancelled === false
          ) {
            newReq1[d] = bookingDetails[d];
          }
        });

        const sort = Object.keys(newReq1).sort((a, b) => {
          return (
            parseInt(getDepatureDate(bookingDetails[a].general.onwardDate)) -
            parseInt(getDepatureDate(bookingDetails[b].general.onwardDate))
          );
        });
        let q = {};
        sort.map((s, i) => {
          return (q[s] = bookingDetails[s]);
        });

        return q;

      case 'handle':
        let req = {};
        if (val === 'All') {
          return bookingDetails;
        }
        Object.keys(bookingDetails).forEach((b) => {
          if (bookingDetails[b]?.general.salesHandleName === val) {
            req[b] = bookingDetails[b];
          }
        });

        return req;

      case 'month':
        let req2 = {};
        Object.keys(bookingDetails).forEach((b, i) => {
          if (handleBy === 'All' || handleBy === '') {
            if (
              bookingDetails[b]?.general.isBookingCancelled === false &&
              new Date(bookingDetails[b]?.general.bookedDate).getFullYear() ===
                parseInt(year) &&
              new Date(bookingDetails[b]?.general.bookedDate).getMonth() ===
                parseInt(bMonth)
            ) {
              req2[b] = bookingDetails[b];
            }
          } else {
            if (
              bookingDetails[b]?.general.isBookingCancelled === false &&
              new Date(bookingDetails[b]?.general.bookedDate).getFullYear() ===
                parseInt(year) &&
              new Date(bookingDetails[b]?.general.bookedDate).getMonth() ===
                parseInt(bMonth) &&
              bookingDetails[b]?.general.salesHandleName === handleBy
            ) {
              req2[b] = bookingDetails[b];
            }
          }

          if (
            bookingDetails[b]?.general.isBookingCancelled === false &&
            new Date(bookingDetails[b]?.general.bookedDate).getFullYear() ===
              parseInt(year) &&
            new Date(bookingDetails[b]?.general.bookedDate).getMonth() ===
              parseInt(bMonth) &&
            bookingDetails[b]?.general.salesHandleName === handleBy
          ) {
            req2[b] = bookingDetails[b];
          }
        });

        const sort1 = Object.keys(req2).sort((a, b) => {
          return (
            parseInt(getDepatureDate(bookingDetails[a].general.onwardDate)) -
            parseInt(getDepatureDate(bookingDetails[b].general.onwardDate))
          );
        });
        let q1 = {};
        sort1.map((s, i) => {
          return (q1[s] = bookingDetails[s]);
        });

        return q1;
    }
  };

  const getBookingByMonth = () => {
    if (search) {
      let srh = {};
      Object.keys(bookingDetails).forEach((b, i) => {
        const { general, surveyId } = bookingDetails[b];
        if (
          general.customerName
            ?.toString()
            .trim()
            .toLowerCase()
            .includes(search.trim().toLowerCase()) ||
          general.destination
            ?.toString()
            .trim()
            .toLowerCase()
            .includes(search.trim().toLowerCase()) ||
          surveyId
            ?.toString()
            .trim()
            .toLowerCase()
            .includes(search.trim().toLowerCase())
        ) {
          srh[b] = bookingDetails[b];
        }
      });
      return srh;
    } else {
      if (bMonth === '' || bMonth === 'All' || bMonth === 'AllbMonth')
        return bookingDetails;
      if (bMonth === 'reminder') return render('reminder')[1];
      if (bMonth === 'current') return render('current');
      if (bMonth === '07') return render('week', 7);
      if (bMonth === '15') return render('week', 15);
      if (bMonth.toString().includes('bMonth')) return render('month');
      return render('travel');
    }
  };

  let pagesCount = Math.ceil(
    Object.keys(getBookingByMonth()).length / pageSize
  );

  const handleClick = (e, index) => {
    e.preventDefault();
    setCurrentpage(index);
  };
  var months = [
    'All',
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const getMonth = (num) => {
    return months[num + 1];
  };

  return (
    <div>
      <div className='booking-container'>
        <div className='booking-name-container'>
          <div>
            <h3 style={{ color: '#666666' }}>Booking Management</h3>
          </div>
          <Link to='/bookingrecord' target='_blank'>
            <div className='add-booking'>
              <h6> + Add Booking</h6>
            </div>
          </Link>
        </div>
        <div className='booking-stats-container'>
          <div className='booking-stats'>
            <h3>Total booking</h3>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <h6>{bookingAllDdd.length}</h6>
              <span onClick={() => setBMonth('')}>Show</span>
            </div>
          </div>

          <div className='booking-stats'>
            <h3>Current Travelling</h3>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <h6>{Object.keys(render('current')).length}</h6>
              <span onClick={() => setBMonth('current')}>Show</span>
            </div>
          </div>
          <div className='booking-stats'>
            <h3>Upcoming travel in 7 Days</h3>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
              }}>
              <h6>{Object.keys(render('week', 7)).length}</h6>
              <span onClick={() => setBMonth('07')}>Show</span>
            </div>
          </div>

          <div className='booking-stats'>
            <h3>Travellers in {getMonth(new Date().getMonth())}</h3>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span onClick={() => setBMonth(new Date().getMonth())}>Show</span>
            </div>
          </div>
          <div className='booking-stats'>
            <h3>Total Reminders</h3>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <h6>{render('reminder')[0]}</h6>
              <span onClick={() => setBMonth('reminder')}>Show</span>
            </div>
          </div>
        </div>

        <div className='filters'>
          <div className='month'>
            <label>Show Item : </label>
            <select
              value={pageSize}
              onChange={(e) => setPageSize(e.target.value)}>
              <option value='10'>10</option>
              <option value='20'>20</option>
              <option value='50'>50</option>
              <option value='100'>100</option>
            </select>
          </div>
          <div className='month'>
            <label>Upcoming Travel in : </label>
            <select
              // value={upTravel}
              onChange={(e) => setBMonth(e.target.value)}>
              <option value='' selected disabled hidden>
                select One
              </option>
              <option value='07'>7 Days</option>
              <option value='15'>15 Days</option>
            </select>
          </div>
          <div className='month'>
            <label>Year : </label>
            <select value={year} onChange={(e) => setYear(e.target.value)}>
              <option value='2020'>2020</option>
              <option value='2021'>2021</option>
              <option value='2022'>2022</option>
              <option value='2023'>2023</option>
              <option value='2024'>2024</option>
              <option value='2025'>2025</option>
            </select>
          </div>

          <div className='month'>
            <label>Booked By Month : </label>
            <select onChange={(e) => setBMonth(`${e.target.value}bMonth`)}>
              {months.map((m, i) => (
                <option key={i} value={m === 'All' ? 'All' : i - 1}>
                  {m}
                </option>
              ))}
            </select>
          </div>
          <div className='month'>
            <label>Travel By Month : </label>
            <select onChange={(e) => setBMonth(e.target.value)}>
              {months.map((m, i) => (
                <option key={i} value={m === 'All' ? 'All' : i - 1}>
                  {m}
                </option>
              ))}
            </select>
          </div>
          <div className='month'>
            <label>Handle By : </label>
            <select
              onChange={(e) => {
                // setBMonth(`handle${e.target.value}`);
                setHandleBy(e.target.value);
              }}>
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
            </select>
          </div>
          <div className='month'>
            <label>Search by Name / Dest / Id:</label>
            <input type='text' onChange={(e) => setSearch(e.target.value)} />
          </div>
        </div>

        <div className='b-table'>
          <div
            className='table-heading-container'
            style={{
              backgroundColor: '#ddefff',
            }}>
            <h5>Sl.NO</h5>
            <h5>Survey Id</h5>
            <h5>Name</h5>
            <h5>Destination</h5>
            <h5>Booking Value</h5>
            <h5>Departure</h5>
            <h5>Return</h5>
            <h5>Departure in</h5>
            <h5>Handled By</h5>
            <h5>Notification</h5>
          </div>
          {loading1 ? (
            <div className='req-lo'>
              Fetching Data <Ellipsis color='#0057ff' />
            </div>
          ) : (
            <>
              {getBookingByMonth().length === 0 ? (
                <div className='req-lo'>
                  Fetching Data <Ellipsis color='#0057ff' />
                </div>
              ) : (
                <>
                  {Object.keys(getBookingByMonth())
                    .slice(currentPage * pageSize, (currentPage + 1) * pageSize)
                    .map((c, i) => {
                      return (
                        <div>
                          {/* <div
                            onClick={() => {
                              setOpenDelRecord(true);
                              setBookingRId(c);
                            }}>
                            del
                          </div> */}
                          <Link
                            target='_blank'
                            className='plink'
                            key={i}
                            to={{
                              pathname: `/bookingrecord/${c}/${bookingDetails[c]?.general?.customerName}`,
                            }}>
                            <div
                              style={{
                                fontSize: 6,
                                backgroundColor:
                                  bookingDetails[c].general.tourType ===
                                  'International'
                                    ? '#E5D68A'
                                    : '#fff',
                                position: 'relative',
                              }}
                              className={`table-heading-row  ${completedtRequest(
                                bookingDetails[c].general.returnDate,
                                bookingDetails[c].general.isBookingCancelled
                              )}`}>
                              <h5>{i + 1}</h5>
                              <h5>{bookingDetails[c]?.surveyId}</h5>
                              <h5>{bookingDetails[c].general.customerName}</h5>
                              <h5>{bookingDetails[c].general.destination}</h5>

                              <h5>
                                {numeral(
                                  bookingDetails[c].general.bookingValue
                                ).format('0,')}
                              </h5>

                              <h5>{bookingDetails[c].general.onwardDate}</h5>
                              <h5>{bookingDetails[c].general.returnDate}</h5>
                              <h5>
                                {getDepatureDate(
                                  bookingDetails[c].general.onwardDate
                                )}{' '}
                                days
                              </h5>

                              <h5>
                                {bookingDetails[c].general.salesHandleName}
                              </h5>
                              <h5 className='notifyIcon'>
                                <IoMdNotifications size={25} />

                                {getRemindersCount(
                                  bookingDetails[c].reminders
                                )[0] === 0 ? null : (
                                  <span className='notifyValue'>
                                    {
                                      getRemindersCount(
                                        bookingDetails[c].reminders
                                      )[0]
                                    }
                                  </span>
                                )}

                                {getRemindersCount(
                                  bookingDetails[c].reminders
                                )[1].length > 0 && (
                                  <div className='notifyReminder'>
                                    {getRemindersCount(
                                      bookingDetails[c].reminders
                                    )[1].map((s, i) => (
                                      <span>
                                        {i + 1}.{s}
                                      </span>
                                    ))}
                                  </div>
                                )}
                              </h5>
                            </div>
                          </Link>
                        </div>
                      );
                    })}
                </>
              )}
            </>
          )}
        </div>
        {Object.keys(bookingDetails).length > 10 && (
          <div className='pagination-table'>
            {currentPage === 0 ? null : (
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
                    onClick={(e) => handleClick(e, i)}
                    style={{
                      backgroundColor: currentPage === i ? '#0057ff' : '#fff',
                      color: currentPage === i ? '#fff' : '#333',
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
        )}
      </div>
    </div>
  );
};

export default BookingTable;
