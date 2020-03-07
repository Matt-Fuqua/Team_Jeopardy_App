import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getQuestionsThunkAction } from '../actions/questions';
import { getQuestionsData, getQuestionsIsFetching, getQuestionsIsError } from '../selectors';
import { LoadingIndicator } from '../components'

const Debug = () => {
  const dispatch = useDispatch();

  const questionsData = useSelector(getQuestionsData);
  const questionsIsFetching = useSelector(getQuestionsIsFetching);
  const questionsIsError = useSelector(getQuestionsIsError);

  const questionsOnClick = () => {
    dispatch(getQuestionsThunkAction());
  };

  return (
    <div style={{ fontSize: "20px", height: "100%", padding: "30px", textAlign: "left" }}>
      <button onClick={questionsOnClick} style={{ fontSize: "20px" }}>Get Questions Data </button>
      <div>
        <strong>Is Fetching: </strong> {questionsIsFetching.toString()}
        <strong> Is Error: </strong> {questionsIsError.toString()}
      </div>
      <div>
        <strong>Questions Data:</strong><pre>{JSON.stringify(questionsData, undefined, 2)}</pre>
      </div>
      <LoadingIndicator display={questionsIsFetching} />
    </div>
  );
};

export default Debug;