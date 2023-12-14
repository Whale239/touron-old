import React, { useState, useContext } from 'react';
import './Signup.css';
import { Link, useNavigate } from 'react-router-dom';
import { auth, firedb } from '../firebase';
import axios from 'axios';
import { storeAuthToken } from './auth';
import { Ripple } from 'react-spinners-css';
import Navbar from '../Home components/Navbar/Navbar';
import Footer from '../Home components/Footer/Footer';
import { Form } from 'reactstrap';
import { ApiContext } from '../Context/ApiContext';

const Signup = () => {
  let navigate = useNavigate();
  const { setUserInfo } = useContext(ApiContext);
  const [showPassword, setShowPassword] = useState(false);
  const [number, setNumber] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [step, setStep] = useState(1);
  const [code, setCode] = useState('');
  const [sessionID, setSessionID] = useState('');
  const [loaded, setLoaded] = useState(false);
  const [emailErr, setEmailErr] = useState(false);
  const [errorFields, setErrorFields] = useState(false);
  const [otpError, setOtpError] = useState(false);

  const togglePasssword = () => {
    setShowPassword(!showPassword);
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  const isEmailExist = () => {
    setEmailErr(false);
    setErrorFields(false);

    firedb.ref('userGeneralInfo').on('value', (data) => {
      if (data == null) {
        return false;
      } else {
        data.forEach((e) => {
          if (e.val().email === email) {
            // setEmail("");
            setPassword('');
            setEmailErr(true);
          }
        });
      }
    });
    return emailErr;
  };

  const sendOtp = (e) => {
    e.preventDefault();

    setLoaded(true);

    axios
      .get(
        `https://2factor.in/API/V1/8697a4f2-e821-11ea-9fa5-0200cd936042/SMS/+91${number}/AUTOGEN/tn`
      )
      .then((response) => {
        let session = response.data.Details;
        setLoaded(false);
        setSessionID(session);
        nextStep();
      })
      .catch((err) => {
        console.log(err, 'kjhk');
      });
  };

  const verifyOtp = (e) => {
    e.preventDefault();
    setLoaded(true);
    axios
      .get(
        `https://2factor.in/API/V1/8697a4f2-e821-11ea-9fa5-0200cd936042/SMS/VERIFY/${sessionID}/${code}`
      )
      .then((response) => {
        const status = response.data.Details;
        if (status === 'OTP Matched') {
          auth
            .createUserWithEmailAndPassword(email, password)
            .then((user) => {
              storeAuthToken(user);
              setUserInfo({
                phoneNumber: number,
                name: name,
                address: '',
                age: '',
                gender: '',
                aboutMe: '',
                travellerType: '',
                admin: false,
                pushNotificationToken: '',
                photoURL: '',
                email: email,
                profession: '',
                userID: user.user.uid,
              });
              firedb.ref(`userGeneralInfo/${user.user.uid}`).set({
                phoneNumber: number,
                name: name,
                address: '',
                age: '',
                gender: '',
                aboutMe: '',
                travellerType: '',
                admin: false,
                pushNotificationToken: '',
                photoURL: '',
                email: email,
                profession: '',
                userID: user.user.uid,
              });
              // storeAuthToken(user);
            })
            .catch((err) => {
              console.log('err', err);
              setLoaded(false);
            });
          setName('');
          setNumber('');
          setPassword('');
          setEmail('');
          setCode('');
          setLoaded(false);
          navigate('/');
          // return history.push('/');
        }
      })
      .catch((err) => {
        setLoaded(false);
        setOtpError(true);
        console.log(err, 'otp err');
      });
  };

  const register = (e) => {
    e.preventDefault();
    setLoaded(true);
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        storeAuthToken(user);
        setUserInfo({
          phoneNumber: number,
          name: name,
          address: '',
          age: '',
          gender: '',
          aboutMe: '',
          travellerType: '',
          admin: false,
          pushNotificationToken: '',
          photoURL: '',
          email: email,
          profession: '',
          userID: user.user.uid,
        });
        firedb.ref(`userGeneralInfo/${user.user.uid}`).set({
          phoneNumber: number,
          name: name,
          address: '',
          age: '',
          gender: '',
          aboutMe: '',
          travellerType: '',
          admin: false,
          pushNotificationToken: '',
          photoURL: '',
          email: email,
          profession: '',
          userID: user.user.uid,
        });
        // storeAuthToken(user);
      })
      .catch((err) => {
        console.log('err', err);
        setLoaded(false);
      });
    setName('');
    setNumber('');
    setPassword('');
    setEmail('');
    setCode('');
    setLoaded(false);
    navigate('/');
  };

  const handlePhoneNumberChange = (event) => {
    isEmailExist();
    const input = event.target.value.replace(/\D/g, '');
    const limitedInput = input.substring(0, 10);
    setNumber(limitedInput);
  };

  const renderform = () => {
    switch (step) {
      case 1:
        return (
          <div className='signup_box'>
            <div className='signbox'>
              <Form className='signForm' autoComplete='off'>
                <div className='names'>
                  <i className='fas fa-user'></i>
                  <input
                    type='text'
                    placeholder='Name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className='email'>
                  <i className='fa fa-envelope'></i>
                  <input
                    type='email'
                    placeholder='Email'
                    value={email}
                    onChange={(e) => {
                      setErrorFields(false);
                      setEmail(e.target.value);
                    }}
                  />
                </div>
                {emailErr ? (
                  <h3 className='errorMessage'>Email already exist</h3>
                ) : null}
                {email.includes('@') ||
                (email.length === 0 && !errorFields) ? null : (
                  <h3 className='errorMessage'>Enter a valid Email</h3>
                )}
                <div className='mobile'>
                  <i className='fas fa-phone'></i>
                  <input
                    type='text'
                    placeholder='Whatsapp no'
                    onChange={handlePhoneNumberChange}
                    maxLength={10}
                    value={number}
                    // onChange={(e) => {
                    //   isEmailExist();
                    //   setNumber(e.target.value);
                    // }}
                  />
                </div>
                {number.length === 10 ||
                (number.length === 0 && !errorFields) ? null : (
                  <h3 className='errorMessage'>Enter a valid number</h3>
                )}
                <div className='password'>
                  <i className='fal fa-key'></i>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder='Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <i
                    className={showPassword ? 'far fa-eye' : 'far fa-eye-slash'}
                    style={{
                      position: 'absolute',
                      right: 40,
                      fontSize: 18,
                      cursor: 'pointer',
                    }}
                    onClick={togglePasssword}></i>
                </div>
                {password.length >= 6 ||
                (password.length === 0 && !errorFields) ? null : (
                  <h3 className='errorMessage'>
                    Password length should be greater than or equal <br /> to 6
                    character
                  </h3>
                )}
                <div className='buttonfix'>
                  {loaded ? (
                    <div className='buttonfix loading'>
                      <Ripple color='white' size={40} />
                    </div>
                  ) : (
                    <button
                      className='signbutton'
                      onClick={register}
                      disabled={errorFields && !emailErr ? true : false}>
                      Register
                    </button>
                    // <button
                    //   className='signbutton'
                    //   onClick={sendOtp}
                    //   disabled={errorFields && !emailErr ? true : false}>
                    //   Send OTP
                    // </button>
                  )}
                </div>
              </Form>
            </div>
          </div>
        );
      case 2:
        return (
          <div className='signup_box'>
            <div className='signbox'>
              <Form className='signForm' autoComplete='off'>
                <div className='password'>
                  <i className='fas fa-lock'></i>
                  <input
                    type='number'
                    placeholder='Enter OTP'
                    required
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                  />
                </div>
                {otpError ? (
                  <h3 className='errorMessage'>Enter a valid OTP</h3>
                ) : null}
                <div className='buttonfix'>
                  {loaded ? (
                    <div className='buttonfix loading'>
                      <Ripple color='white' size={40} />
                    </div>
                  ) : (
                    <button className='signbutton' onClick={verifyOtp}>
                      Verify OTP Call
                    </button>
                  )}
                </div>
              </Form>
            </div>
          </div>
        );
      default:
        break;
    }
  };

  return (
    <>
      <Navbar />
      <div className='signup_form'>
        <div className='signup_text'>
          <h1>Signup</h1>
          <p>
            Have Account?<span> </span>
            <Link to='/login' className='link'>
              Login
            </Link>
          </p>
        </div>
        {renderform(step)}
      </div>
      <Footer />
    </>
  );
};

export default Signup;
