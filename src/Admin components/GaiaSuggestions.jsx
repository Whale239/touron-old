import React, { useState, useEffect, useRef } from 'react';
import { firedb } from './../firebase';

const GaiaSuggestions = () => {
  const isMounted = useRef(false);
  const [suggestions, setSuggestions] = useState([]);
  const getSuggestions = () => {
    let s = [];
    firedb.ref('gaiaSuggestions').on('value', (data) => {
      if (isMounted.current) {
        if (data.val() !== null) {
          data.forEach((i) => {
            s.push(i.val());
          });
          setSuggestions(s);
        }
      }
    });
  };

  useEffect(() => {
    isMounted.current = true;
    getSuggestions();
    return () => (isMounted.current = false);
  }, []);
  return (
    <div
      className='booking-container'
      style={{
        padding: '20px',
      }}>
      <div className='b-table'>
        <div
          className='table-heading-container request'
          style={{
            width: '100%',
          }}>
          <h5>Sl.No</h5>
          <h5>Suggestions</h5>
        </div>

        {suggestions.map((s, i) => {
          return (
            <div className='table-heading-row request' key={i}>
              <h5>{i + 1}</h5>
              <h5>{s.suggestions}</h5>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GaiaSuggestions;
