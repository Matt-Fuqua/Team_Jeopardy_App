const initialData = {
  correct: "",
  correctAnswer: "",
  checkAnswerStatus: {},
  isFetching: false,
  isError: false
};

const checkAnswerReducer = (state = initialData, action) => {
  switch (action.type) {
    case "CHECK_ANSWER_STARTED":
      return {
        ...state,
        checkAnswerStatus: {},
        isFetching: true,
        isError: false
      };
    case "CHECK_ANSWER_SUCCESS":
      return {
        ...state,
        checkAnswerStatus: "success",
        correct: action.data.ConsideredCorrect,
        correctAnswer: action.data.CorrectAnswer,
        isFetching: false,
        isError: false     
      };
    case "CHECK_ANSWER_FAILURE":
      return {
        ...state,
        checkAnswerStatus: "error",
        isFetching: false,
        isError: true
      };
    case "SET_CHECK_ANSWER_DEFAULT":
      return {
        ...state,
        checkAnswerStatus: {},
        isFetching: false,
        isError: false,
      };
    default:
      return state;
  }
};

export default checkAnswerReducer;