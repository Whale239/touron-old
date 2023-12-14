import React, { useEffect, useRef, useState } from 'react';
import './Virtualdash.css';
import { firedb } from '../firebase';

const Virtualdash = () => {
  const isMounted = useRef(false);
  const [data, setData] = useState([]);

  const getData = () => {
    let dd = [];
    firedb.ref('virtual').on('value', (data) => {
      if (isMounted.current) {
        data.forEach((d) => {
          dd.push(d.val());
        });
        setData(dd.reverse());
      }
    });
  };

  useEffect(() => {
    isMounted.current = true;
    getData();
    return () => (isMounted.current = false);
  }, []);

  return (
    <div className='virtual_dash__main'>
      <table className='virtual_dash__main__table'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Mobile</th>
            <th>Appointment Type</th>
            <th>Date</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {data.map((d, i) => (
            <tr>
              <td>{d.name}</td>
              <td>{d.number}</td>
              <td>{d.apType}</td>
              <td>{d.date}</td>
              <td>{d.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Virtualdash;
