import React, { useState, useEffect } from 'react';
import Profilenav from './Profilenav';
import './Faq.css';
import FaqQuestion from './FaqQuestions';
import { Collapse } from 'reactstrap';
import { FcPlus } from 'react-icons/fc';
import { RiCloseCircleFill } from 'react-icons/ri';
import Profilepage from './Profilepage';
import * as BiIcons from 'react-icons/bi';

const Faq = () => {
  const [selectedType, setSelectedType] = useState('general');
  const [collapseOpen, setCollapseOpen] = useState();

  const toggle = (index) => {
    if (collapseOpen === index) {
      setCollapseOpen();
    } else {
      setCollapseOpen(index);
    }
  };
  const [clicked, setClicked] = useState(false);
  const toggleSidebar = () => {
    setClicked(!clicked);
  };

  const innerWidth = window.innerWidth;
  useEffect(() => {
    if (innerWidth < 900) {
      setClicked(true);
    }
  });
  const FaqQuestions = FaqQuestion();
  return (
    <div style={{ display: 'flex' }}>
      <div className={clicked ? 'toggleSidebar' : 'toggleSideba'}>
        <Profilepage />
      </div>

      <div className='faq-container'>
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
        <Profilenav title='Frequently Asked Question' />
        <div className='faq-types'>
          <div
            className='general'
            style={{
              borderBottom:
                selectedType === 'general' ? '5px solid #40E0D0' : '',
            }}
            onClick={() => setSelectedType('general')}>
            <h6>General</h6>
          </div>
          <div
            className='booking'
            onClick={() => setSelectedType('booking')}
            style={{
              borderBottom:
                selectedType === 'booking' ? '5px solid tomato' : '',
            }}>
            <h6>Booking</h6>
          </div>
          <div
            className='support'
            onClick={() => setSelectedType('support')}
            style={{
              borderBottom:
                selectedType === 'support' ? '5px solid #40E0D0' : '',
            }}>
            <h6>Support</h6>
          </div>
        </div>

        <div className='questions-container'>
          {FaqQuestions.map((q, index) => {
            if (q.type === selectedType)
              return (
                <div className='questions' key={index}>
                  <div className='faq-question'>
                    <h1>{q.question}</h1>
                    {collapseOpen === index ? (
                      <RiCloseCircleFill
                        onClick={() => toggle(index)}
                        size={30}
                        className='que-icon'
                        color='red'
                      />
                    ) : (
                      <FcPlus
                        onClick={() => toggle(index)}
                        size={30}
                        className='que-icon'
                      />
                    )}
                  </div>
                  <Collapse isOpen={collapseOpen === index}>
                    <p>{q.answer}</p>
                  </Collapse>
                </div>
              );
          })}
        </div>
      </div>
    </div>
  );
};

export default Faq;
