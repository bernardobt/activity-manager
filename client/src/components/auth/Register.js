import Input from "../layout/FormInput";
import React, { useState, useRef, useEffect } from "react";

const EMAIL_REGEX = /.*\@[a-zA-Z0-9-_]*\.[a-zA-Z]{3}/;
const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}/;
const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Register = ({
  email,
  setEmail,
  validEmail,
  setValidEmail,
  user,
  setUser,
  validName,
  setValidName,
  password,
  setPassword,
  validPassword,
  setValidPassword,
  matchPassword,
  setMatchPassword,
  validMatch,
  setValidMatch,
}) => {
  const [emailFocus, setEmailFocus] = useState(false);
  const [userFocus, setUserFocus] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  // validade email
  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    setValidEmail(result);
  }, [email]);
  // validade username
  useEffect(() => {
    const result = USER_REGEX.test(user);
    setValidName(result);
  }, [user]);

  // validade password
  useEffect(() => {
    const result = PASSWORD_REGEX.test(password);
    setValidPassword(result);
    // const match = password === matchPassword;
    const match = password === matchPassword;
    setValidMatch(match);
  }, [password, matchPassword]);

  const emailFieldNote = <>Not a valid email.</>;
  const userNameFieldNote = (
    <>
      4 to 24 characters. {<br />}
      Must begin with a letter. {<br />}
      Letters, numbers, underscores, hyphens allowed.
    </>
  );
  const passwordFieldNote = (
    <>
      8 to 24 characters. {<br />}
      Must include uppercase and lowercase, letters, number and special
      character. {<br />}
      Allowed special characters: ! @ # $ %
    </>
  );

  const confirmPasswordFieldNote = <>Must match Password</>;

  return (
    <section>
      <>
        <Input
          label="Email"
          fieldPlaceholder={"Enter e-mail adress"}
          type="email"
          isValid={validEmail}
          isInvalid={email && !validEmail}
          isRequired={true}
          controlId="registerEmailInput"
          fieldNote={emailFieldNote}
          stateToChange={(e) => setEmail(e.target.value)}
          autoComplete={"off"}
          showNote={emailFocus && !validEmail ? true : false}
          onFocus={() => setEmailFocus(true)}
          onBlur={() => setEmailFocus(false)}
        />
        <Input
          label="Username"
          fieldPlaceholder={"Enter username"}
          type="string"
          isValid={validName}
          isInvalid={user && !validName}
          isRequired={true}
          controlId="registerUsernameInput"
          fieldNote={userNameFieldNote}
          stateToChange={(e) => setUser(e.target.value)}
          autoComplete={"off"}
          showNote={userFocus && !validName ? true : false}
          onFocus={() => setUserFocus(true)}
          onBlur={() => setUserFocus(false)}
        />
        <Input
          label="Password"
          fieldPlaceholder={"Enter password"}
          type="password"
          isValid={validPassword}
          isInvalid={password && !validPassword}
          isRequired={true}
          controlId="registerPasswordInput"
          fieldNote={passwordFieldNote}
          stateToChange={(e) => setPassword(e.target.value)}
          autoComplete={"off"}
          showNote={passwordFocus && !validPassword ? true : false}
          onFocus={() => setPasswordFocus(true)}
          onBlur={() => setPasswordFocus(false)}
        />
        <Input
          label="Confirm Password"
          fieldPlaceholder={"Comfirm your password"}
          type="password"
          isValid={validMatch && password}
          isInvalid={matchPassword && !validMatch}
          isRequired={true}
          controlId="registerConfirmPasswordInput"
          fieldNote={confirmPasswordFieldNote}
          stateToChange={(e) => setMatchPassword(e.target.value)}
          autoComplete={"off"}
          showNote={matchFocus && !validMatch ? true : false}
          onFocus={() => setMatchFocus(true)}
          onBlur={() => setMatchFocus(false)}
        />
      </>
    </section>
  );
};

export default Register;
