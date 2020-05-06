const initialData = {
  playerOneScore: 0,
  playerTwoScore: 0,
};

const managePlayerScore = (state = initialData, action) => {
  const inputScore = action.data;
  const oneScore = state.playerOneScore;
  const twoScore = state.playerTwoScore;
  
  switch (action.type) {
    case "ADD_PLAYER_ONE_SCORE":
      return {
        ...state,
        playerOneScore: oneScore + inputScore
      };
    case "ADD_PLAYER_TWO_SCORE":
      return {
        ...state,
        playerTwoScore: twoScore + inputScore
      };
    case "SUBTRACT_PLAYER_ONE_SCORE":
      return {
        ...state,
        playerOneScore: oneScore - inputScore
      };
    case "SUBTRACT_PLAYER_TWO_SCORE":
      return {
        ...state,
        playerTwoScore: twoScore - inputScore
      };
    default:
      return state;
  }
};
export default managePlayerScore;
