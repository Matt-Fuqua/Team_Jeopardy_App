const initialData = {
  open: false,
  question: "",
  questionId: "",
  value: ""
};

const questionDisplayReducer = (state = initialData, action) => {
  switch (action.type) {
    case "DISPLAY_QUESTION_MODAL":
      return {
        ...state,
        open: true,
        question: action.data.question,
        questionId: action.data.questionId,
        value: action.data.value
      };
    case "CLOSE_QUESTION_MODAL":
      return {
        ...state,
        open: false,
        question: "",
        questionId: "",
        value: ""
      };
    default:
      return state;
  }
};

export default questionDisplayReducer;