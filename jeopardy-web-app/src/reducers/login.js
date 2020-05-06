const initialData = {
  loginStatus: {},
  isFetching: false,
  isError: false,
  userName: '',
};

const loginReducer = (state = initialData, action) => {
  switch (action.type) {
    case "LOGIN_STARTED":
      return {
        ...state,
        loginStatus: {},
        isFetching: true,
        isError: false,
        userName: '',
      };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        loginStatus: "success",
        ifFetching: false,
        isError: false,
        userName: action.data.User_ID,
      };
    case "LOGIN_FAILURE":
      return {
        ...state,
        loginStatus: "error",
        isFetching: false,
        isError: true,
        userName: '',
      };
    case "SET_LOGIN_DEFAULT":
      return {
        ...state,
        loginStatus: {},
        isFetching: false,
        isError: false,
        userName: '',
      };
    default:
      return state;
  }
};

export default loginReducer;
