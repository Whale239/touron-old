import React, { useState, useEffect } from 'react';
// import { Link } from "react-router-dom";
import { Modal, Button, ModalHeader, ModalFooter, ModalBody } from 'reactstrap';
import './Request.css';
import { Ellipsis } from 'react-spinners-css';
import { API } from './../backend';
import axios from 'axios';
import './City.css';
import { BiEditAlt } from 'react-icons/bi';
import { RiDeleteBin2Fill } from 'react-icons/ri';
import { useToasts } from 'react-toast-notifications';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import parse from 'html-react-parser';

const City = () => {
  const [country, setCountries] = useState([]);
  const [selectCountry, setSelectCountry] = useState('');
  const { addToast } = useToasts();
  const [modal, setModal] = useState(false);
  const closeModal = () => setModal(false);
  const openModal = () => setModal(true);
  const [edit, setEdit] = useState(false);
  const [city, setCities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentpage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  let pagesCount = Math.ceil(city.length / pageSize);
  const [editId, setEditId] = useState('');

  const [cityFields, setCityFields] = useState({
    countryName: '',
    cityName: '',
    aboutCity: '',
    imageUrl: '',
    weather: '',
    latitude: '',
    longitude: '',
    travelDuration: '',
    idealDays: '',
    famousPlacesToVisit: '',
    airportType: '',
    airportName: '',
    foodJoints: '',
    cityTips: '',
    thingsToPack: '',
    documentsRequired: '',
  });

  const {
    countryName,
    cityName,
    aboutCity,
    imageUrl,
    weather,
    latitude,
    longitude,
    travelDuration,
    idealDays,
    famousPlacesToVisit,
    airportType,
    airportName,
    foodJoints,
    cityTips,
    thingsToPack,
    documentsRequired,
  } = cityFields;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCityFields({
      ...cityFields,
      [name]: value,
    });
  };

  const handleClick = (e, index) => {
    e.preventDefault();
    setCurrentpage(index);
  };

  //   const getCities = async () => {
  //     try {
  //       setLoading(true);
  //       const cityResponse = await axios.get(`${API}/city`);
  //       setCities(cityResponse.data);
  //       setLoading(false);
  //     } catch (err) {
  //       console.log(err, "err");
  //     }
  //   };

  useEffect(() => {
    setLoading(true);
    const source = axios.CancelToken.source();
    axios
      .get(`${API}/city`, {
        cancelToken: source.token,
      })
      .then((res) => {
        setCities(res.data);
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

  const addCities = async () => {
    try {
      await axios.post(`${API}/city`, {
        countryName: countryName,
        cityName: cityName,
        aboutCity: aboutCity,
        imageUrl: imageUrl,
        weather: weather,
        coordinates: {
          latitude: latitude,
          longitude: longitude,
        },
        travelDuration: travelDuration,
        idealDays: idealDays,
        famousPlacesToVisit: famousPlacesToVisit,
        airportType: airportType,
        airportName: airportName,
        foodJoints: foodJoints,
        cityTips: cityTips,
        thingsToPack: thingsToPack,
        documentsRequired: documentsRequired,
      });
      setModal(false);
    } catch (err) {
      console.log(err, 'err');
    }
  };

  const getCitiesById = async (id) => {
    setEdit(true);
    await axios
      .get(`${API}/city/edit/${id}`)
      .then((data) => {
        const citydata = data.data;
        setEditId(citydata._id);
        setCityFields({
          countryName: citydata.countryName,
          cityName: citydata.cityName,
          aboutCity: citydata.aboutCity,
          imageUrl: citydata.imageUrl,
          weather: citydata.weather,
          latitude: citydata.coordinates.latitude,
          longitude: citydata.coordinates.longitude,
          travelDuration: citydata.travelDuration,
          idealDays: citydata.idealDays,
          famousPlacesToVisit: citydata.famousPlacesToVisit,
          airportType: citydata.airportType,
          airportName: citydata.airportName,
          foodJoints: citydata.foodJoints,
          cityTips: citydata.cityTips,
          thingsToPack: citydata.thingsToPack,
          documentsRequired: citydata.documentsRequired,
        });
        openModal();
      })
      .catch((err) => console.log('err', err));
  };

  const updateCity = async () => {
    await axios
      .post(`${API}/city/edit/${editId}`, {
        countryName: countryName,
        cityName: cityName,
        aboutCity: aboutCity,
        imageUrl: imageUrl,
        weather: weather,
        latitude: latitude,
        longitude: longitude,
        travelDuration: travelDuration,
        idealDays: idealDays,
        famousPlacesToVisit: famousPlacesToVisit,
        airportType: airportType,
        airportName: airportName,
        foodJoints: foodJoints,
        cityTips: cityTips,
        thingsToPack: thingsToPack,
        documentsRequired: documentsRequired,
      })
      .then((data) => {
        setCityFields({
          cityName: '',
          countryName: '',
          aboutCity: '',
          imageUrl: '',
          weather: '',
          latitude: '',
          longitude: '',
          travelDuration: '',
          idealDays: '',
          famousPlacesToVisit: '',
          airportType: '',
          airportName: '',
          foodJoints: '',
          cityTips: '',
          thingsToPack: '',
          documentsRequired: '',
        });
        setCities(data.data.cityData);
        setEditId('');
        addToast('Updated Successfully', {
          appearance: 'success',
        });
        closeModal();
      })
      .catch((err) => console.log('err', err));
  };

  const deleteCity = async (id) => {
    try {
      await axios
        .post(`${API}/city/delete/${id}`)
        .then((data) => {
          addToast('Deleted Successfully', {
            appearance: 'success',
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

  //   const getCountries = async () => {
  //     try {
  //       const countryResponse = await axios.get(`${API}/country`);
  //       setCountries(countryResponse.data);
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

  const onCountryCityClick = () => {
    if (selectCountry === '') return city;

    const filter = city.filter((c) => {
      return c.countryName === selectCountry;
    });

    return filter;
  };

  //   useEffect(() => {
  //     getCities();
  //   }, []);

  //   useEffect(() => {
  //     getCountries();
  //   }, []);

  return (
    <>
      <Modal isOpen={modal} contentClassName='tour--request'>
        <ModalHeader toggle={closeModal}>City Details</ModalHeader>
        <ModalBody>
          <form>
            <div className='city--fiels-flex'>
              <div className='city--fiels-flex1'>
                <div className='city--field'>
                  <label>Country Name</label>
                  <select
                    // style={{ borderRadius: 10, width: 200 }}
                    onChange={handleChange}
                    value={countryName}
                    className='user-input-alter user-input'
                    name='countryName'>
                    {country.map((c, index) => (
                      <>
                        <option key={index} disabled selected hidden></option>
                        <option>{c.countryName}</option>
                      </>
                    ))}
                  </select>
                </div>
                <div className='city--field'>
                  <label>City Name</label>
                  <input
                    type='text'
                    name='cityName'
                    value={cityName}
                    onChange={handleChange}
                    className='user-input-alter user-input'
                  />
                </div>
                <div className='city--field'>
                  <label>About city</label>
                  <textarea
                    rows='3'
                    name='aboutCity'
                    value={aboutCity}
                    onChange={handleChange}
                    className='user-input-alter user-input'
                  />
                </div>
                <div className='city--field'>
                  <label>Image Url</label>
                  <input
                    type='text'
                    name='imageUrl'
                    value={imageUrl}
                    onChange={handleChange}
                    className='user-input-alter user-input'
                  />
                </div>
                <div className='city--field'>
                  <label>Ideal days to travel</label>
                  <select
                    name='idealDays'
                    value={idealDays}
                    onChange={handleChange}
                    className='user-input-alter user-input'>
                    <option value='' disabled selected hidden></option>
                    <option value='3-4 days'>3-4 days</option>
                    <option value='4-5 days'>4-5 days</option>
                    <option value='5-6 days'>5-6 days</option>
                    <option value='6-7 days'>6-7 days</option>
                    <option value='7-8 days'>7-8 days</option>
                    <option value='8-10 days'>8-10 days</option>
                  </select>
                </div>
                <div className='city--field'>
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
              <div className='city--fiels-flex2'>
                <div className='city--field'>
                  <label>Fly Duration</label>
                  <select
                    name='travelDuration'
                    value={travelDuration}
                    onChange={handleChange}
                    className='user-input-alter user-input'>
                    <option value='' disabled selected hidden></option>
                    <option value='2-4 hours'>2-4 hours</option>
                    <option value='4-6 hours'>4-6 hours</option>
                    <option value='6-8 hours'>6-8 hours</option>
                    <option value='8-10 hours'>8-10 hours</option>
                    <option value='10-12 hours'>10-12 hours</option>
                    <option value='12-14 hours'>12-14 hours</option>
                    <option value='14-16 hours'>14-16 hours</option>
                  </select>
                </div>
                <div className='city--field'>
                  <label>Latitude</label>
                  <input
                    type='text'
                    name='latitude'
                    value={latitude}
                    onChange={handleChange}
                    className='user-input-alter user-input'
                  />
                </div>
                <div className='city--field'>
                  <label>Longitude</label>
                  <input
                    type='text'
                    name='longitude'
                    value={longitude}
                    onChange={handleChange}
                    className='user-input-alter user-input'
                  />
                </div>
                <div className='city--field'>
                  <label>Famous Places To Visit</label>
                  <input
                    type='text'
                    name='famousPlacesToVisit'
                    value={famousPlacesToVisit}
                    onChange={handleChange}
                    className='user-input-alter user-input'
                  />
                </div>
                <div className='city--field'>
                  <label>Airport</label>
                  <select
                    name='airportType'
                    value={airportType}
                    onChange={handleChange}
                    className='user-input-alter user-input'>
                    <option value='' disabled selected hidden></option>
                    <option value='Native Airport'>Native Airport</option>
                    <option value='Nearest Airport'>Nearest Airport</option>
                  </select>
                </div>
                <div className='city--field'>
                  <label>Airport Name</label>
                  <input
                    type='text'
                    name='airportName'
                    value={airportName}
                    onChange={handleChange}
                    className='user-input-alter user-input'
                  />
                </div>
              </div>
              <div className='city--fiels-flex2'>
                <div className='city--field'>
                  <label>Food Joints</label>
                  <CKEditor
                    editor={ClassicEditor}
                    data={foodJoints}
                    onChange={(event, editor) => {
                      const data = editor.getData();
                      setCityFields({
                        ...cityFields,
                        foodJoints: data,
                      });
                    }}
                  />
                </div>
                <div className='city--field'>
                  <label>Things To Pack</label>
                  <CKEditor
                    editor={ClassicEditor}
                    data={thingsToPack}
                    onChange={(event, editor) => {
                      const data = editor.getData();
                      setCityFields({
                        ...cityFields,
                        thingsToPack: data,
                      });
                    }}
                  />
                </div>
                <div className='city--field'>
                  <label>Tips</label>
                  <CKEditor
                    editor={ClassicEditor}
                    data={cityTips}
                    onChange={(event, editor) => {
                      const data = editor.getData();
                      setCityFields({
                        ...cityFields,
                        cityTips: data,
                      });
                    }}
                  />
                </div>
                <div className='city--field'>
                  <label>Documents Required</label>
                  <CKEditor
                    editor={ClassicEditor}
                    data={documentsRequired}
                    onChange={(event, editor) => {
                      const data = editor.getData();
                      setCityFields({
                        ...cityFields,
                        documentsRequired: data,
                      });
                    }}
                  />
                </div>
              </div>
            </div>
          </form>
        </ModalBody>
        <ModalFooter>
          {!edit ? (
            <Button style={{ backgroundColor: '#1B98F5' }} onClick={addCities}>
              Add
            </Button>
          ) : (
            <Button style={{ backgroundColor: '#4DD637' }} onClick={updateCity}>
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
            <h3 style={{ color: '#666666' }}>City Details</h3>
          </div>
          <div
            className='add-booking'
            onClick={() => {
              setEdit(false);
              openModal();
            }}>
            <h6> + Add City</h6>
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
              <option value='100'>100</option>
            </select>
          </div>
          <div className='month'>
            <label>Search by Country : </label>
            <select
              onChange={(e) => setSelectCountry(e.target.value)}
              value={selectCountry}>
              {country.map((c, index) => (
                <>
                  <option key={index} disabled selected hidden></option>
                  <option>{c.countryName}</option>
                </>
              ))}
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
            <h5>City Name</h5>
            <h5>Food Joints</h5>
            <h5>Tips</h5>
            <h5>Things to Pack</h5>
            <h5>Docs Required</h5>
            <h5>Action</h5>
          </div>
          {loading ? (
            <div className='req-lo'>
              Fetching Data <Ellipsis color='#0057ff' />
            </div>
          ) : (
            <>
              {city.length !== 0 ? (
                <>
                  {onCountryCityClick()
                    .slice(currentPage * pageSize, (currentPage + 1) * pageSize)
                    .map((t, i) => {
                      return (
                        <div className='table-heading-row request' key={i}>
                          <h5>{i + 1}</h5>
                          <h5>{t.countryName}</h5>
                          <h5>{t.cityName}</h5>
                          {/* <td>{t.aboutCity}</td> */}
                          {Object.keys(t).includes('foodJoints') && (
                            <h5>{parse(t.foodJoints)}</h5>
                          )}
                          {Object.keys(t).includes('cityTips') && (
                            <h5>{parse(t.cityTips)}</h5>
                          )}
                          {Object.keys(t).includes('thingsToPack') && (
                            <h5>{parse(t.thingsToPack)}</h5>
                          )}
                          {Object.keys(t).includes('documentsRequired') && (
                            <h5>{parse(t.documentsRequired)}</h5>
                          )}
                          <h5>
                            <BiEditAlt
                              color='blue'
                              style={{ fontSize: 20, cursor: 'pointer' }}
                              onClick={() => getCitiesById(t._id)}
                            />
                            <span>
                              <RiDeleteBin2Fill
                                color='red'
                                style={{
                                  paddingLeft: 8,
                                  fontSize: 24,
                                  cursor: 'pointer',
                                }}
                                onClick={() => deleteCity(t._id)}
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

export default City;
