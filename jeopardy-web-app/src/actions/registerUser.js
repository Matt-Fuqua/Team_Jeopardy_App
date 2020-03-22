import store from '../store';
import axios from 'axios';

export const registerUserStarted = () => {
  return {
    type: "REGISTER_USER_STARTED"
  };
};

export const registerUserSuccess = post => {
  return {
    type: "REGISTER_USER_SUCCESS",
    data: post
  };
};

export const registerUserFailure = () => {
  console.error('Unable to register user successfully');
  return {
    type: "REGISTER_USER_FAILURE"
  };
};

export const registerUserThunkAction = (username, password, email, firstName, lastName) => {
  store.dispatch(registerUserStarted());
  return (dispatch) => {

    var bodyFormData = new FormData();
    bodyFormData.set('username', username);
    bodyFormData.set('password', password);
    bodyFormData.set('Email', email);
    bodyFormData.set('UFirst_Name', firstName);
    bodyFormData.set('ULast_Name', lastName);

    return axios({
      method: 'post',
      url: 'http://cs411teambfs.web.illinois.edu/phase4_rdb_dev/register',
      data: bodyFormData,
      headers: {'Content-Type': 'multipart/form-data' }
      })
        .then(response => {
          console.log('user registered: ', response.data);
          dispatch(registerUserSuccess(response.data));
        })
        .catch(() => {
          dispatch(registerUserFailure());
        });
  };
};
