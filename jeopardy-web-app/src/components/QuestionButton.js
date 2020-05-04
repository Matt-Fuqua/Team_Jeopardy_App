import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { incrementQuestionCount } from '../actions/manageQuestionCount';
import { displayQuestionModal } from '../actions/questionDisplay';

const QuestionButton = props => {

  const [disableButton, setDisableButton] = useState(false);
  const [buttonOpacity, setButtonOpacity] = useState("1.0");
  const [isAnswered, setIsAnswered] = useState(false);

  const dispatch = useDispatch();

  const presentModal = () => {
    dispatch(displayQuestionModal({ questionId: props.questionId, question: props.question, value: props.value }));
    setDisableButton(true);
    setButtonOpacity("0.3");
    setIsAnswered(true);
  }

  return (
    <button 
      style={{ opacity:buttonOpacity, backgroundColor: "#0353e9", color: '#FFD700', fontSize: 'medium', fontWeight: 'bold', height: 90, width: 175 }}
      disabled = {disableButton}
      onClick={() => {
        dispatch(incrementQuestionCount())
        presentModal()
      }}
    >
      {props.value}
    </button>
  );
};

QuestionButton.propTypes = {
  enabled: PropTypes.bool,
  question: PropTypes.string,
  questionId: PropTypes.string,
  value: PropTypes.string
};

export default QuestionButton;
