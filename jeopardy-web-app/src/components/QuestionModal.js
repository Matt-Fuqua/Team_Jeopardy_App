import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import { EndGameAnimation } from '../components'
import { checkAnswerThunkAction } from '../actions/checkAnswer';
import { addPlayerOneScore, substractPlayerOneScore } from '../actions/managePlayerScore';
import { closeQuestionModal } from '../actions/questionDisplay';
import { Column, Grid, Row, Form, FormGroup, Modal, TextInput, Loading } from 'carbon-components-react';
import { 
  newGameId,
  questionDisplayOpen,
  questionDisplayQuestion,
  questionDisplayQuestionId,
  checkAnswerStatus,
  questionDisplayValue,
  correctAnswer,
  isAnswerCorrect,
  playerOneScore,
  playerTwoScore,
  manageQuestionCount 
} from '../selectors';

let playerOneGuessing = false;
let gameResponse = "";

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
  const [answerInput, setAnswerInput] = useState();
  const [runTimer, setRunTimer] = useState(false);
  const [endGameAnimation, setEndGameAnimation] = useState(false);
  const [winnerStatus, setWinnerStatus] = useState(false);
  const [disableModalPrimaryBtn, setDisableModalPrimaryBtn] = useState(true);
  const [guessButtonStatus, setGuessButtonStauts] = useState("Guess");
  const [circleTimerVisibilty, setCircleTimerVisibility] = useState("visible");
  const [displayAnswerVisibilty, setDisplayAnswerVisiblity] = useState("hidden");
  const [endOfTurn, setEndOfTurn] = useState(false);

  const handleFormGuess = e => {

    if(endOfTurn) {
      dispatch(closeQuestionModal());
      setEndOfTurn(false);
      setGuessButtonStauts("Guess");
      setDisplayAnswerVisiblity("hidden");
    }
    else {
    playerOneGuessing = true;
    setHideAnswer({ visibility:"visible" });
    setRunTimer(false);
    setDisableModalPrimaryBtn(false);
    }
    e.preventDefault();
  }

  const handleFormSubmit = e => {
    e.preventDefault();
    const computerId = 1000;
    setLoaderActive(true);
    setAnswerInput("");
    setHideAnswer({ visibility:"hidden" });
    setDisableModalPrimaryBtn(true);
    setCircleTimerVisibility("hidden");
    setTimeout(() => {
      dispatch(checkAnswerThunkAction(gameId, modalQuestionId, computerId ,answerInput));
    }, 2000);
  }

  const computerGuessing = e => {
    setRunTimer(false);
    setGuessButtonStauts("Computer is guessing");
    setLoaderActive(true);
    setTimeout(() => {setLoaderActive(false)}, 2000);
      // random number to determine if computer will be correct
      // if correct, modify modal to show computer correct and update score
      // if not correct, modify modal to advise computer is wrong and update score
      // close modal and user can click next button
    
  }

  const computerAttemptAnswer = e => {
    let vpTimer = Math.floor(Math.random() * Math.floor(5)+5); //!!!!!!!!!!!!!!! NEED TO CHANGE !!
    console.log("computer time to guess: " + vpTimer);
    console.log(playerOneGuessing);
    let timer = 10;
    let countdownTimer = setInterval(function() {
      console.log("timer: " + timer);
      if(playerOneGuessing){
        clearInterval(countdownTimer);
      }
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

  const guessTimeUp = e => {
    console.log("time up");
    setHideAnswer({ visibility:"hidden" });
    dispatch(closeQuestionModal());
  }

  const gameOver = () => {
    if(p1Score > p2Score){
      setEndGameAnimation(true);
      setWinnerStatus(true);
    } else {
      setEndGameAnimation(true);
      setWinnerStatus(false);
    }
    setTimeout(()=>{
      setEndGameAnimation(false);
    }, 5000); 
  }

  useEffect(() => {
    if(modalOpen === false && questionCount >= 5) {
      gameOver();
    }

    if(modalOpen){
      setGuessButtonStauts("Guess");
      setHideAnswer({ visibility:"hidden" });
      setRunTimer(true);
      setCircleTimerVisibility("visible");
      playerOneGuessing = false;
      computerAttemptAnswer();
    }
  }, [modalOpen]);

  useEffect(() =>{
    setLoaderActive(false);
    if(checkAnswserResponse === "success") {
      if(isCorrect === "Y") {
        dispatch(addPlayerOneScore(parseInt(modalQuestionValue)));
        gameResponse = "NICE JOB!"
      } else {
        dispatch(substractPlayerOneScore(parseInt(modalQuestionValue)));
        setCircleTimerVisibility("hidden");
        gameResponse = "Sorry that is not correct"
      }
      setEndOfTurn(true);
      setDisplayAnswerVisiblity("visible");
      setGuessButtonStauts("Click to proceed");
    }
  }, [actualAnswer])

  return (
    <>
      <EndGameAnimation visibility={endGameAnimation} winnerStatus={winnerStatus}/>
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
        <div style={{visibility: displayAnswerVisibilty }}>
          <h2> { gameResponse }</h2>
          <h2> The correct answer is: </h2>
          <h2> {actualAnswer} </h2>
        </div>
        <Grid>
          <Row>
            <Column>
              <div style={{visibility: circleTimerVisibilty }}> 
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
              </div>
            </Column>
            <Column>
              <Loading
                active={loaderActive}
              />
            </Column>
          </Row>
        </Grid>
      </Modal>
    </>
  );
};

export default QuestionModal;
