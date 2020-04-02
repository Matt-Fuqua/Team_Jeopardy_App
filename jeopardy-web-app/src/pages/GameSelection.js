import React from 'react';
import { useDispatch } from 'react-redux';

import { newGameThunkAction } from '../actions/newGame'
import { Button, Column, Grid, Row } from 'carbon-components-react';
import JeopardyLogo from "../images/jeopardyLogo.jpg";


const GameSelection = () => {
    const dispatch = useDispatch();

    return (
        <div style={{ padding: "20px" }}>
            <Grid>
                <Row style={{ padding: "20px" }}>
                    <Column>
                        <h1>Select the difficulty below</h1>
                    </Column>
                    <Column>
                        <Button
                            disabled={false}
                            iconDescription="admin button"
                            kind="primary"
                            onClick={() => console.log('admin button clicked')} 
                            size="default"
                            type="button"
                        >
                            Admin
                        </Button>
                    </Column>
                </Row >
                <Row>
                    <div style={{ position: "relative", top: "50%", left: "50%" }}>
                        <img alt="Jeopardy Logo" src={JeopardyLogo} style={{ height: 300, width: 500 }} />
                    </div>
                </Row>
                <Row style={{ padding: "20px" }}>
                    <Column>
                        <Button
                            disabled={false}
                            iconDescription="easy button"
                            kind="primary"
                            onClick={() => dispatch(newGameThunkAction())} 
                            size="default"
                            type="button"
                        >
                            Easy
                        </Button>
                    </Column>
                    <Column>
                        <Button
                            disabled={false}
                            iconDescription="medium button"
                            kind="primary"
                            onClick={() => dispatch(newGameThunkAction())} 
                            size="default"
                            type="button"
                        >
                            Medium
                        </Button>
                    </Column>
                    <Column>
                        <Button
                            disabled={false}
                            iconDescription="difficult button"
                            kind="primary"
                            onClick={() => dispatch(newGameThunkAction())} 
                            size="default"
                            type="button"
                        >
                            Difficult
                        </Button>
                    </Column>
                </Row>
            </Grid>
        </div>
    );
};

export default GameSelection;