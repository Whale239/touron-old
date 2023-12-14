import React, { useState, useEffect, useRef } from 'react';
import { firedb } from '../firebase';
import ReactExport from 'react-export-excel';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const ExportAllQuaries = () => {
  const isMounted = useRef(false);
  const [datas, setDatas] = useState([]);

  console.log('first', datas.length);

  const getData = () => {
    let final = [];
    firedb.ref('requests').on('value', (data) => {
      if (isMounted.current) {
        data.forEach((d) => {
          if (d.val().number !== '') {
            final.push({
              name: d.val().name,
              number: d.val().number,
            });
          }
        });
      }
      setDatas(final);
    });
  };

  useEffect(() => {
    isMounted.current = true;
    getData();
    return () => (isMounted.current = false);
  }, []);

  return (
    <div style={{ padding: 10 }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'flex-end',
        }}>
        <ExcelFile
          element={
            <button
              style={{
                backgroundColor: 'blueviolet',
                cursor: 'pointer',
                margin: '10px',
                width: '150px',
                textAlign: 'center',
                color: 'white',
                padding: 10,
                border: 'none',
                outline: 'none',
              }}>
              Export to Excel
            </button>
          }>
          <ExcelSheet data={datas} name='Customers'>
            <ExcelColumn label='Name' value='name' />
            <ExcelColumn label='Mobile' value='number' />
          </ExcelSheet>
        </ExcelFile>
        {/* <div
          style={{
            backgroundColor: 'blueviolet',
            cursor: 'pointer',
            margin: '10px',
            width: '150px',
            textAlign: 'center',
            color: 'white',
            padding: 10,
          }}>
          Export to Excel
        </div> */}
      </div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Mobile</th>
          </tr>
        </thead>
        <tbody>
          {datas.map((d, i) => {
            return (
              <tr key={i}>
                <td>{d.name}</td>
                <td>{d.number}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ExportAllQuaries;
