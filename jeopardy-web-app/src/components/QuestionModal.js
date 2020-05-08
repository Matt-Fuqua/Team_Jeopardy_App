import React, { useEffect, useState } from 'react';
import { useHistory  } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import { EndGameAnimation } from '../components'
import { checkAnswerThunkAction } from '../actions/checkAnswer';
import { endGameThunkAction } from '../actions/endGame';
import { closeQuestionModal } from '../actions/questionDisplay';
import { addPlayerOneScore, addPlayerTwoScore, substractPlayerOneScore, substractPlayerTwoScore } from '../actions/managePlayerScore';
import { Column, Form, FormGroup,Grid, Loading, Modal, Row, TextInput } from 'carbon-components-react';
import { 
  checkAnswerStatus,
  correctAnswer,
  isAnswerCorrect,
  manageQuestionCount,
  newGameContestants,
  newGameId,
  playerOneScore,
  playerTwoScore,
  questionDisplayOpen,
  questionDisplayQuestion,
  questionDisplayQuestionId,
  questionDisplayValue
} from '../selectors';

let playerOneGuessing = false;

const QuestionModal = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const gameId = useSelector(newGameId);
  const checkAnswserResponse = useSelector(checkAnswerStatus);
  const modalOpen = useSelector(questionDisplayOpen);
  const modalQuestion = useSelector(questionDisplayQuestion);
  const modalQuestionId = useSelector(questionDisplayQuestionId);
  const gameContestants = useSelector(newGameContestants);
  const actualAnswer = useSelector(correctAnswer);
  const isCorrect = useSelector(isAnswerCorrect);
  const questionCount = useSelector(manageQuestionCount);
  const modalQuestionValue = useSelector(questionDisplayValue);
  const p1Score = useSelector(playerOneScore, "playerOneScore");
  const p2Score = useSelector(playerTwoScore, "playerTwoScore");

  const [gameResponse, setGameResponse] = useState("");
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
  const [displayGameResponse, setDisplayGameResponse] = useState("hidden");
  const [endOfTurn, setEndOfTurn] = useState(false);

  const handleFormGuess = e => {
    e.preventDefault();
    if(endOfTurn) {
      dispatch(closeQuestionModal());
      setEndOfTurn(false);
      setGuessButtonStauts("Guess");
      setDisplayAnswerVisiblity("hidden");
      setDisplayGameResponse("hidden");
    } else {
      playerOneGuessing = true;
      setHideAnswer({ visibility:"visible" });
      setRunTimer(false);
      setDisableModalPrimaryBtn(false);
    }
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

  const completeComputerTurn = e =>{
    setLoaderActive(false);
    let computerCorrect = isComputerCorrecct(75);
    if(computerCorrect){
      setGameResponse("Computer is correct");
      dispatch(addPlayerTwoScore(parseInt(modalQuestionValue)));
    } else {
      setGameResponse("Computer is incorrect");
      dispatch(substractPlayerTwoScore(parseInt(modalQuestionValue)));
    }
    setGuessButtonStauts("Click to proceed");
    setDisplayAnswerVisiblity("hidden");
    setDisplayGameResponse("visible");
    setEndOfTurn(true);
  }

  const computerGuessing = () => {
    setRunTimer(false);
    setCircleTimerVisibility("hidden");
    setGuessButtonStauts("Computer is guessing");
    setLoaderActive(true);
    setTimeout(() => {completeComputerTurn()}, 2000);
  }

  const isComputerCorrecct = p => {
    let temp = Math.floor(Math.random() * 100);
    if(temp<=p) {
      return true;
    } else {
      return false;
    }
}

  const computerAttemptAnswer = () => {
    let vpTimer = Math.floor(Math.random() * Math.floor(5)+5); 
    let timer = 10;
    let countdownTimer = setInterval(function() {
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
        clearInterval(countdownTimer);
      }
    },1000)
  }

  const guessTimeUp = () => {
    setHideAnswer({ visibility:"hidden" });
    dispatch(closeQuestionModal());
  }

  const gameOver = () => {
    let contestantId = 0;
    if(p1Score > p2Score){
      contestantId = gameContestants[0];
      setEndGameAnimation(true);
      setWinnerStatus(true);
    } else {
      contestantId = gameContestants[1];
      setEndGameAnimation(true);
      setWinnerStatus(false);
    }
    setTimeout(()=>{
      setEndGameAnimation(false);
      dispatch(endGameThunkAction(gameId, contestantId));
      // history.push("/HomePage");
    }, 2000); 
  }

  useEffect(() => {
    if(modalOpen === false && questionCount >= 30) {
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
        setGameResponse("NICE JOB!");
      } else {
        dispatch(substractPlayerOneScore(parseInt(modalQuestionValue)));
        setCircleTimerVisibility("hidden");
        setGameResponse("Sorry that is not correct");
      }
      setEndOfTurn(true);
      setDisplayAnswerVisiblity("visible");
      setDisplayGameResponse("visible");
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
        <div style={{ visibility: displayGameResponse }}>
          <h2> {gameResponse}</h2>
        </div>
        <div style={{ visibility: displayAnswerVisibilty }}>
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
              <Loading active={loaderActive}/>
            </Column>
          </Row>
        </Grid>
      </Modal>
    </>
  );
};

export default QuestionModal;
