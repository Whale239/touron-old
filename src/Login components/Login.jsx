import React, { useState } from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { storeAuthToken } from './auth';
import { Ripple } from 'react-spinners-css';
import Navbar from '../Home components/Navbar/Navbar';
import Footer from '../Home components/Footer/Footer';
import { Form } from 'reactstrap';

export default function Login() {
  let navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [loaded, setLoaded] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [step, setStep] = useState(1);
  const [errorMessage, setErrorMessage] = useState('');

  const togglePasssword = () => {
    setShowPassword(!showPassword);
  };

  const forgetPassword = (e) => {
    e.preventDefault();
    setLoaded(true);

    auth
      .sendPasswordResetEmail(email)
      .then(() => {
        setEmail('');
        setLoaded(false);
        setEmailSent(true);
      })
      .catch((err) => console.log('err', err));
  };

  const signIn = (e, next) => {
    e.preventDefault();
    setLoaded(true);
    auth
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        setPassword('');
        storeAuthToken(user);
        setEmail('');
        setLoaded(false);
        navigate('/');
        // return history.push('/');
      })
      .catch((err) => {
        setLoaded(false);
        setErrorMessage(err.message);
        console.log(err.message, 'po');
      });
  };

  const render = () => {
    switch (step) {
      case 1:
        return (
          <div className='logbox'>
            <Form className='loginForm' autoComplete='off'>
              <div className='email'>
                <i className='fa fa-envelope'></i>
                <input
                  type='email'
                  placeholder='Email'
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </div>
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
                    cursor: 'pointer',
                    fontSize: 18,
                  }}
                  onClick={togglePasssword}></i>
              </div>
              <div style={{ width: 300 }}>
                {errorMessage === '' ? null : (
                  <h3 className='errorMessage'>{errorMessage}</h3>
                )}
              </div>
              <div className='buttonfix'>
                {loaded ? (
                  <div className='buttonfix loading'>
                    <Ripple color='white' size={40} />
                  </div>
                ) : (
                  <button className='logbutton' onClick={signIn}>
                    Login
                  </button>
                )}
              </div>
              <div>
                <h6
                  style={{
                    cursor: 'pointer',
                    marginTop: 20,
                    fontFamily: 'andika',
                  }}
                  onClick={() => setStep(2)}>
                  Forget Password ?
                </h6>
              </div>
            </Form>
          </div>
        );
      case 2:
        return (
          <div className='logbox'>
            <Form className='loginForm' autoComplete='off'>
              <div className='email'>
                <i className='fa fa-envelope'></i>
                <input
                  type='email'
                  placeholder='Email'
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </div>

              <div className='buttonfix'>
                {loaded ? (
                  <div className='buttonfix loading'>
                    <Ripple color='white' size={40} />
                  </div>
                ) : (
                  <>
                    {emailSent ? (
                      <button className='logbutton' style={{ fontSize: 13 }}>
                        Check email for Link
                      </button>
                    ) : (
                      <button
                        className='logbutton'
                        onClick={forgetPassword}
                        style={{ fontSize: 16 }}>
                        Change Password
                      </button>
                    )}
                  </>
                )}
              </div>
              <div>
                <h6
                  style={{
                    cursor: 'pointer',
                    marginTop: 20,
                    fontFamily: 'andika',
                  }}
                  onClick={() => setStep(1)}>
                  Have an account click here ?
                </h6>
              </div>
            </Form>
          </div>
        );
      default:
        break;
    }
  };
  return (
    <>
      <Navbar />
      <div className='login_form'>
        <div className='login_text'>
          <h1>Login</h1>
          <p>
            No Account?<span> </span>
            <Link to='/signup' className='link'>
              Register
            </Link>
          </p>
        </div>
        <div className='login_box'>{render()}</div>
      </div>
      <Footer />
    </>
  );
}
