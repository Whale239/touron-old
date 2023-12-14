import React from 'react';
import { firedb } from '../firebase';

const LuckySeatAs = () => {
  const addday = () => {
    firedb.ref('luckyseatday/-NDnYG26jHYsA8jWDsFk').push({
      audi: 3,
      movieName: 'PONNIYIN SELVAN',
      revealDate: '8 OCT',
      revealTime: 'dsd',
      seatNo: 'D7',
      showTime: 'sd',
    });
  };

  return (
    <div>
      <div>
        <button onClick={addday}>Add</button>
      </div>
    </div>
  );
};

export default LuckySeatAs;
