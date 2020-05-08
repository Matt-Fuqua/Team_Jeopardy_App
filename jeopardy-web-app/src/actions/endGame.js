import store from '../store';
import axios from 'axios';

export const endGameStarted = () => {
  console.log('started')
  return {
    type: "END_GAME_STARTED"
  };
};

export const endGameSuccess = post => {
  console.log('success');
  return {
    type: "END_GAME_SUCCESS",
    data: post
  };
};

export const endGameFailure = () => {
  console.log('failured')
  return {
    type: "END_GAME_FAILURE"
  };
};

export const endGameThunkAction = (gameId, contestantId) => {
  store.dispatch(endGameStarted());
  return (dispatch) => {
    var bodyFormData = new FormData();
    bodyFormData.set('Games_Game_ID', gameId);
    bodyFormData.set('Contestant_Coontestant_ID', contestantId);
    console.log(gameId, contestantId);
    return axios({
      method: 'post',
      url: 'http://cs411teambfs.web.illinois.edu/phase4_rdb_dev/game/finish',
      data: bodyFormData,
      headers: {'Content-Type': 'multipart/form-data'}
    })
      .then(response => {
        console.log('end game response', response.data);
        dispatch(endGameSuccess(response.data));
      })
      .catch(() => {
        dispatch(endGameFailure());
      });
  };
};
