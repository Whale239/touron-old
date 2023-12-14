import React, { useState, useEffect, useRef } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { firedb, fireStorage } from '../firebase';
import { useToasts } from 'react-toast-notifications';
import { HiPencilAlt, HiTrash } from 'react-icons/hi';

const EmployeePhoto = () => {
  const isMounted = useRef(false);
  const { addToast } = useToasts();
  const [modal, setModal] = useState(false);
  const [edit, setEdit] = useState(false);
  const [empId, setEmpId] = useState('');
  const [empName, setEmpName] = useState('');
  const [empDesg, setEmpDesg] = useState('');
  const [image, setImage] = useState('');
  const [designations, setDesignations] = useState([]);
  const [empDetails, setEmpDetails] = useState([]);
  const openModal = () => setModal(true);
  const closeModal = () => {
    setModal(false);
  };
  const [delModal, setDelModal] = useState(false);
  const closeDelModal = () => setDelModal(false);
  const openDelModal = () => setDelModal(true);

  useEffect(() => {
    isMounted.current = true;
    getDesignations();
    return () => (isMounted.current = false);
  }, []);

  const getDesignations = () => {
    let desg = [];
    firedb.ref('designations').on('value', (snapshot) => {
      if (isMounted.current) {
        if (snapshot.val() != null)
          snapshot.forEach((d) => {
            desg.push(d.val());
          });
      }
      setDesignations(desg);
    });
  };

  const uploadImage = (e) => {
    let image = e.target.files[0];
    fireStorage
      .ref(`employeephoto/${image.name}`)
      .put(image)
      .then(() => {
        fireStorage
          .ref(`employeephoto/${image.name}`)
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

  const addEmpPhoto = () => {
    firedb
      .ref('employeephotodetails')
      .push({
        name: empName,
        designation: empDesg,
        img: image,
      })
      .then(() => {
        setModal(false);
        addToast('Employee photo added successfully', {
          appearance: 'success',
        });
        setEmpName('');
        setEmpDesg('');
        setImage('');
      })
      .catch((err) => {
        console.log('err', err);
      });
  };

  const updateEmpPhoto = () => {
    firedb
      .ref(`employeephotodetails/${empId}`)
      .set({
        name: empName,
        designation: empDesg,
        img: image,
      })
      .then(() => {
        setModal(false);
        setEdit(false);
        setEmpId('');
        addToast('Employee photo updated successfully', {
          appearance: 'success',
        });
        setEmpName('');
        setEmpDesg('');
        setImage('');
      })
      .catch((err) => {
        console.log('err', err);
      });
  };

  const deleteEmpPhoto = () => {
    firedb
      .ref(`employeephotodetails/${empId}`)
      .remove()
      .then(() => {
        setDelModal(false);
        setEmpId('');
        addToast('Employee photo deleted successfully', {
          appearance: 'error',
        });
      })
      .catch((err) => {
        console.log('err', err);
      });
  };

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
  }, [empId]);

  return (
    <div>
      <Modal isOpen={delModal}>
        <ModalHeader toggle={closeDelModal}>Delete Employee photo</ModalHeader>
        <ModalBody>
          <div>
            <h5>Are you sure, you want to delete this Employee photo</h5>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            style={{ backgroundColor: '#12B0E8' }}
            onClick={() => setDelModal(false)}>
            Cancel
          </Button>
          <Button
            style={{ backgroundColor: '#E21717' }}
            onClick={() => deleteEmpPhoto()}>
            Delete
          </Button>
        </ModalFooter>
      </Modal>
      <Modal isOpen={modal}>
        <ModalHeader toggle={closeModal}>
          {edit ? 'Update Employee Photo' : 'Add Employee Photo'}
        </ModalHeader>
        <ModalBody>
          <div className='adminFieldMain'>
            <div className='adminField'>
              <h6>Employee Name</h6>
              <input
                type='name'
                value={empName}
                onChange={(e) => setEmpName(e.target.value)}
              />
            </div>
            <div className='adminField'>
              <h6>Designation</h6>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <select
                  value={empDesg}
                  onChange={(e) => setEmpDesg(e.target.value)}>
                  {designations.map((d) => {
                    return (
                      <>
                        <option value='' selected hidden>
                          Select
                        </option>
                        <option value={d}>{d}</option>
                      </>
                    );
                  })}
                </select>
              </div>
            </div>
            <div className='adminField'>
              <h6>Add Employee Image</h6>
              <input type='file' onChange={(e) => uploadImage(e)} />
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            style={{ backgroundColor: '#4DD637' }}
            onClick={() => (empId ? updateEmpPhoto() : addEmpPhoto())}>
            {empId ? 'Update' : 'Add'}
          </Button>
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
            <h3 style={{ color: '#666666' }}>Employee photo Section</h3>
          </div>
          <div className='add-booking' onClick={() => openModal()}>
            <h6> + Add Employee photo</h6>
          </div>
        </div>
        <div className='b-table'>
          <div className='table-heading-container  admin-table'>
            <h5>Sl.No</h5>
            <h5>Name</h5>
            <h5>Designation</h5>
            <h5>Image</h5>
            <h5>Action</h5>
          </div>
          <div>
            {empDetails.map((e, i) => {
              return (
                <div className='table-heading-row  admin-table' key={i}>
                  <h5>{i + 1}</h5>
                  <h5>{e.name}</h5>
                  <h5>{e.designation}</h5>
                  <img src={e.img} alt='/' style={{ width: 180 }} />
                  <h5>
                    <div>
                      <HiPencilAlt
                        style={{
                          color: 'blue',
                          marginRight: '5px',
                          cursor: 'pointer',
                        }}
                        onClick={() => {
                          setEmpName(e.name);
                          setEmpDesg(e.designation);
                          setEmpId(e.id);
                          setEdit(true);
                          openModal();
                        }}
                      />
                      <HiTrash
                        style={{
                          color: 'red',
                          marginLeft: '5px',
                          cursor: 'pointer',
                        }}
                        onClick={() => {
                          setEmpId(e.id);
                          openDelModal();
                        }}
                      />
                    </div>
                  </h5>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeePhoto;
