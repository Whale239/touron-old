import React, { useState, useEffect, useRef } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { firedb, fireStorage } from '../firebase';
import './Testimonialspage.css';
import './Request.css';
import { useToasts } from 'react-toast-notifications';
import { BiEditAlt } from 'react-icons/bi';
import { RiDeleteBin2Fill } from 'react-icons/ri';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import parse from 'html-react-parser';
import { Ellipsis } from 'react-spinners-css';

const Testimonialspage = () => {
  const isMounted = useRef(false);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const closeModal = () => setModal(false);
  const openModal = () => setModal(true);
  const [edit, setEdit] = useState(false);
  const [name, setName] = useState('');
  const [tourPlace, setTourPlace] = useState('');
  const [comment, setComment] = useState('');
  const [testImage, setTestImage] = useState('');
  const [field, setField] = useState('');
  const [id, setId] = useState('');
  const { addToast } = useToasts();
  const [keys, setKeys] = useState('');
  const [currentPage, setCurrentpage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  let pagesCount = Math.ceil(Object.keys(testimonials).length / pageSize);

  const add = (e) => {
    e.preventDefault();
    firedb
      .ref(`testimonials`)
      .push({
        id: id,
        name: name,
        tourPlace: tourPlace,
        field: field,
        comment: comment,
        testImage: testImage,
      })
      .then((data) => {
        addToast('Added Successfully', {
          appearance: 'success',
        });
        setModal(false);
      })
      .catch((err) =>
        addToast(err, {
          appearance: 'success',
        })
      );
    setId('');
    setName('');
    setTourPlace('');
    setComment('');
    setTestImage('');
  };

  const getTestimonial = () => {
    setLoading(true);
    firedb.ref('testimonials').on('value', (data) => {
      if (data.val() !== null) {
        let newReq = {};
        let revReq = Object.keys(data.val()).reverse();
        revReq.forEach((i) => {
          newReq[i] = data.val()[i];
        });
        setTestimonials({
          ...newReq,
        });
        setLoading(false);
      }
    });
  };

  const getTestimonialById = (key) => {
    setEdit(false);
    setKeys(key);
    firedb.ref(`testimonials/${key}`).on('value', (data) => {
      if (isMounted.current) {
        const testiDetails = data.val();
        setId(testiDetails.id);
        setName(testiDetails.name);
        setComment(testiDetails.comment);
        setTourPlace(testiDetails.tourPlace);
        setTestImage(testiDetails.testImage);
        setField(testiDetails.field);
      }
    });
    openModal();
  };

  const updateTesti = () => {
    firedb
      .ref(`testimonials/${keys}`)
      .update({
        id: id,
        name: name,
        tourPlace: tourPlace,
        comment: comment,
        testImage: testImage,
        field: field,
      })
      .then((data) => {
        addToast('Updated Successfully', {
          appearance: 'success',
        });
        setModal(false);
        setId('');
        setName('');
        setTourPlace('');
        setComment('');
        setTestImage('');
      })
      .catch((err) =>
        addToast(err, {
          appearance: 'success',
        })
      );
  };

  const deleteTesti = (key) => {
    firedb
      .ref(`testimonials/${key}`)
      .remove()
      .then(function () {
        addToast('Deleted Successfully', {
          appearance: 'error',
        });
      })
      .catch(function (error) {
        console.error('Error removing document: ', error);
      });
  };

  useEffect(() => {
    isMounted.current = true;
    getTestimonial();
    return () => (isMounted.current = false);
  }, []);

  const handleClick = (e, index) => {
    e.preventDefault();
    setCurrentpage(index);
  };

  const uploadImage = (e) => {
    let image = e.target.files[0];
    fireStorage
      .ref(`users/${id}/testimonials`)
      .put(image)
      .then(() => {
        fireStorage
          .ref(`users/${id}/testimonials`)
          .getDownloadURL()
          .then((imageUrl) => {
            setTestImage(imageUrl);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Modal isOpen={modal}>
        <ModalHeader toggle={closeModal}>Testimonilas</ModalHeader>
        <ModalBody>
          <form>
            <div className='testi-field'>
              <label>Name</label>
              <input
                type='text'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className='testi-fieldd'>
              <label>Upload Image</label>
              <input type='file' onChange={(e) => uploadImage(e)} />
            </div>
            <div className='testi-field'>
              <label>Tour place</label>
              <input
                type='text'
                value={tourPlace}
                onChange={(e) => setTourPlace(e.target.value)}
              />
              {/* <select
                type="text"
                value={tourPlace}
                onChange={(e) => setTourPlace(e.target.value)}
              >
                {testimonialsCities.map((t, index) => (
                  <>
                    <option key={index} value="" disabled selected hidden>
                      Select Country
                    </option>
                    <option value={t}>{t}</option>
                  </>
                ))}
              </select> */}
            </div>
            <div className='testi-field'>
              <label>Field</label>
              <select
                type='text'
                value={field}
                onChange={(e) => setField(e.target.value)}>
                <option value='' disabled selected hidden>
                  Select Field
                </option>
                <option value='Facebook'>Facebook</option>
                <option value='Instagram'>Instagram</option>
                <option value='Whatsapp'>Whatsapp</option>
                <option value='Google'>Google</option>
              </select>
            </div>
            <div className='testi-field'>
              <label>Comment</label>
              <div style={{ width: 400 }}>
                <CKEditor
                  editor={ClassicEditor}
                  data={comment}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    setComment(data);
                  }}
                />
              </div>
            </div>
          </form>
        </ModalBody>
        <ModalFooter>
          {edit ? (
            <Button
              disabled={testImage === '' ? true : false}
              style={{ backgroundColor: '#1B98F5' }}
              onClick={add}>
              Add
            </Button>
          ) : (
            <Button
              disabled={testImage === '' ? true : false}
              style={{ backgroundColor: '#4DD637' }}
              onClick={updateTesti}>
              Update
            </Button>
          )}
        </ModalFooter>
      </Modal>

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
            <h3 style={{ color: '#666666' }}>Testimonials</h3>
          </div>
          <div
            className='add-booking'
            onClick={() => {
              setEdit(true);
              openModal();
              setId(Math.floor(Math.random() * 106598587756368));
            }}>
            <h6> + Add New</h6>
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
        </div>

        <div className='b-table'>
          <div
            className='table-heading-container request'
            style={{
              width: '100%',
            }}>
            <h5>Sl.No</h5>
            <h5>Name</h5>
            <h5 style={{ flexBasis: '90%' }}>Comment</h5>
            <h5>Tour place</h5>
            <h5>Field</h5>
            <h5>Image</h5>
            <h5>Action</h5>
          </div>
          {loading ? (
            <div className='req-lo'>
              Fetching Data <Ellipsis color='#0057ff' />
            </div>
          ) : (
            <>
              {Object.keys(testimonials).length !== 0 ? (
                <>
                  {Object.keys(testimonials)
                    .slice(currentPage * pageSize, (currentPage + 1) * pageSize)
                    .map((c, i) => {
                      return (
                        <div className='table-heading-row request' key={i}>
                          <h5>{i + 1}</h5>
                          <h5>{testimonials[c].name}</h5>
                          <h5 style={{ flexBasis: '90%' }}>
                            {parse(testimonials[c].comment)}
                          </h5>
                          <h5>{testimonials[c].tourPlace}</h5>
                          <h5>{testimonials[c].field}</h5>
                          <h5>
                            <img
                              src={testimonials[c].testImage}
                              style={{ width: 50, height: 50 }}
                              alt=''
                            />
                          </h5>
                          <h5>
                            <BiEditAlt
                              color='blue'
                              style={{ fontSize: 20, cursor: 'pointer' }}
                              onClick={() => getTestimonialById(c)}
                            />
                            <span>
                              <RiDeleteBin2Fill
                                color='red'
                                style={{
                                  paddingLeft: 8,
                                  fontSize: 24,
                                  cursor: 'pointer',
                                }}
                                onClick={() => deleteTesti(c)}
                              />
                            </span>
                          </h5>
                        </div>
                      );
                    })}
                </>
              ) : (
                <div className='req-lo'>No Testimonials found</div>
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
    </>
  );
};

export default Testimonialspage;
