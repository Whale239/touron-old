import React, { useState, useEffect } from 'react';
import TourHeader from '../Reusable components/TourHeader';
import './Plannedtour.css';
import Tourtype from '../Reusable components/Tourtype';
import Travellertype from '../Reusable components/Travellertype';
import Travelmode from '../Reusable components/Travelmode';
import Destination from '../Reusable components/Destination';
import Checkout from '../Reusable components/Checkout';
import Touristnumber from '../Reusable components/Touristnumber';
import TouristDate from '../Reusable components/TouristDate';
import { isAuthenticated } from '../../Login components/auth';
import Modals from '../Modal';
import Modal from 'react-modal';
import { AiFillCloseCircle } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { firedb } from '../../firebase';
import { sendEmail } from './../../Login components/PushNotification';
import Navbar from '../../Home components/Navbar/Navbar';
import Footer from '../../Home components/Footer/Footer';
import Ack from '../../assests/1.png';
import moment from 'moment';
import Planned from '../../assests/Category/Plan.jpg';
import Priority from '../Reusable components/Priority';

const PlannedTour = () => {
  const [number, setNumber] = useState('');
  const [name, setName] = useState('');
  const [tourType, setTourType] = useState('');
  const [travellerType, setTravellerType] = useState('');
  const [adult, setAdult] = useState(0);
  const [children, setChildren] = useState(0);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [travelMode, setTravelMode] = useState('');
  const [preferanece, setPreferanece] = useState('');
  const [destination, setDestination] = useState('');
  const [startPoint, setStartPoint] = useState('');
  const [priority, setPriority] = useState('');
  const [budget, setBudget] = useState('');
  const [step, setStep] = useState(1);
  const { user } = isAuthenticated();
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [subLoaded, setSubLoaded] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [formModalIsOpen, setFormModalOpen] = useState(false);
  const customFormModalStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
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

  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }

  const submitData = () => {
    const v = moment().format('L');
    const r = Math.floor((Math.random() + 4) * 345334);
    const req = `TO-${v.slice(3, 5)}${v.slice(0, 2)}${v.slice(8)}-${r}`;

    setSubLoaded(true);
    let values = {
      fromDate: fromDate,
      toDate: toDate,
      tourType: tourType,
      travellerType: travellerType,
      adult: adult,
      children: children,
      travelMode: travelMode,
      preferanece: preferanece,
      requestID: req,
      destination: destination,
      startPoint: startPoint,
      name: name,
      number: number,
      budget: budget,
      status: 'Query Received',
      plans: '',
      reports: '',
      tourCost: 0,
      userID: user.uid,
      tourCategory: 'Planned Tour',
      requestDate: new Date().toDateString(),
      receivedFrom: 'Website',
      priority: priority,
    };

    firedb
      .ref(`requests`)
      .push(values)
      .then((data) => {
        setSubLoaded(false);
        setStep(9);
        sendEmail(user.email, destination, req);
      })

      .catch((err) => console.log('err', err));
  };

  useEffect(() => {
    if (isAuthenticated()) return setIsLoggedin(true);
  }, []);

  const nextStep = () => {
    if (step === 2 && !isLoggedin) {
      openModal();
      return;
    }

    if (fromDate === '' && toDate === '' && step === 5) {
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
          <Tourtype
            tourType={tourType}
            nextStep={nextStep}
            prevStep={prevStep}
            step={step}
            submitData={submitData}
            setTourType={(e) => {
              setTourType(e);
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
            nextStep={nextStep}
            prevStep={prevStep}
            step={step}
            setStep={setStep}
            submitData={submitData}
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
            adult={adult}
            children={children}
            setChildren={(value) => setChildren(value)}
            setAdult={(value) => setAdult(value)}
            prevStep={prevStep}
            step={step}
            submitData={submitData}
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
            nextStep={nextStep}
            prevStep={prevStep}
            step={step}
            submitData={submitData}
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
            nextStep={nextStep}
            prevStep={prevStep}
            step={step}
            submitData={submitData}
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
            tourType={tourType}
            nextStep={nextStep}
            prevStep={prevStep}
            step={step}
            submitData={submitData}
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
            setBudget={(value) => setBudget(value)}
            submitData={submitData}
            prevStep={prevStep}
            name={name}
            number={number}
            budget={budget}
            subLoaded={subLoaded}
            tourType={tourType}
            tourCategory={'PlannedTour'}
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

  const desc = `
This tour is perfect for all busy-bee travel enthusiasts! We personalize the whole
tour itinerary according to your preferences. We offer you a complete list of things to do, places to visit, etc. Then we prepare a plan which is ideal for you, within your budget and according to your travel preferences, making the experience worth every penny!
`;

  return (
    <>
      <Navbar />
      <div className='Planned_tour-container'>
        <Modals modalIsOpen={modalIsOpen} closeModal={closeModal} />
        <div className={'planned_tour-details'}>
          <Modal
            isOpen={formModalIsOpen}
            onRequestClose={closeFormModal}
            style={customFormModalStyles}
            // shouldCloseOnOverlayClick={false}
          >
            <div className='modal-close'>
              <AiFillCloseCircle size={30} onClick={closeFormModal} />
            </div>

            <div className='tour-info'>
              <h1>Tour Informations</h1>
              <ul>
                <li>Tour type:</li>
                <li>{tourType}</li>
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
                  Enter the holiday destination you want to travel:
                  <span> </span>
                  {destination}
                </li>
                <li>
                  From where would you like to start your journey:
                  <span> </span>
                  {startPoint}
                </li>
                <li>
                  Your preferences when you travel:
                  <span> </span>
                  {preferanece}
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
        </div>
        <TourHeader
          image={Planned}
          // image={
          //   "https://firebasestorage.googleapis.com/v0/b/touronapp-248e4.appspot.com/o/Plannedtour.jpg?alt=media&token=ea39d556-5862-4abb-87ff-054cf1c6db43"
          // }
          title={'Planned Tour'}
          description={desc}
          className={'Planned-form-container'}
        />

        <div className='Planned-form-container'>
          <div className={'planned_tour-form'}>
            {step === 9 ? null : <h1>Planned Tour</h1>}
            <div className='planned_form'>{renderForm(step)}</div>
            {/* {step === 3 || step === 6 || step === 7 ? null : (
              <div className="navigation_btn">
                <>
                  <div className="previous-button" onClick={() => prevStep()}>
                    Previous
                  </div>
                  {step === 7 ? (
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

export default PlannedTour;
