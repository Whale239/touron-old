import React, { useState, useEffect, useRef } from 'react';
import './Admin.css';
import { firedb } from './../firebase';
import { GoGitPullRequest } from 'react-icons/go';
import { BsFillPeopleFill } from 'react-icons/bs';
import { RiCustomerService2Fill } from 'react-icons/ri';
import { FaCity, FaGlobeAmericas, FaHiking } from 'react-icons/fa';
// import { admins } from "./Adminusers";
// import { Doughnut } from 'react-chartjs-2';
import { API } from './../backend';
import axios from 'axios';

const Admin = () => {
  const isMounted = useRef(false);
  const [request, SetRequest] = useState([]);
  const [selfPlans, setSelfPlans] = useState([]);
  const [customer, SetCustomer] = useState([]);
  const admin = 0;
  const [country, setCountries] = useState();
  const [city, setCities] = useState();
  const [tours, setTour] = useState();

  //   const Plannedtour = request.filter((p) => {
  //     return p.tourCategory === 'Planned Tour';
  //   });
  //   const Surprisetour = request.filter((s) => {
  //     return s.tourCategory === 'Surprise Tour';
  //   });
  //   const Luxurytour = request.filter((l) => {
  //     return l.tourCategory === 'Luxury Tour';
  //   });
  //   const Honeymoontour = request.filter((h) => {
  //     return h.tourCategory === 'Honeymoon Trip';
  //   });
  //   const Roadtrip = request.filter((r) => {
  //     return r.tourCategory === 'Road Trip';
  //   });
  //   const Wildlifetour = request.filter((r) => {
  //     return r.tourCategory === 'Wildlife';
  //   });

  //   const state = {
  //     labels: [
  //       "Planned tour",
  //       "Surprise tour",
  //       "Luxuy tour",
  //       "Honeymoon tour",
  //       "Road trip",
  //       "Wildlife tour",
  //       "SelfPlan tour",
  //     ],
  //     datasets: [
  //       {
  //         backgroundColor: [
  //           "#383CC1",
  //           "#C9DE00",
  //           "#2FDE00",
  //           "#00A6B4",
  //           "#6800B4",
  //           "#B9345A",
  //           "#758283",
  //         ],
  //         hoverBackgroundColor: [
  //           "#501800",
  //           "#4B5000",
  //           "#175000",
  //           "#003350",
  //           "#35014F",
  //           "#6A1B4D",
  //           "#242B2E",
  //         ],
  //         data: [
  //           Plannedtour.length,
  //           Surprisetour.length,
  //           Luxurytour.length,
  //           Honeymoontour.length,
  //           Roadtrip.length,
  //           Wildlifetour.length,
  //           selfPlans.length,
  //         ],
  //       },
  //     ],
  //   };

  const getAllRequest = () => {
    firedb.ref('requests').on('value', (data) => {
      if (isMounted.current) {
        if (data.val() !== null) {
          let req = [];
          data.forEach((r) => {
            req.push(r.val());
          });
          SetRequest(req);
        }
      }
    });
  };
  const getSelfPlans = () => {
    firedb.ref('self-planned-tours').on('value', (data) => {
      if (isMounted.current) {
        if (data.val() !== null) {
          let req = [];
          data.forEach((r) => {
            req.push(r.val());
          });
          setSelfPlans(req);
        }
      }
    });
  };
  const getAllCustomer = () => {
    firedb.ref('userGeneralInfo').on('value', (data) => {
      if (isMounted.current) {
        if (data.val() !== null) {
          let custm = [];
          data.forEach((c) => {
            custm.push(c.val());
          });
          SetCustomer(custm);
        }
      }
    });
  };

  useEffect(() => {
    const source = axios.CancelToken.source();
    axios
      .get(`${API}/country`, {
        cancelToken: source.token,
      })
      .then((res) => {
        setCountries(res.data.length);
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

  useEffect(() => {
    const source = axios.CancelToken.source();
    axios
      .get(`${API}/city`, {
        cancelToken: source.token,
      })
      .then((res) => {
        setCities(res.data.length);
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

  useEffect(() => {
    const source = axios.CancelToken.source();
    axios
      .get(`${API}/tour`, {
        cancelToken: source.token,
      })
      .then((res) => {
        setTour(res.data.length);
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

  //   const getCountries = async () => {
  //     try {
  //       const countryResponse = await axios.get(`${API}/country`);
  //       setCountries(countryResponse.data.length);
  //     } catch (err) {
  //       console.log(err, 'err');
  //     }
  //   };

  //   const getCities = async () => {
  //     try {
  //       const cityResponse = await axios.get(`${API}/city`);
  //       setCities(cityResponse.data.length);
  //     } catch (err) {
  //       console.log(err, 'err');
  //     }
  //   };

  //   const getTours = async () => {
  //     try {
  //       const tourResponse = await axios.get(`${API}/tour`);
  //       setTour(tourResponse.data.length);
  //     } catch (err) {
  //       console.log(err, 'err');
  //     }
  //   };

  useEffect(() => {
    isMounted.current = true;
    getAllRequest();
    return () => (isMounted.current = false);
  }, []);
  useEffect(() => {
    isMounted.current = true;
    getSelfPlans();
    return () => (isMounted.current = false);
  }, []);
  useEffect(() => {
    isMounted.current = true;
    getAllCustomer();
    return () => (isMounted.current = false);
  }, []);
  //   useEffect(() => {
  //     getCountries();
  //   }, []);
  //   useEffect(() => {
  //     getCities();
  //   }, []);
  //   useEffect(() => {
  //     getTours();
  //   }, []);

  return (
    <div className='dash-board'>
      <h2>Dashboard</h2>
      <div className='dashboard-cont'>
        <div className='db-req'>
          <div className='reqq'>
            <GoGitPullRequest className='req--icon' />
          </div>
          <div className='db-req-cont'>
            <h6>REQUESTS</h6>
            <h6>{request.length}</h6>
          </div>
        </div>
        <div className='db-customers'>
          <div className='custm'>
            <RiCustomerService2Fill className='cust--icon' />
          </div>
          <div className='db-customers-cont'>
            <h6>CUSTOMERS</h6>
            <h6>{customer.length}</h6>
          </div>
        </div>
        <div className='db-admin'>
          <div className='adm'>
            <BsFillPeopleFill className='adm--icon' />
          </div>
          <div className='db-adm-cont'>
            <h6>ADMINISTRATIVE</h6>
            <h6>{admin}</h6>
          </div>
        </div>
      </div>
      <div className='flex-ad'>
        {/* <div className="chart">
          <Doughnut
            data={state}
            options={{
              title: {
                display: true,
                text: "Tours",
                fontSize: 20,
              },
              legend: {
                display: true,
                position: "left",
              },
            }}
          />
        </div> */}
        <div className='cct'>
          <div className='country-req'>
            <div className='c-reqq'>
              <FaGlobeAmericas className='c-req--icon' />
            </div>
            <div className='c-req-cont'>
              <h6>COUNTRIES</h6>
              <h6>{country}</h6>
            </div>
          </div>
          <div className='city-req'>
            <div className='ci-reqq'>
              <FaCity className='ci-req--icon' />
            </div>
            <div className='ci-req-cont'>
              <h6>CITIES</h6>
              <h6>{city}</h6>
            </div>
          </div>
          <div className='tour-req'>
            <div className='t-reqq'>
              <FaHiking className='t-req--icon' />
            </div>
            <div className='t-req-cont'>
              <h6>TOURS</h6>
              <h6>{tours}</h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
