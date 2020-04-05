import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, FormGroup, Modal, TextInput } from 'carbon-components-react';

import { closeQuestionModal } from '../actions/questionDisplay';
import { questionDisplayOpen, questionDisplayQuestion, /* questionDisplayQuestionId, questionDisplayValue */ } from '../selectors/index';

const QuestionModal = () => {
  const dispatch = useDispatch();

  const modalOpen = useSelector(questionDisplayOpen);
  const modalQuestion = useSelector(questionDisplayQuestion);
  // const modalQuestionId = useSelector(questionDisplayQuestionId);
  // const modalQuestionValue = useSelector(questionDisplayValue);

  const [answerInput, setAnswerInput] = useState();

  const handleFormSubmit = e => {
    e.preventDefault();
    // dispatch action - submit answer to api middle layer
    setAnswerInput("");
  }

  return (
    <Modal
      hasScrollingContent={false}
      iconDescription="Close the modal"
      modalAriaLabel="A label to be read by screen readers on the modal root node"
      modalHeading={modalQuestion}
      onRequestClose={() => dispatch(closeQuestionModal())}
      onRequestSubmit={() => console.log('on request submit')}
      onSecondarySubmit={() => console.log('on secondary input')}
      open={modalOpen}
      passiveModal={false}
      primaryButtonDisabled={false}
      primaryButtonText="Submit"
      secondaryButtonText="Guess"
      selectorPrimaryFocus="[data-modal-primary-focus]"
    >
      <Form
        onSubmit={handleFormSubmit}
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
    </Modal>

  );
};

export default QuestionModal;
