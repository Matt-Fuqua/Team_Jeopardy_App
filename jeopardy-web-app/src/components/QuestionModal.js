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
  const p1Score = useSelector(playerOneScore, "playerOneScore");
  const p2Score = useSelector(playerTwoScore, "playerTwoScore");

  const [hideAnswer, setHideAnswer] = useState({ visibility:"hidden" });
  const [loaderActive, setLoaderActive] = useState(false);
  const [disableModalPrimaryBtn, setDisableModalPrimaryBtn] = useState(true);
  const [guessButtonStatus, setGuessButtonStauts] = useState("Guess");


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

  const computerGuessing = e => {
    console.log ("computer is guess");
    setRunTimer(false);
    setGuessButtonStauts("Computer is guessing")
    // model modified to show computer is attempting to guess
          // random number to determine if computer will be correct
            // if correct, modify modal to show computer correct and update score
            // if not correct, modify modal to advise computer is wrong and update score
        // close modal and user can click next button
    
  }

  const computerAttemptAnswer = e => {
    var vpTimer = Math.floor(Math.random() * Math.floor(10)+5);
    
    console.log("timer to guess: " + vpTimer)
    // start a timer
    // if timer hit before user hits guess, then new event 
    var timer = 10;
     var countdownTimer = setInterval(function() {
      console.log("timer: " + timer);
      if(timer === (10-vpTimer)) {
        clearInterval(countdownTimer);
        computerGuessing();
      }

      timer = timer-1;
      if (timer <= 0) 
      {
          console.log("Time Up!");
          clearInterval(countdownTimer);
      }
    },1000)
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
    console.log("player one score: " + p1Score);
    console.log("player two score: " + p2Score);
    if(p1Score > p2Score){
      alert('YOU WIN!!!');
    }
    else{
      alert('GAME OVER. BETTER LUCK NEXT TIME')
    }

    
  }

  useEffect(() => {
    if(modalOpen === false && questionCount >= 2) {
      gameOver();
    }

    if(modalOpen){
      setHideAnswer({ visibility:"hidden" });
      setRunTimer(true);
      //computerAttemptAnswer();
    }
  }, [modalOpen]);

  useEffect(() =>{
    setLoaderActive(false);
    if(checkAnswserResponse === "success") {
      if(isCorrect === "Y") {
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
      primaryButtonDisabled={ disableModalPrimaryBtn }
      primaryButtonText="Submit"
      secondaryButtonText= { guessButtonStatus }
      //secondaryButtonText="Guess"
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
