import React, { useState, useEffect, useRef } from 'react';
import { firedb } from '../firebase';
import './ViewResort.css';
import { Link } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';

const ViewResort = () => {
  const isMounted = useRef(false);
  const [resorts, setResorts] = useState([]);
  const [load, setLoad] = useState(false);
  const [searchText, setSearchText] = useState('');

  const getResorts = () => {
    firedb.ref('resorts').on('value', (data) => {
      if (isMounted.current) {
        let newResort = {};
        let revResort = Object.keys(data.val()).reverse();
        revResort.forEach((i) => {
          newResort[i] = data.val()[i];
        });
        const sort = Object.keys(newResort).sort((a, b) => {
          return (
            parseInt(newResort[b].priority) - parseInt(newResort[a].priority)
          );
        });
        let resort = {};
        sort.map((s, i) => {
          return (resort[s] = newResort[s]);
        });
        setResorts({
          ...resort,
        });
      }
    });
  };

  const removeResorts = (id) => {
    firedb
      .ref(`resorts/${id}`)
      .remove()
      .then(() => {
        setLoad(true);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    isMounted.current = true;
    getResorts();
    return () => (isMounted.current = false);
  }, [load]);

  const filter = () => {
    if (searchText === '') return resorts;

    let filter = {};
    Object.keys(resorts).map((a) => {
      if (
        resorts[a]?.resortName
          .trim()
          .toUpperCase()
          .includes(searchText.trim().toUpperCase())
      ) {
        filter[a] = resorts[a];
      }
    });

    return filter;
  };

  return (
    <div className='resortView'>
      <div className='resortViewHead'>
        <h1>Resort View</h1>
      </div>
      <div className='resortViewButton'>
        <Link to='/resort' target='_blank'>
          <button>Add</button>
        </Link>
      </div>
      <div className='blog-container__filter'>
        <div className='blog-container__filter2'>
          <div className='sicon'>
            <AiOutlineSearch size={30} />
          </div>
          <input
            type='text'
            placeholder='Enter Resort Name'
            className='blog-container__filter2-input'
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
      </div>

      <div className='resortVieww'>
        {Object.keys(filter()).map((r, i) => {
          return (
            <div key={i} className='singleResortView'>
              <div className='singleResortViewI'>
                <img src={resorts[r].resortImages[0]} alt='' />
              </div>
              <div className='singleResortViewC'>
                <h6>Resort - {resorts[r].resortName}</h6>
                <h6>Country - {resorts[r].countryName}</h6>
                <h6>City - {resorts[r].cityName}</h6>
                <h6>Ratings - {resorts[r].ratings}</h6>
                <h6>Priority - {resorts[r].priority}</h6>
              </div>
              <div className='resortModify'>
                <Link
                  target='_blank'
                  to={{
                    pathname: `/resort/${r}`,
                  }}
                  className='resortL'>
                  Edit
                </Link>
                <div className='resortR' onClick={() => removeResorts(r)}>
                  Remove
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ViewResort;
