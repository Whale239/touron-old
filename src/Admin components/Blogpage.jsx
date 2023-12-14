import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Modal, ModalHeader, ModalFooter, ModalBody } from 'reactstrap';
import './Request.css';
import { API } from './../backend';
import axios from 'axios';
import './City.css';
import { BiEditAlt } from 'react-icons/bi';
import { RiDeleteBin2Fill } from 'react-icons/ri';
import { useToasts } from 'react-toast-notifications';
import './Blogpage.css';
import { GrFormView } from 'react-icons/gr';
import { Ellipsis } from 'react-spinners-css';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const Blogpage = () => {
  const [country, setCountries] = useState([]);
  const [selectCountry, setSelectCountry] = useState('');
  const { addToast } = useToasts();
  const [blog, setBlogs] = useState([]);
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pageSize, setPageSize] = useState(10);
  let pagesCount = Math.ceil(blog.length / pageSize);
  const [currentPage, setCurrentpage] = useState(0);
  const [editId, setEditId] = useState('');
  const handleClick = (e, index) => {
    e.preventDefault();
    setCurrentpage(index);
  };

  const [blogDetails, setBlogDetails] = useState({
    blogTitle: '',
    countryName: '',
    cityName: '',
    content: '',
    imageSrc: '',
    keywords: '',
    subHeading1: '',
    content1: '',
    imageSrc1: '',
    subHeading2: '',
    content2: '',
    imageSrc2: '',
    subHeading3: '',
    content3: '',
    imageSrc3: '',
    imageCredit: '',
    imageCredit1: '',
    imageCredit2: '',
    imageCredit3: '',
    writtenBy: '',
  });

  const {
    blogTitle,
    countryName,
    cityName,
    content,
    imageSrc,
    subHeading1,
    content1,
    imageSrc1,
    subHeading2,
    content2,
    imageSrc2,
    subHeading3,
    content3,
    keywords,
    imageSrc3,
    imageCredit,
    imageCredit1,
    imageCredit2,
    imageCredit3,
    writtenBy,
  } = blogDetails;

  const [modal, setModal] = useState(false);
  const closeModal = () => setModal(false);
  const openModal = () => setModal(true);

  const getBlogs = async () => {
    setLoading(true);
    const blogResponse = await axios.get(`${API}/blog`);
    setBlogs(blogResponse.data);
    setLoading(false);
  };

  const getBlogById = async (id) => {
    setEdit(true);
    await axios
      .get(`${API}/blog/edit/${id}`)
      .then((data) => {
        const blogData = data.data;
        setEditId(blogData._id);
        setBlogDetails({
          blogTitle: blogData.blogTitle,
          countryName: blogData.countryName,
          cityName: blogData.cityName,
          content: blogData.content,
          imageSrc: blogData.imageSrc,
          keywords: blogData.keywords,
          subHeading1: blogData.subHeading1,
          content1: blogData.content1,
          imageSrc1: blogData.imageSrc1,
          imageSrc2: blogData.imageSrc2,
          subHeading2: blogData.subHeading2,
          content2: blogData.content2,
          subHeading3: blogData.subHeading3,
          content3: blogData.content3,
          imageSrc3: blogData.imageSrc3,
          imageCredit: blogData.imageCredit,
          imageCredit1: blogData.imageCredit1,
          imageCredit2: blogData.imageCredit2,
          imageCredit3: blogData.imageCredit3,
          writtenBy: blogData.writtenBy,
        });
        openModal();
      })
      .catch((err) => console.log('err', err));
  };
  const addBlog = async () => {
    const blogData = {
      blogTitle,
      countryName,
      cityName,
      content,
      imageSrc,
      subHeading1,
      content1,
      imageSrc1,
      subHeading2,
      content2,
      imageSrc2,
      subHeading3,
      content3,
      keywords,
      imageSrc3,
      imageCredit,
      imageCredit1,
      imageCredit2,
      imageCredit3,
      writtenBy,
    };
    await axios
      .post(`${API}/blog`, blogData)
      .then((data) => {
        setBlogDetails({
          blogTitle: '',
          countryName: '',
          cityName: '',
          content: '',
          imageSrc: '',
          keywords: '',
          subHeading1: '',
          content1: '',
          imageSrc1: '',
          subHeading2: '',
          content2: '',
          imageSrc2: '',
          subHeading3: '',
          content3: '',
          imageSrc3: '',
          imageCredit: '',
          imageCredit1: '',
          imageCredit2: '',
          imageCredit3: '',
          writtenBy: '',
        });
        addToast('Added Successfully', {
          appearance: 'success',
        });
        closeModal();
        getBlogs();
      })
      .catch((err) => console.log('err', err));
  };
  const updateBlog = async () => {
    const blogData = {
      blogTitle,
      countryName,
      cityName,
      content,
      imageSrc,
      subHeading1,
      content1,
      imageSrc1,
      subHeading2,
      content2,
      imageSrc2,
      subHeading3,
      content3,
      keywords,
      imageSrc3,
      imageCredit,
      imageCredit1,
      imageCredit2,
      imageCredit3,
      writtenBy,
    };
    await axios
      .post(`${API}/blog/edit/${editId}`, blogData)
      .then((data) => {
        console.log(`data`, data);
        setEditId('');
        addToast('Updated Successfully', {
          appearance: 'success',
        });
        closeModal();
        setBlogDetails({
          blogTitle: '',
          countryName: '',
          cityName: '',
          content: '',
          imageSrc: '',
          keywords: '',
          subHeading1: '',
          content1: '',
          imageSrc1: '',
          subHeading2: '',
          content2: '',
          imageSrc2: '',
          subHeading3: '',
          content3: '',
          imageSrc3: '',
          imageCredit: '',
          imageCredit1: '',
          imageCredit2: '',
          imageCredit3: '',
          writtenBy: '',
        });
      })
      .catch((err) => console.log('err', err));
  };
  const deleteBlog = async (id) => {
    setEditId(id);
    await axios
      .post(`${API}/blog/delete/${id}`, id)
      .then((data) => {
        addToast('Deleted Successfully', {
          appearance: 'error',
        });
        setEditId('');
      })
      .catch((err) => console.log('err', err));
  };

  useEffect(() => {
    getBlogs();
  }, []);
  useEffect(() => {
    getCountries();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setBlogDetails({
      ...blogDetails,
      [name]: value,
    });
  };

  const getCountries = async () => {
    try {
      const countryResponse = await axios.get(`${API}/country`);
      setCountries([{ countryName: 'India' }, ...countryResponse.data]);
    } catch (err) {
      console.log(err, 'err');
    }
  };

  // const onCountryBlogClick = () => {
  //   if (selectCountry === "") return blog;

  //   const filter = blog.filter((c) => {
  //     return c.countryName === selectCountry;
  //   });

  //   return filter;
  // };

  return (
    <div className='request-container'>
      <div
        className='booking-container'
        style={{
          padding: '20px',
        }}>
        <div
          className='booking-name-container'
          style={{
            padding: '30px',
          }}>
          <div>
            <h3 style={{ color: '#666666' }}>Blog Details</h3>
          </div>
          <div
            className='add-booking'
            onClick={() => {
              setEdit(false);
              openModal();
            }}>
            <h6> + Add Blog</h6>
          </div>
        </div>
        <div
          className='filters'
          style={{
            padding: '30px',
          }}>
          <div className='month'>
            <label>Show Item : </label>
            <select
              value={pageSize}
              onChange={(e) => setPageSize(e.target.value)}>
              <option value='10'>10</option>
              <option value='20'>20</option>
              <option value='50'>50</option>
              <option value='100'>100</option>
            </select>
          </div>
          <div className='month'>
            <label>Search by country : </label>
            <select
              onChange={(e) => setSelectCountry(e.target.value)}
              value={selectCountry}>
              {country.map((c, index) => (
                <>
                  <option key={index} disabled selected hidden></option>
                  <option>{c.countryName}</option>
                </>
              ))}
            </select>
          </div>
        </div>

        <div className='b-table'>
          <div
            className='table-heading-container request'
            style={{
              width: '100%',
            }}>
            <h5>Sl.No</h5>
            <h5>Country Name</h5>
            <h5>Blog Name</h5>
            <h5>Added date</h5>
            <h5>Updated At</h5>
            <h5>Action</h5>
          </div>
          {loading ? (
            <div className='req-lo'>
              Fetching Data <Ellipsis color='#0057ff' />
            </div>
          ) : (
            <>
              {blog.length !== 0 ? (
                <>
                  {blog
                    .slice(currentPage * pageSize, (currentPage + 1) * pageSize)
                    .map((t, i) => {
                      return (
                        <div className='table-heading-row request' key={i}>
                          <h5>{i + 1}</h5>
                          <h5>{t.countryName}</h5>
                          <h5>{t.blogTitle}</h5>
                          <h5>{t.createdAt.slice(0, 10)}</h5>
                          <h5>{t.updatedAt.slice(0, 10)}</h5>
                          <h5>
                            <BiEditAlt
                              color='blue'
                              style={{ fontSize: 20, cursor: 'pointer' }}
                              onClick={() => getBlogById(t._id)}
                            />
                            <span>
                              <RiDeleteBin2Fill
                                onClick={() => deleteBlog(t._id)}
                                color='red'
                                style={{
                                  paddingLeft: 8,
                                  fontSize: 24,
                                  cursor: 'pointer',
                                }}
                              />
                            </span>
                            <span>
                              <Link
                                className='plink'
                                target='_blank'
                                to={{
                                  pathname: `/blogdetails/${t.blogTitle}/${t._id}/${t.countryName}`,
                                }}>
                                <GrFormView
                                  style={{
                                    paddingLeft: 8,
                                    fontSize: 26,
                                    cursor: 'pointer',
                                  }}
                                />
                              </Link>
                            </span>
                          </h5>
                        </div>
                      );
                    })}
                </>
              ) : (
                <div className='req-lo'>No Blog found</div>
              )}
            </>
          )}
        </div>
        <div className='pagination-table'>
          {currentPage === 0 ? null : (
            <div
              className='pag-count'
              onClick={(e) => {
                handleClick(e, currentPage - 1);
              }}
              style={{
                backgroundColor: '#0057ff',
                color: '#fff',
              }}>
              <h5>{'<'}</h5>
            </div>
          )}
          {new Array(pagesCount).fill('1').map((c, i) => {
            if (i + 1 < currentPage + 5 && i > currentPage - 2) {
              return (
                <div
                  className='pag-count'
                  onClick={(e) => handleClick(e, i)}
                  style={{
                    backgroundColor: currentPage === i ? '#0057ff' : '#fff',
                    color: currentPage === i ? '#fff' : '#333',
                  }}>
                  <h5>{i + 1}</h5>
                </div>
              );
            }
          })}
          {pagesCount - 1 === currentPage ? null : (
            <div
              className='pag-count'
              onClick={(e) => handleClick(e, currentPage + 1)}
              style={{
                backgroundColor: '#0057ff',
                color: '#fff',
              }}>
              <h5>{'>'}</h5>
            </div>
          )}
        </div>
      </div>
      <div className='b'>
        <Modal isOpen={modal} contentClassName='blog-request'>
          <ModalHeader toggle={closeModal}>Blog Details</ModalHeader>
          <ModalBody>
            <form>
              <div className='country--fiels-flex'>
                <div className='country--fiels-flex1'>
                  <div className='blog--field'>
                    <label>Blog Title</label>
                    <input
                      type='text'
                      name='blogTitle'
                      value={blogTitle}
                      onChange={handleChange}
                      className='user-input-alter user-input'
                    />
                  </div>
                  <div className='blog--field'>
                    <label>Country Name</label>
                    <select
                      onChange={handleChange}
                      value={countryName}
                      className='user-input-alter user-input'
                      name='countryName'>
                      {country.map((c, index) => (
                        <>
                          <option key={index} disabled selected hidden></option>
                          <option>{c.countryName}</option>
                        </>
                      ))}
                    </select>
                  </div>
                  <div className='blog--field'>
                    <label>City Name</label>
                    <input
                      type='text'
                      name='cityName'
                      value={cityName}
                      onChange={handleChange}
                      className='user-input-alter user-input'
                    />
                  </div>
                  <div className='blog--field'>
                    <label>Publish By</label>
                    <input
                      type='text'
                      name='writtenBy'
                      value={writtenBy}
                      onChange={handleChange}
                      className='user-input-alter user-input'
                    />
                  </div>
                  <div className='blog--field'>
                    <label>Image Src</label>
                    <input
                      type='text'
                      name='imageSrc'
                      value={imageSrc}
                      onChange={handleChange}
                      className='user-input-alter user-input'
                    />
                  </div>
                  <div className='blog--field'>
                    <label>Image Credit</label>
                    <input
                      type='text'
                      name='imageCredit'
                      value={imageCredit}
                      onChange={handleChange}
                      className='user-input-alter user-input'
                    />
                  </div>
                  <div className='blog--field'>
                    <label>Content</label>
                    {/* <textarea
                      cols="30"
                      rows="10"
                      name="content"
                      value={content}
                      onChange={handleChange}
                    /> */}
                    <CKEditor
                      editor={ClassicEditor}
                      data={content}
                      onChange={(event, editor) => {
                        const data = editor.getData();
                        console.log(`data`, data);
                        setBlogDetails({
                          ...blogDetails,
                          content: data,
                        });
                      }}
                    />
                  </div>
                </div>
                <div className='country--fiels-flex1'>
                  <div className='blog--field'>
                    <label>Sub Heading1 </label>
                    <input
                      type='text'
                      name='subHeading1'
                      value={subHeading1}
                      onChange={handleChange}
                      className='user-input-alter user-input'
                    />
                  </div>
                  <div className='blog--field'>
                    <label>Image Src1</label>
                    <input
                      type='text'
                      name='imageSrc1'
                      value={imageSrc1}
                      onChange={handleChange}
                      className='user-input-alter user-input'
                    />
                  </div>
                  <div className='blog--field'>
                    <label>Image Credit1</label>
                    <input
                      type='text'
                      name='imageCredit1'
                      value={imageCredit1}
                      onChange={handleChange}
                      className='user-input-alter user-input'
                    />
                  </div>
                  <div className='blog--field'>
                    <label>Content1</label>
                    {/* <textarea
                      cols="30"
                      rows="10"
                      name="content1"
                      value={content1}
                      onChange={handleChange}
                    /> */}
                    <CKEditor
                      editor={ClassicEditor}
                      data={content1}
                      onChange={(event, editor) => {
                        const data = editor.getData();
                        setBlogDetails({
                          ...blogDetails,
                          content1: data,
                        });
                      }}
                    />
                  </div>
                </div>
                <div className='country--fiels-flex1'>
                  <div className='blog--field'>
                    <label>Sub Heading2 </label>
                    <input
                      type='text'
                      name='subHeading2'
                      value={subHeading2}
                      onChange={handleChange}
                      className='user-input-alter user-input'
                    />
                  </div>
                  <div className='blog--field'>
                    <label>Image Src2</label>
                    <input
                      type='text'
                      name='imageSrc2'
                      value={imageSrc2}
                      onChange={handleChange}
                      className='user-input-alter user-input'
                    />
                  </div>
                  <div className='blog--field'>
                    <label>Image Credit2</label>
                    <input
                      type='text'
                      name='imageCredit2'
                      value={imageCredit2}
                      onChange={handleChange}
                      className='user-input-alter user-input'
                    />
                  </div>
                  <div className='blog--field'>
                    <label>Content2</label>
                    {/* <textarea
                      cols="30"
                      rows="10"
                      name="content2"
                      value={content2}
                      onChange={handleChange}
                    /> */}
                    <CKEditor
                      editor={ClassicEditor}
                      data={content2}
                      onChange={(event, editor) => {
                        const data = editor.getData();
                        setBlogDetails({
                          ...blogDetails,
                          content2: data,
                        });
                      }}
                    />
                  </div>
                </div>
                <div className='country--fiels-flex1'>
                  <div className='blog--field'>
                    <label>Sub Heading3 </label>
                    <input
                      type='text'
                      name='subHeading3'
                      value={subHeading3}
                      onChange={handleChange}
                      className='user-input-alter user-input'
                    />
                  </div>
                  <div className='blog--field'>
                    <label>Image Src3</label>
                    <input
                      type='text'
                      name='imageSrc3'
                      value={imageSrc3}
                      onChange={handleChange}
                      className='user-input-alter user-input'
                    />
                  </div>
                  <div className='blog--field'>
                    <label>Image Credit3</label>
                    <input
                      type='text'
                      name='imageCredit3'
                      value={imageCredit3}
                      onChange={handleChange}
                      className='user-input-alter user-input'
                    />
                  </div>
                  <div className='blog--field'>
                    <label>Content3</label>
                    {/* <textarea
                      cols="30"
                      rows="10"
                      name="content3"
                      value={content3}
                      onChange={handleChange}
                    /> */}
                    <CKEditor
                      editor={ClassicEditor}
                      data={content3}
                      onChange={(event, editor) => {
                        const data = editor.getData();
                        setBlogDetails({
                          ...blogDetails,
                          content3: data,
                        });
                      }}
                    />
                  </div>
                  <div className='blog--field'>
                    <label>Keywords</label>
                    <input
                      type='text'
                      name='keywords'
                      value={keywords}
                      onChange={handleChange}
                      className='user-input-alter user-input'
                    />
                  </div>
                </div>
              </div>
            </form>
          </ModalBody>
          <ModalFooter>
            {!edit ? (
              <Button style={{ backgroundColor: '#1B98F5' }} onClick={addBlog}>
                Add
              </Button>
            ) : (
              <Button
                style={{ backgroundColor: '#4DD637' }}
                onClick={updateBlog}>
                Update
              </Button>
            )}
          </ModalFooter>
        </Modal>
      </div>
    </div>
  );
};

export default Blogpage;
