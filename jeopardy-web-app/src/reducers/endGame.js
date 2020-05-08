const initialData = {
  endGameStatus: {},
};

const endGameReducer = (state = initialData, action) => {
  switch (action.type) {
    case "END_GAME_STARTED":
      return {
        endGameStatus: {}
      };
    case "END_GAME_SUCCESS":
      return {
        endGameStatus: action.data
      };
    case "END_GAME_FAILURE":
      return {
        endGameStatus: {}
      };
    default:
      return state;
  }
};

export default endGameReducer;
