const initialData = {
  playerOneScore: 0,
  playerTwoScore: 0,
  scoreToAdd: 0
};

const managePlayerScore = (state = initialData, action) => {
  const oneScore = state.playerOneScore;
  const twoScore = state.playerTwoScore;
  const score = 5;
 // const addedScore = action.data.scoreToAdd;
  switch (action.type) {
    case "ADD_PLAYER_ONE_SCORE":
      return {
        ...state,
        scoreToAdd: action.data.scoreToAdd,
        playerOneScore: action.data.scoreToAdd
      };
      case "ADD_PLAYER_TWO_SCORE":
      return {
        ...state,
        //scoreToAdd: action.data.scoreToAdd,
        playerTwoScore: twoScore + score
      };
    default:
      return state;
  }
};
export default managePlayerScore;

//dispatch(displayQuestionModal({ questionId: props.questionId, question: props.question, value: props.value }));
