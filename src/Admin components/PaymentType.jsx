import React, { useState, useEffect, useRef } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { firedb } from '../firebase';
import { useToasts } from 'react-toast-notifications';
import { HiPencilAlt, HiTrash } from 'react-icons/hi';

const Particulars = () => {
  const isMounted = useRef(false);
  const [modal, setModal] = useState(false);
  const closeModal = () => {
    setModal(false);
    setPayName('');
  };
  const openModal = () => setModal(true);
  const [edit, setEdit] = useState(false);
  const { addToast } = useToasts();
  const [payId, setPayId] = useState('');
  const [payName, setPayName] = useState('');
  const [paymentTypes, setPaymentTypes] = useState({});
  const [delModal, setDelModal] = useState(false);
  const closeDelModal = () => setDelModal(false);
  const openDelModal = () => setDelModal(true);

  const addPaymentTypes = () => {
    firedb
      .ref('paymentTypeDetail')
      .push({
        name: payName,
      })
      .then(() => {
        setModal(false);
        addToast('PaymentType added successfully', {
          appearance: 'success',
        });
        setPayName('');
      })
      .catch((err) => {
        console.log('err', err);
      });
  };

  const updatePaymentTypes = () => {
    firedb
      .ref(`paymentTypeDetail/${payId}`)
      .set({
        name: payName,
      })
      .then(() => {
        setModal(false);
        setEdit(false);
        setPayId('');
        setPayName('');
        addToast('PaymentType updated successfully', {
          appearance: 'info',
        });
      })
      .catch((err) => {
        console.log('err', err);
      });
  };

  const deletePaymentTypes = () => {
    firedb
      .ref(`paymentTypeDetail/${payId}`)
      .remove()
      .then(() => {
        setDelModal(false);
        setPayId('');
        addToast('PaymentType deleted successfully', {
          appearance: 'error',
        });
      })
      .catch((err) => {
        console.log('err', err);
      });
  };

  const getPaymentTypes = () => {
    firedb.ref('paymentTypeDetail').on('value', (snapshot) => {
      if (isMounted.current) {
        if (snapshot.val() != null)
          setPaymentTypes({
            ...snapshot.val(),
          });
      }
    });
  };

  useEffect(() => {
    isMounted.current = true;
    getPaymentTypes();
    return () => (isMounted.current = false);
  }, []);

  return (
    <>
      <Modal isOpen={delModal}>
        <ModalHeader toggle={closeDelModal}>Delete PaymentType</ModalHeader>
        <ModalBody>
          <div>
            <h5>Are you sure, you want to delete this paymentType</h5>
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
            onClick={() => deletePaymentTypes()}>
            Delete
          </Button>
        </ModalFooter>
      </Modal>
      <Modal isOpen={modal}>
        <ModalHeader toggle={closeModal}>
          {edit ? 'Update PaymentType' : 'Add PaymentType'}
        </ModalHeader>
        <ModalBody>
          <div className='adminFieldMain'>
            <div className='adminField'>
              <h6>PaymentType Name</h6>
              <input
                type='name'
                onChange={(e) => setPayName(e.target.value)}
                value={payName}
              />
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            style={{ backgroundColor: '#4DD637' }}
            onClick={() => (payId ? updatePaymentTypes() : addPaymentTypes())}>
            {payId ? 'Update' : 'Add'}
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
            <h3 style={{ color: '#666666' }}>Payment Type Section</h3>
          </div>
          <div className='add-booking' onClick={() => openModal()}>
            <h6> + Add PaymentType</h6>
          </div>
        </div>
        <div className='b-table'>
          <div className='table-heading-container  admin-table'>
            <h5>Sl.No</h5>
            <h5>Name</h5>
            <h5>Action</h5>
          </div>
          <div>
            {Object.keys(paymentTypes).map((pay, i) => {
              return (
                <div className='table-heading-row  admin-table' key={i}>
                  <h5>{i + 1}</h5>
                  <h5>{paymentTypes[pay].name}</h5>
                  <h5>
                    <div>
                      <HiPencilAlt
                        style={{
                          color: 'blue',
                          marginRight: '5px',
                          cursor: 'pointer',
                        }}
                        onClick={() => {
                          setPayName(paymentTypes[pay].name);
                          setPayId(pay);
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
                          setPayId(pay);
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

export default Particulars;
