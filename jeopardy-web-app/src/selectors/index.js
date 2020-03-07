import { get } from "lodash";

// Questions Selectors
export const getQuestionsData = state => get(state.questions, "questionsData");
export const getQuestionsIsFetching = state => get(state.questions, "isFetching");
export const getQuestionsIsError = state => get(state.questions, "isError");
