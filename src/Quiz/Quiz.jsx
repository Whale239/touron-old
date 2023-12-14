import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Quiz.css';
import '../Fonts/Fonts.css';
import { FiSend } from 'react-icons/fi';
import {
  BiCameraMovie,
  BiTennisBall,
  BiRestaurant,
  BiSleepy,
  BiFoodMenu,
  BiTable,
} from 'react-icons/bi';
import {
  FaStoreAlt,
  FaMobileAlt,
  FaRupeeSign,
  FaStar,
  FaHeart,
  FaPlane,
  FaUmbrellaBeach,
  FaWineBottle,
  FaMusic,
  FaHotTub,
  FaUmbrella,
  FaShoppingCart,
  FaBuilding,
  FaBicycle,
  FaWater,
  FaParking,
  FaBabyCarriage,
  FaLuggageCart,
} from 'react-icons/fa';
import { GrLocation, GrCurrency } from 'react-icons/gr';
import {
  GiMeal,
  GiBeachBucket,
  GiSnorkel,
  GiDivingHelmet,
  GiCanoe,
  GiFishing,
  GiObservatory,
  GiSteam,
  GiSaloon,
  GiNewspaper,
} from 'react-icons/gi';
import {
  BsBook,
  BsStarFill,
  BsTrophy,
  BsPerson,
  BsArrowRight,
  BsLockFill,
  BsArrowLeftRight,
} from 'react-icons/bs';
import { RiPlantFill, RiBilliardsFill } from 'react-icons/ri';
import {
  MdExitToApp,
  MdEmail,
  MdLocalLaundryService,
  MdSecurity,
  MdPool,
} from 'react-icons/md';
import { ImBook } from 'react-icons/im';
import { CgGym } from 'react-icons/cg';
import cert from '../assests/Quiz/cert.png';
import countriess from '../assests/Quiz/18count.png';
import islandIcon from '../assests/Quiz/islandIcon.png';
import logo from '../assests/Quiz/logo.png';
import logotitle from '../assests/Quiz/logot.png';
import celeb1 from '../assests/Quiz/celeb1.JPG';
import celeb2 from '../assests/Quiz/celeb2.JPG';
import celeb3 from '../assests/Quiz/celeb3.JPG';
import celeb4 from '../assests/Quiz/celeb4.JPG';
import insta from '../assests/Quiz/int.png';
import instaf from '../assests/Quiz/intf.png';
import yesl from '../assests/Quiz/yyes.png';
import nol from '../assests/Quiz/nno.png';
import njoy from '../assests/Quiz/njoyy.png';
import male from '../assests/Quiz/male.png';
import female from '../assests/Quiz/female.png';
import craft from '../assests/Quiz/craft.png';
import exploref from '../assests/Quiz/exploref.png';
import destearth from '../assests/Quiz/destearth.png';
import malisland from '../assests/Quiz/malisland.png';
import maltext from '../assests/Quiz/maltext.png';
import malres1 from '../assests/Quiz/malres1.png';
import malres2 from '../assests/Quiz/malres2.png';
import fuzi1 from '../assests/Quiz/fuzi1.jpg';
import fuzi2 from '../assests/Quiz/fuzi2.jpg';
import fuzi3 from '../assests/Quiz/fuzi3.png';
import fuzi4 from '../assests/Quiz/fuzi4.png';
import oblu1 from '../assests/Quiz/oblu1.jpg';
import oblu2 from '../assests/Quiz/oblu2.jpg';
import oblu3 from '../assests/Quiz/oblu3.png';
import oblu4 from '../assests/Quiz/oblu4.jpg';
import fuzimaltext from '../assests/Quiz/fuzimaltext.png';
import oblumaltext from '../assests/Quiz/oblumaltext.png';
// import Sort from './Question';
import { firedb } from '../firebase';
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
import quiz1 from '../assests/Quiz/quiz1.png';
import moment from 'moment';
import parse from 'html-react-parser';
// import quiz2 from '../assests/Quiz/quiz2.png';
// import quiz3 from '../assests/Quiz/quiz3.png';
// import quiz4 from '../assests/Quiz/quiz4.png';
// import quiz5 from '../assests/Quiz/quiz5.png';
// import quiz6 from '../assests/Quiz/quiz6.png';
// import quiz7 from '../assests/Quiz/quiz7.png';
// import quiz8 from '../assests/Quiz/quiz8.png';

const Quiz = () => {
  const isMounted = useRef(false);
  const [step, setStep] = useState(1);
  const [store, setStore] = useState('');
  const [lucky, setLucky] = useState('');
  const [user, setUser] = useState({
    name: '',
    email: '',
    phone: '',
    gender: '',
    opting: '',
  });
  const { name, email, phone, gender, opting } = user;
  const [nextQuiz, setNextQuiz] = useState('');
  const [questionBank, setQuestionBank] = useState([]);
  // const [questionBank, setQuestionBank] = useState(
  //   Sort.sort((a, b) => a.randomQuiz - b.randomQuiz)
  // );
  const [counter, setCounter] = useState('');
  const [correct, setCorrect] = useState(0);
  const [start, setStart] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [exist, setExist] = useState(false);
  const [openExistModal, setOpenExistModal] = useState(false);
  const [openShareModal, setOpenShareModal] = useState(false);
  const [openResortModal, setOpenResortModal] = useState(false);
  const [openResortModalImg, setOpenResortModalImg] = useState(false);
  const [openReq, setOpenReq] = useState(false);
  const shareUrl = 'https://www.touron.in/quiz-win-prize';
  var nTime;
  var cTime;
  const [resort, setResort] = useState('');
  const [resortName, setResortName] = useState('');
  const [resortDetails, setResortDetails] = useState('');
  const [resortStep, setResortStep] = useState('About');
  const [resortImgs, setResortImgs] = useState('');
  const [showLuck, setShowLuck] = useState('');

  // console.log('resortDetails', resortDetails);

  const getLuckData = () => {
    firedb.ref('luckySeat').on('value', (data) => {
      if (isMounted.current) {
        data.forEach((d) => {
          setShowLuck(d.val());
        });
      }
    });
  };

  useEffect(() => {
    isMounted.current = true;
    getLuckData();
    return () => (isMounted.current = false);
  }, []);

  let resorts = ['Maldives'];

  const amenities = [
    {
      name: 'Beachfront',
      icon: <FaUmbrellaBeach className='ami_class_icon' />,
    },

    {
      name: 'Garden',
      icon: <RiPlantFill className='ami_class_icon' />,
    },
    {
      name: 'Bar',
      icon: <FaWineBottle className='ami_class_icon' />,
    },
    {
      name: 'Restaurent',
      icon: <BiRestaurant className='ami_class_icon' />,
    },
    {
      name: 'Live Music',
      icon: <FaMusic className='ami_class_icon' />,
    },
    {
      name: 'Movie Nights',
      icon: <BiCameraMovie className='ami_class_icon' />,
    },
    {
      name: 'Tennis',
      icon: <BiTennisBall className='ami_class_icon' />,
    },
    {
      name: 'Water Sports',
      icon: <FaWater className='ami_class_icon' />,
    },
    {
      name: 'Snorkling',
      icon: <GiSnorkel className='ami_class_icon' />,
    },
    {
      name: 'Diving',
      icon: <GiDivingHelmet className='ami_class_icon' />,
    },
    {
      name: 'Canoeing',
      icon: <GiCanoe className='ami_class_icon' />,
    },
    {
      name: 'Billards',
      icon: <RiBilliardsFill className='ami_class_icon' />,
    },
    {
      name: 'Fishing',
      icon: <GiFishing className='ami_class_icon' />,
    },
    {
      name: 'House Keeping',
      icon: <GiObservatory className='ami_class_icon' />,
    },
    {
      name: 'Laundry',
      icon: <MdLocalLaundryService className='ami_class_icon' />,
    },
    {
      name: 'Massage',
      icon: <BiSleepy className='ami_class_icon' />,
    },
    {
      name: 'Hot Tub',
      icon: <FaHotTub className='ami_class_icon' />,
    },
    {
      name: 'Gym',
      icon: <CgGym className='ami_class_icon' />,
    },
    {
      name: 'Security',
      icon: <MdSecurity className='ami_class_icon' />,
    },
    {
      name: 'Steam Room',
      icon: <GiSteam className='ami_class_icon' />,
    },

    {
      name: 'Umbrella',
      icon: <FaUmbrella className='ami_class_icon' />,
    },
    {
      name: 'Snack Bar',
      icon: <BiFoodMenu className='ami_class_icon' />,
    },
    {
      name: 'Shops',
      icon: <FaShoppingCart className='ami_class_icon' />,
    },
    {
      name: 'Saloon',
      icon: <GiSaloon className='ami_class_icon' />,
    },
    {
      name: 'Newspaper',
      icon: <GiNewspaper className='ami_class_icon' />,
    },
    {
      name: 'Luggage Storage',
      icon: <FaLuggageCart className='ami_class_icon' />,
    },
    {
      name: 'Currency Exchange',
      icon: <GrCurrency className='ami_class_icon' />,
    },
    {
      name: 'Kids Play Area',
      icon: <FaParking className='ami_class_icon' />,
    },
    {
      name: 'Baby Sitting',
      icon: <FaBabyCarriage className='ami_class_icon' />,
    },
    {
      name: 'Outdoor Furniture',
      icon: <BiTable className='ami_class_icon' />,
    },
    {
      name: 'Terrace',
      icon: <FaBuilding className='ami_class_icon' />,
    },
    {
      name: 'Cycling',
      icon: <FaBicycle className='ami_class_icon' />,
    },
    {
      name: 'Swimming Pool',
      icon: <MdPool className='ami_class_icon' />,
    },
    {
      name: 'Private Beach Area',
      icon: <GiBeachBucket className='ami_class_icon' />,
    },
  ];

  const renderIcon = () => {
    const amen = amenities.filter((a) => {
      return resortDetails.resortFeatures.includes(a.name);
    });
    return amen;
  };

  const submitForm = () => {
    let end = new Date();
    firedb
      .ref('saudiquiz')
      .push({
        name,
        email,
        phone,
        gender,
        opting,
        seconds: (end - start) / 1000,
        correct,
        date: new Date().toLocaleDateString(),
      })
      .then(() => {
        setStore('');
        setLucky('');
        setCorrect(0);
        setStep(1);
        setUser({
          name: '',
          email: '',
          phone: '',
          gender: '',
          opting: '',
        });
        setOpenModal(true);
      })
      .catch((error) => console.log('error', error));
  };

  useEffect(() => {
    nTime = setTimeout(() => {
      if (nextQuiz < questionBank.length - 1) {
        setNextQuiz((prevQuiz) => prevQuiz + 1);
        setCounter(10);
      }
    }, 10000);
    return () => {
      clearTimeout(nTime);
    };
  }, [nextQuiz]);

  useEffect(() => {
    cTime = setTimeout(() => {
      if (counter >= 1) {
        setCounter(counter - 1);
        if (nextQuiz + 1 == questionBank.length && counter == 1) {
          submitForm();
        }
      }
    }, 1000);
    return () => {
      clearTimeout(cTime);
    };
  }, [counter]);

  const getQns = () => {
    let finalQns = [];
    firedb.ref('saudiquizqns').on('value', (data) => {
      if (isMounted.current) {
        data.forEach((d) => {
          finalQns.push({
            qno: d.val().qno,
            questionText: d.val().questionText,
            answerOptions: d.val().answerOptions,
            answerCorrect: d.val().answerCorrect,
            randomQuiz: Math.random(),
          });
        });
      }
      if (finalQns.length == 5) {
        setQuestionBank(finalQns.sort((a, b) => a.randomQuiz - b.randomQuiz));
      }
      // if (finalQns.length == 20) {
      //   setQuestionBank(
      //     finalQns.sort((a, b) => a.randomQuiz - b.randomQuiz).slice(0, 10)
      //   );
      // }
    });
  };

  useEffect(() => {
    isMounted.current = true;
    getQns();
    return () => (isMounted.current = false);
  }, []);

  const getData = () => {
    let quizdataEmail = [];
    let quizdataPhone = [];
    firedb.ref('saudiquiz').on('value', (data) => {
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

  const getResort = () => {
    firedb.ref('resorts').on('value', (data) => {
      if (isMounted.current) {
        data.forEach((d) => {
          if (d.val().resortName == resortName) {
            setResortDetails(d.val());
          }
        });
      }
    });
  };

  useEffect(() => {
    isMounted.current = true;
    getResort();
    return () => (isMounted.current = false);
  }, [resortName]);

  const renderPage = () => {
    switch (step) {
      case 1:
        return (
          <div className='quizPg0'>
            <div className='aniLogo'>
              <img src={logo} alt='logo' />
            </div>
            <div className='aniLogoTitle'>
              <img src={logotitle} alt='logotitle' />
            </div>
            <div className='quizArrowMain0' onClick={() => setStep(step + 1)}>
              <BsArrowRight className='quizArrow2' />
            </div>
          </div>
        );
      case 2:
        return (
          <div className='quizPg1'>
            <div className='quizTitle1'>Hello</div>
            <div className='quizTitle2'>traveller</div>
            <div className='quizVertLine1' />
            <div className='quizArrowMain1' onClick={() => setStep(step + 1)}>
              <BsArrowRight className='quizArrow1' />
            </div>
          </div>
        );
      case 3:
        return (
          <div className='quizPg8'>
            <div className='letsBeginName'>
              <div className='letsName'>Let's travel..</div>
              <div className='beginName'>The new beginning</div>
            </div>
            {showLuck == 'on' && (
              <Link to='/lucky-seat' className='njoyBtnLink'>
                <p className='Pvr_lucky_button'>PVR Lucky Seats</p>
              </Link>
            )}
            <div
              className='letsBeginRes'
              onClick={() => {
                setStore('Resort');
                setStep(13);
              }}>
              <p className='letsBeginRespara'>Offer Crafted here</p>
              <img className='letsBeginRescraftImg' src={craft} alt='craft' />
            </div>
            <div className='quizPg2SubM'>
              <div className='quizPg2Sub'>
                <div className='quizPg2SubL'>
                  <div
                    className={store == 'Store' ? 'Storequizz' : 'Storequiz'}
                    onClick={() => setStore('Store')}>
                    <FaStoreAlt
                      className={store == 'Store' ? 'storeIconn' : 'storeIcon'}
                    />
                    <div
                      className={store == 'Store' ? 'storeNamee' : 'storeName'}>
                      Store
                    </div>
                  </div>
                  <div className='knowaboutp'>
                    <p className='knowaboutq'>Know about us in 6 Pages</p>
                    <BsBook className='knowabouti' />
                  </div>
                </div>
                <div className='quizVertLine2' />
                <div className='quizPg2SubLB'>
                  <div
                    className={
                      store == 'Contest' ? 'Contestquizz' : 'Contestquiz'
                    }
                    onClick={() => setStore('Contest')}>
                    <BsTrophy
                      className={
                        store == 'Contest' ? 'contestIconn' : 'contestIcon'
                      }
                    />
                    <div
                      className={
                        store == 'Contest' ? 'contestNamee' : 'contestName'
                      }>
                      Contest
                    </div>
                  </div>
                  <div className='win2nights'>
                    <p className='win2nightsq'>
                      Win 2 Nights Stay for Maldives
                    </p>
                    <img
                      src={islandIcon}
                      alt='islandIcon'
                      className='win2nightsi'
                    />
                  </div>
                </div>
              </div>
              <div
                className='quizArrowMain2'
                onClick={() => {
                  if (store == 'Store') {
                    setStep(step + 1);
                  }
                  if (store == 'Contest') {
                    setStep(10);
                  }
                }}>
                <BsArrowRight className='quizArrow2' />
              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className='quizPg2'>
            <div className='kuttyPara'>
              <p className='kuttyPara1'>Kutty brief about us..</p>
              <p className='kuttyPara2'>
                We are India's 1st tour planning company. Here we make you
                understand the destination before you plan and make sure you're
                spending your money at right spot.
              </p>
              <p className='kuttyPara2'>
                No more necessity to travel in the packages which is not
                suitable for your preferences
              </p>
              <p className='kuttyPara2'>Have a new beginning with us!</p>
            </div>
            <div className='quizVertLine3' />
            <div className='quizArrowMain3' onClick={() => setStep(step + 1)}>
              <BsArrowRight className='quizArrow3' />
            </div>
          </div>
        );
      case 5:
        return (
          <div className='quizPg11'>
            <div className='certtImg'>
              <img src={cert} alt='cert' />
            </div>
            <div className='quizPg4Main'>
              <img src={countriess} alt='18countries' className='countImg' />
              <div className='quizVertLine3' />
              <div className='quizArrowMain2' onClick={() => setStep(step + 1)}>
                <BsArrowRight className='quizArrow2' />
              </div>
            </div>
          </div>
        );
      case 6:
        return (
          <div className='quizPg2'>
            <div className='catQuizz'>
              <div>
                <p>Categories</p>
                <p>Covered</p>
              </div>
              <ImBook className='catQuizzIcon' />
            </div>
            <div className='catQuizz1'>
              <div className='catQuizz1Sub'>
                <div className='catQuizz1SubI'>
                  <div>
                    <BsStarFill className='catQuizStar' />
                    <BsStarFill className='catQuizStar' />
                  </div>
                  <p>International</p>
                </div>
                <div className='catQuizz1SubC'>
                  <div>
                    <BsStarFill className='catQuizStar' />
                    <BsStarFill className='catQuizStar' />
                  </div>
                  <p>Cruise Ships</p>
                </div>
                <div className='catQuizz1SubF'>
                  <div>
                    <BsStarFill className='catQuizStar' />
                    <BsStarFill className='catQuizStar' />
                  </div>
                  <p>Family</p>
                </div>
              </div>
              <div className='quizVertLine4' />
              <div className='catQuizz1Sub'>
                <div className='catQuizz1SubIn'>
                  <div>
                    <BsStarFill className='catQuizStar' />
                    <BsStarFill className='catQuizStar' />
                  </div>
                  <p>India</p>
                </div>
                <div className='catQuizz1SubW'>
                  <div>
                    <BsStarFill className='catQuizStar' />
                    <BsStarFill className='catQuizStar' />
                  </div>
                  <p>Wildlife</p>
                </div>
                <div className='catQuizz1SubH'>
                  <div>
                    <BsStarFill className='catQuizStar' />
                    <BsStarFill className='catQuizStar' />
                  </div>
                  <p>Honeymoon</p>
                </div>
              </div>
            </div>
            <div className='quizArrowMain2' onClick={() => setStep(step + 1)}>
              <BsArrowRight className='quizArrow2' />
            </div>
          </div>
        );
      case 7:
        return (
          <div className='quizPg2'>
            <div className='celebs'>
              <p>Celeb's who used our Service</p>
              <div className='quizHoriLine' />
            </div>
            <div className='celebsImg__Main'>
              <div>
                <div className='celebsImg'>
                  <img src={celeb1} alt='' />
                </div>
                <div className='celebsImg'>
                  <img src={celeb2} alt='' />
                </div>
              </div>
              <div>
                <div className='celebsImg'>
                  <img src={celeb3} alt='' />
                </div>
                <div className='celebsImg'>
                  <img src={celeb4} alt='' />
                </div>
              </div>
            </div>
            <div className='quizArrowMain2' onClick={() => setStep(step + 1)}>
              <BsArrowRight className='quizArrow2' />
            </div>
          </div>
        );
      case 8:
        return (
          <div className='quizPg8'>
            <div className='instasll'>
              <img src={insta} alt='insta' className='intImgs' />
            </div>
            <div>
              <a
                href='https://www.instagram.com/touronholidays/'
                target='_blank'
                rel='noopener noreferrer'>
                <img src={instaf} alt='instf' className='instafImg' />
              </a>
            </div>
            <div className='quizArrowMain2' onClick={() => setStep(step + 1)}>
              <BsArrowRight className='quizArrow2' />
            </div>
          </div>
        );
      case 9:
        return (
          <div className='quizPg8'>
            <div className='celebss'>
              <p>Willing to opt for the Lucky Draw ?</p>
              <div className='quizHoriLine' />
            </div>
            <div className='yesnoQM'>
              <div className='yesnoQ'>
                <div
                  className={lucky == 'yes' ? 'yesnoQRR' : 'yesnoQR'}
                  onClick={() => setLucky('yes')}>
                  <img src={yesl} alt='yesl' />
                </div>
                <div className='quizVertLine4' />
                <div
                  className={lucky == 'no' ? 'yesnoQRNN' : 'yesnoQRN'}
                  onClick={() => setLucky('no')}>
                  <img src={nol} alt='nol' />
                </div>
              </div>
              <div
                className='quizArrowMain2'
                onClick={() => {
                  if (lucky == 'yes') {
                    setStep(step + 1);
                  }
                  if (lucky == 'no') {
                    setStep(step + 2);
                  }
                }}>
                <BsArrowRight className='quizArrow2' />
              </div>
            </div>
          </div>
        );
      case 10:
        return (
          <div className='quizPg9Main'>
            <div className='quizPg9'>
              <div>
                <p className='luckyHello'>Hello Traveller!</p>
                <p className='luckyHelloIn'>
                  This information will help us to connect with you if you're
                  winning the lucky draw
                </p>
              </div>
              <div>
                <div className='luckyyInputMa'>
                  <input
                    type='text'
                    className='luckyyInput'
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
                  <BsPerson className='luckydrawIcon' />
                </div>
                <div className='luckyyInputMa'>
                  <input
                    type='email'
                    className='luckyyInput'
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
                  <MdEmail className='luckydrawIcon' />
                </div>
                <div className='luckyyInputMa'>
                  <input
                    type='number'
                    className='luckyyInput'
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
                  <FaMobileAlt className='luckydrawIcon' />
                </div>
              </div>
              <div className='genderLucky'>
                <div className='genderLuckySub1'>
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
                <div className='genderLuckySub1'>
                  <p>Male</p>
                  <div
                    className={gender == 'male' ? 'meeimgg' : 'meeimg'}
                    onClick={() => {
                      setUser({
                        ...user,
                        gender: 'male',
                      });
                      setOpenReq(false);
                    }}>
                    <img src={male} alt='male' />
                  </div>
                </div>
                <div className='genderLuckySub111'>
                  <p>I'm Opting for</p>
                  <div className='genderLuckySub11M'>
                    <div
                      className='genderLuckySub11'
                      onClick={() => {
                        setUser({
                          ...user,
                          opting: 'Offer Updates',
                        });
                        setOpenReq(false);
                      }}>
                      <div
                        className={
                          opting == 'Offer Updates'
                            ? 'LuckyCirclee'
                            : 'LuckyCircle'
                        }
                      />
                      <p>Offer Updates</p>
                    </div>
                    <div
                      className='genderLuckySub11'
                      onClick={() => {
                        setUser({
                          ...user,
                          opting: 'Product Knowledge',
                        });
                        setOpenReq(false);
                      }}>
                      <div
                        className={
                          opting == 'Product Knowledge'
                            ? 'LuckyCirclee'
                            : 'LuckyCircle'
                        }
                      />
                      <p>Product Knowledge</p>
                    </div>
                    <div
                      className='genderLuckySub11'
                      onClick={() => {
                        setUser({
                          ...user,
                          opting: 'WhatApp Only',
                        });
                        setOpenReq(false);
                      }}>
                      <div
                        className={
                          opting == 'WhatApp Only'
                            ? 'LuckyCirclee'
                            : 'LuckyCircle'
                        }
                      />
                      <p>WhatApp Only</p>
                    </div>
                  </div>
                </div>
              </div>
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
                      setStep(step + 2);
                      setStart(new Date());
                      setNextQuiz(0);
                      setCounter(10);
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
      case 11:
        return (
          <div className='quizPg8'>
            <div>
              <img src={njoy} alt='njoy' className='njoyyImg' />
            </div>
            <Link to='/' className='njoyBtnLink'>
              <button className='njoyBtn'>
                Click here to Visit our Website
              </button>
            </Link>
          </div>
        );
      case 12:
        return (
          <div className='quizPg1'>
            <div className='quizImggg'>
              <img src={quiz1} alt='imgQuiz' />
            </div>
            <div className='quizQuestionOut'>
              <p>
                Question {nextQuiz + 1} out of {questionBank.length}
              </p>
            </div>
            <div className='quizQuestion'>
              <p>{questionBank[nextQuiz].questionText}</p>
            </div>
            {questionBank[nextQuiz].answerOptions.map((q, i) => {
              return (
                <button
                  key={i}
                  className='quizAnswers'
                  onClick={() => {
                    if (nextQuiz < questionBank.length - 1) {
                      setNextQuiz(nextQuiz + 1);
                    }
                    setCounter(10);
                    q == questionBank[nextQuiz].answerCorrect &&
                      setCorrect(correct + 1);
                    if (nextQuiz + 1 == questionBank.length) {
                      setCounter(0);
                      submitForm();
                    }
                  }}>
                  {q}
                </button>
              );
            })}
          </div>
        );
      case 13:
        return (
          <div className='quizPg8'>
            <div>
              <p className='quixExplorePara1'>
                Explore the Beauty of Journey here..
              </p>
              <p className='quixExplorePara2'>Travel is magical here</p>
            </div>
            <img className='quixExploreImg' src={exploref} alt='exploref' />
            <button
              className='quixExploreBtn'
              onClick={() => setStep(step + 1)}>
              <p className='quixExploreBtnTxt1'>{'>>>'}</p>
              <p className='quixExploreBtnTxt2'>Click to explore our Offers</p>
            </button>
          </div>
        );
      case 14:
        return (
          <div className='quizPg8'>
            <div>
              <p className='quixDestniPara1'>
                Offer around the best destination..
              </p>
              <p className='quixDestniPara2'>
                Incredible Sale for Incredible People
              </p>
            </div>
            <img className='quixDestniImg' src={destearth} alt='destearth' />
            <button
              className='quixDestniBtn'
              onClick={() => setOpenResortModal(true)}>
              <p className='quixDestniBtnTxt1'>{'>>>'}</p>
              <p className='quixDestniBtnTxt2'>Select the destination</p>
            </button>
          </div>
        );
      case 15:
        return (
          <div className='quizPg8'>
            <img className='quizMaldImg' src={malisland} alt='malisland' />
            <div className='malTextMains'>
              <img className='malTextImg' src={maltext} alt='maltext' />
              <p className='malTextpara1'>
                It’s no secret that the Maldives is one of the most beautiful
                places on earth. If you’ve been, you know exactly how magical it
                is to be surrounded by nothing but crystal-blue water and
                velvety, white sand. But if you haven’t been…
              </p>
              <p className='malTextpara2'>
                Well, we can’t stop you from going! Explore our unmatchable
                offers with beautiful resorts just for few days!{' '}
              </p>
            </div>
            <div className='malMain2Img'>
              <div
                className='malMain2Subb'
                onClick={() => {
                  setResort('fuzi');
                  setStep(step + 1);
                }}>
                <img src={malres1} alt='malres1' className='malres1Text1' />
                <div className='malIslandsss'>
                  <img src={fuzi1} alt='fuzi' />
                </div>
              </div>
              <div
                className='malMain2Subb'
                onClick={() => {
                  setResort('oblu');
                  setStep(step + 1);
                }}>
                <img src={malres2} alt='malres2' className='malres2Text2' />
                <div className='malIslandsss'>
                  <img src={oblu1} alt='oblu' />
                </div>
              </div>
            </div>
          </div>
        );
      case 16:
        return (
          <div>
            {resort == 'fuzi' ? (
              <>
                <div className='islandssMainDeta'>
                  <img src={fuzi2} alt='fuzi2' />
                </div>
                <div className='fuzimaltextMaain'>
                  <img
                    src={fuzimaltext}
                    alt='fuzimaltext'
                    className='fuzimaltextImg'
                  />
                  <p className='fuzimaltextImgPara'>
                    Merging Maldivian design and architecture with modern
                    aesthetics, Fushifaru Maldives’ beach and water villas exude
                    a sense of cosiness yet luxurious in space and amenities.
                  </p>
                  <div className='fuziiImgssMainn'>
                    <div>
                      <img
                        src={fuzi3}
                        alt='fuzi3'
                        className='fuziiImgss'
                        onClick={() => {
                          setOpenResortModalImg(true);
                          setResortImgs(fuzi3);
                        }}
                      />
                    </div>
                    <div>
                      <img
                        src={fuzi4}
                        alt='fuzi4'
                        className='fuziiImgss'
                        onClick={() => {
                          setOpenResortModalImg(true);
                          setResortImgs(fuzi4);
                        }}
                      />
                    </div>
                  </div>
                  <div className='fuziiBtnss'>
                    <a
                      href='https://firebasestorage.googleapis.com/v0/b/touronapp-248e4.appspot.com/o/resorts%2Ffushifaru-wins-3-world-luxury-awards-as-it-min.pdf?alt=media&token=f8417971-bdba-436a-b52d-b6a778f51436'
                      target='_blank'>
                      <button className='fuziiBtnss1'>Factsheet</button>
                    </a>
                    <a href='https://www.fushifaru.com/' target='_blank'>
                      <button className='fuziiBtnss2'>Website</button>
                    </a>
                    <button
                      className='fuziiBtnss3'
                      onClick={() => {
                        setResortName('Fushifaru Maldives');
                        setStep(step + 1);
                      }}>
                      Check Pricing
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className='islandssMainDeta'>
                  <img src={oblu2} alt='oblu2' />
                </div>
                <div className='fuzimaltextMaainn'>
                  <img
                    src={oblumaltext}
                    alt='fuzimaltext'
                    className='oblumaltextImg'
                  />
                  <p className='oblumaltextImgPara'>
                    OBLU XPERIENCE Ailafushi elevates tropical island living
                    through smart services, playful design, and invigorating
                    experiences. A 15-minute speedboat ride from Malé
                    International Airport brings you to Ailafushi island, which
                    means family island in the local dialect of Dhivehi. La
                    Promenade adds a touch of chic with its vibrant retail and
                    café scene, where you can socialise with like-minded souls.
                    Simply Irresistible!
                  </p>
                  <div className='fuziiImgssMainn'>
                    <div>
                      <img
                        src={oblu3}
                        alt='oblu3'
                        className='fuziiImgss'
                        onClick={() => {
                          setOpenResortModalImg(true);
                          setResortImgs(oblu3);
                        }}
                      />
                    </div>
                    <div className='malIslandsss'>
                      <img
                        src={oblu4}
                        alt='oblu4'
                        onClick={() => {
                          setOpenResortModalImg(true);
                          setResortImgs(oblu4);
                        }}
                      />
                    </div>
                  </div>
                  <div className='fuziiBtnss'>
                    <a
                      href='https://firebasestorage.googleapis.com/v0/b/touronapp-248e4.appspot.com/o/resorts%2FOBLU-Xperience-Ailafushi-Factsheet-Aug-2022.pdf?alt=media&token=d287bef4-7bab-4d06-902f-db114ff89c42'
                      target='_blank'>
                      <button className='fuziiBtnss1'>Factsheet</button>
                    </a>
                    <a
                      href='https://www.coloursofoblu.com/oblu-xperience-ailafushi'
                      target='_blank'>
                      <button className='fuziiBtnss2'>Website</button>
                    </a>
                    <button
                      className='fuziiBtnss3'
                      onClick={() => {
                        setResortName('OBLU XPERIENCE Ailafushi');
                        setStep(step + 1);
                      }}>
                      Check Pricing
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        );
      case 17:
        return (
          <div>
            {resortDetails ? (
              <>
                <div className='resort_quiz_Imggg'>
                  <img src={resortDetails.resortImages[0]} alt='resortImg' />
                  <div className='resort_quiz_Imggg_conts'>
                    <div className='resort_rupee_conts_mains'>
                      <FaRupeeSign className='resort_rupee_conts' />
                      <p>{resortDetails.offerPercent}</p>
                    </div>
                    <div className='resort_rupee_conts_mainssss'>
                      <div className='resort_rupee_conts_mainss'>
                        <FaRupeeSign className='resort_rupee_contss' />
                        <p>{resortDetails.cost}* / per couple</p>
                      </div>
                      <button>Book now</button>
                    </div>
                  </div>
                </div>
                <div className='resort_d_conts'>
                  <div>
                    {new Array(parseInt(resortDetails.ratings))
                      .fill('1')
                      .map((c, i) => {
                        return <FaStar className='resort_d_conts_star' />;
                      })}
                  </div>
                  <div>
                    <p className='resort_d_conts_star_name'>
                      {resortDetails.resortName}
                    </p>
                  </div>
                  <div className='resort_d_conts_star_loc'>
                    <GrLocation className='resort_d_conts_star_loc_icon' />
                    <p>
                      {resortDetails.countryName}, {resortDetails.cityName}
                    </p>
                  </div>
                  <div>
                    <p className='resort_d_conts_star_cat'>
                      {resortDetails.resortCategory[0]?.days}N{' '}
                      {resortDetails.resortCategory[0]?.categoryName}
                      {resortDetails.resortCategory?.length > 1 && (
                        <>
                          {' + '}
                          {resortDetails.resortCategory[1]?.days}N{' '}
                          {resortDetails.resortCategory[1]?.categoryName}
                        </>
                      )}
                    </p>
                  </div>
                  <div className='resort_d_conts_star_meter'>
                    <p>{resortDetails.loveMeter}%</p>
                    <FaHeart className='resort_d_conts_star_meter_h' />
                    <p>from travellers</p>
                  </div>
                  <div className='resort_d_conts_star_val'>
                    <p className='resort_d_conts_star_val1'>Travel Validity:</p>
                    <p className='resort_d_conts_star_val2'>
                      {moment(resortDetails.stayFrom).format('Do MMM YY')} -
                      {moment(resortDetails.stayTill).format('Do MMM YY')}
                    </p>
                  </div>
                </div>
                <div className='resort_d_list_mainss'>
                  <p
                    onClick={() => setResortStep('About')}
                    className={
                      resortStep == 'About'
                        ? 'resort_d_list_mainssn'
                        : 'resort_d_list_mainsss'
                    }>
                    About
                  </p>
                  <p
                    onClick={() => setResortStep('Inclusion')}
                    className={
                      resortStep == 'Inclusion'
                        ? 'resort_d_list_mainssn'
                        : 'resort_d_list_mainsss'
                    }>
                    Inclusion
                  </p>
                  <p
                    onClick={() => setResortStep('Amenities')}
                    className={
                      resortStep == 'Amenities'
                        ? 'resort_d_list_mainssn'
                        : 'resort_d_list_mainsss'
                    }>
                    Amenities
                  </p>
                  <p
                    onClick={() => setResortStep('Highlights')}
                    className={
                      resortStep == 'Highlights'
                        ? 'resort_d_list_mainssn'
                        : 'resort_d_list_mainsss'
                    }>
                    Highlights
                  </p>
                </div>
                <div>{renderResort()}</div>
              </>
            ) : (
              <div>Just a Sec...</div>
            )}
          </div>
        );
      default:
        setStep(1);
    }
  };

  const renderResort = () => {
    switch (resortStep) {
      case 'About':
        return (
          <div className='resort_about_img_mainn'>
            <div className='resort_about_img_main'>
              <div className='resort_about_img'>
                {resortDetails.resortImages.map((resortImge, i) => {
                  return <img src={resortImge} alt='resortImg' />;
                })}
              </div>
            </div>
            <div className='resort_about_img_main2'>
              <p>{parse(resortDetails.overview)}</p>
            </div>
          </div>
        );
      case 'Inclusion':
        return (
          <div className='resort_about_img_mainn'>
            <div className='resort_about_img_mainnnn'>
              {resortDetails.resortCategory.map((r, i) => {
                return (
                  <div className='resort_about_img_catImgmm'>
                    <div className='resort_about_img_catImg'>
                      <img src={r.image} />
                    </div>
                    <div>
                      <p className='resort_cat_nameee'>{r.categoryName}</p>
                      <div className='resort_cat_nameee1'>
                        <GiMeal />
                        <p>{r.mealPlan}</p>
                      </div>
                      <div className='resort_cat_nameee1'>
                        <FaPlane />
                        <p>{r.transferType}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className='resort_cat_nameeepara'>
              <p>{parse(resortDetails?.inclusion)}</p>
            </div>
          </div>
        );
      case 'Amenities':
        return (
          <div className='resort_about_img_mainn'>
            <div className='ami_resort_iconsss_mains'>
              {renderIcon().map((r, i) => {
                return (
                  <div className='ami_resort_iconsss'>
                    <div>{r.icon}</div>
                    <p>{r.name}</p>
                  </div>
                );
              })}
            </div>
          </div>
        );
      case 'Highlights':
        return (
          <div className='resort_about_img_mainn'>
            <div className='resort_about_img_mainn_high'>
              <div className='resort_about_img_mainn_keyn'>
                <button className='resort_about_img_mainn_keyn_btn'>
                  Key Notes
                </button>
                <p>{parse(resortDetails.finePrint)}</p>
              </div>
              <div className='resort_about_img_mainn_rest'>
                <button className='resort_about_img_mainn_rest_btn'>
                  Restaurants
                </button>
                <div className='resort_about_img_mainn_rest_mpara'>
                  {resortDetails.restaurants?.map((r, i) => {
                    return (
                      <div className='resort_about_img_mainn_rest_mpara_sub'>
                        <p className='resort_about_img_mainn_rest_mpara1'>
                          {r?.name}
                        </p>
                        <p>Cuisine : {r?.cuisine}</p>
                        <p>Menu : {r?.menu}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className='resort_about_img_mainn_rules'>
                <button className='resort_about_img_mainn_rules_btn'>
                  Rules
                </button>
                <div className='resort_about_img_mainn_rules_sub'>
                  <div className='resort_about_img_mainn_rules_sub1'>
                    <p className='resort_about_img_mainn_rules_sub_p1'>
                      {resortDetails.resortRules.checkIn}
                    </p>
                    <p>Check In</p>
                  </div>
                  <BsArrowLeftRight />
                  <div className='resort_about_img_mainn_rules_sub1'>
                    <p className='resort_about_img_mainn_rules_sub_p1'>
                      {resortDetails.resortRules.checkOut}
                    </p>
                    <p>Check Out</p>
                  </div>
                </div>
              </div>
              <div className='resort_about_img_mainn_cancel'>
                <button className='resort_about_img_mainn_cancel_btn'>
                  Cancellation Policy
                </button>
                <p>{parse(resortDetails.resortRules.cancellationPolicy)}</p>
              </div>
            </div>
          </div>
        );
      default:
        setResortStep('About');
    }
  };

  return (
    <div className='AllMainss'>
      {step !== 1 && step !== 2 && step !== 12 ? (
        <div className='quizSendMainD'>
          <MdExitToApp
            className='prevquiz'
            onClick={() => {
              if (step == 11) {
                setStep(step - 2);
              } else if (step == 10 && store == 'Contest') {
                setStep(3);
              } else if (step == 13) {
                setStep(3);
              } else {
                setStep(step - 1);
              }
            }}
          />
          <FiSend
            className='quizSend'
            onClick={() => setOpenShareModal(true)}
          />
        </div>
      ) : null}
      {step == 12 && (
        <div className='quizSendMainDD'>
          <div className='countQuizz'>
            <p>{counter}</p>
          </div>
        </div>
      )}
      {openModal && (
        <div className='quizPopup'>
          <div className='quizPopup_content'>
            <div
              className='quizPopup__content-close'
              onClick={() => setOpenModal(false)}>
              &times;
            </div>
            <p className='quizPopup_para'>Thanks for participating the Quiz</p>
            <Link to='/' className='njoyBtnLink'>
              <button className='quizPopup_btn'>Visit our Website</button>
            </Link>
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
              <TwitterShareButton url={shareUrl} title='tourOn Quiz, Win prize'>
                <TwitterIcon size={40} round={true} />
              </TwitterShareButton>
            </div>
          </div>
        </div>
      )}
      {openResortModal && (
        <div className='quizPopup'>
          <div className='quizPopup_contentResort'>
            <div
              className='quizPopup__content-closeShare'
              onClick={() => setOpenResortModal(false)}>
              &times;
            </div>
            <div className='quizPopup__content-ResortShare'>
              {resorts.map((resort) => {
                return (
                  <button
                    className='quizPopup__content-ResortShareBtn'
                    onClick={() => {
                      setStep(15);
                      setOpenResortModal(false);
                    }}>
                    {resort}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
      {openResortModalImg && (
        <div className='quizPopup'>
          <div className='quizPopup_contentResortImg'>
            <div
              className='quizPopup__content-closeShare'
              onClick={() => setOpenResortModalImg(false)}>
              &times;
            </div>
            <img src={resortImgs} className='resort_view_imgsss' />
          </div>
        </div>
      )}
      <div className='mainQuiz'>{renderPage()}</div>
    </div>
  );
};

export default Quiz;
