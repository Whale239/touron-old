import React, { useContext, useState, useEffect } from 'react';
import { ApiContext } from '../Context/ApiContext';
import axios from 'axios';
import { API } from '../backend';
import { Link } from 'react-scroll';
import { Form, Input } from 'reactstrap';
import { firedb } from '../firebase';
import { isAuthenticated } from '../Login components/auth';
import { useToasts } from 'react-toast-notifications';
import { FcPlus } from 'react-icons/fc';
import { RiCloseCircleFill } from 'react-icons/ri';
import { Collapse } from 'reactstrap';
import Modals from './../Tour Categories/Modal';
import Navbar from '../Home components/Navbar/Navbar';
import Footer from '../Home components/Footer/Footer';
import './Visa.css';

const Visa = () => {
  const { countries } = useContext(ApiContext);
  const backgroundImage = {
    backgroundImage: `url('https://firebasestorage.googleapis.com/v0/b/touronapp-248e4.appspot.com/o/visa1.jpg?alt=media&token=d54c27e3-8b11-4a6a-a6f9-84d81dba21d3')`,
  };
  const [countryName, setCountryName] = useState('');
  const [visaDetails, setVisaDetails] = useState({});
  const [show, setshow] = useState(false);
  const [step, setStep] = useState(0);
  const [uid, setUid] = useState('');
  const { addToast } = useToasts();
  const [collapseOpen, setCollapseOpen] = useState();
  const [modalIsOpen, setIsOpen] = useState(false);
  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }

  const [values, setValues] = useState({
    name: '',
    number: '',
    travelMonth: '',
    workType: '',
    country: '',
    persons: 0,
  });

  const { name, number, travelMonth, workType, country, persons } = values;
  const handleChange = (e) => {
    if (isAuthenticated()) {
      const { name, value } = e.target;
      setValues({
        ...values,
        [name]: value,
      });
    } else openModal();
  };

  const toggle = (index) => {
    if (collapseOpen === index) {
      setCollapseOpen();
    } else {
      setCollapseOpen(index);
    }
  };

  const getVisaDetails = async (countryName) => {
    try {
      const visaResponse = await axios.get(`${API}/visa/${countryName}`);
      setVisaDetails(...visaResponse.data);
      setValues({
        ...values,
        country: visaResponse.data[0].countryName,
      });
      setshow(true);
    } catch (err) {
      console.log(err, 'err');
    }
  };

  const nextStep = () => {
    if (step === 0) setStep(step + 1);
  };
  const prevStep = () => {
    if (step === 1) setStep(step - 1);
  };

  useEffect(() => {
    if (isAuthenticated()) {
      const { user } = isAuthenticated();
      setUid(user.uid);
    }
  }, []);

  const addOrEditInfo = (e) => {
    e.preventDefault();
    let values = {
      userID: uid,
      name: name,
      phoneNumber: number,
      countryName: country,
      workType: workType,
      travelMonth: travelMonth,
      persons: persons,
      status: 'Received',
      downloadUrl: '',
    };

    if (name !== '' && number !== '' && persons !== '') {
      firedb
        .ref(`visaSubmission`)
        .push(values)
        .then(() => {
          addToast('Visa Requested Successfully', {
            appearance: 'success',
          });
        })
        .catch((err) =>
          addToast(err, {
            appearance: 'success',
          })
        );
    } else {
      addToast('All fields Required', {
        appearance: 'error',
      });
    }
    setValues({
      name: '',
      number: '',
      travelMonth: 'January',
      workType: 'Salaried',
      country: '',
      persons: 0,
    });
  };

  const renderItem = () => {
    switch (step) {
      case 0:
        const VisaQuestionSalaried = [
          {
            question: 'What are the Document Required ?',
            answer: visaDetails.salaryDocs.salaryDocsRequired,
          },
          {
            question: 'Financials Requirements needed',
            answer: visaDetails.salaryDocs.salaryFinancials,
          },
          {
            question: 'Where the docs should be Submitted ?',
            answer: visaDetails.salaryDocs.salarySubmission,
          },
          {
            question: 'Where i can get the Appointment ?',
            answer: visaDetails.salaryDocs.salaryAppointment,
          },
          {
            question: 'Details for Honeymooners',
            answer: visaDetails.salaryDocs.salaryHoneymooners,
          },
          {
            question: 'How long the duration will be ?',
            answer: visaDetails.salaryDocs.salaryDuration,
          },
          {
            question: 'What are the Photograph that needed ?',
            answer: visaDetails.salaryDocs.salaryPhotography,
          },
        ];

        return (
          <div className='salaried-details'>
            {VisaQuestionSalaried.map((q, index) => {
              return (
                <div className='questionss' key={index}>
                  <div className='visa-questionss'>
                    <h1>{q.question}</h1>
                    {collapseOpen === index ? (
                      <RiCloseCircleFill
                        onClick={() => toggle(index)}
                        size={30}
                        className='que-icon'
                        color='red'
                      />
                    ) : (
                      <FcPlus
                        onClick={() => toggle(index)}
                        size={30}
                        className='que-icon'
                      />
                    )}
                  </div>
                  <Collapse isOpen={collapseOpen === index}>
                    <p>{q.answer}</p>
                  </Collapse>
                </div>
              );
            })}
          </div>
        );
      case 1:
        const VisaQuestionSelfEmployed = [
          {
            question: 'What are the Document Required ?',

            answer: visaDetails.selfEmployedDocs.selfEmployedDocsRequired,
          },
          {
            question: 'Financials Requirements needed',
            answer: visaDetails.selfEmployedDocs.selfEmployedFinancials,
          },
          {
            question: 'Where the docs should be Submitted ?',

            answer: visaDetails.selfEmployedDocs.selfEmployedSubmission,
          },
          {
            question: 'Where i can get the Appointment ?',

            answer: visaDetails.selfEmployedDocs.selfEmployedAppointment,
          },
          {
            question: 'Details for Honeymooners',
            answer: visaDetails.selfEmployedDocs.selfEmployedHoneymooners,
          },
          {
            question: 'How long the duration will be ?',
            answer: visaDetails.selfEmployedDocs.selfEmployedDuration,
          },
          {
            question: 'What are the Photograph that needed ?',

            answer: visaDetails.selfEmployedDocs.selfEmployedPhotography,
          },
        ];
        return (
          <div className='selfEmployed-details'>
            {VisaQuestionSelfEmployed.map((q, index) => {
              return (
                <div className='questionss' key={index}>
                  <div className='visa-questionss'>
                    <h1>{q.question}</h1>
                    {collapseOpen === index ? (
                      <RiCloseCircleFill
                        onClick={() => toggle(index)}
                        size={30}
                        className='que-icon'
                        color='red'
                      />
                    ) : (
                      <FcPlus
                        onClick={() => toggle(index)}
                        size={30}
                        className='que-icon'
                      />
                    )}
                  </div>
                  <Collapse isOpen={collapseOpen === index}>
                    <p>{q.answer}</p>
                  </Collapse>
                </div>
              );
            })}
          </div>
        );

      default:
        break;
    }
  };

  return (
    <>
      <Navbar />
      <div className='visa-container' style={backgroundImage}>
        <Modals modalIsOpen={modalIsOpen} closeModal={closeModal} />
        <h1>Choose the country</h1>
        <div className='visa-country-search'>
          <Input
            type='select'
            onChange={(e) => {
              setCountryName(e.target.value);
              getVisaDetails(e.target.value);
            }}
            value={countryName}>
            <option value='' disabled selected hidden>
              Choose Country
            </option>
            {countries.map((c, index) => {
              return (
                <>
                  <option
                    key={index}
                    value={c.countryName}
                    className='visa-option'>
                    {c.countryName}
                  </option>
                </>
              );
            })}
          </Input>
        </div>
        <Link to='visa-details' duration={500} smooth={true}>
          <button>Next</button>
        </Link>
      </div>
      {show ? (
        <div className='visa-details'>
          <div className='visa-details-categories'>
            <h4
              className={step === 0 ? 'salaried' : 'none'}
              onClick={() => prevStep()}>
              Salaried
            </h4>
            <h4
              className={step === 1 ? 'selfEmployed' : 'none'}
              onClick={() => nextStep()}>
              Self Employed
            </h4>
          </div>
          <div className='visa-country'>
            <img
              className='visa-country-image'
              src={visaDetails.imageUrl}
              alt=''
            />
            <h4 className='visa-name'>Visa</h4>
            <i className='fa fa-chevron-right'></i>
            <h4 className='visa-countryName'> {visaDetails.countryName}</h4>
            <i className='fa fa-chevron-right'></i>
            <h4 className='visa-countryName'>
              {step === 0 ? 'Salaried' : 'Self Employed'}
            </h4>
          </div>
          <div className='visa-content'>
            <div className='visa-content-details'>{renderItem()}</div>
            <div className='visa-content-form'>
              <div className='visa-content-from-head'>
                <h3>Apply Visa For {country}</h3>
              </div>
              <Form>
                <div className='visa-group'>
                  <label className='visa-label'>Name</label>
                  <input
                    type='text'
                    className='user-input-alter user-input'
                    name='name'
                    value={name}
                    onChange={handleChange}
                  />
                </div>
                <div className='visa-group'>
                  <label className='visa-label'>Country Name</label>
                  <input
                    type='text'
                    name='country'
                    className='user-input-alter user-input'
                    value={country}
                    onChange={handleChange}
                  />
                </div>
                <div className='visa-group'>
                  <label className='visa-label'>Phone Number</label>
                  <input
                    type='number'
                    className='user-input-alter user-input'
                    name='number'
                    value={number}
                    onChange={handleChange}
                  />
                </div>
                <div className='visa-group'>
                  <label className='visa-label'>Number of Persons</label>
                  <input
                    type='number'
                    className='user-input-alter user-input'
                    value={persons}
                    name='persons'
                    onChange={handleChange}
                  />
                </div>
                <div className='visa-group'>
                  <label className='visa-label'>Travel Month</label>
                  <Input
                    type='select'
                    className='user-input-alter user-input'
                    name='travelMonth'
                    onChange={handleChange}
                    value={travelMonth}>
                    <option value='' disabled selected hidden>
                      Select month
                    </option>
                    <option value='January'>January</option>
                    <option value='February'>February</option>
                    <option value='March'>March</option>
                    <option value='April'>April</option>
                    <option value='May'>May</option>
                    <option value='June'>June</option>
                    <option value='July'>July</option>
                    <option value='August'>August</option>
                    <option value='September'>September</option>
                    <option value='October'>October</option>
                    <option value='November'>November</option>
                    <option value='December'>December</option>
                  </Input>
                </div>
                <div className='visa-group'>
                  <label className='visa-label'>Work Type</label>
                  <Input
                    type='select'
                    className='user-input-alter user-input'
                    name='workType'
                    onChange={handleChange}
                    value={workType}>
                    <option value='' disabled selected hidden>
                      Select
                    </option>
                    <option value='Salaried'>Salaried</option>
                    <option value='SelfEmployed'>Self Employed</option>
                  </Input>
                </div>
                <div className='user-button'>
                  <button className='btn btn-visa' onClick={addOrEditInfo}>
                    Submit
                  </button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      ) : null}
      <Footer />
    </>
  );
};

export default Visa;
