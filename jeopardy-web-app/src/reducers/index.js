import { combineReducers } from "redux";
import login from './login';
import newGame from './newGame';
import registerUser from './registerUser';

export default combineReducers({ login, newGame, registerUser });
