import { combineReducers } from "redux";
import deleteGames from './deleteGames';
import login from './login';
import newGame from './newGame';
import questionDisplay from './questionDisplay';
import registerUser from './registerUser';
import retrieveGames from './retrieveGames'

export default combineReducers({ deleteGames, login, newGame, questionDisplay, registerUser, retrieveGames });
