import store from '../store';
import axios from 'axios'; 

export const checkAnswerStarted = () => {
  return {
    type: "CHECK_ANSWER_STARTED"
  };
};

export const checkAnswerSuccess = post => {
  return {
    type: "CHECK_ANSWER_SUCCESS",
    data: post
  };
};

export const checkAnswerFailure = () => {
  return {
    type: "CHECK_ANSWER_FAILURE"
  };
};

export const checkAnswerThunkAction = (gameID, questionID, contestantID, questionGuess) => {
  store.dispatch(checkAnswerStarted());
  return (dispatch) => {

    var bodyFormData = new FormData();
    bodyFormData.set('Games_Game_ID', gameID);
    bodyFormData.set('GameQuestions_ID', questionID);
    bodyFormData.set('Contestant_Coontestant_ID', contestantID);
    bodyFormData.set('questionGuess', questionGuess);
    return axios({
      method: 'post',
      url: 'http://cs411teambfs.web.illinois.edu/phase4_rdb_dev/submitAnswer',
      data: bodyFormData,
      headers: {'Content-Type': 'multipart/form-data' }
      })
        .then(response => {
          console.log('check answer response ', response.data);
          dispatch(checkAnswerSuccess(response.data));
        })
        .catch(() => {
          dispatch(checkAnswerFailure());
        });
  };
};
