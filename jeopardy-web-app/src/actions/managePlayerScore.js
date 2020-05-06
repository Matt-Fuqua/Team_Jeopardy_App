import store from '../store';

export const addPlayerOneScore = post => {
  return {
    type: "ADD_PLAYER_ONE_SCORE",
    data: post
  };
};

export const addPlayerTwoScore = post => {
  return {
    type: "ADD_PLAYER_TWO_SCORE",
    data: post
  };
};

export const substractPlayerOneScore = post => {
  return {
    type: "SUBTRACT_PLAYER_ONE_SCORE",
    data: post
  };
};

export const substractPlayerTwoScore = post => {
  return {
    type: "SUBTRACT_PLAYER_TWO_SCORE",
    data: post
  };
};
