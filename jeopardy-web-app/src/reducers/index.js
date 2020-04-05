import { combineReducers } from "redux";
import login from './login';
import newGame from './newGame';
import questionDisplay from './questionDisplay';
import registerUser from './registerUser';

export default combineReducers({ login, newGame, questionDisplay, registerUser });
