import { combineReducers } from "redux";
import announcementDisplay from './announcementDisplay';
import checkAnswer from './checkAnswer';
import deleteGames from './deleteGames';
import endGame from './endGame';
import login from './login';
import managePlayerScore from './managePlayerScore';
import manageQuestionCount from './manageQuestionCount';
import newGame from './newGame';
import questionDisplay from './questionDisplay';
import registerUser from './registerUser';
import retrieveGames from './retrieveGames';
import simEndGames from './simEndGame.js';

export default combineReducers({ announcementDisplay, checkAnswer, deleteGames, endGame, login, managePlayerScore, manageQuestionCount, newGame, questionDisplay, registerUser, retrieveGames, simEndGames });
