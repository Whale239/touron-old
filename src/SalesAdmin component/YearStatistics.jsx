import React, { useEffect, useState } from 'react';
import './YearStatistics.css';
import axios from 'axios';
import { API } from './../backend';
import { useToasts } from 'react-toast-notifications';

// import { firedb } from "./../firebase";

const YearStatistics = () => {
  const { addToast } = useToasts();

  const [data, setData] = useState({
    certifiedCountries: 0,
    successfulTours: 0,
    happyTravellers: 0,
    googleReviewCount: 0,
    googleReviewRating: '',
  });

  console.log(`data`, data);

  // const getStats = async () => {
  //   try {
  //     const dataResponse = await axios.get(
  //       `${API}/stats/edit/603f3d34eef3503b94446038`
  //     );
  //     console.log(`dataResponse`, dataResponse);
  //     setData({
  //       ...data,
  //       certifiedCountries: dataResponse.data.certifiedCountries,
  //       successfulTours: dataResponse.data.successfulTours,
  //       happyTravellers: dataResponse.data.happyTravellers,
  //       googleReviewCount: dataResponse.data.googleReviewCount,
  //       googleReviewRating: dataResponse.data.googleReviewRating,
  //     });
  //   } catch (err) {
  //     console.log(err, 'err');
  //   }
  // };

  useEffect(() => {
    const source = axios.CancelToken.source();
    axios
      .get(`${API}/stats/edit/603f3d34eef3503b94446038`, {
        cancelToken: source.token,
      })
      .then((res) => {
        setData({
          ...data,
          certifiedCountries: res.data.certifiedCountries,
          successfulTours: res.data.successfulTours,
          happyTravellers: res.data.happyTravellers,
          googleReviewCount: res.data.googleReviewCount,
          googleReviewRating: res.data.googleReviewRating,
        });
      })
      .catch((err) => {
        if (axios.isCancel(err)) {
          console.log('Axios request aborted.');
        } else {
          console.error(err);
        }
      });
    return () => {
      source.cancel();
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const updateStats = async () => {
    await axios
      .post(`${API}/stats/edit/603f3d34eef3503b94446038`, {
        certifiedCountries: certifiedCountries,
        successfulTours: successfulTours,
        happyTravellers: happyTravellers,
        googleReviewCount: googleReviewCount,
        googleReviewRating: googleReviewRating,
      })
      .then(() => {
        addToast('Updated Successfully', {
          appearance: 'success',
        });
      })
      .catch(() => {
        addToast('Update Failed', {
          appearance: 'error',
        });
      });
  };
  const {
    certifiedCountries,
    successfulTours,
    happyTravellers,
    googleReviewCount,
    googleReviewRating,
  } = data;

  // useEffect(() => {
  //   getStats();
  // }, []);

  // const updateRequest = () => {
  //   firedb
  //     .ref(`gaiaSuggestions/-MVUzoZWECaSBxPvGTv7/suggestions`)
  //     .set("sds")

  //     .then(() => {
  //       console.log("finished");
  //     })
  //     .catch((err) => console.log("err :>> ", err));
  // };

  return (
    <div className='yearStats'>
      <div className='yearStats-head'>
        <h1>Year Statistics</h1>
      </div>

      <div className='yearStats-field'>
        <div className='yearStats-input'>
          <label>Countries Certified</label>
          <input
            type='text'
            value={certifiedCountries}
            name='certifiedCountries'
            onChange={handleChange}
          />
        </div>
        <div className='yearStats-input'>
          <label>Successful Tours</label>
          <input
            type='text'
            value={successfulTours}
            name='successfulTours'
            onChange={handleChange}
          />
        </div>
        <div className='yearStats-input'>
          <label>Happy Travellers</label>
          <input
            type='text'
            value={happyTravellers}
            name='happyTravellers'
            onChange={handleChange}
          />
        </div>
        <div className='yearStats-input'>
          <label>Google Review Count</label>
          <input
            type='text'
            value={googleReviewCount}
            name='googleReviewCount'
            onChange={handleChange}
          />
        </div>
        <div className='yearStats-input'>
          <label>Google Review Rating</label>
          <input
            type='text'
            value={googleReviewRating}
            name='googleReviewRating'
            onChange={handleChange}
          />
        </div>
        <div className='yearStats-input'>
          <button onClick={updateStats}>Update</button>
        </div>
      </div>
    </div>
  );
};

export default YearStatistics;
