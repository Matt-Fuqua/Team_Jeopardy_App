import { combineReducers } from "redux";
import login from './login';
import registerUser from './registerUser';

export default combineReducers({ login, registerUser });
