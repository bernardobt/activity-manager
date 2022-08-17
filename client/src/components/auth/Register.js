import Input from "../layout/FormInput";
import React, { useState, useRef, useEffect } from "react";

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}/;
const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Register = ({ setEmail, setUser, setPassword, setMatchPassword }) => {
  // // Reference for focusing on username when the component loads
  // const userRef = useRef();
  // // Reference to error message for acessibility
  // const errRef = useRef();

  // // State for error on register
  // const [errMessage, setErrMessage] = useState("");
  // const [sucess, setSucess] = useState(false);

  // // set focus on user field
  // useEffect(() => {
  //   userRef.current.focus();
  // }, []);

  // // clear error message
  // useEffect(() => {
  //   setErrMessage("");
  // }, [user, password, matchPassword]);

  const userNameFieldNote = (
    <>
      4 to 24 characters {<br />}
      Must begin with a letter {<br />}
      Letters, numbers, underscores, hyphens allowed
    </>
  );
  const passwordFieldNote = (
    <>
      8 to 24 characters {<br />}
      Must include uppercase and lowercase, letters, number and special
      character {<br />}
      Allowed special characters: {<br />}! @ # $ %
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
          textClass="text-muted"
          isRequired={true}
          controlId="registerEmailInput"
          stateToChange={(e) => setEmail(e.target.value)}
        />
        <Input
          label="Username"
          fieldPlaceholder={"Enter username"}
          type="string"
          textClass="text-muted"
          isRequired={true}
          controlId="registerUsernameInput"
          fieldNote={userNameFieldNote}
          stateToChange={(e) => setUser(e.target.value)}
        />
        <Input
          label="Password"
          fieldPlaceholder={"Enter password"}
          type="password"
          textClass="text-muted"
          isRequired={true}
          controlId="registerPasswordInput"
          fieldNote={passwordFieldNote}
          stateToChange={(e) => setPassword(e.target.value)}
        />
        <Input
          label="Confirm Password"
          fieldPlaceholder={"Comfirm your password"}
          type="password"
          textClass="text-muted"
          isRequired={true}
          controlId="registerConfirmPasswordInput"
          fieldNote={confirmPasswordFieldNote}
          stateToChange={(e) => setMatchPassword(e.target.value)}
        />
      </>
    </section>
  );
};

export default Register;
