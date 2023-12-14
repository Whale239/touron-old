import React, { useState, useEffect } from 'react';
import { Modal, Button, ModalHeader, ModalFooter, ModalBody } from 'reactstrap';
import { Ellipsis } from 'react-spinners-css';

import { useToasts } from 'react-toast-notifications';
import { API } from './../backend';
import axios from 'axios';
import { BiEditAlt } from 'react-icons/bi';
import { RiDeleteBin2Fill } from 'react-icons/ri';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const State = () => {
  const { addToast } = useToasts();
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState([]);
  const [edit, setEdit] = useState(false);
  const [modal, setModal] = useState(false);
  const closeModal = () => setModal(false);
  const openModal = () => setModal(true);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentpage] = useState(0);
  let pagesCount = Math.ceil(state.length / pageSize);
  const [editId, setEditId] = useState('');

  const [stateFields, setStateFields] = useState({
    stateName: '',
    aboutState: '',
    imageUrl: '',
    bestTimeToVisit: '',
    bestPlaces: '',
  });

  const { stateName, aboutState, imageUrl, bestTimeToVisit, bestPlaces } =
    stateFields;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStateFields({
      ...stateFields,
      [name]: value,
    });
  };

  const handleClick = (e, index) => {
    e.preventDefault();
    setCurrentpage(index);
  };

  //   const getState = async () => {
  //     try {
  //       setLoading(true);

  //       const stateResponse = await axios.get(`${API}/state`);
  //       setState(stateResponse.data);
  //       setLoading(false);
  //     } catch (err) {
  //       console.log(err, "err");
  //     }
  //   };

  useEffect(() => {
    setLoading(true);
    const source = axios.CancelToken.source();
    axios
      .get(`${API}/state`, {
        cancelToken: source.token,
      })
      .then((res) => {
        setState(res.data);
        setLoading(false);
      })
      .catch((err) => {
        if (axios.isCancel(err)) {
          console.log('Axios request aborted.');
        } else {
          console.error(err);
        }
      });
    return () => {
      source.cancel();
    };
  }, []);

  const addState = async () => {
    try {
      await axios
        .post(`${API}/state`, {
          stateName: stateName,
          aboutState: aboutState,
          imageUrl: imageUrl,
          bestTimeToVisit: bestTimeToVisit,
          bestPlaces: bestPlaces,
        })
        .then((data) => {
          addToast('Updated Successfully', {
            appearance: 'success',
          });
          setStateFields({
            countryName: '',
            aboutCountry: '',
            imageUrl: '',
            bestTimeToVisit: '',
            bestPlaces: '',
          });
          closeModal();
        });
    } catch (err) {
      console.log(err, 'err');
    }
  };
  const getStateById = async (id) => {
    setEdit(true);
    await axios
      .get(`${API}/state/edit/${id}`)
      .then((data) => {
        const statedata = data.data;
        setEditId(statedata._id);
        setStateFields({
          stateName: statedata.stateName,
          aboutState: statedata.aboutState,
          imageUrl: statedata.imageUrl,
          bestTimeToVisit: statedata.bestTimeToVisit,
          bestPlaces: statedata.bestPlaces,
        });
        openModal();
      })
      .catch((err) => console.log('err', err));
  };

  const updateState = async () => {
    await axios
      .post(`${API}/state/edit/${editId}`, {
        stateName: stateName,
        aboutState: aboutState,
        imageUrl: imageUrl,
        bestTimeToVisit: bestTimeToVisit,
        bestPlaces: bestPlaces,
      })
      .then((data) => {
        setEditId('');
        addToast('Updated Successfully', {
          appearance: 'success',
        });
        setStateFields({
          countryName: '',
          aboutCountry: '',
          imageUrl: '',
          bestTimeToVisit: '',
          bestPlaces: '',
        });
        closeModal();
      })
      .catch((err) => console.log('err', err));
  };
  const deleteState = async (id) => {
    try {
      await axios
        .post(`${API}/state/delete/${id}`)
        .then((data) => {
          addToast('Deleted Successfully', {
            appearance: 'error',
          });
        })
        .catch((err) =>
          addToast(err, {
            appearance: 'success',
          })
        );
    } catch (err) {
      console.log('err', err);
    }
  };

  //   useEffect(() => {
  //     getState();
  //   }, []);

  return (
    <>
      <Modal isOpen={modal}>
        <ModalHeader toggle={closeModal}>State Details</ModalHeader>
        <ModalBody>
          <form>
            <div className='country--fiels-flex'>
              <div className='country--fiels-flex1'>
                <div className='country--field'>
                  <label>State Name</label>
                  <input
                    type='text'
                    name='stateName'
                    value={stateName}
                    onChange={handleChange}
                    className='user-input-alter user-input'
                  />
                </div>
                <div className='country--field'>
                  <label>About State</label>
                  <textarea
                    rows='3'
                    name='aboutState'
                    value={aboutState}
                    onChange={handleChange}
                    className='user-input-alter user-input'
                  />
                </div>
                <div className='country--field'>
                  <label>Image Url</label>
                  <input
                    type='text'
                    name='imageUrl'
                    value={imageUrl}
                    onChange={handleChange}
                    className='user-input-alter user-input'
                  />
                </div>

                <div className='country--field'>
                  <label>Best Time to Visit</label>
                  <input
                    type='text'
                    name='bestTimeToVisit'
                    value={bestTimeToVisit}
                    onChange={handleChange}
                    className='user-input-alter user-input'
                  />
                </div>
                <div className='country--field'>
                  <label>Major Cities</label>
                  <div style={{ width: 300 }}>
                    <CKEditor
                      editor={ClassicEditor}
                      data={bestPlaces}
                      onChange={(event, editor) => {
                        const data = editor.getData();
                        setStateFields({
                          ...stateFields,
                          bestPlaces: data,
                        });
                      }}
                    />
                  </div>
                  {/* <textarea
                    rows="3"
                    name="bestPlaces"
                    value={bestPlaces}
                    onChange={handleChange}
                    className="user-input-alter user-input"
                  /> */}
                </div>
              </div>
            </div>
          </form>
        </ModalBody>
        <ModalFooter>
          {!edit ? (
            <Button style={{ backgroundColor: '#1B98F5' }} onClick={addState}>
              Add
            </Button>
          ) : (
            <Button
              style={{ backgroundColor: '#4DD637' }}
              onClick={updateState}>
              Update
            </Button>
          )}
        </ModalFooter>
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
            <h3 style={{ color: '#666666' }}>State Details</h3>
          </div>
          <div
            className='add-booking'
            onClick={() => {
              setEdit(false);
              openModal();
            }}>
            <h6> + Add State</h6>
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
              <option value='10'>10</option>
              <option value='20'>20</option>
              <option value='50'>50</option>
            </select>
          </div>
        </div>

        <div className='b-table'>
          <div
            className='table-heading-container request'
            style={{
              width: '100%',
            }}>
            <h5>Sl.No</h5>
            <h5>State Name</h5>
            <h5>About State</h5>
            <h5>Best time to visit</h5>
            {/* <h5>Major Cities</h5> */}
            <h5>Action</h5>
          </div>
          {loading ? (
            <div className='req-lo'>
              Fetching Data <Ellipsis color='#0057ff' />
            </div>
          ) : (
            <>
              {state.length !== 0 ? (
                <>
                  {state
                    .slice(currentPage * pageSize, (currentPage + 1) * pageSize)
                    .map((t, i) => {
                      return (
                        <div className='table-heading-row request' key={i}>
                          <h5>{i + 1}</h5>
                          <h5>{t.stateName}</h5>
                          <h5>{t.aboutState}</h5>
                          <h5>{t.bestTimeToVisit}</h5>
                          {/* <h5>{parse(t.bestPlaces)}</h5> */}
                          <h5>
                            <BiEditAlt
                              color='blue'
                              style={{ fontSize: 20, cursor: 'pointer' }}
                              onClick={() => {
                                getStateById(t._id);
                              }}
                            />
                            <span>
                              <RiDeleteBin2Fill
                                color='red'
                                style={{
                                  paddingLeft: 8,
                                  fontSize: 24,
                                  cursor: 'pointer',
                                }}
                                onClick={() => deleteState(t._id)}
                              />
                            </span>
                          </h5>
                        </div>
                      );
                    })}
                </>
              ) : (
                <div className='req-lo'>No State found</div>
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
    </>
  );
};

export default State;
