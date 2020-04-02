
import React from 'react';
import { useSelector } from 'react-redux';
import { Column, Grid, Row } from 'carbon-components-react';
import QuestionButton from './QuestionButton';
import {
    newGameQuestions
} from '../selectors';

const Gameboard = () => {
    const questions = useSelector(newGameQuestions);
    
    let buttons = [];

    Object.values(questions).forEach(object => {
        Object.values(object).forEach(question => {
            let questionValue = "";
            if(question.value === null) {
                questionValue = "0";
            } else {
                questionValue = question.value.toString();
            }
            buttons.push(<QuestionButton enabled={true} value={questionValue} questionId={question.question_id.toString()} />);
        });
    })

    return (
        <div>
            <Grid style = {{ padding: "100px" }}>
                {buttons}
                {/* <Row>
                    <Column>  
                        <Row>
                            Cat 1
                        </Row>
                        <Row>
                            <QuestionButton enabled={true} value= { buttonValue1 } />
                        </Row>
                        <Row>
                            <QuestionButton enabled={true} value= { buttonValue2 } />
                        </Row>
                        <Row>
                            <QuestionButton enabled={true} value= { buttonValue3 } />
                        </Row>
                        <Row>
                            <QuestionButton enabled={true} value= { buttonValue4 } />
                        </Row>
                        <Row>
                            <QuestionButton enabled={true} value= { buttonValue5 } />   
                        </Row>
                    </Column>
                    <Column>  
                        <Row>
                            Cat 2
                        </Row>
                        <Row>
                            <QuestionButton />
                        </Row>
                        <Row>
                            <QuestionButton />
                        </Row>
                        <Row>
                            <QuestionButton />
                        </Row>
                        <Row>
                            <QuestionButton />
                        </Row>
                        <Row>
                            <QuestionButton />   
                        </Row>
                    </Column>
                    <Column>  
                        <Row>
                            Cat 3
                        </Row>
                        <Row>
                            <QuestionButton />
                        </Row>
                        <Row>
                            <QuestionButton />
                        </Row>
                        <Row>
                            <QuestionButton />
                        </Row>
                        <Row>
                            <QuestionButton />
                        </Row>
                        <Row>
                            <QuestionButton />   
                        </Row>
                    </Column>
                    <Column>  
                        <Row>
                            Cat 4
                        </Row>
                        <Row>
                            <QuestionButton />
                        </Row>
                        <Row>
                            <QuestionButton />
                        </Row>
                        <Row>
                            <QuestionButton />
                        </Row>
                        <Row>
                            <QuestionButton />
                        </Row>
                        <Row>
                            <QuestionButton />   
                        </Row>
                    </Column>
                    <Column>  
                        <Row>
                            Cat 5
                        </Row>
                        <Row>
                            <QuestionButton />
                        </Row>
                        <Row>
                            <QuestionButton />
                        </Row>
                        <Row>
                            <QuestionButton />
                        </Row>
                        <Row>
                            <QuestionButton />
                        </Row>
                        <Row>
                            <QuestionButton />   
                        </Row>
                    </Column>
                    <Column>  
                        <Row>
                            Cat 6
                        </Row>
                        <Row>
                            <QuestionButton />
                        </Row>
                        <Row>
                            <QuestionButton />
                        </Row>
                        <Row>
                            <QuestionButton />
                        </Row>
                        <Row>
                            <QuestionButton />
                        </Row>
                        <Row>
                            <QuestionButton />   
                        </Row>
                    </Column>
                </Row> */}
            </Grid>
        </div>
    );
};

export default Gameboard;

