import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { displayQuestionModal } from '../actions/questionDisplay';

const QuestionButton = props => {
  const buttonColor = props.enabled ? '#0353e9' : '#F5F5F5';

  const dispatch = useDispatch();
  const presentModal = () => {
    dispatch(displayQuestionModal({ questionId: props.questionId, question: props.question, value: props.value }));
  }

  return (
    <button
      style={{ backgroundColor: buttonColor, color: '#FFD700', fontSize: 'medium', fontWeight: 'bold', height: 90, width: 150 }}
      type="button" 
      onClick={() => presentModal()}
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
