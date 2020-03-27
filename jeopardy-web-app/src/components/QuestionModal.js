import React, { useState } from 'react';
import { Form, FormGroup, Modal, TextInput } from 'carbon-components-react';

const QuestionModal = () => {

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
      modalHeading="Modal heading"
      // onClick={function noRefCheck(){}}
      onRequestClose={() => console.log('on request close')}
      onRequestSubmit={() => console.log('on request submit')}
      onSecondarySubmit={() => console.log('on secondary input')}
      open
      passiveModal={false}
      primaryButtonDisabled={false}
      primaryButtonText="Primary Button"
      secondaryButtonText="Secondary Button"
      selectorPrimaryFocus="[data-modal-primary-focus]"
      size={undefined}
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
