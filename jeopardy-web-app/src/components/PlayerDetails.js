import React from 'react';
import PropTypes from 'prop-types';

const PlayerDetails = props => {
  return (
    <div>
      <h3 style={{ fontWeight: 'bold' }}>{props.name}</h3>
      <h3>Score: {props.score}</h3>
    </div>
  );
};

PlayerDetails.propTypes = {
  name: PropTypes.string,
  score: PropTypes.number
};

export default PlayerDetails;