// import React, { useEffect, useRef, useContext, useState } from 'react';
// import { firedb } from '../firebase';
// import './BookingDeletion.css';
// import { MdDeleteForever } from 'react-icons/md';
// import moment from 'moment';
// import { ApiContext } from './../Context/ApiContext';

// const BookingDeletion = () => {
//   const isMounted = useRef(false);
//   const { employees } = useContext(ApiContext);
//   const [bookRecords, setBookRecords] = useState([]);
//   const [formOpen, setFormOpen] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [key, setKey] = useState('');
//   const [pageSize, setPageSize] = useState(10);
//   const [currentPage, setCurrentpage] = useState(1);
//   const [allBookings, setAllBookings] = useState([]);
//   const [changeData, setChangeData] = useState('');
//   const [search, setSearch] = useState('');
//   const [bMonth, setBMonth] = useState('');
//   const [tMonth, setTMonth] = useState('');
//   const [handleBy, setHandleBy] = useState('');
//   const [year, setYear] = useState(new Date().getFullYear());

//   console.log('allBookings', allBookings);

//   console.log('key', key);

//   var months = [
//     'All',
//     'January',
//     'February',
//     'March',
//     'April',
//     'May',
//     'June',
//     'July',
//     'August',
//     'September',
//     'October',
//     'November',
//     'December',
//   ];
//   const getMonth = (num) => {
//     return months[num + 1];
//   };

//   function getData() {
//     let final = [];
//     firedb
//       .ref('bookingdetails1')
//       .limitToLast(currentPage * pageSize)
//       .on('value', (data) => {
//         if (isMounted.current) {
//           data.forEach((d) => {
//             final.push(d.val());
//           });
//         }
//         setBookRecords(final.reverse());
//       });
//   }

//   useEffect(() => {
//     isMounted.current = true;
//     getData();
//     return () => (isMounted.current = false);
//   }, [currentPage, pageSize]);

//   function getAllData() {
//     let final = [];
//     firedb.ref('bookingdetails1').on('value', (data) => {
//       if (isMounted.current) {
//         data.forEach((d) => {
//           final.push(d.val());
//         });
//       }
//       setAllBookings(final);
//     });
//   }

//   useEffect(() => {
//     isMounted.current = true;
//     getAllData();
//     return () => (isMounted.current = false);
//   }, []);

//   const getCurrentTravel = () => {
//     const filter = allBookings.filter(
//       (d) =>
//         d.general.isBookingCancelled === false &&
//         moment().isBetween(
//           moment(d.general.onwardDate),
//           moment(d.general.returnDate).add(1, 'days')
//         )
//     );
//     return filter;
//   };

//   const get7daysTravel = () => {
//     const filter = allBookings.filter(
//       (d) =>
//         d.general.isBookingCancelled === false &&
//         moment(d.general.onwardDate).isBetween(
//           moment().subtract(1, 'days'),
//           moment().add(7, 'days')
//         )
//     );
//     return filter;
//   };

//   const get15daysTravel = () => {
//     const filter = allBookings.filter(
//       (d) =>
//         d.general.isBookingCancelled === false &&
//         moment(d.general.onwardDate).isBetween(
//           moment().subtract(1, 'days'),
//           moment().add(15, 'days')
//         )
//     );
//     return filter;
//   };

//   const getMonthTravel = () => {
//     const filter = allBookings.filter(
//       (d) =>
//         d.general.isBookingCancelled === false &&
//         new Date(d?.general.onwardDate).getFullYear() ===
//           new Date().getFullYear() &&
//         new Date(d?.general.onwardDate).getMonth() === new Date().getMonth() &&
//         new Date(d?.general.returnDate).getFullYear() ===
//           new Date().getFullYear() &&
//         new Date(d?.general.returnDate).getMonth() === new Date().getMonth()
//     );
//     return filter.reverse();
//   };

//   const getPerfectMonth = () => {
//     const filter = allBookings.filter(
//       (d) =>
//         d.general.isBookingCancelled === false &&
//         new Date(d.general.bookedDate).getMonth() === parseInt(bMonth) &&
//         new Date(d.general.bookedDate).getFullYear() === year
//     );
//     return filter.reverse();
//   };

//   const getPerfectTMonth = () => {
//     const filter = allBookings.filter(
//       (d) =>
//         d.general.isBookingCancelled === false &&
//         new Date(d.general.onwardDate).getMonth() === parseInt(tMonth) &&
//         new Date(d.general.onwardDate).getFullYear() === year
//     );
//     return filter.reverse();
//   };

//   const getSalesFilter = () => {
//     if (tMonth) {
//       const filter = allBookings.filter(
//         (d) =>
//           d.general.isBookingCancelled === false &&
//           d.general.salesHandleName === handleBy &&
//           new Date(d.general.onwardDate).getFullYear() === year &&
//           new Date(d.general.onwardDate).getMonth() === parseInt(tMonth)
//       );
//       return filter.reverse();
//     }
//     if (bMonth) {
//       const filter = allBookings.filter(
//         (d) =>
//           d.general.isBookingCancelled === false &&
//           d.general.salesHandleName === handleBy &&
//           new Date(d.general.bookedDate).getFullYear() === year &&
//           new Date(d.general.bookedDate).getMonth() === parseInt(bMonth)
//       );
//       return filter.reverse();
//     } else {
//       const filter = allBookings.filter(
//         (d) =>
//           d.general.isBookingCancelled === false &&
//           d.general.salesHandleName === handleBy &&
//           new Date(d.general.onwardDate).getFullYear() === year
//       );
//       return filter.reverse();
//     }
//   };

//   const getRemainders = () => {
//     let reminder = [];
//     allBookings.forEach((r) => {
//       if (r.reminders) {
//         r.reminders.forEach((rr) => {
//           if (rr.isStarted) {
//             reminder.push(r);
//           }
//         });
//       }
//     });
//     return reminder;
//   };

//   const switchData = () => {
//     if (search) {
//       let dd = [];
//       allBookings.forEach((d) => {
//         if (
//           d.general.customerName
//             ?.toString()
//             .trim()
//             .toLowerCase()
//             .includes(search.trim().toLowerCase()) ||
//           d.general.destination
//             ?.toString()
//             .trim()
//             .toLowerCase()
//             .includes(search.trim().toLowerCase()) ||
//           d.surveyId
//             ?.toString()
//             .trim()
//             .toLowerCase()
//             .includes(search.trim().toLowerCase())
//         ) {
//           dd.push(d);
//         }
//       });
//       return dd;
//     } else {
//       if (changeData === '') {
//         return bookRecords;
//       }
//       if (changeData === 'current') {
//         return getCurrentTravel();
//       }
//       if (changeData === '7day') {
//         return get7daysTravel();
//       }
//       if (changeData === '07') {
//         return get7daysTravel();
//       }
//       if (changeData === '15') {
//         return get15daysTravel();
//       }
//       if (changeData === 'currentmonth') {
//         return getMonthTravel();
//       }
//       if (changeData === 'perfect') {
//         return getPerfectMonth();
//       }
//       if (changeData === 'perfectT') {
//         return getPerfectTMonth();
//       }
//       if (changeData === 'sales') {
//         return getSalesFilter();
//       }
//       if (changeData === 'reminder') {
//         return getRemainders();
//       }
//     }
//   };

//   const pagesCount = Math.ceil(
//     changeData === ''
//       ? allBookings.length / pageSize
//       : switchData().length / pageSize
//   );

//   function removeData() {
//     setLoading(true);
//     firedb
//       .ref(`bookingdetails1/${key}`)
//       .remove()
//       .then(() => {
//         setLoading(false);
//         setFormOpen(false);
//       })
//       .catch((err) => console.log('err', err));
//   }

//   const getDepatureDate = (date) => {
//     const countDate = Date.parse(date);
//     const now = new Date().getTime();
//     const gap = countDate - now;
//     const second = 1000;
//     const minute = second * 60;
//     const hour = minute * 60;
//     const day = hour * 24;

//     const d = Math.floor(gap / day);
//     if (d >= 0) return d;
//     return 0;
//   };

//   return (
//     <div className='bookingDeletion_form_mainzz_ss'>
//       {formOpen && (
//         <div className='bookingDeletion_form_mainzz'>
//           <div className='bookingDeletion_form_mainzz_f'>
//             {loading ? (
//               <div>Please wait...</div>
//             ) : (
//               <>
//                 <p className='bookingDeletion_form_mainzz_p'>
//                   Are you sure you want to delete?
//                 </p>
//                 <div>
//                   <button
//                     className='bookingDeletion_form_mainzz_btn1'
//                     style={{ margin: '5px' }}
//                     onClick={() => removeData()}>
//                     Delete
//                   </button>
//                   <button
//                     className='bookingDeletion_form_mainzz_btn2'
//                     style={{ margin: '5px' }}
//                     onClick={() => setFormOpen(false)}>
//                     Cancel
//                   </button>
//                 </div>
//               </>
//             )}
//           </div>
//         </div>
//       )}
//       <div>
//         <div>
//           <h4>Total Booking - {allBookings.length}</h4>
//           <button onClick={() => setChangeData('')}>Show</button>
//         </div>
//         <div>
//           <h4>Current Travelling - {getCurrentTravel().length}</h4>
//           <button onClick={() => setChangeData('current')}>Show</button>
//         </div>
//         <div>
//           <h4>Upcoming travel in 7 Days - {get7daysTravel().length}</h4>
//           <button onClick={() => setChangeData('7day')}>Show</button>
//         </div>
//         <div>
//           <h4>Travellers in {getMonth(new Date().getMonth())}</h4>
//           <button onClick={() => setChangeData('currentmonth')}>Show</button>
//         </div>
//         <div>
//           <h4>Total Reminders {getRemainders().length}</h4>
//           <button onClick={() => setChangeData('reminder')}>Show</button>
//         </div>
//       </div>
//       <div>
//         <div className='month'>
//           <label>Show Item : </label>
//           <select
//             value={pageSize}
//             onChange={(e) => setPageSize(e.target.value)}>
//             <option value='10'>10</option>
//             <option value='20'>20</option>
//             <option value='50'>50</option>
//             <option value='100'>100</option>
//           </select>
//         </div>
//         <div className='month'>
//           <label>Upcoming Travel in : </label>
//           <select onChange={(e) => setChangeData(e.target.value)}>
//             <option value='' selected disabled hidden>
//               select
//             </option>
//             <option value='07'>7 Days</option>
//             <option value='15'>15 Days</option>
//           </select>
//         </div>
//         <div className='month'>
//           <label>Year : </label>
//           <select value={year} onChange={(e) => setYear(e.target.value)}>
//             <option value='2020'>2020</option>
//             <option value='2021'>2021</option>
//             <option value='2022'>2022</option>
//             <option value='2023'>2023</option>
//             <option value='2024'>2024</option>
//             <option value='2025'>2025</option>
//           </select>
//         </div>
//         <div className='month'>
//           <label>Booked By Month : </label>
//           <select
//             onChange={(e) => {
//               setBMonth(e.target.value);
//               setChangeData('perfect');
//             }}>
//             <option value='' selected disabled hidden>
//               select
//             </option>
//             <option value='0'>Jan</option>
//             <option value='1'>Feb</option>
//             <option value='2'>Mar</option>
//             <option value='3'>April</option>
//             <option value='4'>May</option>
//             <option value='5'>June</option>
//             <option value='6'>July</option>
//             <option value='7'>Aug</option>
//             <option value='8'>Sep</option>
//             <option value='9'>Oct</option>
//             <option value='10'>Nov</option>
//             <option value='11'>Dec</option>
//           </select>
//         </div>
//         <div className='month'>
//           <label>Travel By Month : </label>
//           <select
//             onChange={(e) => {
//               setTMonth(e.target.value);
//               setChangeData('perfectT');
//             }}>
//             <option value='' selected disabled hidden>
//               select
//             </option>
//             <option value='0'>Jan</option>
//             <option value='1'>Feb</option>
//             <option value='2'>Mar</option>
//             <option value='3'>April</option>
//             <option value='4'>May</option>
//             <option value='5'>June</option>
//             <option value='6'>July</option>
//             <option value='7'>Aug</option>
//             <option value='8'>Sep</option>
//             <option value='9'>Oct</option>
//             <option value='10'>Nov</option>
//             <option value='11'>Dec</option>
//           </select>
//         </div>
//         <div className='month'>
//           <label>Handle By : </label>
//           <select
//             onChange={(e) => {
//               setHandleBy(e.target.value);
//               setChangeData('sales');
//             }}>
//             <option value='' selected disabled hidden>
//               select
//             </option>
//             {employees?.map((e, i) => {
//               if (
//                 e.designation === 'CEO' ||
//                 e.designation == 'Travel Associate'
//               )
//                 return (
//                   <option key={i} value={e.name}>
//                     {e.name}
//                   </option>
//                 );
//             })}
//           </select>
//         </div>
//         <div className='month'>
//           <label>Search by Name / Dest / Id:</label>
//           <input type='text' onChange={(e) => setSearch(e.target.value)} />
//         </div>
//       </div>
//       <div>
//         <table className='bookingDeletion_table_mainsss'>
//           <thead>
//             <tr className='bookingDeletion_table_tr'>
//               <th>Survey Id</th>
//               <th>Customer Name</th>
//               <th>Destination</th>
//               <th>Departure</th>
//               <th>Return</th>
//               <th>Departure In</th>
//               <th>Sales</th>
//               <th>Remove</th>
//             </tr>
//           </thead>
//           {switchData().length === 0 ? (
//             <>No data found...</>
//           ) : (
//             <tbody>
//               {switchData()
//                 .slice(
//                   (currentPage === 1 ? 0 : currentPage - 1) * pageSize,
//                   currentPage * pageSize
//                 )
//                 .map((b, i) => (
//                   <tr key={i} className='bookingDeletion_table_tr1'>
//                     <td>{b.surveyId}</td>
//                     <td>{b.general.customerName}</td>
//                     <td>{b.general.destination}</td>
//                     <td>{b.general.onwardDate}</td>
//                     <td>{b.general.returnDate}</td>
//                     <td>{getDepatureDate(b.general.onwardDate)} days</td>
//                     <td>{b.general.salesHandleName}</td>
//                     <td
//                       style={{ cursor: 'pointer' }}
//                       onClick={() => {
//                         setKey(b.key);
//                         setFormOpen(true);
//                       }}>
//                       <MdDeleteForever className='bookingDeletion_table_tr1_dels' />
//                     </td>
//                   </tr>
//                 ))}
//             </tbody>
//           )}
//         </table>
//       </div>
//       {switchData().length > 0 && (
//         <div style={{ display: 'flex' }}>
//           {currentPage === 1 ? null : (
//             <div
//               onClick={() => setCurrentpage(currentPage - 1)}
//               style={{
//                 backgroundColor: '#0057ff',
//                 color: '#fff',
//               }}>
//               <h5>{'<'}</h5>
//             </div>
//           )}
//           {new Array(pagesCount).fill('1').map((c, i) => {
//             if (i + 1 < currentPage + 5 && i > currentPage - 2) {
//               return (
//                 <div
//                   key={i}
//                   onClick={() => setCurrentpage(i + 1)}
//                   style={{
//                     backgroundColor: currentPage - 1 === i ? '#0057ff' : '#fff',
//                     color: currentPage - 1 === i ? '#fff' : '#333',
//                   }}>
//                   <h5>{i + 1}</h5>
//                 </div>
//               );
//             }
//           })}
//           {pagesCount === currentPage ? null : (
//             <div
//               onClick={() => setCurrentpage(currentPage + 1)}
//               style={{
//                 backgroundColor: '#0057ff',
//                 color: '#fff',
//               }}>
//               <h5>{'>'}</h5>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default BookingDeletion;

import React, { useEffect, useRef, useState } from 'react';
import './BookingDeletion.css';
import { firedb } from '../firebase';
import './BookingDeletion.css';
import { MdDeleteForever } from 'react-icons/md';

const BookingDeletion = () => {
  const isMounted = useRef(false);
  const [bookRecords, setBookRecords] = useState([]);
  const [allBookings, setAllBookings] = useState([]);
  const [pageSize, setPageSize] = useState(20);
  const [currentPage, setCurrentpage] = useState(1);
  const [formOpen, setFormOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [key, setKey] = useState('');

  console.log('first', bookRecords);

  const pagesCount = Math.ceil(allBookings.length / pageSize);

  function getData() {
    let final = [];
    firedb
      .ref('bookingdetails1')
      .limitToLast(currentPage * pageSize)
      .on('value', (data) => {
        if (isMounted.current) {
          data.forEach((d) => {
            final.push({
              key: d.key,
              value: d.val(),
            });
          });
        }
        setBookRecords(final.reverse());
      });
  }

  useEffect(() => {
    isMounted.current = true;
    getData();
    return () => (isMounted.current = false);
  }, [currentPage, pageSize]);

  function getAllData() {
    let final = [];
    firedb.ref('bookingdetails1').on('value', (data) => {
      if (isMounted.current) {
        data.forEach((d) => {
          final.push(d.val());
        });
      }
      setAllBookings(final);
    });
  }

  useEffect(() => {
    isMounted.current = true;
    getAllData();
    return () => (isMounted.current = false);
  }, []);

  function removeData() {
    setLoading(true);
    firedb
      .ref(`bookingdetails1/${key}`)
      .remove()
      .then(() => {
        setLoading(false);
        setFormOpen(false);
      })
      .catch((err) => console.log('err', err));
  }

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

  return (
    <div className='bookingDeletion_form_mainzz_ss'>
      {formOpen && (
        <div className='bookingDeletion_form_mainzz'>
          <div className='bookingDeletion_form_mainzz_f'>
            {loading ? (
              <div>Please wait...</div>
            ) : (
              <>
                <p className='bookingDeletion_form_mainzz_p'>
                  Are you sure you want to delete?
                </p>
                <div>
                  <button
                    className='bookingDeletion_form_mainzz_btn1'
                    style={{ margin: '5px' }}
                    onClick={() => removeData()}>
                    Delete
                  </button>
                  <button
                    className='bookingDeletion_form_mainzz_btn2'
                    style={{ margin: '5px' }}
                    onClick={() => {
                      setKey('');
                      setFormOpen(false);
                    }}>
                    Cancel
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
      {bookRecords.length > 0 && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            margin: '20px 0',
          }}>
          {currentPage === 1 ? null : (
            <div
              onClick={() => setCurrentpage(currentPage - 1)}
              style={{
                backgroundColor: '#0057ff',
                color: '#fff',
                margin: '0 5px',
                cursor: 'pointer',
                padding: '5px',
              }}>
              <h5>{'<'}</h5>
            </div>
          )}
          {new Array(pagesCount).fill('1').map((c, i) => {
            if (i + 1 < currentPage + 5 && i > currentPage - 2) {
              return (
                <div
                  key={i}
                  onClick={() => setCurrentpage(i + 1)}
                  style={{
                    backgroundColor: currentPage - 1 === i ? '#0057ff' : '#fff',
                    color: currentPage - 1 === i ? '#fff' : '#333',
                    margin: '0 5px',
                    cursor: 'pointer',
                    padding: '5px',
                  }}>
                  <h5>{i + 1}</h5>
                </div>
              );
            }
          })}
          {pagesCount === currentPage ? null : (
            <div
              onClick={() => setCurrentpage(currentPage + 1)}
              style={{
                backgroundColor: '#0057ff',
                color: '#fff',
                margin: '0 5px',
                cursor: 'pointer',
                padding: '5px',
              }}>
              <h5>{'>'}</h5>
            </div>
          )}
        </div>
      )}
      <table className='bookingDeletion_table_mainsss'>
        <thead>
          <tr>
            <th>Sl.No</th>
            <th>Survey Id</th>
            <th>Name</th>
            <th>Destination</th>
            <th>Departure</th>
            <th>Return</th>
            <th>Departure In</th>
            <th>Handled by</th>
            <th>Remove</th>
          </tr>
        </thead>
        {bookRecords.length === 0 ? (
          <>No data found...</>
        ) : (
          <tbody>
            {bookRecords
              .slice(
                (currentPage === 1 ? 0 : currentPage - 1) * pageSize,
                currentPage * pageSize
              )
              .map((b, i) => (
                <tr key={i} className='bookingDeletion_table_tr1'>
                  <td>{i + 1}</td>
                  <td>{b.value.surveyId}</td>
                  <td>{b.value.general.customerName}</td>
                  <td>{b.value.general.destination}</td>
                  <td>{b.value.general.onwardDate}</td>
                  <td>{b.value.general.returnDate}</td>
                  <td>{getDepatureDate(b.value.general.onwardDate)} days</td>
                  <td>{b.value.general.salesHandleName}</td>
                  <td
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                      setKey(b.key);
                      setFormOpen(true);
                    }}>
                    <MdDeleteForever className='bookingDeletion_table_tr1_dels' />
                  </td>
                </tr>
              ))}
          </tbody>
        )}
      </table>
    </div>
  );
};

export default BookingDeletion;
