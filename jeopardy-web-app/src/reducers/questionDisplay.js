const initialData = {
  open: false,
  question: "",
  questionId: "",
  initialTimerDuration: 10,
  initialTimerRunning: false,
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
        initialTimerDuration: 10,
        initialTimerRunning: true,
        value: action.data.questionValue
      };
    case "CLOSE_QUESTION_MODAL":
      return {
        ...state,
        open: false,
        question: "",
        questionId: "",
        initialTimerDuration: 50,
        initialTimerRunning: false,
        value: ""
      };
    default:
      return state;
  }
};

export default questionDisplayReducer;