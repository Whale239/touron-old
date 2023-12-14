import React from 'react';
import './Priority.css';

const Priority = ({ priority, setPriority, nextStep, prevStep }) => {
  return (
    <div>
      <div className='priors'>
        <div className='priorss'>
          <input
            type='radio'
            id='prior1'
            value='My Travel dates are confirmed'
            checked={priority == 'My Travel dates are confirmed'}
            onClick={(e) => setPriority(e.target.value)}
          />
          <label for='prior1'>My Travel dates are confirmed.</label>
        </div>
        <div className='priorss'>
          <input
            type='radio'
            id='prior2'
            value="I don't know my travel dates yet"
            checked={priority == "I don't know my travel dates yet"}
            onClick={(e) => setPriority(e.target.value)}
          />
          <label for='prior2'>I don't know my travel dates yet.</label>
        </div>
        <div className='priorss'>
          <input
            type='radio'
            id='prior3'
            value="I'm just looking for an estimate"
            checked={priority == "I'm just looking for an estimate"}
            onClick={(e) => setPriority(e.target.value)}
          />
          <label for='prior3'>I'm just looking for an estimate.</label>
        </div>
        <div className='priorss'>
          <input
            type='radio'
            id='prior4'
            value="I'm not travelling anytime soon, just curious to know more about this process!"
            checked={
              priority ==
              "I'm not travelling anytime soon, just curious to know more about this process!"
            }
            onClick={(e) => setPriority(e.target.value)}
          />
          <label for='prior4'>
            I'm not travelling anytime soon, just curious to know more about
            this process!
          </label>
        </div>
      </div>
      <div className='navigation_btn'>
        <>
          <button className='previous-button' onClick={() => prevStep()}>
            Previous
          </button>
          {priority !== '' ? (
            <button className='next-button' onClick={() => nextStep()}>
              Next
            </button>
          ) : (
            <button
              disabled
              className='next-button'
              style={{ color: '#c1c1c1' }}
              onClick={() => nextStep()}>
              Next
            </button>
          )}
        </>
      </div>
    </div>
  );
};

export default Priority;
