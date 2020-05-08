import React from 'react';
import PropTypes from 'prop-types';

import Fireworks from 'fireworks/lib/react';
import { Modal } from 'carbon-components-react';

const EndGameAnimation = props => {
  const visibilityStatus = props.visibility ? "visible" : "hidden";
  const winnerMessage = props.winnerStatus ? "Congrats Winner!" : "Try again";
  const fxProps = {
    count:  3,
    interval: 200,
    colors: ['#4c2491', '#1815bf', '#d117e6'],
    calc: (props, i) => ({
      ...props,
      x: (i + 1) * (window.innerWidth / 3) - (i + 1) * 100,
      y: 200 + Math.random() * 100 - 50 + (i === 2 ? -80 : 0)
    })
  }
  return(
    <div style={{ visibility: visibilityStatus }}>
      <Fireworks {...fxProps} />
      <Modal
        iconDescription="End Game Modal"
        modalAriaLabel="End Game Modal"
        modalHeading={winnerMessage}
        onRequestClose={() => {}}
        onRequestSubmit={ ()=>{} }      
        onSecondarySubmit={  ()=>{}  }
        open={props.visibility}
        passiveModal={false}
        primaryButtonText="End Game"
        secondaryButtonText="Thank you for playing!"
      />
    </div>
  );
};

EndGameAnimation.propTypes = {
  visibility: PropTypes.bool,
  winnerStatus: PropTypes.bool
};

export default EndGameAnimation;