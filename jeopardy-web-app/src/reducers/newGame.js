const initialData = {
  gameId: '',
  roundOne: [],
  roundTwo: [],
  final: {},
  isFetching: false,
  isError: false,
};

const newGameReducer = (state = initialData, action) => {
  switch (action.type) {
    case "NEW_GAME_STARTED":
      return {
        ...state,
        gameId: '',
        roundOne: [],
        roundTwo: [],
        final: {},
        isFetching: true,
        isError: false
      };
    case "NEW_GAME_SUCCESS":
      return {
        ...state,
        gameId: action.data.Games_Game_ID,
        roundOne: action.data.round1,
        roundTwo: action.data.round2,
        final: action.data.final,
        isFetching: false,
        isError: false
      };
    case "NEW_GAME_FAILURE":
      return {
        ...state,
        gameId: '',
        roundOne: [],
        roundTwo: [],
        final: {},
        isFetching: false,
        isError: true
      };
    default:
      return state;
  }
};

export default newGameReducer;