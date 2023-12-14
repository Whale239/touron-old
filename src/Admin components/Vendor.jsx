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
    setVendorName('');
  };
  const openModal = () => setModal(true);
  const [edit, setEdit] = useState(false);
  const { addToast } = useToasts();
  const [venId, setVenId] = useState('');
  const [vendorName, setVendorName] = useState('');
  const [vendors, setVendors] = useState({});
  const [delModal, setDelModal] = useState(false);
  const closeDelModal = () => setDelModal(false);
  const openDelModal = () => setDelModal(true);

  const addVendor = () => {
    firedb
      .ref('vendorDetail')
      .push({
        name: vendorName,
      })
      .then(() => {
        setModal(false);
        addToast('Vendor added successfully', {
          appearance: 'success',
        });
        setVendorName('');
      })
      .catch((err) => {
        console.log('err', err);
      });
  };

  const updateVendor = () => {
    firedb
      .ref(`vendorDetail/${venId}`)
      .set({
        name: vendorName,
      })
      .then(() => {
        setModal(false);
        setEdit(false);
        setVenId('');
        setVendorName('');
        addToast('Vendor updated successfully', {
          appearance: 'info',
        });
      })
      .catch((err) => {
        console.log('err', err);
      });
  };

  const deleteVendor = () => {
    firedb
      .ref(`vendorDetail/${venId}`)
      .remove()
      .then(() => {
        setDelModal(false);
        setVenId('');
        addToast('Vendor deleted successfully', {
          appearance: 'error',
        });
      })
      .catch((err) => {
        console.log('err', err);
      });
  };

  const getVendor = () => {
    firedb.ref('vendorDetail').on('value', (snapshot) => {
      if (isMounted.current) {
        if (snapshot.val() != null)
          setVendors({
            ...snapshot.val(),
          });
      }
    });
  };

  useEffect(() => {
    isMounted.current = true;
    getVendor();
    return () => (isMounted.current = false);
  }, []);

  return (
    <>
      <Modal isOpen={delModal}>
        <ModalHeader toggle={closeDelModal}>Delete Vendor</ModalHeader>
        <ModalBody>
          <div>
            <h5>Are you sure, you want to delete this vendor</h5>
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
            onClick={() => deleteVendor()}>
            Delete
          </Button>
        </ModalFooter>
      </Modal>
      <Modal isOpen={modal}>
        <ModalHeader toggle={closeModal}>
          {edit ? 'Update Vendor' : 'Add Vendor'}
        </ModalHeader>
        <ModalBody>
          <div className='adminFieldMain'>
            <div className='adminField'>
              <h6>Vendor Name</h6>
              <input
                type='name'
                onChange={(e) => setVendorName(e.target.value)}
                value={vendorName}
              />
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            style={{ backgroundColor: '#4DD637' }}
            onClick={() => (venId ? updateVendor() : addVendor())}>
            {venId ? 'Update' : 'Add'}
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
            <h3 style={{ color: '#666666' }}>Vendor Section</h3>
          </div>
          <div className='add-booking' onClick={() => openModal()}>
            <h6> + Add Vendor</h6>
          </div>
        </div>
        <div className='b-table'>
          <div className='table-heading-container  admin-table'>
            <h5>Sl.No</h5>
            <h5>Name</h5>
            <h5>Action</h5>
          </div>
          <div>
            {Object.keys(vendors).map((ven, i) => {
              return (
                <div className='table-heading-row  admin-table' key={i}>
                  <h5>{i + 1}</h5>
                  <h5>{vendors[ven].name}</h5>
                  <h5>
                    <div>
                      <HiPencilAlt
                        style={{
                          color: 'blue',
                          marginRight: '5px',
                          cursor: 'pointer',
                        }}
                        onClick={() => {
                          setVendorName(vendors[ven].name);
                          setVenId(ven);
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
                          setVenId(ven);
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
