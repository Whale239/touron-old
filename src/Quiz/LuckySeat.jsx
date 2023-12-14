import React, { useState, useEffect, useRef } from 'react';
import './LuckySeat.css';
import '../Fonts/Fonts.css';
import luckystar from '../assests/Quiz/luckyStar.png';
import { BiCalendar, BiTimer } from 'react-icons/bi';
import { IoIosArrowDropright } from 'react-icons/io';
import { MdExitToApp, MdEmail } from 'react-icons/md';
import { FiSend } from 'react-icons/fi';
import { BsPerson, BsLockFill } from 'react-icons/bs';
import { FaMobileAlt } from 'react-icons/fa';
import female from '../assests/Quiz/female.png';
import male from '../assests/Quiz/male.png';
import pintag from '../assests/Quiz/pintag.png';
import './Quiz.css';
import { firedb, fireStorage } from '../firebase';
import { Link, useNavigate } from 'react-router-dom';
import {
  EmailShareButton,
  EmailIcon,
  FacebookShareButton,
  FacebookIcon,
  LinkedinShareButton,
  LinkedinIcon,
  TwitterIcon,
  TwitterShareButton,
  WhatsappShareButton,
  WhatsappIcon,
} from 'react-share';

const LuckySeat = () => {
  const isMounted = useRef(false);
  let navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [user, setUser] = useState({
    name: '',
    email: '',
    phone: '',
    gender: '',
    opting: '',
    url: '',
  });
  const { name, email, phone, gender, opting, url } = user;
  const [openReq, setOpenReq] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [openShareModal, setOpenShareModal] = useState(false);
  const [openExistModal, setOpenExistModal] = useState(false);
  const [exist, setExist] = useState(false);
  const shareUrl = 'https://www.touron.in/quiz-win-prize';
  // const [luckyDatas, setLuckyDatas] = useState([]);
  const [singleArray, setSingleArray] = useState({});

  const getData = () => {
    let quizdataEmail = [];
    let quizdataPhone = [];
    firedb.ref('luckydraw').on('value', (data) => {
      if (isMounted.current) {
        data.forEach((d) => {
          quizdataEmail.push(d.val().email);
          quizdataPhone.push(d.val().phone);
        });
      }
    });
    if (quizdataEmail.includes(email) || quizdataPhone.includes(phone)) {
      setExist(true);
    } else {
      setExist(false);
    }
  };

  useEffect(() => {
    isMounted.current = true;
    getData();
    return () => (isMounted.current = false);
  }, [email, phone]);

  const submitForm = () => {
    firedb
      .ref('luckydraw')
      .push({
        name,
        email,
        phone,
        gender,
        opting,
        url,
      })
      .then(() => {
        setUser({
          name: '',
          email: '',
          phone: '',
          gender: '',
          opting: '',
          url: '',
        });
        // navigate('/');
        setStep(1);
        setOpenModal(true);
      })
      .catch((error) => console.log('error', error));
  };

  const uploadFile = async (e) => {
    setUploading(true);
    const file = e.target.files[0];
    const ref = fireStorage.ref(`luckySeat/${file.name}`);
    const task = ref.put(file);
    task.on('state_changed', (taskSnapshot) => {
      const per =
        (taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 100;
      setProgress(Math.round(per));
    });
    task.then(() => {
      ref.getDownloadURL().then((url) => {
        setProgress(0);
        setUploading(false);
        setUser({
          ...user,
          url: url,
        });
      });
    });
  };

  // const getLuckyData = () => {
  //   let luckyData = [];
  //   firedb.ref('luckyseatdate').on('value', (data) => {
  //     if (isMounted.current) {
  //       data.forEach((d) => {
  //         luckyData.push(d.val());
  //       });
  //     }
  //     setLuckyDatas(luckyData);
  //   });
  // };

  // const getLuckyData = () => {
  //   let luckyData = [];
  //   firedb.ref('luckyseatday').on('value', (data) => {
  //     if (isMounted.current) {
  //       data.forEach((d) => {
  //         luckyData.push(d.val());
  //       });
  //     }
  //     setLuckyDatas(luckyData);
  //   });
  // };

  // useEffect(() => {
  //   isMounted.current = true;
  //   getLuckyData();
  //   return () => (isMounted.current = false);
  // }, []);

  const array = [
    {
      showTime: '11:45 AM',
      seatNo: 'D7',
      audiNo: '03',
      movieName: 'PONNIYIN SELVAN',
    },
    {
      showTime: '03:30 PM',
      seatNo: 'J8',
      audiNo: '03',
      movieName: 'PONNIYIN SELVAN',
    },
    {
      showTime: '07:15 PM',
      seatNo: 'K5',
      audiNo: '03',
      movieName: 'PONNIYIN SELVAN',
    },
  ];

  const render = () => {
    switch (step) {
      case 1:
        return (
          <div className='lucky_seat_main_1'>
            <div className='luckyySendMainD'>
              <Link to='/quiz-win-prize' className='njoyBtnLink'>
                <MdExitToApp className='prevquizluc' />
              </Link>
              <FiSend
                className='quizSendluc'
                onClick={() => setOpenShareModal(true)}
              />
            </div>
            <div className='lucky_seat_main_1_sub'>
              <div className='lucky_seat_starImg'>
                <img src={luckystar} alt='/' />
              </div>
              <h5 className='lucky_seat_main_1_sub_h5'>LUCKY SEAT WINNER</h5>
              <p className='lucky_seat_main_1_sub_p'>Congratulations</p>
            </div>
            <div
              className='lucky_seat_month'
              onClick={() => {
                setStep(step + 1);
              }}>
              <BiCalendar className='lucky_seat_month_cal_icon' />
              <p>8 OCT</p>
            </div>
            {/* <div>
              {luckyDatas.length !== 0 ? (
                <>
                  {luckyDatas.map((luckyData, i) => {
                    if (i == 1)
                      return (
                        <div key={i}>
                          <div
                            className='lucky_seat_month'
                            onClick={() => {
                              setSingleLuckyData(luckyData);
                              setStep(step + 1);
                            }}>
                            <BiCalendar className='lucky_seat_month_cal_icon' />
                            <p>{luckyData.Date}</p>
                          </div>
                        </div>
                      );
                  })}
                </>
              ) : (
                <div>
                  <p className='lucky_seat_fetchingg'>Fetching data...</p>
                </div>
              )}
            </div> */}
          </div>
        );
      case 2:
        return (
          <div className='lucky_seat_main_1'>
            <div className='luckyySendMainD'>
              <MdExitToApp
                className='prevquizluc'
                onClick={() => setStep(step - 1)}
              />
              <FiSend
                className='quizSendluc'
                onClick={() => setOpenShareModal(true)}
              />
            </div>
            <div className='lucky_seat_main_1_sub'>
              <div className='lucky_seat_starImg'>
                <img src={luckystar} alt='/' />
              </div>
              <h5 className='lucky_seat_main_1_sub_h5'>LUCKY SEAT WINNER</h5>
              <p className='lucky_seat_main_1_sub_p'>Congratulations</p>
            </div>
            <div>
              {array.map((a) => {
                return (
                  <div
                    className='lucky_seat_month'
                    onClick={() => {
                      setStep(step + 1);
                      setSingleArray(a);
                    }}>
                    <BiTimer className='lucky_seat_month_cal_icon' />
                    <p>{a.showTime}</p>
                  </div>
                );
              })}
            </div>
          </div>
        );
      case 3:
        return (
          <div className='lucky_seat_main_1'>
            <div className='luckyySendMainD'>
              <MdExitToApp
                className='prevquizluc'
                onClick={() => setStep(step - 1)}
              />
              <FiSend
                className='quizSendluc'
                onClick={() => setOpenShareModal(true)}
              />
            </div>
            <div className='lucky_seat_main_1_sub'>
              <div className='lucky_seat_starImg'>
                <img src={luckystar} alt='/' />
              </div>
              <h5 className='lucky_seat_main_1_sub_h5'>LUCKY SEAT WINNER</h5>
              <p className='lucky_seat_main_1_sub_p'>Congratulations</p>
            </div>
            <div className='lucky_seat_main_1_subss'>
              {/* <div className='lucky_seat_main_1_subss_1'>
                <p>
                  Seat#{' '}
                  <span className='lucky_seat_main_1_subss_1_span'>
                    {singleArray.seatNo}
                  </span>
                </p>
                <IoIosArrowDropright className='lucky_seat_main_1_subss_icon' />
              </div> */}
              <div className='lucky_seat_main_1_subss_1'>
                <p>
                  Seat#{' '}
                  <span className='lucky_seat_main_1_subss_1_span'>
                    Reveal 9 OCT - 12PM
                  </span>
                </p>
                <IoIosArrowDropright className='lucky_seat_main_1_subss_icon' />
              </div>
              <div className='lucky_seat_main_1_subss_1'>
                <p>AUDI NO. {singleArray.audiNo}</p>
                <IoIosArrowDropright className='lucky_seat_main_1_subss_icon' />
              </div>
              <div className='lucky_seat_main_1_subss_1'>
                <p>{singleArray.movieName}</p>
                <IoIosArrowDropright className='lucky_seat_main_1_subss_icon' />
              </div>
              <div className='lucky_seat_main_1_subss_1'>
                <p>{singleArray.showTime} SHOW</p>
                <IoIosArrowDropright className='lucky_seat_main_1_subss_icon' />
              </div>
            </div>
            <button
              className='lucky_seat_main_1_subss_btn'
              onClick={() => setStep(step + 1)}>
              Claim reward
            </button>
          </div>
        );
      case 4:
        return (
          <div className='luckyySendMainDD'>
            <div className='luckyySendMainD'>
              <MdExitToApp
                className='prevquizluc'
                onClick={() => setStep(step - 1)}
              />
              <FiSend
                className='quizSendluc'
                onClick={() => setOpenShareModal(true)}
              />
            </div>
            <div className='luckyPgg'>
              <div>
                <p className='luckyHelloo'>Congrats!</p>
                <p className='luckyHelloInn'>
                  This information will help us to connect with you if you've
                  won the lucky seat contest in PVR
                </p>
              </div>
              <div>
                <div className='luckyyInputMaa'>
                  <input
                    className='luckyyInputt'
                    type='text'
                    placeholder='Full Name'
                    onChange={(e) =>
                      setUser({
                        ...user,
                        name: e.target.value,
                      })
                    }
                    value={name}
                    onBlur={() => {
                      if (name == '') {
                        setOpenReq(true);
                      } else {
                        setOpenReq(false);
                      }
                    }}
                  />
                  <BsPerson className='luckydrawIconn' />
                </div>
                <div className='luckyyInputMaa'>
                  <input
                    className='luckyyInputt'
                    type='email'
                    placeholder='Email ID'
                    onChange={(e) =>
                      setUser({
                        ...user,
                        email: e.target.value,
                      })
                    }
                    value={email}
                    onBlur={() => {
                      if (email == '') {
                        setOpenReq(true);
                      } else {
                        setOpenReq(false);
                      }
                    }}
                  />
                  <MdEmail className='luckydrawIconn' />
                </div>
                <div className='luckyyInputMaa'>
                  <input
                    className='luckyyInputt'
                    type='number'
                    placeholder='Phone number'
                    onChange={(e) =>
                      setUser({
                        ...user,
                        phone: e.target.value,
                      })
                    }
                    value={phone}
                    onBlur={() => {
                      if (phone == '') {
                        setOpenReq(true);
                      } else {
                        setOpenReq(false);
                      }
                    }}
                  />
                  <FaMobileAlt className='luckydrawIconn' />
                </div>
              </div>
              <div className='genderLuckyy'>
                <div className='genderLuckySub1y'>
                  <p>Female</p>
                  <div
                    className={gender == 'female' ? 'feeimgg' : 'feeimg'}
                    onClick={() => {
                      setUser({
                        ...user,
                        gender: 'female',
                      });
                      setOpenReq(false);
                    }}>
                    <img src={female} alt='female' />
                  </div>
                </div>
                <div className='genderLuckySub1y'>
                  <p>Male</p>
                  <div
                    className={gender == 'male' ? 'feeimgg' : 'feeimg'}
                    onClick={() => {
                      setUser({
                        ...user,
                        gender: 'male',
                      });
                      setOpenReq(false);
                    }}>
                    <img src={male} alt='female' />
                  </div>
                </div>
                <div className='genderLuckySub111y'>
                  <p>I'm Opting to</p>
                  <div className='genderLuckySub11M'>
                    <div
                      className='genderLuckySub11'
                      onClick={() => {
                        setUser({
                          ...user,
                          opting: 'Claim my reward',
                        });
                        setOpenReq(false);
                      }}>
                      <div
                        className={
                          opting == 'Claim my reward'
                            ? 'LuckyCirclee'
                            : 'LuckyCircle'
                        }
                      />
                      <p style={{ marginBottom: '5px' }}>Claim my reward</p>
                    </div>
                    <div
                      className='genderLuckySub11'
                      onClick={() => {
                        setUser({
                          ...user,
                          opting: 'Check offers',
                        });
                        setOpenReq(false);
                      }}>
                      <div
                        className={
                          opting == 'Check offers'
                            ? 'LuckyCirclee'
                            : 'LuckyCircle'
                        }
                      />
                      <p>Check offers</p>
                    </div>
                  </div>
                </div>
              </div>
              {opting == 'Claim my reward' && (
                <div>
                  {url == '' ? (
                    <label for='docTag'>
                      <div className='doctag_lucky'>
                        <img src={pintag} alt='/' />
                        {uploading ? (
                          <p>File Uploading...</p>
                        ) : (
                          <p>
                            Attach your Physical Ticket or SMS to Claim Reward
                          </p>
                        )}
                      </div>
                      <input
                        type='file'
                        id='docTag'
                        className='input_lucky-tagg'
                        onChange={(e) => {
                          uploadFile(e);
                        }}
                      />
                    </label>
                  ) : (
                    <div className='doctag_lucky'>
                      <img src={pintag} alt='/' />
                      <p>Your File Attached</p>
                    </div>
                  )}
                </div>
              )}
              {openReq && (
                <div className='quiz-req'>
                  <p>All Fields are Required!</p>
                </div>
              )}
              {exist == true ? (
                <button
                  className={openReq ? 'luckySubmitBtn' : 'luckySubmitBtnn'}
                  onClick={() => setOpenExistModal(true)}>
                  Submit
                </button>
              ) : (
                <button
                  className={openReq ? 'luckySubmitBtn' : 'luckySubmitBtnn'}
                  onClick={() => {
                    if (name && email && phone && gender && opting) {
                      submitForm();
                    } else if (
                      name == '' ||
                      email == '' ||
                      phone == '' ||
                      gender == '' ||
                      opting == ''
                    ) {
                      setOpenReq(true);
                    }
                  }}>
                  Submit
                </button>
              )}
            </div>
            <div className='luckyProtect'>
              <p>Privacy protected</p>
              <BsLockFill className='prtectIcon' />
            </div>
          </div>
        );
      default:
        return step;
    }
  };

  return (
    <div className='lucky_seat_allMain'>
      {render()}
      <div>
        {openModal && (
          <div className='quizPopup'>
            <div className='quizPopup_content'>
              <div
                className='quizPopup__content-close'
                onClick={() => setOpenModal(false)}>
                &times;
              </div>
              <p className='quizPopup_para'>
                Thanks for participating in Lucky Prize
              </p>
              <Link to='/' className='njoyBtnLink'>
                <button className='quizPopup_btn'>Visit our Website</button>
              </Link>
            </div>
          </div>
        )}
        {openShareModal && (
          <div className='quizPopup'>
            <div className='quizPopup_contentShare'>
              <div
                className='quizPopup__content-closeShare'
                onClick={() => setOpenShareModal(false)}>
                &times;
              </div>
              <div className='quizPopup__content-BtnShare'>
                <WhatsappShareButton
                  url={shareUrl}
                  title='tourOn Quiz, Win prize'>
                  <WhatsappIcon size={40} round={true} />
                </WhatsappShareButton>
                <FacebookShareButton
                  url={shareUrl}
                  title='tourOn Quiz, Win prize'>
                  <FacebookIcon size={40} round={true} />
                </FacebookShareButton>
                <EmailShareButton url={shareUrl} title='tourOn Quiz, Win prize'>
                  <EmailIcon size={40} round={true} />
                </EmailShareButton>
                <LinkedinShareButton
                  url={shareUrl}
                  title='tourOn Quiz, Win prize'>
                  <LinkedinIcon size={40} round={true} />
                </LinkedinShareButton>
                <TwitterShareButton
                  url={shareUrl}
                  title='tourOn Quiz, Win prize'>
                  <TwitterIcon size={40} round={true} />
                </TwitterShareButton>
              </div>
            </div>
          </div>
        )}
        {openExistModal && (
          <div className='quizPopup'>
            <div className='quizPopup_content'>
              <div
                className='quizPopup__content-close'
                onClick={() => setOpenExistModal(false)}>
                &times;
              </div>
              <p className='quizPopup_para'>Email / Mobile already Exist!</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LuckySeat;
