import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginStatus } from '../selectors'

import { loginThunkAction } from '../actions/login';
import { Button, Form, TextInput } from 'carbon-components-react';

const UserLogin = () => {
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const loginAuthentication = useSelector(loginStatus);
  console.log(loginAuthentication)

  const handleFormSubmit = () => {
    dispatch(loginThunkAction(username, password));
  };

  return (
    <div style={{ backgroundColor: "#C0C0C0", padding: "10px" }}>
      <h4>Login</h4>
      <Form
        onSubmit={handleFormSubmit}
      >
        <TextInput
          id="username-login"
          invalid={false}
          invalidText="A valid value is required"
          labelText="Username"
          light={true}
          type="text"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <TextInput
          id="password-login"
          invalid={false}
          invalidText="A valid value is required"
          labelText="Password"
          light={true}
          type="text"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <Button
          kind="primary"
          type="button"
          onClick={handleFormSubmit}
        >
          Login
        </Button>
      </Form>
    </div>
  );
};

export default UserLogin;
