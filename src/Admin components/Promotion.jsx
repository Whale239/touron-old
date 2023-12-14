import React, { useState, useEffect, useRef } from 'react';
import {
  Table,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Pagination,
  PaginationLink,
  PaginationItem,
} from 'reactstrap';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import './Promotion.css';
import { BiEditAlt } from 'react-icons/bi';
import { useToasts } from 'react-toast-notifications';
import { firedb, fireStorage } from '../firebase';
import parse from 'html-react-parser';

const Promotion = () => {
  const isMounted = useRef(false);
  const [promotion, setPromotion] = useState([]);
  const [modal, setModal] = useState(false);
  const closeModal = () => setModal(false);
  const openModal = () => setModal(true);
  const [image, setImage] = useState('');
  const [content, setContent] = useState('');
  const [edit, setEdit] = useState(false);
  const [id, setId] = useState('');
  const [promoCode, setPromoCode] = useState('');
  const { addToast } = useToasts();
  const [keys, setKeys] = useState('');
  const [currentPage, setCurrentpage] = useState(0);
  const pageSize = 10;
  const [userDetails, setUserDetails] = useState([]);

  let pagesCount = Math.ceil(Object.keys(promotion).length / pageSize);

  const getAllUserDetail = () => {
    const m = [];
    firedb.ref('/userGeneralInfo').on('value', (data) => {
      if (isMounted.current) {
        data.forEach((c) => {
          m.push(c.val());
        });
      }
    });
    setUserDetails(m);
  };
  useEffect(() => {
    isMounted.current = true;
    getAllUserDetail();
    return () => (isMounted.current = false);
  }, []);

  const add = (e) => {
    e.preventDefault();
    firedb
      .ref(`promotion`)
      .push({
        id: id,
        image: image,
        content: content,
        promoCode: promoCode,
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
    setImage('');
    setContent('');
  };

  const getPromotion = () => {
    firedb.ref('promotion').on('value', (data) => {
      if (isMounted.current) {
        if (data.val() !== null) {
          let newReq = {};
          let revReq = Object.keys(data.val()).reverse();
          revReq.forEach((i) => {
            newReq[i] = data.val()[i];
          });
          setPromotion({
            ...newReq,
          });
        }
      }
    });
  };

  const uploadImage = (e) => {
    let image = e.target.files[0];
    fireStorage
      .ref(`users/${id}/promotion`)
      .put(image)
      .then(() => {
        fireStorage
          .ref(`users/${id}/promotion`)
          .getDownloadURL()
          .then((imageUrl) => {
            setImage(imageUrl);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getPromotionById = (key) => {
    setEdit(false);
    setKeys(key);
    firedb.ref(`promotion/${key}`).on('value', (data) => {
      const promoDetails = data.val();
      setId(promoDetails.id);
      setImage(promoDetails.image);
      setContent(promoDetails.content);
    });
    openModal();
  };

  const updatePromo = () => {
    firedb
      .ref(`promotion/${keys}`)
      .update({
        id: id,
        image: image,
        content: content,
        promoCode: promoCode,
      })
      .then((data) => {
        addToast('Updated Successfully', {
          appearance: 'success',
        });
        setModal(false);
      })
      .catch((err) =>
        addToast(err, {
          appearance: 'success',
        })
      );
  };

  // const deletePromo = (key) => {
  //   firedb
  //     .ref(`promotion/${key}`)
  //     .remove()
  //     .then(function () {
  //       console.log("Document successfully deleted!");
  //     })
  //     .catch(function (error) {
  //       console.error("Error removing document: ", error);
  //     });
  // };

  useEffect(() => {
    isMounted.current = true;
    getPromotion();
    return () => (isMounted.current = false);
  }, []);

  const handleClick = (e, index) => {
    e.preventDefault();
    setCurrentpage(index);
  };

  return (
    <>
      <Modal isOpen={modal}>
        <ModalHeader toggle={closeModal}>Promotion</ModalHeader>
        <ModalBody>
          <form>
            <div className='promo-field'>
              <label>Add Image</label>
              <input type='file' onChange={(e) => uploadImage(e)} />
            </div>
            <div className='promo-field'>
              <label>Content</label>
              <div style={{ width: 400 }}>
                <CKEditor
                  editor={ClassicEditor}
                  data={content}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    setContent(data);
                  }}
                />
              </div>
            </div>
            <div className='promo-field'>
              <label>Promo code</label>
              <input
                style={{ width: '70%' }}
                type='text'
                onChange={(e) => setPromoCode(e.target.value)}
              />
            </div>
          </form>
        </ModalBody>
        <ModalFooter>
          {edit ? (
            <Button
              disabled={image === '' ? true : false}
              style={{ backgroundColor: '#1B98F5' }}
              onClick={add}>
              Add
            </Button>
          ) : (
            <Button
              disabled={image === '' ? true : false}
              style={{ backgroundColor: '#4DD637' }}
              onClick={updatePromo}>
              Update
            </Button>
          )}
        </ModalFooter>
      </Modal>
      <div className='testi-btn-div'>
        {/* <button onClick={sendPushNotifications}>send</button> */}
        <button
          className='testi-btn'
          onClick={() => {
            setEdit(true);
            openModal();
            setId(Math.floor(Math.random() * 106598587756368));
          }}>
          Add New
        </button>
      </div>
      <div className='request-container'>
        <div className='page-title'>
          <h3>Promotion</h3>
        </div>
        <div className='reqtable'>
          <div className='entries'>
            <div style={{ display: 'flex' }}>
              <h3>Show Entries</h3>
              <Input type='select'>
                <option value='10'>10</option>
                <option value='20'>20</option>
                <option value='50'>50</option>
                <option value='100'>100</option>
              </Input>
            </div>
            {promotion.length <= 7 ? null : (
              <Pagination
                className='pagination justify-content-end'
                style={{ marginTop: 100 }}>
                <PaginationItem disabled={currentPage <= 0}>
                  <PaginationLink
                    previous
                    href='#'
                    onClick={(e) => handleClick(e, currentPage - 1)}>
                    <i className='fa fa-angle-left' />
                  </PaginationLink>
                </PaginationItem>
                {[...Array(pagesCount)].map((page, i) => (
                  <PaginationItem active={i === currentPage} key={i}>
                    <PaginationLink
                      onClick={(e) => handleClick(e, i)}
                      href='#pablo'>
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}

                <PaginationItem disabled={currentPage >= pagesCount - 1}>
                  <PaginationLink
                    next
                    href='#'
                    onClick={(e) => handleClick(e, currentPage + 1)}>
                    <i className='fa fa-angle-right' />
                  </PaginationLink>
                </PaginationItem>
              </Pagination>
            )}
          </div>
          <Table striped>
            <thead>
              <tr>
                <th scope='col'>Sl.No</th>
                <th scope='col'>Image</th>
                <th scope='col'>Content</th>
                <th scope='col'>Promo Code</th>
                <th scope='col'>Action</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(promotion).map((c, index) => (
                <tr key={index}>
                  <td> {index + 1}</td>

                  <td>
                    <img
                      src={promotion[c].image}
                      style={{ width: 50, height: 50 }}
                      alt=''
                    />
                  </td>
                  <td> {parse(promotion[c].content)}</td>
                  <td>{promotion[c].promoCode}</td>
                  <td>
                    <BiEditAlt
                      color='blue'
                      style={{ fontSize: 20, cursor: 'pointer' }}
                      onClick={() => getPromotionById(c)}
                    />
                    {/* <span>
                      <RiDeleteBin2Fill
                        color="red"
                        style={{
                          paddingLeft: 8,
                          fontSize: 24,
                          cursor: "pointer",
                        }}
                        onClick={() => deletePromo(c)}
                      />
                    </span> */}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default Promotion;
