import { AiFillCloseCircle } from 'react-icons/ai';
import { Modal } from 'reactstrap';
import { Link } from 'react-router-dom';
import React from 'react';
import './Modal.css';

const Modals = ({ modalIsOpen, closeModal }) => {
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      contentClassName='modal-login'
      shouldCloseOnOverlayClick={false}>
      <div className='modal-close'>
        <AiFillCloseCircle size={30} onClick={closeModal} />
      </div>
      <div className='modal-container'>
        <img
          className='modal-image'
          src='https://image.freepik.com/free-vector/online-registration-sign-up-with-man-sitting-near-smartphone_268404-95.jpg'
          alt='jkbb'
        />
        <p>Please login to proceed Further!!</p>
        <Link to='/login'>
          <button className='modal-button'>Proceed to Login</button>
        </Link>
      </div>
    </Modal>
  );
};

export default Modals;
