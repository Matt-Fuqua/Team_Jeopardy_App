
import React from 'react';
import { Column, Grid, Row } from 'carbon-components-react';
import { QuestionButton, QuestionModal } from '../components';

const Gameboard = () => {

    return (
       <div>
            <Grid>
                <Row style={{ padding: "50px", margin :"auto", textAlign: "right" }}>
                    <Column>
                        <QuestionButton enabled={true} value="500"/>

                        <QuestionModal />
                    </Column>
                </Row>
            </Grid>
        </div>
    );
};

export default Gameboard;

