import React from 'react';
import './Ipl.css';
import { ImCross } from 'react-icons/im';

const Ipl = ({ closeIplV }) => {
  return (
    <div className='iplMain'>
      <div className='iplMain_sub'>
        <video
          className='iplMain_sub_v'
          src='https://firebasestorage.googleapis.com/v0/b/touronapp-248e4.appspot.com/o/ipl%2F30sec.mp4?alt=media&token=5df25544-ac70-41d7-8ec5-33d01fad74c4'
          controls
          autoPlay
          muted></video>
        <ImCross className='iplV_close' onClick={() => closeIplV()} />
      </div>
    </div>
  );
};

export default Ipl;
