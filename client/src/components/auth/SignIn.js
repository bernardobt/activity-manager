import React from "react";
import Input from "../layout/FormInput";

const SignIn = ({ setUser, setPassword }) => {
  return (
    <>
      <Input
        label="Username"
        fieldPlaceholder={"Enter username"}
        type="string"
        textClass="text-muted"
        isRequired={true}
        controlId="registerUsernameInput"
        stateToChange={(e) => setUser(e.target.value)}
      />
      <Input
        label="Password"
        fieldPlaceholder={"Enter password"}
        type="password"
        textClass="text-muted"
        isRequired={true}
        controlId="registerPasswordInput"
        stateToChange={(e) => setPassword(e.target.value)}
      />
    </>
  );
};

export default SignIn;
