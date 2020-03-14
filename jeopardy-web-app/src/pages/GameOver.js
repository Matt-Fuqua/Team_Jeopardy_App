import React from 'react';
import { Grid, Row } from 'carbon-components-react';

const GameOver = () => {
    return(
        <div>
            <Grid>
                <Row>
                    <h1>END OF GAME</h1>
                </Row>
                <Row>
                    Congrats!!! You are the big winner!
                </Row>
                <Row>
                    Something else
                </Row>
            </Grid>
        </div>
    );
};

export default GameOver;