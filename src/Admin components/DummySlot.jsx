import React, { useState, useEffect, useRef } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { firedb } from '../firebase';
import { useToasts } from 'react-toast-notifications';
import { HiPencilAlt, HiTrash } from 'react-icons/hi';

const DummySlot = () => {
  const isMounted = useRef(false);
  const [modal, setModal] = useState(false);
  const closeModal = () => {
    setModal(false);
    setDummyName('');
  };
  const openModal = () => setModal(true);
  const [edit, setEdit] = useState(false);
  const { addToast } = useToasts();
  const [dummyId, setDummyId] = useState('');
  const [dummyName, setDummyName] = useState('');
  const [dummys, setDummys] = useState({});
  const [delModal, setDelModal] = useState(false);
  const closeDelModal = () => setDelModal(false);
  const openDelModal = () => setDelModal(true);

  const addDummy = () => {
    firedb
      .ref('dummySlot')
      .push({
        name: dummyName,
      })
      .then(() => {
        setModal(false);
        addToast('DummySlot added successfully', {
          appearance: 'success',
        });
        setDummyName('');
      })
      .catch((err) => {
        console.log('err', err);
      });
  };

  const updateDummy = () => {
    firedb
      .ref(`dummySlot/${dummyId}`)
      .set({
        name: dummyName,
      })
      .then(() => {
        setModal(false);
        setEdit(false);
        setDummyId('');
        setDummyName('');
        addToast('DummySlot updated successfully', {
          appearance: 'info',
        });
      })
      .catch((err) => {
        console.log('err', err);
      });
  };

  const deleteDummy = () => {
    firedb
      .ref(`dummySlot/${dummyId}`)
      .remove()
      .then(() => {
        setDelModal(false);
        setDummyId('');
        addToast('DummySlot deleted successfully', {
          appearance: 'error',
        });
      })
      .catch((err) => {
        console.log('err', err);
      });
  };

  const getDummy = () => {
    firedb.ref('dummySlot').on('value', (snapshot) => {
      if (isMounted.current) {
        if (snapshot.val() != null)
          setDummys({
            ...snapshot.val(),
          });
      }
    });
  };

  useEffect(() => {
    isMounted.current = true;
    getDummy();
    return () => (isMounted.current = false);
  }, []);

  return (
    <>
      <Modal isOpen={delModal}>
        <ModalHeader toggle={closeDelModal}>Delete DummySlot</ModalHeader>
        <ModalBody>
          <div>
            <h5>Are you sure, you want to delete this DummySlot</h5>
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
            onClick={() => deleteDummy()}>
            Delete
          </Button>
        </ModalFooter>
      </Modal>
      <Modal isOpen={modal}>
        <ModalHeader toggle={closeModal}>
          {edit ? 'Update DummySlot' : 'Add DummySlot'}
        </ModalHeader>
        <ModalBody>
          <div className='adminFieldMain'>
            <div className='adminField'>
              <h6>DummySlot Name</h6>
              <input
                type='name'
                onChange={(e) => setDummyName(e.target.value)}
                value={dummyName}
              />
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            style={{ backgroundColor: '#4DD637' }}
            onClick={() => (dummyId ? updateDummy() : addDummy())}>
            {dummyId ? 'Update' : 'Add'}
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
            <h3 style={{ color: '#666666' }}>DummySlot Section</h3>
          </div>
          <div className='add-booking' onClick={() => openModal()}>
            <h6> + Add DummySlot</h6>
          </div>
        </div>
        <div className='b-table'>
          <div className='table-heading-container  admin-table'>
            <h5>Sl.No</h5>
            <h5>Name</h5>
            <h5>Action</h5>
          </div>
          <div>
            {Object.keys(dummys).map((d, i) => {
              return (
                <div className='table-heading-row  admin-table' key={i}>
                  <h5>{i + 1}</h5>
                  <h5>{dummys[d].name}</h5>
                  <h5>
                    <div>
                      <HiPencilAlt
                        style={{
                          color: 'blue',
                          marginRight: '5px',
                          cursor: 'pointer',
                        }}
                        onClick={() => {
                          setDummyName(dummys[d].name);
                          setDummyId(d);
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
                          setDummyId(d);
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

export default DummySlot;
