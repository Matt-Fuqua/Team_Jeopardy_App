const initialData = {
  questionsAnswered: 0,
};

const manageQuestionCount = (state = initialData, action) => {
  const numAnswered = state.questionsAnswered;
  switch (action.type) {
    case "INCREMENT_QUESTION_COUNT":
      return {
        ...state,
        questionsAnswered: numAnswered + 1
      };
    default:
      return state;
  }
};

export default manageQuestionCount;
