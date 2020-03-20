import { combineReducers } from "redux";
import login from './login';
import questions from './questions';
import registerUser from './registerUser';

export default combineReducers({ login, questions, registerUser });
