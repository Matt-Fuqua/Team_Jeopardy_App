import { get } from "lodash";

// Login Selectors
export const loginStatus = state => get(state.login, "loginStatus");
export const loginIsFetching = state => get(state.login, "isFetching");
export const loginIsError = state => get(state.login, "isError");

// Register User Selectors
export const registerStatus = state => get(state.registerUser, "registerStatus");
export const registerIsFetching = state => get(state.registerUser, "isFetching");
export const registerIsError = state => get(state.registerUser, "isError");
