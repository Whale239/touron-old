import React, { useState, useEffect, useContext } from 'react';
import TourHeader from '../Reusable components/TourHeader';
import { isAuthenticated } from '../../Login components/auth';
import Modal from 'react-modal';
import Tourtype from '../Reusable components/Tourtype';
import Travellertype from '../Reusable components/Travellertype';
import Modals from '../Modal';
import TouristDate from '../Reusable components/TouristDate';
import Checkout from '../Reusable components/Checkout';
import { AiFillCloseCircle } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { firedb } from '../../firebase';
import { ApiContext } from '../../Context/ApiContext';
import Touristnumber from './../Reusable components/Touristnumber';
import { sendEmail } from './../../Login components/PushNotification';
import Navbar from '../../Home components/Navbar/Navbar';
import Footer from '../../Home components/Footer/Footer';
import Destination from './../Reusable components/Destination';
import Ack from '../../assests/1.png';
import Luxury from '../../assests/Category/Lux.jpg';
import moment from 'moment';
import Priority from '../Reusable components/Priority';

const LuxuryTour = () => {
  const [subLoaded, setSubLoaded] = useState(false);
  const { userInfo } = useContext(ApiContext);
  // console.log('first', userInfo.name);
  // console.log('first', userInfo.phoneNumber);

  // const [number, setNumber] = useState(userInfo.phoneNumber);
  // const [name, setName] = useState(userInfo.name);
  const [number, setNumber] = useState('');
  const [name, setName] = useState('');
  const [adult, setAdult] = useState(0);
  const [children, setChildren] = useState(0);
  const [tourType, setTourType] = useState('');
  const [travellerType, setTravellerType] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [preferanece, setPreferanece] = useState('');
  const [destination, setDestination] = useState('');
  const [startPoint, setStartPoint] = useState('');
  const [budget, setBudget] = useState('');
  const [priority, setPriority] = useState('');
  const [step, setStep] = useState(1);
  const { user } = isAuthenticated();
  const [isLoggedin, setIsLoggedin] = useState(false);
  useEffect(() => {
    if (isAuthenticated()) return setIsLoggedin(true);
  }, []);

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
      adult: adult,
      children: children,
      travellerType: travellerType,
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
      tourCategory: 'Luxury Tour',
      requestDate: new Date().toDateString(),
      receivedFrom: 'Website',
      priority: priority,
    };

    firedb
      .ref(`requests`)
      .push(values)
      .then((data) => {
        setSubLoaded(false);
        setStep(8);
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

  const nextStep = () => {
    if (step === 2 && !isLoggedin) {
      openModal();
      return;
    }

    if (fromDate === '' && toDate === '' && step === 4) {
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
            adult={adult}
            children={children}
            setChildren={(value) => setChildren(value)}
            setAdult={(value) => setAdult(value)}
            nextStep={nextStep}
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
            setStep={setStep}
            submitData={submitData}
            travellerType={travellerType}
          />
        );
      case 5:
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
            setDestination={(value) => setDestination(value)}
            setStartPoint={(value) => setStartPoint(value)}
            setPreferanece={(value) => setPreferanece(value)}
          />
        );
      case 6:
        return (
          <Priority
            priority={priority}
            setPriority={(value) => setPriority(value)}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        );
      case 7:
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
            tourType={tourType}
            tourCategory={'LuxuryTour'}
          />
        );
      case 8:
        return (
          <>
            <div className='ack'>
              <img src={Ack} alt='ack ige' />
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
          </>
        );

      default:
        break;
    }
  };

  Modal.setAppElement('#root');

  const desc = `In this tour, we make sure that no element of lavishness is missed!

Luxury tours are tailor made to individual requirements. Be it India or abroad, we make sure to deliver way beyond your expectations. So do you love the finest dining experiences and the classiest stays? This is the tour choice made for you! We provide you with a complete list of high-end resorts, hotels and luxury travel choices along with an appropriate itinerary. You then get to make the choice which is perfect for you and enjoy your perfect Vacay!
`;

  return (
    <>
      <Navbar />
      <div className='Luxury_tour-container'>
        <Modals modalIsOpen={modalIsOpen} closeModal={closeModal} />

        <TourHeader
          image={Luxury}
          // image={
          //   "https://firebasestorage.googleapis.com/v0/b/touronapp-248e4.appspot.com/o/luxury.jpg?alt=media&token=7de0bc4d-6520-47e7-90a3-ee16ef171d4f"
          // }
          title={'Luxury Tour'}
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
                  Traveller type:
                  <span> </span>
                  {travellerType}
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
            {step === 8 ? null : <h1>Luxury Trip</h1>}
            <div className='planned_form'>{renderForm(step)}</div>
            {/* {step === 3 || step === 5 || step === 6 ? null : (
              <div className="navigation_btn">
                <>
                  <div className="previous-button" onClick={() => prevStep()}>
                    Previous
                  </div>
                  {step === 6 ? (
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

export default LuxuryTour;
