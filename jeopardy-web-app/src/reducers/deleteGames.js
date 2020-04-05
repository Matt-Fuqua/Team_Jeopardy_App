const initialData = {
    deleteStatus: {},
    ifFetching: false,
    isError: false,
  };
  
  const deleteGamesReducer = (state = initialData, action) => {
    switch (action.type) {
      case "DELETE_GAMES_STARTED":
        return {
          ...state,
          deleteStatus: {},
          ifFetching: true,
          isError: false
        };
      case "DELETE_GAMES_SUCCESS":
        return {
          ...state,
          deleteStatus: action.data,
          ifFetching: false,
          isError: false
        };
      case "DELETE_GAMES_FAILURE":
        return {
          ...state,
          deleteStatus: {},
          isFetching: false,
          isError: true
        };
      default:
        return state;
    }
  };
  
  export default deleteGamesReducer;