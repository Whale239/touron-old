import React, { useState, useEffect, useRef } from 'react';
import {
  AmpStoryGridLayer,
  AmpStory,
  AmpStoryPage,
  AmpImg,
} from 'react-google-stories';
import { useParams } from 'react-router-dom';
import { firedb } from '../firebase';
import './StoryPage.css';
import { Ellipsis } from 'react-spinners-css';

const StoryPage = () => {
  const isMounted = useRef(false);
  const { categoryTitle } = useParams();
  const [singleStory, setSingleStory] = useState([]);
  const [loading, setLoading] = useState(false);

  const getStoriesData = () => {
    setLoading(true);
    let sData = [];
    firedb.ref('stories').on('value', (data) => {
      if (isMounted.current) {
        data.forEach((i) => {
          if (i.val().categoryTitle === categoryTitle) {
            sData.push(i.val());
          }
        });
      }
      setSingleStory(sData[0]);
      setLoading(false);
    });
  };
  useEffect(() => {
    isMounted.current = true;
    getStoriesData();
    return () => (isMounted.current = false);
  }, []);

  return (
    <>
      {loading ? (
        <div className='loads'>
          Stories <Ellipsis color='#E07C24' />
        </div>
      ) : (
        <AmpStory>
          {singleStory?.stories?.map((s) => {
            return (
              <AmpStoryPage id='first'>
                <AmpStoryGridLayer template='fill'>
                  <AmpImg src={s.imageUrl} layout='responsive'></AmpImg>
                </AmpStoryGridLayer>
                {/* <AmpStoryGridLayer
                  class="backCover"
                  template="vertical"
                ></AmpStoryGridLayer> */}
                {/* <AmpStoryGridLayer template="vertical">
                  <img src="../logof.png" class="clogo" alt="clogo" />
                </AmpStoryGridLayer>  */}
                {s.storyContent && (
                  <AmpStoryGridLayer template='vertical'>
                    <div
                      animate-in='fly-in-bottom'
                      animate-in-delay='0.6s'
                      animate-in-duration='1s'
                      className='para'>
                      <p>{s.storyContent}</p>
                    </div>
                  </AmpStoryGridLayer>
                )}
              </AmpStoryPage>
            );
          })}
        </AmpStory>
      )}
    </>
  );
};

export default StoryPage;
