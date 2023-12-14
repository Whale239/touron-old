import React, { useState, useEffect, useRef } from 'react';
import { firedb } from '../firebase';
import { Link } from 'react-router-dom';
import './StorySection.css';
import { IoIosPhotos } from 'react-icons/io';
import { Ellipsis } from 'react-spinners-css';

const StorySection = () => {
  const isMounted = useRef(false);
  const [storyData, setStoryData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getStoriesData = () => {
    setLoading(true);
    let sData = [];
    firedb.ref('stories').on('value', (data) => {
      if (isMounted.current) {
        data.forEach((i) => {
          sData.push(i.val());
        });
      }
    });
    setStoryData(sData);
    setLoading(false);
  };

  useEffect(() => {
    isMounted.current = true;
    getStoriesData();
    return () => (isMounted.current = false);
  }, []);

  return (
    <div>
      {loading ? (
        <div className='loads'>
          Stories <Ellipsis color='#E07C24' />
        </div>
      ) : (
        <div className='storySection'>
          <h1>Stories</h1>
          <div className='storyTile'>
            {storyData?.map((s, i) => {
              return (
                <div className='storyTileSingle'>
                  <Link
                    className='storyLink'
                    target='_blank'
                    to={{
                      pathname: `/story/${s.categoryTitle}`,
                    }}>
                    <div className='storyImages'>
                      <img src={s?.stories[0].imageUrl} alt='' />
                      <IoIosPhotos className='photoIcon' />
                    </div>
                    <h6>{s?.categoryTitle}</h6>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default StorySection;
