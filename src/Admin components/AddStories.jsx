import React, { useState, useEffect, useRef } from 'react';
import { Modal, ModalHeader, ModalBody, Progress } from 'reactstrap';
import { v4 as uuidv4 } from 'uuid';
import { firedb, fireStorage } from './../firebase';
import { useToasts } from 'react-toast-notifications';
import './AddStories.css';
import { BiEditAlt, BiImages } from 'react-icons/bi';
import { RiDeleteBin2Fill } from 'react-icons/ri';
import moment from 'moment';

const AddStories = () => {
  const isMounted = useRef(false);
  const { addToast } = useToasts();
  const [storyOpen, setStoryOpen] = useState(false);
  const [modal, setModal] = useState(false);
  const closeModal = () => setModal(false);
  const openModal = () => setModal(true);
  const [editStoryId, setEditStoryId] = useState('');
  const [storyCategoryTitle, setStoryCategoryTitle] = useState('');
  const [progress, setProgress] = useState(0);
  const [imageUploaded, setImageUploaded] = useState(false);

  const [story, setStory] = useState({
    id: uuidv4(),
    storyTitle: '',
    storyContent: '',
    imageUrl: '',
    createdAt: Date.now(),
  });

  const [storiesData, setStoriesData] = useState([]);
  const [singleStoryDetails, setSingleStoryDetails] = useState({
    categoryTitle: '',
    stories: [],
  });

  const { categoryTitle, stories } = singleStoryDetails;
  const { storyContent, storyTitle, imageUrl, createdAt } = story;

  useEffect(() => {
    isMounted.current = true;
    let s = [];
    firedb.ref(`stories`).on('value', (data) => {
      if (isMounted.current) {
        if (data.val() !== null) {
          let newReq = {};
          let revReq = Object.keys(data.val()).reverse();
          revReq.forEach((i) => {
            newReq[i] = data.val()[i];
          });
          setStoriesData({
            ...newReq,
          });
        }
      }
      // data.forEach((story) => {
      //   s.push(story.val());
      // });
    });
    // setStoriesData(s);
    return () => (isMounted.current = false);
  }, []);

  const addStory = (e) => {
    e.preventDefault();
    let newStory = [];
    if (stories) {
      newStory = [...stories, story];
    } else {
      newStory = [story];
    }
    firedb
      .ref(`stories/${storyCategoryTitle}`)
      .set({
        categoryTitle: storyCategoryTitle,
        stories: newStory,
      })
      .then(() => {
        addToast('Story added Successfully', {
          appearance: 'success',
        });
        setEditStoryId('');
        setStory({
          id: uuidv4(),
          storyTitle: '',
          storyContent: '',
          imageUrl: null,
          createdAt: Date.now(),
        });
        setStoryCategoryTitle('');
        setStoryOpen(false);
      })

      .catch((err) => console.log(`err`, err));
  };

  const updateStory = (e) => {
    e.preventDefault();

    let newStory = stories.map((a) => {
      if (a.id === editStoryId) {
        a.id = editStoryId;
        a.createdAt = createdAt;
        a.storyTitle = storyTitle;
        a.storyContent = storyContent;
        a.imageUrl = imageUrl;
      }
      return a;
    });

    console.log(`object`, storyCategoryTitle);
    firedb
      .ref(`stories/${storyCategoryTitle}`)
      .set({
        categoryTitle: storyCategoryTitle,
        stories: newStory,
      })
      .then(() => {
        addToast('Story updated Successfully', {
          appearance: 'success',
        });
        setEditStoryId('');
        setStory({
          id: uuidv4(),
          storyTitle: '',
          storyContent: '',
          imageUrl: null,
          createdAt: Date.now(),
        });
        setStoryOpen(false);
      })
      .catch((err) => console.log(`err`, err));
  };

  const deleteStory = (id) => {
    let deleteStory = stories.filter((a) => a.id !== id);
    if (deleteStory.length === 0) {
      firedb
        .ref(`stories/${storyCategoryTitle}`)
        .remove()
        .then(() => {
          addToast('Story Deleted Successfully', {
            appearance: 'error',
          });
        })
        .catch((err) => console.log(`err`, err));
    } else {
      firedb
        .ref(`stories/${storyCategoryTitle}`)
        .set({
          categoryTitle: storyCategoryTitle,
          stories: deleteStory,
        })
        .then(() => {
          addToast('Story Deleted Successfully', {
            appearance: 'error',
          });
        })
        .catch((err) => console.log(`err`, err));
    }
  };

  const uploadFile = async (e) => {
    const file = e.target.files[0];
    console.log(`file`, file);

    const ref = fireStorage.ref(
      `stories/${moment().format('MMM Do YY')}/${Date.now()}${file.name}`
    );
    console.log(`ref`, ref);
    const task = ref.put(file);

    task.on('state_changed', (taskSnapshot) => {
      const per =
        (taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 100;

      console.log('per', per);
      setProgress(Math.round(per));
    });

    task.then(() => {
      ref.getDownloadURL().then((url) => {
        console.log(`url`, url);
        setStory({
          ...story,
          imageUrl: url,
        });
      });
    });
    try {
      setImageUploaded(true);
      await task.then(() => {
        setImageUploaded(false);
        setProgress(0);
      });
    } catch (E) {
      console.log(E);
    }
  };

  return (
    <>
      <Modal isOpen={modal} contentClassName='story'>
        <ModalHeader
          toggle={() => {
            closeModal();
            setStoryCategoryTitle('');
            setSingleStoryDetails({
              categoryTitle: '',
              stories: [],
            });
          }}>
          Stories
        </ModalHeader>
        <ModalBody>
          <div className='storyButtonContainer'>
            <div className='storyButton'>
              <button onClick={() => setStoryOpen(!storyOpen)}>
                + Add story
              </button>
            </div>
            {storyOpen ? (
              <div className='storyForm'>
                <div className='generalInputt'>
                  <label>Category Title</label>
                  <input
                    type='text'
                    value={storyCategoryTitle}
                    onChange={(e) => setStoryCategoryTitle(e.target.value)}
                  />
                </div>

                <div className='generalInputt'>
                  <label>Story Title</label>
                  <input
                    type='text'
                    value={storyTitle}
                    onChange={(e) =>
                      setStory({
                        ...story,
                        storyTitle: e.target.value,
                      })
                    }
                  />
                </div>
                <div className='generalInputt'>
                  <label>Story Content</label>
                  <textarea
                    type='text'
                    value={storyContent}
                    onChange={(e) =>
                      setStory({
                        ...story,
                        storyContent: e.target.value,
                      })
                    }
                  />
                </div>
                <div className='generalInputt'>
                  <label>Story Image Url</label>
                  <input
                    type='text'
                    value={imageUrl}
                    onChange={(e) =>
                      setStory({
                        ...story,
                        imageUrl: e.target.value,
                      })
                    }
                  />
                </div>
                <div className='generalInputt'>
                  <label>Story Image</label>
                  <input type='file' onChange={uploadFile} />
                </div>
                <div className='generalInputt' style={{ paddingTop: 20 }}>
                  {imageUploaded && (
                    <>
                      <h5>{progress}%</h5>
                      <Progress value={progress} animated={true} />
                    </>
                  )}
                </div>
                <div className='generalbtns'>
                  {editStoryId === '' ? (
                    <div className='generalInputtBtn'>
                      <button onClick={addStory}>Add Story</button>
                    </div>
                  ) : (
                    <div className='generalInputtBtn'>
                      <button onClick={updateStory}>update Story</button>
                    </div>
                  )}
                  <div
                    className='generalInputtBtnCan'
                    onClick={() => setStoryOpen(false)}>
                    <button>Cancel</button>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
          <div>
            <h1>{categoryTitle}</h1>
            <div className='storyContentContainer'>
              {stories.map((story, index) => {
                return (
                  <div className='storyView' key={index}>
                    <div className='storyImage'>
                      <img
                        src={
                          story.imageUrl === ''
                            ? 'https://lh3.googleusercontent.com/proxy/FFBiGQJqY5aD0R2pBxIWglwVhuX_8JW5D_uMSZVgWG6XSaxL90Y4qF1khzo58JH6wpfGO6Ar1nT8wtpq7v5vAj5YcUiVkUGUO3lVkM2ZGB7fZTrjZ8VMkqgasw'
                            : story.imageUrl
                        }
                        alt='storyImage'
                      />
                      <div className='storyDetails'>
                        <h1>{story.storyTitle}</h1>
                        <h5>{story.storyContent}</h5>
                      </div>
                    </div>
                    <div className='storyButtons'>
                      <BiEditAlt
                        onClick={() => {
                          setStoryOpen(true);
                          setEditStoryId(story.id);
                          setStory({
                            id: story.id,
                            createdAt: story.createdAt,
                            storyTitle: story.storyTitle,
                            storyContent: story.storyContent,
                            imageUrl: story.imageUrl,
                          });
                        }}
                        style={{ color: 'yellow', padding: '5px' }}
                        size={30}
                      />
                      <RiDeleteBin2Fill
                        onClick={() => deleteStory(story.id)}
                        style={{ color: 'red', padding: '5px' }}
                        size={30}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </ModalBody>
      </Modal>

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
            <h3 style={{ color: '#666666' }}>Story Section</h3>
          </div>
          <div
            className='add-booking'
            onClick={() => {
              //   setEdit(false);
              openModal();
            }}>
            <h6> + Add Category</h6>
          </div>
        </div>

        <div className='scontainer'>
          {Object.keys(storiesData).map((story, index) => {
            console.log(`storiesData[story]`, storiesData[story]);
            return (
              <div
                key={index}
                className='singleSView'
                onClick={() => {
                  openModal();
                  setStoryCategoryTitle(storiesData[story].categoryTitle);
                  setSingleStoryDetails({
                    ...singleStoryDetails,
                    stories: storiesData[story].stories,
                    categoryTitle: storiesData[story].categoryTitle,
                  });
                }}>
                <h1 className='catTitle'>{storiesData[story].categoryTitle}</h1>
                <div style={{ position: 'relative' }}>
                  <img
                    src={storiesData[story]?.stories[0]?.imageUrl}
                    className='storyCategoryImage'
                    alt='storyImage'
                  />
                  <div className='storyIcon'>
                    <BiImages size={30} color='#fff' />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default AddStories;
