import React, { useState, useEffect } from 'react';
import { Modal, Button, ModalHeader, ModalFooter, ModalBody } from 'reactstrap';
import { Ellipsis } from 'react-spinners-css';
import './Request.css';
import { API } from './../backend';
import axios from 'axios';
import './Countries.css';
import { BiEditAlt } from 'react-icons/bi';
import { RiDeleteBin2Fill } from 'react-icons/ri';
import { useToasts } from 'react-toast-notifications';

const Countries = () => {
  const { addToast } = useToasts();
  const [modal, setModal] = useState(false);
  const closeModal = () => setModal(false);
  const openModal = () => setModal(true);
  const [edit, setEdit] = useState(false);
  const [country, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageSize, setPageSize] = useState(10);
  let pagesCount = Math.ceil(country.length / pageSize);
  const [currentPage, setCurrentpage] = useState(0);
  const [editId, setEditId] = useState('');

  const [countryFields, setCountryFields] = useState({
    countryName: '',
    aboutCountry: '',
    idealDays: '',
    imageUrl: '',
    weather: '',
    onArrival: '',
    cost: '',
    currency: '',
    timeZone: '',
    bestTimeToVisit: '',
    bestPlaces: '',
    countryFlagImage: '',
  });

  const {
    countryName,
    aboutCountry,
    idealDays,
    imageUrl,
    weather,
    onArrival,
    cost,
    currency,
    timeZone,
    bestTimeToVisit,
    bestPlaces,
    countryFlagImage,
  } = countryFields;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCountryFields({
      ...countryFields,
      [name]: value,
    });
  };

  const handleClick = (e, index) => {
    e.preventDefault();
    setCurrentpage(index);
  };

  //   const getCountries = async () => {
  //     try {
  //       setLoading(true);
  //       const countryResponse = await axios.get(`${API}/country`);
  //       setCountries(countryResponse.data);
  //       setLoading(false);
  //     } catch (err) {
  //       console.log(err, "err");
  //     }
  //   };

  useEffect(() => {
    const source = axios.CancelToken.source();
    axios
      .get(`${API}/country`, {
        cancelToken: source.token,
      })
      .then((res) => {
        setCountries(res.data);
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

  const addCountries = async () => {
    try {
      await axios
        .post(`${API}/country`, {
          countryName: countryName,
          aboutCountry: aboutCountry,
          idealDays: idealDays,
          imageUrl: imageUrl,
          weather: weather,
          visa: {
            onArrival: onArrival,
            cost: cost,
          },
          general: {
            currency: currency,
            timeZone: timeZone,
            bestTimeToVisit: bestTimeToVisit,
          },
          bestPlaces: bestPlaces,
          countryFlagImage: countryFlagImage,
        })
        .then((data) => {
          addToast('Added Successfully', {
            appearance: 'success',
          });
          console.log(`data`, data);
          setCountryFields({
            countryName: '',
            aboutCountry: '',
            idealDays: '',
            imageUrl: '',
            weather: '',
            onArrival: '',
            cost: '',
            currency: '',
            timeZone: '',
            bestTimeToVisit: '',
            bestPlaces: '',
            countryFlagImage: '',
          });
          closeModal();
        })
        .catch((err) => console.log('err', err));
    } catch (err) {
      console.log(err, 'err');
    }
  };

  const getCountriesById = async (id) => {
    setEdit(true);
    await axios
      .get(`${API}/country/edit/${id}`)
      .then((data) => {
        const countrydata = data.data;
        setEditId(countrydata._id);
        setCountryFields({
          countryName: countrydata.countryName,
          aboutCountry: countrydata.aboutCountry,
          idealDays: countrydata.idealDays,
          imageUrl: countrydata.imageUrl,
          weather: countrydata.weather,
          onArrival: countrydata.visa.onArrival,
          cost: countrydata.visa.cost,
          currency: countrydata.general.currency,
          timeZone: countrydata.general.timeZone,
          bestTimeToVisit: countrydata.general.bestTimeToVisit,
          bestPlaces: countrydata.bestPlaces,
          countryFlagImage: countrydata.countryFlagImage,
        });
        openModal();
      })
      .catch((err) => console.log('err', err));
  };

  const updateCountry = async () => {
    await axios
      .post(`${API}/country/edit/${editId}`, {
        countryName: countryName,
        aboutCountry: aboutCountry,
        idealDays: idealDays,
        imageUrl: imageUrl,
        weather: weather,
        onArrival: onArrival,
        cost: cost,
        currency: currency,
        timeZone: timeZone,
        bestTimeToVisit: bestTimeToVisit,
        bestPlaces: bestPlaces,
        countryFlagImage: countryFlagImage,
      })
      .then((data) => {
        setEditId('');
        addToast('Updated Successfully', {
          appearance: 'success',
        });
        setCountryFields({
          countryName: '',
          aboutCountry: '',
          idealDays: '',
          imageUrl: '',
          weather: '',
          onArrival: '',
          cost: '',
          currency: '',
          timeZone: '',
          bestTimeToVisit: '',
          bestPlaces: '',
          countryFlagImage: '',
        });
        closeModal();
      })
      .catch((err) => console.log('err', err));
  };

  //   useEffect(() => {
  //     getCountries();
  //   }, []);

  const deleteCountry = async (id) => {
    try {
      await axios
        .post(`${API}/country/delete/${id}`)
        .then((data) => {
          addToast('Deleted Successfully', {
            appearance: 'error',
          });
        })
        .catch((err) =>
          addToast(err, {
            appearance: 'error',
          })
        );
    } catch (err) {
      console.log('err', err);
    }
  };
  return (
    <>
      <Modal isOpen={modal}>
        <ModalHeader toggle={closeModal}>Country Details</ModalHeader>
        <ModalBody>
          <form>
            <div className='country--fiels-flex'>
              <div className='country--fiels-flex1'>
                <div className='country--field'>
                  <label>Country Name</label>
                  <input
                    type='text'
                    name='countryName'
                    value={countryName}
                    onChange={handleChange}
                    className='user-input-alter user-input'
                  />
                </div>
                <div className='country--field'>
                  <label>About Country</label>
                  <textarea
                    rows='3'
                    name='aboutCountry'
                    value={aboutCountry}
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
                  <label>Country Flag Image Url</label>
                  <input
                    type='text'
                    name='countryFlagImage'
                    value={countryFlagImage}
                    onChange={handleChange}
                    className='user-input-alter user-input'
                  />
                </div>
                <div className='country--field'>
                  <label>Ideal days to travel</label>
                  <select
                    name='idealDays'
                    value={idealDays}
                    onChange={handleChange}
                    className='user-input-alter user-input'>
                    <option value='' disabled selected hidden></option>
                    <option value='3-4days'>3-4days</option>
                    <option value='4-5days'>4-5days</option>
                    <option value='5-6days'>5-6days</option>
                    <option value='6-7days'>6-7days</option>
                    <option value='7-8days'>7-8days</option>
                    <option value='8-10days'>8-10days</option>
                  </select>
                </div>
                <div className='country--field'>
                  <label>Weather</label>
                  <input
                    type='text'
                    name='weather'
                    value={weather}
                    onChange={handleChange}
                    className='user-input-alter user-input'
                  />
                </div>
              </div>
              <div className='country--fiels-flex2'>
                <div className='country--field'>
                  <label>Visa on Arrival</label>
                  <input
                    type='text'
                    placeholder='Yes or No'
                    name='onArrival'
                    value={onArrival}
                    onChange={handleChange}
                    className='user-input-alter user-input'
                  />
                </div>
                <div className='country--field'>
                  <label>Visa Cost in Rupees</label>
                  <input
                    type='number'
                    name='cost'
                    value={cost}
                    onChange={handleChange}
                    className='user-input-alter user-input'
                  />
                </div>
                <div className='country--field'>
                  <label>Currency in words</label>
                  <input
                    type='text'
                    name='currency'
                    value={currency}
                    onChange={handleChange}
                    className='user-input-alter user-input'
                  />
                </div>
                <div className='country--field'>
                  <label>Time Differnce</label>
                  <input
                    type='text'
                    name='timeZone'
                    value={timeZone}
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
                  <textarea
                    rows='3'
                    name='bestPlaces'
                    value={bestPlaces}
                    onChange={handleChange}
                    className='user-input-alter user-input'
                  />
                </div>
              </div>
            </div>
          </form>
        </ModalBody>
        <ModalFooter>
          {!edit ? (
            <Button
              style={{ backgroundColor: '#1B98F5' }}
              onClick={addCountries}>
              Add
            </Button>
          ) : (
            <Button
              style={{ backgroundColor: '#4DD637' }}
              onClick={updateCountry}>
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
            <h3 style={{ color: '#666666' }}>Country Details</h3>
          </div>
          <div
            className='add-booking'
            onClick={() => {
              setEdit(false);
              openModal();
            }}>
            <h6> + Add Country</h6>
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
            <h5>Country Name</h5>
            <h5>Ideal Days</h5>
            <h5>Visa On Arrival</h5>
            {/* <h5>Major Cities</h5> */}

            <h5>Action</h5>
          </div>
          {loading ? (
            <div className='req-lo'>
              Fetching Data <Ellipsis color='#0057ff' />
            </div>
          ) : (
            <>
              {country.length !== 0 ? (
                <>
                  {country
                    .slice(currentPage * pageSize, (currentPage + 1) * pageSize)
                    .map((t, i) => {
                      return (
                        <div className='table-heading-row request' key={i}>
                          <h5>{i + 1}</h5>
                          <h5>{t.countryName}</h5>
                          <h5>{t.idealDays}</h5>
                          <h5>{t.visa.onArrival}</h5>
                          {/* <h5>{t.bestPlaces}</h5> */}
                          <h5>
                            <BiEditAlt
                              color='blue'
                              style={{ fontSize: 20, cursor: 'pointer' }}
                              onClick={() => {
                                getCountriesById(t._id);
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
                                onClick={() => deleteCountry(t._id)}
                              />
                            </span>
                          </h5>
                        </div>
                      );
                    })}
                </>
              ) : (
                <div className='req-lo'>No CIty found</div>
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

export default Countries;
