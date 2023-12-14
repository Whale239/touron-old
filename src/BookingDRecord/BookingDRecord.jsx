import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import { firedb } from '../firebase';
import './BookingDRecord.css';
import ReactExport from 'react-export-excel';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const BookingDRecord = () => {
  const isMounted = useRef(false);
  const [finalLogs, setFinalLogs] = useState([]);
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');

  let months = [
    'Jan',
    'Feb',
    'Mar',
    'Aprl',
    'May',
    'June',
    'July',
    'Aug',
    'Sept',
    'Oct',
    'Nov',
    'Dec',
  ];

  const getRecord = () => {
    let log = [];
    firedb.ref('bookingdetails1').on('value', (data) => {
      if (isMounted.current) {
        data.forEach((d) => {
          if (d.val().paymentDetails.amountDetails) {
            d.val().paymentDetails.amountDetails.forEach((final) => {
              if (
                year === moment(final.date).format('YYYY') &&
                month === moment(final.date).month()
              ) {
                log.push({
                  date: final.date,
                  surveyId: d.val().surveyId,
                  customerName: d.val().general.customerName,
                  particulars: final.particulars,
                  recievedType: final.recievedType,
                  recievedAmount: final.recievedAmount,
                  spentAmount: final.spentAmount,
                  remark: final.remark,
                });
              }
            });
          }
        });
        let sortLog = log.sort(
          (a, b) =>
            parseInt(a.date.slice(8, 10)) - parseInt(b.date.slice(8, 10))
        );
        setFinalLogs(sortLog);
      }
    });
  };

  useEffect(() => {
    isMounted.current = true;
    getRecord();
    return () => (isMounted.current = false);
  }, [year, month]);

  return (
    <div className='BookingDRecord___Main'>
      <div>
        <label>Year:</label>
        <input type='text' onChange={(e) => setYear(e.target.value)} />
      </div>
      <div>
        <label>Month:</label>
        <div style={{ display: 'flex' }}>
          {months.map((m, i) => {
            return (
              <div
                key={i}
                className={
                  month === i
                    ? 'BookingDRecord___Main_month_f'
                    : 'BookingDRecord___Main_month_t'
                }
                onClick={() => setMonth(i)}>
                {m}
              </div>
            );
          })}
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'flex-end',
        }}>
        <ExcelFile
          element={
            <button className='BookingDRecord___Main__Excel_Btn'>
              Export to Excel
            </button>
          }>
          <ExcelSheet data={finalLogs} name='finalLogs'>
            <ExcelColumn label='Date' value='date' />
            <ExcelColumn label='Survey Id' value='surveyId' />
            <ExcelColumn label='Customer Name' value='customerName' />
            <ExcelColumn label='Particulars' value='particulars' />
            <ExcelColumn label='Received Type' value='recievedType' />
            <ExcelColumn label='Received Amount' value='recievedAmount' />
            <ExcelColumn label='Spent Amount' value='spentAmount' />
            <ExcelColumn label='Remark' value='remark' />
          </ExcelSheet>
        </ExcelFile>
      </div>
      <table className='BookingDRecord___Main__table'>
        <thead>
          <tr>
            <th>Date</th>
            <th>Survey Id</th>
            <th>Customer Name</th>
            <th>Particulars</th>
            <th>Received Type</th>
            <th>Received Amount</th>
            <th>Spent Amount</th>
            <th>Remark</th>
          </tr>
        </thead>
        <tbody>
          {finalLogs.map((finalLog, i) => {
            const {
              date,
              surveyId,
              customerName,
              particulars,
              recievedType,
              recievedAmount,
              spentAmount,
              remark,
            } = finalLog;
            return (
              <tr key={i}>
                <td>{date}</td>
                <td>{surveyId}</td>
                <td>{customerName}</td>
                <td>{particulars}</td>
                <td>{recievedType}</td>
                <td>{recievedAmount}</td>
                <td>{spentAmount}</td>
                <td>{remark}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default BookingDRecord;
