import React, { useState, useEffect } from 'react';
import './Popular_countries.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API } from '../backend';
import { FaSearch } from 'react-icons/fa';
import Navbar from '../Home components/Navbar/Navbar';
import Footer from '../Home components/Footer/Footer';

export default function Popular_countries() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  const [countries, setCountries] = useState([]);
  const [allCountries, setAllCountries] = useState([]);
  const [search, setSearch] = useState('');
  const filterCountries = () => {
    if (search === '') return countries;
    else {
      const filterCountry = allCountries.filter((country) => {
        return country.countryName
          .trim()
          .toLowerCase()
          .includes(search.trim().toLowerCase());
      });
      return filterCountry;
    }
  };

  // const getCountries = async () => {
  //   try {
  //     const countryResponse = await axios.get(
  //       `${API}/country?page=${page}&pageSize=${pageSize}`
  //     );
  //     setCountries(countryResponse.data);
  //     const allCountryResponse = await axios.get(`${API}/country`);
  //     setAllCountries(allCountryResponse.data);
  //   } catch (err) {
  //     console.log(err, 'err');
  //   }
  // };

  useEffect(() => {
    const source = axios.CancelToken.source();
    axios
      .get(`${API}/country?page=${page}&pageSize=${pageSize}`, {
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
    axios
      .get(`${API}/country`, {
        cancelToken: source.token,
      })
      .then((res) => {
        setAllCountries(res.data);
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
  }, [pageSize, page]);

  const setPagination = (page, pageSize) => {
    setPage(page);
    setPageSize(pageSize);
  };

  // useEffect(() => {
  //   getCountries();
  // }, [pageSize, page]);

  return (
    <>
      <Navbar />
      <div className='Popular_countries_container'>
        <div className='Popular_countries'>
          <div className='popularCountry_Back'>
            <div className='countriesSection-title'>
              <div className='countrySection-Subtitle'>
                Explore tours by countries
              </div>
              <div className='flex-search'>
                <div className='countrySection-Title'>Countries</div>
                <div className='country_search'>
                  <FaSearch className='search--icon' />
                  <input
                    type='text'
                    placeholder='Search'
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='popularCountries_section'>
          {filterCountries().map((c, index) => {
            // if (index < 6)
            return (
              <div className='country_content1' key={index}>
                <Link
                  className='plink'
                  to={{
                    pathname: `/countrydetails/${c.countryName}`,
                  }}>
                  <div className='country_img'>
                    <img src={c.imageUrl} alt='' />
                  </div>
                  <div className='countryflagg'>
                    <img src={c.countryFlagImage} alt='' />
                  </div>
                  <div className='countryk'>
                    <div className='countryname'>{c.countryName}</div>
                    <p className='countrydesc'>
                      {c.aboutCountry.slice(0, 200)}
                    </p>
                  </div>
                </Link>
                <Link className='plink' to='/popular_tour'>
                  <p className='countryview'>View all tours</p>
                </Link>
                <Link className='plink' to='/popular_tour'>
                  <p className='countryview hide'>{c.countryName}</p>
                </Link>
              </div>
            );
          })}
        </div>
        <div className='countries-pageno_flex'>
          <div className='countries-pageno_icon'>
            <i
              className='fa fa-chevron-left'
              onClick={() => {
                setPage(page - 1);
              }}></i>
          </div>
          <div className='countries-pageno'>
            <p
              onClick={() => setPagination(1, 6)}
              style={{
                backgroundColor: page === 1 ? '#fff' : '',
                color: page === 1 ? '#db6500' : '',
              }}>
              1
            </p>
            <p
              onClick={() => setPagination(2, 6)}
              style={{
                backgroundColor: page === 2 ? '#fff' : '',
                color: page === 2 ? '#db6500' : '',
              }}>
              2
            </p>
            <p
              onClick={() => setPagination(3, 6)}
              style={{
                backgroundColor: page === 3 ? '#fff' : '',
                color: page === 3 ? '#db6500' : '',
              }}>
              3
            </p>
            <p
              onClick={() => setPagination(4, 6)}
              style={{
                backgroundColor: page === 4 ? '#fff' : '',
                color: page === 4 ? '#db6500' : '',
              }}>
              4
            </p>
            <p
              onClick={() => setPagination(5, 6)}
              style={{
                backgroundColor: page === 5 ? '#fff' : '',
                color: page === 5 ? '#db6500' : '',
              }}>
              5
            </p>
            <p
              onClick={() => setPagination(6, 6)}
              style={{
                backgroundColor: page === 6 ? '#fff' : '',
                color: page === 6 ? '#db6500' : '',
              }}>
              6
            </p>
            <p
              onClick={() => setPagination(7, 6)}
              style={{
                backgroundColor: page === 7 ? '#fff' : '',
                color: page === 7 ? '#db6500' : '',
              }}>
              7
            </p>
            <p
              onClick={() => setPagination(8, 6)}
              style={{
                backgroundColor: page === 8 ? '#fff' : '',
                color: page === 8 ? '#db6500' : '',
              }}>
              8
            </p>
          </div>
          {page === 8 ? null : (
            <div className='countries-pageno_icon'>
              <i
                className='fa fa-chevron-right'
                onClick={() => {
                  setPage(page + 1);
                }}></i>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
