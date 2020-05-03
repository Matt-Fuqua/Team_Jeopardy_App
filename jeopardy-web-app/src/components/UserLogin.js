import React, { useState } from 'react';
import { useHistory  } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';
import { loginStatus } from '../selectors'

import { loginThunkAction, setLoginDefault } from '../actions/login';
import { Button, Form, FormGroup, TextInput } from 'carbon-components-react';

const UserLogin = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const loginResponse = useSelector(loginStatus);

  if(loginResponse === "error") {
    dispatch(setLoginDefault());
    alert("INVALID USER");
  };

  if(loginResponse === "success") {
    history.push("/GamePlay");
  };

  const handleFormSubmit = e => {
    e.preventDefault();
    dispatch(loginThunkAction(username, password));
    setUsername("");
    setPassword("");
  };

  return (
    <div style={{ backgroundColor: "#F5F5F5", borderRadius: "15px 15px 15px 15px", padding: "30px", width: 500 }}>
      <h4>Login</h4>
      <Form
        onSubmit={handleFormSubmit}
      >
        <FormGroup
          invalid={false}
          message={false}
          legendText=""
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
          <TextInput.PasswordInput
            hidePasswordLabel="Hide password"
            id="password-login"
            invalid={false}
            invalidText="A valid value is required"
            labelText="Password"
            light={true}
           // type="text"                       this causes password to show
            showPasswordLabel="Show password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </FormGroup>
        <Button
          kind="primary"
          type="submit"
        >
          Login
        </Button>
      </Form>
    </div>
  );
};

export default UserLogin;
