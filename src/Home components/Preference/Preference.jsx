import React from 'react';
import './Preference.css';
import prefer1 from '../../assests/prefer1.png';
import prefer2 from '../../assests/prefer2.png';
import prefer3 from '../../assests/prefer3.png';

const Preference = () => {
  return (
    <div className='preferance'>
      <div className='prefer'>
        <img src={prefer1} alt='' />
        <h4>
          Tell us your <br /> Tour Preferences
        </h4>
        <p>Fill the above form</p>
      </div>
      <div className='prefer'>
        <img src={prefer2} alt='' />
        <h4>
          Get your customized
          <br />
          Tour plan
        </h4>
        <p>Just for you</p>
      </div>
      <div className='prefer'>
        <img src={prefer3} alt='' />
        <h4>
          Start your Tour, as you
          <br />
          preferred!
        </h4>
        <p>That's it! Now go & make memories</p>
      </div>
    </div>
  );
};

export default Preference;
