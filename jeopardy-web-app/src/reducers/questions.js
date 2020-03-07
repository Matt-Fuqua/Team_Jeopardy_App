const initialData = {
  questionsData: {},
  isFetching: false,
  isError: false,
};

const questionsReducer = (state = initialData, action) => {
  switch (action.type) {
    case "GET_QUESTIONS_STARTED":
      return {
        ...state,
        questionsData: {},
        isFetching: true,
        isError: false
      };
    case "GET_QUESTIONS_SUCCESS":
      return {
        ...state,
        questionsData: action.data,
        isFetching: false,
        isError: false
      };
    case "GET_QUESTIONS_FAILURE":
      return {
        ...state,
        isFetching: false,
        isError: true
      };
    default:
      return state;
  }
};

export default questionsReducer;
