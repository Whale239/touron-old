import React from 'react';
import { Navigate } from 'react-router-dom';
import LoaderAni from '../LoaderAnimation/LoaderAni';

const SuperAdminRoute = ({ children }) => {
  const isAdminUser = () => {
    const authToken = localStorage.getItem('authToken');
    if (authToken === null) {
      return false;
    } else {
      const sa = [
        'dineshkumar.devadasan@touron.in',
        'vikashmanoharan@touron.in',
        'sandy@touron.in',
        'rajeshp@touron.in',
      ];
      return sa.includes(JSON.parse(authToken).user.email);
    }
  };

  const auth = isAdminUser();
  return auth ? children : <Navigate to='/access-denied' />;
};

export default SuperAdminRoute;
