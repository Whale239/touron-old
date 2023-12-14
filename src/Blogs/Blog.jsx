import React from 'react';
import './Blog.css';
import { useEffect, useState } from 'react';
import { API } from '../backend';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Facebook } from 'react-spinners-css';
import Navbar from '../Home components/Navbar/Navbar';
import Footer from '../Home components/Footer/Footer';
import parse from 'html-react-parser';
import { AiOutlineSearch } from 'react-icons/ai';
import moment from 'moment';

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  // const [country, setCountries] = useState([]);
  const [pageSize, setPageSize] = useState(24);
  const [blogLoaded, setBlogLoaded] = useState(false);
  const [searchText, setSearchText] = useState('');

  //   const getBlogs = async () => {
  //     setBlogLoaded(true);
  //     const blogResponse = await axios.get(
  //       `${API}/blog/search?page=1&pageSize=150`
  //     );
  //     setBlogs(blogResponse.data);
  //     setBlogLoaded(false);
  //   };

  useEffect(() => {
    setBlogLoaded(true);
    const source = axios.CancelToken.source();
    axios
      .get(`${API}/blog/search?page=1&pageSize=150`, {
        cancelToken: source.token,
      })
      .then((res) => {
        setBlogs(res.data);
        setBlogLoaded(false);
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

  // const getCountries = async () => {
  //   try {
  //     const countryResponse = await axios.get(`${API}/country`);
  //     setCountries([{ countryName: "India" }, ...countryResponse.data]);
  //   } catch (err) {
  //     console.log(err, "err");
  //   }
  // };

  //   useEffect(() => {
  //     getBlogs();
  //   }, []);
  // useEffect(() => {
  //   getCountries();
  // }, []);

  const search = () => {
    if (searchText === '') return blogs;
    const d = blogs.filter((b) => {
      return (
        b.blogTitle
          ?.trim()
          .toUpperCase()
          .includes(searchText.trim().toUpperCase()) ||
        b.countryName
          ?.trim()
          .toUpperCase()
          .includes(searchText.trim().toUpperCase())
      );
    });

    return d;
  };

  return (
    <>
      <Navbar />
      <div className='blog-container'>
        <div className='blog-header'>
          <h1>Latest Blogs</h1>
          <p>
            Read about your favourite destinations, and get to know about the
            latest trends in tourism from our Blog.. New articles everyday!
          </p>
        </div>
        <div className='blog-container__filter'>
          <div className='blog-container__filter2'>
            <div className='sicon'>
              <AiOutlineSearch size={30} />
            </div>
            <input
              type='text'
              placeholder='Search by Title or country Name'
              className='blog-container__filter2-input'
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
        </div>

        {blogLoaded ? (
          <div className='blog-loader'>
            <Facebook />
          </div>
        ) : (
          <div style={{ minHeight: '50vh' }}>
            <div className='blogs'>
              {search().length === 0 ? (
                <div className='nof'>
                  <h6>No results found</h6>
                </div>
              ) : (
                <>
                  {search().map((b, index) => {
                    if (index < pageSize)
                      return (
                        <div className='blog-content'>
                          <img src={b.imageSrc} alt='' />
                          <div className='blog-details'>
                            {b.updated ? (
                              <>
                                {b.updatedAt === '' ? null : (
                                  <h6>
                                    {moment(b.updatedAt, 'YYYYMMDD').fromNow()}
                                  </h6>
                                )}
                              </>
                            ) : (
                              <>
                                {b.createdAt === '' ? null : (
                                  <h6>
                                    {moment(b.createdAt, 'YYYYMMDD').fromNow()}
                                  </h6>
                                )}
                              </>
                            )}
                            {/* <h6>{getDays(b.createdAt)}</h6> */}
                            <h1>{b.blogTitle}</h1>
                            {Object.keys(b).length === 0 ? null : (
                              <>
                                {b.content === null || undefined ? null : (
                                  <p>{parse(b.content.slice(0, 140))}</p>
                                )}
                              </>
                            )}
                            {/* <p>{parse(b.content.slice(0, 140))}...</p> */}
                            <Link
                              key={index}
                              className='plink'
                              to={{
                                pathname: `/blogdetails/${b.blogTitle}/${b._id}/${b.countryName}`,
                              }}>
                              <button>Read More</button>
                            </Link>
                          </div>
                        </div>
                      );
                  })}
                </>
              )}
            </div>
            {searchText === '' && (
              <div className='blog-buttons'>
                <button onClick={() => setPageSize(pageSize + 12)}>
                  Load More
                </button>
              </div>
            )}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Blog;
