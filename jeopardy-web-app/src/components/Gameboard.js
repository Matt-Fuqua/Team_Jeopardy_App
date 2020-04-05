
import React from 'react';
import { useSelector } from 'react-redux';
import { Grid } from 'carbon-components-react';

import {
    newGameRoundOne
} from '../selectors';
import QuestionButton from './QuestionButton';

const Gameboard = () => {
    const roundOneQuestions = useSelector(newGameRoundOne);

    let buttons = [];

    if(roundOneQuestions && roundOneQuestions.length) {
        roundOneQuestions.forEach(element => {
            buttons.push(<h3>{element.category}</h3>);
            const questions = element.questions;
            questions.forEach(item => {
                buttons.push(<QuestionButton enabled={true} value={item.value.toString()} question={item.question.toString()} questionId={item.question_id.toString()} />);
            });
        });
    }

    return (
        <div>
            <Grid style = {{ padding: "100px" }}>
                {buttons}
            </Grid>
        </div>
    );
};

export default Gameboard;

