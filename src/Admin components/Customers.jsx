import React, { useState, useEffect, useRef } from 'react';
import { firedb } from './../firebase';
import './Request.css';
import { Ellipsis } from 'react-spinners-css';

const Customers = () => {
  const isMounted = useRef(false);
  const [userDetails, setUserDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageSize, setPageSize] = useState(100);
  let pagesCount = Math.ceil(Object.keys(userDetails).length / pageSize);
  const [currentPage, setCurrentpage] = useState(0);
  const [searchText, setSearchText] = useState('');
  const handleClick = (e, index) => {
    e.preventDefault();
    setCurrentpage(index);
  };

  const getAllUserDetail = () => {
    setLoading(true);
    const m = [];
    firedb.ref('/userGeneralInfo').on('value', (data) => {
      if (isMounted.current) {
        data.forEach((c) => {
          m.push(c.val());
        });
      }
    });
    setUserDetails(m);
    setLoading(false);
  };
  useEffect(() => {
    isMounted.current = true;
    getAllUserDetail();
    return () => (isMounted.current = false);
  }, []);

  const filterData = () => {
    if (searchText === '') return userDetails;
    else {
      const filterData = userDetails.filter((details) => {
        return details.name.includes(searchText);
      });
      return filterData;
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
          <h3 style={{ color: '#666666' }}>Customers</h3>
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
            <option value='50'>50</option>
            <option value='100'>100</option>
            <option value='150'>150</option>
            <option value='200'>200</option>
          </select>
        </div>
        <div className='month'>
          <label>Search : </label>
          <input
            type='text'
            onChange={(e) => setSearchText(e.target.value)}
            value={searchText}
          />
        </div>
      </div>

      <div className='b-table'>
        <div
          className='table-heading-container request'
          style={{
            width: '100%',
          }}>
          <h5>Sl.No</h5>
          <h5>User Id</h5>
          <h5>Name</h5>
          <h5>Email</h5>
          <h5>Contact Number</h5>
        </div>
        {loading ? (
          <div className='req-lo'>
            Fetching Data <Ellipsis color='#0057ff' />
          </div>
        ) : (
          <>
            {filterData().length !== 0 ? (
              <>
                {filterData()
                  .slice(currentPage * pageSize, (currentPage + 1) * pageSize)
                  .map((c, i) => {
                    return (
                      <div className='table-heading-row request' key={i}>
                        <h5>{i + 1}</h5>
                        <h5>{c.userID}</h5>
                        <h5>{c.name}</h5>
                        <h5>{c.email}</h5>
                        <h5>{c.phoneNumber}</h5>
                      </div>
                    );
                  })}
              </>
            ) : (
              <div className='req-lo'>No Customers found</div>
            )}
          </>
        )}
      </div>
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
    </div>
  );
};

export default Customers;
