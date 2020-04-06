import store from '../store';
import axios from 'axios';

export const deleteGamesStarted = () => {
  return {
    type: "DELETE_GAMES_STARTED"
  };
};

export const deleteGamesSuccess = post => {
  return {
    type: "DELETE_GAMES_SUCCESS",
    data: post
  };
};

export const deleteGamesFailure = () => {
  console.error('Unable to delete games');
  return {
    type: "DELETE_GAMES_FAILURE"
  };
};

export const deleteGamesThunkAction = () => {
  store.dispatch(deleteGamesStarted());
  return (dispatch) => {
    return axios({
      method: 'post', 
      url: 'http://cs411teambfs.web.illinois.edu/phase4_rdb_dev/games/delete/abandoned',
    })
      .then(response => {
        console.log('delete games response: ', response.data);
        dispatch(deleteGamesSuccess(response.data));
      })
      .catch(() => {
        dispatch(deleteGamesFailure());
      });
  };
};