import React, { useContext, useState } from 'react';
import { fireStorage } from '../firebase';
import './commonMail.css';
import axios from 'axios';
import { Progress } from 'reactstrap';
import moment from 'moment';
import { API } from './../backend';
import { useToasts } from 'react-toast-notifications';
import { v4 as uuidv4 } from 'uuid';
import { BiEditAlt } from 'react-icons/bi';
import { RiDeleteBin2Fill } from 'react-icons/ri';
import { ApiContext } from '../Context/ApiContext';

const HotelMail = () => {
  const { employees } = useContext(ApiContext);
  const [hotel, setHotel] = useState({
    name: '',
    destination: '',
    email: '',
    cc: '',
    attachment: [],
  });
  console.log(`hotel`, hotel);
  const { addToast } = useToasts();
  const [ccOpen, setCcOpen] = useState(false);
  const [foodOpen, setFoodOpen] = useState(false);
  const [file, setFile] = useState('');
  const [progress, setProgress] = useState(0);
  const [imageUpload, setImageUpload] = useState(false);
  const [sendOpen, setSendOpen] = useState(false);
  const [updtBtn, setUpdtBtn] = useState(false);

  const { name, destination, email, cc, attachment } = hotel;

  const [singleAttachment, setSingleAttachment] = useState({
    id: uuidv4(),
    filename: '',
    url: '',
    hotelName: '',
    checkIn: '',
    checkOut: '',
    mealPlan: '',
  });

  const { id, filename, url, hotelName, checkIn, checkOut, mealPlan } =
    singleAttachment;

  console.log(`singleAttachment`, singleAttachment);

  // const drop = [
  //   "vikashmanoharan@touron.in",
  //   "ganesh.ashok@touron.in",
  //   "kirthika.jayagopi@touron.in",
  //   "swetha.suresh@touron.in",
  //   "bharathwaaj.sathish@touron.in",
  // ];
  const mealPlans = [
    'Breakfast Only',
    'Breakfast & Dinner ',
    'Breakfast, Lunch & Dinner',
    'All Inclusive ',
  ];

  const addAttachment = () => {
    let attach = [];
    if (attachment.length !== 0) {
      attach = [...attachment, singleAttachment];
    } else {
      attach = [singleAttachment];
    }
    setHotel({
      ...hotel,
      attachment: attach,
    });
    setSingleAttachment({
      id: uuidv4(),
      filename: '',
      url: '',
      hotelName: '',
      checkIn: '',
      checkOut: '',
      mealPlan: '',
    });
  };

  const updateHotel = () => {
    attachment.map((a) => {
      if (a.id === singleAttachment.id) {
        a.id = singleAttachment.id;
        a.filename = singleAttachment.filename;
        a.checkIn = singleAttachment.checkIn;
        a.checkOut = singleAttachment.checkOut;
        a.mealPlan = singleAttachment.mealPlan;
        a.url = singleAttachment.url;
        a.hotelName = singleAttachment.hotelName;
      }
      return a;
    });
    setSingleAttachment({
      id: uuidv4(),
      filename: '',
      url: '',
      hotelName: '',
      checkIn: '',
      checkOut: '',
      mealPlan: '',
    });
    setUpdtBtn(false);
  };

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
      setSingleAttachment({
        ...singleAttachment,
        filename: e.target.files[0].name,
      });
    }
  };

  const uploadFile = () => {
    const uploadTask = fireStorage.ref(`hotels/${file.name}`).put(file);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        console.log(error);
      },
      () => {
        setImageUpload(true);
        fireStorage
          .ref('hotels')
          .child(file.name)
          .getDownloadURL()
          .then((url) => {
            setSingleAttachment({
              ...singleAttachment,
              url: url,
            });
            setImageUpload(false);
            setProgress(0);
          });
      }
    );
  };

  const deleteHotel = (id) => {
    const attch = attachment.filter((a) => a.id !== id);
    setHotel({
      ...hotel,
      attachment: attch,
    });
  };

  const Send = (e) => {
    e.preventDefault();
    setSendOpen(true);
    const attch = attachment.map((a) => {
      return {
        filename: a.filename,
        path: a.url,
        hotelName: a.hotelName,
        checkIn: moment(a.checkIn).format('MMM Do, h:mm a'),
        checkOut: moment(a.checkOut).format('MMM Do, h:mm a'),
        mealPlan: a.mealPlan,
      };
    });

    const data = {
      name: name,
      email: email,
      destination: destination,
      cc: cc,
      attachments: attch,
    };
    axios
      .post(`${API}/sendhotelemail`, data)
      .then((res) => {
        console.log(`res`, res.data);
        if (res.data.Success) {
          setSendOpen(false);
          addToast('Hotel Tickets send Successfully', {
            appearance: 'success',
          });
          setHotel({
            name: '',
            destination: '',
            email: '',
            cc: '',
            attachment: [],
          });
        } else {
          setSendOpen(false);
          addToast('Hotel Tickets send Failed', {
            appearance: 'error',
          });
        }
      })
      .catch((err) => console.log(`err`, err));
  };

  return (
    <div className='mailHotelBackground'>
      {sendOpen && (
        <div className='sendContentMain'>
          <div className='sendContent'>
            <h3>Sending mail, Please wait...</h3>
          </div>
        </div>
      )}
      <div className='mailHotel'>
        <div className='mailHotelSub'>
          <h1>Hotel Mail</h1>
        </div>
        <div className='hotelMailInput'>
          <input
            type='text'
            value={name}
            placeholder='Name'
            onChange={(e) =>
              setHotel({
                ...hotel,
                name: e.target.value,
              })
            }
          />
          <input
            type='text'
            value={email}
            placeholder='Email'
            onChange={(e) =>
              setHotel({
                ...hotel,
                email: e.target.value,
              })
            }
          />
          <input
            type='text'
            value={destination}
            placeholder='Destination'
            onChange={(e) =>
              setHotel({
                ...hotel,
                destination: e.target.value,
              })
            }
          />
          <div className='ccStyleMail'>
            <div
              className={cc ? 'ccInputMail' : 'ccInputMailc'}
              onClick={() => {
                setCcOpen(!ccOpen);
              }}>
              {cc ? cc : 'Select CC Recepient'}
            </div>
            {ccOpen && (
              <div className='ccDropMail'>
                {employees.map((d, i) => {
                  if (
                    d.designation !== 'Junior Software Engg' &&
                    d.designation !== 'CFO'
                  )
                    return (
                      <ul key={i}>
                        <li
                          onClick={() => {
                            setHotel({
                              ...hotel,
                              cc: d.email,
                            });
                            setCcOpen(false);
                          }}>
                          {d.email}
                        </li>
                      </ul>
                    );
                })}
              </div>
            )}
          </div>
        </div>

        <div className='hotelAttachMain'>
          <div className='hotelAttach'>
            <h6>Hotel details</h6>
          </div>
          <div className='hotelMailInput'>
            <input
              type='text'
              value={hotelName}
              placeholder='Hotel name'
              onChange={(e) =>
                setSingleAttachment({
                  ...singleAttachment,
                  hotelName: e.target.value,
                })
              }
            />
            <input
              type='text'
              onFocus={(e) => (e.target.type = 'datetime-local')}
              onBlur={(e) => (e.target.type = 'text')}
              placeholder='Check in'
              value={checkIn}
              onChange={(e) =>
                setSingleAttachment({
                  ...singleAttachment,
                  checkIn: e.target.value,
                })
              }
            />
            <input
              type='text'
              onFocus={(e) => (e.target.type = 'datetime-local')}
              onBlur={(e) => (e.target.type = 'text')}
              value={checkOut}
              placeholder='Check out'
              onChange={(e) =>
                setSingleAttachment({
                  ...singleAttachment,
                  checkOut: e.target.value,
                })
              }
            />
            <div className='ccStyleMail'>
              <div
                className={mealPlan ? 'ccInputMail' : 'ccInputMailc'}
                onClick={() => {
                  setFoodOpen(!foodOpen);
                }}>
                {mealPlan ? mealPlan : 'Select Meal Plan'}
              </div>
              {foodOpen && (
                <div className='ccDropMail'>
                  {mealPlans.map((d, i) => (
                    <ul key={i}>
                      <li
                        onClick={() => {
                          setSingleAttachment({
                            ...singleAttachment,
                            mealPlan: d,
                          });
                          setFoodOpen(false);
                        }}>
                        {d}
                      </li>
                    </ul>
                  ))}
                </div>
              )}
            </div>
            <div className='hotalUpload'>
              <div>
                <input
                  type='file'
                  placeholder='Upload Pdf'
                  onChange={handleChange}
                />
                {imageUpload && (
                  <div>
                    <h5>{progress}%</h5>
                    <Progress value={progress} animated={true} />
                  </div>
                )}
              </div>
              <button
                disabled={!filename}
                onClick={uploadFile}
                className={!filename ? 'hotelAttachBtnC' : 'hotelAttachBtn'}>
                {updtBtn ? 'Update File' : ' Upload File'}
              </button>
            </div>
          </div>
          <button
            onClick={updtBtn ? updateHotel : addAttachment}
            disabled={!url}
            className={!url ? 'hotelAttachBtnC' : 'hotelAttachBtn'}>
            {updtBtn ? 'Update Hotel' : 'Add Hotel'}
          </button>
          {updtBtn && (
            <button
              className='hotelAttachBtn'
              onClick={() => setUpdtBtn(false)}>
              Cancel
            </button>
          )}
        </div>

        {attachment.length > 0 && (
          <div className='attachedHotel'>
            <div className='attachedHotelTitle'>
              <h4>Hotel Attached</h4>
            </div>
            <div className='atchTitle'>
              <h6>Hotel Name</h6>
              <h6>File Name</h6>
              <h6>Action</h6>
            </div>
            <div>
              {attachment?.map((a, i) => (
                <div key={i} className='atchh'>
                  <p>{a.hotelName}</p>
                  <p>{a.filename}</p>
                  <p className='hotelEditDel'>
                    <BiEditAlt
                      className='hotelEdit'
                      onClick={() => {
                        setSingleAttachment({
                          ...singleAttachment,
                          id: a.id,
                          hotelName: a.hotelName,
                          filename: a.filename,
                          checkIn: a.checkIn,
                          checkOut: a.checkOut,
                          mealPlan: a.mealPlan,
                          url: a.url,
                        });
                        setUpdtBtn(true);
                      }}
                    />
                    <RiDeleteBin2Fill
                      className='hotelDel'
                      onClick={() => {
                        deleteHotel(a.id);
                        setUpdtBtn(false);
                      }}
                    />
                  </p>
                </div>
              ))}
            </div>

            <button
              className={!email ? 'mailHotelSubBtnC' : 'mailHotelSubBtn'}
              disabled={!email}
              onClick={Send}>
              Send Mail
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HotelMail;
