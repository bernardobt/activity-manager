import React, { useEffect } from "react";
import Input from "../layout/FormInput";

const SignIn = ({ user, setUser, password, setPassword, setAlertMessage }) => {
  const usernameFieldNote = <>Please enter a user.</>;
  const passwordFieldNote = <>Not a valid email.</>;

  // useEffect(() => {
  //   setAlertMessage("");
  // }, [user, password]);

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
        value={user}
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
        value={password}
      />
    </>
  );
};

export default SignIn;
