import React, { useState, useEffect, useContext } from 'react';
import TourHeader from '../Reusable components/TourHeader';
import Tourtype from '../Reusable components/Tourtype';
import Travellertype from '../Reusable components/Travellertype';
import Touristnumber from '../Reusable components/Touristnumber';
import Travelmode from '../Reusable components/Travelmode';
import TouristDate from '../Reusable components/TouristDate';
import Checkout from '../Reusable components/Checkout';
import Tourpreferance from '../Reusable components/Tourpreferance';
import Expediture from '../Reusable components/Expediture';
import Modals from '../Modal';
import Modal from 'react-modal';
import { AiFillCloseCircle } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../../Login components/auth';
import { ApiContext } from '../../Context/ApiContext';
import { firedb } from '../../firebase';
import { sendEmail } from './../../Login components/PushNotification';
import Navbar from '../../Home components/Navbar/Navbar';
import Footer from '../../Home components/Footer/Footer';
import Ack from '../../assests/1.png';
import moment from 'moment';
import Surprise from '../../assests/Category/Sur.jpg';
import Priority from '../Reusable components/Priority';

const SurpriseTour = (params) => {
  const { userInfo } = useContext(ApiContext);
  // const [number, setNumber] = useState(userInfo.phoneNumber);
  // const [name, setName] = useState(userInfo.name);
  const [number, setNumber] = useState('');
  const [name, setName] = useState('');
  const [tourType, setTourType] = React.useState('');
  const [travellerType, setTravellerType] = React.useState('');
  const [adult, setAdult] = React.useState(0);
  const [children, setChildren] = React.useState(0);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [travelMode, setTravelMode] = React.useState('');
  const [expediture1, setExpediture1] = useState('');
  const [expediture2, setExpediture2] = useState('');
  const [expediture3, setExpediture3] = useState('');
  const [tourPreferance, setTourPreferance] = useState('');
  const [startPoint, setStartPoint] = useState('');
  const [budget, setBudget] = useState('');
  const [step, setStep] = useState(1);
  const [subLoaded, setSubLoaded] = useState(false);
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [priority, setPriority] = useState('');

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
    const v = moment().format('L');
    const r = Math.floor((Math.random() + 4) * 345334);
    const req = `TO-${v.slice(3, 5)}${v.slice(0, 2)}${v.slice(8)}-${r}`;

    setSubLoaded(true);
    let values = {
      requestID: req,

      tourCategory: 'Surprise Tour',
      tourType: tourType,
      travellerType: travellerType,
      adult: adult,
      children: children,
      travelMode: travelMode,
      startPoint: startPoint,
      fromDate: fromDate,
      toDate: toDate,
      expediture1: expediture1,
      expediture2: expediture2,
      expediture3: expediture3,
      tourPreferance: tourPreferance,
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
        setSubLoaded(false);
        // openFormModal();
        setStep(10);

        sendEmail(user.email, 'Surprise Trip', req);
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
            prevStep={prevStep}
            step={step}
            submitData={submitData}
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
          <Tourpreferance
            imgSrc1={
              'https://image.freepik.com/free-vector/skydiving-vector-sport-illustration-extreme-sport-background-skydiving-wing-suit_87946-304.jpg'
            }
            imgSrc2={
              'https://image.freepik.com/free-vector/relaxing-concept-illustration_114360-289.jpg'
            }
            imgSrc3={
              'https://image.freepik.com/free-vector/illustration-kathakali-dancer-performing-white-mandala-pattern-background_1302-19495.jpg'
            }
            imgSrc4={
              'https://image.freepik.com/free-vector/backpacker-with-map-search-directions-wilderness_80802-300.jpg'
            }
            tourPreferance={tourPreferance}
            setAdventure={() => {
              setTourPreferance('Adventure');
              setStep(step + 1);
            }}
            setRelaxation={() => {
              setTourPreferance('Relaxation');
              setStep(step + 1);
            }}
            setCultural={() => {
              setTourPreferance('Cultural');
              setStep(step + 1);
            }}
            setExplore={() => {
              setTourPreferance('Explore');
              setStep(step + 1);
            }}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        );
      case 6:
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
            step={step}
            submitData={submitData}
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
      case 7:
        return (
          <Expediture
            imgSrc={
              'https://image.freepik.com/free-vector/romantic-car-illustration_166742-180.jpg'
            }
            expediture3={expediture3}
            expediture2={expediture2}
            expediture1={expediture1}
            startPoint={startPoint}
            nextStep={nextStep}
            prevStep={prevStep}
            setStartPoint={(value) => setStartPoint(value)}
            setExpediture3={(value) => setExpediture3(value)}
            setExpediture2={(value) => setExpediture2(value)}
            setExpediture1={(value) => setExpediture1(value)}
          />
        );
      case 8:
        return (
          <Priority
            priority={priority}
            setPriority={(value) => setPriority(value)}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        );
      case 9:
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
            tourCategory={'SurpriseTour'}
          />
        );
      case 10:
        return (
          <div className='ack'>
            <img src={Ack} alt='ack image' />
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

  const desc = `Do you love surprises? Do you often find that deciding a destination
is the hardest part of your travel plans? Tour On has got you covered!

We surprise you with the best suitable location within your budget
and according to your travel preferences. We don’t have concrete
itineraries as we believe that you should decide where you want to
invest your money. We also recommend various things to do which
you can book yourself or we can book upon your confirmation.
`;

  return (
    <>
      <Navbar />
      <div className='Surprise_tour-container'>
        <Modals modalIsOpen={modalIsOpen} closeModal={closeModal} />
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
            <ul className='formModal'>
              <div className='row1'>
                <li>
                  Tour type:
                  <span> </span>
                  {tourType}
                </li>
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
                  Tour preferance:
                  <span> </span>
                  {tourPreferance}
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
                  Expediture1:
                  <span> </span>
                  {expediture1}
                </li>
                <li>
                  Expediture2:
                  <span> </span>
                  {expediture2}
                </li>
                <li>
                  Expediture3:
                  <span> </span>
                  {expediture3}
                </li>
                <li>
                  Start point
                  <span> </span>
                  {startPoint}
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
          image={Surprise}
          // image={
          // "https://firebasestorage.googleapis.com/v0/b/touronapp-248e4.appspot.com/o/Surprise.jpg?alt=media&token=f478a4d7-5ed7-46bc-a5d1-898f94f19da2"
          // }
          title={'Surprise Tour'}
          description={desc}
          className={'Planned-form-container'}
        />
        <div className='Planned-form-container'>
          <div className={'planned_tour-form'}>
            {step === 10 ? null : <h1>Surprise Tour</h1>}
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

export default SurpriseTour;
