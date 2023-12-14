import React from 'react';
import { useEffect, useState, useContext } from 'react';
import { API } from '../backend';
import './Popular_tour.css';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import { ApiContext } from '../Context/ApiContext';
import Popular_tourTile from './Popular_tourTile';
import Slider from 'react-slick';
import { Spinner } from 'react-spinners-css';
import Navbar from '../Home components/Navbar/Navbar';
import Footer from '../Home components/Footer/Footer';

export default function Popular_tour(props) {
  const { countries } = useContext(ApiContext);
  const [tour, setTour] = useState([]);
  const location = useLocation();
  const [cityName, setCityName] = useState('');
  const [countryName, setCountryName] = useState('');
  const [cityNames, setCityNames] = useState([]);
  const [tourLength, setTourLength] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(4);
  const [tourShown, setTourShown] = useState(4);
  const [contentLoaded, setContentLoaded] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [tourCategory, setTourCategory] = useState('');
  const [idealType, setIdealType] = useState('');
  const [tourType, setTourType] = useState('');
  const [blogs, setBlogs] = useState([]);

  console.log(`tour,contentLoaded`, tour, contentLoaded);

  const getCityTours = async (name) => {
    setContentLoaded(true);
    const cityTourResponse = await axios.get(
      `${API}/tour/cityname/${name}?page=${page}&pageSize=${pageSize}`
    );
    console.log('running', cityTourResponse);
    setTour(cityTourResponse.data);
    setContentLoaded(false);
    const cityTourLength = await axios.get(`${API}/tour/cityname/${name}`);
    setTourLength(cityTourLength.data.length);
  };
  //   const getBlogs = async () => {
  //     const blogResponse = await axios.get(`${API}/blog?page=1&pageSize=5`);
  //     setBlogs(blogResponse.data);
  //   };

  const filterTourCategory = async (tourCategory) => {
    setTourCategory(tourCategory);
    setContentLoaded(true);
    const tourResponse = await axios.get(
      `${API}/tour/tourcategory/${tourCategory}?page=${page}&pageSize=${pageSize}`,
      {
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
    setTour(tourResponse.data);
    setContentLoaded(false);
    const tourLength = await axios.get(
      `${API}/tour/tourcategory/${tourCategory}`
    );
    setTourLength(tourLength.data.length);
  };
  const filterIdealType = async (idealType) => {
    setIdealType(idealType);
    setContentLoaded(true);
    const tourResponse = await axios.get(
      `${API}/tour/idealtype/${idealType}?page=${page}&pageSize=${pageSize}`,
      {
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
    setTour(tourResponse.data);
    setContentLoaded(false);
    const tourLength = await axios.get(`${API}/tour/idealtype/${idealType}`);
    setTourLength(tourLength.data.length);
  };
  const filterTourType = async (tourType) => {
    setTourType(tourType);
    setContentLoaded(true);
    const tourResponse = await axios.get(
      `${API}/tour/tourtype/${tourType}?page=${page}&pageSize=${pageSize}`,
      {
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
    setTour(tourResponse.data);
    setContentLoaded(false);
    const tourLength = await axios.get(`${API}/tour/tourtype/${tourType}`);
    setTourLength(tourLength.data.length);
  };
  const getCityNames = async (name) => {
    const cityName = await axios.get(`${API}/city/countryname/${name}`);
    setCityNames(cityName.data);
  };
  useEffect(() => {
    if (location.cityName !== undefined) {
      getCityTours(location.cityName);
    } else {
      getCityTours('Singapore');
    }
  }, []);

  useEffect(() => {
    if (cityName !== '') {
      getCityTours(cityName);
    }
  }, [page]);

  useEffect(() => {
    if (idealType !== '') filterIdealType(idealType);
  }, [idealType]);
  useEffect(() => {
    if (tourCategory !== '') filterTourCategory(tourCategory);
  }, [tourCategory]);
  useEffect(() => {
    if (tourType !== '') filterTourType(tourType);
  }, [tourType]);

  //   useEffect(() => {
  //     getBlogs();
  //   }, [getBlogs]);

  useEffect(() => {
    const source = axios.CancelToken.source();
    axios
      .get(`${API}/blog?page=1&pageSize=5`, {
        cancelToken: source.token,
      })
      .then((res) => {
        setBlogs(res.data);
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

  function SampleNextArrow(props) {
    const { className, onClick } = props;
    return <div className={className} onClick={onClick}></div>;
  }

  function SamplePrevArrow(props) {
    const { className, onClick } = props;
    return <div className={className} onClick={onClick}></div>;
  }

  var settings = {
    infinite: true,
    autoplay: true,
    speed: 1000,
    arrows: true,
    slidesToShow: 7,
    slidesToScroll: 4,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 4.5,
          slidesToScroll: 3,
          autoplay: false,

          infinite: true,
          dots: false,
          arrows: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          autoplay: false,

          slidesToScroll: 2,
          initialSlide: 2,
          arrows: false,
          dots: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          autoplay: false,

          slidesToScroll: 2,
          arrows: false,
          dots: false,
        },
      },
      {
        breakpoint: 360,
        settings: {
          slidesToShow: 2,
          autoplay: true,

          slidesToScroll: 2,
          arrows: false,
          dots: false,
        },
      },
      {
        breakpoint: 280,
        settings: {
          slidesToShow: 1,
          autoplay: false,

          slidesToScroll: 1,
          arrows: false,
          dots: false,
        },
      },
    ],
  };
  return (
    <>
      <Navbar />
      <div className='Popular_tours'></div>
      <div className='country-slider'>
        <Slider {...settings}>
          {countries.map((country, index) => {
            return (
              <div
                className='co'
                key={index}
                onClick={() => {
                  setPage(1);
                  setPageSize(4);
                  setTourShown(4);
                  setCountryName(country.countryName);
                  getCityNames(country.countryName);
                }}>
                <div className='countrydetails'>
                  <img src={country.imageUrl} alt='' />
                  <p
                    className='country-name'
                    style={{
                      color:
                        countryName === country.countryName
                          ? '#db6500'
                          : '#fff',
                    }}>
                    {country.countryName}
                  </p>
                </div>
              </div>
            );
          })}
        </Slider>
      </div>
      <div className='cities_container'>
        <div>
          {countryName === '' ? null : <h1>Cities in {countryName} : </h1>}
        </div>
        <div>
          {cityNames.length === 0 ? null : (
            <div className='cityname_container'>
              {cityNames.map((c, index) => {
                return (
                  <h4
                    className={
                      cityName === c.cityName || cityNames.length === 1
                        ? 'active'
                        : ''
                    }
                    key={index}
                    onClick={() => {
                      setPage(1);
                      setPageSize(4);
                      getCityTours(c.cityName);
                      setCityName(c.cityName);
                    }}>
                    {c.cityName}
                  </h4>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <div className='poptour_section'>
        <div className='poptour-section-left'>
          <div className='poptour-api'>
            {contentLoaded ? (
              <div className='loader'>
                <Spinner size='large' />
                <h4>Loading ...</h4>
              </div>
            ) : (
              <>
                {tour.length === 0 && page === 1 && cityName !== '' ? (
                  <>
                    <h1 style={{ color: '#FFF' }}>Tours not Found </h1>
                    <img
                      className='notfound-img'
                      src='https://image.freepik.com/free-vector/error-404-found-glitch-effect_8024-5.jpg'
                      // src="https://image.freepik.com/free-vector/404-error-with-cute-animal-concept-illustration_114360-1919.jpg"
                      alt=''
                    />
                  </>
                ) : (
                  <>
                    {tour.map((t, index) => {
                      return (
                        <Link
                          key={index}
                          className='plink'
                          to={{
                            pathname: `/tourdetails/${t.countryName}/${t.cityName}/${t.tourName}/${t._id}`,
                          }}>
                          <Popular_tourTile t={t} key={index} />
                        </Link>
                      );
                    })}
                  </>
                )}
              </>
            )}
          </div>
          {tour.length === 0 ||
          tourLength === 4 ||
          tourLength <= 4 ||
          contentLoaded ? null : (
            <div className='pageno_flex'>
              <div className='previous'>
                <div
                  className='prev_icon'
                  onClick={() => {
                    setPage(page - 1);
                    setTourShown(tourShown - 4);
                  }}>
                  <i className='fa fa-chevron-left'></i>
                </div>
              </div>
              {tourShown >= tourLength ? null : (
                <div className='next'>
                  <div
                    className='next_icon'
                    onClick={() => {
                      setPage(page + 1);
                      setTourShown(tourShown + 4);
                    }}>
                    <i className='fa fa-chevron-right'></i>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        <div className='poptour-section-right'>
          <div className='tour_category'>
            <div className='tour_category-title'>Tour Category</div>

            <div className='tour_category-list'>
              <ul className='tour-list'>
                <div className='list'>
                  <li
                    className={
                      selectedCategory.includes('Activities') ? 'selected' : ''
                    }>
                    <input
                      type='radio'
                      className='tour_category-list-checkbox'
                      name='activities'
                      onClick={() => {
                        filterTourCategory('Activities');
                      }}
                      checked={tourCategory === 'Activities' ? true : false}
                    />
                    Outdoor Activities
                  </li>
                  <li
                    className={
                      selectedCategory.includes('Hop On and Off')
                        ? 'selected'
                        : ''
                    }>
                    <input
                      type='radio'
                      onClick={() => {
                        filterTourCategory('Hop On and Off');
                      }}
                      className='tour_category-list-checkbox'
                      checked={tourCategory === 'Hop On and Off' ? true : false}
                    />
                    Hop On and Off
                  </li>
                  <li
                    className={
                      selectedCategory.includes('Attraction') ? 'selected' : ''
                    }>
                    <input
                      onClick={() => {
                        filterTourCategory('Attraction');
                      }}
                      type='radio'
                      checked={tourCategory === 'Attraction' ? true : false}
                      className='tour_category-list-checkbox'
                    />
                    Attraction
                  </li>
                  <li
                    className={
                      selectedCategory.includes('Learning') ? 'selected' : ''
                    }>
                    <input
                      onClick={() => {
                        filterTourCategory('Learning');
                      }}
                      type='radio'
                      checked={tourCategory === 'Learning' ? true : false}
                      className='tour_category-list-checkbox'
                    />
                    Learning
                  </li>
                </div>
                <div className='list'>
                  <li
                    className={
                      selectedCategory.includes('Family and kids')
                        ? 'selected'
                        : ''
                    }>
                    <input
                      onClick={() => {
                        filterIdealType('Family and kids');
                      }}
                      type='radio'
                      checked={idealType === 'Family and kids' ? true : false}
                      className='tour_category-list-checkbox'
                    />
                    Family and kids
                  </li>
                  <li
                    className={
                      selectedCategory.includes('Young Couple')
                        ? 'selected'
                        : ''
                    }>
                    <input
                      onClick={() => {
                        filterIdealType('Young Couple');
                      }}
                      type='radio'
                      checked={idealType === 'Young Couple' ? true : false}
                      className='tour_category-list-checkbox'
                    />
                    Young Couple
                  </li>
                  <li
                    className={
                      selectedCategory.includes('Solo') ? 'selected' : ''
                    }>
                    <input
                      onClick={() => {
                        filterIdealType('Solo');
                      }}
                      type='radio'
                      checked={idealType === 'Solo' ? true : false}
                      className='tour_category-list-checkbox'
                    />
                    Solo
                  </li>
                  <li
                    className={
                      selectedCategory.includes('Mature Couple')
                        ? 'selected'
                        : ''
                    }>
                    <input
                      onClick={() => {
                        filterIdealType('Mature Couple');
                      }}
                      type='radio'
                      checked={idealType === 'Mature Couple' ? true : false}
                      className='tour_category-list-checkbox'
                    />
                    Mature Couple
                  </li>
                </div>
                <div className='list'>
                  <li
                    className={
                      selectedCategory.includes('Full Day Tour')
                        ? 'selected'
                        : ''
                    }>
                    <input
                      onClick={() => {
                        filterTourType('Full Day Tour');
                      }}
                      type='radio'
                      checked={tourType === 'Full Day Tour' ? true : false}
                      className='tour_category-list-checkbox'
                    />
                    Full Day Tour
                  </li>
                  <li
                    className={
                      selectedCategory.includes('Half Day Tour')
                        ? 'selected'
                        : ''
                    }>
                    <input
                      onClick={() => {
                        filterTourType('Half Day Tour');
                      }}
                      type='radio'
                      checked={tourType === 'Half Day Tour' ? true : false}
                      className='tour_category-list-checkbox'
                    />
                    Half Day Tour
                  </li>
                  <li
                    className={
                      selectedCategory.includes('Night Tour') ? 'selected' : ''
                    }>
                    <input
                      onClick={() => {
                        filterTourType('Night Tour');
                      }}
                      type='radio'
                      checked={tourType === 'Night Tour' ? true : false}
                      className='tour_category-list-checkbox'
                    />
                    Night Tour
                  </li>
                </div>
              </ul>
            </div>
          </div>
          {/* <div className="latest_tour">
            <div className="latest_tour-title">Latest Tours</div>
            <div className="latest_tour-list">
              <div className="latest_tour-item">
                <div>
                  <img
                    className="latest_tour-image"
                    src={latest_tour1}
                    alt=""
                  />
                </div>
                <div>
                  <div className="latest_title">A tour of the Islands</div>
                  <div className="latest_cost">$3,500</div>
                  <div className="latest_days">
                    <span>
                      <i className="far fa-clock"></i>
                    </span>
                    <span className="latest_plan">7 days</span>
                  </div>
                </div>
              </div>
              <div className="latest_tour-item">
                <div>
                  <img
                    className="latest_tour-image"
                    src={latest_tour1}
                    alt=""
                  />
                </div>
                <div>
                  <div className="latest_title">A tour of the Islands</div>
                  <div className="latest_cost">$3,500</div>
                  <div className="latest_days">
                    <span>
                      <i className="far fa-clock"></i>
                    </span>
                    <span className="latest_plan">7 days</span>
                  </div>
                </div>
              </div>
              <div className="latest_tour-item">
                <div>
                  <img
                    className="latest_tour-image"
                    src={latest_tour1}
                    alt=""
                  />
                </div>
                <div>
                  <div className="latest_title">A tour of the Islands</div>
                  <div className="latest_cost">$3,500</div>
                  <div className="latest_days">
                    <span>
                      <i className="far fa-clock"></i>
                    </span>
                    <span className="latest_plan">7 days</span>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
          <div className='recent_articles'>
            <div className='recent_articles-title'>Recent Articles</div>
            <div className='recent_articles-list'>
              {blogs.map((b, index) => {
                if (index < 3) {
                  return (
                    <Link
                      key={index}
                      className='plink'
                      to={{
                        pathname: `/blogdetails/${b.blogTitle}/${b._id}/${b.countryName}`,
                      }}>
                      <div className='recent_articles-item-last'>
                        <div>
                          <img
                            className='recent_articles-image'
                            src={b.imageSrc}
                            alt=''
                          />
                        </div>
                        <div>
                          <div className='articles_title'>{b.blogTitle}</div>
                          <div className='articles_days'>
                            <span>
                              <i className='far fa-clock'></i>
                            </span>
                            <span className='articles_month'>
                              {b.createdAt.slice(0, 10)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                }
              })}
            </div>
          </div>
          <div className='question_blocks' style={{ width: '100%' }}>
            <div className='question_block-title'>Got a Question?</div>
            <div className='question_block-text'>
              "Call us or drop an email, and our experts will get back to you
              right away!"
            </div>
            <div className='question_block-tel'>+91 8667801206</div>
            <div className='question_block-mail'>hello@touron.in</div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
