import React, { useState, useEffect, useContext } from 'react';
import TourHeader from '../Reusable components/TourHeader';
import Travellertype from '../Reusable components/Travellertype';
import Touristnumber from '../Reusable components/Touristnumber';
import Travelmode from '../Reusable components/Travelmode';
import TouristDate from '../Reusable components/TouristDate';
import Checkout from '../Reusable components/Checkout';
import Modals from '../Modal';
import Modal from 'react-modal';
import { AiFillCloseCircle } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../../Login components/auth';
import { ApiContext } from '../../Context/ApiContext';
import { firedb } from '../../firebase';
import Ack from '../../assests/1.png';
import Destination from './../Reusable components/Destination';
import NationalPark from './../Reusable components/NationalPark';
import {
  getExpoToken,
  sendEmail,
  sendPushNotification,
} from './../../Login components/PushNotification';
import Navbar from '../../Home components/Navbar/Navbar';
import Footer from '../../Home components/Footer/Footer';
import moment from 'moment';
import Wildlife from '../../assests/Category/Wild.jpg';
import Priority from '../Reusable components/Priority';

const WildlifeTour = () => {
  const { userInfo } = useContext(ApiContext);
  const [preferanece, setPreferanece] = useState('');
  const [destination, setDestination] = useState('');
  const [subLoaded, setSubLoaded] = useState(false);
  // const [number, setNumber] = useState(userInfo.phoneNumber);
  // const [name, setName] = useState(userInfo.name);
  const [number, setNumber] = useState('');
  const [name, setName] = useState('');
  const [travellerType, setTravellerType] = React.useState('');
  const [adult, setAdult] = React.useState(0);
  const [children, setChildren] = React.useState(0);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [travelMode, setTravelMode] = React.useState('');
  const [startPoint, setStartPoint] = useState('');
  const [budget, setBudget] = useState('');
  const [step, setStep] = useState(1);
  const [priority, setPriority] = useState('');
  const [typeee, setTypeee] = useState('Wildlife');

  const [isLoggedin, setIsLoggedin] = useState(false);
  const [nationalPark, setNationalPark] = useState('');

  const { user } = isAuthenticated();

  useEffect(() => {
    if (isAuthenticated()) return setIsLoggedin(true);
  }, []);

  const [modalIsOpen, setIsOpen] = useState(false);
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const [formModalIsOpen, setFormModalOpen] = useState(false);

  const customFormModalStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      // marginRight: "-50%",
      transform: 'translate(-50%, -50%)',
      borderRadius: '20px',
      boxShadow: '1px 3px 1px #9E9E9E',
    },
    overlay: { zIndex: 1000 },
  };

  Modal.setAppElement('#root');

  // const openFormModal = () => {
  //   setFormModalOpen(true);
  // };
  const closeFormModal = () => {
    setFormModalOpen(false);
  };

  const submitData = () => {
    setSubLoaded(true);
    const v = moment().format('L');
    const r = Math.floor((Math.random() + 4) * 345334);
    const req = `TO-${v.slice(3, 5)}${v.slice(0, 2)}${v.slice(8)}-${r}`;

    let values = {
      requestID: req,
      tourCategory: 'Wildlife',
      nationalPark: nationalPark,
      preferanece: preferanece,
      destination: destination,
      travellerType: travellerType,
      adult: adult,
      children: children,
      travelMode: travelMode,
      startPoint: startPoint,
      fromDate: fromDate,
      toDate: toDate,
      name: name,
      number: number,
      budget: budget,
      userID: user.uid,
      status: 'Query Received',
      tourCost: 0,
      requestDate: new Date().toDateString(),
      receivedFrom: 'Website',
      priority: priority,
    };
    firedb
      .ref(`requests`)
      .push(values)
      .then((data) => {
        // openFormModal();
        setSubLoaded(false);
        setStep(9);
        const token = getExpoToken(user.uid);
        sendEmail(user.email, destination, req);
        const message = {
          to: token,
          sound: 'default',
          title: `Query Received`,
          body: `Congratulations! You are one step closer to your dream tour. Your query is under review and tour On will contact you with more details and suggestions. The booking process will start after your confirmation. Please check the My Requests tab for updates.`,
        };
        sendPushNotification(message);
      })
      .catch((err) => console.log('err', err));
  };

  const nextStep = () => {
    if (step === 2 && !isLoggedin) {
      openModal();
      return;
    }

    if (fromDate === '' && toDate === '' && step === 6) {
      return;
    }
    setStep(step + 1);
  };

  const prevStep = () => {
    if (step !== 1) setStep(step - 1);
  };
  const renderForm = (step) => {
    switch (step) {
      case 1:
        return (
          <NationalPark
            nationalPark={nationalPark}
            prevStep={prevStep}
            nextStep={nextStep}
            setNationalPark={(name) => {
              setNationalPark(name);
              setDestination(name);
              setStep(step + 1);
            }}
          />
        );
      case 2:
        return (
          <Travellertype
            imgSrc1={
              'https://image.freepik.com/free-vector/local-tourism-concept_23-2148606915.jpg'
            }
            imgSrc2={
              'https://image.freepik.com/free-vector/big-happy-family-with-flat-design_23-2147834774.jpg'
            }
            imgSrc3={
              'https://image.freepik.com/free-vector/group-happy-students-with-backpacks-books-stand-together_131590-216.jpg'
            }
            imgSrc4={
              'https://image.freepik.com/free-vector/newlywed-couple-is-driving-car-their-honeymoon_3446-291.jpg'
            }
            travellerType={travellerType}
            prevStep={prevStep}
            nextStep={nextStep}
            setStep={setStep}
            setSolo={() => {
              if (isLoggedin) {
                setTravellerType('Solo');
                setStep(4);
              } else {
                openModal();
                return;
              }
            }}
            setFamily={() => {
              setTravellerType('Family');
              nextStep();
            }}
            setFriends={() => {
              setTravellerType('Friends');
              nextStep();
            }}
            setGroup={() => {
              setTravellerType('Group');
              nextStep();
            }}
          />
        );
      case 3:
        return (
          <Touristnumber
            imgSrc1={
              'https://image.freepik.com/free-vector/illustration-with-young-people-concept_23-2148467324.jpg'
            }
            imgSrc2={
              'https://image.freepik.com/free-vector/smiling-boy-girl-kids-holding-hands-childhood-friendship-concept-love-romance-children-cartoon-characters-flat-vector-illustration-isolated-white-background_71593-450.jpg'
            }
            nextStep={nextStep}
            prevStep={prevStep}
            adult={adult}
            children={children}
            setChildren={(value) => setChildren(value)}
            setAdult={(value) => setAdult(value)}
          />
        );
      case 4:
        return (
          <TouristDate
            imgSrc={
              'https://image.freepik.com/free-vector/build-your-program-appointment-booking_23-2148552954.jpg'
            }
            fromDate={fromDate}
            toDate={toDate}
            setFromDate={setFromDate}
            setToDate={setToDate}
            prevStep={prevStep}
            nextStep={nextStep}
            travellerType={travellerType}
            setStep={setStep}
          />
        );
      case 5:
        return (
          <Travelmode
            imgSrc1={
              'https://image.freepik.com/free-vector/train-ride-railroad_1308-11154.jpg'
            }
            imgSrc2={
              'https://image.freepik.com/free-vector/airplane-sky_1308-31202.jpg'
            }
            nextStep={nextStep}
            prevStep={prevStep}
            name1={'Train'}
            name2={'Flight'}
            travelMode={travelMode}
            setTrain={() => {
              setTravelMode('Train');
              setStep(step + 1);
            }}
            setFlight={() => {
              setTravelMode('Flight');
              setStep(step + 1);
            }}
          />
        );

      case 6:
        return (
          <Destination
            imgSrc={
              'https://image.freepik.com/free-vector/destination-concept-illustration_114360-453.jpg'
            }
            destination={destination}
            preferanece={preferanece}
            startPoint={startPoint}
            typeee={typeee}
            nextStep={nextStep}
            prevStep={prevStep}
            setDestination={(value) => setDestination(value)}
            setStartPoint={(value) => setStartPoint(value)}
            setPreferanece={(value) => setPreferanece(value)}
          />
        );
      case 7:
        return (
          <Priority
            priority={priority}
            setPriority={(value) => setPriority(value)}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        );
      case 8:
        return (
          <Checkout
            imgSrc={
              'https://image.freepik.com/free-vector/self-checkout-concept-illustration_114360-2331.jpg'
            }
            setName={(value) => setName(value)}
            setNumber={(value) => setNumber(value)}
            submitData={submitData}
            prevStep={prevStep}
            setBudget={(value) => setBudget(value)}
            name={name}
            number={number}
            budget={budget}
            subLoaded={subLoaded}
            tourCategory={'WildlifeTour'}
          />
        );
      case 9:
        return (
          <div className='ack'>
            <img src={Ack} alt='ackImage' />
            <p>
              "Yay!! You've successfully submitted the query for your Dream
              destination. You better get packing now, 'cause our experts have
              already started working their magic into your plan!"
            </p>
            <p>
              You can check the progress of your query in My Request Section
            </p>
            <Link to='/profile/my-requests'>
              <button>Go to My Request</button>
            </Link>
          </div>
        );
      default:
        break;
    }
  };

  const desc = ` Are you a complete animal lover, have a fondness of forests and love a little rendezvous in to the beauty of nature? Destinations for this tour includes all the National Parks within India.

Come and explore with tour On, India’s amazing National Parks and wildlife sanctuaries which are home to rich flora and fauna. Get up close and personal with nature and leave with a rejuvenation that isn’t found elsewhere. For all the wildlife enthusiasts, we offer you a wide range of experiences and a variety of adrenaline-pumping activities to make your trip all the more adventurous. You can have your pick from the list of activities and destinations and have a magnificent wildlife adventure that you will never forget`;
  return (
    <>
      <Navbar />
      <div className='Surprise_tour-container'>
        <Modals modalIsOpen={modalIsOpen} closeModal={closeModal} />
        <Modal
          isOpen={formModalIsOpen}
          onRequestClose={closeFormModal}
          style={customFormModalStyles}>
          <div className='modal-close'>
            <AiFillCloseCircle size={30} onClick={closeFormModal} />
          </div>

          <div className='tour-info'>
            <h1>Tour Informations</h1>
            <ul className='formModal'>
              <div className='row1'>
                <li>
                  Traveller type:
                  <span> </span>
                  {travellerType}
                </li>
                <li>
                  Adult:
                  <span> </span>
                  {adult}
                </li>
                <li>
                  Children:
                  <span> </span>
                  {children}
                </li>

                <li>
                  Travel mode:
                  <span> </span>
                  {travelMode}
                </li>
                <li>
                  From Date:
                  <span> </span>
                  {fromDate.toString().slice(0, 15)}
                </li>
                <li>
                  To Date:
                  <span> </span>
                  {toDate.toString().slice(0, 15)}
                </li>
              </div>
              <div className='row2'>
                <li>
                  Start point
                  <span> </span>
                  {startPoint}
                </li>
                <li>
                  National Park
                  <span> </span>
                  {nationalPark}
                </li>
                <li>
                  Enter your Name:
                  <span> </span>
                  {name}
                </li>
                <li>
                  Your Budget:
                  <span> </span>
                  {budget}
                </li>
                <li>
                  Whatsapp Number:
                  <span> </span>
                  {number}
                </li>
              </div>
            </ul>
          </div>
          <div className='info-tour-buttons'>
            <Link to='/profile/my-requests'>
              <button className='info-button'>Go to My Dashboard</button>
            </Link>
            <Link to='/'>
              <button className='info-buttons'>Go to Home</button>
            </Link>
          </div>
        </Modal>
        <TourHeader
          image={Wildlife}
          // image={
          // "https://firebasestorage.googleapis.com/v0/b/touronapp-248e4.appspot.com/o/Wildlife.jpg?alt=media&token=37a27124-874c-4fdf-acb4-04e648deb6a6"
          // }
          title={'Wildlife Tour'}
          description={desc}
          className={'Planned-form-container'}
        />
        <div className='Planned-form-container'>
          <div className={'planned_tour-form'}>
            {step === 9 ? null : <h1>Wildlife Tour</h1>}
            <div className='planned_form'>{renderForm(step)}</div>
            {/* {step === 3 || step === 7 || step === 8 ? null : (
              <div className="navigation_btn">
                <>
                  <div className="previous-button" onClick={() => prevStep()}>
                    Previous
                  </div>
                  {step === 8 ? (
                    <div
                      className="submit-button"
                      onClick={() => {
                        submitData();
                      }}
                    >
                      Submit
                    </div>
                  ) : (
                    <div className="next-button" onClick={() => nextStep()}>
                      Next
                    </div>
                  )}
                </>
              </div>
            )} */}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default WildlifeTour;
