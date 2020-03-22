import React from 'react';
import { useDispatch } from 'react-redux';

import { loginThunkAction } from '../actions/login';
import { Button, TextInput } from 'carbon-components-react';

const UserLogin = () => {
  const dispatch = useDispatch();

  // TODO: Instead of coding these values in we want to use the data from the input values below
  const usernameInput = 'rfitch';
  const passwordInput = 'pw';

  const loginSubmit = () => {
    dispatch(loginThunkAction(usernameInput, passwordInput));
  };

  return (
    <div style={{ backgroundColor: "#C0C0C0", padding: "10px" }}>
      <TextInput
        id="username-login"
        invalid={false}
        invalidText="A valid value is required"
        labelText="Username"
        light={true}
        type="text"
      />
      <TextInput
        id="password-login"
        invalid={false}
        invalidText="A valid value is required"
        labelText="Password"
        light={true}
        type="text"
      />
      <Button
        kind="primary"
        onClick={loginSubmit}
        type="button"
      >
        Login
      </Button>
    </div>
  );
};

export default UserLogin;
