import React, { useEffect, useState, useRef } from 'react';
import { firedb } from '../firebase';
import './Virtual.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Virtual = () => {
  const isMounted = useRef(false);
  const [data, setData] = useState({
    name: '',
    number: '',
    date: '',
    time: '',
    apType: '',
  });

  const [alotTime, setAlotTime] = useState([]);
  const [dummySlot, setDummySlot] = useState([]);
  const [dummySlotss, setDummySlotss] = useState([]);
  const [modal, setModal] = useState(false);
  const [mainForm, setMainForm] = useState(false);

  const fetchCurrentSlot = async () => {
    try {
      const response = await axios.get(
        'https://us-central1-touronapp-248e4.cloudfunctions.net/dummyslot'
      );
      const data = await response.data;
      setDummySlot(data.slot);
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    fetchCurrentSlot();
  }, []);

  const { name, number, date, time, apType } = data;

  let times = [
    '11:00AM',
    '11:15AM',
    '11:30AM',
    '11:45AM',
    '12:00PM',
    '12:15PM',
    '12:30PM',
    '12:45PM',
    '01:00PM',
    '01:15PM',
    '01:30PM',
    '01:45PM',
    '02:00PM',
    '02:15PM',
    '02:30PM',
    '02:45PM',
    '03:00PM',
    '03:15PM',
    '03:30PM',
    '03:45PM',
    '04:00PM',
    '04:15PM',
    '04:30PM',
    '04:45PM',
    '05:00PM',
    '05:15PM',
    '05:30PM',
  ];

  const submit = () => {
    firedb
      .ref('virtual')
      .push({
        name: name,
        number: number,
        date: date,
        time: time,
        apType: apType,
      })
      .then(() => {
        setData({
          name: '',
          number: '',
          date: '',
          time: '',
          apType: '',
        });
        setModal(true);
        setMainForm(true);
      })
      .catch((err) => console.log(err));
  };

  const handleDateChange = (event) => {
    const inputDate = event.target.value;
    const selectedDate = new Date(inputDate);
    const dayOfWeek = selectedDate.getDay();

    // 0 represents Sunday, and 6 represents Saturday
    if (dayOfWeek === 0) {
      alert('Sorry, We are not operating on Sunday!');
      setData({
        ...data,
        date: '',
      });
    } else {
      setData({
        ...data,
        date: inputDate,
      });
    }
  };

  const getData = () => {
    let arr = [];
    firedb.ref('virtual').on('value', (data) => {
      if (isMounted.current) {
        data.forEach((d) => {
          if (date === d.val().date) {
            arr.push(d.val().time);
          }
        });
        setAlotTime(arr);
      }
    });
  };

  useEffect(() => {
    isMounted.current = true;
    getData();
    return () => (isMounted.current = false);
  }, [date]);

  const getDataDummy = () => {
    let arr = [];
    firedb.ref('dummySlot').on('value', (data) => {
      if (isMounted.current) {
        data.forEach((d) => {
          arr.push(d.val().name);
        });
        setDummySlotss(arr);
      }
    });
  };

  useEffect(() => {
    isMounted.current = true;
    getDataDummy();
    return () => (isMounted.current = false);
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === ' ') {
      e.preventDefault();
    }
  };

  const handleKeyPress = (e) => {
    if (!/[0-9]/.test(e.key)) {
      e.preventDefault();
    }
  };

  return (
    <div className='virtual__home'>
      <video autoPlay muted loop className='virtual__video'>
        <source
          src='https://firebasestorage.googleapis.com/v0/b/touronapp-248e4.appspot.com/o/virtualvideo.mp4?alt=media&token=f3ea5a3e-1220-4dda-bc48-e5d1f03db721&_gl=1*17gr4cw*_ga*MjEyMDEzODI3Ny4xNjQ4NTc0MzYz*_ga_CW55HF8NVT*MTY4NjMwNDIyNi40My4xLjE2ODYzMDQ2ODguMC4wLjA.'
          type='video/mp4'
        />
      </video>
      {modal && (
        <div className='virtual__modal'>
          <p>Hurray! Your Appointment booked successfully.</p>
          <Link to='/'>
            <button>Go to Home</button>
          </Link>
        </div>
      )}
      {!mainForm && (
        <div className='virtual_step_1_main'>
          <div className='virtual_step_1_main_headdd'>
            <h1>Trial Room</h1>
            <h4>Set up your first Appointment type</h4>
          </div>
          <div className='virtual_step_1_main_inputs'>
            <div className='virtual_step_1_main_inputs_input'>
              <label>name</label>
              <input
                type='text'
                value={name}
                onChange={(e) =>
                  setData({
                    ...data,
                    name: e.target.value,
                  })
                }
              />
            </div>
            <div className='virtual_step_1_main_inputs_input'>
              <label>whatsapp number</label>
              <input
                type='text'
                value={number}
                maxLength='10'
                onKeyDown={handleKeyDown}
                onKeyPress={handleKeyPress}
                onChange={(e) =>
                  setData({
                    ...data,
                    number: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <label className='virtual_step_1_main_inputs_radio_lab'>
                appointment type
              </label>
              <div className='virtual_step_1_main_inputs_radio'>
                <div>
                  <input
                    type='radio'
                    name='onwardTransportMode'
                    id='Single'
                    value='Single'
                    checked={apType === 'Single'}
                    onChange={(e) =>
                      setData({
                        ...data,
                        apType: e.target.value,
                      })
                    }
                  />
                  <label htmlFor='Single'>Single</label>
                </div>
                <div>
                  <input
                    type='radio'
                    name='onwardTransportMode'
                    id='Couple'
                    value='Couple'
                    checked={apType === 'Couple'}
                    onChange={(e) =>
                      setData({
                        ...data,
                        apType: e.target.value,
                      })
                    }
                  />
                  <label htmlFor='Couple'>Couple</label>
                </div>
                <div>
                  <input
                    type='radio'
                    name='onwardTransportMode'
                    id='Group'
                    value='Group'
                    checked={apType === 'Group'}
                    onChange={(e) =>
                      setData({
                        ...data,
                        apType: e.target.value,
                      })
                    }
                  />
                  <label htmlFor='Group'>Group</label>
                </div>
              </div>
            </div>
            <div className='virtual_step_1_main_inputs_input'>
              <label>date</label>
              <input
                type='date'
                value={date}
                onChange={handleDateChange}
                min={new Date().toISOString().split('T')[0]}
                max={
                  new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000)
                    .toISOString()
                    .split('T')[0]
                }
                required
              />
            </div>
            <div className='virtual_step_1_main_inputs_input'>
              <label>book your slot</label>
              <select
                disabled={!date}
                value={time}
                onChange={(e) =>
                  setData({
                    ...data,
                    time: e.target.value,
                  })
                }>
                <option value='' selected hidden>
                  Select
                </option>
                {times.map((t) => {
                  return (
                    <option
                      value={t}
                      disabled={
                        alotTime.includes(t) ||
                        dummySlot.includes(t) ||
                        dummySlotss.includes(t)
                      }>
                      {alotTime.includes(t) ||
                      dummySlot.includes(t) ||
                      dummySlotss.includes(t)
                        ? `${t} "Slot Booked"`
                        : t}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div>
            <button
              disabled={
                name === '' ||
                number === '' ||
                date === '' ||
                time === '' ||
                apType === ''
              }
              className={
                name === '' ||
                number === '' ||
                date === '' ||
                time === '' ||
                apType === ''
                  ? 'virtual_step_1_main_btn_dis'
                  : 'virtual_step_1_main_btn'
              }
              onClick={() => submit()}>
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Virtual;
