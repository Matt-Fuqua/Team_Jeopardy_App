import React from 'react';
import { Button, TextInput } from 'carbon-components-react';

const UserLogin = () => {
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
        onClick={()=>console.log("You tried to login")}
        type="button"
      >
        Login
      </Button>
    </div>
  );
};

export default UserLogin;
