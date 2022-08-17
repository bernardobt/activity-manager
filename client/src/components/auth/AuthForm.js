import React, { useState, useRef, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/esm/Container";
import Form from "react-bootstrap/Form";
import Register from "./Register";
import SignIn from "./SignIn";

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}/;
const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

/*  HAVE TO VALIDATE USERNAME AND PASSWORD THINGY 
      DO Something about a sucess or error message on register
  
  */

const Auth = () => {
  //  State to show if the user is logged in or not
  const [isRegistered, setIsRegistered] = useState(true);

  // State for error on register
  const [errMessage, setErrMessage] = useState("");
  const [sucess, setSucess] = useState(false);

  // States for email field
  const [email, setEmail] = useState("");

  // States for user field
  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  // States for user password
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  // States for user matching password
  const [matchPassword, setMatchPassword] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  // Switch between register and login forms
  const formTitle = isRegistered ? "Sign In" : "Register";
  const formSubmitButtonText = isRegistered ? "Sign In" : "Register";
  const formBody = isRegistered ? (
    <SignIn setUser={setUser} setPassword={setPassword} />
  ) : (
    <Register
      email={email}
      setEmail={setEmail}
      user={user}
      setUser={setUser}
      setPassword={setPassword}
      setMatchPassword={setMatchPassword}
    />
  );
  const switchForm = () => {
    setIsRegistered((prevIsSignedIn) => !prevIsSignedIn);
  };

  const handleOnRegister = async (e) => {
    e.preventDefault();
    console.log("clicked Register");
    console.log("email: ", email);
    console.log("user: ", user);
    console.log("password: ", password);
    console.log("matchPassword: ", matchPassword);
    setSucess(true);
    switchForm();
  };
  const handleOnSignIn = (e) => {
    e.preventDefault();
    console.log("clicked Sign In");
    console.log("user: ", user);
    console.log("password: ", password);
  };

  // Validation of username and password
  /* Have to make it only in the Register form
     Make alerts only appear when field is on focus
  */
  // validade username
  useEffect(() => {
    const result = USER_REGEX.test(user);
    setValidName(result);
  }, [user]);

  // validade password
  useEffect(() => {
    const result = PASSWORD_REGEX.test(password);
    setValidPassword(result);
    const match = password === matchPassword;
    setValidMatch(match);
  }, [password, matchPassword]);

  const disableRegisterButton =
    validName && validPassword && validMatch ? false : true;

  return (
    <Form className="mt-5">
      {/* <p ref={errRef}>{errMessage}</p> */}
      <h1>{formTitle}</h1>
      {formBody}

      <Button
        variant="primary"
        onClick={isRegistered ? handleOnSignIn : handleOnRegister}
        // disabled={!validName || !validPassword || !validMatch ? true : false}
        disabled={isRegistered ? false : disableRegisterButton}
      >
        {formSubmitButtonText}
      </Button>

      <Button variant="dark" onClick={switchForm}>
        Go to {isRegistered ? "Register" : "Sign In"}
      </Button>
    </Form>
  );
};

export default Auth;
