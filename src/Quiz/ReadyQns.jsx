import React, { useState } from 'react';
import { firedb } from '../firebase';
import './ReadyQns.css';

const ReadyQns = () => {
  const [questions, setQuestions] = useState([]);
  const [question, setQuestion] = useState({
    qno: '',
    questionText: '',
    answerOption1: '',
    answerOption2: '',
    answerOption3: '',
    answerCorrect: '',
  });
  const {
    qno,
    questionText,
    answerOption1,
    answerOption2,
    answerOption3,
    answerCorrect,
  } = question;

  console.log('question', question);
  console.log('questions', questions);

  const addQns = () => {
    questions.push({
      qno,
      questionText,
      answerOptions: [answerOption1, answerOption2, answerOption3],
      answerCorrect,
      randomQuiz: Math.random(),
    });
    setQuestion({
      qno: '',
      questionText: '',
      answerOption1: '',
      answerOption2: '',
      answerOption3: '',
      answerCorrect: '',
    });
  };

  const submitQns = () => {
    firedb
      .ref('saudiquizqns')
      .set(questions)
      .then(() => console.log('Sucess'))
      .catch((error) => console.log('error', error));
  };

  return (
    <div className='prepare_Qns_main'>
      <div>
        <div>
          <label>Q.No</label>
          <input
            type='number'
            onChange={(e) =>
              setQuestion({
                ...question,
                qno: e.target.value,
              })
            }
            value={qno}
          />
        </div>
        <div>
          <label>Question</label>
          <textarea
            onChange={(e) =>
              setQuestion({
                ...question,
                questionText: e.target.value,
              })
            }
            value={questionText}
          />
        </div>
        <div>
          <label>Answer option1</label>
          <input
            type='text'
            onChange={(e) =>
              setQuestion({
                ...question,
                answerOption1: e.target.value,
              })
            }
            value={answerOption1}
          />
        </div>
        <div>
          <label>Answer option2</label>
          <input
            type='text'
            onChange={(e) =>
              setQuestion({
                ...question,
                answerOption2: e.target.value,
              })
            }
            value={answerOption2}
          />
        </div>
        <div>
          <label>Answer option3</label>
          <input
            type='text'
            onChange={(e) =>
              setQuestion({
                ...question,
                answerOption3: e.target.value,
              })
            }
            value={answerOption3}
          />
        </div>
        <div>
          <label>Correct Answer</label>
          <input
            type='text'
            onChange={(e) =>
              setQuestion({
                ...question,
                answerCorrect: e.target.value,
              })
            }
            value={answerCorrect}
          />
        </div>
        <div>
          <button onClick={addQns}>Add</button>
        </div>
      </div>
      <div className='prepare_Qns_line' />
      {questions.length !== 0 && (
        <div>
          <div>
            {questions.map((q, i) => {
              return (
                <div key={i}>
                  <div>
                    <p>
                      {q.qno}. {q.questionText}
                    </p>
                  </div>
                  <div>
                    <p>Options</p>
                    <p>1. {q.answerOptions[0]}</p>
                    <p>2. {q.answerOptions[1]}</p>
                    <p>3. {q.answerOptions[2]}</p>
                  </div>
                  <div>
                    <p>Correct answer</p>
                    <p>{q.answerCorrect}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <div>
            <button onClick={submitQns}>Submit</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReadyQns;
