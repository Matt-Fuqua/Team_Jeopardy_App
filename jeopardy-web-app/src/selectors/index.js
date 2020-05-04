import { get } from "lodash";

// Announcement
export const announcementDisplayOpen = state => get(state.announcementDisplay, "open");

// Check Answer Selectors
export const isAnswerCorrect = state => get(state.checkAnswer, "correct");
export const correctAnswer = state => get(state.checkAnswer, "correctAnswer");
export const checkAnswerStatus = state => get(state.checkAnswer, "checkAnswerStatus");
export const checkAnswerIsFetching = state => get(state.checkAnswer, "isFetching");
export const checkAnswerIsError = state => get(state.checkAnswer, "isError");

// Delete Games Selectors
export const deleteGamesStatus = state => get(state.deleteGames, "retrieveStatus");
export const deleteGamesIsFetching = state => get(state.deleteGames, "isFetching");
export const deleteGamesIsError = state => get(state.deleteGames, "isError");

// Login Selectors
export const loginStatus = state => get(state.login, "loginStatus");
export const loginIsFetching = state => get(state.login, "isFetching");
export const loginIsError = state => get(state.login, "isError");

// Manage Question Count Selectors
export const manageQuestionCount = state => get(state.manageQuestionCount, "questionsAnswered");

// New Game Selectors
export const newGameId = state => get(state.newGame, "gameId");
export const newGameRoundOne = state => get(state.newGame, "roundOne");
export const newGameRoundTwo = state => get(state.newGame, "roundTwo");
export const newGameFinal = state => get(state.newGame, "final");
export const newGameIsFetching = state => get(state.newGame, "isFetching");
export const newGameIsError = state => get(state.newGame, "isError");

// Question Display Selectors
export const questionDisplayOpen = state => get(state.questionDisplay, "open");
export const questionDisplayQuestion = state => get(state.questionDisplay, "question");
export const questionDisplayQuestionId = state => get(state.questionDisplay, "questionId");
export const questionDisplayValue = state => get(state.questionDisplay, "value");

// Register User Selectors
export const registerStatus = state => get(state.registerUser, "registerStatus");
export const registerIsFetching = state => get(state.registerUser, "isFetching");
export const registerIsError = state => get(state.registerUser, "isError");

// Retrieve Games Selectors
export const retrieveGamesData = state => get(state.retrieveGames, "gamesData");
export const retrieveGamesIsFetching = state => get(state.retrieveGames, "isFetching");
export const retrieveGamesIsError = state => get(state.retrieveGames, "isError");

// Simulated End Game Selectors
export const simEndGameStatus = state => get(state.simEndGame, "simEndGameStatus");
export const simEndGameIsFetching = state => get(state.simEndGame, "isFetching");
export const simEndGameIsError = state => get(state.simEndGame, "isError");

// Timer Selectors
export const initialTimerDuration = state => get(state.questionDisplay, "initialTimerDuration")
export const initialTimerEnabled = state => get(state.questionDisplay, "initialTimerRunning")



