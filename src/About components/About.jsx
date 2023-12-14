import React, { useState, useEffect, useRef } from 'react';
import './About.css';
import intro from '../assests/intro.png';
import team0 from '../assests/teams/vikash.jpg';
// import team1 from '../assests/teams/keerthi.jpg';
// import team2 from '../assests/teams/kirthika.jpeg';
// import team3 from '../assests/teams/ganesh.jpeg';
// import team4 from '../assests/teams/sam.jpg';
// import team5 from '../assests/teams/vicky.jpg';
// import team6 from '../assests/teams/dk.jpg';
import { Link } from 'react-router-dom';
import { AiOutlineFundProjectionScreen, AiOutlineLike } from 'react-icons/ai';
import { FaSuitcase, FaAward } from 'react-icons/fa';
import Navbar from '../Home components/Navbar/Navbar';
import Footer from '../Home components/Footer/Footer';
import axios from 'axios';
import { API } from './../backend';
import { firedb } from '../firebase';

// const teams = [
//   {
//     img: team1,
//     name: 'Keerthi',
//     desg: 'Co Founder & CFO',
//   },
//   {
//     img: team2,
//     name: 'Kirthika Jayagopi',
//     desg: 'Travel Associate',
//   },
//   {
//     img: team3,
//     name: 'Ganesh',
//     desg: 'Travel Associate',
//   },
//   {
//     img: team4,
//     name: 'Samyuktha',
//     desg: 'Travel Consultant',
//   },
//   {
//     img: team5,
//     name: 'Vicky',
//     desg: 'Junior Software Engineer',
//   },
//   {
//     img: team6,
//     name: 'Dinesh',
//     desg: 'Junior Software Engineer',
//   },
// ];

export default function About() {
  const isMounted = useRef(false);
  const [data, setData] = useState({
    certifiedCountries: 0,
    successfulTours: 0,
    happyTravellers: 0,
  });
  const { certifiedCountries, successfulTours, happyTravellers } = data;
  const [empDetails, setEmpDetails] = useState([]);

  //   const getStats = async () => {
  //     try {
  //       const dataResponse = await axios.get(
  //         `${API}/stats/edit/603f3d34eef3503b94446038`
  //       );
  //       setData({
  //         ...data,
  //         certifiedCountries: dataResponse.data.certifiedCountries,
  //         successfulTours: dataResponse.data.successfulTours,
  //         happyTravellers: dataResponse.data.happyTravellers,
  //       });
  //     } catch (err) {
  //       console.log(err, 'err');
  //     }
  //   };

  //   useEffect(() => {
  //     getStats();
  //   }, []);

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

  const getEmpPhoto = () => {
    let emp = [];
    firedb.ref('employeephotodetails').on('value', (snapshot) => {
      if (isMounted.current) {
        if (snapshot.val() != null)
          snapshot.forEach((d) => {
            emp.push({
              id: d.key,
              name: d.val().name,
              designation: d.val().designation,
              img: d.val().img,
            });
          });
      }
      setEmpDetails(emp);
    });
  };

  useEffect(() => {
    isMounted.current = true;
    getEmpPhoto();
    return () => (isMounted.current = false);
  }, []);

  return (
    <div className='about'>
      <Navbar />
      <div className='about_top'></div>
      <div className='aboutimage'>
        <div className='abouttile'>
          <p className='breadcrumbs'>
            <span className='mr-2'>
              <Link className='linkin' to='/'>
                Home <i className='fa fa-chevron-right'></i>
              </Link>
            </span>
            <span className='abt'>
              About us <i className='fa fa-chevron-right'></i>
            </span>
          </p>
          <h1 className='bread'>About Us</h1>
        </div>
      </div>
      <div className='intro'>
        <div className='intro_image-flex'>
          <img className='intro_image' src={intro} alt='' />
        </div>
        <div className='intro_content'>
          <div className='intro_title'>Travel your dreams today!</div>
          <p className='intro_text'>
            tourOn is the one-stop-shop for all your travel plans and needs. We
            work with you to manage all elements of your travel in an efficient
            and cost-effective manner. In a world filled with options, why
            should you settle for less when we give you more! TourOn’s fully
            customizable travel packages give you a tour that is tailored
            exactly the way you like it. Leave all the hard work to us! We will
            make your dream vacation a reality. Based on a survey of your tastes
            and destination preferences, TourOn’s algorithm provides a wide
            range of choices with the best prices. All you need to do is pick!
          </p>
          <div className='btns'>
            <a href='/'>
              Explore now<span></span>
              <span></span>
              <span></span>
            </a>
          </div>
        </div>
      </div>

      <div className='year-stats'>
        <div className='stats-width'>
          <div className='stats-title'>
            <h1>Year Statistics</h1>
            <p>
              Since its inception, with the support of avid travel enthusiasts,
              tourOn has managed to carve out a niche for itself in the
              customised-tour market in India. The numbers speak for themselves!
            </p>
          </div>
          <div className='stats-done'>
            <div className='stats-done1'>
              <AiOutlineFundProjectionScreen className='stats-icon' />
              <h3>Aug - 2018</h3>
              <h6>Founded</h6>
            </div>
            <div className='stats-done1'>
              <FaAward className='stats-icon' />
              <h3>{certifiedCountries}</h3>
              <h6>Countries Certified</h6>
            </div>
            <div className='stats-done1'>
              <AiOutlineLike className='stats-icon' />
              <h3>{successfulTours}</h3>
              <h6>Successful Tours</h6>
            </div>
            <div className='stats-done1'>
              <FaSuitcase className='stats-icon' />
              <h3>{happyTravellers}</h3>
              <h6>Happy Travellers</h6>
            </div>
          </div>
        </div>
      </div>

      <div className='hero'>
        <div className='hero_content'>
          <div className='sub_border'>
            <p className='hero_subtitle'>WORDS FROM</p>
          </div>
          <p className='hero_title'>MR.VIKASH MANOHARAN CEO, FOUNDER</p>
          <p className='hero_desc'>
            Founded in August of 2018, TourOn has since planned and lead more
            than 200 dream tours. Vikash Manoharan, Founder of TourOn, is a
            travel enthusiast and found TourOn to help others realize their
            wanderlust goals. Vikash used to work in the IT industry until one
            day he realized, a life confined to a desk is not one for him.
            TourOn took wings out of his passion for travel and has grown
            through his ideas as an experienced traveler.
          </p>
        </div>
        <div className='hero_image'>
          <img src={team0} alt='' />
        </div>
      </div>

      <div className='team'>
        <h2 className='title_name'>Our Team</h2>
        <p className='title_desc'>
          "Talent wins games, but teamwork and intelligence win championships."
          --Michael Jordan <br />
          tourOn consists of a close knit team of dedicated individuals, all
          working hard to put together your perfect holiday. Say Hello to the
          Team!
        </p>
        {empDetails && (
          <div className='team_content'>
            {empDetails.map((t, i) => {
              return (
                <div key={i} className='team_content1'>
                  <div className='team_img'>
                    <img src={t.img} alt='teamimage' />
                  </div>
                  <div className='teamk'>
                    <div className='team_desti'>{t.name}</div>
                    <div className='team_name'>{t.designation}</div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
