import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import './Home.css';
import Home from './Home';
import { ApiContext } from './Context/ApiContext';
import { firedb } from './firebase';
import Login from './Login components/Login';
import Signup from './Login components/Signup';
import { isAuthenticated } from './Login components/auth';
import LuxuryTour from './Tour Categories/Luxury Tour/LuxuryTour';
import PlannedTour from './Tour Categories/Planned Tour/PlannedTour';
import SurpriseTour from './Tour Categories/Surprise Tour/SurpriseTour';
import WildlifeTour from './Tour Categories/Wildlife Tour/WildlifeTour';
import RoadtripTour from './Tour Categories/Roadtrip Tour/RoadtripTour';
import HoneymoonTour from './Tour Categories/Honeymoon Tour/HoneymoonTour';
import SelfPlanTour from './Tour Categories/SelfPlan Tour/SelfPlanTour';
import About from './About components/About';
import ScrollToTop from './ScrollToTop';
import Contact from './Contact components/Contact';
import { ToastProvider } from 'react-toast-notifications';
import Visa from './Visa Page/Visa';
import axios from 'axios';
import { API } from './backend';
import Blog from './Blogs/Blog';
import BlogInner from './Blogs/BlogInner';
import Destination from './Destination components/Destination';
import StorySection from './Story components/StorySection';
import StoryPage from './Story components/StoryPage';
import NotFound from './Not Found/NotFound';
import Popular_tour from './Tours Page/Popular_tour';
import TermsCondition from './TermsCondition/TermsCondition';
import Privacypolicy from './Privacypolicy/Privacypolicy';
import TourInner from './Tours Page/TourInner';
import Popular_countries from './Country Page/Popular_countries';
import CountryInner from './Country Page/CountryInner';
import SalesAdminMain from './SalesAdmin component/SalesAdminMain';
import PrivateRoute from './Login components/Privateroutes';
import UserDetails from './Account details components/UserDetails';
import Faq from './Account details components/Faq';
import MyRequest from './Account details components/MyRequest';
import MyVisaRequests from './Account details components/MyVisaRequests';
import SavedTours from './Account details components/SavedTours';
import SelfPlan from './Account details components/SelfPlan';
import Support from './Account details components/Support';
import AdminRoute from './Login components/AdminRoute';
import AdminMain from './Admin components/AdminMain';
import Resort from './Resort/Resort';
import ViewResort from './Resort/ViewResort';
import Quiz from './Quiz/Quiz';
import ReadyQns from './Quiz/ReadyQns';
import QuizDash from './Quiz/QuizDash';
import BookingRecord from './SalesAdmin component/BookingRecord';
import TotalSaleReport from './SalesReport/TotalSaleReport';
import ResortMain from './Resort components/ResortMain';
import SuperAdminRoute from './Login components/SuperAdminRoute';
import AccessDenied from './AccessDenied/AccessDenied';
import BookingDRecord from './BookingDRecord/BookingDRecord';
import Record from './marginvolumerecord/Record';
import BookingDeletion from './BookingDeletion/BookingDeletion';
import Virtual from './Virtual/Virtual';
import Virtualdash from './Virtual/Virtualdash';
import BookingRecordB2B from './SalesAdmin component/BookingRecordB2B';
import Interakt from './Interakt/Interakt';
// import LuckySeat from './Quiz/LuckySeat';
// import LuckySeatAdmin from './Quiz/LuckySeatAdmin';
// import LuckySeatAs from './Quiz/LuckySeatAs';
// import ExporyallQuaries from './Export all quaries/ExportAllQuaries';

const App = () => {
  const isMounted = useRef(false);
  const [cont, setCont] = useState('');
  const [userInfo, setUserInfo] = useState({});
  const [employees, setEmployees] = useState([]);
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const source = axios.CancelToken.source();
    axios
      .get(`${API}/country`, {
        cancelToken: source.token,
      })
      .then((res) => {
        setCountries(res.data);
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

  const getEmployee = () => {
    let ar = [];
    firedb.ref('employeeDetail').on('value', (snapshot) => {
      if (isMounted.current) {
        if (snapshot.val() != null)
          snapshot.forEach((emp) => {
            ar.push(emp.val());
          });
      }
    });
    setEmployees(ar);
  };

  useEffect(() => {
    isMounted.current = true;
    getEmployee();
    return () => (isMounted.current = false);
  }, []);

  const getContact = () => {
    firedb.ref('contacts').on('value', (data) => {
      if (isMounted.current) {
        data.forEach((d) => {
          setCont(d.val());
        });
      }
    });
  };

  useEffect(() => {
    isMounted.current = true;
    getContact();
    return () => (isMounted.current = false);
  }, []);

  useEffect(() => {
    isMounted.current = true;
    if (isAuthenticated()) {
      const { user } = isAuthenticated();
      firedb.ref(`userGeneralInfo/${user.uid}`).on('value', (data) => {
        if (isMounted.current) {
          if (data !== null) {
            let val = data.val();
            setUserInfo(val);
          }
        }
      });
    }
    return () => (isMounted.current = false);
  }, []);

  return (
    <ApiContext.Provider
      value={{
        countries,
        userInfo,
        setUserInfo,
        employees,
        setEmployees,
        cont,
        setCont,
      }}>
      <Router>
        <ToastProvider
          autoDismissTimeout={2500}
          placement='top-center'
          autoDismiss={true}>
          <ScrollToTop>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/about' element={<About />} />
              <Route path='/login' element={<Login />} />
              <Route path='/signup' element={<Signup />} />
              <Route path='/visa' element={<Visa />} />
              <Route path='/contact' element={<Contact />} />
              <Route path='/planned-tour' element={<PlannedTour />} />
              <Route path='/surprise-tour' element={<SurpriseTour />} />
              <Route path='/roadtrip-tour' element={<RoadtripTour />} />
              <Route path='/luxury-tour' element={<LuxuryTour />} />
              <Route path='/honeymoon-tour' element={<HoneymoonTour />} />
              <Route path='/wildlife-tour' element={<WildlifeTour />} />
              <Route path='/self-planned' element={<SelfPlanTour />} />
              <Route path='/blogs' exact element={<Blog />} />
              <Route path='/virtualtrialroom' exact element={<Virtual />} />
              <Route
                path='/blogdetails/:blogname/:blogid/:countryName'
                element={<BlogInner />}
              />
              <Route path='/gaia' element={<Destination />} />
              <Route path='/storysection' element={<StorySection />} />
              <Route path='/story/:categoryTitle' element={<StoryPage />} />
              <Route path='/popular_tour' element={<Popular_tour />} />
              <Route
                path='/tourdetails/:countryname/:cityname/:tourname/:tourid'
                element={<TourInner />}
              />
              <Route
                path='/popular_countries'
                element={<Popular_countries />}
              />
              <Route
                path='/countrydetails/:countryname'
                element={<CountryInner />}
              />
              <Route path='/termsCondition' element={<TermsCondition />} />
              <Route path='/privacypolicy' element={<Privacypolicy />} />
              <Route path='*' element={<NotFound />} />
              <Route path='/access-denied' element={<AccessDenied />} />
              <Route path='/quiz-win-prize' element={<Quiz />} />
              <Route path='/resorts' element={<ResortMain />} />
              <Route path='/record' element={<Record />} />
              {/* <Route path='/lucky-seat' element={<LuckySeat />} /> */}
              <Route
                path='/profile'
                element={
                  <PrivateRoute>
                    <UserDetails />
                  </PrivateRoute>
                }
              />
              <Route
                path='/profile/my-requests'
                element={
                  <PrivateRoute>
                    <MyRequest />
                  </PrivateRoute>
                }
              />
              <Route
                path='/profile/myvisa-requests'
                element={
                  <PrivateRoute>
                    <MyVisaRequests />
                  </PrivateRoute>
                }
              />
              <Route
                path='/profile/myvisa-requests'
                element={
                  <PrivateRoute>
                    <MyVisaRequests />
                  </PrivateRoute>
                }
              />
              <Route
                path='/profile/saved-tours'
                element={
                  <PrivateRoute>
                    <SavedTours />
                  </PrivateRoute>
                }
              />
              <Route
                path='/profile/faq'
                element={
                  <PrivateRoute>
                    <Faq />
                  </PrivateRoute>
                }
              />
              <Route
                path='/profile/support'
                element={
                  <PrivateRoute>
                    <Support />
                  </PrivateRoute>
                }
              />
              <Route
                path='/profile/selfplan'
                element={
                  <PrivateRoute>
                    <SelfPlan />
                  </PrivateRoute>
                }
              />
              <Route
                path='/salesadmin'
                element={
                  <AdminRoute>
                    <SalesAdminMain />
                  </AdminRoute>
                }
              />
              <Route
                path='/admin'
                element={
                  <SuperAdminRoute>
                    <AdminMain />
                  </SuperAdminRoute>
                }
              />
              <Route
                path='/resort'
                element={
                  <AdminRoute>
                    <Resort />
                  </AdminRoute>
                }
              />
              <Route
                path='/resort/:resortid'
                element={
                  <AdminRoute>
                    <Resort />
                  </AdminRoute>
                }
              />
              <Route
                path='/resortview'
                element={
                  <AdminRoute>
                    <ViewResort />
                  </AdminRoute>
                }
              />
              <Route
                path='/quiz-qns'
                element={
                  <AdminRoute>
                    <ReadyQns />
                  </AdminRoute>
                }
              />
              <Route
                path='/quiz-dashboard'
                element={
                  <AdminRoute>
                    <QuizDash />
                  </AdminRoute>
                }
              />
              {/* <Route
                path='/lucky-seat-admin'
                element={
                  <AdminRoute>
                    <LuckySeatAdmin />
                  </AdminRoute>
                }
              />
              <Route
                path='/lucky-seat-as'
                element={
                  <AdminRoute>
                    <LuckySeatAs />
                  </AdminRoute>
                }
              /> */}
              {/* <Route
                path='/export-all-quaries'
                element={
                  <AdminRoute>
                    <ExporyallQuaries />
                  </AdminRoute>
                }
              /> */}
              <Route
                path='/bookingrecord'
                element={
                  <AdminRoute>
                    <BookingRecord />
                  </AdminRoute>
                }
              />
              <Route
                path='/bookingrecordb2b'
                element={
                  <AdminRoute>
                    <BookingRecordB2B />
                  </AdminRoute>
                }
              />
              <Route
                path='/bookingrecord/:surveyid/:name'
                element={
                  <AdminRoute>
                    <BookingRecord />
                  </AdminRoute>
                }
              />
              <Route
                path='/bookingrecordb2b/:surveyid/:name'
                element={
                  <AdminRoute>
                    <BookingRecordB2B />
                  </AdminRoute>
                }
              />
              <Route
                path='/totalsales'
                element={
                  <SuperAdminRoute>
                    <TotalSaleReport />
                  </SuperAdminRoute>
                }
              />
              <Route
                path='/bookingDRecord'
                element={
                  <AdminRoute>
                    <BookingDRecord />
                  </AdminRoute>
                }
              />
              <Route
                path='/bookingDeletion'
                element={
                  <AdminRoute>
                    <BookingDeletion />
                  </AdminRoute>
                }
              />
              <Route
                path='/virtualDash'
                element={
                  <AdminRoute>
                    <Virtualdash />
                  </AdminRoute>
                }
              />
              <Route path='/interakt' element={<Interakt />} />
            </Routes>
          </ScrollToTop>
        </ToastProvider>
      </Router>
    </ApiContext.Provider>
  );
};

export default App;
