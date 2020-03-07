import React from 'react';
import { Loading } from 'carbon-components-react';

const LoadingIndicator = props => {
  return (
    <>
      <Loading
        active={props.display}
        className=".centered"
        description="Active loading indicator"
        small={false}
        withOverlay
      />
    </>
  );
};

export default LoadingIndicator;