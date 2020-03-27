import React from 'react';
import PropTypes from 'prop-types';

const QuestionButton = props => {
  const buttonColor = props.enabled ? '#0353e9' : '#F5F5F5';

  return (
    <button
      style={{ backgroundColor: buttonColor, color: '#FFD700', fontSize: 'medium', fontWeight: 'bold', height: 85, width: 145 }}
      type="button" 
    >
      {props.value}
    </button>
  );
};

QuestionButton.propTypes = {
  enabled: PropTypes.bool,
  questionId: PropTypes.string,
  value: PropTypes.string
};

export default QuestionButton;
