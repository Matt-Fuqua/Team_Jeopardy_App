
import React from 'react';
import { Button, Column, Grid, Modal, Row } from 'carbon-components-react';

const Gameboard = () => {
    return (
    
       <div>
            <Grid>
                <Row style={{ padding: "50px", margin :"auto", textAlign: "right" }}>
                    <Column>
                    <Button
                    disabled={false}
                    iconDescription="medium button"
                    kind="primary"
                    //onClick={() => console.log("medium button clicked")} 
                    size="default"
                    type="button"
                >
                    <div style={{ textAlign: "right", margin: "auto" }}>   1
                    </div>
                </Button>
                    </Column>
                </Row>
            </Grid>
        </div>
    );
};

export default Gameboard;

