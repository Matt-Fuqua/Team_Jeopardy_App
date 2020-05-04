import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, FormGroup, Modal, TextInput } from 'carbon-components-react';
import { Column, Grid, Row } from 'carbon-components-react';

import { checkAnswerThunkAction } from '../actions/checkAnswer';
import { closeQuestionModal } from '../actions/questionDisplay';
import { newGameId, questionDisplayOpen, questionDisplayQuestion, questionDisplayQuestionId, /*questionDisplayValue */ } from '../selectors/index';
import { initialTimerDuration, initialTimerEnabled }  from '../selectors/index';
import { correctAnswer, isAnswerCorrect } from '../selectors/index';
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
// https://www.npmjs.com/package/react-countdown-circle-timer
// yarn add react-countdown-circle-timer
// props: https://github.com/vydimitrov/react-countdown-circle-timer#props-for-both-reactreact-native

 
const QuestionModal = () => {
  const dispatch = useDispatch();
  const gameId = useSelector(newGameId);
  const modalOpen = useSelector(questionDisplayOpen);
  const modalQuestion = useSelector(questionDisplayQuestion);
  const initialTimerActive = useSelector(initialTimerEnabled);
  const initialTimerLength = useSelector(initialTimerDuration);
  const modalQuestionId = useSelector(questionDisplayQuestionId);
  const actualAnswer = useSelector(correctAnswer);
  const isCorrect = useSelector(isAnswerCorrect);

  const [hideAnswer, setHideAnswer] = useState({ visibility:"hidden" });
  const [timerActive, setTimerActive] = useState(true);
  // const modalQuestionValue = useSelector(questionDisplayValue);


  var contestantId = 1000;
  const [answerInput, setAnswerInput] = useState();

  const handleFormSubmit = e => {
    console.log("submit button event");
    console.log("game id: " + gameId);
    console.log("question ID: " + modalQuestionId);
    console.log("contestant ID is: " + contestantId);
    console.log("answer given: " + answerInput);
    e.preventDefault();
    dispatch(checkAnswerThunkAction(gameId, modalQuestionId, contestantId ,answerInput));
    setAnswerInput("");
    setHideAnswer({ visibility:"hidden" })
  }

  const handleFormGuess = e => {
    console.log("guess button event");
    setHideAnswer({ visibility:"visible" });
    setTimerActive(false);
    e.preventDefault();

  }

  const guessTimeUp = e => {
    console.log("time up");
    setHideAnswer({ visibility:"hidden" })
   // dispatch(initialTimerActive)

  }


  return (
    <Modal
      hasScrollingContent={false}
      iconDescription="Close the modal"
      modalAriaLabel="A label to be read by screen readers on the modal root node"
      modalHeading={modalQuestion}
      onRequestClose={() => dispatch(closeQuestionModal())}
      onRequestSubmit={ handleFormSubmit }      
      onSecondarySubmit={ handleFormGuess }
      open={modalOpen}
      passiveModal={false}
      primaryButtonDisabled={false}
      primaryButtonText="Submit"
      secondaryButtonText="Guess"
      selectorPrimaryFocus="[data-modal-primary-focus]"
    >
      <Form style ={ hideAnswer }
       // onSubmit={handleFormSubmit}
      >
        <FormGroup 
          invalid={false}
          message={false}
          legendText=""
        >
          <TextInput
            id="answer-input"
            invalid={false}
            invalidText="A valid value is required"
            labelText="Answer"
            light={true}
            type="text"
            value={answerInput}
            onChange={e => setAnswerInput(e.target.value)}
          />
        </FormGroup>
      </Form>
      <Grid>
        <Row>
          <Column>
            <CountdownCircleTimer
              isPlaying = {timerActive}
              duration={initialTimerLength}
              colors={[['#004777', 0.33], ['#F7B801', 0.33], ['#A30000']]}
             // onComplete={guessTimeUp}
             onComplete={() => {
              guessTimeUp()
              return [true, 1500] // repeat animation in 1.5 seconds
            }}
      
              
            >
              {({ remainingTime }) => remainingTime}
            </CountdownCircleTimer>
          </Column>
   
        </Row>
      </Grid>
    </Modal>
  );
};

export default QuestionModal;
