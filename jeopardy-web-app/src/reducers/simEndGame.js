const initialData = {
    simEndGameStatus: {},
    isFetching: false,
    isError: false,
  };
  
  const simEndGame = (state = initialData, action) => {
    switch (action.type) {
      case "SIM_END_GAME_STARTED":
        return {
          ...state,
          simEndGameStatus: {},
          isFetching: true,
          isError: false
        };
      case "SIM_END_GAME_SUCCESS":
        return {
          ...state,
          simEndGameStatus: "success",
          ifFetching: false,
          isError: false
        };
      case "SIM_END_GAME_FAILURE":
        return {
          ...state,
          simEndGameStatus: "error",
          isFetching: false,
          isError: true
        };
      case "SET_SIM_END_GAME_DEFAULT":
        return {
          ...state,
          simEndGameStatus: {},
          isFetching: false,
          isError: false,
        };
      default:
        return state;
    }
  };
  
  export default simEndGame;