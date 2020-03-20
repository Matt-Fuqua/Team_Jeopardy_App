import store from '../store';
import axios from '../axios/instance';

export const getQuestionsStarted = () => {
  return {
    type: "GET_QUESTIONS_STARTED"
  };
};

export const getQuestionsSuccess = post => {
  return {
    type: "GET_QUESTIONS_SUCCESS",
    data: post
  };
};

export const getQuestionsFailure = () => {
  console.error('Unable to get questions data');
  return {
    type: "GET_QUESTIONS_FAILURE"
  };
};

export const getQuestionsThunkAction = () => {
  store.dispatch(getQuestionsStarted());
  return (dispatch) => {
    return axios.get(`/phase3`)
      .then(response => {
        dispatch(getQuestionsSuccess(response.data));
      })
      .catch(() => {
        dispatch(getQuestionsFailure());
      });
  };
};
