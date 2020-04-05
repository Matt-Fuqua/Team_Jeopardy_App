export const displayQuestionModal = post => {
  return {
    type: "DISPLAY_QUESTION_MODAL",
    data: post
  };
};

export const closeQuestionModal = () => {
  return {
    type: "CLOSE_QUESTION_MODAL"
  };
};
