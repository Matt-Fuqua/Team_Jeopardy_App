
import React from 'react';
import { Column, Grid, Row } from 'carbon-components-react';
import { QuestionButton } from '.';

let buttonValue1 = "100";
let buttonValue2 = "200";
let buttonValue3 = "300";
let buttonValue4 = "400";
let buttonValue5 = "500";

const Gameboard = () => {
    return (
        <div>
            <Grid style = {{ padding: "100px" }}>
                <Row>
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
                </Row>
            </Grid>
        </div>
    );
};

export default Gameboard;

