const initialData = {
  // gameData: {},
  gameId: '',
  categories: {},
  final: '',
  questions: {},
  roundOne: [],
  roundTwo: [],
  isFetching: false,
  isError: false,
};

const newGameReducer = (state = initialData, action) => {
  switch (action.type) {
    case "NEW_GAME_STARTED":
      return {
        ...state,
        gameId: '',
        categories: {},
        final: '',
        questions: {},
        roundOne: [],
        roundTwo: [],
        // gameData: {},
        isFetching: true,
        isError: false
      };
    case "NEW_GAME_SUCCESS":
      return {
        ...state,
        gameId: action.data.Games_Game_ID,
        categories: action.data.categories,
        final: action.data.final,
        questions: action.data.questions,
        roundOne: action.data.round1,
        roundTwo: action.data.round2,
        // gameData: action.data,
        isFetching: false,
        isError: false
      };
    case "NEW_GAME_FAILURE":
      return {
        ...state,
        gameId: '',
        categories: {},
        final: '',
        questions: {},
        roundOne: [],
        roundTwo: [],
        // gameData: {},
        isFetching: false,
        isError: true
      };
    default:
      return state;
  }
};

export default newGameReducer;