import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Modal, Button, ModalHeader, ModalFooter, ModalBody } from 'reactstrap';
import './Request.css';
import { API } from './../backend';
import axios from 'axios';
import './Tours.css';
import { BiEditAlt } from 'react-icons/bi';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useToasts } from 'react-toast-notifications';
import { GrFormView } from 'react-icons/gr';
import { Ellipsis } from 'react-spinners-css';

const Tours = () => {
  const { addToast } = useToasts();
  const [modal, setModal] = useState(false);
  const closeModal = () => setModal(false);
  const openModal = () => setModal(true);
  const [edit, setEdit] = useState(false);
  const [tours, setTour] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageSize, setPageSize] = useState(100);
  let pagesCount = Math.ceil(tours.length / pageSize);
  const [currentPage, setCurrentpage] = useState(0);
  const [editId, setEditId] = useState('');
  const [country, setCountries] = useState([]);
  const [selectCountry, setSelectCountry] = useState('Indonesia');
  const [selectCity, setSelectCity] = useState('');
  const [cityname, setCityName] = useState([]);

  console.log('tours', tours);
  const [tourFields, setTourFields] = useState({
    countryName: '',
    cityName: '',
    tourName: '',
    aboutTour: '',
    imageUrl: '',
    adult: '',
    children: '',
    ratings: '',
    reviews: '',
    inclusion: '',
    itinerary: '',
    pickUpPoint: '',
    tourDuration: '',
    tourCategory: '',
    tourType: '',
    idealType: '',
    tourPreferance: '',
    additionalInformation: '',
    referanceLink: '',
    trending: '',
    pickUpAvailableOn: '',
    pickUpTime: '',
    dropTime: '',
    tourVideoSrc: '',
    videoAuthor: '',
  });

  const {
    countryName,
    cityName,
    tourName,
    aboutTour,
    imageUrl,
    adult,
    children,
    ratings,
    reviews,
    inclusion,
    itinerary,
    pickUpPoint,
    tourDuration,
    tourCategory,
    tourType,
    idealType,
    tourPreferance,
    additionalInformation,
    referanceLink,
    trending,
    pickUpAvailableOn,
    pickUpTime,
    dropTime,
    tourVideoSrc,
    videoAuthor,
  } = tourFields;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTourFields({
      ...tourFields,
      [name]: value,
    });
  };

  const handleClick = (e, index) => {
    e.preventDefault();
    setCurrentpage(index);
  };

  const getTours = async () => {
    try {
      setLoading(true);
      const tourResponse = await axios.get(
        `${API}/tour/countryname/${selectCountry}`
      );
      setTour(tourResponse.data);
      setLoading(false);
    } catch (err) {
      console.log(err, 'err');
    }
  };

  const getCountries = async () => {
    try {
      const countryResponse = await axios.get(`${API}/country`);
      setCountries(countryResponse.data);
    } catch (err) {
      console.log(err, 'err');
    }
  };

  const addtours = async () => {
    try {
      await axios
        .post(`${API}/tour`, {
          cityName: cityName,
          tourName: tourName,
          aboutTour: aboutTour,
          imageUrl: imageUrl,
          tourCost: {
            adult: adult,
            children: children,
          },
          ratings: ratings,
          reviews: reviews,
          inclusion: inclusion,
          itinerary: itinerary,
          pickUpPoint: pickUpPoint,
          tourDuration: tourDuration,
          tourType: tourType,
          idealType: idealType,
          tourCategory: tourCategory,
          additionalInformation: additionalInformation,
          tourPreferance: tourPreferance,
          trending: trending,
          referanceLink: referanceLink,
          countryName: countryName,
          pickUpAvailableOn: pickUpAvailableOn,
          pickUpTime: pickUpTime,
          dropTime: dropTime,
          tourVideoSrc: tourVideoSrc,
          videoAuthor: videoAuthor,
        })
        .then((data) => {
          addToast('Added Successfully', {
            appearance: 'success',
          });
          setTourFields({
            countryName: '',
            cityName: '',
            tourName: '',
            aboutTour: '',
            imageUrl: '',
            adult: '',
            children: '',
            ratings: '',
            reviews: '',
            inclusion: '',
            itinerary: '',
            pickUpPoint: '',
            tourDuration: '',
            tourCategory: '',
            tourType: '',
            idealType: '',
            tourPreferance: '',
            additionalInformation: '',
            referanceLink: '',
            trending: '',
            pickUpAvailableOn: '',
            pickUpTime: '',
            dropTime: '',
            tourVideoSrc: '',
            videoAuthor: '',
          });
          closeModal();
        })
        .catch((err) => console.log('err', err));
      setModal(false);
    } catch (err) {
      console.log(err, 'err');
    }
  };

  const getTourById = async (id) => {
    setEdit(true);
    await axios
      .get(`${API}/tour/edit/${id}`)
      .then((data) => {
        const tourdata = data.data;
        setEditId(tourdata._id);
        setTourFields({
          cityName: tourdata.cityName,
          tourName: tourdata.tourName,
          aboutTour: tourdata.aboutTour,
          imageUrl: tourdata.imageUrl,
          adult: tourdata.tourCost.adult,
          children: tourdata.tourCost.children,
          ratings: tourdata.ratings,
          reviews: tourdata.reviews,
          inclusion: tourdata.inclusion,
          itinerary: tourdata.itinerary,
          pickUpPoint: tourdata.pickUpPoint,
          tourDuration: tourdata.tourDuration,
          tourType: tourdata.tourType,
          idealType: tourdata.idealType,
          tourCategory: tourdata.tourCategory,
          additionalInformation: tourdata.additionalInformation,
          tourPreferance: tourdata.tourPreferance,
          trending: tourdata.trending,
          referanceLink: tourdata.referanceLink,
          countryName: tourdata.countryName,
          pickUpAvailableOn: tourdata.pickUpAvailableOn,
          pickUpTime: tourdata.pickUpTime,
          dropTime: tourdata.dropTime,
          tourVideoSrc: tourdata.tourVideoSrc,
          videoAuthor: tourdata.videoAuthor,
        });
        openModal();
      })
      .catch((err) => console.log('err', err));
  };

  const updateTour = async () => {
    await axios
      .post(`${API}/tour/edit/${editId}`, {
        cityName: cityName,
        tourName: tourName,
        aboutTour: aboutTour,
        imageUrl: imageUrl,
        adult: adult,
        children: children,
        ratings: ratings,
        reviews: reviews,
        inclusion: inclusion,
        itinerary: itinerary,
        pickUpPoint: pickUpPoint,
        tourDuration: tourDuration,
        tourType: tourType,
        idealType: idealType,
        tourCategory: tourCategory,
        additionalInformation: additionalInformation,
        tourPreferance: tourPreferance,
        trending: trending,
        referanceLink: referanceLink,
        countryName: countryName,
        pickUpAvailableOn: pickUpAvailableOn,
        pickUpTime: pickUpTime,
        dropTime: dropTime,
        tourVideoSrc: tourVideoSrc,
        videoAuthor: videoAuthor,
      })
      .then((data) => {
        setEditId('');
        setTour(data.data);

        addToast('Updated Successfully', {
          appearance: 'success',
        });
        setTourFields({
          countryName: '',
          cityName: '',
          tourName: '',
          aboutTour: '',
          imageUrl: '',
          adult: '',
          children: '',
          ratings: '',
          reviews: '',
          inclusion: '',
          itinerary: '',
          pickUpPoint: '',
          tourDuration: '',
          tourCategory: '',
          tourType: '',
          idealType: '',
          tourPreferance: '',
          additionalInformation: '',
          referanceLink: '',
          trending: '',
          pickUpAvailableOn: '',
          pickUpTime: '',
          dropTime: '',
          tourVideoSrc: '',
          videoAuthor: '',
        });
        closeModal();
      })
      .catch((err) => console.log('err', err));
  };

  // const deleteTour = async (id) => {
  //   try {
  //     await axios
  //       .post(`${API}/tour/delete/${id}`)
  //       .then((data) => {
  //         addToast("Deleted Successfully", {
  //           appearance: "success",
  //         });
  //       })
  //       .catch((err) =>
  //         addToast(err, {
  //           appearance: "success",
  //         })
  //       );
  //   } catch (err) {
  //     console.log("err", err);
  //   }
  // };

  const filterRequest = () => {
    if (selectCountry !== '' && selectCity === '') {
      const countryFilter = tours.filter((c) => {
        return c.countryName === selectCountry;
      });
      return countryFilter;
    } else if (selectCity !== '') {
      const cityFilter = tours.filter((ct) => {
        return ct.cityName === selectCity;
      });
      return cityFilter;
    } else {
      return tours;
    }
  };

  const getCities = async (countryname) => {
    try {
      const cityResponse = await axios.get(
        `${API}/city/countryname/${countryname}`
      );
      setCityName(cityResponse.data);
    } catch (err) {
      console.log(err, 'err');
    }
  };

  useEffect(() => {
    getTours();
  }, [selectCountry]);
  useEffect(() => {
    getCountries();
    getCities();
  }, []);

  return (
    <>
      <Modal isOpen={modal} contentClassName='tour--request'>
        <ModalHeader toggle={closeModal}>Tour Details</ModalHeader>
        <ModalBody>
          <form>
            <div className='tour--field-flex'>
              <div>
                <div className='tour--field'>
                  <label>Country Name</label>
                  <select
                    className='user-input-alter user-input'
                    name='countryName'
                    onChange={(e) => {
                      handleChange(e);
                      getCities(e.target.value);
                    }}
                    value={countryName}>
                    {country.map((c, index) => (
                      <>
                        <option key={index} disabled selected hidden></option>
                        <option>{c.countryName}</option>
                      </>
                    ))}
                  </select>
                </div>
                <div className='tour--field'>
                  <label>City Name</label>
                  <select
                    name='cityName'
                    value={cityName}
                    onChange={handleChange}
                    className='user-input-alter user-input'>
                    {cityname.map((tour, index) => (
                      <>
                        <option key={index} value='' disabled selected hidden>
                          Select City
                        </option>
                        <option value={tour.cityName}>{tour.cityName}</option>
                      </>
                    ))}
                  </select>
                </div>
                <div className='tour--field'>
                  <label>Tour Name</label>
                  <input
                    type='text'
                    name='tourName'
                    value={tourName}
                    onChange={handleChange}
                    className='user-input-alter user-input'
                  />
                </div>
                <div className='tour--field'>
                  <label>About Tour</label>
                  <textarea
                    rows='5'
                    name='aboutTour'
                    value={aboutTour}
                    onChange={handleChange}
                    className='user-input-alter user-input'
                  />
                </div>
                <div className='tour--field'>
                  <label>Image Url</label>
                  <input
                    type='text'
                    name='imageUrl'
                    value={imageUrl}
                    onChange={handleChange}
                    className='user-input-alter user-input'
                  />
                </div>
                <div className='tour--field'>
                  <label>Tour Video Source</label>
                  <input
                    type='text'
                    name='tourVideoSrc'
                    value={tourVideoSrc}
                    onChange={handleChange}
                    className='user-input-alter user-input'
                  />
                </div>
                <div className='tour--field'>
                  <label>Video Author</label>
                  <input
                    type='text'
                    name='videoAuthor'
                    value={videoAuthor}
                    onChange={handleChange}
                    className='user-input-alter user-input'
                  />
                </div>
                <div className='tour--field'>
                  <label>Tour Category</label>
                  <input
                    type='text'
                    name='tourCategory'
                    value={tourCategory}
                    onChange={handleChange}
                    className='user-input-alter user-input'
                  />
                </div>
              </div>
              <div>
                <div className='tour--field'>
                  <label>Ideal For..</label>
                  <input
                    type='text'
                    name='idealType'
                    value={idealType}
                    onChange={handleChange}
                    className='user-input-alter user-input'
                  />
                </div>
                <div className='tour--field'>
                  <label>Tour Type</label>
                  <select
                    name='tourType'
                    value={tourType}
                    onChange={handleChange}
                    className='user-input-alter user-input'>
                    <option value='' disabled selected hidden></option>
                    <option value='Full Day Tour'>Full Day Tour</option>
                    <option value='Half Day Tour'>Half Day Tour</option>
                    <option value='Night Tour'>Night Tour</option>
                  </select>
                </div>
                <div className='tour--field'>
                  <label>Tour Preference</label>
                  <select
                    name='tourPreferance'
                    value={tourPreferance}
                    onChange={handleChange}
                    className='user-input-alter user-input'>
                    <option value='' disabled selected hidden></option>
                    <option value='Private Tour'>Private Tour</option>
                    <option value='SIC Basis'>SIC Basis</option>
                    <option value='On Your Own'>On Your Own</option>
                  </select>
                </div>
                <div className='tour--field'>
                  <label>Tour cost for Adult</label>
                  <input
                    type='text'
                    name='adult'
                    value={adult}
                    onChange={handleChange}
                    className='user-input-alter user-input'
                  />
                </div>
                <div className='tour--field'>
                  <label>Tour cost for Children</label>
                  <input
                    type='text'
                    name='children'
                    value={children}
                    onChange={handleChange}
                    className='user-input-alter user-input'
                  />
                </div>
                <div className='tour--field'>
                  <label>Fly Duration</label>
                  <select
                    name='tourDuration'
                    value={tourDuration}
                    onChange={handleChange}
                    className='user-input-alter user-input'>
                    <option value='' disabled selected hidden></option>
                    <option value='1-2 hours'>1-2 hours</option>
                    <option value='2-3 hours'>2-3 hours</option>
                    <option value='3-4 hours'>3-4 hours</option>
                    <option value='4-5 hours'>4-5 hours</option>
                    <option value='5-6 hours'>5-6 hours</option>
                    <option value='6-7 hours'>6-7 hours</option>
                    <option value='7-8 hours'>7-8 hours</option>
                    <option value='8-10 hours'>8-10 hours</option>
                    <option value='10-12 hours'>10-12 hours</option>
                  </select>
                </div>
                <div className='tour--field'>
                  <label>Tour Ratings</label>
                  <input
                    type='text'
                    name='ratings'
                    value={ratings}
                    onChange={handleChange}
                    className='user-input-alter user-input'
                  />
                </div>
                <div className='tour--field'>
                  <label>Tour Reviews</label>
                  <input
                    type='text'
                    name='reviews'
                    value={reviews}
                    onChange={handleChange}
                    className='user-input-alter user-input'
                  />
                </div>
                <div className='tour--field'>
                  <label>Pickup Type</label>
                  <input
                    type='text'
                    name='pickUpPoint'
                    value={pickUpPoint}
                    onChange={handleChange}
                    className='user-input-alter user-input'
                  />
                </div>
              </div>
              <div>
                <div className='tour--fieldd'>
                  <label>Pick Up Available On</label>
                  <input
                    type='text'
                    name='pickUpAvailableOn'
                    value={pickUpAvailableOn}
                    onChange={handleChange}
                    className='user-input-alter user-input'
                  />
                </div>
                <div className='tour--fieldd'>
                  <label>Pick Up Time</label>
                  <input
                    type='text'
                    name='pickUpTime'
                    value={pickUpTime}
                    onChange={handleChange}
                    className='user-input-alter user-input'
                  />
                </div>
                <div className='tour--fieldd'>
                  <label>Drop Time</label>
                  <input
                    type='text'
                    name='dropTime'
                    value={dropTime}
                    onChange={handleChange}
                    className='user-input-alter user-input'
                  />
                </div>
                <div className='tour--fieldd'>
                  <label>Trending</label>
                  <select
                    name='trending'
                    value={trending}
                    onChange={handleChange}
                    className='user-input-alter user-input'>
                    <option value='' disabled selected hidden></option>
                    <option value='Yes'>Yes</option>
                    <option value='No'>No</option>
                  </select>
                </div>
                <div className='tour--fieldd'>
                  <label>Reference Link</label>
                  <input
                    type='text'
                    name='referanceLink'
                    value={referanceLink}
                    onChange={handleChange}
                    className='user-input-alter user-input'
                  />
                </div>
                <div className='tour--field'>
                  <label>Additional Information</label>
                  <div style={{ width: 500 }}>
                    <CKEditor
                      editor={ClassicEditor}
                      data={additionalInformation}
                      onChange={(event, editor) => {
                        const data = editor.getData();
                        setTourFields({
                          ...tourFields,
                          additionalInformation: data,
                        });
                      }}
                    />
                  </div>
                </div>
                <div className='tour--field'>
                  <label>Tour Itinerary</label>
                  <div style={{ width: 500 }}>
                    <CKEditor
                      editor={ClassicEditor}
                      data={itinerary}
                      onChange={(event, editor) => {
                        const data = editor.getData();
                        setTourFields({
                          ...tourFields,
                          itinerary: data,
                        });
                      }}
                    />
                  </div>
                </div>
                <div className='tour--field'>
                  <label>Tour Inclusions</label>
                  <div style={{ width: 500 }}>
                    <CKEditor
                      editor={ClassicEditor}
                      data={inclusion}
                      onChange={(event, editor) => {
                        const data = editor.getData();
                        setTourFields({
                          ...tourFields,
                          inclusion: data,
                        });
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </form>
        </ModalBody>
        <ModalFooter>
          {!edit ? (
            <Button style={{ backgroundColor: '#1B98F5' }} onClick={addtours}>
              Add
            </Button>
          ) : (
            <Button style={{ backgroundColor: '#4DD637' }} onClick={updateTour}>
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
            <h3 style={{ color: '#666666' }}>Tours Details</h3>
          </div>
          <div
            className='add-booking'
            onClick={() => {
              setEdit(false);
              openModal();
            }}>
            <h6> + Add Tour</h6>
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
            <label>Search by country : </label>
            <select
              onChange={(e) => {
                getCities(e.target.value);
                setSelectCity('');
                setSelectCountry(e.target.value);
              }}
              value={selectCountry}>
              {country.map((c, index) => (
                <>
                  <option key={index} disabled selected hidden></option>
                  <option>{c.countryName}</option>
                </>
              ))}
            </select>
          </div>
          <div className='month'>
            <label> Search by city :</label>
            {selectCountry === '' ? (
              <h4>--Select One Country--</h4>
            ) : (
              <select
                onChange={(e) => setSelectCity(e.target.value)}
                value={selectCity}>
                {cityname.map((c, index) => (
                  <>
                    <option key={index} disabled selected hidden>
                      Select city
                    </option>
                    <option>{c.cityName}</option>
                  </>
                ))}
              </select>
            )}
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
            <h5>Tour Name</h5>
            {/* <h5>Tour Duration</h5> */}
            <h5>Action</h5>
          </div>
          {loading ? (
            <div className='req-lo'>
              Fetching Data <Ellipsis color='#0057ff' />
            </div>
          ) : (
            <>
              {tours.length !== 0 ? (
                <>
                  {filterRequest()
                    .slice(currentPage * pageSize, (currentPage + 1) * pageSize)
                    .map((t, i) => {
                      return (
                        <div className='table-heading-row request' key={i}>
                          <h5>{i + 1}</h5>
                          <h5>{t.countryName}</h5>
                          <h5>{t.cityName}</h5>
                          <h5>{t.tourName}</h5>
                          {/* <h5>{t.tourDuration}</h5> */}
                          <h5>
                            <BiEditAlt
                              color='blue'
                              style={{ fontSize: 20, cursor: 'pointer' }}
                              onClick={() => getTourById(t._id)}
                            />
                            {/* <span>
                                <RiDeleteBin2Fill
                                  color="red"
                                  style={{
                                    paddingLeft: 8,
                                    fontSize: 24,
                                    cursor: "pointer",
                                  }}
                                  onClick={() => deleteTour(t._id)}
                                />
                              </span> */}
                            <span>
                              <Link
                                className='plink'
                                target='_blank'
                                to={{
                                  pathname: `/tourdetails/${t.countryName}/${t.cityName}/${t.tourName}/${t._id}`,
                                }}>
                                <GrFormView
                                  style={{
                                    paddingLeft: 8,
                                    fontSize: 26,
                                    cursor: 'pointer',
                                  }}
                                />
                              </Link>
                            </span>
                          </h5>
                        </div>
                      );
                    })}
                </>
              ) : (
                <div className='req-lo'>No Tours found</div>
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

export default Tours;
