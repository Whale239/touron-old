import React, { useState, useEffect, useRef } from 'react';
import { firedb } from '../firebase';
import './ResortMain.css';

const ResortMain = () => {
  const isMounted = useRef(false);
  const [resorts, setResorts] = useState([]);
  console.log('resort', resorts);

  const getResorts = () => {
    firedb.ref('resorts').on('value', (data) => {
      if (isMounted.current) {
        const arrayR = [];
        data.forEach((d) => {
          arrayR.push(d.val());
        });
        const newarrayR = arrayR.sort((a, b) => b.priority - a.priority);
        setResorts(newarrayR);
      }
    });
  };

  useEffect(() => {
    isMounted.current = true;
    getResorts();
    return () => (isMounted.current = false);
  }, []);

  return (
    <div className='resortMain__Home'>
      <div className='resortMain__Home1'>
        {resorts.map((resort, i) => (
          <div key={i}>
            <div className='resortMain__Home1_Img'>
              <img src={resort.resortImages[0]} alt='resort-img' />
            </div>
          </div>
        ))}
      </div>
      <div className='resortMain__Home2'>sdfsdf</div>
    </div>
  );
};

export default ResortMain;
