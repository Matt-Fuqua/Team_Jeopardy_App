const initialData = {
    gamesData: [],
    ifFetching: false,
    isError: false,
  };
  
  const retrieveGamesReducer = (state = initialData, action) => {
    switch (action.type) {
      case "RETRIEVE_GAMES_STARTED":
        return {
          ...state,
          gamesData: [],
          isFetching: true,
          isError: false
        };
      case "RETRIEVE_GAMES_SUCCESS":
        return {
          ...state,  
          gamesData: action.data,
          isFetching: false,
          isError: false
        };
      case "RETRIEVE_GAMES_FAILURE":
        return {
          ...state,
          gamesData: [],
          isFetching: false,
          isError: true
        };
      default:
        return state;
    }
  };
  
  export default retrieveGamesReducer;