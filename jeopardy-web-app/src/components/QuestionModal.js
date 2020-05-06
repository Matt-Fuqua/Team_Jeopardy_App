import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, FormGroup, Modal, TextInput, Loading } from 'carbon-components-react';
import { Column, Grid, Row } from 'carbon-components-react';
import QuestionButton from './QuestionButton';
import { checkAnswerThunkAction } from '../actions/checkAnswer';
import { addPlayerOneScore, substractPlayerOneScore } from '../actions/managePlayerScore';
import { closeQuestionModal } from '../actions/questionDisplay';
import { newGameId, questionDisplayOpen, questionDisplayQuestion, questionDisplayQuestionId, checkAnswerStatus, questionDisplayValue  } from '../selectors/index';
import { correctAnswer, isAnswerCorrect, playerOneScore, playerTwoScore, manageQuestionCount }  from '../selectors/index';

import { CountdownCircleTimer } from 'react-countdown-circle-timer'
// https://www.npmjs.com/package/react-countdown-circle-timer
// yarn add react-countdown-circle-timer
// props: https://github.com/vydimitrov/react-countdown-circle-timer#props-for-both-reactreact-native

 
const QuestionModal = () => {
  const dispatch = useDispatch();
  const checkAnswserResponse = useSelector(checkAnswerStatus);
  const gameId = useSelector(newGameId);
  const modalOpen = useSelector(questionDisplayOpen);
  const modalQuestion = useSelector(questionDisplayQuestion);
  const modalQuestionId = useSelector(questionDisplayQuestionId);
  const actualAnswer = useSelector(correctAnswer);
  const isCorrect = useSelector(isAnswerCorrect);
  const questionCount = useSelector(manageQuestionCount);
  const modalQuestionValue = useSelector(questionDisplayValue);

  const [hideAnswer, setHideAnswer] = useState({ visibility:"hidden" });
  const [loaderActive, setLoaderActive] = useState(false);
  const [disableModalPrimaryBtn, setDisableModalPrimaryBtn] = useState(true);
  


  var contestantId = 1000;
  const [answerInput, setAnswerInput] = useState();
  const [runTimer, setRunTimer] = useState(false);

  const handleFormSubmit = e => {
    e.preventDefault();
    setLoaderActive(true);
    setAnswerInput("");
    setHideAnswer({ visibility:"hidden" });
    setDisableModalPrimaryBtn(true);
    setTimeout(() => {
      dispatch(checkAnswerThunkAction(gameId, modalQuestionId, contestantId ,answerInput));
    }, 2000);
  }

  const handleFormGuess = e => {
    console.log("guess button event");
    setHideAnswer({ visibility:"visible" });
    setRunTimer(false);
    setDisableModalPrimaryBtn(false);
    e.preventDefault();
  }

  const guessTimeUp = e => {
    console.log("time up");
    setHideAnswer({ visibility:"hidden" });
    dispatch(closeQuestionModal());
  }

  const gameOver = e => {
    alert('game over');
  }

  useEffect(() => {
    if(modalOpen === false && questionCount >= 5) {
      gameOver();
    }

    if(modalOpen){
      setHideAnswer({ visibility:"hidden" });
      setRunTimer(true);
    }
  }, [modalOpen]);

  useEffect(() =>{
    setLoaderActive(false);
    if(checkAnswserResponse === "success") {
      if(isCorrect == "Y") {
        dispatch(addPlayerOneScore(parseInt(modalQuestionValue)));
      } else {
        dispatch(substractPlayerOneScore(parseInt(modalQuestionValue)));
      }
      console.log(isCorrect);
      console.log("check answer success. correct answer is: " + actualAnswer)
    }
  }, [actualAnswer])

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
      primaryButtonDisabled={disableModalPrimaryBtn}
      primaryButtonText="Submit"
      secondaryButtonText="Guess"
      selectorPrimaryFocus="[data-modal-primary-focus]"
      shouldSubmitOnEnter={true}
    >
      <Form style ={ hideAnswer }
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
              key = {modalQuestionId}
              isPlaying = {runTimer}
              duration={10}
              colors={[['#004777', 0.33], ['#F7B801', 0.33], ['#A30000']]}
              
              onComplete={() => {
                guessTimeUp()
            }}
            >
              {({ remainingTime }) => remainingTime}
            </CountdownCircleTimer>
          </Column>
          <Column>
            <Loading
              active={loaderActive}
            />
          </Column>
        </Row>
      </Grid>
    </Modal>
  );
};

export default QuestionModal;
