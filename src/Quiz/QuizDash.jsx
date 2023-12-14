import React, { useState, useEffect, useRef } from 'react';
import { firedb } from '../firebase';
import './QuizDash.css';
import LoaderAni from '../LoaderAnimation/LoaderAni';

const QuizDash = () => {
  const isMounted = useRef(false);
  const [finalQuizData, setFinalQuizData] = useState([]);
  const [date, setDate] = useState('');
  const [loading, setLoading] = useState(false);

  console.log('date', date);

  const getData = () => {
    setLoading(true);
    const datas = [];
    firedb.ref('saudiquiz').on('value', (data) => {
      if (isMounted.current) {
        data.forEach((d) => {
          datas.push(d.val());
        });
        setFinalQuizData(datas);
        setLoading(false);
      }
    });
  };

  useEffect(() => {
    isMounted.current = true;
    getData();
    return () => (isMounted.current = false);
  }, []);

  const filterfinalQuizData = () => {
    if (date === '') return finalQuizData;
    else {
      const filterfinalQuizData = finalQuizData.filter((final) => {
        return final.date == date;
      });
      return filterfinalQuizData;
    }
  };

  if (loading) {
    return <LoaderAni />;
  } else {
    return (
      <div className='quizDashMainHome'>
        <div className='quizDashMainHomeHead'>
          <h3>Participants - {filterfinalQuizData().length}</h3>
        </div>
        <div className='quizDashMainHomeDate'>
          <h6>Date:</h6>
          <input
            type='date'
            onChange={(e) =>
              setDate(new Date(e.target.value).toLocaleDateString())
            }
          />
        </div>
        {filterfinalQuizData().length == 0 ? (
          <div className='quizDashMainHomeDateRe'>
            <h6>No results found!</h6>
          </div>
        ) : (
          <table className='quizDashMain'>
            <thead>
              <tr>
                <th>S.No</th>
                <th>Date</th>
                <th>Name</th>
                <th>Email</th>
                <th>Mobile</th>
                <th>Gender</th>
                <th>Opting</th>
                <th>Score</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {filterfinalQuizData()
                .sort((a, b) => b.correct - a.correct || a.seconds - b.seconds)
                .map((final, i) => {
                  return (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>{final.date ? final.date : '-'}</td>
                      <td>{final.name}</td>
                      <td>{final.email}</td>
                      <td>{final.phone}</td>
                      <td>{final.gender}</td>
                      <td>{final.opting}</td>
                      <td>{final.correct}</td>
                      <td>{final.seconds}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        )}
      </div>
    );
  }
};

export default QuizDash;
