import store from '../store';
import axios from 'axios';

export const retrieveGamesStarted = () => {
  return {
    type: "RETRIEVE_GAMES_STARTED"
  };
};

export const retrieveGamesSuccess = get => {
  //console.log('retrieve game action success', get) --- WORKING
  return {
    type: "RETRIEVE_GAMES_SUCCESS",
    data: get
  };
};

export const retrieveGamesFailure = () => {
  console.error('Unable to retrieve games');
  return {
    type: "RETRIEVE_GAMES_FAILURE"
  };
};

export const retrieveGamesThunkAction = () => {
  store.dispatch(retrieveGamesStarted());
  return (dispatch) => {
    return axios({
      method: 'get',
      url: 'http://cs411teambfs.web.illinois.edu/phase4_rdb_dev/games',
    })
      .then(response => {
        console.log('retrieve games response: ', response.data);
        dispatch(retrieveGamesSuccess(response.data));
      })
      .catch(() => {
        dispatch(retrieveGamesFailure());
      });
  };
};