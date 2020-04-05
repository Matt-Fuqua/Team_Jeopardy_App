const initialData = {
    gameID:'',
    gameStart:'',
    gameEnd:'',
    gameWinner: '',
    ifFetching: false,
    isError: false,
  };
  
  const retrieveGamesReducer = (state = initialData, action) => {
    switch (action.type) {
      case "RETRIEVE_GAMES_STARTED":
        return {
          ...state,
          gameID:'',
          gameStart:'',
          gameEnd:'',
          gameWinner: '',
          ifFetching: true,
          isError: false
        };
      case "RETRIEVE_GAMES_SUCCESS":
        return {
          ...state,
          gameID: action.data.Game_ID,
          gameStart: action.data.Game_Date,
          gameEnd:action.data.Game_End_Date,
          gameWinner: action.data.Contestants_Contestant_ID_Winner,
          ifFetching: false,
          isError: false
        };
      case "RETRIEVE_GAMES_FAILURE":
        return {
          ...state,
          gameID:'',
          gameStart:'',
          gameEnd:'',
          gameWinner: '',
          isFetching: false,
          isError: true
        };
      default:
        return state;
    }
  };
  
  export default retrieveGamesReducer;