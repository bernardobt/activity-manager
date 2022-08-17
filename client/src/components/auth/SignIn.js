import React from "react";
import Input from "../layout/FormInput";

const SignIn = ({ setUser, setPassword }) => {
  const usernameFieldNote = <>Please enter a user.</>;
  const passwordFieldNote = <>Not a valid email.</>;

  return (
    <>
      <Input
        label="Username"
        fieldPlaceholder={"Enter username"}
        type="string"
        fieldNote={usernameFieldNote}
        showNote={true}
        isRequired={true}
        controlId="registerUsernameInput"
        stateToChange={(e) => setUser(e.target.value)}
      />
      <Input
        label="Password"
        fieldPlaceholder={"Enter password"}
        type="password"
        fieldNote={passwordFieldNote}
        showNote={true}
        isRequired={true}
        controlId="registerPasswordInput"
        stateToChange={(e) => setPassword(e.target.value)}
      />
    </>
  );
};

export default SignIn;
