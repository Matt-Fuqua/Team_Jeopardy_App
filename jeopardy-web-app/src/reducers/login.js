const initialData = {
  loginStatus: {},
  isFetching: false,
  isError: false,
};

const loginReducer = (state = initialData, action) => {
  switch (action.type) {
    case "LOGIN_STARTED":
      return {
        ...state,
        loginStatus: {},
        isFetching: true,
        isError: false
      };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        loginStatus: action.data,
        ifFetching: false,
        isError: false
      };
    case "LOGIN_FAILURE":
      return {
        ...state,
        loginStatus: {},
        isFetching: false,
        isError: true
      };
    default:
      return state;
  }
};

export default loginReducer;