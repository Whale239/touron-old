import React, { useState, useEffect, useContext, useRef } from 'react';
import './UserDetails.css';
import { Form, Input } from 'reactstrap';
import Profilenav from './Profilenav';
import Profilepage from './Profilepage';
import { firedb, fireStorage } from '../firebase';
import { isAuthenticated } from '../Login components/auth';
import { useToasts } from 'react-toast-notifications';
import { MdEdit } from 'react-icons/md';
import { Tooltip } from 'reactstrap';
import { ApiContext } from '../Context/ApiContext';
import * as BiIcons from 'react-icons/bi';

const UserDetails = () => {
  const isMounted = useRef(false);
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const toggle = () => setTooltipOpen(!tooltipOpen);
  const { addToast } = useToasts();
  const { setUserInfo } = useContext(ApiContext);
  const [uid, setUid] = useState('');
  const [values, setValues] = useState({
    name: '',
    email: '',
    age: '',
    gender: '',
    aboutMe: '',
    phoneNumber: '',
    travellerType: '',
    photoURL: '',
    address: '',
    profession: '',
  });

  const innerWidth = window.innerWidth;
  useEffect(() => {
    if (innerWidth < 900) {
      setClicked(true);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const {
    name,
    email,
    age,
    gender,
    aboutMe,
    address,
    phoneNumber,
    travellerType,
    photoURL,
    profession,
  } = values;

  useEffect(() => {
    isMounted.current = true;
    if (isAuthenticated()) {
      const { user } = isAuthenticated();
      setUid(user.uid);
      getCurrentUserData(user.uid);
    }
    return () => (isMounted.current = false);
  }, []);

  const addOrEditInfo = (e) => {
    e.preventDefault();
    let values = {
      name: name,
      email: email,
      age: age,
      gender: gender,
      aboutMe: aboutMe,
      address: address,
      phoneNumber: phoneNumber,
      travellerType: travellerType,
      photoURL: photoURL,
      profession: profession,
    };
    firedb
      .ref(`userGeneralInfo/${uid}`)
      .update(values)
      .then((data) => {
        addToast('Updated Successfully', {
          appearance: 'success',
        });
      })
      .catch((err) =>
        addToast(err, {
          appearance: 'success',
        })
      );
  };

  const uploadImage = (e) => {
    let image = e.target.files[0];
    fireStorage
      .ref(`users/${uid}/profile.jpg`)
      .put(image)
      .then(() => {
        fireStorage
          .ref(`users/${uid}/profile.jpg`)
          .getDownloadURL()
          .then((imageUrl) => {
            firedb
              .ref(`userGeneralInfo/${uid}`)
              .update({
                photoURL: imageUrl,
              })
              .then((data) => {
                addToast('Image Updated Successfully', {
                  appearance: 'success',
                });
              })
              .catch((err) =>
                addToast(err, {
                  appearance: 'success',
                })
              );
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getCurrentUserData = (uid) => {
    firedb.ref(`userGeneralInfo/${uid}`).on('value', (data) => {
      if (isMounted.current) {
        if (data !== null) {
          let val = data.val();
          setUserInfo(val);
          setValues({
            ...values,
            name: val.name,
            email: val.email,
            age: val.age,
            gender: val.gender,
            aboutMe: val.aboutMe,
            phoneNumber: val.phoneNumber,
            photoURL: val.photoURL,
            profession: val.profession,
            travellerType: val.travellerType,
            address: val.address,
          });
        }
      }
    });
  };

  const handleEditClick = () => {
    const filepath = document.getElementById('imageButton');
    filepath.click();
  };

  const [clicked, setClicked] = useState(false);
  const toggleSidebar = () => {
    setClicked(!clicked);
  };
  return (
    <div style={{ display: 'flex' }}>
      <div className={clicked ? 'toggleSidebar' : 'toggleSideba'}>
        <Profilepage />
      </div>
      <div className='account-section'>
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
        <div className='account'>
          <Profilenav title={'User Details'} />
          <div className='account-content'>
            <h1>Hello {name}</h1>
            <p>
              This is your profile page. You can see the progress you've made
              with your work and manage your projects or assigned tasks
            </p>
          </div>
        </div>
        <div className='account-profile-page'>
          <div className='account-profile-column1'>
            <div className='account-column1-head'>
              <h3>My account</h3>
            </div>
            <div className='account-column-info'>
              <Form>
                <h6>User Information</h6>

                <div className='row'>
                  <div className='col-mg-6'>
                    <div className='form-group'>
                      <label className='user-label'>Name</label>
                      <input
                        type='text'
                        name='name'
                        onChange={handleChange}
                        className='user-input-alter user-input'
                        value={name}
                      />
                    </div>
                  </div>
                  <div className='col-mg-6'>
                    <div className='form-group'>
                      <label className='user-label'>Email address</label>
                      <input
                        type='text'
                        onChange={handleChange}
                        name='email'
                        value={email}
                        className='user-input-alter user-input'
                      />
                    </div>
                  </div>
                  <div className='col-mg-6'>
                    <div className='form-group'>
                      <label className='user-label'>Age</label>
                      <input
                        onChange={handleChange}
                        type='text'
                        value={age}
                        name='age'
                        className='user-input-alter user-input'
                      />
                    </div>
                  </div>
                  <div className='col-mg-6'>
                    <div className='form-group'>
                      <label className='user-label'>Gender</label>
                      <Input
                        onChange={handleChange}
                        type='select'
                        name='gender'
                        value={gender}
                        className='user-input-alter user-input'>
                        <option value='Male'>Male</option>
                        <option value='Female'>Female</option>
                        <option value='Other'>Other</option>
                      </Input>
                    </div>
                  </div>
                  <div className='col-mg-6'>
                    <div className='form-group'>
                      <label className='user-label'>Profession</label>
                      <input
                        onChange={handleChange}
                        type='text'
                        value={profession}
                        name='profession'
                        className='user-input-alter user-input'
                      />
                    </div>
                  </div>
                  <div className='col-mg-6'>
                    <div className='form-group'>
                      <label className='user-label'>Traveler Type</label>
                      <select
                        onChange={handleChange}
                        name='travellerType'
                        value={travellerType}
                        className='user-input-alter user-input'>
                        <option value='Solo Traveller'>Solo Traveller</option>
                        <option value='Group'>Group</option>
                        <option value='Family/Friends'>Family/Friends</option>
                      </select>
                    </div>
                  </div>
                </div>
                <hr className='my-4' />
                <h6>Contact Information</h6>
                <div className='row'>
                  <div className='col-md-12'>
                    <div className='form-group'>
                      <label className='user-label'>Address</label>
                      <input
                        type='text'
                        value={address}
                        onChange={handleChange}
                        name='address'
                        className='user-input-alter user-input'
                      />
                    </div>
                  </div>
                </div>
                <div className='row'>
                  <div className='col-md-6'>
                    <div className='form-group'>
                      <label className='user-label'>Mobile no</label>
                      <input
                        type='number'
                        onChange={handleChange}
                        value={phoneNumber}
                        name='phoneNumber'
                        className='user-input-alter user-input'
                      />
                    </div>
                  </div>
                </div>
                <hr className='my-4' />
                <h6>About me</h6>
                <div className='col-md-12'>
                  <div className='form-group'>
                    <label className='user-label'>About me</label>

                    <Input
                      type='textarea'
                      value={aboutMe}
                      name='aboutMe'
                      rows='4'
                      onChange={handleChange}
                      className='user-input-alter user-input'
                    />
                  </div>
                </div>
                <div className='user-button'>
                  <button
                    className='btn btn-primary btn-sm'
                    onClick={addOrEditInfo}>
                    Submit
                  </button>
                </div>
              </Form>
            </div>
          </div>
          <div className='account-profile-column2'>
            <div className='profile-img'>
              {photoURL === '' ? (
                <img
                  src='data:image/png;base64,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'
                  alt=''
                />
              ) : (
                <img src={photoURL} alt='' />
              )}
              <input
                type='file'
                name='photoURL'
                id='imageButton'
                hidden='hidden'
                onChange={(e) => uploadImage(e)}
              />
              <Tooltip
                placement='top'
                isOpen={tooltipOpen}
                autohide={false}
                target='DisabledAutoHideExample'
                toggle={toggle}>
                Upload Profile Image
              </Tooltip>
              <MdEdit
                color='#3498DB'
                id='DisabledAutoHideExample'
                onClick={handleEditClick}
                size={28}
                className='MdEdit'
              />
            </div>
            <div className='profile-center'>
              <div className='profile-name'>
                <h3>
                  {name}
                  <span className='profile-age'>, {age}</span>
                </h3>
              </div>
              <div className='user-travel-type'>{travellerType}</div>
              <div className='user-profession'>{profession}</div>
              <hr className='my-4' />
              <div className='user-about'>
                <h3>About</h3>
                <p>{aboutMe}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
