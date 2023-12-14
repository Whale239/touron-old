import React, { useState, useEffect } from 'react';
import { Modal, Button, ModalHeader, ModalFooter, ModalBody } from 'reactstrap';
import './Request.css';
import { Ellipsis } from 'react-spinners-css';
import { API } from './../backend';
import axios from 'axios';
import './City.css';
import { BiEditAlt } from 'react-icons/bi';
import { RiDeleteBin2Fill } from 'react-icons/ri';
import { useToasts } from 'react-toast-notifications';

const DomesticCity = () => {
  const [state, setState] = useState([]);
  const [selectState, setSelectState] = useState('');
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
    countryName: 'India',
    cityName: '',
    stateName: '',
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
    suggestedCombinations: '',
    foodJoints: '',
    cityTips: '',
    thingsToPack: '',
    documentsRequired: '',
  });

  const {
    countryName,
    stateName,
    suggestedCombinations,
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
  //       const cityResponse = await axios.get(`${API}/statecity`);
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
      .get(`${API}/statecity`, {
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
      await axios
        .post(`${API}/statecity`, {
          countryName: countryName,
          suggestedCombinations: suggestedCombinations,
          stateName: stateName,
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
        })
        .then((data) => {
          setEditId('');
          addToast('Added Successfully', {
            appearance: 'success',
          });
          setCityFields({
            countryName: 'India',
            cityName: '',
            stateName: '',
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
            suggestedCombinations: '',
          });
          closeModal();
        })
        .catch((err) => console.log('err', err));
      setModal(false);
    } catch (err) {
      console.log(err, 'err');
    }
  };

  const getCitiesById = async (id) => {
    setEdit(true);
    await axios
      .get(`${API}/statecity/edit/${id}`)
      .then((data) => {
        const citydata = data.data;
        setEditId(citydata._id);
        setCityFields({
          countryName: citydata.countryName,
          suggestedCombinations: citydata.suggestedCombinations,

          stateName: citydata.stateName,
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
    const d = {
      suggestedCombinations: suggestedCombinations,
      countryName: countryName,
      stateName: stateName,
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
    };
    await axios
      .post(`${API}/statecity/edit/${editId}`, d)
      .then((data) => {
        setEditId('');
        setCities(data.data);
        addToast('Updated Successfully', {
          appearance: 'success',
        });
        setCityFields({
          countryName: 'India',
          suggestedCombinations: '',
          cityName: '',
          stateName: '',
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
        closeModal();
      })
      .catch((err) => console.log('err', err));
  };

  const deleteCity = async (id) => {
    try {
      await axios
        .post(`${API}/statecity/delete/${id}`)
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

  //   const getState = async () => {
  //     try {
  //       const stateResponse = await axios.get(`${API}/state`);
  //       setState(stateResponse.data);
  //     } catch (err) {
  //       console.log(err, 'err');
  //     }
  //   };

  useEffect(() => {
    const source = axios.CancelToken.source();
    axios
      .get(`${API}/state`, {
        cancelToken: source.token,
      })
      .then((res) => {
        setState(res.data);
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
    if (selectState === '') return city;

    const filter = city.filter((c) => {
      return c.stateName === selectState;
    });

    return filter;
  };

  //   useEffect(() => {
  //     getCities();
  //   }, []);

  //   useEffect(() => {
  //     getState();
  //   }, []);

  return (
    <>
      <Modal isOpen={modal} contentClassName='tour--request'>
        <ModalHeader toggle={closeModal}>Domestic City Details</ModalHeader>
        <ModalBody>
          <form>
            <div className='city--fiels-flex'>
              <div className='city--fiels-flex1'>
                <div className='city--field'>
                  <label>Country Name</label>
                  <input
                    type='text'
                    onChange={handleChange}
                    value={countryName}
                    className='user-input-alter user-input'
                    name='countryName'
                  />
                </div>
                <div className='city--field'>
                  <label>State Name</label>
                  <select
                    onChange={handleChange}
                    value={stateName}
                    className='user-input-alter user-input'
                    name='stateName'>
                    {state.map((c, index) => (
                      <>
                        <option key={index} disabled selected hidden></option>
                        <option>{c.stateName}</option>
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
                  <label>Weather</label>
                  <input
                    type='text'
                    name='weather'
                    value={weather}
                    onChange={handleChange}
                    className='user-input-alter user-input'
                  />
                </div>
                <div className='city--field'>
                  <label>Suggested Combination</label>
                  <input
                    type='text'
                    name='suggestedCombinations'
                    value={suggestedCombinations}
                    onChange={handleChange}
                    className='user-input-alter user-input'
                  />
                </div>
              </div>
              <div className='city--fiels-flex2'>
                <div className='city--field'>
                  <label>Ideal days to travel</label>
                  <input
                    name='idealDays'
                    type='text'
                    value={idealDays}
                    onChange={handleChange}
                    className='user-input-alter user-input'
                  />
                </div>

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
                {/* <div className="city--field">
                  <label>Suggested Combinations</label>
                  <div style={{ width: 250 }}>
                    <CKEditor
                      editor={ClassicEditor}
                      data={suggestedCombinations}
                      onChange={(event, editor) => {
                        const data = editor.getData();
                        console.log(`data`, data);
                        setCityFields({
                          ...cityFields,
                          suggestedCombinations: data,
                        });
                      }}
                    />
                  </div>
                </div>
                <div className="city--field">
                  <label>Food Joints</label>

                  <CKEditor
                    editor={ClassicEditor}
                    data={foodJoints}
                    onChange={(event, editor) => {
                      const data = editor.getData();
                      console.log(`ff`, data);

                      setCityFields({
                        ...cityFields,
                        foodJoints: data,
                      });
                    }}
                  />
                </div>
                <div className="city--field">
                  <label>Things To Pack</label>
                  <CKEditor
                    editor={ClassicEditor}
                    data={thingsToPack}
                    onChange={(event, editor) => {
                      const data = editor.getData();
                      console.log(`th`, data);

                      setCityFields({
                        ...cityFields,
                        thingsToPack: data,
                      });
                    }}
                  />
                </div>
                <div className="city--field">
                  <label>Tips</label>
                  <CKEditor
                    editor={ClassicEditor}
                    data={cityTips}
                    onChange={(event, editor) => {
                      const data = editor.getData();
                      console.log(`city`, data);

                      setCityFields({
                        ...cityFields,
                        cityTips: data,
                      });
                    }}
                  />
                </div>
                <div className="city--field">
                  <label>Documents Required</label>
                  <CKEditor
                    editor={ClassicEditor}
                    data={documentsRequired}
                    onChange={(event, editor) => {
                      const data = editor.getData();
                      console.log(`docu`, data);

                      setCityFields({
                        ...cityFields,
                        documentsRequired: data,
                      });
                    }}
                  />
                </div> */}
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
            <h3 style={{ color: '#666666' }}>Domestic City Details</h3>
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
              onChange={(e) => setSelectState(e.target.value)}
              value={selectState}>
              {state.map((c, index) => (
                <>
                  <option key={index} disabled selected hidden></option>
                  <option>{c.stateName}</option>
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
            <h5>State Name</h5>
            <h5>City Name</h5>
            {/* <h5>About City</h5> */}
            {/* <h5>Food Joints</h5>
            <h5>Tips</h5>
            <h5>Things to Pack</h5>
            <h5>Docs Required</h5> */}
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
                          <h5>{t.stateName}</h5>
                          <h5>{t.cityName}</h5>
                          {/* <td>{t.aboutCity}</td> */}
                          {/* {Object.keys(t).includes("foodJoints") ? (
                            <h5>{parse(t.foodJoints)}</h5>
                          ) : (
                            <h5></h5>
                          )}
                          {Object.keys(t).includes("cityTips") ? (
                            <h5>{parse(t.cityTips)}</h5>
                          ) : (
                            <h5></h5>
                          )}
                          {Object.keys(t).includes("thingsToPack") ? (
                            <h5>{parse(t.thingsToPack)}</h5>
                          ) : (
                            <h5></h5>
                          )}
                          {Object.keys(t).includes("documentsRequired") ? (
                            <h5>{parse(t.documentsRequired)}</h5>
                          ) : (
                            <h5></h5>
                          )} */}
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

export default DomesticCity;

// import React, { useState, useEffect, useCallback } from "react";
// // import { Link } from "react-router-dom";
// import { Modal, Button, ModalHeader, ModalFooter, ModalBody } from "reactstrap";
// import "./Request.css";
// import { Ellipsis } from "react-spinners-css";

// import { API } from "./../backend";
// import axios from "axios";
// import "./City.css";
// import { BiEditAlt } from "react-icons/bi";
// import { RiDeleteBin2Fill } from "react-icons/ri";
// import { useToasts } from "react-toast-notifications";
// import { CKEditor } from "@ckeditor/ckeditor5-react";
// import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
// import parse from "html-react-parser";
// import Quill from "quill";
// import "quill/dist/quill.snow.css";

// const DomesticCity = () => {
//   var toolbarOptions = [
//     ["bold", "italic"], // toggled buttons
//     [{ list: "ordered" }, { list: "bullet" }],
//     [{ header: [1, 2, 3, 4, 5, 6, false] }],
//     [{ color: [] }, { background: [] }], // dropdown with defaults from theme
//     [{ align: [] }],
//   ];
//   const [quill4, setQuill4] = useState();
//   const [quill1, setQuill1] = useState();
//   const [quill2, setQuill2] = useState();
//   const [quill3, setQuill3] = useState();
//   const [quill5, setQuill5] = useState();
//   useEffect(() => {
//     if (
//       quill1 == null ||
//       quill2 == null ||
//       quill3 == null ||
//       quill4 == null ||
//       quill5 == null
//     ) {
//       return;
//     }
//     quill1.on("text-change", (delta, oldDelta, source) => {
//       if (source !== "user") return;
//       var justHtml = quill1.root.innerHTML;
//       console.log(`justHtml`, justHtml);

//       setCityFields({
//         ...cityFields,
//         suggestedCombinations: quill5.root.innerHTML,
//       });
//     });
//     quill2.on("text-change", (delta, oldDelta, source) => {
//       if (source !== "user") return;
//       var justHtml = quill2.root.innerHTML;
//       console.log(`q2`, justHtml);
//       setCityFields({
//         ...cityFields,
//         foodJoints: quill1.root.innerHTML,
//       });
//     });
//     quill3.on("text-change", (delta, oldDelta, source) => {
//       if (source !== "user") return;
//       var justHtml = quill3.root.innerHTML;
//       console.log(`q3`, justHtml);
//       setCityFields({
//         ...cityFields,
//         thingsToPack: quill4.root.innerHTML,
//       });
//     });
//     quill4.on("text-change", (delta, oldDelta, source) => {
//       if (source !== "user") return;
//       var justHtml = quill4.root.innerHTML;
//       console.log(`q4`, justHtml);
//       setCityFields({
//         ...cityFields,
//         cityTips: quill2.root.innerHTML,
//       });
//     });
//     quill5.on("text-change", (delta, oldDelta, source) => {
//       if (source !== "user") return;
//       var justHtml = quill5.root.innerHTML;
//       console.log(`q5`, justHtml);
//       setCityFields({
//         ...cityFields,
//         documentsRequired: quill3.root.innerHTML,
//       });
//     });
//   }, [quill1, quill2, quill3, quill4, quill5]);
//   const wrapperRef1 = useCallback((wrapper) => {
//     if (wrapper == null) return;
//     wrapper.innerHtml = "";
//     const editor = document.createElement("div");
//     wrapper.append(editor);
//     const q1 = new Quill(editor, {
//       modules: {
//         toolbar: toolbarOptions,
//       },
//       theme: "snow",
//     });
//     setQuill1(q1);
//   }, []);
//   const wrapperRef2 = useCallback((wrapper) => {
//     if (wrapper == null) return;
//     wrapper.innerHtml = "";
//     const editor = document.createElement("div");
//     wrapper.append(editor);
//     const q2 = new Quill(editor, {
//       modules: {
//         toolbar: toolbarOptions,
//       },
//       theme: "snow",
//     });
//     setQuill2(q2);
//   }, []);
//   const wrapperRef3 = useCallback((wrapper) => {
//     if (wrapper == null) return;
//     wrapper.innerHtml = "";
//     const editor = document.createElement("div");
//     wrapper.append(editor);
//     const q3 = new Quill(editor, {
//       modules: {
//         toolbar: toolbarOptions,
//       },
//       theme: "snow",
//     });
//     setQuill3(q3);
//   }, []);
//   const wrapperRef4 = useCallback((wrapper) => {
//     if (wrapper == null) return;
//     wrapper.innerHtml = "";
//     const editor = document.createElement("div");
//     wrapper.append(editor);
//     const q4 = new Quill(editor, {
//       modules: {
//         toolbar: toolbarOptions,
//       },
//       theme: "snow",
//     });
//     setQuill4(q4);
//   }, []);
//   const wrapperRef5 = useCallback((wrapper) => {
//     if (wrapper == null) return;
//     wrapper.innerHtml = "";
//     const editor = document.createElement("div");
//     wrapper.append(editor);
//     const q5 = new Quill(editor, {
//       modules: {
//         toolbar: toolbarOptions,
//       },
//       theme: "snow",
//     });
//     setQuill5(q5);
//   }, []);

//   const [state, setState] = useState([]);
//   const [selectState, setSelectState] = useState("");
//   const { addToast } = useToasts();
//   const [modal, setModal] = useState(false);
//   const closeModal = () => setModal(false);
//   const openModal = () => setModal(true);
//   const [edit, setEdit] = useState(false);
//   const [city, setCities] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [currentPage, setCurrentpage] = useState(0);
//   const [pageSize, setPageSize] = useState(10);
//   let pagesCount = Math.ceil(city.length / pageSize);
//   const [editId, setEditId] = useState("");
//   // console.log("city", city);

//   const [cityFields, setCityFields] = useState({
//     countryName: "India",
//     cityName: "",
//     stateName: "",
//     aboutCity: "",
//     imageUrl: "",
//     weather: "",
//     latitude: "",
//     longitude: "",
//     travelDuration: "",
//     idealDays: "",
//     famousPlacesToVisit: "",
//     airportType: "",
//     airportName: "",
//     suggestedCombinations: "",
//     foodJoints: "",
//     cityTips: "",
//     thingsToPack: "",
//     documentsRequired: "",
//   });

//   const {
//     countryName,
//     stateName,
//     suggestedCombinations,
//     cityName,
//     aboutCity,
//     imageUrl,
//     weather,
//     latitude,
//     longitude,
//     travelDuration,
//     idealDays,
//     famousPlacesToVisit,
//     airportType,
//     airportName,
//     foodJoints,
//     cityTips,
//     thingsToPack,
//     documentsRequired,
//   } = cityFields;

//   console.log(`cityFields`, cityFields);
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setCityFields({
//       ...cityFields,
//       [name]: value,
//     });
//   };

//   const handleClick = (e, index) => {
//     e.preventDefault();
//     setCurrentpage(index);
//   };

//   const getCities = async () => {
//     try {
//       setLoading(true);

//       const cityResponse = await axios.get(`${API}/statecity`);
//       setCities(cityResponse.data);
//       console.log("cityResponse.data", cityResponse.data);
//       setLoading(false);
//     } catch (err) {
//       console.log(err, "err");
//     }
//   };

//   const addCities = async () => {
//     try {
//       await axios
//         .post(`${API}/statecity`, {
//           countryName: countryName,
//           suggestedCombinations: suggestedCombinations,
//           stateName: stateName,
//           cityName: cityName,
//           aboutCity: aboutCity,
//           imageUrl: imageUrl,
//           weather: weather,
//           coordinates: {
//             latitude: latitude,
//             longitude: longitude,
//           },
//           travelDuration: travelDuration,
//           idealDays: idealDays,
//           famousPlacesToVisit: famousPlacesToVisit,
//           airportType: airportType,
//           airportName: airportName,
//           foodJoints: foodJoints,
//           cityTips: cityTips,
//           thingsToPack: thingsToPack,
//           documentsRequired: documentsRequired,
//         })
//         .then((data) => {
//           console.log("data", data);
//           setEditId("");
//           addToast("Added Successfully", {
//             appearance: "success",
//           });
//           // console.log("data", data);
//           setCityFields({
//             countryName: "India",
//             cityName: "",
//             stateName: "",
//             aboutCity: "",
//             imageUrl: "",
//             weather: "",
//             latitude: "",
//             longitude: "",
//             travelDuration: "",
//             idealDays: "",
//             famousPlacesToVisit: "",
//             airportType: "",
//             airportName: "",
//             suggestedCombinations: "",
//           });
//           closeModal();
//         })
//         .catch((err) => console.log("err", err));
//       setModal(false);
//     } catch (err) {
//       console.log(err, "err");
//     }
//   };

//   const getCitiesById = async (id) => {
//     setEdit(true);
//     await axios
//       .get(`${API}/statecity/edit/${id}`)
//       .then((data) => {
//         const citydata = data.data;
//         setEditId(citydata._id);
//         setCityFields({
//           countryName: citydata.countryName,
//           suggestedCombinations: citydata.suggestedCombinations,

//           stateName: citydata.stateName,
//           cityName: citydata.cityName,
//           aboutCity: citydata.aboutCity,
//           imageUrl: citydata.imageUrl,
//           weather: citydata.weather,
//           latitude: citydata.coordinates.latitude,
//           longitude: citydata.coordinates.longitude,
//           travelDuration: citydata.travelDuration,
//           idealDays: citydata.idealDays,
//           famousPlacesToVisit: citydata.famousPlacesToVisit,
//           airportType: citydata.airportType,
//           airportName: citydata.airportName,
//           foodJoints: citydata.foodJoints,
//           cityTips: citydata.cityTips,
//           thingsToPack: citydata.thingsToPack,
//           documentsRequired: citydata.documentsRequired,
//         });
//         openModal();
//       })
//       .catch((err) => console.log("err", err));
//   };

//   const updateCity = async () => {
//     const d = {
//       suggestedCombinations: suggestedCombinations,
//       countryName: countryName,
//       stateName: stateName,
//       cityName: cityName,
//       aboutCity: aboutCity,
//       imageUrl: imageUrl,
//       weather: weather,
//       latitude: latitude,
//       longitude: longitude,
//       travelDuration: travelDuration,
//       idealDays: idealDays,
//       famousPlacesToVisit: famousPlacesToVisit,
//       airportType: airportType,
//       airportName: airportName,
//       foodJoints: foodJoints,
//       cityTips: cityTips,
//       thingsToPack: thingsToPack,
//       documentsRequired: documentsRequired,
//     };
//     // console.log(`d`, d);
//     await axios
//       .post(`${API}/statecity/edit/${editId}`, d)
//       .then((data) => {
//         console.log(`data`, data);
//         setEditId("");
//         setCities(data.data);
//         addToast("Updated Successfully", {
//           appearance: "success",
//         });
//         setCityFields({
//           countryName: "India",
//           suggestedCombinations: "",
//           cityName: "",
//           stateName: "",
//           aboutCity: "",
//           imageUrl: "",
//           weather: "",
//           latitude: "",
//           longitude: "",
//           travelDuration: "",
//           idealDays: "",
//           famousPlacesToVisit: "",
//           airportType: "",
//           airportName: "",
//           foodJoints: "",
//           cityTips: "",
//           thingsToPack: "",
//           documentsRequired: "",
//         });
//         closeModal();
//       })
//       .catch((err) => console.log("err", err));
//   };

//   const deleteCity = async (id) => {
//     try {
//       await axios
//         .post(`${API}/statecity/delete/${id}`)
//         .then((data) => {
//           addToast("Deleted Successfully", {
//             appearance: "error",
//           });
//         })
//         .catch((err) =>
//           addToast(err, {
//             appearance: "success",
//           })
//         );
//     } catch (err) {
//       console.log("err", err);
//     }
//   };

//   const getState = async () => {
//     try {
//       const stateResponse = await axios.get(`${API}/state`);
//       setState(stateResponse.data);
//     } catch (err) {
//       console.log(err, "err");
//     }
//   };

//   const onCountryCityClick = () => {
//     if (selectState === "") return city;

//     const filter = city.filter((c) => {
//       return c.stateName === selectState;
//     });

//     return filter;
//   };

//   useEffect(() => {
//     getCities();
//   }, []);

//   useEffect(() => {
//     getState();
//   }, []);

//   return (
//     <>
//       <Modal isOpen={modal} contentClassName="tour--request">
//         <ModalHeader toggle={closeModal}>Domestic City Details</ModalHeader>
//         <ModalBody>
//           <form>
//             <div className="city--fiels-flex">
//               <div className="city--fiels-flex1">
//                 <div className="city--field">
//                   <label>Country Name</label>
//                   <input
//                     type="text"
//                     onChange={handleChange}
//                     value={countryName}
//                     className="user-input-alter user-input"
//                     name="countryName"
//                   />
//                 </div>
//                 <div className="city--field">
//                   <label>State Name</label>
//                   <select
//                     // style={{ borderRadius: 10, width: 200 }}
//                     onChange={handleChange}
//                     value={stateName}
//                     className="user-input-alter user-input"
//                     name="stateName"
//                   >
//                     {state.map((c, index) => (
//                       <>
//                         <option key={index} disabled selected hidden></option>
//                         <option>{c.stateName}</option>
//                       </>
//                     ))}
//                   </select>
//                 </div>
//                 <div className="city--field">
//                   <label>City Name</label>
//                   <input
//                     type="text"
//                     name="cityName"
//                     value={cityName}
//                     onChange={handleChange}
//                     className="user-input-alter user-input"
//                   />
//                 </div>

//                 <div className="city--field">
//                   <label>About city</label>
//                   <textarea
//                     rows="3"
//                     name="aboutCity"
//                     value={aboutCity}
//                     onChange={handleChange}
//                     className="user-input-alter user-input"
//                   />
//                 </div>
//                 <div className="city--field">
//                   <label>Image Url</label>
//                   <input
//                     type="text"
//                     name="imageUrl"
//                     value={imageUrl}
//                     onChange={handleChange}
//                     className="user-input-alter user-input"
//                   />
//                 </div>
//                 <div className="city--field">
//                   <label>Weather</label>
//                   <input
//                     type="text"
//                     name="weather"
//                     value={weather}
//                     onChange={handleChange}
//                     className="user-input-alter user-input"
//                   />
//                 </div>
//                 <div className="city--field">
//                   <label>Suggested Combination</label>
//                   <input
//                     type="text"
//                     name="suggestedCombinations"
//                     value={suggestedCombinations}
//                     onChange={handleChange}
//                     className="user-input-alter user-input"
//                   />
//                 </div>
//               </div>
//               <div className="city--fiels-flex2">
//                 <div className="city--field">
//                   <label>Ideal days to travel</label>
//                   <input
//                     name="idealDays"
//                     type="text"
//                     value={idealDays}
//                     onChange={handleChange}
//                     className="user-input-alter user-input"
//                   />
//                 </div>

//                 <div className="city--field">
//                   <label>Fly Duration</label>
//                   <select
//                     name="travelDuration"
//                     value={travelDuration}
//                     onChange={handleChange}
//                     className="user-input-alter user-input"
//                   >
//                     <option value="" disabled selected hidden></option>
//                     <option value="2-4 hours">2-4 hours</option>
//                     <option value="4-6 hours">4-6 hours</option>
//                     <option value="6-8 hours">6-8 hours</option>
//                     <option value="8-10 hours">8-10 hours</option>
//                     <option value="10-12 hours">10-12 hours</option>
//                     <option value="12-14 hours">12-14 hours</option>
//                     <option value="14-16 hours">14-16 hours</option>
//                   </select>
//                 </div>
//                 <div className="city--field">
//                   <label>Latitude</label>
//                   <input
//                     type="text"
//                     name="latitude"
//                     value={latitude}
//                     onChange={handleChange}
//                     className="user-input-alter user-input"
//                   />
//                 </div>
//                 <div className="city--field">
//                   <label>Longitude</label>
//                   <input
//                     type="text"
//                     name="longitude"
//                     value={longitude}
//                     onChange={handleChange}
//                     className="user-input-alter user-input"
//                   />
//                 </div>
//                 <div className="city--field">
//                   <label>Famous Places To Visit</label>
//                   <input
//                     type="text"
//                     name="famousPlacesToVisit"
//                     value={famousPlacesToVisit}
//                     onChange={handleChange}
//                     className="user-input-alter user-input"
//                   />
//                 </div>
//                 <div className="city--field">
//                   <label>Airport</label>
//                   <select
//                     name="airportType"
//                     value={airportType}
//                     onChange={handleChange}
//                     className="user-input-alter user-input"
//                   >
//                     <option value="" disabled selected hidden></option>
//                     <option value="Native Airport">Native Airport</option>
//                     <option value="Nearest Airport">Nearest Airport</option>
//                   </select>
//                 </div>
//                 <div className="city--field">
//                   <label>Airport Name</label>
//                   <input
//                     type="text"
//                     name="airportName"
//                     value={airportName}
//                     onChange={handleChange}
//                     className="user-input-alter user-input"
//                   />
//                 </div>
//               </div>
//               <div className="city--fiels-flex2">
//                 <div className="city--field">
//                   <label>Suggested Combinations</label>
//                   <div style={{ width: 450 }} ref={wrapperRef1}>
//                     {/* <CKEditor
//                       editor={ClassicEditor}
//                       data={suggestedCombinations}
//                       onChange={(event, editor) => {
//                         const data = editor.getData();
//                         console.log(`data`, data);
//                         setCityFields({
//                           ...cityFields,
//                           suggestedCombinations: data,
//                         });
//                       }}
//                     /> */}
//                   </div>
//                 </div>
//                 <div className="city--field">
//                   <label>Food Joints</label>
//                   <div style={{ width: 450 }} ref={wrapperRef2}></div>

//                   {/*
//                   <CKEditor
//                     editor={ClassicEditor}
//                     data={foodJoints}
//                     onChange={(event, editor) => {
//                       const data = editor.getData();
//                       console.log(`ff`, data);

//                       setCityFields({
//                         ...cityFields,
//                         foodJoints: data,
//                       });
//                     }}
//                   /> */}
//                 </div>
//                 <div className="city--field">
//                   <label>Things To Pack</label>
//                   <div style={{ width: 450 }} ref={wrapperRef3}></div>

//                   {/* <CKEditor
//                     editor={ClassicEditor}
//                     data={thingsToPack}
//                     onChange={(event, editor) => {
//                       const data = editor.getData();
//                       console.log(`th`, data);

//                       setCityFields({
//                         ...cityFields,
//                         thingsToPack: data,
//                       });
//                     }}
//                   /> */}
//                 </div>
//                 <div className="city--field">
//                   <label>Tips</label>
//                   <div style={{ width: 450 }} ref={wrapperRef4}></div>

//                   {/* <CKEditor
//                     editor={ClassicEditor}
//                     data={cityTips}
//                     onChange={(event, editor) => {
//                       const data = editor.getData();
//                       console.log(`city`, data);

//                       setCityFields({
//                         ...cityFields,
//                         cityTips: data,
//                       });
//                     }}
//                   /> */}
//                 </div>
//                 <div className="city--field">
//                   <label>Documents Required</label>
//                   <div style={{ width: 450 }} ref={wrapperRef5}></div>

//                   {/* <CKEditor
//                     editor={ClassicEditor}
//                     data={documentsRequired}
//                     onChange={(event, editor) => {
//                       const data = editor.getData();
//                       console.log(`docu`, data);

//                       setCityFields({
//                         ...cityFields,
//                         documentsRequired: data,
//                       });
//                     }}
//                   /> */}
//                 </div>
//               </div>
//             </div>
//           </form>
//         </ModalBody>
//         <ModalFooter>
//           {!edit ? (
//             <Button style={{ backgroundColor: "#1B98F5" }} onClick={addCities}>
//               Add
//             </Button>
//           ) : (
//             <Button style={{ backgroundColor: "#4DD637" }} onClick={updateCity}>
//               Update
//             </Button>
//           )}
//         </ModalFooter>
//       </Modal>

//       <div
//         className="booking-container"
//         style={{
//           padding: "20px",
//         }}
//       >
//         <div
//           className="booking-name-container"
//           style={{
//             padding: "30px",
//           }}
//         >
//           <div>
//             <h3 style={{ color: "#666666" }}>Domestic City Details</h3>
//           </div>
//           <div
//             className="add-booking"
//             onClick={() => {
//               setEdit(false);
//               openModal();
//             }}
//           >
//             <h6> + Add City</h6>
//           </div>
//         </div>
//         <div
//           className="filters"
//           style={{
//             padding: "30px",
//           }}
//         >
//           <div className="month">
//             <label>Show Item : </label>
//             <select
//               value={pageSize}
//               onChange={(e) => setPageSize(e.target.value)}
//             >
//               <option value="10">10</option>
//               <option value="20">20</option>
//               <option value="50">50</option>
//               <option value="100">100</option>
//             </select>
//           </div>
//           <div className="month">
//             <label>Search by Country : </label>
//             <select
//               onChange={(e) => setSelectState(e.target.value)}
//               value={selectState}
//             >
//               {state.map((c, index) => (
//                 <>
//                   <option key={index} disabled selected hidden></option>
//                   <option>{c.stateName}</option>
//                 </>
//               ))}
//             </select>
//           </div>
//         </div>

//         <div className="b-table">
//           <div
//             className="table-heading-container request"
//             style={{
//               width: "100%",
//             }}
//           >
//             <h5>Sl.No</h5>
//             <h5>State Name</h5>
//             <h5>City Name</h5>
//             {/* <h5>About City</h5> */}
//             {/* <h5>Food Joints</h5>
//             <h5>Tips</h5>
//             <h5>Things to Pack</h5>
//             <h5>Docs Required</h5> */}
//             <h5>Action</h5>
//           </div>
//           {loading ? (
//             <div className="req-lo">
//               Fetching Data <Ellipsis color="#0057ff" />
//             </div>
//           ) : (
//             <>
//               {city.length !== 0 ? (
//                 <>
//                   {onCountryCityClick()
//                     .slice(currentPage * pageSize, (currentPage + 1) * pageSize)
//                     .map((t, i) => {
//                       return (
//                         <div className="table-heading-row request" key={i}>
//                           <h5>{i + 1}</h5>
//                           <h5>{t.stateName}</h5>
//                           <h5>{t.cityName}</h5>
//                           {/* <td>{t.aboutCity}</td> */}
//                           {/* {Object.keys(t).includes("foodJoints") ? (
//                             <h5>{parse(t.foodJoints)}</h5>
//                           ) : (
//                             <h5></h5>
//                           )}
//                           {Object.keys(t).includes("cityTips") ? (
//                             <h5>{parse(t.cityTips)}</h5>
//                           ) : (
//                             <h5></h5>
//                           )}
//                           {Object.keys(t).includes("thingsToPack") ? (
//                             <h5>{parse(t.thingsToPack)}</h5>
//                           ) : (
//                             <h5></h5>
//                           )}
//                           {Object.keys(t).includes("documentsRequired") ? (
//                             <h5>{parse(t.documentsRequired)}</h5>
//                           ) : (
//                             <h5></h5>
//                           )} */}
//                           <h5>
//                             <BiEditAlt
//                               color="blue"
//                               style={{ fontSize: 20, cursor: "pointer" }}
//                               onClick={() => getCitiesById(t._id)}
//                             />
//                             <span>
//                               <RiDeleteBin2Fill
//                                 color="red"
//                                 style={{
//                                   paddingLeft: 8,
//                                   fontSize: 24,
//                                   cursor: "pointer",
//                                 }}
//                                 onClick={() => deleteCity(t._id)}
//                               />
//                             </span>
//                           </h5>
//                         </div>
//                       );
//                     })}
//                 </>
//               ) : (
//                 <div className="req-lo">No CIty found</div>
//               )}
//             </>
//           )}
//         </div>
//         <div className="pagination-table">
//           {currentPage === 0 ? null : (
//             <div
//               className="pag-count"
//               onClick={(e) => {
//                 handleClick(e, currentPage - 1);
//               }}
//               style={{
//                 backgroundColor: "#0057ff",
//                 color: "#fff",
//               }}
//             >
//               <h5>{"<"}</h5>
//             </div>
//           )}
//           {new Array(pagesCount).fill("1").map((c, i) => {
//             if (i + 1 < currentPage + 5 && i > currentPage - 2) {
//               return (
//                 <div
//                   className="pag-count"
//                   onClick={(e) => handleClick(e, i)}
//                   style={{
//                     backgroundColor: currentPage === i ? "#0057ff" : "#fff",
//                     color: currentPage === i ? "#fff" : "#333",
//                   }}
//                 >
//                   <h5>{i + 1}</h5>
//                 </div>
//               );
//             }
//           })}
//           {pagesCount - 1 === currentPage ? null : (
//             <div
//               className="pag-count"
//               onClick={(e) => handleClick(e, currentPage + 1)}
//               style={{
//                 backgroundColor: "#0057ff",
//                 color: "#fff",
//               }}
//             >
//               <h5>{">"}</h5>
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default DomesticCity;
