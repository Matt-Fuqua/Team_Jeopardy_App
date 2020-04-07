import store from '../store';
import axios from 'axios'; 

export const simEndGameStarted = () => {
  return {
    type: "SIM_END_GAME_STARTED"
  };
};

export const simEndGameSuccess = post => {
  return {
    type: "SIM_END_GAME_SUCCESS",
    data: post
  };
};

export const simEndGameFailure = () => {
  return {
    type: "SIM_END_GAME_FAILURE"
  };
};

export const simEndGameThunkAction = (gameID) => {
  store.dispatch(simEndGameStarted());
  return (dispatch) => {

    var bodyFormData = new FormData();
    bodyFormData.set('Game_ID', gameID);
   
    return axios({
      method: 'post',
      url: 'http://cs411teambfs.web.illinois.edu/phase4_rdb_dev/game/fakefinish',
      data: bodyFormData,
      headers: {'Content-Type': 'multipart/form-data' }
      })
        .then(response => {
          console.log('sim game end response ', response.data);
          dispatch(simEndGameSuccess(response.data));
 
        })
        .catch(() => {
          dispatch(simEndGameFailure());
        });
  };
};

