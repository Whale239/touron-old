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
    setPartName('');
  };
  const openModal = () => setModal(true);
  const [edit, setEdit] = useState(false);
  const { addToast } = useToasts();
  const [parId, setParId] = useState('');
  const [partName, setPartName] = useState('');
  const [particulars, setParticulars] = useState({});
  const [delModal, setDelModal] = useState(false);
  const closeDelModal = () => setDelModal(false);
  const openDelModal = () => setDelModal(true);

  const addParticular = () => {
    firedb
      .ref('particularDetail')
      .push({
        name: partName,
      })
      .then(() => {
        setModal(false);
        addToast('Particular added successfully', {
          appearance: 'success',
        });
        setPartName('');
      })
      .catch((err) => {
        console.log('err', err);
      });
  };

  const updateParticular = () => {
    firedb
      .ref(`particularDetail/${parId}`)
      .set({
        name: partName,
      })
      .then(() => {
        setModal(false);
        setEdit(false);
        setParId('');
        setPartName('');
        addToast('Particular updated successfully', {
          appearance: 'info',
        });
      })
      .catch((err) => {
        console.log('err', err);
      });
  };

  const deleteParticular = () => {
    firedb
      .ref(`particularDetail/${parId}`)
      .remove()
      .then(() => {
        setDelModal(false);
        setParId('');
        addToast('Particular deleted successfully', {
          appearance: 'error',
        });
      })
      .catch((err) => {
        console.log('err', err);
      });
  };

  const getParticular = () => {
    firedb.ref('particularDetail').on('value', (snapshot) => {
      if (isMounted.current) {
        if (snapshot.val() != null)
          setParticulars({
            ...snapshot.val(),
          });
      }
    });
  };

  useEffect(() => {
    isMounted.current = true;
    getParticular();
    return () => (isMounted.current = false);
  }, []);

  return (
    <>
      <Modal isOpen={delModal}>
        <ModalHeader toggle={closeDelModal}>Delete Particular</ModalHeader>
        <ModalBody>
          <div>
            <h5>Are you sure, you want to delete this particular</h5>
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
            onClick={() => deleteParticular()}>
            Delete
          </Button>
        </ModalFooter>
      </Modal>
      <Modal isOpen={modal}>
        <ModalHeader toggle={closeModal}>
          {edit ? 'Update Particular' : 'Add Particular'}
        </ModalHeader>
        <ModalBody>
          <div className='adminFieldMain'>
            <div className='adminField'>
              <h6>Particular Name</h6>
              <input
                type='name'
                onChange={(e) => setPartName(e.target.value)}
                value={partName}
              />
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            style={{ backgroundColor: '#4DD637' }}
            onClick={() => (parId ? updateParticular() : addParticular())}>
            {parId ? 'Update' : 'Add'}
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
            <h3 style={{ color: '#666666' }}>Particulars Section</h3>
          </div>
          <div className='add-booking' onClick={() => openModal()}>
            <h6> + Add Particular</h6>
          </div>
        </div>
        <div className='b-table'>
          <div className='table-heading-container  admin-table'>
            <h5>Sl.No</h5>
            <h5>Name</h5>
            <h5>Action</h5>
          </div>
          <div>
            {Object.keys(particulars).map((par, i) => {
              return (
                <div className='table-heading-row  admin-table' key={i}>
                  <h5>{i + 1}</h5>
                  <h5>{particulars[par].name}</h5>
                  <h5>
                    <div>
                      <HiPencilAlt
                        style={{
                          color: 'blue',
                          marginRight: '5px',
                          cursor: 'pointer',
                        }}
                        onClick={() => {
                          setPartName(particulars[par].name);
                          setParId(par);
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
                          setParId(par);
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
