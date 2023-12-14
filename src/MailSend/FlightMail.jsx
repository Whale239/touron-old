import React, { useState, useContext } from 'react';
import { fireStorage } from '../firebase';
import axios from 'axios';
import { Progress } from 'reactstrap';
import './commonMail.css';
import moment from 'moment';
import { API } from './../backend';
import { useToasts } from 'react-toast-notifications';
import { v4 as uuidv4 } from 'uuid';
import { BiEditAlt } from 'react-icons/bi';
import { RiDeleteBin2Fill } from 'react-icons/ri';
import { ApiContext } from '../Context/ApiContext';

const FlightMail = () => {
  const { employees } = useContext(ApiContext);
  const [flight, setFlight] = useState({
    name: '',
    email: '',
    cc: '',
    onwardDate: '',
    returnDate: '',
    attachment: [],
  });
  const { addToast } = useToasts();
  const [ccOpen, setCcOpen] = useState(false);
  const [file, setFile] = useState('');
  const [progress, setProgress] = useState(0);
  const [imageUpload, setImageUpload] = useState(false);
  const [sendOpen, setSendOpen] = useState(false);
  const [updtBtn, setUpdtBtn] = useState(false);

  const { name, email, cc, onwardDate, returnDate, attachment } = flight;

  const [singleAttachment, setSingleAttachment] = useState({
    id: uuidv4(),
    filename: '',
    originFlightCode: '',
    destinationFlightCode: '',
    path: '',
  });

  const { filename, originFlightCode, destinationFlightCode, path } =
    singleAttachment;

  // const drop = [
  //   "vikashmanoharan@touron.in",
  //   "ganesh.ashok@touron.in",
  //   "kirthika.jayagopi@touron.in",
  //   "swetha.suresh@touron.in",
  //   "bharathwaaj.sathish@touron.in",
  // ];

  const addAttachment = () => {
    let attach = [];
    if (attachment) {
      attach = [...attachment, singleAttachment];
    } else {
      attach = [singleAttachment];
    }
    setFlight({
      ...flight,
      attachment: attach,
    });
    setSingleAttachment({
      id: uuidv4(),
      filename: '',
      originFlightCode: '',
      destinationFlightCode: '',
      path: '',
    });
  };

  const updateFlight = () => {
    attachment.map((a) => {
      if (a.id === singleAttachment.id) {
        a.id = singleAttachment.id;
        a.filename = singleAttachment.filename;
        a.originFlightCode = singleAttachment.originFlightCode;
        a.destinationFlightCode = singleAttachment.destinationFlightCode;
        a.path = singleAttachment.path;
      }
      return a;
    });
    setSingleAttachment({
      id: uuidv4(),
      filename: '',
      originFlightCode: '',
      destinationFlightCode: '',
      path: '',
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
    const uploadTask = fireStorage.ref(`flights/${file.name}`).put(file);
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
          .ref('flights')
          .child(file.name)
          .getDownloadURL()
          .then((url) => {
            setSingleAttachment({
              ...singleAttachment,
              path: url,
            });
            setImageUpload(false);
            setProgress(0);
          });
      }
    );
  };

  const deleteFlight = (id) => {
    console.log(`id`, id);
    const attch = attachment.filter((a) => a.id !== id);
    console.log(`attch`, attch);
    setFlight({
      ...flight,
      attachment: attch,
    });
  };

  const Send = (e) => {
    e.preventDefault();
    setSendOpen(true);
    const data = {
      name: name,
      email: email,
      cc: cc,
      onwardDate: moment(onwardDate).format('MMM Do, h:mm a'),
      returnDate: moment(returnDate).format('MMM Do, h:mm a'),
      attachment: attachment,
    };

    console.log(`data`, data);

    axios
      .post(`${API}/sendflightemail`, data)
      .then((res) => {
        console.log(`res`, res.data);
        if (res.data.Success) {
          setSendOpen(false);
          addToast('Flight Tickets send Successfully', {
            appearance: 'success',
          });
          setFlight({
            name: '',
            email: '',
            cc: '',
            onwardDate: '',
            returnDate: '',
            attachment: [],
          });
        } else {
          setSendOpen(false);
          addToast('Flight Tickets send Failed', {
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
          <h1>Flight Mail</h1>
        </div>
        <div className='hotelMailInput'>
          <input
            type='text'
            value={name}
            placeholder='Name'
            onChange={(e) =>
              setFlight({
                ...flight,
                name: e.target.value,
              })
            }
          />
          <input
            type='text'
            value={email}
            placeholder='Email'
            onChange={(e) =>
              setFlight({
                ...flight,
                email: e.target.value,
              })
            }
          />
          <input
            type='text'
            value={onwardDate}
            placeholder='onwardDate'
            onFocus={(e) => (e.target.type = 'datetime-local')}
            onBlur={(e) => (e.target.type = 'text')}
            onChange={(e) =>
              setFlight({
                ...flight,
                onwardDate: e.target.value,
              })
            }
          />
          <input
            type='text'
            value={returnDate}
            placeholder='returDate'
            onFocus={(e) => (e.target.type = 'datetime-local')}
            onBlur={(e) => (e.target.type = 'text')}
            onChange={(e) =>
              setFlight({
                ...flight,
                returnDate: e.target.value,
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
                            setFlight({
                              ...flight,
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

        <div className='hotelAttachMainn'>
          <div className='hotelMailInput'>
            <input
              type='text'
              value={originFlightCode}
              placeholder='Origin FlightCode'
              onChange={(e) =>
                setSingleAttachment({
                  ...singleAttachment,
                  originFlightCode: e.target.value,
                })
              }
            />
            <input
              type='text'
              value={destinationFlightCode}
              placeholder='Destination FlightCode'
              onChange={(e) =>
                setSingleAttachment({
                  ...singleAttachment,
                  destinationFlightCode: e.target.value,
                })
              }
            />
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
          <button
            onClick={updtBtn ? updateFlight : addAttachment}
            disabled={!path}
            className={!path ? 'hotelAttachBtnC' : 'hotelAttachBtn'}>
            {updtBtn ? 'Update Flight' : 'Add Flight'}
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
              <h4>Flight Attached</h4>
            </div>
            <div className='atchTitle'>
              <h6>Origin Flight Code</h6>
              <h6>Destination Flight Code</h6>
              <h6>File Name</h6>
              <h6>Action</h6>
            </div>
            <div>
              {attachment?.map((a, i) => (
                <div key={i} className='atchh'>
                  <p>{a.originFlightCode}</p>
                  <p>{a.destinationFlightCode}</p>
                  <p>{a.filename}</p>
                  <p className='hotelEditDel'>
                    <BiEditAlt
                      className='hotelEdit'
                      onClick={() => {
                        setSingleAttachment({
                          ...singleAttachment,
                          id: a.id,
                          filename: a.filename,
                          originFlightCode: a.originFlightCode,
                          destinationFlightCode: a.destinationFlightCode,
                          path: a.path,
                        });
                        setUpdtBtn(true);
                      }}
                    />
                    <RiDeleteBin2Fill
                      className='hotelDel'
                      onClick={() => {
                        deleteFlight(a.id);
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

export default FlightMail;
