
import React from 'react';
import { useSelector } from 'react-redux';
import { Column, Grid, Row } from 'carbon-components-react';
import { newGameRoundOne } from '../selectors';
import QuestionButton from './QuestionButton';

const Gameboard = () => {
    const roundOneQuestions = useSelector(newGameRoundOne);
    let buttonsList = {
        categoryOne: [],
        categoryTwo: [],
        categoryThree: [],
        categoryFour: [],
        categoryFive: [],
        categorySix: []
    };

    const mapIndexToArrayName = index => {
        switch(index) {
            case 1:
                return buttonsList.categoryOne;
            case 2:
                return buttonsList.categoryTwo;
            case 3:
                return buttonsList.categoryThree;
            case 4:
                return buttonsList.categoryFour;
            case 5:
                return buttonsList.categoryFive;
            case 6:
                return buttonsList.categorySix;
            default:
                return buttonsList.categorySix;
        }
    };

    if(roundOneQuestions && roundOneQuestions.length) {
        roundOneQuestions.forEach((element, index) => {
            mapIndexToArrayName(index+1).push(<div style={{ height: 75 }}><p style={{fontSize: "20px"}}>{element.category}</p></div>);
            const questions = element.questions;
            questions.forEach(item => {
                mapIndexToArrayName(index+1).push(<QuestionButton enabled={true} value={item.value.toString()} question={item.question.toString()} questionId={item.question_id.toString()} />);
                mapIndexToArrayName(index+1).push(<br />);
            });
        });
    }

    return (
        <div style={{ width: 1050 }}>    
            <Grid className="bx--col" style={{paddingRight: "0px", paddingLeft: "0px"}}>
                <Row className="bx--col" >
                    <Column>
                        {buttonsList.categoryOne}
                    </Column  >
                    <Column>
                        {buttonsList.categoryTwo}
                    </Column>
                    <Column>
                        {buttonsList.categoryThree}
                    </Column>
                    <Column>
                        {buttonsList.categoryFour}
                    </Column>
                    <Column>
                        {buttonsList.categoryFive}
                    </Column>
                    <Column>
                        {buttonsList.categorySix}                
                    </Column>
                </Row>
            </Grid>
        </div>
    );
};

export default Gameboard;

