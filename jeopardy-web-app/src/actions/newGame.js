import store from '../store';
import axios from 'axios';

export const newGameStarted = () => {
  return {
    type: "NEW_GAME_STARTED"
  };
};

export const newGameSuccess = post => {
  return {
    type: "NEW_GAME_SUCCESS",
    data: post
  };
};

export const newGameFailure = () => {
  console.error('Unable to create new game');
  return {
    type: "NEW_GAME_FAILURE"
  };
};

export const newGameThunkAction = () => {
  store.dispatch(newGameStarted());
  return (dispatch) => {
    return axios({
      method: 'post',
      url: 'http://cs411teambfs.web.illinois.edu/phase4_rdb_dev/game/new',
    })
      .then(response => {
        console.log('new game response: ', response.data);
        dispatch(newGameSuccess(response.data));
      })
      .catch(() => {
        dispatch(newGameFailure());
      });
  };
};
