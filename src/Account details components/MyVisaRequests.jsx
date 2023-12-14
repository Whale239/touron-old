import React, { useState, useEffect, useContext, useRef } from 'react';
import './MyRequest.css';
import { GiRocketFlight } from 'react-icons/gi';
import * as RiIcons from 'react-icons/ri';
import { Ellipsis } from 'react-spinners-css';
import * as BiIcons from 'react-icons/bi';

import {
  Table,
  Input,
  Modal,
  Pagination,
  PaginationLink,
  PaginationItem,
} from 'reactstrap';
import Profilenav from './Profilenav';
import Profilepage from './Profilepage';
import { firedb, fireStorage } from '../firebase';
import { isAuthenticated } from '../Login components/auth';
import { useToasts } from 'react-toast-notifications';
import { ApiContext } from '../Context/ApiContext';

const MyVisaRequests = () => {
  const isMounted = useRef(false);
  const { addToast } = useToasts();
  const [visaRequest, setVisaRequest] = useState([]);
  const [selectedVisaRequest, setSelectedVisaRequest] = useState({});
  const [visaModal, setVisaModal] = useState(false);
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const [key, setKey] = useState('');
  const { user } = isAuthenticated();
  const { employees } = useContext(ApiContext);

  const isAdmin = (email) => {
    const loggedUser = employees?.filter((e) => e.email === email);
    if (loggedUser.length === 0) return false;
    return loggedUser[0].isAdmin;
  };

  const openVisaModal = () => {
    setVisaModal(true);
  };
  const closeVisaModal = () => {
    setVisaModal(false);
  };

  const innerWidth = window.innerWidth;
  useEffect(() => {
    if (innerWidth < 900) {
      setClicked(true);
    }
  }, [innerWidth]);

  useEffect(() => {
    isMounted.current = true;
    if (isAdmin(user.email)) getAllVisaRequest();
    else {
      getVisaRequest();
    }
    return () => (isMounted.current = false);
  }, []);

  const completed = () => {
    let count = 0;
    firedb.ref('visaSubmission').on('value', (data) => {
      if (data.val() !== null) {
        if (isAdmin(user.email)) {
          data.forEach((c) => {
            if (c.val().status === 'Completed') {
              count += 1;
            }
          });
        } else {
          data.forEach((c) => {
            if (c.val().userID === user.uid) {
              if (c.val().status === 'Completed') {
                count += 1;
              }
            }
          });
        }
      }
    });
    return count;
  };

  const updateVisaRequest = () => {
    firedb
      .ref(`visaSubmission/${key}`)
      .update({
        status: status,
      })
      .then(() => {
        setKey('');
        setStatus('');
        closeVisaModal();
        addToast('Visa Status Updated Successfully', {
          appearance: 'success',
        });
      })
      .catch((err) => console.log('err :>> ', err));
  };
  const getAllVisaRequest = () => {
    setLoading(true);
    firedb.ref('visaSubmission').on('value', (data) => {
      if (isMounted.current) {
        if (data.val() === null || data.val() === undefined) {
          setLoading(false);
          return;
        }
        if (data.val() !== null || data.val() !== undefined) {
          let newVr = {};
          let revVr = Object.keys(data.val()).reverse();
          revVr.forEach((i) => {
            newVr[i] = data.val()[i];
          });
          setVisaRequest({
            ...newVr,
          });
        }
      }
      setLoading(false);
    });
  };
  const getVisaRequest = () => {
    setLoading(true);
    let vr = [];
    firedb.ref('visaSubmission').on('value', (data) => {
      if (isMounted.current) {
        if (data.val() !== null) {
          data.forEach((c) => {
            if (c.val().userID === user.uid) {
              vr.push(c.val());
            }
          });
        }
      }
      setVisaRequest(vr.reverse());
      setLoading(false);
    });
  };

  const uploadFile = (e) => {
    let file = e.target.files[0];
    fireStorage
      .ref(`users/${user.uid}/plan.pdf`)
      .put(file)
      .then(() => {
        fireStorage
          .ref(`users/${user.uid}/plan.pdf`)
          .getDownloadURL()
          .then((fileUrl) => {
            firedb
              .ref(`visaSubmission/${key}`)
              .update({
                downloadUrl: fileUrl,
              })
              .then((data) => {
                closeVisaModal();
                addToast('Uploaded Successfully', {
                  appearance: 'success',
                });
              })
              .catch((err) =>
                addToast(err, {
                  appearance: 'success',
                })
              );
          })
          .catch((err) => console.log('err :>> ', err));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // const colors = [
  //   {
  //     name: "Query Received",
  //     color: "#f39c12",
  //   },

  //   {
  //     name: "On Progress",
  //     color: "#8e44ad",
  //   },

  //   {
  //     name: "Completed",
  //     color: "#55efc4",
  //   },
  // ];

  let pageSize = 10;
  let pagesCount = Math.ceil(Object.keys(visaRequest).length / pageSize);

  const handleClick = (e, index) => {
    e.preventDefault();

    setCurrentpage(index);
  };
  const [clicked, setClicked] = useState(false);
  const toggleSidebar = () => {
    setClicked(!clicked);
  };
  const [currentPage, setCurrentpage] = useState(0);

  return (
    <div style={{ display: 'flex' }}>
      <div className={clicked ? 'toggleSidebar' : 'toggleSideba'}>
        <Profilepage />
      </div>
      <div className='request-container'>
        <BiIcons.BiMenuAltRight
          onClick={toggleSidebar}
          size={50}
          color='white'
          style={{
            zIndex: 20,
            position: 'absolute',
            paddingLeft: 20,
            marginRight: 20,
            top: 18,
            cursor: 'pointer',
          }}
        />
        <div className='requests-info-visa'>
          <Profilenav title={'My Visa Request'} />
          <div className='requests-body-container '>
            <div className='card-body'>
              <div className='card-title'>
                <h5>Submitted Request</h5>
                <h1>{Object.keys(visaRequest).length}</h1>
              </div>
              <div className='card-logo logo1'>
                <RiIcons.RiVisaFill size={28} color='white' />
              </div>
            </div>
            <div className='card-body'>
              <div className='card-title'>
                <h5>Completed Request</h5>
                <h1>{completed()}</h1>
              </div>
              <div className='card-logo logo2'>
                <GiRocketFlight size={28} color='white' />
              </div>
            </div>
          </div>
        </div>

        <div className='requests-table'>
          <Table hover bordered>
            <thead>
              <tr>
                <th scope='col'>Name</th>
                <th scope='col'>Phone Number</th>
                <th scope='col'>Destination</th>
                <th scope='col'>Employee Type</th>
                <th scope='col'>Travel Month</th>
                <th scope='col'>No Of Persons</th>
                <th scope='col'>Request Status</th>
              </tr>
            </thead>
            <tbody className='bg-white'>
              {loading ? (
                <div className='loading'>
                  Fetching Data <Ellipsis color='#fff' />
                </div>
              ) : (
                <>
                  {visaRequest.length !== 0 ? (
                    <>
                      {Object.keys(visaRequest)
                        .slice(
                          currentPage * pageSize,
                          (currentPage + 1) * pageSize
                        )
                        .map((c, i) => (
                          <tr
                            key={i}
                            onClick={() => {
                              setKey(c);
                              setSelectedVisaRequest(visaRequest[c]);
                              openVisaModal();
                            }}>
                            <td>{visaRequest[c].name}</td>
                            <td>{visaRequest[c].phoneNumber}</td>
                            <td>{visaRequest[c].countryName}</td>
                            <td>{visaRequest[c].workType}</td>
                            <td>{visaRequest[c].travelMonth}</td>
                            <td>{visaRequest[c].persons}</td>
                            <td>{visaRequest[c].status}</td>
                          </tr>
                        ))}
                    </>
                  ) : (
                    <div className='noFind'>No Visa Request found</div>
                  )}
                </>
              )}
            </tbody>
          </Table>
        </div>
        {Object.keys(visaRequest).length <= 7 ? null : (
          <div>
            <Pagination
              className='pagination justify-content-end'
              listClassName='justify-content-end'>
              <PaginationItem disabled={currentPage <= 0}>
                <PaginationLink
                  onClick={(e) => handleClick(e, currentPage - 1)}
                  previous
                  href='#'>
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
                  onClick={(e) => handleClick(e, currentPage + 1)}
                  next
                  href='#'>
                  <i className='fa fa-angle-right' />
                </PaginationLink>
              </PaginationItem>
            </Pagination>
          </div>
        )}
      </div>
      <Modal
        className='modal-dialog-centered modal-danger'
        contentClassName='bg-gradient-danger'
        isOpen={visaModal}>
        <div className='modal-header'>
          <h6 className='modal-title' id='modal-title-notification'>
            Visa Request
          </h6>
          <button
            aria-label='Close'
            className='close'
            data-dismiss='modal'
            type='button'
            onClick={closeVisaModal}>
            <span aria-hidden={true}>×</span>
          </button>
        </div>
        <div className='modal-visadetails'>
          <h1>Name : {selectedVisaRequest.name}</h1>
          <h1>Phone Number : {selectedVisaRequest.phoneNumber}</h1>
          <h1>Country Name : {selectedVisaRequest.countryName}</h1>
          <h1>Work Type : {selectedVisaRequest.workType}</h1>
          <h1>No Of Persons : {selectedVisaRequest.persons}</h1>

          {isAdmin(user.email) ? (
            <>
              <div className='status' style={{ display: 'flex' }}>
                <h1>Status : </h1>
                <Input
                  type='select'
                  onChange={(e) => setStatus(e.target.value)}
                  value={status}>
                  <option value='Received'>Received</option>
                  <option value='On Progress'>On Progress</option>
                  <option value='Completed'>Completed</option>
                </Input>
              </div>
              <div className='update-button'>
                <button
                  className='btn btn-success btn-sm'
                  onClick={updateVisaRequest}>
                  Update
                </button>
                <Input
                  type='file'
                  hidden
                  id='fileUpload'
                  onChange={uploadFile}
                />
                <button
                  className='btn btn-success btn-sm'
                  onClick={() => {
                    const file = document.getElementById('fileUpload');
                    file.click();
                  }}>
                  Upload File
                </button>

                {selectedVisaRequest.downloadUrl === '' ? null : (
                  <button className='btn btn-success btn-sm'>
                    <a
                      target='_blank'
                      rel='noopener noreferrer'
                      className='plink'
                      href={selectedVisaRequest.downloadUrl}>
                      Download File
                    </a>
                  </button>
                )}
              </div>
            </>
          ) : (
            <>
              <h1>Status : {selectedVisaRequest.status}</h1>
              <div className='update-button'>
                {selectedVisaRequest.downloadUrl === '' ? null : (
                  <button className='btn btn-success btn-sm'>
                    <a
                      target='_blank'
                      rel='noopener noreferrer'
                      className='plink'
                      href={selectedVisaRequest.downloadUrl}>
                      Download File
                    </a>
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default MyVisaRequests;
