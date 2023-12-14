import React, { useState, useEffect, useContext, useRef } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './Adminusers.css';
import { HiCheck, HiPencilAlt, HiTrash, HiX } from 'react-icons/hi';
import { AiOutlinePlus } from 'react-icons/ai';
import { ErrorMessage, Field, Formik } from 'formik';
import * as Yup from 'yup';
import { firedb } from '../firebase';
import { useToasts } from 'react-toast-notifications';
import { ApiContext } from '../Context/ApiContext';

const Adminusers = () => {
  const isMounted = useRef(false);
  const { cont } = useContext(ApiContext);
  const { addToast } = useToasts();
  const [modal, setModal] = useState(false);
  const [desig, setDesig] = useState('');
  const closeModal = () => setModal(false);
  const openModal = () => setModal(true);
  const [delModal, setDelModal] = useState(false);
  const closeDelModal = () => setDelModal(false);
  const openDelModal = () => setDelModal(true);
  const [employees, setEmployees] = useState({});
  const [edit, setEdit] = useState(false);
  const [designations, setDesignations] = useState({});
  const [empId, setEmpId] = useState('');
  const [prevValues, setPrevValues] = useState({
    prevName: '',
    prevEmail: '',
    prevDesignation: '',
    prevIsAdmin: false,
  });
  const [openDes, setOpenDes] = useState(false);

  const { prevName, prevDesignation, prevEmail, prevIsAdmin } = prevValues;

  const initialValues = {
    name: edit ? prevName : '',
    email: edit ? prevEmail : '',
    designation: edit ? prevDesignation : '',
    isAdmin: edit ? prevIsAdmin : false,
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Required!'),
    email: Yup.string().email('Invalid Email').required('Required!'),
    designation: Yup.string().required('Required'),
    isAdmin: Yup.boolean(),
  });

  const onSubmit = (values) => {
    if (edit) {
      updateEmployee(values);
    } else {
      addEmployee(values);
    }
  };

  const addEmployee = (values) => {
    firedb
      .ref('employeeDetail')
      .push(values)
      .then(() => {
        setModal(false);
        addToast('Employee added successfully', {
          appearance: 'success',
        });
      })
      .catch((err) => {
        console.log('err', err);
      });
  };

  const updateEmployee = (values) => {
    firedb
      .ref(`employeeDetail/${empId}`)
      .set(values)
      .then(() => {
        setModal(false);
        setEdit(false);
        setEmpId('');
        addToast('Employee updated successfully', {
          appearance: 'info',
        });
      })
      .catch((err) => {
        console.log('err', err);
      });
  };

  const deleteEmployee = () => {
    firedb
      .ref(`employeeDetail/${empId}`)
      .remove()
      .then(() => {
        setDelModal(false);
        setEmpId('');
        addToast('Employee deleted successfully', {
          appearance: 'error',
        });
      })
      .catch((err) => {
        console.log('err', err);
      });
  };

  const getEmployee = () => {
    firedb.ref('employeeDetail').on('value', (snapshot) => {
      if (isMounted.current) {
        if (snapshot.val() != null)
          setEmployees({
            ...snapshot.val(),
          });
      }
    });
  };
  const getDesignations = () => {
    firedb.ref('designations').on('value', (snapshot) => {
      if (isMounted.current) {
        if (snapshot.val() != null)
          setDesignations({
            ...snapshot.val(),
          });
      }
    });
  };

  const showContact = () => {
    firedb
      .ref('contacts')
      .set({
        contact: 'on',
      })
      .then(() => {
        addToast('Contact showed successfully', {
          appearance: 'success',
        });
      })
      .catch((err) => {
        console.log('err', err);
      });
  };

  const hideContact = () => {
    firedb
      .ref('contacts')
      .set({
        contact: 'off',
      })
      .then(() => {
        addToast('Contact hided successfully', {
          appearance: 'success',
        });
      })
      .catch((err) => {
        console.log('err', err);
      });
  };

  useEffect(() => {
    isMounted.current = true;
    getEmployee();
    return () => (isMounted.current = false);
  }, []);
  useEffect(() => {
    isMounted.current = true;
    getDesignations();
    return () => (isMounted.current = false);
  }, []);

  const desg = [
    'CEO',
    'CFO',
    'Travel Associate',
    'Travel Consultant',
    'Junior Software Engg',
  ];

  const addDesignation = () => {
    firedb
      .ref('designations')
      .push(desig)
      .then(() => {
        addToast('Designations added successfully', {
          appearance: 'success',
        });
      })
      .catch((err) => {
        console.log('err', err);
      });
  };
  return (
    <>
      <Modal isOpen={delModal}>
        <ModalHeader toggle={closeDelModal}>Delete Employee</ModalHeader>
        <ModalBody>
          <div>
            <h5>Are you sure, you want to delete this employee</h5>
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
            onClick={() => deleteEmployee()}>
            Delete
          </Button>
        </ModalFooter>
      </Modal>
      <Modal isOpen={modal}>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}>
          {({ handleSubmit, values, setFieldValue }) => {
            return (
              <>
                <ModalHeader toggle={closeModal}>
                  {edit ? 'Update Employee' : 'Add Employee'}
                </ModalHeader>
                <ModalBody>
                  <div className='adminFieldMain'>
                    <div className='adminField'>
                      <h6>Employee Name</h6>
                      <Field type='text' name='name' />
                      <ErrorMessage name='name'>
                        {(msg) => {
                          return (
                            <div className='errMsg'>
                              <h6>{msg}</h6>
                            </div>
                          );
                        }}
                      </ErrorMessage>
                    </div>
                    <div className='adminField'>
                      <h6>Email</h6>
                      <Field type='text' name='email' />
                      <ErrorMessage name='email'>
                        {(msg) => {
                          return (
                            <div className='errMsg'>
                              <h6>{msg}</h6>
                            </div>
                          );
                        }}
                      </ErrorMessage>
                    </div>
                    <div className='adminField'>
                      <h6>Designation</h6>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <select
                          name='designation'
                          value={values.designation}
                          onChange={(e) =>
                            setFieldValue('designation', e.target.value)
                          }>
                          {Object.values(designations).map((d) => (
                            <>
                              <option value='' selected hidden>
                                Select
                              </option>
                              <option value={d}>{d}</option>
                            </>
                          ))}
                        </select>
                        {openDes ? (
                          <HiX
                            color='red'
                            style={{ marginLeft: '10px', cursor: 'pointer' }}
                            onClick={() => setOpenDes(false)}
                          />
                        ) : (
                          <AiOutlinePlus
                            color='blue'
                            style={{ marginLeft: '10px', cursor: 'pointer' }}
                            onClick={() => setOpenDes(true)}
                          />
                        )}
                      </div>
                      <ErrorMessage name='designation'>
                        {(msg) => {
                          return (
                            <div className='errMsg'>
                              <h6>{msg}</h6>
                            </div>
                          );
                        }}
                      </ErrorMessage>
                      {openDes && (
                        <div className='adminField'>
                          <h6>Add</h6>
                          <input
                            onChange={(e) => setDesig(e.target.value)}
                            value={desig}
                          />
                          <button onClick={addDesignation}>Add</button>
                        </div>
                      )}
                    </div>

                    <div className='adminField'>
                      <Field
                        type='checkbox'
                        name='isAdmin'
                        onChange={() =>
                          setFieldValue('isAdmin', !values.isAdmin)
                        }
                      />
                      <h6>isAdmin</h6>
                    </div>
                  </div>
                </ModalBody>
                <ModalFooter>
                  {edit ? (
                    <Button
                      style={{ backgroundColor: '#4DD637' }}
                      onClick={handleSubmit}>
                      Update
                    </Button>
                  ) : (
                    <Button
                      style={{ backgroundColor: '#1B98F5' }}
                      onClick={handleSubmit}>
                      Add
                    </Button>
                  )}
                </ModalFooter>
              </>
            );
          }}
        </Formik>
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
            <h3 style={{ color: '#666666' }}>Employee Section</h3>
          </div>
          <div className='add-booking' onClick={() => openModal()}>
            <h6> + Add Employee</h6>
          </div>
          <div
            className={cont == 'on' ? 'hCont-button' : 'sCont-button'}
            onClick={() => {
              cont == 'on' ? hideContact() : showContact();
            }}>
            <h6>{cont == 'on' ? 'Hide contact' : 'Show contact'}</h6>
          </div>
        </div>
        <div className='b-table'>
          <div className='table-heading-container  admin-table'>
            <h5>Sl.No</h5>
            <h5>Name</h5>
            <h5>Email</h5>
            <h5>Designation</h5>
            <h5>Admin</h5>
            <h5>Action</h5>
          </div>

          <div>
            {Object.keys(employees).map((emp, i) => {
              return (
                <div className='table-heading-row  admin-table' key={i}>
                  <h5>{i + 1}</h5>
                  <h5>{employees[emp].name}</h5>
                  <h5>{employees[emp].email}</h5>
                  <h5>{employees[emp].designation}</h5>
                  <h5>
                    {employees[emp].isAdmin ? (
                      <HiCheck color='green' />
                    ) : (
                      <HiX color='red' />
                    )}
                  </h5>
                  <h5>
                    <div>
                      <HiPencilAlt
                        style={{
                          color: 'blue',
                          marginRight: '5px',
                          cursor: 'pointer',
                        }}
                        onClick={() => {
                          setPrevValues({
                            ...prevValues,
                            prevName: employees[emp].name,
                            prevEmail: employees[emp].email,
                            prevDesignation: employees[emp].designation,
                            prevIsAdmin: employees[emp].isAdmin,
                          });
                          setEmpId(emp);
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
                          setEmpId(emp);
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
    </>
  );
};

export default Adminusers;
