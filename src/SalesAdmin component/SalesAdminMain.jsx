import React, { useEffect, useState } from 'react';
import BookingTable from './BookingTable';
import SalesRequest from './SalesRequest';
import SalesSelfPlan from './SalesSelfPlan';
import YearStatistics from './YearStatistics';
import FlightMail from '../MailSend/FlightMail';
import HotelMail from '../MailSend/HotelMail';
import './SalesAdminMain.css';
import BookingB2C from './BookingB2C';
import BookingB2B from './BookingB2B';

const SalesAdminMain = () => {
  const [step, setStep] = useState(1);

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

  useEffect(() => {
    if (isAdminUser()) {
      setStep(1);
    } else {
      setStep(4);
    }
  }, []);

  const renderSale = () => {
    switch (step) {
      case 1:
        return <SalesRequest />;
      case 2:
        return <SalesSelfPlan />;
      case 3:
        return <YearStatistics />;
      case 4:
        return <BookingB2C />;
      case 5:
        return <BookingB2B />;
      // case 4:
      //   return <BookingTable />;
      case 6:
        return <HotelMail />;
      case 7:
        return <FlightMail />;
      // case 7:
      //   return <BookingB2C />;
      default:
        return step;
    }
  };

  return (
    <div className='salessadminmainn'>
      <div className='salessadminmainndivide1'>
        <ul className='salessadminmainndivide1Ul'>
          {isAdminUser() && (
            <>
              <li
                onClick={() => setStep(1)}
                className={
                  step === 1
                    ? 'salessadminmainndivide1Li'
                    : 'salessadminmainndivide1LiN'
                }>
                Request
              </li>
              <li
                onClick={() => setStep(2)}
                className={
                  step === 2
                    ? 'salessadminmainndivide1Li'
                    : 'salessadminmainndivide1LiN'
                }>
                Self Plan
              </li>
              <li
                onClick={() => setStep(3)}
                className={
                  step === 3
                    ? 'salessadminmainndivide1Li'
                    : 'salessadminmainndivide1LiN'
                }>
                Year Statistics
              </li>
            </>
          )}
          <li
            onClick={() => setStep(4)}
            className={
              step === 4
                ? 'salessadminmainndivide1Li'
                : 'salessadminmainndivide1LiN'
            }>
            Booking B2C
          </li>
          <li
            onClick={() => setStep(5)}
            className={
              step === 5
                ? 'salessadminmainndivide1Li'
                : 'salessadminmainndivide1LiN'
            }>
            Booking B2B
          </li>
          <li
            onClick={() => setStep(6)}
            className={
              step === 6
                ? 'salessadminmainndivide1Li'
                : 'salessadminmainndivide1LiN'
            }>
            Send Hotel Mail
          </li>
          <li
            onClick={() => setStep(7)}
            className={
              step === 7
                ? 'salessadminmainndivide1Li'
                : 'salessadminmainndivide1LiN'
            }>
            Send Flight Mail
          </li>
          {/* <li
            onClick={() => setStep(7)}
            className={
              step === 7
                ? 'salessadminmainndivide1Li'
                : 'salessadminmainndivide1LiN'
            }>
            Booking B2C
          </li> */}
        </ul>
      </div>
      <div className='salessadminmainndivide2'>{renderSale()}</div>
    </div>
  );
};

export default SalesAdminMain;
