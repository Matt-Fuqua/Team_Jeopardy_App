const initialData = {
  registerStatus: {},
  ifFetching: false,
  isError: false,
};

const registerUserReducer = (state = initialData, action) => {
  switch (action.type) {
    case "REGISTER_USER_STARTED":
      return {
        ...state,
        registerStatus: {},
        ifFetching: true,
        isError: false
      };
    case "REGISTER_USER_SUCCESS":
      return {
        ...state,
        registerStatus: action.data,
        ifFetching: false,
        isError: false
      };
    case "REGISTER_USER_FAILURE":
      return {
        ...state,
        registerStatus: {},
        isFetching: false,
        isError: true
      };
    default:
      return state;
  }
};

export default registerUserReducer;