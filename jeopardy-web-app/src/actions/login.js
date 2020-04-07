import store from '../store';
import axios from 'axios'; 

export const loginStarted = () => {
  return {
    type: "LOGIN_STARTED"
  };
};

export const loginSuccess = post => {
  return {
    type: "LOGIN_SUCCESS",
    data: post
  };
};

export const loginFailure = () => {
  console.error('Unable to login successfully');
  return {
    type: "LOGIN_FAILURE"
  };
};

export const loginThunkAction = (username, password) => {
  store.dispatch(loginStarted());
  return (dispatch) => {

    var bodyFormData = new FormData();
    bodyFormData.set('username', username);
    bodyFormData.set('password', password);
    console.log('login body form ', bodyFormData);

    return axios({
      method: 'post',
      url: 'http://cs411teambfs.web.illinois.edu/phase4_rdb_dev/login',
      data: bodyFormData,
      headers: {'Content-Type': 'multipart/form-data' }
      })
        .then(response => {
          console.log('user login repsonse: ', response.data);
          dispatch(loginSuccess(response.data));
        })
        .catch(() => {
          dispatch(loginFailure());
        });
  };
};

export const setLoginDefault = () => {
  return {
    type: "SET_LOGIN_DEFAULT"
  };
};
