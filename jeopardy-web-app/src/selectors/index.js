import { get } from "lodash";

// Login Selectors
export const loginStatus = state => get(state.login, "loginStatus");
export const loginIsFetching = state => get(state.login, "isFetching");
export const loginIsError = state => get(state.login, "isError");

// New Game Selectors
export const newGameId = state => get(state.newGame, "gameId");
export const newGameCategories = state => get(state.newGame, "categories");
export const newGameFinal = state => get(state.newGame, "final");
export const newGameQuestions = state => get(state.newGame, "questions");
export const newGameRoundOne = state => get(state.newGame, "roundOne");
export const newGameRoundTwo = state => get(state.newGame, "roundTwo");
export const newGameIsFetching = state => get(state.newGame, "isFetching");
export const newGameIsError = state => get(state.newGame, "isError");

// Register User Selectors
export const registerStatus = state => get(state.registerUser, "registerStatus");
export const registerIsFetching = state => get(state.registerUser, "isFetching");
export const registerIsError = state => get(state.registerUser, "isError");
