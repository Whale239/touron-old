import React, { useState, useEffect, useContext } from 'react';
import TourHeader from '../Reusable components/TourHeader';
import { isAuthenticated } from '../../Login components/auth';
import Modal from 'react-modal';
import Tourtype from '../Reusable components/Tourtype';
import Modals from '../Modal';
import TouristDate from '../Reusable components/TouristDate';
import Checkout from '../Reusable components/Checkout';
import { AiFillCloseCircle } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { firedb } from '../../firebase';
import Travelmode from '../Reusable components/Travelmode';
import { ApiContext } from '../../Context/ApiContext';
import { sendEmail } from './../../Login components/PushNotification';
import Navbar from '../../Home components/Navbar/Navbar';
import Footer from '../../Home components/Footer/Footer';
import Destination from './../Reusable components/Destination';
import Ack from '../../assests/1.png';
import moment from 'moment';
import Honeymoon from '../../assests/Category/Hon.jpg';
import Priority from '../Reusable components/Priority';

const HoneymoonTour = () => {
  const { userInfo } = useContext(ApiContext);
  const [tourType, setTourType] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [travelMode, setTravelMode] = useState('');
  const [preferanece, setPreferanece] = useState('');
  const [destination, setDestination] = useState('');
  const [startPoint, setStartPoint] = useState('');
  const [budget, setBudget] = useState('');
  // const [number, setNumber] = useState(userInfo.phoneNumber);
  // const [name, setName] = useState(userInfo.name);
  const [number, setNumber] = useState('');
  const [name, setName] = useState('');
  const [step, setStep] = useState(1);
  const { user } = isAuthenticated();
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [subLoaded, setSubLoaded] = useState(false);
  const [priority, setPriority] = useState('');

  useEffect(() => {
    if (isAuthenticated()) return setIsLoggedin(true);
  });

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

  const submitData = () => {
    const v = moment().format('L');
    const r = Math.floor((Math.random() + 4) * 345334);
    const req = `TO-${v.slice(3, 5)}${v.slice(0, 2)}${v.slice(8)}-${r}`;

    setSubLoaded(true);
    let values = {
      requestID: req,
      fromDate: fromDate,
      toDate: toDate,
      tourType: tourType,
      travelMode: travelMode,
      preferanece: preferanece,
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
      tourCategory: 'Honeymoon Trip',
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
        setStep(7);

        sendEmail(user.email, destination, req);
      })
      .catch((err) => console.log('err', err));
  };
  const closeFormModal = () => {
    setFormModalOpen(false);
  };

  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }
  const [modalIsOpen, setIsOpen] = useState(false);

  const nextStep = () => {
    if (step === 2 && !isLoggedin) {
      openModal();
      return;
    }

    if (fromDate === '' && toDate === '' && step === 3) {
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
              nextStep();
            }}
            setFlight={() => {
              setTravelMode('Flight');
              nextStep();
              setStep(step + 1);
            }}
            nextStep={nextStep}
            prevStep={prevStep}
            step={step}
            submitData={submitData}
          />
        );
      case 3:
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
          />
        );
      case 4:
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
      case 5:
        return (
          <Priority
            priority={priority}
            setPriority={(value) => setPriority(value)}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        );
      case 6:
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
            tourCategory={'HoneymoonTour'}
          />
        );
      case 7:
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

  Modal.setAppElement('#root');

  const desc = `Are you the newly-wed, blissed-out couple looking for a perfect romantic getaway? Then look no further! tour On will help you plan the magical Honeymoon of your dreams. 

This tour is exclusively for honeymooners and we provide you with suggestions of the most beautiful places with moonlight walks on magnificent riverbanks, candlelit dinners within the beauty of nature and the perfect tour spots for you and your better half. We provide you all the suggestions but the decision of what to choose and where to go is completely up to you. You dream, we make it happen!
`;

  return (
    <>
      <Navbar />
      <div className='Luxury_tour-container'>
        <Modals modalIsOpen={modalIsOpen} closeModal={closeModal} />

        <TourHeader
          image={Honeymoon}
          // image={
          //   "https://firebasestorage.googleapis.com/v0/b/touronapp-248e4.appspot.com/o/Honeymoon.jpg?alt=media&token=1b030bbb-3f73-41d8-adc8-6b5f05745710"
          // }

          title={'Honeymoon Tour'}
          description={desc}
          className={'Planned-form-container'}
        />
        <div className='Planned-form-container'>
          <Modal
            isOpen={formModalIsOpen}
            onRequestClose={closeFormModal}
            style={customFormModalStyles}
            shouldCloseOnOverlayClick={false}>
            <div className='modal-close'>
              <AiFillCloseCircle size={30} onClick={closeFormModal} />
            </div>

            <div className='tour-info'>
              <h1>Tour Informations</h1>
              <ul>
                <li>Tour type:</li>
                <li>{tourType}</li>
                <li>
                  Travel Mode:
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
          <div className={'planned_tour-form'}>
            {step === 7 ? null : <h1>Honeymoon Trip</h1>}
            <div className='planned_form'>{renderForm(step)}</div>
            {/* {step === 4 || step === 5 ? null : (
              <div className="navigation_btn">
                <>
                  <div className="previous-button" onClick={() => prevStep()}>
                    Previous
                  </div>
                  {step === 5 ? (
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

export default HoneymoonTour;
