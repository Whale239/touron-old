import React, { useState, useContext } from 'react';
import './AdminLogin.css';
import { storeAuthToken } from '../Login components/auth';
import { auth } from '../firebase';
import { useToasts } from 'react-toast-notifications';
import { ApiContext } from '../Context/ApiContext';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  let history = useNavigate();
  const { employees } = useContext(ApiContext);
  const { addToast } = useToasts();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const isAdmin = (email) => {
    const loggedUser = employees?.filter((e) => e.email === email);
    if (loggedUser.length === 0) return false;
    return loggedUser[0].isAdmin;
  };

  const login = (e) => {
    e.preventDefault();
    if (isAdmin(email)) {
      auth
        .signInWithEmailAndPassword(email, password)
        .then((data) => {
          addToast('You are Logged in', {
            appearance: 'success',
          });
          storeAuthToken(data);
          setEmail('');
          setPassword('');
          history.goBack();
        })
        .catch((err) => {
          addToast(err.message, {
            appearance: 'error',
          });
          setEmail('');
          setPassword('');
        });
    } else {
      addToast('You are not a admin', {
        appearance: 'error',
      });
      setEmail('');
      setPassword('');
    }
  };
  return (
    <div className='adminDashboard'>
      <div className='login_box'>
        <h1>Admin Login</h1>
        <div className='logboxx'>
          <form className='loginForm'>
            <div className='email'>
              <i className='fa fa-envelope'></i>
              <input
                type='email'
                placeholder='Email'
                size='35'
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className='password'>
              <i className='fal fa-key'></i>
              <input
                type='password'
                placeholder='Passowrd'
                onChange={(e) => setPassword(e.target.value)}
                size='35'
                required
                value={password}
              />
            </div>
            <div className='buttonfix'>
              <input
                type='submit'
                className='logbutton'
                value='Login'
                onClick={login}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
