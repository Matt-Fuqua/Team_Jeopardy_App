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
        loginStatus: "error",
        isFetching: false,
        isError: true
      };
    case "SET_LOGIN_DEFAULT":
      return {
        ...state,
        loginStatus: {},
        isFetching: false,
        isError: false,
      };
    default:
      return state;
  }
};

export default loginReducer;
